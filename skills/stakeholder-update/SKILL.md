---
name: stakeholder-update
description: Turns notes, figures and project status into a short update for a board, investors, a team or a client: headline first, a status per topic with a clear on track / at risk / off track label, the numbers that moved, what is needed from the reader, and nothing else. Use for "write the monthly update", "draft an investor update", "schrijf de maandupdate", "maak een update voor de RvC".
---

# Stakeholder Update

Readers of an update want three things: is it going well, what changed, and
do they need to do something. Everything else is noise. So the update opens
with the answer, labels every topic honestly, and puts the ask where it
cannot be missed.

## Ground rules

- Use only the notes, figures and status the user provides. Every number keeps
  its source and its period.
- A topic is "on track", "at risk" or "off track". Pick the honest one; if the
  material does not say, ask instead of choosing the comfortable label.
- Bad news goes in the update, early and plainly, with what is being done
  about it.
- Answer in the language the user writes in, and write the update in the
  language of its readers if the user names them.
  The example below is in English; translate its headings too.

## When to use

The user has to report to someone and shares notes, numbers or a previous
update: "write the monthly update", "draft the investor update", "update for
the board", "schrijf de maandupdate", "maak een update voor de RvC", "zet dit
om in een update voor het team".

## Steps

1. **Pin down the reader and the period.** A board, investors, a team and a
   client each need a different level of detail. Ask once if unclear.
2. **If there is a previous update**, compare against it: what was promised
   then, and did it happen?
3. **Write the headline**: one or two sentences on how the period went.
4. **Write each topic** in two or three lines with its status label, the
   number that moved (with period and source) and what happens next.
5. **Write the ask**: what the reader needs to decide, provide or know, with a
   date. If there is no ask, say "No action needed".
6. **Keep it short.** Aim for something readable in two minutes. Offer a
   longer appendix only if the user wants one.
7. **Offer to keep it for next time.** If this environment can write files,
   offer to save the update as `Updates/<YYYY-MM> · <reader>.md`. Next month,
   that file is the "previous update" from step 2, so promises get checked
   instead of forgotten. Do not write anything without the user saying yes.

## Output format

```markdown
**Update August · AI pilot**

**Headline:** The pilot is approved and staffed; data access is the one open
risk before go-live in October.

| Topic | Status | What moved | Next |
|---|---|---|---|
| Pilot scope | On track | Service confirmed as pilot department (MT, 3 Aug) | Kick-off 1 Sep |
| Budget | On track | Frame of €48k agreed (Finance, 14 Aug) | First invoice Sep |
| Data access | At risk | Still no owner, raised twice | Owner needed by 15 Sep |

**Ask:** name an owner for data access before 15 September.

**Promised last month:** choose the pilot department. Done.
```

## Limits

- The update reports what the material says. Progress that is not in the
  notes is not claimed.
- It drafts. The user reviews and sends it; nothing is sent from here.
