# stella.casa · Print masters

Folder: `brand/print/`.

All files are vector SVGs with live text embedded via @font-face (base64, Outfit + DM Sans) where present. They are NOT certified PDF/X: before printing, the printer must convert them to the required format (e.g. PDF/X-1a or X-4) with an RGB → CMYK color conversion using the ICC profile of the chosen machine/paper. The color values below are the brand HEX/RGB; the final CMYK result depends on the printer's profile and must be checked with a color proof before the print run.

## Placeholders to replace before sending to print

- "Nome Cognome", "Responsabile ospiti", "+39 000 000 0000", "nome@stella.casa" on the back of the business card.
- "Stella sul Mare" on the sign (house name: customize for each property).

No other data is invented: URL and brand are the real ones (stella.casa).

## Brand colors (HEX)

- Corallo `#F25B45`
- Vino `#511B36`
- Pesca `#F6B495`
- Lavanda `#B7A0CA`
- Crema `#FFF3E7`
- Prugna `#281C2D`

CMYK conversion: to be done at output with the printer's ICC profile (recommended: FOGRA51/39 for coated offset, or the specific plotter/laser profile for stickers and signs). Do not use generic automatic software conversions: check Corallo and Vino on a screen color proof, they are the two tones most prone to color drift.

## Files

### 1) biglietto-fronte-91x61-bleed3.svg
Trim: 85×55 mm. Bleed: 3 mm per side. File format: 91×61 mm. Solid Vino background, stacked logo (logo-crema) centered.
Material: coated/natural card 350-400 g/m², matte lamination recommended (solid Vino shows every scratch on gloss).
The dashed light-blue rectangle (layer "guida-taglio") is a non-printing reference guide: remove it or move it to a non-print layer before imposition at the printer.

### 2) biglietto-retro-91x61-bleed3.svg
Same format/bleed as the front. Crema background, Prugna text (DM Sans), small Corallo symbol (decorative only, no text on top: respects the contrast rule). Replace the name, role, phone and email placeholders.

### 3) targa-220x160.svg
Format: 220×160 mm. NO bleed (rigid panel, not die-cut to the edge). Safety margin respected: 12 mm.
Prugna background, title "Stella sul Mare" in Outfit Crema, pay-off "Una casa seguita da" + horizontal signature (firma-crema).
Recommended material: 3 mm dibond/aluminum with direct UV print, or engraved/backlit plexiglass. "Stella sul Mare" is a placeholder for the property name: customize for each property.

### 4) adesivo-50x50.svg
Trim diameter: 50 mm. Bleed: 2 mm. File format: 54×54 mm.
Solid Corallo circle with the symbol (simbolo-prugna) centered.
Layer "grafica" = print; layer "fustella" = cut line (magenta circle #FF00FF, 0.25 mm stroke) to be isolated on a separate plane at the printer (standard die-cut sticker).
Material: matte white or transparent adhesive vinyl + matte lamination, circular free-form die cut.

### 5) segnalibro-56x186-bleed3.svg
Trim: 50×180 mm. Bleed: 3 mm. File format: 56×186 mm.
Crema background, Vino top band with title "Lettere / da casa" (Outfit Crema), pay-off "stella.casa/lettere" at the bottom (Prugna/DM Sans).
Material: 300-350 g/m² card, optionally with rounded die-cut corners (not included in this file, to be requested from the printer if wanted).

### 6) cartellina-fronte-226x316-bleed3.svg
Trim: 220×310 mm (front of an A4 folder with flap). Bleed: 3 mm. File format: 226×316 mm.
Vino background, large Corallo symbol cropped by the right edge (decorative element, the only one that may be cropped: the stacked signature logo at the bottom left is never cropped). Title "La tua casa, seguita da vicino." in Outfit Crema.
Material: 300-350 g/m² card for folders, matte varnish or lamination recommended on the Vino.

### 7) portachiavi-fustella-40x50.svg
Format: 40×50 mm. No bleed (shaped object).
Layer "grafica" = printed/engraved surface (solid Vino, symbol + solid top tab with hole).
Layer "fustella" = single cut line around the symbol welded to the tab (magenta stroke #FF00FF 0.25 mm, fill none), plus the 3.2 mm diameter through-hole circle, placed in the solid tab (structurally solid area, not in the thin parts of the interlock).
IMPORTANT NOTE: the key ring tab is not part of the original logo. It is a practical addition for this gadget, welded to the symbol with a boolean union (path-union) already performed during preparation, so the cut contour has no spurious joints. Still check in a vector preview, before laser cutting or metal die cutting, that the minimum thickness of the chosen material (acrylic, wood, metal) can hold the thinnest strokes of the interlock.
Material: 3 mm acrylic or engraved metal, Vino on a light background or open cut.

### targhetta-150x100.svg
Name plate for the house, to be placed next to the front door or the intercom.
Format 150 x 100 mm, no bleed. Enameled ceramic or cream-painted aluminum, Vino print.
Layer "fori": two 4 mm fixing holes (magenta, do not print). Alternatively outdoor double-sided tape.
In-situ preview: `../assets/mockup-targhetta.jpg`

### Textiles (towels and bed linen)
Embroidery of the symbol, not of the full mark. Height 35-45 mm on towels, 25-30 mm on pillowcases.
Light version: cream fabric, Vino embroidery. Dark version: Vino fabric, cream embroidery.
Corallo accent only as a thin outline or edge (sheets) or band (towels), never as symbol embroidery on cream.
Check with the supplier that the Vino color holds up to 60 °C washes.

## Fonts

- Outfit (headings, weight 600, letter-spacing -0.03em): embedded in base64 in files with live text.
- DM Sans (text, 400/700): same.

Source font files: `../font/outfit-variable-latin.woff2`, `../font/dm-sans-variable-latin.woff2` (OFL license, see the attached .txt files).

## Logo "Incastro"

The logo path was copied directly from the vector files in `../assets/` (simbolo-*, logo-*, firma-*) and repositioned with transform scale/translate, never touching the nodes nor retyping the wordmark as text. Minimum clear space around the logo: 25% of the symbol height (respected in all layouts with logo/signature).

All files in this folder were also exported as PNG previews at 1200 px width (same file name, .png extension) for visual checking only: they are not for print use.
