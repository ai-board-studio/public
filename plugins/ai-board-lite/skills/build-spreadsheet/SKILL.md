---
name: build-spreadsheet
description: Builds a working Excel file from a description: a budget, a forecast, a tracker or a simple model, with real formulas instead of typed results, clearly marked input cells and a short explanation of how it works. Use for "make me a spreadsheet for", "build a budget template", "maak een excel voor", "bouw een begroting".
---

# Build Spreadsheet

A spreadsheet someone else has to maintain is only useful if they can see
how it works. So inputs live in one place and look like inputs, every result
is a formula, and nothing important is hidden in a typed number.

## Ground rules

- Every calculated cell is a formula. Never type a result.
- Inputs are separated from calculations and visibly marked (for example a
  light fill and an "Inputs" heading). Assumptions get a label and a unit.
- Use only numbers the user gives. Where a number is missing, leave the input
  cell empty or put in a clearly labelled placeholder, and list it at the end.
- Answer in the language the user writes in, and label the sheet in that
  language unless they ask otherwise.

## When to use

The user describes a sheet they need: "make me a spreadsheet for our hiring
plan", "build a budget template for next year", "I need a tracker for these
projects", "maak een excel voor de begroting", "bouw een cashflowoverzicht".

## Steps

1. **Clarify the shape** if it is not clear: what goes in, what must come out,
   the period (months, quarters, years) and who will maintain it. Ask once,
   in one message.
2. **Propose the structure** before building: the sheets, the input block, the
   main calculations and the output. Keep it as small as the job allows.
3. **Build the file.** If this environment can run Python with `openpyxl` (or
   another way to write `.xlsx`), create the workbook with:
   - an Inputs block or sheet, marked and labelled with units;
   - calculations as formulas referencing the inputs, never constants;
   - totals and checks (for example a cell that shows whether two totals
     agree);
   - number formats, frozen header rows and readable column widths.
   Save it only after the user agreed to the structure, and tell them where it
   is. If files cannot be created here, give the layout as a table with the
   formula for every calculated cell, so they can build it by hand.
4. **Check your own work:** recalculate if possible, confirm there are no
   formula errors, and test one result by hand.
5. **Explain it in five lines or fewer:** where the inputs are, what the main
   output is, and what to change next month.

## Output format

```markdown
## Structure
- **Inputs** (sheet 1): headcount plan per month, salary per role, start dates
- **Costs** (sheet 2): monthly cost per role = salary / 12 × FTE active that month
- **Summary** (sheet 3): cost per quarter, total for the year, check against budget

## Key formulas
| Cell | Formula | Meaning |
|---|---|---|
| `Costs!C5` | `=Inputs!$D5/12*Inputs!F5` | cost of role 1 in January |
| `Summary!B4` | `=SUM(Costs!C5:E20)` | total cost Q1 |

## Still to fill in
- Salary for the data engineer role (`Inputs!D9`) is empty.
```

## Limits

- Simple to medium models. A full three-statement financial model is out of
  scope for one conversation; build it in parts.
- Macros and VBA are not written. Everything works with standard formulas.
- The file uses a plain, clean layout, not a corporate template, unless the
  user provides one.
