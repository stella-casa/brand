# Rilasci del brand

Regola: i file generati (kit, archivi, versioni PDF) stanno nelle **Releases**, mai committati. Nel repo restano solo i due PDF correnti in `pdf/`.

## Nuova versione
1. Modifica e committa i sorgenti (HTML, token, asset). Aggiorna i PDF in `pdf/` se cambiano.
2. `scripts/release.sh brand-vX.Y` costruisce `dist/` (kit zip, PDF, checksum). `dist/` è ignorato da git.
3. Controlla `dist/`. `scripts/release.sh brand-vX.Y --publish` (tag + Release).

## Correggere una Release esistente
Stesso tag, stesso comando con `--publish`: gli asset vengono sostituiti (`--clobber`).

## Archivio
`archivio-identita`: versioni v4/v5 dei PDF e kit storici. Si carica una volta con `gh release create archivio-identita <file…>`.
