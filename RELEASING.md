# Releasing the brand

Rule: generated files (kits, archives, versioned PDFs) live in **Releases**, never in commits. The repo only keeps the two current PDFs in `pdf/`.

## New version
1. Edit and commit the sources (HTML, tokens, assets). Regenerate the PDFs in `pdf/` if they change.
2. `scripts/release.sh brand-vX.Y` builds `dist/` (kit zip, PDFs, checksums). `dist/` is git-ignored.
3. Check `dist/`. When ready: `scripts/release.sh brand-vX.Y --publish` (creates and pushes the tag, creates the Release).

## Fixing an existing Release
Same tag, same command with `--publish`: assets are replaced (`--clobber`).

## Regenerating the brand book PDF
`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer --print-to-pdf=pdf/stella-casa-brand-book.pdf file://$PWD/brand-book.html` (27 pages, 1200×750 pt). Same command for `brand-identity.html`.

## Historical versions
Older versions (v4, v5 kits and PDFs) are kept outside this repo.
