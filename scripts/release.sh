#!/bin/bash
# Builds (and with --publish, publishes) a brand Release.
# Usage: scripts/release.sh <tag> [--publish]   e.g. scripts/release.sh brand-v5.1
# Without --publish it only builds dist/ locally.
set -euo pipefail
TAG="${1:?missing tag (e.g. brand-v5.1)}"; MODE="${2:-}"
cd "$(dirname "$0")/.."
[ -z "$(git status --porcelain)" ] || { echo "Working tree not clean: commit first."; exit 1; }
rm -rf dist && mkdir dist
git archive --format=zip -o "dist/stella-casa-brand-kit-$TAG.zip" HEAD \
  assets canali font stampa tokens.css design-tokens.json LEGGIMI.md sorgenti
cp pdf/stella-casa-brand-book.pdf     "dist/stella-casa-brand-book-$TAG.pdf"
cp pdf/stella-casa-brand-identity.pdf "dist/stella-casa-brand-identity-$TAG.pdf"
(cd dist && shasum -a 256 * > SHA256SUMS.txt)
ls -lh dist
[ "$MODE" = "--publish" ] || { echo "Local build only. Add --publish to publish."; exit 0; }
git rev-parse -q --verify "refs/tags/$TAG" >/dev/null || git tag -a "$TAG" -m "Brand $TAG"
git push -q origin "$TAG"
if gh release view "$TAG" >/dev/null 2>&1; then
  gh release upload "$TAG" dist/* --clobber
else
  gh release create "$TAG" dist/* --title "Brand $TAG" --notes "${NOTES:-Brand release $TAG}"
fi
