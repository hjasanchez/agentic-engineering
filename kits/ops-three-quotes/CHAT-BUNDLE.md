# Chat bundle: three quotes, one recommendation

For chat assistants (a Claude or ChatGPT project, a Gemini Gem, a Copilot agent). The person uploads this file and the files from
their `inbox` folder: the request and the quotes, as text. This file holds the instruction file (Part 1), the templates (Part 2)
and the three check procedures (Part 3), copied from the kit's `INSTRUCTIONS.md`, `templates/` and `checks/`.

## Read this first: how the instructions map onto a chat

- **`inbox/`** means the request and quotes the person uploaded. **`outputs/`** means what you hand back: the trace table as a CSV
  code block (or a file, if your chat can create one), and the deviation report, recommendation and progress log as Markdown.
- **Paths such as `checks/1-trace.md` or `templates/recommendation.md`** refer to the parts of this file with the same name.
- **If the person also uploaded `check_quotes.py` and you can run Python:** put the uploaded request and quotes in a folder
  `inbox/`, your trace table (and later the two documents) in `outputs/`, and run `python -I check_quotes.py <that folder>`. Use its
  output exactly as Part 1 describes.
- **If you cannot run the script:** step 4 belongs to the person. Give them the trace table and Part 3, "Check 2", and wait.
  Ask them to send back exactly these spreadsheet figures: any `MISMATCH` rows from column O; the like-for-like price per request
  line per supplier (column P, after unit normalisation); and per supplier the subtotal, priced lines, VAT and total (columns S to
  V), with the lowest complete and compliant quote named. Build the comparison table from those figures only, say in the
  recommendation that they are the person's, and leave out "Above the lowest" and THRESHOLD: the spreadsheet does not produce them.
  The person writes the RESULT line. Never compute a sum, a VAT figure or a percentage yourself, and never describe a figure as
  checked.

---

# Part 1. Instructions


## Instructions: three quotes, one recommendation

The person has delegated a job to you: compare supplier quotes against their request and draft a recommendation they will sign.
They are in the Executor stance and review your work afterwards, so plan first, show every departure and leave every figure
checkable. Reading a quote is an Interpreter step: every reading points to the quote line it came from.

### Inputs
- `inbox/` (in a chat: the uploaded files): one request built from `templates/request.md` (lines R1, R2 ... and T1, T2 ...,
  plus "How we decide") and two to four quotes as text. No request in that format: ask for one and wait.

### Steps
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

### Sign-off
The recommendation opens with "Status: DRAFT, NOT SIGNED". Only the person fills the sign-off block, sends questions to suppliers
and places the order.

### Constraints
- Read from `inbox/`; write only to `outputs/`. Leave `inbox/`, `checks/` and `templates/` unchanged.
- Never contact a supplier, send anything, accept or reject a quote, or place an order.
- Never invent, estimate or round a figure; a figure not on a quote line is "not priced".
- Never present a figure you calculated as checked.
- Unsure how to read a line: copy the exact words, mark it `qualified` and ask in the deviation report. Unreadable file: stop and name it.


---

# Part 2. Templates


## templates/request.md

````markdown
# Request for quotation: [what you are buying]

<!-- Fill this in once per purchase and put it in inbox/ with the quotes. Name the file so it contains "request",
     e.g. 2026-11-request-cleaning-contract.md. The checks read the table below, so keep its columns and the IDs. -->

- **Company:** [name], [one line on what it does and its size]
- **Our reference:** [RFQ number, or a short name]
- **Sent to:** [suppliers]
- **Date sent:** [date] · **Quotes due:** [date]
- **Currency and tax:** [currency], prices [excluding / including] VAT

## What we asked for

One row per thing you need priced (R1, R2 ...) and one per condition you need stated (T1, T2 ...). Units in words the supplier will
use: `each`, `month`, `day (8 h)`, `lot`. Put hours in brackets, `day (8 h)`, and packs as `pack of 10`, so a quote in half days
or packs can be converted. Write "at most" or "at least" in each T line so the limit can be checked.

| ID | What we need | Qty | Unit | Must have / notes |
|---|---|---|---|---|
| R1 | [item] | [n] | [unit] | [spec that matters] |
| R2 | [item] | [n] | [unit] | |
| R3 | [delivery, installation, setup: anything a supplier might leave out] | [n] | [unit] | |
| T1 | Lead time from order, at most | [n] | working days | |
| T2 | Warranty, at least | [n] | years | |

## How we decide (ours, not the assistant's)

- **Who signs:** [role]. Nothing is ordered and no supplier is contacted until they sign.
- **Award rule:** the lowest quote that prices every line and meets every limit above.
- **Prefer faster if:** [within 5% and at least 5 working days sooner on T1, or: no]
- **Why:** [the reason behind the rule, in one sentence: a deadline, a past bad experience, a budget line].
- **Ceiling:** [above this amount, who else signs].

The script applies the award rule and the "Prefer faster if" line exactly as written above, so keep their wording. Anything else
that matters to you (a supplier you trust, a spec you will not compromise on) goes under "Why"; you weigh it at sign-off.
````

## templates/trace-table.csv

```csv
supplier,ref,kind,status,quote_text,qty,unit,unit_price,amount,vat_rate,source_file,page,units_needed,note
```

## templates/deviation-report.md

````markdown
# Deviation report: [request reference and title]

Everywhere this comparison departs from the request or from the quotes as written, or rests on a reading I chose. One row per item.
Sources are file and page in `inbox/`. Each row names the supplier and the line ID (or `subtotal`, `vat`, `total`) so the
script can find it. Every sum in this report is copied from the script's output (or the person's spreadsheet), never worked out.

| # | Supplier | Line | The request asked | The quote says | What I did | Why | Your call |
|---|---|---|---|---|---|---|---|
| 1 | [supplier] | [R5 / subtotal / ...] | [request wording, qty, unit] | [exact words or figure] [source: file, p.N] | [normalised / left unpriced / used recomputed figure / read as ...] | [one sentence] | [the decision or question left to the person] |

What goes in: every FLAG (including a BREACH of a limit), MISMATCH and GAP from the checks; every `units_needed` that is not the
request quantity (a half day doubled, packs counted); every supplier wording you matched to a request line by your own reading;
every figure you could not find.

## Check results (pasted from the last run)

```
[RESULT line from checks/check_quotes.py; in chat, the line the person writes after the spreadsheet check]
```

## What I did not do

Contact any supplier, accept or reject a quote, or change anything in `inbox/`.
````

## templates/recommendation.md

````markdown
# Recommendation: [request reference and title]

<!-- Built from the output of checks/check_quotes.py (or, in chat, from the person's spreadsheet). Labels in CAPITALS below
     (COMPARISON, AWARD, THRESHOLD, MISMATCH, RESULT) name the part of that output each section is copied from.
     The script reads this file: the table must match its COMPARISON row for row, the award line must match its AWARD,
     and every figure must come from its output, the quotes or the request. -->

**Status: DRAFT, NOT SIGNED.** Nothing has been sent to any supplier. The decision below belongs to [role from the request].

## The decision asked for
[One sentence, from the request.] [source: request file]

## Recommendation
**Recommended award:** [the supplier on the AWARD line, or "none". Chat path: the lowest complete and compliant quote the person named]

[Two to four sentences. The awarded quote's subtotal and total from COMPARISON; any MISMATCH the person must settle with that
supplier first; why the others lose, in the terms of the rule ("Above the lowest", "Complete and compliant").]

## Comparison (pasted from check_quotes.py, unchanged)

[COMPARISON table, every row, as printed. Chat path: a table of the person's spreadsheet figures only (column P per line,
then subtotal, priced lines, VAT and total per supplier). Leave out "Above the lowest": script only.]

`[AWARD line, as printed. Chat path: leave it out; the award is the line above.]`

Sources for every quoted figure: the trace table (file, page and quote line per figure). Every sum, the VAT, the percentages and
the award come from the script [or: from the person's spreadsheet, on (date)], not from the assistant's arithmetic.

## Before you sign
1. [A question for a supplier and the deviation report row it closes. The person sends it, not the assistant.]
2. [For an incomplete quote: the THRESHOLD line, if the person wants to chase a price. Script only: leave it out on the chat path.]

## Checks
`[RESULT line, as printed; in chat, written by the person after the spreadsheet check]`
Findings: [count of FLAG, MISMATCH and GAP lines, and what they are]. All are in the deviation report.

## Sign-off (the person, not the assistant)
- [ ] Award to: ______________________ at ______________ excluding VAT
- [ ] Hold until the questions above are answered
- Name: ______________________ Date: __________
- Order placed by: ______________________
````


---

# Part 3. The checks


## checks/README.md

### How to read the checks

The assistant reads the quotes into one file, the **trace table** (`outputs/trace-table.csv`): one row per request line per
supplier, with each figure, its unit, the words of the quote line it sits on, and the file and page. Everything else is computed
from that table by a script or a spreadsheet, never by the model.

| Check | Question it answers | Catches | Runs as |
|---|---|---|---|
| 1. Trace | Is every figure on the quote line it cites, in the unit the request asked for? Is every "missing" line really absent? | Misread or invented figures; a half-day price passed off as a day; a line wrongly called missing | Script, or you check rows by eye |
| 2. Recompute | Do the quotes add up, and what does each cost for exactly what you asked? | A quote whose total does not match its lines; model arithmetic; unlike-for-like totals | Script, or spreadsheet formulas |
| 3. Coverage and compliance | Has every supplier answered every line and met every limit, and is every finding reported? | An omitted line that makes a quote look cheap; a lead time over your limit | Script, or a filter on two columns |

#### What the script prints

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

#### Without code

Checks 1 and 3 work by eye in about ten minutes for three quotes. Check 2 needs a spreadsheet, which you fill in yourself from the
trace table; 2-recompute.md has the formulas. In that case nothing prints a RESULT line: you write it, once the
spreadsheet agrees with the table and every finding is in the deviation report.

#### Getting text out of PDF quotes

The checks read quotes as text (`.txt` or `.md`). Three ways, best first:
1. Ask the supplier for the quote as a spreadsheet or text as well as the PDF.
2. Open the PDF, select all the text on each page, paste it into a text file, and type a line `=== Page 1`, `=== Page 2` ... before
   each page's text. Do this yourself rather than asking the assistant: if the assistant makes the text copy, the trace check
   compares its table with its own transcription.
3. If you have `pdftotext` (free, part of Poppler), `pdftotext -layout quote.pdf quote.txt` keeps the pages apart.

A scanned quote (an image with no selectable text) needs retyping or OCR first. Decimal commas (`1.090,00`) and decimal points
(`1,090.00`) both work; one currency per comparison.

#### The script

Python 3.9 or later, standard library only, nothing to install; on macOS and Linux the command may be `python3`. Reads the trace
table as saved by Excel, Google Sheets or LibreOffice (comma or semicolon separated, with or without a byte-order mark). Writes
nothing. Tests: `python -I checks/tests/test_check_quotes.py`.

## checks/1-trace.md

### Check 1: trace every figure to its quote line

**The rule.** Every figure in the trace table sits on the quote line it cites: the line that carries the words in `quote_text`, on
the cited page. A line marked `missing` is not mentioned anywhere in the quote. A figure that cannot be traced does not go into the
comparison.

**Why.** Reading a quote is decoding material you handed over, and a confabulated reading looks exactly like a correct one. A
pointer from every figure to its line makes checking it a matter of seconds instead of a re-read.

#### The trace table

`outputs/trace-table.csv`, header in `templates/trace-table.csv`. One row per request line per supplier, plus one row each for the
quote's subtotal, VAT and total.

| Column | What goes in it |
|---|---|
| `supplier` | The supplier's name, spelled the same on every row |
| `ref` | The request line ID (R1, T1 ...); `X1`, `X2` ... for lines the supplier added; empty on subtotal, VAT and total rows |
| `kind` | `line` (an item to price), `term` (lead time, warranty ...), `subtotal`, `vat`, `total` |
| `status` | `quoted`, `qualified`, `excluded`, `missing` or `extra` (see 3-coverage.md); `stated` on subtotal, VAT and total rows |
| `quote_text` | Words copied exactly from the quote line that carries the figures (for a wrapped description, its first line). Empty when `missing` |
| `qty`, `unit` | As printed, e.g. `1` and `half day (4 h)`. For a term, the value and its unit: `10`, `working days` |
| `unit_price`, `amount` | As printed. Thousands separators and decimal commas are fine |
| `vat_rate` | On the VAT row only: the percentage as a number, e.g. `20` |
| `source_file`, `page` | The file name in `inbox/` and the page number. Empty page only when `missing` |
| `units_needed` | Line rows: how many of the quoted units cover the request line. Same unit as the request: the request quantity. Half days against a day: `2`. Packs of 10 against 48 each: `5`. Empty if the units cannot be converted |
| `note` | The supplier's item number, and any reading you chose |

#### Running it

**With the script:** `python -I checks/check_quotes.py`. For each row it finds the lines on the cited page that contain
`quote_text`, and requires the row's numbers and unit on one of those lines. A number that appears elsewhere on the page does not
count. For a `missing` row it searches the whole quote for the main words of the request line (`installation`, `delivery` ...) and
fails if one appears: then the line is not missing, it is quoted, qualified or excluded somewhere. It prints `FLAG` where the unit or
quantity differs from the request, and `FAIL` if such a row is marked `quoted`.

**By eye (no code):** for each supplier, open the quote and check three rows at random plus every row that is not `quoted`: find
the `quote_text` on the cited page, and read the numbers and unit off that line. Search the quote for each `missing` line's key word.
Compare the unit column with the request's, line by line; any difference must be a `qualified` row with `units_needed` filled and a
line in the deviation report. One wrong row sends the table back.

#### In the example
Fernwick prices installation per `half day (4 h)`; the request asks for a `day (8 h)`. Copied faithfully, the row traces to item 5
and is flagged. Written as `day (8 h)`, it fails, because item 5 does not say that. The script then prices the full day from
`units_needed` 2 at 380.00, so the half-day price cannot pass as a day's. See the walkthrough.

## checks/2-recompute.md

### Check 2: recompute everything outside the model

**The rule.** Every sum that matters is calculated by the script or a spreadsheet, never by the model: each quote's own arithmetic
(line amounts, subtotal, VAT, total), and the like-for-like comparison (each request line priced for exactly what you asked, then
subtotal, VAT and total per supplier). The recommendation copies those figures; it does not make new ones.

**Why.** A language model predicts text. It gets arithmetic right most of the time, which is not good enough for a purchase order,
and suppliers make arithmetic mistakes too. A formula catches both, every time.

#### With the script

`python -I checks/check_quotes.py` prints `PASS` or `MISMATCH` per quote (with the recomputed subtotal, VAT and total), then the
COMPARISON table, the AWARD under your rule and a THRESHOLD for incomplete quotes. It then reads `outputs/recommendation.md` and
fails if the table differs from its own, if the recommended award is not its AWARD, or if any figure in the recommendation or the
deviation report comes from neither the quotes, the request nor its output.

#### With a spreadsheet (no code)

You do this part yourself; the assistant waits for your figures. Tested in LibreOffice Calc on the example; the formulas use only
IF, AND, OR, LEFT, ROUND, SUMIFS, COUNTIFS and TEXT, which Excel and Google Sheets also have.

1. Open `outputs/trace-table.csv` (the assistant gives it to you in chat). If your spreadsheet uses a decimal comma, import with the
   full stop as the decimal separator. Columns run A `supplier` to N `note`.
2. **Each quote's arithmetic.** In O1 type `check`; in O2 paste this and fill it down to the last row:

```
=IF(AND(C2="line",F2<>"",H2<>""),IF(ROUND(F2*H2,2)=ROUND(I2,2),"ok","MISMATCH: should be "&TEXT(F2*H2,"0.00")),IF(C2="subtotal",IF(ROUND(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line"),2)=ROUND(I2,2),"ok","MISMATCH: lines add up to "&TEXT(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line"),"0.00")),IF(C2="vat",IF(ROUND(SUMIFS($I:$I,$A:$A,A2,$C:$C,"subtotal")*J2/100,2)=ROUND(I2,2),"ok","MISMATCH: should be "&TEXT(SUMIFS($I:$I,$A:$A,A2,$C:$C,"subtotal")*J2/100,"0.00")),IF(C2="total",IF(ROUND(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line")+ROUND(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line")*SUMIFS($J:$J,$A:$A,A2,$C:$C,"vat")/100,2),2)=ROUND(I2,2),"ok","MISMATCH: should be "&TEXT(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line")+ROUND(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line")*SUMIFS($J:$J,$A:$A,A2,$C:$C,"vat")/100,2),"0.00")),""))))
```

3. **Like-for-like price per line.** In P1 type `normalised`; in P2 paste this and fill it down:

```
=IF(AND(C2="line",LEFT(B2,1)="R",OR(D2="quoted",D2="qualified"),M2<>""),ROUND(M2*H2,2),"")
```

   Before you trust it, check `units_needed` (column M) on every row whose unit differs from the request: it is the one number in
   this column the assistant chose.
4. **Per supplier.** In R1 to V1 type `supplier`, `subtotal`, `priced lines`, `VAT`, `total`. Put one supplier name per row from R2
   down, then in S2 to V2 paste these and fill them down:

```
S2: =SUMIFS(P:P,A:A,R2)
T2: =COUNTIFS(A:A,R2,P:P,">=0")
U2: =ROUND(S2*SUMIFS(J:J,A:A,R2,C:C,"vat")/100,2)
V2: =S2+U2
```

5. **Read it.** A quote is complete when `priced lines` equals the number of R lines in your request. Among complete quotes that
   meet your limits (3-coverage.md), apply your rule from the request to the `subtotal` column. Send the assistant
   exactly these: any `MISMATCH` rows from column O; column P for every request line and supplier (the like-for-like line prices);
   and per supplier the subtotal, priced lines, VAT and total (S to V), naming the lowest complete and compliant quote. It copies
   them into the recommendation and marks them as yours. Then you write the RESULT line. The spreadsheet does not give "Above the
   lowest" or THRESHOLD; those come from the script only.

If your spreadsheet uses semicolons between arguments (common in European locales), replace each comma outside the quotes with a
semicolon.

#### In the example
Orrin Bay's six lines add up to 3,854.00; its summary says 3,584.00. Its VAT and total agree with the wrong subtotal, so the quote
looks tidy and reads 324.00 cheaper than its own lines. Script and spreadsheet both report it:

```
MISMATCH  Orrin Bay Systems: lines add up to 3,854.00, quote says subtotal 3,584.00 (difference 270.00)
MISMATCH  Orrin Bay Systems: recomputed VAT 770.80 and total 4,624.80, quote says total 4,300.80 (difference 324.00)
```

The per-supplier block gives Fernwick 4,006.20 (6 priced lines), Tallowmere 3,139.80 (5 of 6) and Orrin Bay 3,854.00 (6): the same
figures as the script's COMPARISON.

## checks/3-coverage.md

### Check 3: coverage, compliance and the deviation report

**The rule.** Every line of the request has exactly one row for every supplier, with a status. Every limit in the request (lead
time at most 15 working days, warranty at least 3 years ...) is met, or the quote cannot be awarded. Every row that is not `quoted`,
every breach and every place the assistant chose a reading is in the deviation report.

**Why.** The cheapest quote is often the one that left something out or promised a date you cannot use. And when you delegate a job,
the steps you did not watch are where it goes wrong; the deviation report is the assistant telling you where those are.

#### Status values

| Status | Means | Comparable? |
|---|---|---|
| `quoted` | Priced or stated as requested | Yes |
| `qualified` | Priced or stated, but a different unit, quantity, spec or limit | Priced lines: after conversion by `units_needed`. Terms: only if the limit is met |
| `excluded` | The supplier says it is not included | No, until priced |
| `missing` | Not mentioned anywhere in the quote | No, until priced |
| `extra` | In the quote but not in the request (ref X1, X2 ...) | Counted in the quote's own total, left out of the comparison |
| `stated` | Subtotal, VAT and total rows | Recomputed in check 2 |

#### Running it

**With the script:** `python -I checks/check_quotes.py` prints a `GAP` for every row that is not `quoted`; a `FAIL` for any request
line with no row (or two) for a supplier; for each T line with "at most" or "at least" in the request, a `FLAG ... BREACH` when the
quoted value misses the limit (a `FAIL` if that row still says `quoted`); and a `FAIL` for any FLAG, MISMATCH or GAP that has no row
in `outputs/deviation-report.md` naming both the supplier and the line ID (or `subtotal`, `vat`, `total`). A quote with a breach or an
unpriced line is marked "no" under "Complete and compliant" and cannot be the AWARD.

**By eye (no code):** filter the status column to everything except `quoted`: each remaining row must be in the deviation report.
Filter the ref column to T lines and compare each value with the limit in your request. Count rows per supplier: one per request line.
In a spreadsheet, `=COUNTIFS(A:A,"Supplier name",C:C,"line")+COUNTIFS(A:A,"Supplier name",C:C,"term")` equals the number of request
lines.

#### The deviation report

Format in `templates/deviation-report.md`: one row per item, with what the request asked, what
the quote says with its source, what the assistant did, why, and the decision left to you. It ends with the RESULT line and what the
assistant did not do.

#### In the example
Tallowmere's quote has no installation line at all. It is the cheapest total on paper (3,767.76 including VAT) because it leaves out
a day of work that Orrin Bay prices at 640.00 and Fernwick at 380.00 per half day. Coverage reports:

```
GAP   Tallowmere IT R5 (On-site installation and configuration): missing
```

and the script confirms the line really is absent: no "installation" or "configuration" anywhere in the quote. All three lead times
(10, 15 and 8 working days) are within the 15-day limit, so no breach.
