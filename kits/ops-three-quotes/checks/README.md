# How to read the checks

The assistant reads the quotes into one file, the **trace table** (`outputs/trace-table.csv`): one row per request line per
supplier, with each figure, its unit, the words of the quote line it sits on, and the file and page. Everything else is computed
from that table by a script or a spreadsheet, never by the model.

| Check | Question it answers | Catches | Runs as |
|---|---|---|---|
| [1. Trace](1-trace.md) | Is every figure on the quote line it cites, in the unit the request asked for? Is every "missing" line really absent? | Misread or invented figures; a half-day price passed off as a day; a line wrongly called missing | Script, or you check rows by eye |
| [2. Recompute](2-recompute.md) | Do the quotes add up, and what does each cost for exactly what you asked? | A quote whose total does not match its lines; model arithmetic; unlike-for-like totals | Script, or spreadsheet formulas |
| [3. Coverage and compliance](3-coverage.md) | Has every supplier answered every line and met every limit, and is every finding reported? | An omitted line that makes a quote look cheap; a lead time over your limit | Script, or a filter on two columns |

## What the script prints

`python -I checks/check_quotes.py` prints the three checks, then a **COMPARISON** table (every request line priced for exactly
the quantity and unit you asked for, subtotal, VAT, total, how far each is above the lowest, and whether each quote is complete and
compliant), the **AWARD** under your rule from the request, a **THRESHOLD** for each incomplete quote (the price at which it would
win), and a check of the two documents the assistant wrote.

| Label | Means | What you do |
|---|---|---|
| `PASS` | A quote's lines, subtotal, VAT and total add up | Nothing |
| `FLAG` | A unit or quantity differs from the request, or `BREACH`: a limit such as lead time is not met | Read the deviation report row; for a breach, that quote cannot be awarded under your rule |
| `MISMATCH` | A quote does not add up; the line shows the recomputed figures | Ask the supplier which figure it will invoice; the comparison uses the recomputed one |
| `GAP` | A line is qualified, excluded, missing or extra for that supplier | The quote is not like-for-like until you resolve it |
| `NOTE` | A request line has no "at most" or "at least", so it was not checked | Compare it by eye |
| `FAIL` | The assistant's work is wrong or incomplete: a figure not on its quote line, a wrong `units_needed`, a row missing, a finding not reported, a figure or award in the recommendation that is not the script's | Send it back; do not read the recommendation yet |
| `STOP` | An input could not be read (no request, a missing column, an unreadable file) | Fix the file named in the message |

`RESULT READY FOR REVIEW` means every figure was found on the quote line the table cites, every sum and the award were computed by
the script, and every finding is in the deviation report. It does not mean the quotes are good or the award is right for you:
specs, quality and anything under "Why" in your request are yours to weigh.

## Without code

Checks 1 and 3 work by eye in about ten minutes for three quotes. Check 2 needs a spreadsheet, which you fill in yourself from the
trace table; [2-recompute.md](2-recompute.md) has the formulas. In that case nothing prints a RESULT line: you write it, once the
spreadsheet agrees with the table and every finding is in the deviation report.

## Getting text out of PDF quotes

The checks read quotes as text (`.txt` or `.md`). Three ways, best first:
1. Ask the supplier for the quote as a spreadsheet or text as well as the PDF.
2. Open the PDF, select all the text on each page, paste it into a text file, and type a line `=== Page 1`, `=== Page 2` ... before
   each page's text. Do this yourself rather than asking the assistant: if the assistant makes the text copy, the trace check
   compares its table with its own transcription.
3. If you have `pdftotext` (free, part of Poppler), `pdftotext -layout quote.pdf quote.txt` keeps the pages apart.

A scanned quote (an image with no selectable text) needs retyping or OCR first. Decimal commas (`1.090,00`) and decimal points
(`1,090.00`) both work; one currency per comparison.

## The script

Python 3.9 or later, standard library only, nothing to install; on macOS and Linux the command may be `python3`. Reads the trace
table as saved by Excel, Google Sheets or LibreOffice (comma or semicolon separated, with or without a byte-order mark). Writes
nothing. Tests: `python -I checks/tests/test_check_quotes.py`.
