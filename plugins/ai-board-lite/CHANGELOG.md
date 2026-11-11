# Changelog

## 0.1.3 — 2026-11-11

The plugin now lives in `plugins/ai-board-lite/`, with only manifests, skills, images and docs in it. Repo tooling (CI, release scripts) sits outside the plugin folder, so plugin directories scan just what ships. Releases carry one asset, the plugin ZIP, which Gemini CLI now installs instead of the whole repository; its SHA-256 is in the release notes. No skill changed.

## 0.1.2 — 2026-10-08

Listing wording for the OpenAI directory: no pricing in the descriptions, and the README and skill descriptions describe what the skills are built to do instead of promising it.

## 0.1.1 — 2026-10-08

Use the PNG logo as the Claude directory icon; the SVG didn't show in the listing.

## 0.1.0 — 2026-10-08

First release of AI Board Lite: `actionables`, `meeting-prep`, `build-deck`, `review-deck`, `compare-decks`, `analyze-spreadsheet`, `build-spreadsheet`, `decision-memo` and `stakeholder-update`.
