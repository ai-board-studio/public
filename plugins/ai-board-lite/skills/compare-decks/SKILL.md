---
name: compare-decks
description: Compares two versions of the same presentation on message and numbers, not formatting, and reports changed figures, dropped claims, new claims and softened language with slide numbers. Use when the user shares two decks and asks "what changed", "compare these two presentations", "vergelijk deze twee decks".
---

# Compare Decks

Two versions of the same story. The question is always "what did we quietly
stop saying?". Compare message and numbers, not formatting. A changed font is
noise. A dropped claim or a hedged promise is the finding.

## Ground rules

- Quote numbers exactly as they appear in the deck, with the slide number.
  Anything you cannot read stays "unknown".
- Text only. Say so in every comparison you write: charts and images are not
  compared.
- Never edit, rebuild or send a deck. This skill produces one comparison.
- Answer in the language the user writes in.
  The example below is in English; translate its headings too.

## When to use

The user shares two `.pptx` or `.pdf` versions of the same deck and asks "what
changed", "compare these two presentations", "does the pitch still say the
same thing", "vergelijk deze twee decks", "wat is er veranderd tussen v3 en v4".

## Steps

1. **Get both files and settle which is older.** Use the modification dates or
   ask the user. Never decide it from the filename alone.
2. **Extract the text per slide.** Use whatever this environment offers:
   `markitdown` (its output marks each slide with `<!-- Slide number: N -->`),
   `python-pptx`, or a PDF text reader. If none of these is available, say so
   and ask the user to export both decks as PDF or paste the slide text. Do not
   guess at the content of a deck you could not read.
3. **Align the slides** by heading first and slide number second. Decks gain
   and lose slides, so position alone will mislead you.
4. **Extract per slide** the claim, the numbers, the ask and anything that is
   missing compared with the other version.
5. **Group the findings** as changed numbers, dropped claims, new claims and
   softened language (for example "we will" becoming "we aim to").
6. **Write the verdict first:** one or two sentences on how the story changed.
   Then the evidence, then three recommendations.
7. **Offer to save** the comparison as a markdown note if this environment can
   write files. Do not write anything without the user saying yes.

## Output format

```markdown
## Verdict
More cautious and less concrete: three of the five hard numbers became ranges
and the 2027 revenue commitment is gone.

## Numbers that changed
| Slide | Metric | Old | New | Reading |
|---|---|---|---|---|
| 4 | Pipeline | €2.4M | "€2M+" | Precision gone, direction holds |
| 7 | Go-live | Q1 2027 | "H1 2027" | Slipped a quarter, not called out |

## Claims
- **Dropped** · slide 9: "fully self-serve onboarding". Deliberate, or lost in an edit?
- **New** · slide 11: a partner logo with no signed agreement mentioned anywhere.
- **Softened** · slide 2: "we replace" became "we support".

## 3 recommendations
1. Decide whether the 2027 number was withdrawn on purpose. If not, restore it.
2. Verify the partner on slide 11 before this goes out.
3. Pick one style: exact numbers or ranges. The mix reads as hedging.

## Limits of this comparison
Text only. Charts and images were not compared, so a chart whose shape changed
does not show up here.
```

## Limits

- **Text only.** Charts and images come through as placeholders at best, so a
  changed chart is invisible. State this in every comparison.
- Speaker notes and animations are not reliably extracted.
- Scanned or image-only PDFs have no text to compare. Say so and stop.
