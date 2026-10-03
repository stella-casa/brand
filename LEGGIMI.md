# stella.casa / Linee guida

Apri `index.html`. La presentazione visiva è `brand-identity.html` (16 tavole). Il manuale operativo è `brand-book.html` (27 pagine). I PDF sono in `pdf/`.

Consolida le scelte di identità: marchio Incastro, nuova palette, Outfit e DM Sans, illustrazioni in due famiglie, sito per proprietari e canali. Tutte le decisioni sono in `sorgenti/DECISIONI.md`.

## File

- `assets/`: `logo-*` (marchio completo), `firma-*` (orizzontale), `simbolo-*`, `logotipo-*` in SVG e PNG; `avatar`, `favicon`, `logo-costruzione`; illustrazioni `luce-*` (famiglia A) e `incisione-*` (famiglia B); foto della casa pilota; `icone/`.
- `canali/sito/`: il sito completo (home proprietari, Instagram, Facebook, Substack, Diario, articolo, Stella sul Mare, guida illustrazioni). Apri `canali/sito/index.html`.
- `canali/*.html`: story, carosello, firma email, locandina, benvenuto, quaderno. I PNG sono esportazioni.
- `stampa/`: master SVG e specifiche in `LEGGIMI.txt`.
- `font/`: Outfit e DM Sans WOFF2 con licenze OFL.
- `design-tokens.json`, `tokens.css`: valori del sistema.
- `sorgenti/`: `genera-documenti.py` rigenera i due documenti; `DECISIONI.md`; `contrasti.json`.

## Limiti dichiarati

- I tracciati del marchio sono vettorializzati dalla tavola originale: prima di stampe grandi o incisioni serve un ridisegno geometrico esatto e la verifica di registrabilità.
- Le illustrazioni sono immagini generate e rilavorate; per stampe grandi serve un esecutivo alla risoluzione richiesta.
- Sito e canali sono prototipi locali non pubblicati. Moduli e iscrizioni non inviano dati.
- I master di stampa sono RGB, non PDF/X; la conversione CMYK va fatta con il profilo della tipografia.
