# Task: a reusable site QA harness for docs/ and a baseline run — 2026-10-25

## 1. What and why
The site QA gate must run before every commit touching docs/. The cloud session that built the site ran it with ad-hoc
scripts that are not in the repo. Build a reusable one in the repo and run it on the current site.
Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering. Python 3.14 and Playwright (python, Chromium 143) are installed.

## 2. The gate (from CLAUDE.md)
Headless Chromium, file://, every page in docs/ at 390 and 1280 px, light and dark, reduced-motion on and off (72 loads for 9 pages),
plus every page with JavaScript off. Pass means: 0 console errors, 0 failed requests, scrollWidth ≤ viewport width on every load,
every visible text node ≥ 4.5:1 contrast (both themes; port the contrast routine in
strategy/design-directions/A-instrument/_qa/qa.js, which handles alpha compositing and SVG), 0 hits for the banned words
(revolutionary, unlock, supercharge, game-changing, seamless, empower) in docs/*.html visible text, the diagnostic returns a
non-empty stance, layer, guardrail and level with no "undefined" for every answer combination (read docs/assets/diagnose.js to
enumerate; the previous run counted 26,880), and the footer build-log numbers equal what this run measured.

## 3. Inputs
- docs/ (copy it to the scratchpad folder named below BEFORE you start and run against the copy; another agent is editing docs/ right now)
- docs/_qa/qa-report.md and docs/_qa/buildlog.json (what the previous run measured and how the footer gets its numbers; find
  where the pages read the build log and document it in the script header)
- strategy/design-directions/A-instrument/_qa/qa.js (contrast routine to port)

## 4. Output
- `strategy/qa/site_qa.py`: `python strategy/qa/site_qa.py <docs-dir> [--write-buildlog] [--out <report.md>]`. Prints a one-line
  PASS/FAIL summary and writes a Markdown report with one table per check. `--write-buildlog` rewrites buildlog.json (and whatever
  the footer reads) with the measured numbers, dated today. Headless, deterministic, no network. Runtime under 10 minutes.
- `strategy/qa/README.md`: how to run it, what each check does, known limits (headless Chromium only).
- Baseline run on the COPY at
  C:\Users\henri\AppData\Local\Temp\claude\C--Users-henri--claude-spares-spare-Sg1iEL\30d2be6e-ee02-497a-9ebc-a4b5153f79ac\scratchpad\qa-baseline\docs
  with the report at ...\scratchpad\qa-baseline\report.md. Do not write into the repo's docs/.
- Return ≤15 lines: the PASS/FAIL line, the lowest contrast per theme, the diagnostic count, any check you could not implement.

## 5. Acceptance criteria
- [ ] The script runs end to end on the copy with exit code 0 on PASS, 1 on FAIL
- [ ] The report lists every load (page × width × theme × motion) with its three counts, and the JS-off loads with "readable" yes/no
- [ ] Contrast scan covers both themes and reports the lowest ratio and the element for each
- [ ] Diagnostic enumeration count printed and equals the number of combinations derivable from diagnose.js
- [ ] Banned-word check implemented on visible text, case-insensitive

## 6. Constraints
- No helpers. Budget: 60 minutes. Model: opus. Write a working script early and improve it; keep STATUS.md at
  ...\scratchpad\W9_STATUS.md. Non-goals: do not fix the site, do not change any file under docs/.
