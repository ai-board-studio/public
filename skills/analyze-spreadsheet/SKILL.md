---
name: analyze-spreadsheet
description: Reads an Excel or CSV file and explains what the numbers say in plain language. Finds the biggest movements, variances against budget or last period, outliers and formula or data problems, each with its sheet and cell reference. Never invents a number. Use for "what does this spreadsheet tell me", "explain these numbers", "wat zie je in deze excel", "waar zitten de afwijkingen".
---

# Analyze Spreadsheet

A spreadsheet answers a question nobody wrote down. This skill writes the
question down, answers it in three sentences, and shows the cells that prove
each sentence. Anyone should be able to check every claim by clicking the
cell it points to.

## Ground rules

- Every number in the answer is read from the file and carries its sheet and
  cell or range, for example `P&L!D14` or `Sales!B2:B13`.
- If you calculate something (a difference, a growth rate, a total), say how,
  and show the inputs with their cell references.
- Never fill a gap. Empty cells, `#REF!`, `#DIV/0!` and text in a number column
  are findings, not things to fix silently.
- Answer in the language the user writes in.
  The example below is in English; translate its headings too.

## When to use

The user shares an `.xlsx`, `.xls` or `.csv` and asks "what does this tell me",
"explain these numbers", "where are the variances", "wat zie je in deze excel",
"waar zitten de afwijkingen", "klopt dit".

## Steps

1. **Open the file** with whatever this environment offers (Python with
   `openpyxl` or `pandas`, or a built-in reader). Read formulas as well as
   values where possible. If the file cannot be read here, ask the user to
   export the relevant sheet as CSV or paste it.
2. **Map the file first:** sheets, what each one holds, the period it covers,
   units and currency. Report anything ambiguous (thousands or units? which
   year?) and ask before you interpret.
3. **Ask what the user wants to know** if the request is open. Default: what
   changed, what is off plan, and what looks wrong.
4. **Find the movements:** the largest changes against the previous period and
   against budget or forecast if the file has one, in absolute and relative
   terms.
5. **Check the data:** formula errors, hard-coded numbers inside formula
   ranges, totals that do not add up, duplicates, missing months.
6. **Write the answer:** three sentences of conclusion first, then the
   evidence table, then the data problems, then the questions the numbers
   raise but cannot answer.

## Output format

```markdown
## In three sentences
Revenue is on budget for the year, but only because of one large order in
March. Personnel costs are 9 percent over budget since June. The forecast tab
still uses last year's prices.

## Evidence
| Finding | Value | Where | How |
|---|---|---|---|
| March revenue spike | €612k vs €240k average | `P&L!D5` vs `P&L!B5:M5` | average of the other 11 months |
| Personnel over budget | +€84k Jun–Sep | `P&L!H9:K9` vs `Budget!H9:K9` | sum of monthly differences |

## Data problems
- `Forecast!C4:C15` are typed numbers inside a column of formulas.
- `P&L!N12` is `#REF!`: the full-year total for marketing is missing.

## Questions the file cannot answer
- Is the March order a one-off, or a new contract?
```

## Limits

- The analysis covers what is in the file. Context that is not in it (a
  one-off order, a price change) is asked, not assumed.
- Very large files may need to be narrowed to the relevant sheets first.
- This skill reads and explains. It changes the file only if the user asks
  for a corrected copy, and then it saves a new file and leaves the original
  untouched.
