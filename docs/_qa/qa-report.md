# QA report: Mode Fluency site, Direction C ("The Field")

Run: 2026-10-22, headless Chromium (`/opt/pw-browsers/chromium`, build 1194) driven by the global Playwright 1.56.1 (`/opt/node22/lib/node_modules`); no `playwright install`. Every page opened from `file://`. Harness: `qa.js` + `finalize.py` in the session scratchpad (not shipped). Screenshots: `/home/user/meta-strategy/site-c-screenshots/`.

**Result: 123 of 123 binary checks passed.**

## PRD §4 success metrics

| # | Metric | Result | Evidence |
|---|---|---|---|
| 1 | 9 pages open from file:// in headless Chromium at 390 and 1280, light and dark, reduced motion on and off: 0 console errors, 0 failed requests, no horizontal scroll | **PASS** | 72 loads; console/page errors 0; failed requests 0; scrollWidth > viewport 0 (checked at the top and after scrolling to the bottom) |
| 2 | Lowest text contrast ≥ 4.5:1 in both themes (programmatic scan of all text nodes on all pages) | **PASS** | light: 4,437 text elements, lowest 4.98:1; dark: 4,437, lowest 6.07:1 |
| 3 | All 14 stances, 7 components, 4 autonomy modes, 4 ambition types present; 5 stances word-for-word | **PASS** | all present; Tutor, Mirror, Adversary, Librarian, Simulator: Expectation and "Why it stays hidden" match src_archetypes_v3.md exactly (after removing Markdown emphasis) |
| 4 | Diagnostic: all answer combinations return a result; 4 paths driven through the UI | **PASS** | 26,880 of 26,880 (14 stance paths × 1,920 answer combinations); 4 UI paths (3 by clicks incl. one Back, 1 keyboard only) |
| 5 | Every page readable with JavaScript disabled | **PASS** | all 9 pages: main text present, 0 text elements hidden outside the JS-only instruments |
| 6 | Total site ≤ 900 KB excluding fonts; no external JS; fonts only from Google Fonts | **PASS** | 329,535 bytes deployable (360,333 with _qa/); external scripts 0; hosts requested: fonts.googleapis.com, fonts.gstatic.com, i.ytimg.com |
| 7 | No banned words; no invented stats, testimonials, logos, prices beyond the two given | **PASS** | banned-word hits 0; prices found: $1,200, $3,500; no testimonials, logos or client names; stance-field counters are labelled as on-screen simulation counts (about.html, deviation 3) |
| 8 | "calculator" not in the hero of index.html; "machine" is; essay title unchanged | **PASS** | hero has "machine", not "calculator"; essay h1 "The Calculator Problem" |
| 9 | Wordmark "Mode Fluency" set once in CSS --brand and read by JS | **PASS** | 1 definition (assets/field.css); field.js and diagnose.js read it; titles built from it; no literal wordmark in any page body (only the <title>/meta no-JS fallbacks) |

## 1. Page loads (72)

| Page | 390 light | 390 dark | 1280 light | 1280 dark |
|---|---|---|---|---|
| index.html | ok (2 runs, sw 390) | ok (2 runs, sw 390) | ok (2 runs, sw 1280) | ok (2 runs, sw 1280) |
| calculator-problem.html | ok (2 runs, sw 390) | ok (2 runs, sw 390) | ok (2 runs, sw 1280) | ok (2 runs, sw 1280) |
| stances.html | ok (2 runs, sw 390) | ok (2 runs, sw 390) | ok (2 runs, sw 1280) | ok (2 runs, sw 1280) |
| stack.html | ok (2 runs, sw 390) | ok (2 runs, sw 390) | ok (2 runs, sw 1280) | ok (2 runs, sw 1280) |
| matrix.html | ok (2 runs, sw 390) | ok (2 runs, sw 390) | ok (2 runs, sw 1280) | ok (2 runs, sw 1280) |
| diagnose.html | ok (2 runs, sw 390) | ok (2 runs, sw 390) | ok (2 runs, sw 1280) | ok (2 runs, sw 1280) |
| learn.html | ok (2 runs, sw 390) | ok (2 runs, sw 390) | ok (2 runs, sw 1280) | ok (2 runs, sw 1280) |
| work.html | ok (2 runs, sw 390) | ok (2 runs, sw 390) | ok (2 runs, sw 1280) | ok (2 runs, sw 1280) |
| about.html | ok (2 runs, sw 390) | ok (2 runs, sw 390) | ok (2 runs, sw 1280) | ok (2 runs, sw 1280) |

Each cell is two runs (reduced motion on and off). "sw" is the largest `scrollWidth` seen. External requests were only to: fonts.googleapis.com, fonts.gstatic.com, i.ytimg.com (fonts, and the four learn.html thumbnails once scrolled into view).

## 2. Contrast (every visible text element, colour composited over its effective background)

Scanned at 390 and 1280 with motion off, on all 9 pages, plus interactive states: stack with a weak layer and Evaluation off, the diagnostic report, a matrix selection and a stances filter. Brand text drawn by CSS `::before` is included.

**Light:** 4,437 elements, below 4.5:1: 0. Lowest five:

| Ratio | Text | Element | Page | Width |
|---|---|---|---|---|
| 4.98 | L3 | span.sd-lnum | stack.html | 1280 |
| 4.98 | L4 | span.sd-lnum | stack.html | 1280 |
| 4.98 | L5 | span.sd-lnum | stack.html | 1280 |
| 4.98 | L3 | span.sd-lnum | stack.html | 390 |
| 4.98 | L4 | span.sd-lnum | stack.html | 390 |

**Dark:** 4,437 elements, below 4.5:1: 0. Lowest five:

| Ratio | Text | Element | Page | Width |
|---|---|---|---|---|
| 6.07 | stance | span.lv | index.html | 1280 |
| 6.07 | expects | span.lv | index.html | 1280 |
| 6.07 | load | span.lv | index.html | 1280 |
| 6.07 | field | span.lv | index.html | 1280 |
| 6.07 | fail | span.lv | index.html | 1280 |

Caveat: text over the hero canvas is measured against the page background; particles behind the hero copy are drawn at 13% alpha (a quiet zone).

## 3. Content

- 14 stances on stances.html, 7 components on stack.html, 4 autonomy modes and 4 ambition types on matrix.html: all present.
- Word-for-word spot-check against `research/src_archetypes_v3.md` (Expectation and "Why it stays hidden"):
  - Tutor: Expectation identical, Why it stays hidden identical
  - Mirror: Expectation identical, Why it stays hidden identical
  - Adversary: Expectation identical, Why it stays hidden identical
  - Librarian: Expectation identical, Why it stays hidden identical
  - Simulator: Expectation identical, Why it stays hidden identical
- Stance cards, essay, Stack components, matrix rows, autonomy table, ambition text, Article 4 text and lineage are carried over from the reviewed prototype (site/), whose fixes are kept: Hinge tag only on the Interpreter; Executor and Miner guardrails from v3; the "Not placed" handling; the learn.html privacy sentence; essay footnotes in order of first citation; METR 2026 caveat and the Papert quote; S&P figure dated 14 March 2025.
- `[source needed]` markers: 0 (no new facts were introduced).

## 4. Diagnostic

- Exhaustive: 26,880 of 26,880 combinations return stance, layer, guardrail and level, with no `undefined` in the copied text; 14 stances and levels 101, 201, 301, 401 reachable. The question logic, data and scoring are copied unchanged from the prototype.

| UI path | Result | Layer | Watch next | Answers | Copy |
|---|---|---|---|---|---|
| P1 Oracle, new, assistive (clicks) | oracle | Judgment | AI 101 | 7 | copied. ("Mode Fluency self-diagnostic") |
| P2 Executor, agents, continuous (clicks) | executor | Harness + Judgment | AI 401 | 7 | copied. ("Mode Fluency self-diagnostic") |
| P3 Miner via Ideas, 8 questions (clicks, with one Back) | miner | Context (writing) | AI 301 | 8 | copied. ("Mode Fluency self-diagnostic") |
| P4 Interpreter (keyboard only: number keys) | interpreter | Evaluation | AI 401 | 7 | copied. ("Mode Fluency self-diagnostic") |

Progress reads "question N (7 or 8 in total)" throughout; focus moves to each new question and to the report heading; Back restores the earlier choice. At 390 the report has no horizontal scroll.

## 5. Interactions

- **Compass (home, 1280 dark):** pointer swept 0→100°: needle 099, axis STRUCTURE, §1 row "Structure" active
- **Stance selector (home):** arrow keys cycled all 14 behaviours (Oracle, Genie, Tutor, Executor, Miner, Mirror, Muse, Adversary, Librarian, Interpreter, Simulator, Scribe, Translator, Therapist); 14 distinct HUD readouts; pointer on Interpreter → "mode=interpreter · evidence trail: traced 30 · untraced 6 (rumours)"
- **Home circuit:** hover Executor → 2 hot wires, layers Judgment, Harness
- **Stances filters:** Hinge → ['interpreter']; Not placed → ['adversary', 'simulator', 'scribe']; Harness → ['executor']; empty combination shows the message ("Showing 0 of 14 stances (layer: Harness; Not placed)."); Hinge tag on: ['interpreter']
- **Lazy card fields:** scrolled to oracle: 2 of 14 running ; scrolled to interpreter: 2 of 14 running ; scrolled to translator: 2 of 14 running
- **Matrix:** click Librarian → path "Librarian —load→ Evaluation", log printed the guardrail; click Context → stances ['Miner', 'Simulator', 'Translator']; keyboard Down, Down, Right from Oracle → focus on "Evaluationhow to know"
- **Stack:** Intent + Context weak → "binding constraint: Context (the lowest weak layer)"; states ['prompt:ok', 'context:weak', 'intent:weak', 'judgment:starved', 'coherence:starved']; 3 spine segments cut; Evaluation off → "evaluation weak: the layers still function; you just cannot see whether they are functioning well"
- **Learn altimeter:** 101 → 301 → 601
- **Theme toggle:** light → dark → auto
- **Hero field:** 1,600 agents at 1280, 60 fps in the QA browser after interaction (software-rendered headless; indicative only)

## 6. JavaScript disabled

| Page | Main text (chars) | Hidden text outside JS-only instruments | JS-only instruments hidden |
|---|---|---|---|
| index.html | 4,503 | 0 | compass-col, stance-picker, stance-stage, js-only, circuit |
| calculator-problem.html | 11,522 | 0 | none |
| stances.html | 13,965 | 0 | js-only, filters, status, sc-stage, sys |
| stack.html | 10,430 | 0 | js-only, sd-bar, sys |
| matrix.html | 6,684 | 0 | section |
| diagnose.html | 3,578 | 0 | console |
| learn.html | 2,815 | 0 | altimeter |
| work.html | 3,404 | 0 | none |
| about.html | 7,159 | 0 | none |

The wordmark still renders without JS (CSS `::before`, value "Mode Fluency"). The diagnostic page shows its questions on paper; the matrix page shows the full table.

## 7. Size, dependencies, words

- Deployable: 329,535 bytes in 15 files (HTML, `assets/field.css`, `assets/field.js`, `assets/diagnose.js`, `assets/favicon.svg`, README, .nojekyll); with `_qa/`: 360,333 bytes. Fonts excluded (Google Fonts). Budget 900,000.
- External scripts: 0. Inline script: one line per page (adds the `js` class and applies a saved theme before paint).
- Banned words (revolutionary, unlock, supercharge, game-changing, seamless, cutting-edge, empower): 0 hits across HTML, CSS, JS and README.
- Prices: only "from $3,500" and "from $1,200". No testimonials, logos or client names.

## 8. Screenshots

`<page>-<width>-<theme>[-rm]-top.jpg` for every page, width and theme (motion on), plus `-mid` and `-bottom` in light; reduced-motion tops at 390; `nojs-<page>-1280.jpg`; `diagnose-P1..P4-390.jpg` (full page); `interact-*.jpg` (compass, Interpreter field, home circuit, stance cards, matrix, stack binding constraint, essay notes); `mode-*-a/b.png` (the seven new stance behaviours before and with the pointer).

## 9. Not verified

Safari and Firefox rendering; real screen readers (only structure, focus order and live regions were checked); real-device frame rates; the live behaviour of the Clipboard API outside Chromium; GitHub Pages and Cloudflare Pages deploys (instructions written, not executed). The repository's Agent Audit Protocol has not yet been run on the site itself.

## Fix pass (after the blind review, `_qa/blind-review.md`)

The reviewer found 0 high, 4 medium and 14 low issues, and nothing invented. All four medium issues are fixed, plus 12 of the 14 low ones. Each fix was checked by a targeted script (`fixqa.js`, scratchpad), and then the full QA above was re-run on the fixed site: **123 of 123 checks pass** (72 loads: errors 0, failed requests 0, overflow 0; contrast lowest 4.98:1 light, 6.07:1 dark; diagnostic 26,880 of 26,880). The footer build log now shows these numbers (329,535 bytes deployable).

| # | Finding | Fix | Verified |
|---|---|---|---|
| B1 (medium) | The circuit assembly overwrote a stance the user picked during the reveal | The first user pick (click, hover, focus or key) sets a user-intent flag and cancels the assembly timers. The reveal then ends on whatever is selected | matrix.html: Enter on Librarian 300 ms after scrolling in; 3.5 s later the pressed stance is ['Librarian'] and the log reads "stance Librarian  expects Sy…". index.html: ['Librarian'] |
| A1 (medium) | The compass readout was a live region that never stopped updating | The readout is now `aria-hidden`. A separate polite announcer speaks only when the axis changes | 0 live-region mutations in 3 s idle (was 45). 5 during a 1.2 s pointer sweep across axes (one per axis change) |
| P1 (medium) | The circuit pulse loop never paused | Pulses run only while the circuit is on screen and the tab is visible, and only for three cycles after an interaction or while it is hovered or focused. After that the lit wires stay lit and the loop stops. stack.html pulses also pause when the tab is hidden | rAF calls in 2 s: index at footer 0; index circuit in view and idle 0; matrix at footer 0; matrix idle 0; index with `document.hidden` 0 |
| D1 (medium) | The phone nav hid five links; "Work with me" was far down the page | Added a compact "Work with me" button in the header row below 1100 px. The nav strip fades at whichever edge has more links. Without JS the nav wraps instead | At 390: button at top 6px, right edge 307px; nav class "site-nav fade-r"; header 103px; scrollWidth 390. Screenshot: `fix-phone-header-390.png` |
| F1 (low) | Failure lines taken from the Matrix were not credited | The nine cards where v3 has no failure mode now label it "Failure mode (from the Matrix)", and the source note names them | Text check |
| F2 (low) | The consumption/construction filter did not match the v3 table | Interpreter and Executor are now in both columns, with tags for their two forms. Hinge stays on the Interpreter only | Consumption → ['oracle', 'genie', 'librarian', 'interpreter', 'executor', 'muse', 'therapist']; Construction → ['tutor', 'mirror', 'interpreter', 'executor', 'miner', 'translator']; Hinge → ['interpreter']; Not placed → ['adversary', 'simulator', 'scribe'] |
| F3 (low) | "a thousand tokens" | Now "hundreds of tokens" | Text check |
| F4/A3 (low) | Dead circuit buttons without JS; deviation item overstated | The home circuit is hidden without JS, and a link to the matrix table is shown instead. The deviation report is reworded | No-JS run: 0 text hidden outside JS-only instruments |
| A2 (low) | 21 tab stops per circuit | Roving tabindex: one tab stop per column, arrows move within a column, Left/Right cross the wire | 2 tab stops per circuit |
| B2 (low) | The progress counter never narrowed; the "last time" note was repeated by the live region | The count shows "of N" as soon as the branch is known. The last-result note moved out of the live region | question 1 (7 or 8 in total) → question 2 (7 or 8 in total) → question 3 of 8 → question 4 of 8 … |
| P2 (low) | The essay strip never idled | The strip stops 1.5 s after the last scroll or pointer move and wakes on the next one | rAF calls: 60 in 1 s while scrolling, 0 in 2 s idle |
| C1 (low) | The calculator metaphor was unexplained on learn.html | The lede now reads "How to use the machine, for people who can already do the work by hand." | Text check |
| C2 (low) | The Stack lede promises a user interaction model the page never shows | §3 is now "The user interaction model", with the model's opening and entry point from the Stack document, then the diagnostic loop | Text check (wording from src_aies_stack.txt) |
| C3 (low) | The home page never says "video" | The learner path now says "video series (recorded talks with slides)", and the header "Work with me" is reachable on phones | Text check |
| D2 (low) | Evaluation was drawn twice | The second box is now a plain caption under the diagram pointing to the dashed rail, so the diagram shows seven components | Screenshot |
| D3 (low) | The circuit looked tangled at rest | Wires are thinner, and non-selected wires dim further (opacity 0.22) while one is selected | Screenshot |
| X1 (low) | Review files would be published | The README says to delete `_qa/blind-review.md` (and STATUS.md) before deploy unless they should be public | README |

Not fixed: (1) the abridged v3 texts on the Oracle, Genie, Interpreter, Executor and Miner cards. They are still cut without ellipses, and restoring them in full is an editorial call for Henrique. The deviation report says so. (2) "The Calculator Problem" stays as the first nav item above the hero, because it is the essay's unchanged title.

## 10. Deviations from the PRD

Listed in full on about.html ("Deviation report"). In short: hero button renamed "Read the essay" to keep "calculator" out of the hero; matrix pages follow MODE_FLUENCY_MATRIX.md row order while stances.html follows v3 order (open question); the seven new stance fields are illustrations and their counters are on-screen simulation counts; the binding-constraint chain covers the five cognitive layers, with separate switches for Evaluation and Harness; the essay strip is pinned under the header; the privacy sentence says thumbnails load "when they scroll into view" (they are lazy); instruments are hidden without JS and their content is given as text; diagnostic logic unchanged including its two open questions; "engineer" dropped from the about text as unsourced.
