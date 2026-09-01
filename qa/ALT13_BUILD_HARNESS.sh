#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

EVIDENCE="qa/ALT13_BUILD_RUNTIME_EVIDENCE.txt"
: > "$EVIDENCE"
exec > >(tee -a "$EVIDENCE") 2>&1

echo "=== KBS FLOW GAME ALT-13 PRODUCTION BUILD HARNESS ==="
date
echo "ROOT=$ROOT_DIR"
echo "NODE=$(node -v)"
echo "NPM=$(npm -v)"

echo "[1/5] Install dependencies"
npm install --no-audit --no-fund

echo "[2/5] Run unit tests"
npm test

echo "[3/5] Production build"
npm run build

echo "[4/5] Validate dist artifact"
test -f dist/index.html
if grep -q '/src/main.tsx' dist/index.html; then
  echo "DIST_SOURCE_ENTRY_LEAK=FAIL"
  exit 1
fi
if ! find dist -type f | grep -q .; then
  echo "DIST_EMPTY=FAIL"
  exit 1
fi

echo "DIST_INDEX=PASS"
echo "DIST_SOURCE_ENTRY_LEAK=PASS"
echo "DIST_FILE_COUNT=$(find dist -type f | wc -l | tr -d ' ')"
echo "DIST_BYTES=$(du -sb dist | awk '{print $1}')"

echo "[5/5] Dist SHA-256 manifest"
(
  cd dist
  find . -type f -print0 | sort -z | xargs -0 sha256sum
) > qa/ALT13_DIST_MANIFEST.sha256

echo "ALT13_NPM_INSTALL=PASS"
echo "ALT13_TESTS=PASS"
echo "ALT13_PRODUCTION_BUILD=PASS"
echo "ALT13_DIST_VALIDATION=PASS"
echo "ALT13_BUILD_COMPLETE=PASS"
