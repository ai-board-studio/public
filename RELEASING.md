# Releasing

One version number lives in five places: `.claude-plugin/plugin.json`,
`.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`,
`gemini-extension.json` and a `## X.Y.Z` section in `CHANGELOG.md`.
`scripts/check.mjs` fails CI when they disagree.

1. On a branch: `node scripts/bump.mjs X.Y.Z` and replace the TODO in
   `CHANGELOG.md` with what changed. Patch for wording fixes, minor for a new
   or changed skill, major for a removed or renamed skill.
2. Open a PR. CI checks the manifests, validates for Claude and Gemini, and
   builds the ZIP.
3. After the merge, tag the merge commit on `main` and push the tag:
   `git tag vX.Y.Z && git push origin vX.Y.Z`
4. The release workflow checks that the tag is on `main` and matches the
   manifests, builds `ai-board-lite-X.Y.Z.zip` (+ `.sha256`) and publishes a
   GitHub release with the CHANGELOG section as notes.

Never move or delete a `v*` tag: a bad release is fixed with a new patch
version. When the repository goes public, enforce this with a tag ruleset
(Settings → Rules → Rulesets: target `refs/tags/v*`, block deletion and
updates). GitHub doesn't offer rulesets on private repositories on the
current plan.

After a release:
- ai-board.studio: copy the ZIP to `public/downloads/` in the site repo and
  point `LITE_PLUGIN.zip` at it.
- OpenAI: upload the new ZIP as a new version in the plugin dashboard.
- Anthropic and Gemini CLI pick up new commits and tags from the repository.
- Grok Build: bump the pinned `sha` in xai-org/plugin-marketplace.

Local build: `bash scripts/build-zip.sh` (writes `dist/`).
