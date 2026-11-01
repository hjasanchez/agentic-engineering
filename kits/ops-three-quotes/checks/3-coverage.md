# Check 3: coverage, compliance and the deviation report

**The rule.** Every line of the request has exactly one row for every supplier, with a status. Every limit in the request (lead
time at most 15 working days, warranty at least 3 years ...) is met, or the quote cannot be awarded. Every row that is not `quoted`,
every breach and every place the assistant chose a reading is in the deviation report.

**Why.** The cheapest quote is often the one that left something out or promised a date you cannot use. And when you delegate a job,
the steps you did not watch are where it goes wrong; the deviation report is the assistant telling you where those are.

## Status values

| Status | Means | Comparable? |
|---|---|---|
| `quoted` | Priced or stated as requested | Yes |
| `qualified` | Priced or stated, but a different unit, quantity, spec or limit | Priced lines: after conversion by `units_needed`. Terms: only if the limit is met |
| `excluded` | The supplier says it is not included | No, until priced |
| `missing` | Not mentioned anywhere in the quote | No, until priced |
| `extra` | In the quote but not in the request (ref X1, X2 ...) | Counted in the quote's own total, left out of the comparison |
| `stated` | Subtotal, VAT and total rows | Recomputed in check 2 |

## Running it

**With the script:** `python -I checks/check_quotes.py` prints a `GAP` for every row that is not `quoted`; a `FAIL` for any request
line with no row (or two) for a supplier; for each T line with "at most" or "at least" in the request, a `FLAG ... BREACH` when the
quoted value misses the limit (a `FAIL` if that row still says `quoted`); and a `FAIL` for any FLAG, MISMATCH or GAP that has no row
in `outputs/deviation-report.md` naming both the supplier and the line ID (or `subtotal`, `vat`, `total`). A quote with a breach or an
unpriced line is marked "no" under "Complete and compliant" and cannot be the AWARD.

**By eye (no code):** filter the status column to everything except `quoted`: each remaining row must be in the deviation report.
Filter the ref column to T lines and compare each value with the limit in your request. Count rows per supplier: one per request line.
In a spreadsheet, `=COUNTIFS(A:A,"Supplier name",C:C,"line")+COUNTIFS(A:A,"Supplier name",C:C,"term")` equals the number of request
lines.

## The deviation report

Format in [`templates/deviation-report.md`](../templates/deviation-report.md): one row per item, with what the request asked, what
the quote says with its source, what the assistant did, why, and the decision left to you. It ends with the RESULT line and what the
assistant did not do.

## In the example
Tallowmere's quote has no installation line at all. It is the cheapest total on paper (3,767.76 including VAT) because it leaves out
a day of work that Orrin Bay prices at 640.00 and Fernwick at 380.00 per half day. Coverage reports:

```
GAP   Tallowmere IT R5 (On-site installation and configuration): missing
```

and the script confirms the line really is absent: no "installation" or "configuration" anywhere in the quote. All three lead times
(10, 15 and 8 working days) are within the 15-day limit, so no breach.
