# Blind review: Mode Fluency site, Direction C (site-c/)

Reviewer: an independent agent that did not build the site. Date: 2026-10-22.
Brief: briefs/W6_site_blind_review.md. Requirement: briefs/W3_full_site_direction_C.md. Rules: briefs/D_design_common.md.
I read `_qa/` only after writing down my own findings. The site was not modified.

Method: headless Chromium (`/opt/pw-browsers/chromium`, global Playwright), every page opened from `file://`. Harness scripts are in
the session scratchpad and are not shipped. Screenshots (85) are in `/home/user/meta-strategy/site-c-review-screenshots/`
(`<page>-<width>-<theme>-<motion|rm>-top/full.png`, plus `<page>-390-nojs-full.png`).

**Summary.** Content accuracy is strong. I found no invented statistic, quote, price, testimonial or logo, and every number in
the footer build log is correct. All 9 PRD §4 metrics pass on my own runs. The defects are in behaviour, not facts: a race
in the circuit that throws away the user's selection, a live region on the home page that never stops announcing, a pulse
loop that keeps running when it is off-screen, and a phone nav that hides "Work with me" and "Learn".

Severity counts: **High 0 · Medium 4 · Low 14**. Factual or invented: 0 invented; 4 low accuracy or attribution notes.

---

## 1. PRD §4 metrics (my own runs)

| # | Metric | Result | Evidence |
|---|---|---|---|
| 1 | 9 pages × 390/1280 × light/dark × reduced motion on/off: 0 console errors, 0 failed requests, no horizontal scroll | **PASS** | 72 loads: console/page errors 0, failed requests or HTTP ≥400: 0, `scrollWidth > innerWidth`: 0, unclipped elements past the viewport edge: 0. External hosts: fonts.googleapis.com, fonts.gstatic.com, i.ytimg.com only. |
| 2 | Lowest text contrast ≥ 4.5:1 in both themes | **PASS** | My own scan (colour composited with opacity over the effective background, all 9 pages, 390 and 1280, 3,072 text-bearing elements per theme). Light: lowest 5.23:1 (`.stage-hint`, index). Dark: lowest 6.07:1 (`span.lv`). The builder's 4.98:1 light figure counts more elements and is the more conservative number. Text over the hero canvas was measured against the page background. |
| 3 | 14 stances, 7 components, 4 autonomy modes, 4 ambition types present; 5 stances word-for-word | **PASS, with a note** | All present. My 5 spot-checks against src_archetypes_v3.md: **Therapist** matches word for word. **Oracle** and **Genie** expectations are lightly edited ("…asking for a wish: a request … and receiving it"). **Interpreter**, **Executor** and **Miner** are abridged (the Executor's examples and "Not a single wish…" are cut, and the Miner expectation stops at "cold attention"), with no ellipsis. Nothing is distorted, but "word for word" holds only with these unmarked cuts. The builder's own five (Tutor, Mirror, Adversary, Librarian, Simulator) do match exactly. I also checked Scribe, Muse and Translator, which match. |
| 4 | Diagnostic: all combinations return a result; 4 paths through the UI | **PASS** | `ModeFluencyDiagnostic` exhaustive run: 26,880 of 26,880 have a stance, layer, guardrail and level URL, with no "undefined" or "NaN" in the copied text. `computeResult` and the question data diff byte-identical to the prototype's site.js. 4 keyboard-only paths (number keys) at 390 gave Oracle→101, Executor→401, Miner (8 questions)→301 and Interpreter→301. Focus moves to `#result-title`. Backspace goes back. "copy result" reports "copied.". Option buttons are 44 px or taller. |
| 5 | Every page readable with JS disabled | **PASS, with a caveat** | All 9 pages: all text present, 0 elements below 0.2 opacity, the wordmark renders from CSS. The diagnostic falls back to a paper version and the matrix to its table. Caveat: see A3. On the home page the 21 circuit buttons stay visible and focusable without JS but do nothing, and the copy still says "Hover, tap or tab…". |
| 6 | ≤ 900 KB excluding fonts; no external JS; fonts only from Google | **PASS** | 15 deployable files, 321,878 bytes (STATUS.md and `_qa/` excluded; 16 files and 321,958 bytes with STATUS.md). Script srcs are local only. Stylesheets: field.css and Google Fonts. |
| 7 | No banned words; no invented stats, testimonials, logos or extra prices | **PASS** | Banned-word grep over HTML, CSS, JS and README: 0 hits. The only prices are $3,500 and $1,200. Every statistic is traced in §3 below. |
| 8 | "calculator" not in the index hero; "machine" is; essay title unchanged | **PASS** | The hero's visible text has "machine" and not "calculator" ("calculator" appears only in an href). The essay h1 is "The Calculator Problem". Note: the first header nav item, directly above the hero, reads "The Calculator Problem". |
| 9 | Wordmark set once in CSS `--brand` and read by JS | **PASS** | One definition (`field.css:8`). It is read at `field.js:13` and `diagnose.js:6`. No page body contains the literal wordmark. |

---

## 2. Defects, ranked

Order follows the brief: factual and invented first, then broken functionality, accessibility, performance, copy and tone, and design. Within each group the most severe comes first.

### Factual / invented (no invented content found)
- **F1 (low): attribution gap on stances.html.** For Tutor, Mirror, Adversary, Librarian, Simulator, Scribe, Therapist, Translator and Muse, v3 has no failure mode. The "Failure mode" lines on those cards come from the Matrix's "Characteristic failure" column. The source note credits "Text from Archetypes v3" and names the Matrix only as the source of the cardinal rule. It should name the Matrix for those failure lines too.
- **F2 (low): consumption/construction filter vs the v3 table.** The Executor is tagged `consumption` only, but v3 also lists "Executor (staged oversight)" under Construction. "Consumption" leaves out the Interpreter, which v3 lists as "Interpreter (unverified)". Result: the Construction filter returns 5 cards and never the Executor; the Consumption filter returns oracle, genie, librarian, executor, muse and therapist.
- **F3 (low): token count in the home §2 copy.** It says "watch a thousand tokens behave as that contract". The field runs 480 tokens below 640 px and 950 above (`field.js:908`), and the HUD itself shows "480 tokens" on a phone.
- **F4 (low): deviation report item 7 overstates the no-JS behaviour.** It says the instruments are hidden without JS. On index.html the circuit's stance and layer buttons are not hidden (see A3).

Verified with no issues: all 14 essay citations and quotes (Papert, S&P 42%/17% dated 14 March 2025, METR 19%/20% and the February 2026 "unreliable signal" caveat, NCTM, Ellington, Hembree & Dessart, NTSB Asiana, FAA PARC/CAST, Parasuraman & Manzey, Rieseberg's 13 October 2026 date, Anthropic 4Ds, Karpathy, Nate B. Jones' Prompt Kit) trace to R4, R2 or R1, and the essay prose is identical to the reviewed prototype. Every about.html lineage claim traces to a source: Nate Jones and the fractal property (src_aies_stack.txt:839), Karpathy and context engineering (R1 row 5), Chappidi, Singh and Krauze (R1:62), Cory Gwin (src_specifying_work.txt), and "five artifacts, three names" (STRATEGY_BRIEF.md:70). Every matrix.html row matches MODE_FLUENCY_MATRIX.md in order and wording. The autonomy table matches src_specifying_work.txt, the ambition text matches src_rieseberg_ambition.md, the Article 4 text matches R2, and the Stack scopes and failure signatures match the Reference Map. All 4 video IDs (jljFm4YPHO8, WVDDf8IlG6E, R2p5aFcb0lY, p6nMtu7iH1g) match src_repo_readme.md, and each hqdefault thumbnail returns HTTP 200. The durations come from R5. The level quotes come from the 101–401 slides. The build log is correct: 9 pages, 15 files, 321,878 bytes, and 72 loads with 0/0/0 (reproduced).

### Broken functionality
- **B1 (medium): the circuit assembly overwrites the user's choice (index.html §3 and matrix.html).** When the circuit enters the viewport, an assembly animation starts. Its timers set `activeS` for each wire, and about 1.8 s later the final timer calls `stance(0,'init')` (`field.js` ~1024–1033). Any stance a user picks in that window is replaced by Oracle: `aria-pressed`, the path readout and the system log all revert while focus stays on the chosen stance. Reproduced on matrix.html: scroll the circuit into view, press Enter on Librarian 300 ms later, and after 3.5 s the result is `pressed: Oracle, path: "Oracle —load→ Judgment", log: Oracle`. Waiting 3 s before choosing works correctly. On a phone this is the normal sequence (scroll, then tap). Fix: cancel the assembly timers on the first user `stance()` or `layer()` call.
- **B2 (low): the diagnostic progress counter never narrows.** It reads "question N (7 or 8 in total)" even after the branch is known. When a result was saved earlier, " · last time on this device: …" is appended inside the same `aria-live` element, so screen readers hear it again at every question.

### Accessibility
- **A1 (medium): a live region on the home hero that never stops.** `.compass-readout` has `aria-live="polite"`, and the needle-degree text inside it updates continuously, even when nobody touches anything. I measured 45 DOM mutations in 3 s idle and 105 after 1.5 s of pointer movement. A screen-reader user on the home page gets a constant stream of "needle 0xx°" announcements. Fix: take `aria-live` off the degree text and announce only axis changes.
- **A2 (low): too many tab stops in the circuit.** Each circuit has 21 buttons in the tab order (14 stances and 7 layers), even though arrow keys are offered, which makes 42 tab stops across index and matrix. The stance picker and compass already use roving tabindex. The circuit should too.
- **A3 (low): dead controls without JS.** The index circuit renders 21 focusable buttons with no wires and no behaviour, and the copy invites hovering and tabbing. Hide `.circuit` without JS, as is already done for the picker and compass, or link to matrix.html#table instead.
- Passed: the skip link comes first, is visible on focus and moves focus to `<main>`. The tab order is logical. Every focused control shows a 2 px outline. Compass and stance radiogroups use arrows and Home/End with `aria-checked`. Stance filters use `aria-pressed` and a status line. The stack "mark weak" toggles have labels. The theme toggle cycles light → dark → auto. The wordmark link's name is "Mode Fluency, home" (CSS `::before` plus sr-only text). Landmarks are present.

### Performance
Home page main-thread time at 1280 (CDP `Performance.getMetrics`):

| Window (5 s) | ScriptDuration | TaskDuration | rAF/s |
|---|---|---|---|
| Idle, hero in view | 212 ms | 1,061 ms | 60 (hero field) |
| Scrolling | 71 ms | 672 ms | 40 |
| Idle at footer (hero off-screen) | 37 ms | 252 ms | 60, **all from the circuit pulse loop** |
| Hero in view, `document.hidden` simulated | 41 ms | 391 ms | 60, **all from the circuit pulse loop** |

The headless hero ran at 60 fps with a worst frame of 17 ms (software rendering, so indicative only). **The hero particle loop pauses correctly** when off-screen (IntersectionObserver) and when the tab is hidden (`visibilitychange`). Stance-card fields are lazy: 0 rAF with no card in view, 2 cards running when 2 are visible.
- **P1 (medium): the circuit pulse loop never pauses (index and matrix).** `runPulses()` (`field.js` ~985–998) loops `requestAnimationFrame` for as long as a stance is selected, and the init step always selects Oracle. It is not gated on visibility or `document.hidden`. It ran at 60 rAF/s on index with the circuit off-screen, and at 48 rAF/s on matrix scrolled to the footer, with about 3–6 ms/s of layout from `getPointAtLength`. This breaks the D_design_common rule ("paused when off-screen or hidden"). stack.html already gates its pulses with `sdVisible`, and the circuit should do the same.
- **P2 (low): the essay strip never idles.** The reading strip is pinned under the header, so it is never off-screen. It keeps running at about 65 rAF/s for the whole read, even when the reader is not scrolling. It could draw only on scroll, or idle after a second.

### Copy / tone (0 banned words)
- **C1 (low): the calculator metaphor on learn.html.** The lede is "How to use the calculator, for people who can already do the math by hand." Henrique removed this metaphor from the home hero so first-time visitors would not be puzzled. The Learn page is where a non-technical visitor lands from "videos", and the metaphor is not explained there.
- **C2 (low): a promise the Stack page does not keep.** The lede promises "a user interaction model that ties them together". The page never presents that model.
- **C3 (low): the home page never says "video" or "talk".** A phone visitor looking for videos has to recognise "AI @ Workplace 101–401 →" in §4, about 65% of the way down the page (y ≈ 5,637 of 8,643 px).

### Design
- **D1 (medium, the biggest usability issue for the phone visitor): the phone nav hides five links.** At 390 px the nav is a horizontally scrolling strip with its scrollbar hidden and no fade or arrow. Matrix is cut off and Diagnose, Learn, Work with me and About are off-screen (left edges at 327, 392, 472, 530 and 638 px). In the page itself, the first "Work with me" link is at y ≈ 6,026 of 8,643 px. An operations manager on a phone can read the hero in 60 seconds, but will not see how to hire or where the videos are without scrolling far down or swiping a strip that does not look swipeable. Fix: add an edge fade or "more →" affordance, or wrap the nav onto two rows.
- **D2 (low): Evaluation appears twice in the Stack diagram.** It is drawn both as a vertical side rail and as a separate "meta Evaluation" card under Harness, so "Seven components, one system" shows eight boxes. A CTO will notice.
- **D3 (low): the light-theme circuit reads as a tangle at rest.** Fourteen pale wires with overlapping vertical runs look tangled until something is hovered. Stronger resting contrast for the wires, or dimming non-hot wires harder, would help.
- **X1 (low, deployment): the review files will be published.** README tells Henrique to copy the whole folder into `docs/`, so `_qa/` (qa-report.md, buildlog.json and this review) will be published. That is intended for qa-report.md, which about.html links to. Check that publishing this review is also intended.

---

## 3. The three visitors

- **Operations manager, phone (390, light):** In 60 seconds the hero gets across "Know which mode you're in", the machine lede and two clear buttons ("Read the essay", "Which mode are you in?"). The paragraph under it leans on jargon ("what you must supply for it to hold"). There is no plain sentence such as "I train teams and audit how they use AI" until §5. Videos and hiring are hard to find on a phone (D1, C3). The diagnostic works well on a phone.
- **CTO, laptop (1280, dark):** The Stack page holds up. Scopes, failure signatures, artifacts and the dependency rule match the Reference Map exactly. The binding-constraint demo is correct: marking Context weak names Context as the constraint and starves Intent, Judgment and Coherence. The duplicate Evaluation box (D2) is the one thing that looks wrong. The matrix table matches the source row for row, and the circuit is correct apart from the selection race (B1).
- **Keyboard / screen-reader style:** All controls can be operated by keyboard, focus is always visible and the skip link works. The compass live region (A1) and the circuit's 21 tab stops (A2) are the two problems.

## 4. Motion

- With reduced motion on, every page is complete and still: on all 9 pages, rAF calls in 2 s = 0, running CSS animations = 0, and two screenshots 2 s apart are identical. The circuit, logs and diagnostic show their final state immediately.
- No text sits at opacity 0 before scrolling. I checked every text-bearing element in the full page, below the fold included, after 1.8 s, in all 72 loads, and found 0. The only scroll-driven animation (`tag-in`) is transform-only.
- With JS off, nothing is hidden (see metric 5) apart from the dead circuit buttons noted in A3.

## 5. Three things that work well

1. **Sourcing discipline.** Every figure and quote traces to a dated research note with a primary URL. The METR 2026 correction and the S&P date fix appear as margin "log" notes instead of being hidden. The build-log numbers in the footer are exactly right. That is rare, and it backs up the "built by an agent" claim.
2. **Robust at rest.** 72 clean loads, 0 overflow, a fully still reduced-motion mode, no hidden text, real no-JS fallbacks (the diagnostic on paper and the full matrix table), and a hero field and stance cards that pause when off-screen or hidden.
3. **The diagnostic console.** The logic is byte-identical to the verified prototype (26,880 of 26,880). The number-key and Backspace keyboard flow works, focus moves to each question and then to the report, and the copy button falls back to a textarea when the clipboard is unavailable. It feels like a console without losing usability.
