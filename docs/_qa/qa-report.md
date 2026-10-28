# Site QA report

Run: 2026-10-28, `strategy/qa/site_qa.py` on `C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering\docs`. Headless Chromium (Playwright for Python), pages from file://. Network: off (http/https requests answered locally, see section 1). Runtime 195 s.

**Result: PASS: 97 of 97 checks passed.**

`--write-buildlog` rewrote: _qa/buildlog.json, about.html, calculator-problem.html, diagnose.html, index.html, learn.html, matrix.html, stack.html, stances.html, work.html.

## Summary

| Check | Result | Evidence |
|---|---|---|
| Loads (72) | PASS | console errors 0; failed requests 0; loads with horizontal overflow 0 |
| JavaScript off (18) | PASS | readable 18 of 18 |
| Contrast light | PASS | 4,435 text elements; below 4.5:1: 0; lowest 4.98:1 (`span.sd-lnum` "L3", stack.html 390); not parsed 0; exempt (disabled) 4 |
| Contrast dark | PASS | 4,435 text elements; below 4.5:1: 0; lowest 6.07:1 (`caption` "From site-c/_qa/qa-report.md", about.html 390); not parsed 0; exempt (disabled) 4 |
| Banned words | PASS | 0 hits |
| Diagnostic | PASS | 26,880 of 26,880 return a result; derived from source 26,880; derived from UI 26,880 |
| Footer build log | PASS | 0 mismatches; footers identical on all pages: yes |

## 0. Inventory

| Item | Value |
|---|---|
| Pages | 9 (about.html, calculator-problem.html, diagnose.html, index.html, learn.html, matrix.html, stack.html, stances.html, work.html) |
| Deployable files (excl. `_qa/`, STATUS.md) | 16 |
| Deployable bytes | 330,484 |
| External scripts | 0 |

## 1. Loads

Each row: one fresh browser context. Counts: console errors (incl. uncaught page errors), failed requests (network failures and HTTP >= 400), overflow (1 if `scrollWidth` > viewport width at the top, middle or bottom). `sw` = largest scrollWidth seen.

| Page | Width | Theme | Motion | Console errors | Failed requests | Overflow | sw |
|---|---|---|---|---|---|---|---|
| about.html | 390 | light | on | 0 | 0 | 0 | 390 |
| about.html | 390 | light | off (reduced) | 0 | 0 | 0 | 390 |
| about.html | 390 | dark | on | 0 | 0 | 0 | 390 |
| about.html | 390 | dark | off (reduced) | 0 | 0 | 0 | 390 |
| about.html | 1280 | light | on | 0 | 0 | 0 | 1280 |
| about.html | 1280 | light | off (reduced) | 0 | 0 | 0 | 1280 |
| about.html | 1280 | dark | on | 0 | 0 | 0 | 1280 |
| about.html | 1280 | dark | off (reduced) | 0 | 0 | 0 | 1280 |
| calculator-problem.html | 390 | light | on | 0 | 0 | 0 | 390 |
| calculator-problem.html | 390 | light | off (reduced) | 0 | 0 | 0 | 390 |
| calculator-problem.html | 390 | dark | on | 0 | 0 | 0 | 390 |
| calculator-problem.html | 390 | dark | off (reduced) | 0 | 0 | 0 | 390 |
| calculator-problem.html | 1280 | light | on | 0 | 0 | 0 | 1280 |
| calculator-problem.html | 1280 | light | off (reduced) | 0 | 0 | 0 | 1280 |
| calculator-problem.html | 1280 | dark | on | 0 | 0 | 0 | 1280 |
| calculator-problem.html | 1280 | dark | off (reduced) | 0 | 0 | 0 | 1280 |
| diagnose.html | 390 | light | on | 0 | 0 | 0 | 390 |
| diagnose.html | 390 | light | off (reduced) | 0 | 0 | 0 | 390 |
| diagnose.html | 390 | dark | on | 0 | 0 | 0 | 390 |
| diagnose.html | 390 | dark | off (reduced) | 0 | 0 | 0 | 390 |
| diagnose.html | 1280 | light | on | 0 | 0 | 0 | 1280 |
| diagnose.html | 1280 | light | off (reduced) | 0 | 0 | 0 | 1280 |
| diagnose.html | 1280 | dark | on | 0 | 0 | 0 | 1280 |
| diagnose.html | 1280 | dark | off (reduced) | 0 | 0 | 0 | 1280 |
| index.html | 390 | light | on | 0 | 0 | 0 | 390 |
| index.html | 390 | light | off (reduced) | 0 | 0 | 0 | 390 |
| index.html | 390 | dark | on | 0 | 0 | 0 | 390 |
| index.html | 390 | dark | off (reduced) | 0 | 0 | 0 | 390 |
| index.html | 1280 | light | on | 0 | 0 | 0 | 1280 |
| index.html | 1280 | light | off (reduced) | 0 | 0 | 0 | 1280 |
| index.html | 1280 | dark | on | 0 | 0 | 0 | 1280 |
| index.html | 1280 | dark | off (reduced) | 0 | 0 | 0 | 1280 |
| learn.html | 390 | light | on | 0 | 0 | 0 | 390 |
| learn.html | 390 | light | off (reduced) | 0 | 0 | 0 | 390 |
| learn.html | 390 | dark | on | 0 | 0 | 0 | 390 |
| learn.html | 390 | dark | off (reduced) | 0 | 0 | 0 | 390 |
| learn.html | 1280 | light | on | 0 | 0 | 0 | 1280 |
| learn.html | 1280 | light | off (reduced) | 0 | 0 | 0 | 1280 |
| learn.html | 1280 | dark | on | 0 | 0 | 0 | 1280 |
| learn.html | 1280 | dark | off (reduced) | 0 | 0 | 0 | 1280 |
| matrix.html | 390 | light | on | 0 | 0 | 0 | 390 |
| matrix.html | 390 | light | off (reduced) | 0 | 0 | 0 | 390 |
| matrix.html | 390 | dark | on | 0 | 0 | 0 | 390 |
| matrix.html | 390 | dark | off (reduced) | 0 | 0 | 0 | 390 |
| matrix.html | 1280 | light | on | 0 | 0 | 0 | 1280 |
| matrix.html | 1280 | light | off (reduced) | 0 | 0 | 0 | 1280 |
| matrix.html | 1280 | dark | on | 0 | 0 | 0 | 1280 |
| matrix.html | 1280 | dark | off (reduced) | 0 | 0 | 0 | 1280 |
| stack.html | 390 | light | on | 0 | 0 | 0 | 390 |
| stack.html | 390 | light | off (reduced) | 0 | 0 | 0 | 390 |
| stack.html | 390 | dark | on | 0 | 0 | 0 | 390 |
| stack.html | 390 | dark | off (reduced) | 0 | 0 | 0 | 390 |
| stack.html | 1280 | light | on | 0 | 0 | 0 | 1280 |
| stack.html | 1280 | light | off (reduced) | 0 | 0 | 0 | 1280 |
| stack.html | 1280 | dark | on | 0 | 0 | 0 | 1280 |
| stack.html | 1280 | dark | off (reduced) | 0 | 0 | 0 | 1280 |
| stances.html | 390 | light | on | 0 | 0 | 0 | 390 |
| stances.html | 390 | light | off (reduced) | 0 | 0 | 0 | 390 |
| stances.html | 390 | dark | on | 0 | 0 | 0 | 390 |
| stances.html | 390 | dark | off (reduced) | 0 | 0 | 0 | 390 |
| stances.html | 1280 | light | on | 0 | 0 | 0 | 1280 |
| stances.html | 1280 | light | off (reduced) | 0 | 0 | 0 | 1280 |
| stances.html | 1280 | dark | on | 0 | 0 | 0 | 1280 |
| stances.html | 1280 | dark | off (reduced) | 0 | 0 | 0 | 1280 |
| work.html | 390 | light | on | 0 | 0 | 0 | 390 |
| work.html | 390 | light | off (reduced) | 0 | 0 | 0 | 390 |
| work.html | 390 | dark | on | 0 | 0 | 0 | 390 |
| work.html | 390 | dark | off (reduced) | 0 | 0 | 0 | 390 |
| work.html | 1280 | light | on | 0 | 0 | 0 | 1280 |
| work.html | 1280 | light | off (reduced) | 0 | 0 | 0 | 1280 |
| work.html | 1280 | dark | on | 0 | 0 | 0 | 1280 |
| work.html | 1280 | dark | off (reduced) | 0 | 0 | 0 | 1280 |

Requests answered locally (no network): fonts.googleapis.com (102), i.ytimg.com (48).

## 2. JavaScript off

"Readable" = main text >= 400 characters, visible h1, no horizontal overflow, no failed requests, and no text that is visible with JS on but hidden without JS outside the JS-only instruments.

| Page | Width | Main text (chars) | h1 | sw | Lost text | JS-only instruments hidden | Readable |
|---|---|---|---|---|---|---|---|
| about.html | 390 | 7,310 | yes | 390 | 0 | button.theme-toggle.js-only | yes |
| about.html | 1280 | 7,310 | yes | 1280 | 0 | button.theme-toggle.js-only | yes |
| calculator-problem.html | 390 | 11,522 | yes | 390 | 0 | button.theme-toggle.js-only | yes |
| calculator-problem.html | 1280 | 11,522 | yes | 1280 | 0 | button.theme-toggle.js-only | yes |
| diagnose.html | 390 | 3,578 | yes | 390 | 0 | button.theme-toggle.js-only, div#console.console.js-only | yes |
| diagnose.html | 1280 | 3,578 | yes | 1280 | 0 | button.theme-toggle.js-only, div#console.console.js-only | yes |
| index.html | 390 | 4,503 | yes | 390 | 0 | button.theme-toggle.js-only, div#circuit.circuit.js-only, div.compass-col.js-only, div.stance-picker.js-only, div.stance-stage.js-only, span.js-only | yes |
| index.html | 1280 | 4,503 | yes | 1280 | 0 | button.theme-toggle.js-only, div#circuit.circuit.js-only, div.compass-col.js-only, div.stance-picker.js-only, div.stance-stage.js-only, span.js-only | yes |
| learn.html | 390 | 2,815 | yes | 390 | 0 | button.theme-toggle.js-only | yes |
| learn.html | 1280 | 2,815 | yes | 1280 | 0 | button.theme-toggle.js-only, div#altimeter.altimeter.js-only | yes |
| matrix.html | 390 | 6,684 | yes | 390 | 0 | button.theme-toggle.js-only, section.section.matrix | yes |
| matrix.html | 1280 | 6,684 | yes | 1280 | 0 | button.theme-toggle.js-only, section.section.matrix | yes |
| stack.html | 390 | 10,417 | yes | 390 | 0 | button.theme-toggle.js-only, div.sd-bar.js-only, p#sd-readout.sys.sd-readout, span.js-only | yes |
| stack.html | 1280 | 10,417 | yes | 1280 | 0 | button.theme-toggle.js-only, div.sd-bar.js-only, p#sd-readout.sys.sd-readout, span.js-only | yes |
| stances.html | 390 | 15,764 | yes | 390 | 0 | button.theme-toggle.js-only, div.filters.js-only, p#stance-status.status.js-only, p.js-only, p.sys.sc-field | yes |
| stances.html | 1280 | 15,764 | yes | 1280 | 0 | button.theme-toggle.js-only, div.filters.js-only, p#stance-status.status.js-only, p.js-only, p.sys.sc-field | yes |
| work.html | 390 | 3,390 | yes | 390 | 0 | button.theme-toggle.js-only | yes |
| work.html | 1280 | 3,390 | yes | 1280 | 0 | button.theme-toggle.js-only | yes |

## 3. Contrast

Every visible text element, reduced-motion loads at 390 and 1280, plus interactive states. Ratios rounded down to two decimals.

| Theme | Elements | Below 4.5 | Lowest | Element | Text | Page | Width | State |
|---|---|---|---|---|---|---|---|---|
| light | 4,435 | 0 | 4.98 | `span.sd-lnum` | L3 | stack.html | 390 | Context and Evaluation marked weak |
| dark | 4,435 | 0 | 6.07 | `caption` | From site-c/_qa/qa-report.md | about.html | 390 | load |

**Light: lowest ten**

| Ratio | Text | Element | fg | bg | Page | Width | State |
|---|---|---|---|---|---|---|---|
| 4.98 | L3 | `span.sd-lnum` | 143,74,0 | 219,224,216 | stack.html | 390 | Context and Evaluation marked weak |
| 4.98 | L4 | `span.sd-lnum` | 143,74,0 | 219,224,216 | stack.html | 390 | Context and Evaluation marked weak |
| 4.98 | L5 | `span.sd-lnum` | 143,74,0 | 219,224,216 | stack.html | 390 | Context and Evaluation marked weak |
| 4.98 | L3 | `span.sd-lnum` | 143,74,0 | 219,224,216 | stack.html | 1280 | Context and Evaluation marked weak |
| 4.98 | L4 | `span.sd-lnum` | 143,74,0 | 219,224,216 | stack.html | 1280 | Context and Evaluation marked weak |
| 4.98 | L5 | `span.sd-lnum` | 143,74,0 | 219,224,216 | stack.html | 1280 | Context and Evaluation marked weak |
| 5.23 | Pointer or touch: you are the warm point. Disturb  | `p#stage-hint.sys.stage-hint` | 79,92,85 | 219,224,216 | index.html | 390 | load |
| 5.23 | Pointer or touch: you are the warm point. Disturb  | `p#stage-hint.sys.stage-hint` | 79,92,85 | 219,224,216 | index.html | 1280 | load |
| 5.23 | Intent | `h3` | 79,92,85 | 219,224,216 | stack.html | 390 | Context and Evaluation marked weak |
| 5.23 | What to want while doing | `p.sd-q` | 79,92,85 | 219,224,216 | stack.html | 390 | Context and Evaluation marked weak |

Exempt as disabled controls (4): button#dg-back.cmd.cmd-ghost (6.15, diagnose.html); span.cmd-glyph (6.15, diagnose.html)

**Dark: lowest ten**

| Ratio | Text | Element | fg | bg | Page | Width | State |
|---|---|---|---|---|---|---|---|
| 6.07 | From site-c/_qa/qa-report.md | `caption` | 148,161,151 | 24,34,30 | about.html | 390 | load |
| 6.07 | From site-c/_qa/qa-report.md | `caption` | 148,161,151 | 24,34,30 | about.html | 1280 | load |
| 6.07 | session: diagnose | `h2#console-title.sys` | 148,161,151 | 24,34,30 | diagnose.html | 390 | load |
| 6.07 | Pick the closest. You can go back. | `p#dg-hint.q-hint` | 148,161,151 | 24,34,30 | diagnose.html | 390 | load |
| 6.07 | keys: number to answer · backspace to go back | `span.kbd-hint` | 148,161,151 | 24,34,30 | diagnose.html | 390 | load |
| 6.07 | session: diagnose | `h2#console-title.sys` | 148,161,151 | 24,34,30 | diagnose.html | 390 | diagnostic report |
| 6.07 | what you expect | `dt` | 148,161,151 | 24,34,30 | diagnose.html | 390 | diagnostic report |
| 6.07 | load-bearing layer | `dt` | 148,161,151 | 24,34,30 | diagnose.html | 390 | diagnostic report |
| 6.07 | characteristic failure | `dt` | 148,161,151 | 24,34,30 | diagnose.html | 390 | diagnostic report |
| 6.07 | the guardrail to adopt | `dt` | 148,161,151 | 24,34,30 | diagnose.html | 390 | diagnostic report |

Exempt as disabled controls (4): button#dg-back.cmd.cmd-ghost (6.07, diagnose.html); span.cmd-glyph (6.07, diagnose.html)

Per scan:

| Page | Width | Theme | State | Elements | Lowest |
|---|---|---|---|---|---|
| about.html | 390 | light | load | 123 | 5.43 |
| about.html | 390 | dark | load | 123 | 6.07 |
| about.html | 1280 | light | load | 123 | 5.43 |
| about.html | 1280 | dark | load | 123 | 6.07 |
| calculator-problem.html | 390 | light | load | 171 | 5.43 |
| calculator-problem.html | 390 | dark | load | 171 | 6.82 |
| calculator-problem.html | 1280 | light | load | 171 | 5.43 |
| calculator-problem.html | 1280 | dark | load | 171 | 6.82 |
| diagnose.html | 390 | light | load | 47 | 5.43 |
| diagnose.html | 390 | light | diagnostic report | 85 | 5.43 |
| diagnose.html | 390 | dark | load | 47 | 6.07 |
| diagnose.html | 390 | dark | diagnostic report | 85 | 6.07 |
| diagnose.html | 1280 | light | load | 47 | 5.43 |
| diagnose.html | 1280 | light | diagnostic report | 85 | 5.43 |
| diagnose.html | 1280 | dark | load | 47 | 6.07 |
| diagnose.html | 1280 | dark | diagnostic report | 85 | 6.07 |
| index.html | 390 | light | load | 188 | 5.23 |
| index.html | 390 | dark | load | 188 | 6.07 |
| index.html | 1280 | light | load | 195 | 5.23 |
| index.html | 1280 | dark | load | 195 | 6.07 |
| learn.html | 390 | light | load | 94 | 5.43 |
| learn.html | 390 | dark | load | 94 | 6.82 |
| learn.html | 1280 | light | load | 102 | 5.43 |
| learn.html | 1280 | dark | load | 102 | 6.82 |
| matrix.html | 390 | light | load | 231 | 5.43 |
| matrix.html | 390 | light | Librarian selected | 231 | 5.43 |
| matrix.html | 390 | dark | load | 231 | 6.07 |
| matrix.html | 390 | dark | Librarian selected | 231 | 6.07 |
| matrix.html | 1280 | light | load | 238 | 5.43 |
| matrix.html | 1280 | light | Librarian selected | 238 | 5.43 |
| matrix.html | 1280 | dark | load | 238 | 6.07 |
| matrix.html | 1280 | dark | Librarian selected | 238 | 6.07 |
| stack.html | 390 | light | load | 253 | 5.43 |
| stack.html | 390 | light | Context and Evaluation marked weak | 253 | 4.98 |
| stack.html | 390 | dark | load | 253 | 6.07 |
| stack.html | 390 | dark | Context and Evaluation marked weak | 253 | 6.07 |
| stack.html | 1280 | light | load | 253 | 5.43 |
| stack.html | 1280 | light | Context and Evaluation marked weak | 253 | 4.98 |
| stack.html | 1280 | dark | load | 253 | 6.07 |
| stack.html | 1280 | dark | Context and Evaluation marked weak | 253 | 6.07 |
| stances.html | 390 | light | load | 315 | 5.43 |
| stances.html | 390 | light | first layer filter on | 115 | 5.43 |
| stances.html | 390 | dark | load | 315 | 6.07 |
| stances.html | 390 | dark | first layer filter on | 115 | 6.07 |
| stances.html | 1280 | light | load | 315 | 5.43 |
| stances.html | 1280 | light | first layer filter on | 115 | 5.43 |
| stances.html | 1280 | dark | load | 315 | 6.07 |
| stances.html | 1280 | dark | first layer filter on | 115 | 6.07 |
| work.html | 390 | light | load | 97 | 5.43 |
| work.html | 390 | dark | load | 97 | 6.82 |
| work.html | 1280 | light | load | 97 | 5.43 |
| work.html | 1280 | dark | load | 97 | 6.82 |

## 4. Banned words

Case-insensitive substring match for: revolutionary, unlock, supercharge, game-changing, seamless, empower. Text scanned per page: innerText with JS on (1280, light), innerText with JS off (1280), the title.

| Page | Hits |
|---|---|
| about.html | 0 |
| calculator-problem.html | 0 |
| diagnose.html | 0 |
| index.html | 0 |
| learn.html | 0 |
| matrix.html | 0 |
| stack.html | 0 |
| stances.html | 0 |
| work.html | 0 |

## 5. Diagnostic

| Measure | Value |
|---|---|
| Combinations run through `compute()` and `text()` | 26,880 |
| ... returning non-empty stance, layer, guardrail, level, no undefined/NaN | 26,880 |
| Stance paths x common-answer combinations (`paths()`) | 14 x 1,920 |
| Derived from the source text | 14 stance paths x 4 (experience) x 4 (autonomy) x 4 (ambition) x 5 (recovery) x 6 (check) = 26,880 |
| Derived by walking the live UI (options and Back, memoised per question) | 26,880 |
| UI reports reached and checked | 32 (138 option clicks, 11 distinct questions) |
| Stances reached in the UI | 14: adversary, executor, genie, interpreter, librarian, miner, mirror, muse, oracle, scribe, simulator, therapist, translator, tutor |
| Levels reached in the UI | 101, 301 |
| Stances / levels reached via compute() | 14 / 101, 201, 301, 401 |
| Page errors during the walk | 0 |

## 6. Footer build log

The footer is static HTML in every page (`<ol id="ticker-lines">`) plus the about.html table between `<!-- @aboutlog -->` markers; `_qa/buildlog.json` holds the same text. Dates are not compared. Run with `--write-buildlog` to refresh.

| Source | Item | Claimed | Measured | Match |
|---|---|---|---|---|
| about.html footer | pages | 9 | 9 | yes |
| about.html footer | files | 16 | 16 | yes |
| about.html footer | external_scripts | 0 | 0 | yes |
| about.html footer | bytes | 330484 | 330484 | yes |
| about.html footer | loads | 72 | 72 | yes |
| about.html footer | console_errors | 0 | 0 | yes |
| about.html footer | failed_requests | 0 | 0 | yes |
| about.html footer | overflow | 0 | 0 | yes |
| about.html footer | contrast_elements | 4435 | 4435 | yes |
| about.html footer | lowest_light | 4.98 | 4.98 | yes |
| about.html footer | lowest_dark | 6.07 | 6.07 | yes |
| about.html footer | diag_ok | 26880 | 26880 | yes |
| about.html footer | diag_total | 26880 | 26880 | yes |
| about.html footer | ui_paths | 32 | 32 | yes |
| about.html footer | checks_passed | 97 | 97 | yes |
| about.html footer | checks_total | 97 | 97 | yes |
| calculator-problem.html footer | pages | 9 | 9 | yes |
| calculator-problem.html footer | files | 16 | 16 | yes |
| calculator-problem.html footer | external_scripts | 0 | 0 | yes |
| calculator-problem.html footer | bytes | 330484 | 330484 | yes |
| calculator-problem.html footer | loads | 72 | 72 | yes |
| calculator-problem.html footer | console_errors | 0 | 0 | yes |
| calculator-problem.html footer | failed_requests | 0 | 0 | yes |
| calculator-problem.html footer | overflow | 0 | 0 | yes |
| calculator-problem.html footer | contrast_elements | 4435 | 4435 | yes |
| calculator-problem.html footer | lowest_light | 4.98 | 4.98 | yes |
| calculator-problem.html footer | lowest_dark | 6.07 | 6.07 | yes |
| calculator-problem.html footer | diag_ok | 26880 | 26880 | yes |
| calculator-problem.html footer | diag_total | 26880 | 26880 | yes |
| calculator-problem.html footer | ui_paths | 32 | 32 | yes |
| calculator-problem.html footer | checks_passed | 97 | 97 | yes |
| calculator-problem.html footer | checks_total | 97 | 97 | yes |
| diagnose.html footer | pages | 9 | 9 | yes |
| diagnose.html footer | files | 16 | 16 | yes |
| diagnose.html footer | external_scripts | 0 | 0 | yes |
| diagnose.html footer | bytes | 330484 | 330484 | yes |
| diagnose.html footer | loads | 72 | 72 | yes |
| diagnose.html footer | console_errors | 0 | 0 | yes |
| diagnose.html footer | failed_requests | 0 | 0 | yes |
| diagnose.html footer | overflow | 0 | 0 | yes |
| diagnose.html footer | contrast_elements | 4435 | 4435 | yes |
| diagnose.html footer | lowest_light | 4.98 | 4.98 | yes |
| diagnose.html footer | lowest_dark | 6.07 | 6.07 | yes |
| diagnose.html footer | diag_ok | 26880 | 26880 | yes |
| diagnose.html footer | diag_total | 26880 | 26880 | yes |
| diagnose.html footer | ui_paths | 32 | 32 | yes |
| diagnose.html footer | checks_passed | 97 | 97 | yes |
| diagnose.html footer | checks_total | 97 | 97 | yes |
| index.html footer | pages | 9 | 9 | yes |
| index.html footer | files | 16 | 16 | yes |
| index.html footer | external_scripts | 0 | 0 | yes |
| index.html footer | bytes | 330484 | 330484 | yes |
| index.html footer | loads | 72 | 72 | yes |
| index.html footer | console_errors | 0 | 0 | yes |
| index.html footer | failed_requests | 0 | 0 | yes |
| index.html footer | overflow | 0 | 0 | yes |
| index.html footer | contrast_elements | 4435 | 4435 | yes |
| index.html footer | lowest_light | 4.98 | 4.98 | yes |
| index.html footer | lowest_dark | 6.07 | 6.07 | yes |
| index.html footer | diag_ok | 26880 | 26880 | yes |
| index.html footer | diag_total | 26880 | 26880 | yes |
| index.html footer | ui_paths | 32 | 32 | yes |
| index.html footer | checks_passed | 97 | 97 | yes |
| index.html footer | checks_total | 97 | 97 | yes |
| learn.html footer | pages | 9 | 9 | yes |
| learn.html footer | files | 16 | 16 | yes |
| learn.html footer | external_scripts | 0 | 0 | yes |
| learn.html footer | bytes | 330484 | 330484 | yes |
| learn.html footer | loads | 72 | 72 | yes |
| learn.html footer | console_errors | 0 | 0 | yes |
| learn.html footer | failed_requests | 0 | 0 | yes |
| learn.html footer | overflow | 0 | 0 | yes |
| learn.html footer | contrast_elements | 4435 | 4435 | yes |
| learn.html footer | lowest_light | 4.98 | 4.98 | yes |
| learn.html footer | lowest_dark | 6.07 | 6.07 | yes |
| learn.html footer | diag_ok | 26880 | 26880 | yes |
| learn.html footer | diag_total | 26880 | 26880 | yes |
| learn.html footer | ui_paths | 32 | 32 | yes |
| learn.html footer | checks_passed | 97 | 97 | yes |
| learn.html footer | checks_total | 97 | 97 | yes |
| matrix.html footer | pages | 9 | 9 | yes |
| matrix.html footer | files | 16 | 16 | yes |
| matrix.html footer | external_scripts | 0 | 0 | yes |
| matrix.html footer | bytes | 330484 | 330484 | yes |
| matrix.html footer | loads | 72 | 72 | yes |
| matrix.html footer | console_errors | 0 | 0 | yes |
| matrix.html footer | failed_requests | 0 | 0 | yes |
| matrix.html footer | overflow | 0 | 0 | yes |
| matrix.html footer | contrast_elements | 4435 | 4435 | yes |
| matrix.html footer | lowest_light | 4.98 | 4.98 | yes |
| matrix.html footer | lowest_dark | 6.07 | 6.07 | yes |
| matrix.html footer | diag_ok | 26880 | 26880 | yes |
| matrix.html footer | diag_total | 26880 | 26880 | yes |
| matrix.html footer | ui_paths | 32 | 32 | yes |
| matrix.html footer | checks_passed | 97 | 97 | yes |
| matrix.html footer | checks_total | 97 | 97 | yes |
| stack.html footer | pages | 9 | 9 | yes |
| stack.html footer | files | 16 | 16 | yes |
| stack.html footer | external_scripts | 0 | 0 | yes |
| stack.html footer | bytes | 330484 | 330484 | yes |
| stack.html footer | loads | 72 | 72 | yes |
| stack.html footer | console_errors | 0 | 0 | yes |
| stack.html footer | failed_requests | 0 | 0 | yes |
| stack.html footer | overflow | 0 | 0 | yes |
| stack.html footer | contrast_elements | 4435 | 4435 | yes |
| stack.html footer | lowest_light | 4.98 | 4.98 | yes |
| stack.html footer | lowest_dark | 6.07 | 6.07 | yes |
| stack.html footer | diag_ok | 26880 | 26880 | yes |
| stack.html footer | diag_total | 26880 | 26880 | yes |
| stack.html footer | ui_paths | 32 | 32 | yes |
| stack.html footer | checks_passed | 97 | 97 | yes |
| stack.html footer | checks_total | 97 | 97 | yes |
| stances.html footer | pages | 9 | 9 | yes |
| stances.html footer | files | 16 | 16 | yes |
| stances.html footer | external_scripts | 0 | 0 | yes |
| stances.html footer | bytes | 330484 | 330484 | yes |
| stances.html footer | loads | 72 | 72 | yes |
| stances.html footer | console_errors | 0 | 0 | yes |
| stances.html footer | failed_requests | 0 | 0 | yes |
| stances.html footer | overflow | 0 | 0 | yes |
| stances.html footer | contrast_elements | 4435 | 4435 | yes |
| stances.html footer | lowest_light | 4.98 | 4.98 | yes |
| stances.html footer | lowest_dark | 6.07 | 6.07 | yes |
| stances.html footer | diag_ok | 26880 | 26880 | yes |
| stances.html footer | diag_total | 26880 | 26880 | yes |
| stances.html footer | ui_paths | 32 | 32 | yes |
| stances.html footer | checks_passed | 97 | 97 | yes |
| stances.html footer | checks_total | 97 | 97 | yes |
| work.html footer | pages | 9 | 9 | yes |
| work.html footer | files | 16 | 16 | yes |
| work.html footer | external_scripts | 0 | 0 | yes |
| work.html footer | bytes | 330484 | 330484 | yes |
| work.html footer | loads | 72 | 72 | yes |
| work.html footer | console_errors | 0 | 0 | yes |
| work.html footer | failed_requests | 0 | 0 | yes |
| work.html footer | overflow | 0 | 0 | yes |
| work.html footer | contrast_elements | 4435 | 4435 | yes |
| work.html footer | lowest_light | 4.98 | 4.98 | yes |
| work.html footer | lowest_dark | 6.07 | 6.07 | yes |
| work.html footer | diag_ok | 26880 | 26880 | yes |
| work.html footer | diag_total | 26880 | 26880 | yes |
| work.html footer | ui_paths | 32 | 32 | yes |
| work.html footer | checks_passed | 97 | 97 | yes |
| work.html footer | checks_total | 97 | 97 | yes |
| about.html build-log table | pages | 9 | 9 | yes |
| about.html build-log table | files | 16 | 16 | yes |
| about.html build-log table | bytes | 330484 | 330484 | yes |
| about.html build-log table | loads | 72 | 72 | yes |
| about.html build-log table | console_errors | 0 | 0 | yes |
| about.html build-log table | failed_requests | 0 | 0 | yes |
| about.html build-log table | overflow | 0 | 0 | yes |
| about.html build-log table | contrast_elements | 4435 | 4435 | yes |
| about.html build-log table | lowest_light | 4.98 | 4.98 | yes |
| about.html build-log table | lowest_dark | 6.07 | 6.07 | yes |
| about.html build-log table | diag_ok | 26880 | 26880 | yes |
| about.html build-log table | diag_total | 26880 | 26880 | yes |
| about.html build-log table | ui_paths | 32 | 32 | yes |
| about.html build-log table | checks_passed | 97 | 97 | yes |
| about.html build-log table | checks_total | 97 | 97 | yes |
| _qa/buildlog.json | pages | 9 | 9 | yes |
| _qa/buildlog.json | files | 16 | 16 | yes |
| _qa/buildlog.json | external_scripts | 0 | 0 | yes |
| _qa/buildlog.json | bytes | 330484 | 330484 | yes |
| _qa/buildlog.json | loads | 72 | 72 | yes |
| _qa/buildlog.json | console_errors | 0 | 0 | yes |
| _qa/buildlog.json | failed_requests | 0 | 0 | yes |
| _qa/buildlog.json | overflow | 0 | 0 | yes |
| _qa/buildlog.json | contrast_elements | 4435 | 4435 | yes |
| _qa/buildlog.json | lowest_light | 4.98 | 4.98 | yes |
| _qa/buildlog.json | lowest_dark | 6.07 | 6.07 | yes |
| _qa/buildlog.json | diag_ok | 26880 | 26880 | yes |
| _qa/buildlog.json | diag_total | 26880 | 26880 | yes |
| _qa/buildlog.json | ui_paths | 32 | 32 | yes |
| _qa/buildlog.json | checks_passed | 97 | 97 | yes |
| _qa/buildlog.json | checks_total | 97 | 97 | yes |

## 7. Not checked by this harness

- Browsers other than headless Chromium; real devices; screen readers.
- Pages render in fallback fonts unless `--network` is given (Google Fonts are answered locally with an empty stylesheet).
- Text drawn over canvases is measured against the CSS background under it, not the canvas pixels.
- Contrast on the motion-on loads (scanned on reduced-motion loads only, where frames are static).
- Footer items the harness does not measure (frameworks/libraries text, hero field agents and fps, field counts) are left as written.
- Content accuracy, prices, invented numbers: see the blind review.


## All checks

| Check | Result |
|---|---|
| load about.html 390 light motion on | pass |
| load about.html 390 light motion off (reduced) | pass |
| load about.html 390 dark motion on | pass |
| load about.html 390 dark motion off (reduced) | pass |
| load about.html 1280 light motion on | pass |
| load about.html 1280 light motion off (reduced) | pass |
| load about.html 1280 dark motion on | pass |
| load about.html 1280 dark motion off (reduced) | pass |
| load calculator-problem.html 390 light motion on | pass |
| load calculator-problem.html 390 light motion off (reduced) | pass |
| load calculator-problem.html 390 dark motion on | pass |
| load calculator-problem.html 390 dark motion off (reduced) | pass |
| load calculator-problem.html 1280 light motion on | pass |
| load calculator-problem.html 1280 light motion off (reduced) | pass |
| load calculator-problem.html 1280 dark motion on | pass |
| load calculator-problem.html 1280 dark motion off (reduced) | pass |
| load diagnose.html 390 light motion on | pass |
| load diagnose.html 390 light motion off (reduced) | pass |
| load diagnose.html 390 dark motion on | pass |
| load diagnose.html 390 dark motion off (reduced) | pass |
| load diagnose.html 1280 light motion on | pass |
| load diagnose.html 1280 light motion off (reduced) | pass |
| load diagnose.html 1280 dark motion on | pass |
| load diagnose.html 1280 dark motion off (reduced) | pass |
| load index.html 390 light motion on | pass |
| load index.html 390 light motion off (reduced) | pass |
| load index.html 390 dark motion on | pass |
| load index.html 390 dark motion off (reduced) | pass |
| load index.html 1280 light motion on | pass |
| load index.html 1280 light motion off (reduced) | pass |
| load index.html 1280 dark motion on | pass |
| load index.html 1280 dark motion off (reduced) | pass |
| load learn.html 390 light motion on | pass |
| load learn.html 390 light motion off (reduced) | pass |
| load learn.html 390 dark motion on | pass |
| load learn.html 390 dark motion off (reduced) | pass |
| load learn.html 1280 light motion on | pass |
| load learn.html 1280 light motion off (reduced) | pass |
| load learn.html 1280 dark motion on | pass |
| load learn.html 1280 dark motion off (reduced) | pass |
| load matrix.html 390 light motion on | pass |
| load matrix.html 390 light motion off (reduced) | pass |
| load matrix.html 390 dark motion on | pass |
| load matrix.html 390 dark motion off (reduced) | pass |
| load matrix.html 1280 light motion on | pass |
| load matrix.html 1280 light motion off (reduced) | pass |
| load matrix.html 1280 dark motion on | pass |
| load matrix.html 1280 dark motion off (reduced) | pass |
| load stack.html 390 light motion on | pass |
| load stack.html 390 light motion off (reduced) | pass |
| load stack.html 390 dark motion on | pass |
| load stack.html 390 dark motion off (reduced) | pass |
| load stack.html 1280 light motion on | pass |
| load stack.html 1280 light motion off (reduced) | pass |
| load stack.html 1280 dark motion on | pass |
| load stack.html 1280 dark motion off (reduced) | pass |
| load stances.html 390 light motion on | pass |
| load stances.html 390 light motion off (reduced) | pass |
| load stances.html 390 dark motion on | pass |
| load stances.html 390 dark motion off (reduced) | pass |
| load stances.html 1280 light motion on | pass |
| load stances.html 1280 light motion off (reduced) | pass |
| load stances.html 1280 dark motion on | pass |
| load stances.html 1280 dark motion off (reduced) | pass |
| load work.html 390 light motion on | pass |
| load work.html 390 light motion off (reduced) | pass |
| load work.html 390 dark motion on | pass |
| load work.html 390 dark motion off (reduced) | pass |
| load work.html 1280 light motion on | pass |
| load work.html 1280 light motion off (reduced) | pass |
| load work.html 1280 dark motion on | pass |
| load work.html 1280 dark motion off (reduced) | pass |
| JS off about.html 390 | pass |
| JS off about.html 1280 | pass |
| JS off calculator-problem.html 390 | pass |
| JS off calculator-problem.html 1280 | pass |
| JS off diagnose.html 390 | pass |
| JS off diagnose.html 1280 | pass |
| JS off index.html 390 | pass |
| JS off index.html 1280 | pass |
| JS off learn.html 390 | pass |
| JS off learn.html 1280 | pass |
| JS off matrix.html 390 | pass |
| JS off matrix.html 1280 | pass |
| JS off stack.html 390 | pass |
| JS off stack.html 1280 | pass |
| JS off stances.html 390 | pass |
| JS off stances.html 1280 | pass |
| JS off work.html 390 | pass |
| JS off work.html 1280 | pass |
| contrast light | pass |
| contrast dark | pass |
| banned words (visible text) | pass |
| diagnostic: every combination returns a result | pass |
| diagnostic: count equals source-derived and UI-derived counts | pass |
| diagnostic: UI reports complete for every stance | pass |
| footer build log equals this run | pass |
