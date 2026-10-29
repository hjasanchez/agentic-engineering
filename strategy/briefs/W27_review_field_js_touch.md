# Task: review the touch/performance change to docs/assets/field.js before merge — 2026-10-29

## 1. Goal
Another agent changed the home page's hero field and compass for touch devices and performance. You did not write it. Find regressions.
Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering. The change is uncommitted: `git diff docs/assets/field.js`.

## 2. Inputs
- The diff, the brief strategy/briefs/W22_perf_and_android_compass.md, and the writer's findings at
  C:\Users\henri\AppData\Local\Temp\claude\C--Users-henri-Desktop-CCode-modefluency\30d2be6e-ee02-497a-9ebc-a4b5153f79ac\scratchpad\W22_FINDINGS.md (read last).
- Python Playwright is installed; use desktop Chromium and a Pixel 7 device emulation; also emulate `prefers-reduced-motion: reduce`.

## 3. Check
1. Desktop mouse behaviour unchanged: hover over the compass moves the needle; leaving returns it to the selected axis; the §1 rows respond to hover
   as before; the stance selector and every other instrument on index.html still work (click each at 1280 px).
2. Touch: the intro tour plays once when the compass enters view; a tap sets the axis; a scroll gesture over the compass does not change the axis;
   scrolling is never blocked (check `touch-action` and that no listener calls preventDefault on touchmove).
3. Reduced motion: nothing moves at all, on mouse and on touch; the needle snaps; no tour.
4. Visibility and idle: the loop stops when the hero leaves the viewport and restarts when it returns; no runaway requestAnimationFrame
   (count frames over 5 s with the hero off-screen).
5. DPR cap: the cap only applies on coarse pointers; desktop stays at device DPR; the canvas is resized on orientation change / resize.
6. Code: no new globals, no console errors or warnings in any mode, `node --check` passes; the other pages that load field.js (all nine) still have
   0 console errors at 390 and 1280 px.
7. Accessibility: the tour announces nothing to assistive tech; `#needle-deg`/`#needle-axis` text still updates on selection.

## 4. Output
- strategy/site-review/review-field-js-2026-10-29.md: pass/fail per check with evidence; defects ranked; three things right.
- Return ≤12 lines: counts, the defects that block merge.

## 5. Constraints
- Read-only except the one output file. Do not fix. Budget: 30 minutes. Model: opus. No helpers.
