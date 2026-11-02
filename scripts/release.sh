#!/bin/bash
# Prepara (e con --publish pubblica) una Release del brand.
# Uso: scripts/release.sh <tag> [--publish]      es. scripts/release.sh brand-v5.1
# Senza --publish: costruisce solo dist/ in locale. 
set -euo pipefail
TAG="${1:?tag mancante (es. brand-v5.1)}"; MODE="${2:-}"
cd "$(dirname "$0")/.."
[ -z "$(git status --porcelain)" ] || { echo "Albero non pulito: committa prima."; exit 1; }
rm -rf dist && mkdir dist
git archive --format=zip -o "dist/stella-casa-brand-kit-$TAG.zip" HEAD \
  assets canali font stampa tokens.css design-tokens.json LEGGIMI.md sorgenti
cp pdf/stella-casa-brand-book.pdf     "dist/stella-casa-brand-book-$TAG.pdf"
cp pdf/stella-casa-brand-identity.pdf "dist/stella-casa-brand-identity-$TAG.pdf"
(cd dist && shasum -a 256 * > SHA256SUMS.txt)
ls -lh dist
[ "$MODE" = "--publish" ] || { echo "Solo build locale. Aggiungi --publish per pubblicare."; exit 0; }
git rev-parse -q --verify "refs/tags/$TAG" >/dev/null || git tag -a "$TAG" -m "Brand $TAG"
git push -q origin "$TAG"
if gh release view "$TAG" >/dev/null 2>&1; then
  gh release upload "$TAG" dist/* --clobber
else
  gh release create "$TAG" dist/* --title "Brand $TAG" --notes "${NOTES:-Rilascio brand $TAG}"
fi
