# AI Board Lite

Free skills for the work that comes back every week in an executive's
calendar: meetings, presentations, spreadsheets and decisions. They work in
Claude (the Claude app and Claude Code), ChatGPT and Codex, Gemini CLI and
Grok Build.

| Area | Skill | What it does |
|---|---|---|
| Meetings | `actionables` | Turns a transcript into decisions and action items, each with an owner, a due date and the quote it came from. Drafts one follow-up per person. |
| Meetings | `meeting-prep` | A delta brief for an upcoming meeting: what was agreed last time, what changed since, who owes what, three talking points. |
| PowerPoint | `build-deck` | Turns notes or a brief into a board-ready deck: storyline first, one message per slide, then a `.pptx` or a slide-by-slide outline. |
| PowerPoint | `review-deck` | Reviews a deck the way a board member reads it: does the story hold, do the numbers agree, what will they ask. |
| PowerPoint | `compare-decks` | Compares two versions of a deck on message and numbers: changed figures, dropped claims, softened language. |
| Excel | `analyze-spreadsheet` | Explains what a spreadsheet says, with the biggest movements, variances and data problems, each with its cell reference. |
| Excel | `build-spreadsheet` | Builds a working `.xlsx` (budget, forecast, tracker) with real formulas and marked input cells. |
| Decisions | `decision-memo` | A one-page decision memo: options including doing nothing, honest trade-offs, a recommendation and the exact ask. |
| Decisions | `stakeholder-update` | A short update for a board, investors or a team: headline, status per topic, what moved, what is needed. |

Ask in plain language, for example "what are the action items from this
transcript", "turn these notes into five slides for the board" or "what does
this spreadsheet tell me".

## Install

| Where | How |
|---|---|
| Claude (app) | Download `ai-board-lite-<version>.zip` from the [latest release](https://github.com/ai-board-studio/public/releases/latest) and upload it under Customize → Plugins. |
| Claude Code | `/plugin marketplace add ai-board-studio/public`, then `/plugin install ai-board-lite@ai-board-studio` |
| Codex | `codex plugin marketplace add ai-board-studio/public`, then `codex plugin add ai-board-lite@ai-board-studio` |
| Gemini CLI | `gemini extensions install https://github.com/ai-board-studio/public` |
| Grok Build | Grok Build reads Claude Code marketplaces: add this repository as a marketplace source, then install `ai-board-lite` from the Marketplace tab. |

## What these skills do and do not do

- **They only use what you give them** in the conversation: a transcript,
  notes, emails, decks, spreadsheets. They do not search your mail, calendar
  or files on their own.
- **They never invent numbers, owners, dates or agreements.** Anything that
  is not in your material is marked as missing.
- **They never send anything.** Follow-ups and updates are drafts for you.
- **They create or change files only when you say yes**, and only where the
  environment allows it. A spreadsheet you share is never overwritten; a
  corrected version is saved as a new file.
- **No network calls, no data collection, no credentials.** The plugin is
  plain instructions. Your data goes only where your Claude or ChatGPT setup
  already sends it.

## Optional tools

Creating and reading `.pptx` and `.xlsx` files works where the environment can
run Python (for example with `python-pptx`, `openpyxl` or
[MarkItDown](https://github.com/microsoft/markitdown)). Without that, the
skills give you an outline or a table to paste instead.

## About AI Board

These skills come from [AI Board](https://ai-board.studio), which sets up Claude
as a working executive assistant on your own machine, with a vault that
remembers your meetings, decisions and numbers, and routines that keep them
current. In AI Board, meeting prep and updates read that history for you.

## Support and privacy

- Documentation: https://ai-board.studio/en/plugins/ai-board-lite
- Support: https://ai-board.studio/en/plugins/support
- Privacy statement: https://ai-board.studio/en/plugins/privacy
- Mail: jordi.daniels@ai-board.studio

## License

MIT. See `LICENSE`.
