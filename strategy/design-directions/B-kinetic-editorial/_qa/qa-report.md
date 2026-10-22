# QA report: Direction B, Kinetic Editorial (2026-10-22)

Tooling: Playwright 1.47.2 driving Chromium at /opt/pw-browsers/chromium (headless=new), page opened from file://.
Screenshots: /home/user/meta-strategy/design-qa-screenshots/B/ (31 files).

| Check | Result |
|---|---|
| 390 and 1280, light and dark, reduced motion on and off (8 runs) | PASS: all 8 rendered; top / mid / bottom screenshots for each (`<w>-<theme>-<motion|rm>-<top|mid|bottom>.png`) |
| Console errors and page errors | PASS: 0 in all 8 runs and in the interaction run |
| Failed requests | PASS: 0 (Google Fonts reachable; fallback stacks defined if not) |
| scrollWidth <= viewport (checked at 0, 25, 50, 75, 100% of page) | PASS: max 390 at 390, max 1280 at 1280 |
| Instrument interaction at 1280 | PASS: tab to Ambition, drag needle -> "Altitude", reading line updates; keyboard Arrow keys on Autonomy -> "Continuous". `1280-light-instrument-interacted.png` |
| Matrix (stance lights its layer) | PASS: click Executor -> Harness and Judgment rise to the top, marked load-bearing (View Transition). `1280-light-matrix-executor.png` |
| Mode shift retype | PASS: Executor retype completes; mid-typing and done screenshots |
| Procession | PASS: midway scroll shows Simulator current, margin note in sync. `1280-light-procession-mid.png` |
| Hero scroll axis | PASS: at 220px scroll, --hp = 0.39 and first-word weight 813 (rest weight 330). `1280-light-hero-scrolled.png` |
| No-JS fallback | PASS: headline, all 4 axis panels and all 14 stances visible, no overflow. `1280-light-nojs-top.png` |
| Contrast, every visible text node incl. SVG text (306 nodes at 390, 332 at 1280) | PASS: lowest light 5.25:1, lowest dark 6.51:1 (both the colophon note). Composited against the real background, opacity included |
| Banned words (revolutionary, unlock, supercharge, game-changing, seamless, cutting-edge, empower) | PASS: 0 matches in html/css/js |
| Byte size (excluding fonts) | PASS: 95,430 bytes total (index.html 33.7 KB, style.css 34.0 KB, main.js 27.3 KB, compass.svg 0.3 KB); no libraries |

Notes
- Scroll-driven CSS (`animation-timeline`) is an enhancement only, inside `@supports (animation-timeline: scroll())`;
  where unsupported (Firefox), main.js drives the same `--hp` property with one rAF-throttled scroll handler. At rest
  the headline is fully set and visible.
- Reduced motion: CSS kills all animation/transition, the procession becomes a vertical list, typing swaps instantly,
  View Transitions, parallax and pointer-weight are skipped. State (selected tab, mode, stance) still updates.
- Known limitation: variable-weight animation (hero, procession names) re-lays-out the glyphs it touches; it is
  confined to fixed-width boxes (`contain: layout paint` on procession items) and rAF-throttled, while the track
  itself moves by transform only. Not profiled on a physical mid-range laptop.
- Contrast check does not judge text over the decorative compass hairlines in the hero (lines only, 1px).
