# Blind review: Mode Fluency site prototype

Reviewer: independent agent (did not build the site). Date: 2026-10-21.
Inputs: `briefs/W1_site_PRD.md`, `site/`, and every content source in PRD §6 (including `research/R4_analogy_evidence.md`, which exists).
I formed all findings below before opening the builder's `qa-report.md` / `qa-results.json`. The comparison is at the end.

**Bottom line.** This is a careful build. I found no invented content: every statistic and quote on the essay traces to a source file, and the stance and Stack text is close to verbatim. All seven PRD §2 metrics pass on the served site. What remains is a set of moderate and minor defects: one inaccurate privacy sentence, one diagnostic message that contradicts the user's own answer, a matrix interaction that cannot be seen on phones, one colour pair below 4.5:1, and some copy slips.

## Method (commands run)

All scripts are in the scratchpad (not in the repo): `/tmp/claude-0/-home-user/a796e04e-6d69-549d-a3e4-d8074fbd356d/scratchpad/review/r1.js … r6.js`.
They use Playwright from `/opt/node-tools/node_modules/playwright` with `executablePath: /opt/pw-browsers/chromium`. I did not run `playwright install`.

| Script | What it did |
|---|---|
| `r1.js` | Opened all 9 pages from `file://` at 390 and 1280 px, in light and dark (36 loads). Recorded console errors, page errors, failed requests, non-file requests, `scrollWidth`, any element extending past the viewport, images and alt text, landmarks, h1 count, skip link and external scripts/styles. Saved viewport screenshots as `_qa/review-<page>-<width>[-dark].png`. |
| `r2.js` | Clicked every stance filter chip and every matrix stance and layer button, then read the result and the live-region text. Checked that every relative link and `#anchor` resolves to a file and an id, and that no link uses `target`. |
| `r3.js` | Drove the diagnostic through 7 distinct UI paths (below). Also tested Back, an empty submit, keyboard Enter, and the copy button with a clipboard read-back. Enumerated all 26,880 answer combinations through `window.ModeFluencyDiagnostic`. |
| `r4.js` | Computed the WCAG contrast ratio of every visible text node against its effective background (both themes). Listed SVG text fills, then tabbed through the page to check the skip link and focus rings (`_qa/review-focus-*.png`). |
| `r5.js`, `r6.js` | Checked mobile overflow of the tables and SVG, the essay word count, and whether the mini stack is visible after a matrix click at 390 and 1280 px (`_qa/review-matrix-click-translator-*.png`). |
| shell | Grepped for banned and hype words, prices, `[source needed]` and iframes. Hashed header, footer and `<head>` across pages and measured sizes with `du`. Traced each claim by grepping the source files (line numbers cited below). |

## 1. PRD §2 success metrics

| # | Metric | Result | Evidence |
|---|---|---|---|
| 1 | Zero console errors from disk | **PASS** | `r1.js`: 0 console errors, 0 page errors and 0 failed requests across 36 loads. The only non-file requests are the 4 `i.ytimg.com` thumbnails on learn.html (see defect 1). |
| 2 | No horizontal scroll at 390 and 1280 | **PASS** | `scrollWidth == clientWidth` on all 36 loads. No element's right edge goes past the viewport. Under 390 px the matrix table reflows into cards (`review-matrix-table-390.png`) and the stack SVG fits (`review-stack-figure-390.png`). |
| 3 | 14 stances, 7 components, 4 autonomy modes and 4 ambition types, accurate and from the sources | **PASS** (minor caveats: defects 2–4) | All present; see "Content trace" below. Five stances were checked word for word. Component Governs/Scope/Failure text matches the Reference Map table. Definitions match `src_aies_stack.txt` (l.133, 229, 367, 509, 675, 866, 937). The autonomy table matches `src_specifying_work.txt` l.52–77, including the "Autonomous + Spec" row. The ambition text is Rieseberg's l.22–25. |
| 4 | Diagnostic returns a stance and a binding layer on every path | **PASS** | All 26,880 combinations (14 stance paths × 1,920 common-answer combinations) return a stance, layer, guardrail and level, with no `undefined` in the copied text. All 14 stances and all 4 levels are reachable. Path length is 7–8 questions (PRD: 7–9). The *advice text* is wrong on some paths (defect 5). |
| 5 | Semantic landmarks, alt text, visible focus, prefers-color-scheme | **PASS** | header, nav, main (one) and footer on every page, plus a skip link (`review-focus-skiplink-*.png`). The 4 images all have alt text. `:focus-visible` gives a 3 px accent outline, checked on the skip link, nav, chips and diagnostic options. The dark tokens under `prefers-color-scheme` render (`review-*-390-dark.png`). *Separate from this metric:* PRD §4 asks for contrast ≥ 4.5:1, and one pair fails (defect 8). |
| 6 | Under 2 MB, no external JS, fonts system or Google | **PASS for the served files** | HTML, CSS, JS and SVG come to 176,229 bytes. There are no external scripts and no iframes, and only system fonts are used. **Question Q4:** `site/_qa/` was already 2.65 MB before this review, so the `site/` folder as committed exceeds 2 MB. |
| 7 | No fabricated testimonials, logos, clients, prices or unsourced statistics | **PASS** | The only prices are "From $3,500" and "From $1,200". There are no testimonials or logos; work.html says so explicitly. Every statistic traces to a source (table below). |

### Content trace: calculator-problem.html (every statistic and quote)

| Claim on the page | Source file | Status |
|---|---|---|
| Papert 1980: "is often taken as meaning knowing how to program…" and "But true computer literacy is not just knowing … It is knowing when it is appropriate to do so." | R4 §3 [20] | Verbatim |
| S&P Global: 42% abandoned most AI initiatives, up from 17% (2025) | R2 l.79 (CIO Dive, 14 Mar 2025; "verified only through press") | Traced. The press-only caveat is disclosed in source note [2]. |
| METR Jul 2025: 19% longer, believed 20% faster; 16 developers, 246 tasks | R4 §4.1 [25] | Traced |
| METR Feb 2026: "an unreliable signal"; developers refused to work without AI; estimates moved toward a speedup; both intervals include zero | R4 §4.2 [26] | Traced. The following sentence, "the part that survives is the gap between feeling and fact", is the author's inference (Q1). |
| NCTM 1980: "problem solving should be the focus…", "take full advantage of the power of calculators…" | R4 §1 [1] | Verbatim |
| Ellington 2003: 54 studies, "did not hinder…", "an integral part of testing and instruction" | R4 §1 [4] | Verbatim |
| Hembree & Dessart: "Sustained calculator use in Grade 4 appears to hinder…" | R4 §1 [3] | Verbatim |
| Disanalogies (deterministic vs fluently wrong; "math by hand" layer) | R4 §5 items 1, 3; STRATEGY_BRIEF §3.6 | Traced |
| NTSB Asiana 214: "inadequately described in Boeing's documentation … mode error" | R4 §2 [14] | Verbatim |
| FAA PARC/CAST 2013: "sometimes rely too much…", "Autoflight mode confusion errors continue to occur" | R4 §2 [15] | Verbatim |
| Parasuraman & Manzey 2010: "cannot be overcome with simple practice", "cannot be prevented by training or instructions" | R4 §2 [11] | Verbatim |
| "When output disappoints … none of which involve changing the prompt at all" | src_aies_stack.txt l.1005–1015 | Paraphrase of own document |
| Anthropic AI Fluency 4Ds (Feller, Dakan) | R1 l.13, l.52 | Traced |
| Karpathy "agentic engineering", Feb 2026, The New Stack | R1 l.17, l.51 | Traced |
| Nate B. Jones, intent engineering, Prompt Kit 14 Feb 2026; "the credit is his" | R1 l.16, l.49; src_aies_stack.txt l.839 ("suggested the existence and need of the intent engineering layer") | Traced. R1 says the *coiner* is unverified, but crediting him for the layer is supported by the Stack doc. |
| Rieseberg, 13 Oct 2026, Speed/Altitude/Depth/Range | src_rieseberg_ambition.md l.1–25 | Traced |
| "Intelligence is now cheap, but judgment is rare." | src_ai101_slides.txt l.207 | Henrique's own line |

No `[source needed]` markers were needed or present. The essay body is about 1,150–1,170 words (PRD: 900–1,200). It is written in the first person with no hype words.

### Content trace: stances (word-for-word spot-check against src_archetypes_v3.md)

| Stance | Expectation | Why it stays hidden | Result |
|---|---|---|---|
| Tutor | identical | identical | PASS |
| Mirror | identical | identical | PASS |
| Adversary | identical | identical | PASS |
| Librarian | identical | identical | PASS |
| Simulator | identical | identical | PASS |

- The other 9 were read in full. The Interpreter, Executor and Miner are lightly condensed, with em-dash asides dropped, and keep their meaning.
- The Oracle and Genie cards use §II ("zero-sum archetypes").
- Load-bearing layers match MODE_FLUENCY_MATRIX.md for all 14, and so do the matrix-page rows (expectation, layer, failure and guardrail, all verbatim).
- The consumption/construction tags match the v3 table. The exception is the "Hinge" label (defect 2). Adversary, Simulator and Scribe are correctly marked "Not placed".

### Diagnostic paths exercised through the UI (r3.js, 390 px)

| Path | Answers | Result | Watch next |
|---|---|---|---|
| P1 | answer → oracle; new; assistive; speed; prompt; none | Oracle / Judgment | 101 (copy button: "Copied.", clipboard text verified) |
| P2 | make → executor; agents; continuous; altitude; self; same | Executor / Harness + Judgment | 401 + "501 coming" (`review-diagnose-P2-390.png`) |
| P3 | think → ideas → miner; daily; directed; range; context; source | Miner / Context (writing), 8 questions | 301 (`review-diagnose-P3-390.png`) |
| P4 | understand → interpreter; months; autonomous; depth; evaluation; person | Interpreter / Evaluation | 401 |
| P5 | think → ideas → muse; months; assistive; speed; prompt; fresh | Muse / (none) | 201 |
| P6 | think → therapist; daily; directed; speed; intent; model | Therapist / Judgment | 101 |
| P7 | make → executor; daily; **assistive**; speed; prompt; same | Executor / Harness + Judgment | 401, **with a contradictory reason** (defect 5) |

I also checked these behaviours:
- **Back:** going back twice from the Ideas branch restores the earlier choices, and changing the first answer re-routes correctly (the result was Librarian).
- **Empty submit:** shows "Choose one option to continue." in a `role=alert` element.
- **Keyboard:** Enter advances the form and moves focus to the new legend.

## 2. Defects, ranked (factual → functionality → accessibility → copy/tone → design)

**Factual errors or inaccurate content** (none invented)

1. **learn.html privacy claim is inaccurate.** The page says "Videos are linked, not embedded: nothing loads from YouTube until you click. Thumbnails are served by YouTube's image host." The thumbnails load from `i.ytimg.com` (YouTube/Google) as soon as the page opens. `r1.js` logged 3–4 requests per load, so something does load from YouTube before any click, and the sentence contradicts itself. *Moderate.*
2. **stances.html applies the v3 term "hinge" to the Executor.** The card tag and the "Hinge (both forms)" filter put the Executor there. v3 §IV reserves "hinge" for the Interpreter and calls the Executor "the passive extreme". It is listed in both columns, but as a boundary case, not a hinge. The page's own closing paragraph repeats v3 correctly, so the tag and the text disagree. *Minor.*
3. **index.html §1 maps artefacts to axes incorrectly.** It says "The curriculum, the Stack, the Specifying guide and the Stances are not four separate things. They are four axes of one space." The cards directly below show that the fourth axis (Ambition) is Felix Rieseberg's, and that the Stack and the Specifying guide feed Structure and Autonomy. The wording comes from STRATEGY_BRIEF §0. *Minor.*
4. **stances.html omits part of two v3 guardrails.** These are omissions, not inventions:
   - The Executor card leaves out the structural harness from v3: "plan before action, checkpoints at intermediate states, an explicit deviation report … nothing consequential ships uninspected". It appears only on the matrix page.
   - The Miner card leaves out "the mined idea is ore, never a citation; nothing mined enters anything you stake something on until it has survived an independent check."

   These are the two stances where v3 says the guardrail is the point. *Minor.*

**Broken functionality**

5. **The diagnostic contradicts the user on Executor + Assistive or Directed paths.** On P7, "Watch next" says "You are handing over work you don't watch. 401 is about the harness…" The same result screen also says "You chose the Executor stance but you watch most of the work." The cause is `site.js` `computeResult`: any stance with a harness layer gets the "don't watch" reason whatever the autonomy answer. This affects every non-"new" Executor path with assistive or directed autonomy. *Moderate.*
6. **The matrix interaction is invisible at phone width.** The PRD says clicking a stance should highlight its layer in a mini stack. At 390 px the mini stack is `position: static` above the table. After clicking Translator, the lit Context layer is about 3,975 px above the viewport (`r6.js`; `review-matrix-click-translator-390.png`), so the user sees only the row tint. At 1280 px the stack is sticky and works (`review-matrix-click-translator-1280.png`). Clicking a layer on mobile has the same problem in reverse, because the lit rows are far below. *Moderate.*
7. **The diagnostic's progress total changes mid-quiz.** On the Ideas branch the counter goes from "Question 2 of 7" to "Question 3 of 8". *Minor.*

**Accessibility**

8. **One token pair fails 4.5:1 contrast in light mode.** `--muted` #54574f on `--layer-5` #cfc7b2 is **4.37:1**. It is used for small text in two places:
   - "What to become while doing" on the matrix Coherence layer button (0.78 rem), found by `r4.js`.
   - The 13-unit italic subtitle in the Stack SVG.

   `--accent` on `--layer-5` is 4.07:1. It is not used as text today, but the token set allows it. Dark mode passes everywhere (lowest is 4.78). The builder's report states "every text/background token pair is at least 5.2:1", but the layer tokens were not included in that check. *Minor to moderate.*
9. **Heading levels skip from h1 to h3.** On stances.html the 14 stance cards are h3 with no h2 above them, and learn.html's course cards are the same. Screen-reader heading navigation shows a gap. *Minor.*

**Copy and tone.** There are zero hits for revolutionary, unlock, supercharge or common hype words. The only matches were "Powerful Ideas" (Papert's book title) and "no magic in it" (verbatim v3).

10. **Typo in the diagnostic result and copied text.** It reads "Continuous: **aI** runs as a background service" (`site.js`, `DATA.autonomy.continuous.how`), and it appears on any Continuous path, for example P2. *Minor.*
11. **The diagnostic result uses developer jargon.** For Autonomous mode the result reads "you assign, AI executes, **you review the PR**", but the question the user answered said "I review the result". "PR" means nothing to the PRD's non-technical audience. *Minor.*
12. **Essay footnotes are out of order.** In-text numbering runs [10] → [14] → [11] [12] [13], because Rieseberg is cited before 4D, Karpathy and Jones while the source list is numbered in a different order. *Minor.*

**Design**

13. **Home compass labels are too small on phones.** At 390 px the labels (STANCE, STRUCTURE, AUTONOMY, AMBITION) render at about 9 px, because the SVG viewBox is 504 units wide and is scaled to 358 px. The labels carry meaning (the four axes), and the SVG `desc` covers screen readers but not sighted readers. *Minor.*

### Questions for Henrique (not counted as defects)

- **Q1.** The essay says the METR perception gap "is the part that survives". The Feb 2026 update in R4 reports no new perception data. Keep this as an opinion, or soften it to "the 2025 result showed a gap…"?
- **Q2.** In the diagnostic, the "what did you do first when it disappointed you" question offers only Prompt, Context, Intent, Evaluation and "did it myself". The Oracle, Therapist, Mirror and Executor lean on Judgment, Coherence or Harness, so they can never get the "right layer, good instinct" note. Is that intended?
- **Q3.** In the diagnostic, the experience question only changes the output when the answer is "new". The other three answers have no effect on the result. Is that intended?
- **Q4.** The `site/` folder holds `_qa/` screenshots: 2.65 MB from the builder, plus about 3.3 MB of `review-*.png` from this review. The README's Actions workflow deletes `_qa`, but its "rename to `docs/`" option would ship it and break the 2 MB metric. Delete `_qa` before deploy, or gitignore the images?
- **Q5.** The matrix row order differs from MODE_FLUENCY_MATRIX.md. The source leads with Oracle, Genie, Interpreter, Executor and Miner; the site uses the v3 pantheon order. The content is identical. Which order is canonical?

## 3. Three things that work well (keep these)

1. **The essay's sourcing discipline.** All 14 citations resolve to research files, and the quotes are verbatim. The METR figure is handled honestly (dated, then corrected with METR's own words), and the S&P figure says outright that it is "verified through press coverage only". This is the strongest page on the site and the clearest proof that the practice is careful.
2. **Fidelity of the framework text, with visible provenance.** Stance expectations and hidden-reasons are verbatim from v3, and the Stack table is verbatim from the Reference Map. Each card says whether its cardinal rule comes from v3 or the Matrix guardrail, and the three unplaced stances are labelled "Not placed" rather than guessed. The autonomy table keeps Gwin's "Autonomous + Spec" finding, and Rieseberg is credited by name, date and URL on three pages.
3. **Solid, accessible vanilla engineering.** There are zero console errors on 36 loads and no horizontal scroll, and the header, footer and `<head>` are byte-identical across pages (apart from `aria-current`). The site is 176 KB with no external JS. The diagnostic exposes an enumeration hook, so every path can be proven to work. It uses fieldset/legend, aria-live progress and focus moved to each question. The copy button falls back to a textarea, and localStorage is wrapped in try/catch. The filters use `aria-pressed` buttons with a live status line.

## Comparison with the builder's QA report (read after the above)

The builder's metric verdicts match mine. The builder's report missed these:
- defects 5, 6, 8, 10 and 11;
- the learn.html privacy sentence (defect 1).

Its contrast claim ("≥ 5.2:1 for every token pair") is incorrect for `--muted` on `--layer-5`. Its UI table shows Executor → 101, which comes from the "new" branch, so the contradictory path P7 was never exercised.
