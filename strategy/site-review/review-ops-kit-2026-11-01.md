# Blind review: kits/ops-three-quotes (v0.1, uncommitted), 2026-11-01

Reviewer: fresh agent, did not build the kit. Brief: strategy/briefs/W29b_review_ops_kit.md. Read-only on the repo except this file.
Run done in a scratch copy of the kit, with example/outputs and walkthrough.md removed before the run so the expected answer could
not leak; example/inbox/* copied into inbox/; INSTRUCTIONS.md followed literally with me as the assistant.

## Summary

| Severity | Count |
|---|---|
| 1. Wrong method or unsafe instruction | 2 |
| 2. Checks that miss | 4 |
| 3. Clarity | 4 |
| 4. Nits | 4 |

The three planted faults were all caught on the first check run (FLAG Fernwick R5, MISMATCH Orrin Bay subtotal and total, GAP
Tallowmere R5). My independent recommendation matched the expected one (Orrin Bay, 3,854.00 excl. VAT, conditional on Orrin Bay
confirming its invoice figure). The weaknesses are in what READY FOR REVIEW does not cover, and in the chat path.

**Time.** README to READY FOR REVIEW: 21:30:48 to 21:32:39, about 2 minutes wall clock for me as the assistant (plan, trace table of
33 rows, two check runs, deviation report, recommendation, progress log). The whole review, including adversarial runs, took about
10 minutes. A human reader's ten-minute start is plausible on the folder path, not on the chat path (see D2).

## Pass/fail per check

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Run it as the reader | PASS, with two forced departures | First run: 1 FLAG, 2 MISMATCH, 2 GAP, 1 FAIL (no report yet). Second run: READY FOR REVIEW, exit 0. Nothing made me skip a check or invent a figure from nowhere. Two places made me do my own arithmetic with no check behind it: Fernwick's normalised R5 and subtotal (760.00 / 4,006.20) and Orrin Bay's recomputed VAT (770.80; the script prints only subtotal and total). I labelled them "unchecked"; the expected output does not (D1). |
| 2 | Instruction quality | PARTIAL | Stance named and right (Executor with an Interpreter step; matches THE_FOURTEEN_STANCES 2.7 and 2.10 and the Matrix rows: plan before action, deviation report, nothing ships uninspected, trace every interpretation). Plan-before-action, sign-off rule and one Constraints block present; maps onto the Intent Doc (task, scope, boundaries, if uncertain). Fails on portability: the chat path lacks the files the instructions depend on (D2). 46 lines against R10's "under 40". |
| 3 | Checks | PARTIAL | Exit codes 0/1 documented and honoured; the STOP line for a missing request file is clear. Trace catches a figure not on its cited page (their test, and my 3854.00 test). Coverage lists a GAP per supplier and line and FAILs an unreported finding. But trace is page-level (D3), the recommendation is never checked (D4), terms are not compared with the request (D5), and an Excel-saved CSV crashes the script with a traceback (D7). |
| 4 | Synthetic example | PASS | One fault per quote, a realistic SME purchase with plausible prices, "SYNTHETIC EXAMPLE" / "(fictional)" on every file. Web search for Brindle & Moss, Fernwick Network, Tallowmere IT, Orrin Bay Systems: no real company found. README has no price (`grep '\$[0-9]'` and an EUR/amount grep: 0 hits). |
| 5 | Rules | PARTIAL | Banned words 0, pen name 0, every relative link in the kit resolves (scripted check), licence lines correct (text CC BY-SA 4.0, script and tests MIT; both texts exist in LICENSES/). Voice is plain. Fails "nothing promises what the kit cannot do": README says it works with ChatGPT, Copilot or Gemini and "the checks need no code" (D2), and "a total it worked out itself is never presented as checked" while the expected output does exactly that (D1). |

Tests: `python -I checks/tests/test_check_quotes.py` 4/4; `python -I checks/check_quotes.py example` READY FOR REVIEW.

## Defects, ranked

### 1. Wrong method or unsafe instruction

**D1. Normalisation contradicts the Recompute and Trace rules, and the expected output models the violation.** INSTRUCTIONS step 5
requires normalising (its own example: two half days priced as one day), step 6 requires recomputed figures, and check 2 says totals
come "from the script or the spreadsheet, never from your own arithmetic". No check computes a normalised figure. The decisive number
in the example, Fernwick 4,006.20 against Orrin Bay 3,854.00, is model arithmetic, as are 760.00, 801.24, 4,807.44, "3.9%", "530.67"
and "2026-11-19". example-recommendation.md then says "Subtotals and totals come from `checks/check_quotes.py` and the normalisation
above, not from the model's arithmetic", which is false for Fernwick. Check 1 ("every figure in the comparison ... appears on that
page as written") cannot hold for a normalised cell either. A model that imitates the example learns to present its own sums as
checked, which the Constraints forbid. Had the model mis-added Fernwick to 3,806.20, the award flips and every check still passes.

**D2. The chat path is missing the files the instructions run on.** README step 3 tells chat users (Claude or ChatGPT project, Gem,
Copilot agent) to paste INSTRUCTIONS.md and upload the files from `inbox/`. INSTRUCTIONS then points to `templates/trace-table.csv`,
`checks/1-trace.md`, `templates/deviation-report.md`, `templates/recommendation.md`, `checks/2-recompute.md` and
`checks/check_quotes.py` "from the kit folder", none of which the chat assistant has. The ready gate is the script's RESULT line,
which does not exist in chat, so checks 1 and 3 end up "run" by the model on its own work. "Works with Claude, ChatGPT, Copilot or
Gemini, and the checks need no code" holds only for the recompute formula, which the person pastes themselves.

### 2. Checks that miss

**D3. Trace is page-level, so a misread becomes a supplier error.** `on_page()` looks for each number anywhere on the cited page.
Test: Orrin Bay R6 written as 640.00 / 640.00 (the installation figure, same page). Trace passes; recompute prints MISMATCH against
Orrin Bay; the report already names "Orrin Bay Systems ... subtotal / total"; RESULT READY FOR REVIEW, and the recomputed 4,434.00
would move the award to Fernwick. Same pattern for a false `missing` (Orrin Bay R6 marked missing although quoted): trace skips missing
rows, the line sum drops, the MISMATCH is attributed to the supplier, and once the GAP is written up the result is READY. checks/README
tells the person to "Ask the supplier which figure it will invoice", so the model's mistake goes out as a question to the supplier.
Quantities such as 1 or 2 are trivially "found" on any page.

**D4. The recommendation is never checked.** check_quotes.py never opens recommendation.md. Test: award changed to "Fernwick Network
Supply, 3,626.20" (the un-normalised half-day figure): READY FOR REVIEW. R10 specified recompute "compared with the model's table";
the kit compares each quote with itself. checks/README is honest that READY does not mean the recommendation is right, but
INSTRUCTIONS uses READY as the gate before the person reads the document they sign.

**D5. Terms are not compared with the request.** Test: Tallowmere lead time changed to 20 working days (request: at most 15), row left
`quoted`: no FLAG, READY FOR REVIEW. The script compares only the unit on `term` rows; the request's "at most" / "at least" thresholds
are not read. In this example a lead-time breach is exactly what the move date makes costly.

**D6. Recomputed VAT is not printed.** For a quote that does not add up, the script prints the recomputed subtotal and total but not
the VAT, so the recommendation template's VAT row needs model arithmetic (770.80 in the example).

### 3. Clarity

**D7. An Excel round trip crashes the script.** 2-recompute.md sends the person to open the trace table in a spreadsheet; a CSV saved
back with a UTF-8 BOM, or with semicolons (European locales), gives `KeyError: 'supplier'` and a Python traceback instead of a STOP line.

**D8. No route to text copies.** INSTRUCTIONS: "Text copies of PDF quotes work best for the checks"; only checks/README names
pdftotext, which an ops manager does not have. If the assistant makes the text copy, trace checks the model against its own
transcription. Decimal-comma quotes ("1.090,00") fail trace wholesale; the limitation is not stated.

**D9. Under-specified table rules.** Status for subtotal, VAT and total rows is undefined (I wrote `quoted`, the example leaves it
empty; both pass). Step 7 says "three lines" for progress.md; the example writes one bullet. The deviation report must name supplier
and line ID on one line for the coverage check to find it; that rule is in the template, not in INSTRUCTIONS.

**D10. Method naming and R10 deltas.** INSTRUCTIONS says "Your stance is Executor"; in the method the stance is the person's (README
gets it right: "You are in the Executor stance"). R10 asked the README for "when not to use it" (absent) and INSTRUCTIONS under 40
lines (46).

### 4. Nits

- **D11.** 3-coverage.md and the walkthrough say the others "price at 640.00 and 760.00"; Fernwick prices 380.00 per half day, and
  760.00 is a normalisation.
- **D12.** Root LICENSE lists docs/ and skills/ for MIT and named documents for CC BY-SA; kits/ is not listed (the kit README covers it).
- **D13.** The tests leave temp directories behind. The LibreOffice claim for the formula was not re-verified here.
- **D14.** `inbox/README.md` sits among the inputs, so a chat user who uploads "the files from inbox/" uploads it too.

## Three things right

1. The example is well built: the quick read picks Tallowmere, the checked read picks Orrin Bay, each check maps to one fault, and
   copying Orrin Bay's wrong subtotal as printed (correcting it fails trace) is a sharp teaching point.
2. check_quotes.py is small, standard-library, runs under `-I`, does exact Decimal arithmetic, prints labelled findings and one RESULT
   line, and its tests include negative cases (unit rewritten, model arithmetic, dropped row, unreported finding). Forcing every
   finding into the deviation report is the Executor guardrail made mechanical.
3. The sign-off discipline is clear and consistent: DRAFT, NOT SIGNED; a sign-off block only the person fills; write only to
   outputs/; no supplier contact; the person's "How we decide" rule quoted word for word.

---

## Re-review, 2026-11-01 (after the builder's fix pass)

Same reviewer, same method: fresh scratch copy, example/outputs and walkthrough removed, `inbox/` and `outputs/` created as the
README now says, INSTRUCTIONS.md followed literally. The builder's report was not read; every result below comes from a run.

**Original run.** Trace table (now with `quote_text` and `units_needed`) written in one pass. First run: FLAG Fernwick R5, MISMATCH
Orrin Bay subtotal and total (recomputed VAT 770.80 now printed), GAP Tallowmere R5, COMPARISON with Fernwick normalised by the script
to 4,006.20, AWARD Orrin Bay Systems, THRESHOLD Tallowmere 530.67; NOT READY only because the two documents did not exist yet. After
writing them from the script output: READY FOR REVIEW, exit 0. No arithmetic of mine was needed anywhere. About 1.5 minutes from first
trace row to READY. Kit tests 15/15; `check_quotes.py example` READY.

**Tampering cases** (each tried both with stale outputs and with outputs regenerated to agree with the tampered table, which is what
a model would do):

| Case | Result | Blocked? |
|---|---|---|
| Wrong number that appears elsewhere on the page (Orrin Bay R6 as 640.00) | FAIL: the Delivery line does not show 640.00 | Yes |
| Line marked missing although quoted (Orrin Bay R6) | FAIL: "delivery" appears on p.1 | Yes |
| Altered award in recommendation.md | FAIL: recommends Fernwick, AWARD is Orrin Bay | Yes |
| 20-day lead time against "at most 15", row left `quoted` | FAIL: mark it qualified | Yes |
| Same, table says 15 while the quote says 20 | FAIL: quote_text / figure not on the line | Yes |
| Same, honest path: row `qualified` and reported | FLAG BREACH, quote marked not compliant, cannot be the AWARD; READY | Correct behaviour |
| Breach on the cheapest quote (Orrin Bay 20 days) | AWARD moves to Fernwick, THRESHOLD recomputed (675.62, checked by hand) | Correct behaviour |
| Figure not the script's, two decimals (4,006.30; a model difference 152.20) | FAIL: figures not from the quotes, the request or this script | Yes |
| Figure not the script's, integers ("about 152 EUR", "2 working days sooner") | READY | **No** (N1) |
| Model percentage that equals a known number ("Fernwick is 4% dearer") | READY | **No** (N1) |
| Winner's price in the prose given as the quote's wrong printed figure (3,584.00 / 4,300.80) | READY | **No** (N1) |
| Prose arguing for Fernwick while the award line says Orrin Bay | READY | **No** (N1) |
| Orrin Bay R6 cited to the installation line (its words and figures), `qualified`, reported | AWARD flips to Fernwick; READY | **No** (N2) |

**Chat-only path** (CHAT-BUNDLE.md plus the four inbox files; spreadsheet instead of the script). The bundle carries the instructions,
templates and check procedures, and tells the assistant to stop at step 4 and leave the RESULT line to the person. I could not run a
spreadsheet here (no LibreOffice), so I emulated the formulas in 2-recompute.md literally on my trace table: column O gives the two
Orrin Bay MISMATCH rows; the per-supplier block gives Fernwick 4,006.20 (6 priced lines, VAT 801.24, total 4,807.44), Tallowmere
3,139.80 (5 lines), Orrin Bay 3,854.00 (6 lines, VAT 770.80, total 4,624.80), the same as the script. In chat, READY is the person's
own attestation; README step 3 and step 5 say so.

### Answers to the three questions

- **Does every deciding figure come from the script?** In the comparison table and the award line, yes: both must match the script
  row for row. Figures in the prose are only checked for membership of a pool that holds every number on the quotes (including the
  wrong printed ones), the request, the trace table and the output, and only when written with two decimals or a % sign (N1).
- **Is READY impossible in each tampering case?** For the three original cases, yes. For "a figure that is not the script's own",
  yes for two-decimal figures, no for integers, colliding percentages and wrong-but-printed figures (N1). A wrong line mapping that is
  consistent with the cited line still reaches READY (N2).
- **Does the README keep its claims?** Mostly. "The script checks that the recommendation matches them" holds for the table and award
  only. "Do its own arithmetic: every sum, VAT figure and percentage comes from the script or your spreadsheet" is an instruction the
  checks enforce for two-decimal figures only (N1, N6).

### Original defects

| Defect | Result | Evidence |
|---|---|---|
| D1 normalisation by the model | PASS | Script prices R5 from `units_needed` (760.00, 4,006.20) and FAILs a wrong `units_needed`; example claims now true |
| D2 chat path missing files | PASS | CHAT-BUNDLE.md carries Parts 1 to 3 and maps paths; but see N3, N4 |
| D3 page-level trace | PASS | Line-level match on `quote_text`; false `missing` caught; residual N2 |
| D4 recommendation unchecked | PASS | Table, award line and two-decimal figures checked; residual N1 |
| D5 terms not checked | PASS | BREACH / FAIL as tabled above |
| D6 recomputed VAT not printed | PASS | "recomputed VAT 770.80 and total 4,624.80" |
| D7 Excel round trip crashes | PASS | BOM, semicolons with decimal commas: READY; bad header: STOP line, exit 1 |
| D8 no route to text copies | PASS | checks/README "Getting text out of PDF quotes"; README "Limits worth knowing" |
| D9 under-specified table rules | PASS | `stated` enforced; three log lines; supplier + ID rule in INSTRUCTIONS step 5 |
| D10 stance naming, R10 deltas | PASS | "They are in the Executor stance"; "When not to use it" present; INSTRUCTIONS 37 lines |
| D11 760.00 described as quoted | PASS | 3-coverage.md now says 380.00 per half day |
| D12 root LICENSE omits kits/ | PASS | LICENSE lists kits/ under both (LICENSE is modified, uncommitted) |
| D13 tests leave temp dirs | PASS | `shutil.rmtree` in the tests; formulas still only emulated, not run in a spreadsheet |
| D14 inbox/README.md among inputs | PASS | inbox/ no longer shipped |

Rules re-checked: banned words 0, pen name 0, README prices 0, relative links resolve, CHAT-BUNDLE.md in sync with its builder.

### New defects

**Checks that miss**

- **N1. Prose figures are checked against a pool, not against the right cell.** Shown in the table above: the winner's price stated as
  Orrin Bay's wrong printed subtotal (3,584.00 excl., 4,300.80 incl.), integer arithmetic, a percentage equal to a quantity, and prose
  arguing for the losing supplier all reach READY, with the pasted table and award line correct. Narrowing the pool for the
  recommendation to the script's output plus the request (and quote figures only inside quoted text or "Before you sign") would close
  the first case; integers and prose intent need the person's read, and the README could say so.
- **N2. A row mapped to the wrong quote line passes when it is consistent with that line.** Orrin Bay R6 cited to "Installation,
  configuration and handover" (1, day (8 h), 640.00) traces, is flagged as a unit difference, is reported, and leaves R6 "not priced":
  Orrin Bay becomes incomplete and the AWARD flips to Fernwick, READY. Nothing notices two request lines citing the same quote line, or
  that the request line's key word ("delivery") sits on another line of the same quote. The deviation report row is the only signal.

**Clarity**

- **N3. The chat bundle drops link text.** tools/build_chat_bundle.py `demote()` replaces kit-relative links with `r""` instead of
  `r"\1"`, so 8 link texts vanish from CHAT-BUNDLE.md: the check-name column in "How to read the checks" is blank, and sentences read
  "meet your limits ()" and "Format in :". One-character fix, then rebuild.
- **N4. The chat hand-back is under-specified.** 2-recompute.md step 5 says "Give the assistant the figures" without saying which; the
  comparison needs column P per line (the 760.00 cell) as well as S to V. The recommendation template in the bundle still asks for
  the COMPARISON "as printed", "Above the lowest" and THRESHOLD, which the spreadsheet does not produce; the assistant must either leave
  them out or compute them, and the template does not say which.

**Nits**

- **N5.** "Start in ten minutes" fits the folder path; on the chat path the person also traces by eye and fills four formula blocks,
  closer to half an hour for three quotes.
- **N6.** README "What it will never do ... Do its own arithmetic" reads as a guarantee; it is an instruction plus a partial check (N1).

### Severity now

| Severity | Open |
|---|---|
| 1. Wrong method or unsafe instruction | 0 |
| 2. Checks that miss | 2 (N1, N2) |
| 3. Clarity | 2 (N3, N4) |
| 4. Nits | 2 (N5, N6) |

**Merge:** not blocked on method or safety. N3 is a one-character fix and should go in before merge, since chat users get the
bundle. N1 and N2 are best closed, or stated under "Limits worth knowing", before the first design-partner run.
