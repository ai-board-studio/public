---
name: actionables
description: Turns a meeting transcript into decisions, action items with an owner, a due date and the quote behind each one, and per-person follow-up drafts. Marks owners and dates nobody said as missing, and drafts follow-ups without sending them. Use when the user shares a transcript and asks "what are the action items", "what did we agree", "wat zijn de actionables", "wat waren mijn acties".
---

# Actionables

Nobody leaves a meeting knowing who owes what. That is the problem this solves.
The classic way to get it wrong is to invent owners and dates the room never
said. So every action item traces back to a line in the transcript. Ownership
that was not said out loud becomes `UNASSIGNED`. It is never inferred from
whoever spoke last. The same goes for dates. You draft follow-ups. You never
send them.

## Ground rules

- Work only from the transcript the user provides. Nothing else counts as a
  source.
- Every decision and every action item carries the quote it came from.
- No stated owner means `UNASSIGNED`. No stated date means "no date agreed".
  Never infer either.
- Answer in the language the user writes in. Draft each follow-up in the
  language of the person it is for, if the transcript makes that clear.
  The example below is in English; translate its headings too.

## When to use

The user shares a meeting transcript, or points at one, and asks "what are the
action items", "what did we agree", "who owes what", "wat zijn de actionables",
"wat waren mijn acties".

## Steps

1. **Get the text.** Accept a pasted transcript, or a `.txt`, `.vtt`, `.srt`,
   `.md` or `.docx` file. Read the file with whatever this environment offers.
   For `.docx`, a converter such as `markitdown` works if it is installed. If
   there is no way to read the file, ask the user to paste the text or export
   it as `.txt`. Audio is out of scope: ask for the transcript the meeting
   platform produced.
2. **Find out who the user is** in the transcript, if it is not obvious. Ask
   once. Their own items get pulled out at the end.
3. **Read for four things:** decisions taken, action items, open questions and
   things explicitly deferred. Extract every action item as owner, task, due
   date and source quote.
4. **Check speaker labels.** If the transcript has no speaker names, say so at
   the top: owners can then only come from what was said ("Marieke, can you…"),
   never from who was talking.
5. **Draft one follow-up per person**, containing only their own items, short
   enough to send as a chat message. Present them in the chat for the user to
   copy.
6. **Offer to keep it for next time.** If this environment can write files,
   offer to save the result as `Meetings/<YYYY-MM-DD> · <meeting name>.md` in a
   folder the user chooses. Explain the reason in one sentence: next time,
   meeting prep can read this note instead of the user pasting it again. Do
   not write anything without the user saying yes.

## Output format

```markdown
## Decisions (2)
- The pilot runs in Service, not Sales. · "let's do service, that's where the volume is"
- Budget waits until the pilot shows numbers. · "no budget before we see data"

## Action items (5)
| # | Owner | Action | Due | Source |
|---|---|---|---|---|
| 1 | You | Confirm the pilot team to everyone | 2026-08-07 | "I'll confirm it Friday" |
| 2 | Marieke | Budget frame for the pilot | 2026-08-14 | "give me two weeks" |
| 3 | UNASSIGNED | Review data access before go-live | no date agreed | nobody claimed this |

**Yours: 1 item, due Friday 2026-08-07.**

## Open questions
- Who signs off on go-live? Raised, not answered.

## Follow-up drafts · copy and send yourself
**To Marieke:** Hi Marieke, from today's meeting: the budget frame for the
Service pilot. You said two weeks, so 14 August. Let me know if that moves.
```

## Limits

- Text in, text out. No audio transcription.
- This skill never sends email, chat messages or invites. If the user asks
  whether the follow-ups went out, the honest answer is that only they know.
- A transcript without speaker labels gives weaker owners. Flag it, do not
  guess.
- Relative dates ("next Friday") are resolved against the meeting date. If the
  meeting date is unknown, ask for it or keep the words as spoken.
