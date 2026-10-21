# QA report: Mode Fluency site prototype

Run: 2026-10-21, headless Chromium 141 (`/opt/pw-browsers/chromium`) via the globally installed Playwright 1.56.1
(no `playwright install`). Pages opened from `file://`. Script: kept outside the repo (scratchpad `qa.js`);
raw results in `_qa/qa-results.json`.

## Summary

| PRD §2 metric | Result |
|---|---|
| Zero console errors from disk | **PASS**: 0 console errors, 0 page errors, 0 failed requests across 36 loads (9 pages x 390/1280 x light/dark) |
| No horizontal scroll at 390 and 1280 | **PASS**: `documentElement.scrollWidth <= viewport width` on all 36 loads; screenshots in `_qa/` |
| 14 stances, 7 components, 4 autonomy modes, 4 ambition types present, from sources | **PASS** (grep below; text taken from the source files, see Content notes) |
| Diagnostic returns stance + binding layer on every path | **PASS**: 26,880 combinations (all 14 stance paths x 1920 answer combinations), 0 without a stance, layer, guardrail or level; plus all 14 stance paths clicked through the UI |
| Landmarks, alt text, focus states, prefers-color-scheme | **PASS**: header/nav/main/footer + skip link on every page; 0 images without alt; focus outline `solid 3px` accent; dark theme tokens under `prefers-color-scheme` (dark screenshots `*-dark.jpg`) |
| Under 2 MB, no external JS, fonts system or Google | **PASS for the served site: 176 KB** (HTML+CSS+JS+SVG). No external scripts, no iframes, system font stack. Screenshots now live outside `site/` (see Fix pass) |
| No fabricated testimonials, logos, clients, prices, unsourced stats | **PASS**: only prices are "from $3,500" and "from $1,200"; every statistic on the essay and work pages carries a numbered source or inline source line; no testimonials/logos/clients |

## Page loads (console errors and horizontal scroll)

| Page | Width | Scheme | Console/page errors | Failed requests | scrollWidth | No h-scroll | Images w/o alt | Landmarks |
|---|---|---|---|---|---|---|---|---|
| index.html | 390 | light | 0 | 0 | 390 | pass | 0 | yes |
| calculator-problem.html | 390 | light | 0 | 0 | 390 | pass | 0 | yes |
| stances.html | 390 | light | 0 | 0 | 390 | pass | 0 | yes |
| stack.html | 390 | light | 0 | 0 | 390 | pass | 0 | yes |
| matrix.html | 390 | light | 0 | 0 | 390 | pass | 0 | yes |
| diagnose.html | 390 | light | 0 | 0 | 390 | pass | 0 | yes |
| learn.html | 390 | light | 0 | 0 | 390 | pass | 0 | yes |
| work.html | 390 | light | 0 | 0 | 390 | pass | 0 | yes |
| about.html | 390 | light | 0 | 0 | 390 | pass | 0 | yes |
| index.html | 1280 | light | 0 | 0 | 1280 | pass | 0 | yes |
| calculator-problem.html | 1280 | light | 0 | 0 | 1280 | pass | 0 | yes |
| stances.html | 1280 | light | 0 | 0 | 1280 | pass | 0 | yes |
| stack.html | 1280 | light | 0 | 0 | 1280 | pass | 0 | yes |
| matrix.html | 1280 | light | 0 | 0 | 1280 | pass | 0 | yes |
| diagnose.html | 1280 | light | 0 | 0 | 1280 | pass | 0 | yes |
| learn.html | 1280 | light | 0 | 0 | 1280 | pass | 0 | yes |
| work.html | 1280 | light | 0 | 0 | 1280 | pass | 0 | yes |
| about.html | 1280 | light | 0 | 0 | 1280 | pass | 0 | yes |
| index.html | 390 | dark | 0 | 0 | 390 | pass | 0 | yes |
| calculator-problem.html | 390 | dark | 0 | 0 | 390 | pass | 0 | yes |
| stances.html | 390 | dark | 0 | 0 | 390 | pass | 0 | yes |
| stack.html | 390 | dark | 0 | 0 | 390 | pass | 0 | yes |
| matrix.html | 390 | dark | 0 | 0 | 390 | pass | 0 | yes |
| diagnose.html | 390 | dark | 0 | 0 | 390 | pass | 0 | yes |
| learn.html | 390 | dark | 0 | 0 | 390 | pass | 0 | yes |
| work.html | 390 | dark | 0 | 0 | 390 | pass | 0 | yes |
| about.html | 390 | dark | 0 | 0 | 390 | pass | 0 | yes |
| index.html | 1280 | dark | 0 | 0 | 1280 | pass | 0 | yes |
| calculator-problem.html | 1280 | dark | 0 | 0 | 1280 | pass | 0 | yes |
| stances.html | 1280 | dark | 0 | 0 | 1280 | pass | 0 | yes |
| stack.html | 1280 | dark | 0 | 0 | 1280 | pass | 0 | yes |
| matrix.html | 1280 | dark | 0 | 0 | 1280 | pass | 0 | yes |
| diagnose.html | 1280 | dark | 0 | 0 | 1280 | pass | 0 | yes |
| learn.html | 1280 | dark | 0 | 0 | 1280 | pass | 0 | yes |
| work.html | 1280 | dark | 0 | 0 | 1280 | pass | 0 | yes |
| about.html | 1280 | dark | 0 | 0 | 1280 | pass | 0 | yes |

Screenshots (moved in the fix pass to `/home/user/meta-strategy/site-qa-screenshots/`, outside `site/`): `<page>-390.jpg`, `<page>-1280.jpg` (full page, light), `<page>-390-dark.jpg` (first screens, dark),
`matrix-interaction-*.jpg`, `diagnose-result-*.jpg`. Images were downscaled after capture to keep the folder small.

## Interactions

- Stances filter (`stances.html`): layer filter returns prompt ['genie', 'scribe'], context ['simulator', 'miner', 'translator'],
  intent ['tutor', 'adversary'], judgment ['oracle', 'executor', 'therapist'], coherence ['mirror'],
  evaluation ['librarian', 'interpreter'], harness ['executor'], none ['muse'].
  Meta filter: consumption ['oracle', 'genie', 'librarian', 'muse', 'therapist'], construction ['tutor', 'mirror', 'miner', 'translator'], hinge ['interpreter', 'executor'],
  not placed ['adversary', 'simulator', 'scribe']. Combined filter with no match shows the empty message and status "Showing 0 of 14 stances (layer: Harness; Not placed in v3 table).".
  Buttons use `aria-pressed`; status is an `aria-live` region.
- Matrix (`matrix.html`): Executor lights ['judgment', 'harness']; Oracle lights ['judgment']; Context layer lights
  ['simulator', 'miner', 'translator']; Coherence lights ['mirror']; Clear resets (0 lit elements after).
- Diagnostic (`diagnose.html`): path lengths [7, 8] questions. Validation message without a choice: "Choose one option to continue.".
  Back button returns to question 1 with the earlier answer kept: True. Copy button: "Copied." (clipboard text verified;
  textarea fallback when the Clipboard API is unavailable). Last result remembered via localStorage: "Question 1 of 7 · Last time on this device: Oracle / Judgment (2026-10-21)".
  With localStorage throwing on access: page errors [], result still produced (genie).
  Result view at 390px has no horizontal scroll: True.

| UI path (stance branch) | Questions answered | Result stance | Load-bearing layer | Watch next |
|---|---|---|---|---|
| oracle | 7 | oracle | Judgment | AI 101 @ Workplace |
| librarian | 7 | librarian | Evaluation | AI 401 @ Workplace |
| scribe | 7 | scribe | Prompt | AI 401 @ Workplace |
| genie | 7 | genie | Prompt | AI 201 @ Workplace |
| executor | 7 | executor | Harness + Judgment | AI 101 @ Workplace |
| interpreter | 7 | interpreter | Evaluation | AI 401 @ Workplace |
| tutor | 7 | tutor | Intent | AI 401 @ Workplace |
| translator | 7 | translator | Context | AI 301 @ Workplace |
| adversary | 7 | adversary | Intent | AI 101 @ Workplace |
| simulator | 7 | simulator | Context | AI 401 @ Workplace |
| mirror | 7 | mirror | Coherence | AI 401 @ Workplace |
| therapist | 7 | therapist | Judgment | AI 101 @ Workplace |
| muse | 8 | muse | (none) | AI 101 @ Workplace |
| miner | 8 | miner | Context (writing) | AI 401 @ Workplace |

## Grep (PRD §9): files containing each term (out of 9 pages + site.js)

All present: Oracle 5, Genie 5, Tutor 4, Mirror 4, Adversary 4, Librarian 4, Interpreter 5, Simulator 4, Scribe 4,
Executor 5, Muse 4, Miner 4, Therapist 4, Translator 4; Prompt/Context/Intent/Judgment/Coherence/Evaluation/Harness
Engineering 1 each (stack.html) and as layer names on matrix.html, stances.html and index.html; Assistive 4, Directed 3,
Autonomous 3, Continuous 4; Speed 4, Altitude 3, Depth 3, Range 3.
Banned words (revolutionary, unlock, supercharge, game-changing, cutting-edge): 0 hits.
Header and footer: byte-identical across all 9 pages except the `aria-current="page"` marker on the active link.
Contrast: superseded. The first pass missed the layer colours (blind review defect 8); see the Fix pass section for the full computed table.

## Content notes

- `[source needed]` markers: **none**. Every essay citation resolved in research/R4 (Papert, NCTM, Ellington, Hembree,
  NTSB, FAA PARC/CAST, Parasuraman & Manzey, METR 2025 and 2026), R2 (S&P Global via CIO Dive) or R1 (Anthropic 4D,
  Karpathy, Nate B. Jones).
- METR: presented as the July 2025 finding, with METR's February 2026 update ("an unreliable signal"; intervals include
  zero; no slowdown shown), per the coordinator's correction. Papert's *Mindstorms* quote anchors the essay;
  Parasuraman & Manzey 2010 backs the case for structural checks (essay and work page).
- S&P Global 42%: the Stack document says "late 2025"; R2 dates the press report to 14 March 2025. The site follows R2
  ("a 2025 survey").
- Stances: v3 states an explicit cardinal rule only for the Interpreter, Executor and Miner; the other eleven cards use the
  Matrix guardrail column and are labelled that way. Adversary, Simulator and Scribe are not in v3's
  consumption/construction table, so the filter shows them as "Not placed" instead of guessing.
- Essay length: 1,151 words (excluding citation markers and the source list).


---

# Fix pass (2026-10-21, after the blind review)

The blind review (`blind-review.md`) found 13 defects and raised 5 questions. All 13 defects are fixed. The coordinator
also asked for a cooler "instrument panel" palette, screenshots moved out of `site/`, and the README rewritten for a
`docs/` branch deploy. All of that is done too. Playwright QA was re-run on the same 36 loads, with regression checks
added for each fix.

## Defects fixed

| # | Defect | Fix | Verified by |
|---|---|---|---|
| 1 | learn.html privacy sentence was inaccurate | Now: the four thumbnails load from YouTube's image host (i.ytimg.com) when the page opens, and nothing else loads from YouTube until you click | Text check |
| 2 | Executor tagged "Hinge" | Only the Interpreter carries Hinge. Executor tag: "Consumption: the passive extreme (staged oversight is its active form)"; filter chip renamed "Hinge (Interpreter)" | Hinge filter shows ['interpreter'] |
| 3 | Home §1 mapped artefacts to axes wrongly | Reworded to credit Rieseberg's ambition types as the fourth source | Text check |
| 4 | Executor and Miner cards missing v3 guardrails | Added the structural harness guardrail (Executor) and "ore, never a citation" (Miner), verbatim from v3 | Text check |
| 5 | Diagnostic: Executor + Assistive/Directed contradicted itself | `computeResult` gives the "work you don't watch" reason only for Autonomous/Continuous; Executor with watched work gets its own 401 reason | 6 Executor x {assistive, directed} x experience combinations: contradiction = False |
| 6 | Matrix interaction invisible on phones | Below 1000px a clicked stance row gets an inline mini stack with its layer lit (hidden on desktop, where the sticky stack works). Clicking a layer scrolls to the first lit row. Muse shows "No load-bearing layer" | 390px: Translator's lit layer in the viewport = True (Context); Evaluation layer click puts rows ['librarian', 'interpreter'] in view = True; inline stack hidden at 1280 = True |
| 7 | Progress total jumped from 7 to 8 | Now reads "Question N (7 or 8 in total)" | ['Question 1 (7 or 8 in total)', 'Question 2 (7 or 8 in total)', 'Question 3 (7 or 8 in total)'] |
| 8 | `--muted` on `--layer-5` was 4.37:1 | New palette, with all seven layer colours re-derived and checked by script (table below) | Rendered-text scan: 0 failures |
| 9 | Heading levels skipped h1 to h3 | Added h2 "All fourteen stances" (stances) and "The levels" (learn) | No skips on any of the 9 pages |
| 10 | "aI runs" typo | Only an initial "You" is lowercased now | Copied text contains "aI": False |
| 11 | "you review the PR" | Now "you review the result", in the matrix autonomy table and in the diagnostic | Contains "PR": False |
| 12 | Essay footnotes out of order | Sources renumbered in order of first citation (Rieseberg is now [11]; 4D, Karpathy and Jones are [12] to [14]) | Text check |
| 13 | Compass labels about 9px on phones | Labels moved outside the ring (Structure and Ambition set vertically), and the viewBox narrowed from 504 to 388 units | At 390px the labels render at about 16px (bounding box 19px) |

## Re-run results

- **Console and page errors:** 0 across 36 loads (9 pages x 390/1280 x light/dark). **PASS.**
- **Horizontal scroll:** 0 failures. **PASS.**
- **Diagnostic:** 26,880 combinations, 0 without a stance, layer, guardrail or level. All 14 stance paths also clicked through the UI. **PASS.**
- **Grep:** all 14 stances, 7 components, 4 autonomy modes and 4 ambition types present; no banned words. **PASS.**
- **Size:** `site/` is 236,751 bytes in total, including `_qa/` (report, JSON, blind review). **PASS.** The screenshots
  (yours and the reviewer's `review-*.png`, plus the new `fix-*.jpg`) are in `/home/user/meta-strategy/site-qa-screenshots/`.
- **Rendered-text contrast** (every visible text node against its effective background, all 9 pages, 1280px, matrix
  with a selection active): light theme, 1081 nodes, 0 below 4.5:1, lowest
  4.54:1 ("What to become while doing", matrix.html). Dark theme,
  1081 nodes, 0 below 4.5:1, lowest 5.58:1. **PASS.**

## Palette and token contrast (computed by script, not by eye)

The serif display face is kept. Layer colours: l1 Prompt, l2 Context, l3 Intent, l4 Judgment, l5 Coherence,
l6 Evaluation, l7 Harness. Text tokens: ink = fg. `rule_strong` is used only for borders, so it is checked against the
3:1 non-text threshold.

| Theme | Foreground | Background | FG | BG | Ratio | Pass |
|---|---|---|---|---|---|---|
| light | ink | bg | #17222c | #f4f6f8 | 14.89 | pass |
| light | ink | surface | #17222c | #ffffff | 16.13 | pass |
| light | ink | hl | #17222c | #e3f0f2 | 13.84 | pass |
| light | ink | l1 | #17222c | #f1f5f8 | 14.72 | pass |
| light | ink | l2 | #17222c | #ebf1f5 | 14.16 | pass |
| light | ink | l3 | #17222c | #e5eef3 | 13.72 | pass |
| light | ink | l4 | #17222c | #dfeaf0 | 13.19 | pass |
| light | ink | l5 | #17222c | #d9e7ee | 12.77 | pass |
| light | ink | l6 | #17222c | #e3f0f2 | 13.84 | pass |
| light | ink | l7 | #17222c | #ffffff | 16.13 | pass |
| light | muted | bg | #5a6873 | #f4f6f8 | 5.29 | pass |
| light | muted | surface | #5a6873 | #ffffff | 5.73 | pass |
| light | muted | hl | #5a6873 | #e3f0f2 | 4.92 | pass |
| light | muted | l1 | #5a6873 | #f1f5f8 | 5.23 | pass |
| light | muted | l2 | #5a6873 | #ebf1f5 | 5.03 | pass |
| light | muted | l3 | #5a6873 | #e5eef3 | 4.88 | pass |
| light | muted | l4 | #5a6873 | #dfeaf0 | 4.69 | pass |
| light | muted | l5 | #5a6873 | #d9e7ee | 4.54 | pass |
| light | muted | l6 | #5a6873 | #e3f0f2 | 4.92 | pass |
| light | muted | l7 | #5a6873 | #ffffff | 5.73 | pass |
| light | accent | bg | #0b6b78 | #f4f6f8 | 5.72 | pass |
| light | accent | surface | #0b6b78 | #ffffff | 6.2 | pass |
| light | accent | hl | #0b6b78 | #e3f0f2 | 5.32 | pass |
| light | accent | l1 | #0b6b78 | #f1f5f8 | 5.65 | pass |
| light | accent | l2 | #0b6b78 | #ebf1f5 | 5.44 | pass |
| light | accent | l3 | #0b6b78 | #e5eef3 | 5.27 | pass |
| light | accent | l4 | #0b6b78 | #dfeaf0 | 5.07 | pass |
| light | accent | l5 | #0b6b78 | #d9e7ee | 4.9 | pass |
| light | accent | l6 | #0b6b78 | #e3f0f2 | 5.32 | pass |
| light | accent | l7 | #0b6b78 | #ffffff | 6.2 | pass |
| light | on_accent | accent | #ffffff | #0b6b78 | 6.2 | pass |
| light | rule_strong (UI border, needs 3:1) | bg | #7d8c97 | #f4f6f8 | 3.19 | pass |
| light | rule_strong (UI border, needs 3:1) | surface | #7d8c97 | #ffffff | 3.46 | pass |
| dark | ink | bg | #e6edf2 | #0f161b | 15.43 | pass |
| dark | ink | surface | #e6edf2 | #151e25 | 14.27 | pass |
| dark | ink | hl | #e6edf2 | #132b31 | 12.53 | pass |
| dark | ink | l1 | #e6edf2 | #17212a | 13.8 | pass |
| dark | ink | l2 | #e6edf2 | #1a252e | 13.18 | pass |
| dark | ink | l3 | #e6edf2 | #1d2933 | 12.53 | pass |
| dark | ink | l4 | #e6edf2 | #202d37 | 11.9 | pass |
| dark | ink | l5 | #e6edf2 | #23313c | 11.27 | pass |
| dark | ink | l6 | #e6edf2 | #132b31 | 12.53 | pass |
| dark | ink | l7 | #e6edf2 | #151e25 | 14.27 | pass |
| dark | muted | bg | #9aaab5 | #0f161b | 7.64 | pass |
| dark | muted | surface | #9aaab5 | #151e25 | 7.07 | pass |
| dark | muted | hl | #9aaab5 | #132b31 | 6.2 | pass |
| dark | muted | l1 | #9aaab5 | #17212a | 6.83 | pass |
| dark | muted | l2 | #9aaab5 | #1a252e | 6.52 | pass |
| dark | muted | l3 | #9aaab5 | #1d2933 | 6.2 | pass |
| dark | muted | l4 | #9aaab5 | #202d37 | 5.89 | pass |
| dark | muted | l5 | #9aaab5 | #23313c | 5.58 | pass |
| dark | muted | l6 | #9aaab5 | #132b31 | 6.2 | pass |
| dark | muted | l7 | #9aaab5 | #151e25 | 7.07 | pass |
| dark | accent | bg | #5fc2cf | #0f161b | 8.78 | pass |
| dark | accent | surface | #5fc2cf | #151e25 | 8.12 | pass |
| dark | accent | hl | #5fc2cf | #132b31 | 7.13 | pass |
| dark | accent | l1 | #5fc2cf | #17212a | 7.85 | pass |
| dark | accent | l2 | #5fc2cf | #1a252e | 7.5 | pass |
| dark | accent | l3 | #5fc2cf | #1d2933 | 7.13 | pass |
| dark | accent | l4 | #5fc2cf | #202d37 | 6.77 | pass |
| dark | accent | l5 | #5fc2cf | #23313c | 6.41 | pass |
| dark | accent | l6 | #5fc2cf | #132b31 | 7.13 | pass |
| dark | accent | l7 | #5fc2cf | #151e25 | 8.12 | pass |
| dark | on_accent | accent | #0f161b | #5fc2cf | 8.78 | pass |
| dark | rule_strong (UI border, needs 3:1) | bg | #5d6d78 | #0f161b | 3.41 | pass |
| dark | rule_strong (UI border, needs 3:1) | surface | #5d6d78 | #151e25 | 3.15 | pass |

---

# Open questions for Henrique (from the blind review)

1. **METR perception gap.** The essay says the gap between feeling and fact "is the part that survives". METR's Feb 2026 update reports no new perception data. Keep it as opinion, or soften it to "the 2025 result showed a gap"?
2. **Diagnostic recovery question.** It offers only Prompt, Context, Intent, Evaluation or "did it myself". Stances that lean on Judgment, Coherence or Harness (Oracle, Therapist, Mirror, Executor) can never get the "right layer, good instinct" note. Add Judgment/Coherence/Harness options?
3. **Diagnostic experience question.** Only "new" changes the output (it forces AI 101). Should the other answers shift the recommended level?
4. **QA artefacts in the repo.** Resolved for now by moving the screenshots to `site-qa-screenshots/`. Decide whether that folder, and `docs/_qa/`, should be committed at all.
5. **Matrix row order.** MODE_FLUENCY_MATRIX.md leads with Oracle, Genie, Interpreter, Executor and Miner; the site uses the v3 pantheon order. Which order is canonical?
