"""Estrae le forme del marchio dalle tavole e produce maschere trasparenti per le anteprime."""
from pathlib import Path
import json
from PIL import Image
import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE / "sorgenti" / "loghi"
OUT = HERE / "assets"
OUT.mkdir(exist_ok=True)

# Ritagli delle tavole: Incastro (segno + nome) e Firma/Iniziale (wordmark).
# I campi vengono ricavati dal colore rispetto allo sfondo uniforme della tavola.
STUDIES = {
    "01": ("01-incastro.png", (60, 70, 840, 685), (280, 135, 455, 455)),
    "24": ("24-firma-filo-iniziale.png", (45, 65, 875, 640), (660, 780, 150, 150)),
}

def extract(source, box, destination):
    image = Image.open(source).convert("RGB")
    x, y, width, height = box
    crop = image.crop((x, y, x + width, y + height))
    pixels = crop.load()
    # Angolo interno alla campitura piatta che ospita la firma.
    background = pixels[3, 3]
    output = Image.new("RGBA", crop.size, (0, 0, 0, 0))
    out = output.load()
    for py in range(height):
        for px in range(width):
            r, g, b = pixels[px, py]
            distance = max(abs(r-background[0]), abs(g-background[1]), abs(b-background[2]))
            # Soglia morbida per mantenere l'antialias del lettering, lasciando fuori
            # le variazioni minime della campitura di fondo.
            alpha = max(0, min(255, round((distance - 16) * 2.8)))
            if alpha:
                out[px, py] = (255, 255, 255, alpha)
    output.save(destination)

for number, (filename, full_box, icon_box) in STUDIES.items():
    source = ROOT / filename
    extract(source, full_box, OUT / f"logo-{number}.png")
    extract(source, icon_box, OUT / f"simbolo-{number}.png")

# Esporta anteprime illustrative ricolorate: conserva toni e texture, rimappando
# ombre, mezzi toni, accenti e superfici ai ruoli della palette scelta.
IDENTITY = HERE / "sorgenti" / "identita"
ILLUSTRATIONS = json.loads((IDENTITY / "illustrazioni.json").read_text())["proposte"]
PALETTES = json.loads((IDENTITY / "colori.json").read_text())
COLOR_DIR = OUT / "colori"
COLOR_DIR.mkdir(exist_ok=True)

def recolor(source, colors, destination):
    rgb = np.asarray(Image.open(source).convert("RGB"), dtype=np.float32) / 255.0
    high = rgb.max(axis=2)
    low = rgb.min(axis=2)
    saturation = np.divide(high-low, high, out=np.zeros_like(high), where=high > 0)
    luminance = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    # Soglie ampie: i neri restano inchiostro, i colori saturi diventano accento,
    # i passaggi neutri medi diventano secondario e le luci carta.
    role = np.full(luminance.shape, 3, dtype=np.uint8)  # carta
    role[(luminance < 0.28)] = 0                           # inchiostro
    role[(luminance >= 0.28) & (luminance < 0.72) & (saturation < 0.24)] = 1  # secondo
    role[(luminance >= 0.28) & (luminance < 0.92) & (saturation >= 0.24)] = 2 # accento
    targets = np.array([[int(c[i:i+2],16) for i in (1,3,5)] for c in colors], dtype=np.float32) / 255.0
    gray = np.repeat(luminance[:,:,None], 3, axis=2)
    mapped = targets[role]
    # Tintatura intensa ma non piatta: il residuo neutro conserva grana, luce e pieghe.
    result = np.clip(mapped * 0.78 + gray * 0.22, 0, 1)
    Image.fromarray(np.uint8(result * 255)).save(destination, "WEBP", quality=86, method=5)

for illustration in [{"id":"I00", "file":"i00-v4"}, *ILLUSTRATIONS]:
    source = IDENTITY / "assets" / f"{illustration['file']}.png"
    for palette in PALETTES:
        target = COLOR_DIR / f"{illustration['id'].lower()}-{palette['id'].lower()}.webp"
        if illustration["id"] == "I00" and palette["id"] == "C00":
            Image.open(source).convert("RGB").save(target, "WEBP", quality=92, method=5)
        else:
            recolor(source, palette["colors"], target)
