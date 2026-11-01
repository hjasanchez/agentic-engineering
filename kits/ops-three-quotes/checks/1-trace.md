# Check 1: trace every figure to its quote line

**The rule.** Every figure in the trace table sits on the quote line it cites: the line that carries the words in `quote_text`, on
the cited page. A line marked `missing` is not mentioned anywhere in the quote. A figure that cannot be traced does not go into the
comparison.

**Why.** Reading a quote is decoding material you handed over, and a confabulated reading looks exactly like a correct one. A
pointer from every figure to its line makes checking it a matter of seconds instead of a re-read.

## The trace table

`outputs/trace-table.csv`, header in `templates/trace-table.csv`. One row per request line per supplier, plus one row each for the
quote's subtotal, VAT and total.

| Column | What goes in it |
|---|---|
| `supplier` | The supplier's name, spelled the same on every row |
| `ref` | The request line ID (R1, T1 ...); `X1`, `X2` ... for lines the supplier added; empty on subtotal, VAT and total rows |
| `kind` | `line` (an item to price), `term` (lead time, warranty ...), `subtotal`, `vat`, `total` |
| `status` | `quoted`, `qualified`, `excluded`, `missing` or `extra` (see [3-coverage.md](3-coverage.md)); `stated` on subtotal, VAT and total rows |
| `quote_text` | Words copied exactly from the quote line that carries the figures (for a wrapped description, its first line). Empty when `missing` |
| `qty`, `unit` | As printed, e.g. `1` and `half day (4 h)`. For a term, the value and its unit: `10`, `working days` |
| `unit_price`, `amount` | As printed. Thousands separators and decimal commas are fine |
| `vat_rate` | On the VAT row only: the percentage as a number, e.g. `20` |
| `source_file`, `page` | The file name in `inbox/` and the page number. Empty page only when `missing` |
| `units_needed` | Line rows: how many of the quoted units cover the request line. Same unit as the request: the request quantity. Half days against a day: `2`. Packs of 10 against 48 each: `5`. Empty if the units cannot be converted |
| `note` | The supplier's item number, and any reading you chose |

## Running it

**With the script:** `python -I checks/check_quotes.py`. For each row it finds the lines on the cited page that contain
`quote_text`, and requires the row's numbers and unit on one of those lines. A number that appears elsewhere on the page does not
count. For a `missing` row it searches the whole quote for the main words of the request line (`installation`, `delivery` ...) and
fails if one appears: then the line is not missing, it is quoted, qualified or excluded somewhere. It prints `FLAG` where the unit or
quantity differs from the request, and `FAIL` if such a row is marked `quoted`.

**By eye (no code):** for each supplier, open the quote and check three rows at random plus every row that is not `quoted`: find
the `quote_text` on the cited page, and read the numbers and unit off that line. Search the quote for each `missing` line's key word.
Compare the unit column with the request's, line by line; any difference must be a `qualified` row with `units_needed` filled and a
line in the deviation report. One wrong row sends the table back.

## In the example
Fernwick prices installation per `half day (4 h)`; the request asks for a `day (8 h)`. Copied faithfully, the row traces to item 5
and is flagged. Written as `day (8 h)`, it fails, because item 5 does not say that. The script then prices the full day from
`units_needed` 2 at 380.00, so the half-day price cannot pass as a day's. See [the walkthrough](../example/walkthrough.md).
