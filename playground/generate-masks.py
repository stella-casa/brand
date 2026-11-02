"""Extracts the mark shapes from the plates and produces transparent masks for the previews."""
from pathlib import Path
import json
from PIL import Image
import numpy as np

HERE = Path(__file__).resolve().parent
ROOT = HERE / "sources" / "logos"
OUT = HERE / "assets"
OUT.mkdir(exist_ok=True)

# Plate crops: Incastro (mark + name) and Firma/Iniziale (wordmark).
# Fields are derived from the color difference against the plate's uniform background.
STUDIES = {
    "01": ("01-incastro.png", (60, 70, 840, 685), (280, 135, 455, 455)),
    "24": ("24-firma-filo-iniziale.png", (45, 65, 875, 640), (660, 780, 150, 150)),
}

def extract(source, box, destination):
    image = Image.open(source).convert("RGB")
    x, y, width, height = box
    crop = image.crop((x, y, x + width, y + height))
    pixels = crop.load()
    # Corner inside the flat fill that hosts the signature.
    background = pixels[3, 3]
    output = Image.new("RGBA", crop.size, (0, 0, 0, 0))
    out = output.load()
    for py in range(height):
        for px in range(width):
            r, g, b = pixels[px, py]
            distance = max(abs(r-background[0]), abs(g-background[1]), abs(b-background[2]))
            # Soft threshold to keep the lettering antialiasing while leaving out
            # the minimal variations of the background fill.
            alpha = max(0, min(255, round((distance - 16) * 2.8)))
            if alpha:
                out[px, py] = (255, 255, 255, alpha)
    output.save(destination)

for number, (filename, full_box, icon_box) in STUDIES.items():
    source = ROOT / filename
    extract(source, full_box, OUT / f"logo-{number}.png")
    extract(source, icon_box, OUT / f"simbolo-{number}.png")

# Exports recolored illustration previews: keeps tones and texture, remapping
# shadows, midtones, accents and surfaces to the roles of the chosen palette.
IDENTITY = HERE / "sources" / "identity"
ILLUSTRATIONS = json.loads((IDENTITY / "illustrations.json").read_text())["proposte"]
PALETTES = json.loads((IDENTITY / "colors.json").read_text())
COLOR_DIR = OUT / "colors"
COLOR_DIR.mkdir(exist_ok=True)

def recolor(source, colors, destination):
    rgb = np.asarray(Image.open(source).convert("RGB"), dtype=np.float32) / 255.0
    high = rgb.max(axis=2)
    low = rgb.min(axis=2)
    saturation = np.divide(high-low, high, out=np.zeros_like(high), where=high > 0)
    luminance = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    # Wide thresholds: blacks stay ink, saturated colors become accent,
    # mid neutral tones become secondary and highlights become paper.
    role = np.full(luminance.shape, 3, dtype=np.uint8)  # paper
    role[(luminance < 0.28)] = 0                           # ink
    role[(luminance >= 0.28) & (luminance < 0.72) & (saturation < 0.24)] = 1  # second
    role[(luminance >= 0.28) & (luminance < 0.92) & (saturation >= 0.24)] = 2 # accent
    targets = np.array([[int(c[i:i+2],16) for i in (1,3,5)] for c in colors], dtype=np.float32) / 255.0
    gray = np.repeat(luminance[:,:,None], 3, axis=2)
    mapped = targets[role]
    # Strong but not flat tinting: the neutral residue keeps grain, light and folds.
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
