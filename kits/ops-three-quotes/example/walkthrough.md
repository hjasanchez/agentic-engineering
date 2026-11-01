# Walkthrough: one full run on the example

> SYNTHETIC EXAMPLE. Brindle & Moss Studio, Fernwick Network Supply, Tallowmere IT and Orrin Bay Systems are fictional, and every
> price is invented. The assistant's messages below show the shape of a good run. The script output is pasted verbatim from
> `python -I checks/check_quotes.py` on these files.

## The situation

An 18-person studio is moving floors on 2026-11-20 and needs a new office network installed first. The operations lead sent a
request for six items and two terms ([example-request.md](inbox/example-request.md)) to three suppliers and got three quotes back.
Each quote has one fault, the kind that turns up in real quotes every week:

| Quote | Planted fault | Caught by |
|---|---|---|
| [A, Fernwick](inbox/example-quote-A-fernwick.txt) | Installation priced per half day (4 h); the request asked for a day (8 h) | 1. Trace (the unit) |
| [B, Tallowmere](inbox/example-quote-B-tallowmere.txt) | No installation line at all | 3. Coverage |
| [C, Orrin Bay](inbox/example-quote-C-orrinbay.txt) | Lines add up to 3,854.00; the summary says 3,584.00 | 2. Recompute |

**What a quick read concludes.** Ranked by the totals printed on each quote: Tallowmere 3,767.76, Orrin Bay 4,300.80, Fernwick
4,351.44 (including VAT). Tallowmere looks cheapest by more than 500.00. All three printed totals mislead, each for a different reason.

## 1. Setup

The request and the three quotes go in `inbox/`. The assistant gets `INSTRUCTIONS.md` (or, in a chat, `CHAT-BUNDLE.md`).

> **You:** Compare the quotes in the inbox.

## 2. The plan comes first

> **Assistant:** Plan before I start.
> - Files: example-request.md (8 lines: R1 to R6, T1, T2; award rule with a "prefer faster" clause on T1), and three quotes as
>   text: Fernwick (2 pages), Tallowmere (1 page), Orrin Bay (2 pages). All readable.
> - I will fill outputs/trace-table.csv (8 rows per supplier plus subtotal, VAT and total), run check_quotes.py, then write the
>   deviation report and a draft recommendation from its output.
> - I will not contact any supplier. Say go.
>
> **You:** Go.

A plan that said "6 lines" instead of 8 would have told you it had missed the terms.

## 3. The trace table (the Interpreter step)

The assistant copies each figure as printed, with the words of its quote line, the file and the page. Three of the 33 rows of
[example-trace-table.csv](outputs/example-trace-table.csv), one per planted fault:

| supplier | ref | status | quote_text | qty | unit | unit_price | amount | page | units_needed |
|---|---|---|---|---|---|---|---|---|---|
| Fernwick Network Supply | R5 | qualified | Installation and configuration on site | 1 | half day (4 h) | 380.00 | 380.00 | 1 | 2 |
| Tallowmere IT | R5 | missing | | | | | | | |
| Orrin Bay Systems | (subtotal) | stated | Subtotal | | | | 3584.00 | 2 | |

The Orrin Bay row copies the wrong subtotal as printed. Correcting it here would hide the supplier's error, and the trace check
would fail it: the Subtotal line on page 2 does not say 3,854.00. The Fernwick row's `units_needed` of 2 is the one number the
assistant chose: two half days for one day. The script checks it against the units.

## 4. First run

> **Assistant:** Running `python -I checks/check_quotes.py`.

```
CHECK 1  TRACE: every figure is on the quote line it cites, in the unit it is quoted
  FLAG  Fernwick Network Supply R5: quoted 1 x "half day (4 h)", request says 1 x "day (8 h)"
  ....  69 figures found on the quote lines they cite
CHECK 2  RECOMPUTE: each quote's own arithmetic, recalculated here, not by the model
  PASS  Fernwick Network Supply: lines, subtotal, VAT and total add up (total 4,351.44)
  PASS  Tallowmere IT: lines, subtotal, VAT and total add up (total 3,767.76)
  MISMATCH  Orrin Bay Systems: lines add up to 3,854.00, quote says subtotal 3,584.00 (difference 270.00)
  MISMATCH  Orrin Bay Systems: recomputed VAT 770.80 and total 4,624.80, quote says total 4,300.80 (difference 324.00)
CHECK 3  COVERAGE AND COMPLIANCE: every request line for every supplier, every limit met
  GAP   Fernwick Network Supply R5 (On-site installation and configuration): qualified
  GAP   Tallowmere IT R5 (On-site installation and configuration): missing
COMPARISON  computed by this script; paste the table and the AWARD line into the recommendation unchanged
| Line | Fernwick Network Supply | Tallowmere IT | Orrin Bay Systems |
|---|---|---|---|
| R1 24-port managed PoE+ switch, 2 each | 1,090.00 | 1,024.00 | 1,120.00 |
| R2 Wi-Fi 6 access point, ceiling mount, 4 each | 756.00 | 820.00 | 716.00 |
| R3 Cat6 patch cable, 1 m, 48 each | 115.20 | 100.80 | 108.00 |
| R4 Firewall appliance with 1-year security subscription, 1 each | 1,240.00 | 1,195.00 | 1,210.00 |
| R5 On-site installation and configuration, 1 day (8 h) | 760.00 (2 x 380.00 per half day (4 h)) | not priced | 640.00 |
| R6 Delivery to site, 1 lot | 45.00 | 0.00 | 60.00 |
| T1 Lead time from order, at most, 15 working days | 10 working days | 15 working days | 8 working days |
| T2 Hardware warranty, at least, 3 years | 3 years | 3 years | 3 years |
| Subtotal excl. VAT | 4,006.20 | 3,139.80 + R5 not priced | 3,854.00 |
| VAT | 801.24 (20%) | - | 770.80 (20%) |
| Total incl. VAT | 4,807.44 | - | 4,624.80 |
| Above the lowest | +3.9% | - | lowest |
| Complete and compliant | yes | no: R5 not priced | yes |
AWARD  Orrin Bay Systems (rule: lowest complete and compliant; prefer faster if within 5% and at least 5 fewer working days on T1)
THRESHOLD  Tallowmere IT: wins under the rule only if the unpriced line(s) R5 come to 530.67 or less, excl. VAT
OUTPUTS  the deviation report and the recommendation match this run
  FAIL  no deviation report in outputs/ yet
  FAIL  no recommendation in outputs/ yet
RESULT  NOT READY: 2 problem(s) marked FAIL above. Fix the table or the outputs, then run again.
```

All three faults are on screen, and none of the deciding figures came from the model:
- **Fault A, caught by check 1 (trace).** 380.00 buys four hours, not eight. The script prices the full day from `units_needed`:
  760.00, so Fernwick's subtotal is 4,006.20, not the 3,626.20 printed on its quote.
- **Fault C, caught by check 2 (recompute).** Orrin Bay's VAT and total agree with its wrong subtotal, so the quote looks tidy. Only
  adding the lines up outside the model shows the 270.00 gap. The spreadsheet route in
  [checks/2-recompute.md](../checks/2-recompute.md) gives the same figures.
- **Fault B, caught by check 3 (coverage).** Tallowmere is cheapest on paper because it leaves out a day of installation. The
  script also confirmed the line is truly absent: no "installation" or "configuration" anywhere in the quote. The THRESHOLD line
  says what Tallowmere's installation would have to cost to change the outcome.
- **Compliance.** All lead times are within the 15-day limit and all warranties meet 3 years, so no BREACH. Fernwick is within 5%
  of Orrin Bay but slower, so the "prefer faster" clause does not apply. The AWARD is Orrin Bay.

The two FAILs are expected: the documents do not exist yet.

## 5. The documents, then the second run

The assistant writes [example-deviation-report.md](outputs/example-deviation-report.md): one row per finding, plus one the checks
cannot see, its own reading of Tallowmere's "security gateway" as the requested firewall (row 5). Then
[example-recommendation.md](outputs/example-recommendation.md), with the COMPARISON table and AWARD pasted unchanged and every
figure in its prose taken from the output above. Second run, last lines:

```
OUTPUTS  the deviation report and the recommendation match this run
  ....  4 findings looked up in example-deviation-report.md
RESULT  READY FOR REVIEW: figures traced, sums and award computed here, every finding reported. The decision is yours.
```

Had the assistant written "Recommended award: Fernwick Network Supply", or a Fernwick subtotal of 3,806.20 from its own
arithmetic, or changed a cell in the pasted table, this run would have failed and named the line. The kit's tests try each of those.

## 6. Sign-off

The operations lead reads one table and a five-row report instead of three quotes. The quick read picked Tallowmere; the checked
read recommends Orrin Bay, once Orrin Bay confirms which subtotal it will invoice. The lead sends that question themselves, and ticks
the sign-off block when the answer comes back. The assistant has not contacted anyone.

## Try it yourself

Create `inbox/` and `outputs/` in the kit folder, copy the four files from `example/inbox/` into `inbox/`, run your assistant with
`INSTRUCTIONS.md`, and compare its outputs with `example/outputs/`. To see the script on the expected outputs:
`python -I checks/check_quotes.py example` from the kit folder.
