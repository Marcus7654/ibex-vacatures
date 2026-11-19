#!/usr/bin/env bash
# Bouwt dist/vacature.zip uit .claude/skills/vacature (zonder test- en uitvoerbestanden).
set -euo pipefail
cd "$(dirname "$0")"
rm -rf dist && mkdir -p dist
cd .claude/skills
zip -qr ../../dist/vacature.zip vacature \
  -x 'vacature/linkedin-generator/output/*' \
  -x 'vacature/linkedin-generator/node_modules/*' \
  -x 'vacature/linkedin-generator/data/tests/*' \
  -x '*.DS_Store'
cd ../..
echo "dist/vacature.zip ($(du -h dist/vacature.zip | cut -f1))"
