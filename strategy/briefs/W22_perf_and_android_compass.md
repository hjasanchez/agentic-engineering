# Task: performance pass on the particle field, and the hero compass on Android — 2026-10-29

## 1. What and why
Henrique reports: the home page's first compass animation works in Firefox but "not well" in his Android mobile browser (Chrome on Android,
most likely). Frame rates for the particle field were only ever measured in headless desktop Chromium. Find out what breaks on a phone,
fix it, and measure the field under throttling. Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs
- docs/index.html, docs/assets/field.js (the hero field and compass start near the "HOME: hero field + compass" marker, ~line 722; the needle
  follows the pointer; `reduced` is the prefers-reduced-motion flag; the field loop uses requestAnimationFrame with a `still()` idle mode),
  docs/assets/field.css.
- strategy/briefs/D_design_common.md and W3_full_site_direction_C.md: the motion rules (motion at rest, reduced motion, budgets).
- Python Playwright is installed. Use device emulation (`playwright.devices['Pixel 7']` or similar: Android Chrome UA, touch, devicePixelRatio ~2.6,
  viewport 412×915) and CDP `Emulation.setCPUThrottlingRate` (4× and 6×) to approximate a mid phone and a mid laptop.

## 3. Diagnose first (write findings before fixing)
Likely suspects, check each and record which apply:
1. Touch: the needle is driven by pointer hover/move; on a touch screen there is no hover, so the "first animation" may never start, or starts only
   on touch and then snaps. Check what the intro sweep does on a coarse pointer (`matchMedia('(pointer: coarse)')`), and whether the first
   frame renders before any interaction.
2. devicePixelRatio: a canvas sized at DPR 2.6+ has 7× the pixels of DPR 1; the particle count or the per-frame cost may be too high, so the needle
   lags or the page janks. Measure frames per second and long tasks at DPR 2.6 with 4× and 6× CPU throttling.
3. IntersectionObserver / visibility gating and the `still()` idle mode: does the loop stop too early on mobile, or never start?
4. Android Chrome specifics: `prefers-reduced-motion` from the OS "remove animations" setting; battery saver; passive touch listeners and
   `touch-action` on the canvas (a canvas that captures touchmove without `touch-action: pan-y` blocks scrolling, which reads as "not well").
Write the findings to C:\Users\henri\AppData\Local\Temp\claude\C--Users-henri-Desktop-CCode-modefluency\30d2be6e-ee02-497a-9ebc-a4b5153f79ac\scratchpad\W22_FINDINGS.md.

## 4. Fix
- Smallest change that makes the compass's first animation play on a touch device and keeps scrolling smooth: e.g. an intro sweep that does not
  depend on hover, a DPR cap (render at min(devicePixelRatio, 2) or lower on coarse pointers), a particle budget scaled to viewport area and DPR,
  `touch-action: pan-y` on the canvas, passive listeners. Keep the desktop behaviour unchanged where it already works.
- Keep: readable with JS off, no animation under reduced motion, 0 console errors, no horizontal overflow, contrast unchanged. Do not change copy.
- Run `python strategy/qa/site_qa.py docs --write-buildlog --out docs/_qa/qa-report.md`; it must PASS.
- Measure before and after: fps and long tasks on the home page at Pixel-7 emulation × 4× throttle and × 6× throttle, and at 1280 px × 4× throttle.
  Write a table to the findings file. Real numbers only.

## 5. Output
- Edits in place (do not commit). Findings file with the before/after table. Screenshots of the hero at Pixel-7 emulation (first paint, after 1 s,
  after 3 s) to C:\Users\henri\Desktop\CCode\modefluency\workspace\previews\android-compass-*.png.
- Return ≤15 lines: the cause(s) found, the fix, the before/after numbers, the QA line, and what still needs a real phone to confirm.

## 6. Constraints
- Budget: 75 minutes. Model: opus. No helpers. Targeted edits only (Edit tool). Nothing outside docs/ and the files named above. Banned words apply to any text.
