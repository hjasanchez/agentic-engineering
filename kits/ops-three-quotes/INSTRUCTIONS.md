# Instructions: three quotes, one recommendation

The person has delegated a job to you: compare supplier quotes against their request and draft a recommendation they will sign.
They are in the Executor stance and review your work afterwards, so plan first, show every departure and leave every figure
checkable. Reading a quote is an Interpreter step: every reading points to the quote line it came from.

## Inputs
- `inbox/` (in a chat: the uploaded files): one request built from `templates/request.md` (lines R1, R2 ... and T1, T2 ...,
  plus "How we decide") and two to four quotes as text. No request in that format: ask for one and wait.

## Steps
1. **Plan.** Reply with the files found, suppliers, number of request lines, anything unreadable and what you will produce. Wait for go.
2. **Trace table.** Fill `outputs/trace-table.csv` (columns and rules: `checks/1-trace.md`): one row per request line per supplier,
   plus the quote's subtotal, VAT and total (status `stated`). Copy figures, units and `quote_text` exactly from the quote line.
3. **Status:** `quoted`, `qualified` (different unit, quantity, spec or limit), `excluded` (the quote says not included),
   `missing` (not mentioned anywhere), `extra` (not in the request; ref X1, X2 ...).
4. **Compute.** With code: run `python -I checks/check_quotes.py` from the kit folder. It traces, recomputes, normalises and
   compares, and prints a COMPARISON table, an AWARD and any THRESHOLD. Without code: stop here, hand the person the trace table and
   `checks/2-recompute.md`, and wait for their spreadsheet figures. Never work out a sum, a VAT figure or a percentage yourself.
5. **Deviation report** (`outputs/deviation-report.md`, from `templates/deviation-report.md`): one row per FLAG, MISMATCH and GAP,
   and per reading you chose. Each row names the supplier and the line ID (or `subtotal`, `vat`, `total`).
6. **Recommendation** (`outputs/recommendation.md`, from `templates/recommendation.md`): paste the COMPARISON table and the AWARD
   unchanged; every figure in your prose comes from that output, the quotes or the request.
7. **Run the checks again** until the RESULT line says READY FOR REVIEW, and paste it into both documents. In chat, the person writes
   the RESULT line after their spreadsheet check.
8. **Log** three lines in `outputs/progress.md`: date and request; result line; open questions.

## Sign-off
The recommendation opens with "Status: DRAFT, NOT SIGNED". Only the person fills the sign-off block, sends questions to suppliers
and places the order.

## Constraints
- Read from `inbox/`; write only to `outputs/`. Leave `inbox/`, `checks/` and `templates/` unchanged.
- Never contact a supplier, send anything, accept or reject a quote, or place an order.
- Never invent, estimate or round a figure; a figure not on a quote line is "not priced".
- Never present a figure you calculated as checked.
- Unsure how to read a line: copy the exact words, mark it `qualified` and ask in the deviation report. Unreadable file: stop and name it.
