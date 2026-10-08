#!/usr/bin/env bash
# Builds dist/ai-board-lite-<version>.zip: the shipped plugin files under one
# top-level ai-board-lite/ folder (the layout the Claude app upload, the OpenAI
# "Skills only" upload and the ai-board.studio download all take), plus a
# .sha256 next to it. Repo tooling (.github, scripts, .agents) stays out.
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/check.mjs
name=$(node -p 'require("./.claude-plugin/plugin.json").name')
version=$(node -p 'require("./.claude-plugin/plugin.json").version')
stage=$(mktemp -d)
trap 'rm -rf "$stage"' EXIT
mkdir -p "$stage/$name"
cp -R .claude-plugin .codex-plugin gemini-extension.json skills assets README.md LICENSE CHANGELOG.md "$stage/$name/"
# the marketplace file lists the repo, not the ZIP
rm -f "$stage/$name/.claude-plugin/marketplace.json"
mkdir -p dist
out="dist/$name-$version.zip"
rm -f "$out"
(cd "$stage" && TZ=UTC find "$name" -exec touch -t 202601010000 {} + && zip -qrX "$OLDPWD/$out" "$name" -x '*.DS_Store')
(cd dist && shasum -a 256 "$(basename "$out")" > "$(basename "$out").sha256")
echo "$out"
