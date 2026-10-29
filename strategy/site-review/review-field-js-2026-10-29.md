# Review: touch and performance change to docs/assets/field.js (W27, 2026-10-29)

Reviewer: fresh agent, did not write the change. Scope: the uncommitted `git diff docs/assets/field.js` (55 lines: `noHover`,
touch DPR cap, batched compass ticks, intro tour, tap-to-select on `pointerup`, touch-aware `.axis-row` listeners).
Brief: strategy/briefs/W27_review_field_js_touch.md. Read-only review; nothing in docs/ was changed.

**Verdict: 7 of 7 checks pass. 0 defects block merge. 4 low-severity defects, 3 notes.**

## Method
Python Playwright, headless Chromium, file://, external requests answered locally (same stub as site_qa.py). Every behaviour test
ran twice: against the working tree and against a baseline copy of docs/ with field.js restored from `HEAD` (same HTML, old JS),
so each result is a before/after pair. Profiles: desktop 1280x800 mouse (DPR 1, 2, 3); `devices['Pixel 7']` (412x839, DPR 2.625,
touch, `hover: none` and `pointer: coarse` both true); `reduced_motion='reduce'` on both. An init script counted
requestAnimationFrame calls, logged every pointer/touch listener with its `passive` flag, and logged every `preventDefault()` call.
Scripts and raw JSON: scratchpad `w27/` (t1_desktop.py, t2_touch.py, t345.py, t6_pages.py, t7_edges.py, t8c.py).

## Checks

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Desktop mouse unchanged | PASS | Hover 1.2R east: needle 034, 070, 083, 087, 089, 089 at 100 ms steps (before: 034, 070, 083, 086, 088, 089); axis STRUCTURE, row 1 active, live region says "Axis: structure..." in both. Hover west: AMBITION in both. Leaving the hero returns the needle to the selected axis (000 / STANCE, identical before/after). §1 row hover selects rows 0,1,2,3; row clicks, the four axis buttons, ArrowRight, theme toggle (3 clicks), all 14 stance buttons (aria-checked + syslog) and all 21 matrix nodes (circuit readout text) give identical results before and after. Seeded render under reduced motion, DPR 1: 96 of 1,224,960 canvas pixels differ, all in the tick ring (0.03R to 0.11R outside the ring), by at most 1/255: the batched ticks are pixel-equivalent. Repeat run of the same build: 0 px differ. |
| 2 | Touch: tour once, tap sets axis, scroll does not, scroll never blocked | PASS | Compass scrolled into view, no touch: needle 000, 001, 011, 046, 081, 090, 090, 090, 108 ... 270 ... 344, 000 then still at 000 / STANCE (3.6 s sampled every 100 ms); before: 000 throughout. Leaving and returning: no second tour. Touch drag starting W of the compass, finger up 300 px: page scrolled 285 px, axis stayed STANCE (before: flipped to AMBITION). Same from E (312 px, axis kept; before flipped to STRUCTURE) and a downward drag from S (-235 px, axis kept; before flipped to AUTONOMY). Taps at E, S, W, N and SE-inner select STRUCTURE, AUTONOMY, AMBITION, STANCE, AUTONOMY and the needle eases there. Tapping each axis button selects that button. §1 rows: tap selects; a drag starting on row 4 scrolls 250 px and leaves the row unchanged (before: selected row 4). `touch-action`: `.field-canvas` pan-y, everything else auto. All hero/stage pointer listeners are passive; the site registers no touch listeners (the window-level ones belong to Playwright); `preventDefault` was called on no touch or pointer event in either build (only `keydown`). |
| 3 | Reduced motion: nothing moves, needle snaps, no tour | PASS | Desktop and Pixel 7, reduced: 0 rAF calls in 3 s idle, 0 `#needle-deg` mutations, 10 canvas samples over 3 s all identical, no tour (needle 000 throughout). After a mouse move or a tap east: readout 090 / STRUCTURE within 60 ms, then 1 rAF (the one-off redraw) and 8 identical canvas samples over 2 s. |
| 4 | Loop stops off-screen, restarts on return | PASS | rAF calls over 5 s, desktop / Pixel 7: hero in view 301 / 302; paths section 0 / 0; page bottom 0 / 0; back at top 300 / 295. `#needle-deg` mutations over 5 s: 75 / 76 in view, 0 / 0 off-screen. Same as before. |
| 5 | DPR cap on touch only; desktop at device DPR; resize | PASS | Desktop backing-store ratio at DPR 1, 2, 3: 1, 2, 2 (unchanged; the old cap of 2 stays). Resize to 900 px: 900/1800/1800 px wide, ratio kept. Pixel 7 portrait 545x2202 (ratio 1.323, 1.20 MP; before 824x3330, 2.74 MP); landscape 863x1391 (ratio 1.029, 1.20 MP); back to portrait 545x2202. The cap keys on `hover: none`, not `pointer: coarse`; on phones both are true. |
| 6 | Code: no new globals, no console output, node --check, nine pages | PASS | `node --check docs/assets/field.js`: OK. `Object.keys(window)` identical before/after on all nine pages. 54 loads (9 pages x 390, 1280, 390 dark, 1280 reduced, Pixel 7, Pixel 7 reduced), each scrolled top to bottom: 0 console errors, 0 warnings, 0 page errors, 0 failed requests, 0 horizontal overflow. (The only warnings seen anywhere came from this review's own `getImageData` sampling.) Site QA gate run with `--out` to scratchpad (no buildlog write): PASS 97/97; 72 loads, 0 errors, 0 failed, 0 overflow; JS-off 18/18; contrast 5.23 / 6.07; banned 0; diagnostic 26,880/26,880; footer ok. |
| 7 | Accessibility | PASS | During the tour the polite live region stays empty and no axis button or row changes (aria-checked set {0}, active row set {0} across all 36 samples); the readout that names the passing axes is `aria-hidden="true"`. On a tap, a button click or an arrow key, `#needle-axis` and `#needle-deg` update and the live region announces the new axis. |

## Defects, ranked (none blocks merge)

1. **Low: a selection made during the tour is overridden for up to ~2 s.** `setAxis()` does not end the tour, and `tourStep()`
   rebases on the new `axis`. Measured on Pixel 7: ArrowRight 0.9 s into the tour selects STRUCTURE (aria-checked 1), but the
   readout then shows AUTONOMY, AMBITION, STANCE and the needle sweeps a full turn before settling on 090 / STRUCTURE 1.7 s later.
   Clicking §1 row 3 (AUTONOMY) 1.0 s in: the needle jumps 180 degrees (to 288) and the readout reads STANCE, then STRUCTURE, for
   1.3 s before AUTONOMY. A tap on the hero is not affected (it ends the tour). Fix: end the tour in `setAxis()`; note `let tour`
   is declared after `setAxis`, so move the declaration above it to avoid a temporal-dead-zone error if `setAxis` runs first.
2. **Low: switching reduced motion on during the tour leaves a stale readout.** `reduced` flips, `tourStep` stops, but `tour` is
   not cleared and `still()` never calls `writeDeg()` (it only runs every 4th loop frame). Measured: readout frozen at 117 /
   STRUCTURE while the selected axis is STANCE, until the next interaction. Edge case (OS setting changed in a 2.8 s window).
3. **Low: the tour can be spent off-screen.** The IntersectionObserver fires once at 60% visibility and disconnects; a fast flick
   past the compass starts the 2.8 s tour, the loop then stops off-screen, and on return the tour is over (measured: needle 000/003
   only). Acceptable under "plays once", but the reader who flicks past never sees it.
4. **Low: `noHover` is read once at load** and has no change listener, unlike `mqReduce`. A tablet that gains a mouse keeps the touch
   DPR cap and tour behaviour until reload.

## Notes (not defects of this change)
- Softness: the 1.2 MP cap puts a Pixel 7 at 1.32x and a phone in landscape at 1.03x; a hover-none tablet with a large hero lands at
  1.0x. A 1:1 crop of the compass at Pixel 7 (scratchpad `w27/compass_before_pixel7.png`, `compass_after_pixel7.png`) shows no
  visible loss in headless rendering; a real tablet and a phone in landscape should be checked by eye.
- Pre-existing, both builds: the readout can show `360` instead of `000` when the needle settles just below north (rounding in
  `writeDeg`); and a global `t` exists on every page in both builds (not from this change).
- A scroll that starts on the hero still swings the needle toward the finger until `pointercancel` (the axis no longer changes).
  Pre-existing; cosmetic.

## Three things done right
1. Tap versus scroll is decided by the browser itself: selection moved to `pointerup`, which Chrome never sends once a touch
   becomes a pan (it sends `pointercancel`). No timers, no movement thresholds, no `preventDefault`, and scrolling measured
   unblocked from every start point.
2. The tour never calls `setAxis()`: it changes only the canvas and the `aria-hidden` readout, so nothing is announced, no row
   changes, and the selected state stays honest.
3. Desktop is provably untouched: same DPR rule, mouse paths gated by `pointerType !== 'touch'`, and the tick batching renders
   within 1/255 of the old output on 96 edge pixels.
