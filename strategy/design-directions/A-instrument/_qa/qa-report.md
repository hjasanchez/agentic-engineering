# QA report: Direction A, "The Instrument"
Run 2026-10-22 with Playwright 1.56.1 (preinstalled at /opt/node22/lib/node_modules/playwright; no scratchpad install existed, nothing was downloaded) driving Chromium at /opt/pw-browsers/chromium. Page opened from file://. Script: `_qa/qa.js`. Screenshots: /home/user/meta-strategy/design-qa-screenshots/A/ (39 files).

| Check | Result |
|---|---|
| Matrix: 390 and 1280 × light and dark × reduced-motion on and off (8 runs) | PASS: all loaded |
| Console errors / page errors | PASS: 0 in all 8 runs and in both interaction runs |
| Failed requests (incl. Google Fonts via proxy) | PASS: 0; B612, B612 Mono and Source Serif 4 all loaded |
| scrollWidth ≤ viewport (checked at top, mid and bottom) | PASS: 390/390 and 1280/1280 in every run |
| Screenshots top / mid / bottom | Done: `{390,1280}-{light,dark}-{motion,rm}-{top,mid,bottom}.png` |
| 1280 after interacting with the instrument | Done: `1280-{dark,light}-interact-hero-drag.png` (needle dragged Oracle→Tutor with Autonomy=Autonomous: valuenow 3, caution lamp on, horizon banked, failure line = "Being taught toward a goal you never stated.") plus keys, scroll sweep, switch panel, mode-confusion and altitude-ladder shots |
| Keyboard: dial is role=slider, ArrowRight ×2 | PASS: 3 → 5 |
| Scroll sweep (pinned hero, 60% through) | PASS: needle on Simulator |
| Switch panel (Executor, Librarian, Interpreter + default Oracle) | PASS: "4 of 14 stances on"; LEDs judgment 2, evaluation 2, harness 1; guardrail typed in full |
| Mode-confusion toggle (Genie→Executor) | PASS: layer reads "Harness + Judgment" |
| Altitude ladder | PASS: tape reads 419 just past the 401 rung; caption flips to "On the loop" |
| No-JS | PASS: h1, failure line and all copy present (8,849 chars), wordmark from CSS --brand, no overflow (`1280-dark-nojs-top.png`) |
| Mobile (390, touch): Prev/Next stepper, nav menu | PASS (`390-dark-interact-instrument.png`, `390-dark-nav-open.png`) |
| Contrast: every visible text node incl. SVG text, background resolved by compositing what is actually under each node | PASS: 0 nodes below 4.5:1. Lowest: light 5.00:1 (dial ring codes, #4a5664 on #cdd4db); dark 5.97:1 (#929daa on #17202b). 339–350 nodes checked per run |
| Banned words (revolutionary, unlock, supercharge, game-changing, seamless, cutting-edge, empower) | PASS: none |
| Byte size (index.html + assets, excluding fonts and _qa) | 114,451 bytes (29.7 KB gzipped); budget 600 KB |

Fixed during QA: light-theme cyan/amber darkened (first run had 4.39:1 on recessed panels); pinned hero resized to fit 1280×800; ring-name labels removed from the dial (they collided with the Oracle segment); Executor guard artwork; mode-confusion SVG labels clipped.

Notes: the CSS scroll-driven animation (annunciator lamp test) is wrapped in `@supports (animation-timeline: scroll())` and only animates a glow on already-visible text; the hero sweep and altitude tape use rAF-throttled scroll handlers, so they work in Firefox too. The rAF loop pauses when the dial is off-screen or the tab is hidden; reduced motion turns off the idle wobble, the easing, the typewriter, the pinned scroll sweep and the roll-in, and every state is still set correctly.
