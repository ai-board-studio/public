# AI Board plugins

This repository publishes [AI Board Lite](plugins/ai-board-lite/README.md):
executive skills for meetings, PowerPoint, Excel and decisions, for Claude
(the Claude app and Claude Code), ChatGPT and Codex, Gemini CLI and Grok Build.

## Install

| Where | How |
|---|---|
| Claude (app) | Download `ai-board-lite-<version>.zip` from the [latest release](https://github.com/ai-board-studio/public/releases/latest) and upload it under Customize → Plugins. |
| Claude Code | `/plugin marketplace add ai-board-studio/public`, then `/plugin install ai-board-lite@ai-board-studio` |
| Codex | `codex plugin marketplace add ai-board-studio/public`, then `codex plugin add ai-board-lite@ai-board-studio` |
| Gemini CLI | `gemini extensions install https://github.com/ai-board-studio/public` |
| Grok Build | Grok Build reads Claude Code marketplaces: add this repository as a marketplace source, then install `ai-board-lite` from the Marketplace tab. |

What the skills do, and what they don't: [plugins/ai-board-lite/README.md](plugins/ai-board-lite/README.md).

## Layout

- `plugins/ai-board-lite/`: the plugin, exactly as it ships (manifests for
  Claude, Codex and Gemini, skills, images, docs). No code.
- `.claude-plugin/marketplace.json`, `.agents/plugins/marketplace.json`: the
  Claude and Codex marketplaces, pointing at the plugin folder.
- `scripts/`, `.github/`: checks, version bump, ZIP build and release. See
  [RELEASING.md](RELEASING.md).

## License

MIT. See `LICENSE`.
