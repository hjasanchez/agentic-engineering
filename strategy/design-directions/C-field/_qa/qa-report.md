# QA report: Direction C "The Field"

Run: 2026-10-22, Playwright 1.47.2 + Chromium at /opt/pw-browsers/chromium (new headless), page opened from file://.
Harness: scratchpad pwC/qa.js. Screenshots: /home/user/meta-strategy/design-qa-screenshots/C/ (top/mid/bottom per run,
reduced-motion stance frames, and 1280 interaction shots: compass, executor, miner, each stance, circuit, keyboard).

## Matrix of runs (390x844 and 1280x800, light/dark, reduced motion on/off)
| Run | Console errors | Failed requests | scrollWidth vs viewport | Hero field |
|---|---|---|---|---|
| 390 light motion | 0 | 0 | 390 / 390 | 700 agents, running, 60 fps |
| 390 light reduced | 0 | 0 | 390 / 390 | static frame |
| 390 dark motion | 0 | 0 | 390 / 390 | 700 agents, running, 59 fps |
| 390 dark reduced | 0 | 0 | 390 / 390 | static frame |
| 1280 light motion | 0 | 0 | 1280 / 1280 | 1,600 agents, running, 60 fps |
| 1280 light reduced | 0 | 0 | 1280 / 1280 | static frame |
| 1280 dark motion | 0 | 0 | 1280 / 1280 | 1,600 agents, running, 60 fps |
| 1280 dark reduced | 0 | 0 | 1280 / 1280 | static frame |
PASS: no console errors, no failed requests, no horizontal overflow (checked at top and after scrolling to the bottom).

## Interaction (1280, dark, motion on)
- Compass instrument: pointer swept 0 to 100 degrees around the compass; needle read 099, axis STRUCTURE, §1 row "Structure" active. PASS
- Keyboard: arrow keys on the axis radiogroup moved focus and selection to AMBITION. PASS
- Stance selector: Executor HUD after ~2 s "caught at checkpoint 459, drifted 16"; system log printed stance/expects/load/field/fail/guard. PASS
- Miner: sweeping the pointer recorded 17 ore particles. PASS
- Circuit: hovering Executor lit 2 wires and layers Judgment + Harness; readout "Executor -load-> Harness + Judgment". PASS
- Hero field frame rate in the QA browser after interaction: 57 fps (headless Chromium, software-rendered; indicative only).

## Contrast (all visible text elements, computed fg over composited background, both themes)
- Light: 191 elements at 1280 (176 at 390); lowest 5.23:1 (stage hint, #4f5c55 on #dbe0d8). PASS
- Dark: 191 elements at 1280 (176 at 390); lowest 6.07:1 (log labels, #94a197 on #18221e). PASS
- Caveat: text over the hero canvas is measured against the --bg token; particles behind the hero copy are drawn at 13% alpha
  (a quiet zone) so they do not reduce legibility. Brand wordmark (CSS ::before) included in the check.

## Banned words
grep -i for revolutionary|unlock|supercharge|game-changing|seamless|cutting-edge|empower over index.html and assets/: 0 hits. PASS

## Size
index.html + assets/field.css + assets/field.js + assets/favicon.svg = 80,999 bytes (budget 600 KB, fonts excluded). PASS
External: Google Fonts (JetBrains Mono, Newsreader) only; no scripts from any CDN.

## Not verified here
Real mid-range laptop GPU timing, Safari and Firefox rendering, screen-reader output (only ARIA structure was checked).
