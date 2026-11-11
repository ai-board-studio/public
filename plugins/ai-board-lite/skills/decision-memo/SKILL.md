---
name: decision-memo
description: Writes a one-page decision memo from the material the user provides: the decision in one sentence, the options with honest trade-offs, a recommendation with its reasoning, the risks and the exact ask. Use for "write a decision memo", "help me decide between", "zet dit op een rij voor een besluit", "schrijf een besluitnotitie".
---

# Decision Memo

A decision memo exists so that a busy person can decide in five minutes and
defend the decision in six months. That means the decision is stated in the
first line, the options are real options (including doing nothing), and the
trade-offs are written down honestly, including the ones against the
recommendation.

## Ground rules

- One page. If it does not fit, the decision is not yet sharp enough.
- Every fact comes from the material the user provides. Opinions and
  estimates are labelled as such.
- Always include "do nothing" or "wait" as an option, with its real cost.
- Write the strongest argument against the recommendation, not a straw man.
- Answer in the language the user writes in.
  The example below is in English; translate its headings too.

## When to use

The user faces a choice and shares notes, numbers, emails or a rough
description: "write a decision memo", "help me decide between A and B", "I need
to put this to the board", "zet dit op een rij voor een besluit", "schrijf een
besluitnotitie".

## Steps

1. **State the decision** in one sentence, as a question with a yes/no or an
   A/B answer. Confirm it with the user if the material is vague.
2. **Collect the options**, two to four, always including doing nothing.
3. **For each option**, write what it costs, what it gets, what it risks and
   what must be true for it to work. Use the user's numbers; mark estimates.
4. **Recommend one option** and give the reasoning in three sentences or fewer.
   Then write the strongest case against it.
5. **Write the ask:** what exactly the reader must decide, by when, and what
   happens next if they say yes.
6. **List open facts**: what you would want to know before deciding, and who
   could provide it.
7. **Offer to keep the decision.** If this environment can write files, offer
   to save the memo as `Decisions/<YYYY-MM-DD> · <decision>.md`, and add the
   outcome once it is decided. A decision log is what makes "why did we choose
   this?" answerable in six months. Do not write anything without the user
   saying yes.

## Output format

```markdown
# Decision: run the pilot in Service or in Sales?

**Ask:** approve Service as the pilot department by 15 August.

## Options
| | Service | Sales | Wait until Q1 |
|---|---|---|---|
| Gets | Highest ticket volume, willing team lead | Visible to the board | More time to settle data access |
| Costs | Within this year's frame | Same | Another quarter without results |
| Risks | Data access not yet owned | Team has no capacity until October | The budget frame lapses at year end |
| Must be true | Someone owns data access by go-live | Capacity frees up | Budget can be carried over (unknown) |

## Recommendation
Service. It has the volume to show results within the quarter and a team that
asked for it. The open data-access question is solvable before go-live.

**Strongest case against:** if data access slips, the pilot starts late in the
department where delay is most visible to customers.

## Open facts
- Can the budget frame carry over to next year? Finance.
```

## Limits

- The memo frames the decision; it does not make it.
- When the material does not support a recommendation, the memo says so and
  lists what is missing instead of picking one.
