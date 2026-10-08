---
name: build-deck
description: Turns notes, a brief or a document into a board-ready presentation. Builds the storyline first (one message per slide, headline titles), then produces a .pptx when the environment can create files, or a slide-by-slide outline to paste. Use for "make a deck from this", "turn these notes into slides", "maak een presentatie hiervan", "zet dit in een powerpoint".
---

# Build Deck

Executives do not read slides, they read slide titles. So a deck is a
storyline first and a file second. Every slide makes one point, and its title
says that point as a full sentence. "Q3 revenue" is a label. "Q3 revenue grew
on two customers, not on the market" is a title.

## Ground rules

- Use only the material the user provides. Every number on a slide comes from
  that material, quoted exactly. A number you cannot source does not go on a
  slide.
- One message per slide. If a slide needs two titles, it is two slides.
- No filler slides: no "Agenda" for fewer than eight slides, no "Thank you",
  no "Questions?".
- Answer in the language the user writes in, and build the deck in that
  language unless they ask otherwise.

## When to use

The user shares notes, a memo, a report, figures or a rough outline and asks
for a presentation: "make a deck from this", "turn these notes into slides",
"I need five slides for the board", "maak een presentatie hiervan", "zet dit in
een powerpoint".

## Steps

1. **Pin down three things** if they are not clear from the request: who the
   audience is, what decision or reaction the deck should get, and how many
   slides there is room for. Ask once, in one message. If the user wants you
   to just go ahead, assume a board audience and at most eight slides, and say
   so.
2. **Write the storyline as titles only.** Open with the answer (the
   recommendation or the main finding), then the supporting points, then the
   ask. Read the titles in order: on their own they must tell the whole story.
3. **Show the storyline to the user** as a numbered list of titles before
   building anything. Adjust if they want changes.
4. **Fill each slide** with only what proves its title: three bullets at most,
   one chart or one table at most, the source of every number in small text at
   the bottom.
5. **Build the file.** If this environment can run Python with `python-pptx`
   (or another way to write `.pptx`), create the deck: a title slide, the
   content slides, a clean layout with plenty of white space, readable font
   sizes (titles 28pt or larger, body 16pt or larger) and the source line on
   every slide that carries a number. Save it only after the user agreed to the
   storyline, and tell them where it is. If files cannot be created here,
   deliver the full outline per slide in a form they can paste into
   PowerPoint, Keynote or Google Slides.
6. **End with a short checklist** of what the user still has to add or check:
   missing numbers, a chart they need to supply, a claim that needs a source.

## Output format

```markdown
## Storyline (6 slides)
1. Move the pilot to Service: it has the volume and a willing team
2. Service handles twice the tickets Sales does, on the same headcount
3. The team lead has already volunteered two people
4. Risk: data access is not settled, and nobody owns it yet
5. Cost stays inside this year's budget frame
6. Decision today: approve Service as the pilot department

## Slide 2
**Title:** Service handles twice the tickets Sales does, on the same headcount
- Service: 4,180 tickets in Q2 · Sales: 2,060
- Both teams: 11 FTE
- Source: ticket export Q2, tab "Totals"

## Still to do
- Slide 5 needs the budget figure; the notes only say "within budget".
```

## Limits

- The deck is only as good as the material. Missing numbers are flagged, never
  filled in.
- Visual design is clean and simple, not a brand template. If the user has a
  template, ask for it and build on that.
- Charts are built from the numbers provided. A chart the user only described
  is listed under "still to do".
