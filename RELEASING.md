# Releasing

The plugin is the folder `plugins/ai-board-lite/`. It holds only manifests,
skills, images and docs; tooling stays outside it so plugin directories can
scan everything that ships (`scripts/check.mjs` enforces this).

One version number lives in five places, all under the plugin folder except
the marketplace: `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`,
`gemini-extension.json`, a `## X.Y.Z` section in `CHANGELOG.md`, and the
entry in the repo-root `.claude-plugin/marketplace.json`.
`scripts/check.mjs` fails CI when they disagree.

1. On a branch: `node scripts/bump.mjs X.Y.Z` and replace the TODO in
   `plugins/ai-board-lite/CHANGELOG.md` with what changed. Patch for wording
   fixes, minor for a new or changed skill, major for a removed or renamed
   skill.
2. Open a PR. CI checks the manifests, validates for Claude and Gemini, and
   builds the ZIP.
3. After the merge, tag the merge commit on `main` and push the tag:
   `git tag vX.Y.Z && git push origin vX.Y.Z`
4. The release workflow checks that the tag is on `main` and matches the
   manifests, builds `ai-board-lite-X.Y.Z.zip` and publishes a GitHub
   release with the ZIP as its only asset and the CHANGELOG section plus the
   ZIP's SHA-256 as notes. Keep it to one asset: Gemini CLI installs a release's single
   asset and falls back to the whole-repo tarball when there are more.

`v*` tags cannot be moved or deleted (repository ruleset "release tags are
immutable"), so a bad release is fixed with a new patch version, never by
re-tagging.

After a release:
- ai-board.studio: copy the ZIP to `public/downloads/` in the site repo and
  point `LITE_PLUGIN.zip` at it.
- OpenAI: upload the new ZIP as a new version in the plugin dashboard.
- Anthropic picks up new commits from the repository; Gemini CLI picks up the
  new release.
- Grok Build: bump the pinned `sha` in xai-org/plugin-marketplace.

Local build: `bash scripts/build-zip.sh` (writes `dist/`).
