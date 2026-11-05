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
  assets channels font print tokens.css design-tokens.json README.md LICENSES.md sources
# Core bundle: the small artifact other repositories import (tokens, logo marks, favicon, fonts) with a manifest.
CORE=(tokens.css design-tokens.json assets/firma-prugna.svg assets/firma-vino.svg assets/firma-crema.svg assets/favicon.svg font/outfit-variable-latin.woff2 font/dm-sans-variable-latin.woff2)
core="$(mktemp -d)"; mkdir -p "$core/assets" "$core/font"
for f in "${CORE[@]}"; do cp "$f" "$core/$f"; done
python3 - "$core" "$TAG" <<'PY'
import hashlib, json, os, sys
root, tag = sys.argv[1], sys.argv[2]
files = {}
for d, _, fs in os.walk(root):
    for f in fs:
        p = os.path.join(d, f); files[os.path.relpath(p, root)] = hashlib.sha256(open(p, "rb").read()).hexdigest()
json.dump({"name": "stella-casa-brand-core", "version": tag, "files": dict(sorted(files.items()))}, open(os.path.join(root, "MANIFEST.json"), "w"), indent=2)
PY
(cd "$core" && zip -qr "$OLDPWD/dist/stella-casa-brand-core-$TAG.zip" .)
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
