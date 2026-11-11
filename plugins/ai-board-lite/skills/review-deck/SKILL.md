---
name: review-deck
description: Reviews a presentation the way a board member reads it. Checks whether the titles alone tell the story, whether every number is sourced and consistent across slides, and what a critical reader will ask. Returns a verdict, slide-by-slide fixes and the questions to prepare for. Use for "review this deck", "is this ready for the board", "check mijn presentatie", "wat ontbreekt er aan dit deck".
---

# Review Deck

A deck fails in the room for three reasons: the story only works if someone
talks over it, a number on slide 3 does not match slide 9, or the obvious
question has no answer. This review finds those three before the meeting does.

## Ground rules

- Review only the deck the user shares, and quote slide numbers for every
  finding.
- Quote numbers exactly as they appear. Never correct a number yourself: point
  at the conflict and ask which one is right.
- Be direct. A review that hedges every point is useless the night before a
  board meeting.
- Answer in the language the user writes in.
  The example below is in English; translate its headings too.

## When to use

The user shares a `.pptx` or `.pdf` and asks "review this deck", "is this ready
for the board", "what will they ask", "check mijn presentatie", "wat ontbreekt
er aan dit deck".

## Steps

1. **Ask who the audience is** and what the deck should achieve, if that is
   not clear. A deck for approval is judged differently from a deck for
   information.
2. **Extract the text per slide** with whatever this environment offers
   (`markitdown`, `python-pptx`, a PDF reader). If you cannot read the file,
   ask for a PDF export or the slide text. Never review a deck you could not
   read.
3. **Read the titles only, in order.** Write down the story they tell. If it
   has gaps or the main point only appears on slide 7, that is finding one.
4. **Check every number:** is it sourced, and does the same metric have the
   same value everywhere it appears? List every conflict with both slide
   numbers.
5. **Check every slide for one message.** Flag slides that make two points,
   slides with a label instead of a title, and slides that prove nothing.
6. **Write the five questions** a critical board member will ask, each with
   the slide it comes from and whether the deck currently answers it.
7. **Give the verdict first**, then the fixes in order of importance.

## Output format

```markdown
## Verdict
Not ready yet. The recommendation is sound but sits on slide 8, and revenue
appears with two different values.

## Fix first
1. **Move the recommendation to slide 1.** Right now the board reads seven
   slides before learning what you want.
2. **Revenue conflict:** slide 3 says €4.1M, slide 9 says €3.9M. Which one is
   right, and is one of them a forecast?

## Slide by slide
| Slide | Title today | Problem | Fix |
|---|---|---|---|
| 2 | "Market" | Label, not a message | "Our segment grew; our share did not" |
| 5 | (two charts) | Two points on one slide | Split into 5a and 5b |

## Questions to prepare for
1. What happens if the pilot misses its date? *(slide 6, not answered)*
2. Why Service and not Sales? *(slide 4, answered)*

## Limits of this review
Text only. Charts and images were not checked.
```

## Limits

- Text only. A chart that contradicts its own title is not caught. Say so in
  every review.
- This skill reviews. It does not rewrite or rebuild the deck unless the user
  asks for that afterwards.
