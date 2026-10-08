---
name: meeting-prep
description: Builds a delta brief for an upcoming meeting from the notes, emails and documents the user provides. Reconstructs what was agreed last time, what changed since, who owes what, and three talking points, each line with its source. Use when the user asks "prep me for X", "where did we leave X last time", "bereid me voor op X".
---

# Meeting Prep

The real question is never "what is this meeting about". It is "what did we
agree last time, and what quietly changed since". This is a delta brief, not a
summary. Two ways to get it wrong: padding it with context the user already
has, and stating a prior agreement you cannot point to a source for.

## Ground rules

- Work only from what the user provides in this conversation: previous meeting
  notes, transcripts, email threads, decks, documents. Nothing else counts as a
  source.
- Every claim about "last time" cites the document it came from. No source, no
  line.
- Silence means "not recorded", not "nothing happened". Say which one it is.
- Answer in the language the user writes in.
  The example below is in English; translate its headings too.

## When to use

The user has a meeting coming up and asks "prep me for the board call", "where
did we leave X last time", "what do I need to know before Thursday", "bereid me
voor op X", "hoe stond het er vorige keer voor".

## Steps

1. **Pin down the meeting:** topic, who is in the room, when. Ask for whatever
   is unclear. Guessed attendees produce a wrong brief.
2. **Gather the material.** If the user keeps meeting notes in a folder (for
   example a `Meetings/` folder saved in earlier sessions) and this
   environment can read it, ask to search it on the topic and the people.
   Otherwise ask the user for the notes or transcript of the previous meeting,
   plus anything since: email threads, updated decks, status reports. If they have nothing on record, say so in the first line of the
   brief and work from what they can tell you.
3. **Reconstruct "last time":** decisions taken, commitments made, who owed
   what. Cite the source for each line.
4. **Work out the delta:** commitments that were met, missed or never started,
   numbers that moved, new documents or facts touching the topic. Compare dates
   against today to show how long each open item has been open.
5. **List open items by owner**, with the promised date and how overdue each
   one is.
6. **Write three talking points.** A talking point is a position with a reason,
   not a topic.
7. **Offer to keep it for next time.** If this environment can write files,
   offer to save the brief as `Meetings/<YYYY-MM-DD> · <topic> prep.md`, with
   headings that can take the real minutes afterwards, so the next prep starts
   from it. Do not write anything without the user saying yes.

## Output format

```markdown
# 2026-08-03 · AI strategy (prep)

**Last time:** 2026-06-14, same group. Source: notes from 14 June.

## Agreed then
- Pilot in one department first, broad rollout after. *(decision, notes 14 June)*
- Budget parked until the pilot shows numbers. *(open, no owner recorded)*

## Changed since
- The pilot never started: no mention in any email since, 7 weeks gone.
- New: the Q3 budget deck sets a precedent for pilot spend. *(budget deck, slide 6)*

## Who owes what
| Item | Owner | Promised | Status |
|---|---|---|---|
| Choose the pilot department | You | 2026-06-14 | 50 days open |
| Budget frame | Finance | no date | never assigned |

## 3 talking points
1. The pilot is the decision. Seven weeks without choosing cost a quarter.
2. Don't reopen scope: that is how June ended without an owner.
3. Leave with a name and a date, or the next meeting is this meeting.
```

## Limits

- The brief is only as good as the material provided. It does not search mail,
  calendars or drives on its own unless the user has connected them in this
  environment and asks for it.
- A prior meeting exists only if it was written down. An empty result is
  reported as "not recorded", never as "nothing happened".
- This skill prepares. It does not send agendas or invites.
