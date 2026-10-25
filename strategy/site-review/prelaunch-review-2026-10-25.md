# Pre-launch blind review — 2026-10-25

Reviewer: fresh agent (W10 brief). Scope: the uncommitted diff on `meta-strategy` (HEAD committed 2026-10-25 21:07 +0100) against
`strategy/briefs/W6_prelaunch_edits.md`, V3, the creativecommons.org legal code and README.md. I did not read the builder's STATUS or return.
Delete this file before commit.

Scripts (scratchpad `w10/`, not in the repo): `cards.py` (own extraction of every card field, verbatim check against V3, HEAD
comparison), `site.py` (Playwright, 9 pages x 390/1280 x JS on/off, plus filters, canvas animation and reduced motion), `genie.py`
(Genie animation and card heights, current vs `git archive HEAD docs`).

## Pass/fail per check

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Scope | PASS, one flag | `git diff --stat`: 20 files. Every content change maps to a W6 item. Flag: `skills/.../audit-then-fix-waits-for-approval/place-files.sh` shows `old mode 100755 / new mode 100644` with no content change. Its mtime is 2026-10-23 04:14, before HEAD, so W6 probably did not cause it, but it sits in the frozen skill folder and must not be staged. `docs/README.md` also drops "about.html keeps an HTML comment about the [pen-name] co-author credit", which W6 item 3 covers. |
| 2 | Licenses | PASS, two questions | `LICENSES/CC-BY-SA-4.0.txt` and a fresh `curl` of legalcode.txt: both 20,138 bytes, raw-equal, sha256 `28a9529c7d0bb4dc...` on both. `LICENSES/MIT.txt` is the standard text, "Copyright (c) 2026 Henrique Jr. Sanchez". Root `LICENSE` names MIT for docs/, skills/ and scripts, and CC BY-SA for the PDFs, both protocol .md files, MODE_FLUENCY_MATRIX.md, the essays and the site text; it adds the GPL-3.0 sentence. README, about.html §4 and all nine footers agree. `grep -rn GPL README.md docs/` returns only about.html:121 (the pre-2026-10-25 sentence). See questions Q1 and Q2. |
| 3 | Cards | PASS | `cards.py`: all 18 `<dd>` fields on Oracle, Genie, Interpreter, Executor and Miner are verbatim substrings of V3 after whitespace normalisation and stripping of `_`/`**`. 11 match exactly; 7 match once curly quotes are mapped to V3's straight quotes. The Interpreter, Executor and Miner cardinal rules match V3 except for the first letter's case. The Executor and Miner "Guardrail." asides match V3. The Miner aside changes V3's `choose,"` to `choose.”`. The other 9 cards are byte-identical to `git show HEAD:docs/stances.html`. On the five cards, markup with the text removed is identical to HEAD. Outside the cards, the only change is the footer. Render: 14 cards; filter counts prompt 2, context 3, intent 2, judgment 3, coherence 1, evaluation 2, harness 1, none 1, consumption 7, construction 6, hinge 1, unplaced 3; status "Showing all 14 stances."; the canvases on all five cards animate at 390 px. At 1280 px the Genie canvas settles after it draws, the same as at HEAD (1/7 frame changes in both); reduced motion gives a static canvas. 0 console errors. |
| 4 | Pen name | FAIL | Surname from `git show HEAD:README.md`: "Mill". `grep -ril mill --exclude-dir=.git --exclude='*.pdf' .` returns 10 files. 7 of them are false positives ("million" x6, "Miller" x4). 3 are real credits: `skills/mode-fluency-diagnostic/references/maturity-map.md:3`, `spec-templates.md:3`, `stack-audit.md:3`, each "(Mill & Sanchez, March 2026)". `grep -ril hayen` is empty. Every edited sentence (README, both protocol headers, stack.html source note, HANDOFF, STRATEGY_BRIEF x3, 00_SHARED_CONTEXT, R5) still reads as a sentence. |
| 5 | Regressions | PASS on function; one factual regression (D1) | `site.py`: 36 loads (9 pages x 2 widths x JS on/off), 0 console errors or page errors, scrollWidth equals clientWidth on every load, footer text present on every page, 0 banned words in the visible text. The `·` is UTF-8 `c2 b7` and every page declares `<meta charset="utf-8">`. `docs/_qa/blind-review.md` is gone, and docs/README.md lines 18 and 61 are consistent with the change. CSS is unchanged, so contrast and dark mode were not re-measured. |

## Defects, ranked

### Factual / invented
- **D1 (high): about.html:104 is now false.** The deviation report on the live site still says "the stance texts that v3 gives at greater length are still abridged on the cards without ellipses." After this diff the five cards are restored in full. W6 did not list this line, so this is a gap in the brief, not a builder error. It needs a one-line edit before launch.
- **D2 (high): pen-name credit still ships in the repo.** "(Mill & Sanchez, March 2026)" is on line 3 of three skill reference files (listed in check 4). W6 contradicts itself here: it says to remove the credit from every text file and that the grep must be empty, and it also says not to touch the skill folder. Henrique needs to decide whether the skill folder may be edited (three one-line changes).
- **D3 (medium): `docs/_qa/qa-report.md` is stale and public.** The footer on all nine pages points to it. It still says "Not fixed: (1) the abridged v3 texts on the Oracle, Genie, Interpreter, Executor and Miner cards", and it cites the deleted `_qa/blind-review.md` (heading at line 132, row X1). W6 froze this file, so this is a decision for Henrique.

### Broken function
- **D4 (medium, risk): mode change on `place-files.sh`.** The change drops the executable bit (100755 to 100644). If it is committed with `git commit -a`, the eval's `place-files.sh` loses `+x`. Stage files explicitly and leave this one out.

### Accessibility
- None found. The footer item keeps the same element and class, and no CSS or ARIA changed.

### Copy / tone
- **D5 (question): Oracle and Genie expectations now quote Henrique's raw chat prompt** (V3 line 2). The Oracle text starts lowercase ("The oracle, in the human's eye, is the mental model of…"), and the Genie text ends "and receiving that by the LLM/“genie”." It is verbatim, as W6 asked, but it reads as unedited chat on a public card. Henrique should decide whether to accept it.
- **D6 (low): Oracle "Why it dominates" starts "The Oracle and the Genie are indeed dominant".** The "indeed" answers a prompt the reader never sees.
- **D7 (low): the same sentence appears twice on the Miner card.** "The mined idea is ore, never a citation; nothing mined enters anything you stake something on until it has survived an independent check." is in both the Failure mode and the Guardrail aside.
- **D8 (low): about.html:120 has an awkward repeat.** "The code (the code behind this site, the skills and the scripts) is MIT" says "code" twice.
- **D9 (low): wrong pronouns in HANDOFF.md.** The edited line keeps "his own pen name", and line 6 says "(he/him)". The house rule is they/them. This was already there before W6, and the edit kept it.

### Nits
- N1: Cards grew at 1280 px: Interpreter 1360 to 1499 px, Executor 1366 to 1562 px, Miner 1275 to 1554 px. Their row partners (Simulator, Scribe, Muse) now carry about 140 to 280 px of empty space.
- N2: The acceptance grep in W6/W10 (`grep -ril mill`) can never be empty, because it matches "million" and "Miller". Use `grep -rilw mill` or `"Mill &"`.
- N3: R5_footprint_audit.md lost the old channel's URL, which was its evidence. The grep requires that, but the audit trail is now thinner.
- N4: In the frozen skill folder, `README.md:57`, `EVAL.md:23` and `examples/audit-agentic-engineering.*` describe the license file as GPL-3.0. They describe an audited past commit, so they are historical, but they now read as stale.

### Questions (not defects)
- Q1: Both LICENSE and about.html say "Versions published before 2026-10-25 remain … GPL-3.0". HEAD, which is pushed and is under GPL, is dated 2026-10-25 21:07, so anything published that day under GPL falls outside the sentence. Would "before this change" or a commit hash be better?
- Q2: The scopes overlap. LICENSE lists `docs/` as MIT but "the text on the website" as CC BY-SA, and it lists `skills/` as MIT although `skills/.../references/*.md` are condensed from CC BY-SA documents. There is one author, so there is no legal conflict, but should it say "the HTML, CSS and JS in docs/"?

## Three things that are right
1. The CC BY-SA 4.0 file is byte-identical to creativecommons.org's legalcode.txt, and the MIT file is the standard text.
2. All 18 restored card fields are verbatim V3 text, the nine other cards are byte-identical to HEAD, and the card markup and canvases are untouched.
3. The footer is uniform on all nine pages, with 0 console errors, no horizontal scroll and no banned words across 36 page loads.
