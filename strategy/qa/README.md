# Site QA harness

`site_qa.py` is the QA gate from CLAUDE.md, as one script. Run it before every commit that touches `docs/`.

## Run it

```
python strategy/qa/site_qa.py docs --out docs/_qa/qa-report.md
```

- Prints one line starting `PASS` or `FAIL`, writes a Markdown report with one table per check, and exits 0 on
  PASS, 1 on FAIL, 2 if the harness itself broke.
- `--out <file>`: where the report goes (default: `site-qa-report.md` next to the docs folder).
- `--write-buildlog`: after measuring, rewrite the build log with this run's numbers, dated today, then re-check it.
  This rewrites `docs/_qa/buildlog.json` and the `<ol id="ticker-lines">` list in every page's footer. The pages do
  not read `buildlog.json` at runtime; each page carries a static copy, which is why both places are rewritten. The
  `about.html` build-log table was removed on 2026-10-29: the `<!-- @aboutlog -->` markers are now optional, and when
  they are absent no about rows are written or checked. Lines the harness does not measure
  (frameworks and libraries text, hero field agents and fps, field counts) are kept as written. Not allowed together
  with `--pages`.
- `--network`: let requests to Google Fonts and YouTube thumbnails through. By default they are answered locally
  (empty stylesheet, 1x1 GIF) so the run is offline and repeatable; the report lists them.
- `--pages a.html,b.html`: run a subset while debugging. The gate needs the full set.

Requirements: Python 3.10+ and Playwright for Python with its Chromium (`pip install playwright`,
`playwright install chromium`). A full run on the 9-page site takes about 3 to 4 minutes.

Typical sequence before a commit: run the gate; fix the site until it prints PASS except for the footer check; run
again with `--write-buildlog --out docs/_qa/qa-report.md`; confirm it prints PASS; commit.

## What each check does

| Check | How | Passes when |
|---|---|---|
| Loads | Every page at 390x844 and 1280x800, light and dark (`prefers-color-scheme`), reduced motion on and off: 4 loads per page and width, 72 for 9 pages. Fresh browser context per load. Waits for fonts, then scrolls to the top, middle and bottom. | 0 console errors (`console.error` and uncaught page errors), 0 failed requests (network failures, HTTP >= 400), `scrollWidth` <= viewport width at all three positions, on every load |
| JavaScript off | Every page at 390 and 1280, light, with JavaScript disabled. Any text that is hidden is traced to its outermost hidden element. If adding the `js` class to `<html>` makes that element appear, it is a JS-only instrument the CSS hides on purpose. If not, the same element is checked on a JS-on load at the same width; if it is visible there, the text needed JavaScript to show. | `<main>` has >= 400 characters, the h1 is visible, no horizontal overflow, no failed requests, no text that needed JavaScript to show ("Readable: yes") |
| Contrast | Every visible text element on the reduced-motion loads (static frames), at both widths and in both themes, plus four interactive states: the diagnostic report, the Stack with Context and Evaluation marked weak, a Matrix selection, a Stances filter. Ported from `strategy/design-directions/A-instrument/_qa/qa.js`: the text colour is composited over the backgrounds stacked under the element's centre (`elementsFromPoint`, alpha compositing, SVG fills). | Every scored element >= 4.5:1, in both themes; no colour left unparsed; every interactive state could be set |
| Banned words | revolutionary, unlock, supercharge, game-changing, seamless, empower. Case-insensitive substring match (so "unlocks" and "empowerment" count), on each page's visible text: `innerText` with JS on (1280, light), `innerText` with JS off, and the `<title>`. | 0 hits |
| Diagnostic | Runs `window.ModeFluencyDiagnostic.compute()` and `.text()` for every stance path x every common-answer combination from `.paths()`. Derives the expected count twice more, independently: by parsing `STANCE_QS` and `COMMON_QS` in `docs/assets/diagnose.js`, and by walking every branch of the live UI (clicking options and Back, memoised per question, checking each report reached). | Every combination has a non-empty stance, layer, guardrail and level and no `undefined`/`NaN` in the result or the copied text; the three counts agree (26,880 on 2026-10-25); every stance reaches a complete report in the UI |
| Footer build log | Reads the numbers from every page's footer and `_qa/buildlog.json` (and the `about.html` table, only if its markers exist), and compares each with this run: pages, files, bytes, external scripts, loads, errors, failed requests, overflow, contrast elements and lowest ratio per theme, diagnostic count, UI paths, checks. Dates are not compared. | Every stated number equals the measured one, and the footer is identical on every page |

Inventory rules: "deployable" means every file under `docs/` except `_qa/` and `STATUS.md`; "external scripts" counts
`<script src="http...">` tags.

## Differences from the earlier ad-hoc run (2026-10-22)

- The contrast routine resolves any CSS colour syntax through a 1x1 canvas. `qa.js` skipped colours it could not
  parse, without saying so. Unparsed colours now fail the check.
- Ancestor `opacity` is multiplied into the text alpha. Disabled controls are listed but exempt, as WCAG 1.4.3
  allows for inactive components.
- SVG shapes count as background only if they are painted before the text (earlier in document order). `qa.js` also
  counted shapes drawn on top: the animated dot in the Stack page's loop diagram then read as a background, giving a
  false 1.5:1 on "Evaluate".
- The element count differs from the old "4,437 per theme" because the interactive states scanned are not the same
  ones. The numbers in the footer have to come from one harness, so refresh them with `--write-buildlog` once.

## Known limits

- Headless Chromium only. No Safari, Firefox, real devices or screen readers.
- Offline by default, so pages render in fallback fonts. Text metrics, and in rare cases overflow, can differ from
  production with Google Fonts. Use `--network` to check with the real fonts.
- Text drawn over a `<canvas>` (the hero field) is measured against the CSS background under it, not the canvas
  pixels.
- Contrast is scanned on the reduced-motion loads only, where frames are static. Mid-animation states are not
  scanned.
- Contrast samples the background at the element's centre. Text over gradients or images is not sampled across
  its whole box.
- The JS-off check matches elements by an id/`nth-of-type` path. If scripts insert siblings before an element,
  that element can be missed.
- Content checks (word-for-word sources, prices, invented numbers) are not automated. They belong to the blind review.
