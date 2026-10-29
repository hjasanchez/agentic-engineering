# Mode Fluency — handoff to the next Claude instance
*Written 2026-10-25 by the cloud session that did the work below. The next instance runs locally on Henrique's laptop in
`C:\Users\henri\Desktop\CCode\modefluency\`, inside a Claude project, with direct git push. Read this whole file first.*

## 1. Who and what
- **Owner:** Henrique Jr. Sanchez (he/him). GitHub `hjasanchez`. Full-time job in another field; this is a side project
  (5–10 h/week) that he hopes grows into the main job. Global, English-only. Solo. Philosophy: give the resources away,
  charge for their human time. The co-author on two older PDFs is his own pen name, not a second person.
- **The venture:** **Mode Fluency** ("Know which mode you're in"). A practice for working with AI deliberately, built on four
  of Henrique's artifacts: the **AI @ Workplace** video curriculum (101→601), the **AI-Human Engineering Stack** (5 layers +
  2 meta-functions), the **Specifying Work for AI** guide, and the **Fourteen Stances** (archetypes of human-AI interaction).
  The unifying model is four axes: Stance (what you expect), Structure (what you must supply), Autonomy (how much you
  watch), Ambition (how big the ask). The new artifact is the **stance × layer matrix** (MODE_FLUENCY_MATRIX.md).
- **Primary customer:** non-technical knowledge workers and SME teams; secondary: technical teams, leadership, individual learners.

## 2. Decisions already made (do not re-litigate unless Henrique asks)
| Decision | Outcome |
|---|---|
| Umbrella name | **Mode Fluency** (kept after a 120-name second round; "Agent Stance" was my recommendation, Henrique preferred Mode Fluency). Google's "AI Mode" search product shadows the term; mitigate with the essay and the matrix, not the two words. |
| Hero copy | "We taught everyone to press the buttons. Nobody taught them which problems the **machine** is for." Essay title: preview branch `preview/essay-mode-confusion` proposes "Mode Confusion" (R8); Henrique to decide. |
| Website design | **Direction C, "The Field"** (reactive particle field, two-voice typography: serif human / monospace system). Full nine-page build done. |
| Repo name | keep `agentic-engineering` for now (rides Karpathy's generic term); the site/branding is Mode Fluency. |
| Retitle | "AIES" → spell out "The AI-Human Engineering Stack" (AIES is an AAAI/ACM conference). "Archetypes" → "The Fourteen Stances" in headlines, archetypes kept in lineage. |
| Business model | Ladder: free videos → free diagnostic skill → (later) course → workshops from $1,200 → **Mode Fluency Assessment** from $3,500 (incl. EU AI Act Art. 4 "literacy measures" evidence pack) → Workflow Delegation Sprint → retainer. Skills are free (MIT). |
| Prices on the site | **None** (2026-10-29). The site says engagements are scoped in writing and points to hello@modefluency.com. Reference points stay internal (assessment from $3,500, workshop from $1,200). |
| Public copy | Never exposes build mechanics, agent housekeeping, internal file names, document versions or open decisions (2026-10-29). The footer "cat build.log" colophon is the one deliberate exception. |
| Hosting | Static site in `docs/`; recommended Cloudflare Pages connected to the repo (output dir `docs`), or GitHub Pages (main, /docs). Henrique buys the domain (modefluency.com and .dev were free on 2026-10-21; .ai/.io unverified). |
| Evidence rules | Every stat dated and sourced; METR's "19% slower" is history (METR's Feb 2026 update shows no slowdown); S&P 42% figure is March 2025. Banned words everywhere: revolutionary, unlock, supercharge, game-changing, seamless, empower. No testimonials, logos or invented numbers. |

## 3. Where everything is (after extracting the backup zip into the folder above)
```
modefluency/
  README-FIRST.txt
  repo-agentic-engineering/      <- THE SOURCE OF TRUTH. A git clone; branch meta-strategy, merged to main via PR #2 on 2026-10-25.
    README.md                    new newcomer README (three doors: learn / diagnose / go deeper)
    MODE_FLUENCY_MATRIX.md       the stance x layer artifact
    docs/                        the full website (Direction C, 9 pages, static, .nojekyll, README with deploy steps, _qa/ QA report + build log)
    LICENSES/                    MIT.txt and CC-BY-SA-4.0.txt; root LICENSE is the pointer
    skills/mode-fluency-diagnostic/   the free skill: SKILL.md (INTERVIEW/AUDIT/FIX/BUILD), references/, scripts/score_audit.py
                                 (+ scripts/tests/run_tests.py, 4/4 pass with python -I on Windows and python3 -I elsewhere), PROMPT_PACK.md, README.md, EVAL.md, examples/, evals/, LICENSE (MIT)
    strategy/                    STRATEGY_BRIEF.md, OFFER_BRAINSTORM.md, HANDOFF.md (this file; the older 2026-10-21 handoff is in git history), research/R1–R6 + Archetypes v3, qa/ (site_qa.py, the QA gate), site-review/,
                                 naming/ (N1–N4 + NAMING_ROUND2.md), design-directions/ (A, B, C single pages + DR_design_principles_2026.md),
                                 briefs/ (every agent spec, W1–W11), skill-review/ (blind reviews + EVAL_RERUN_2026-10-25.md)
    (original files: the 4 AI@Workplace PDFs, the two guide PDFs, the two protocol .md files, two diagrams)
  workspace/                     the cloud working folder: same content as strategy/ plus site/ (first prototype), site-c/ (= docs/),
                                 design-directions/, deliverables/ (the HTML pages that were published as Claude artifacts,
                                 make_artifact_variant.py), readme/, naming/, research/ (incl. third-party source texts: do NOT commit those)
```
GitHub: https://github.com/hjasanchez/agentic-engineering. `main` holds everything (merge commit 19db5e2, 2026-10-25); `meta-strategy`
is fast-forwarded to it and stays the working branch. **Live:** GitHub Pages from main /docs at https://hjasanchez.github.io/agentic-engineering/
(checked 2026-10-25: every page 200, 0 console errors). modefluency.com is live on it (DNS at Cloudflare) since 2026-10-28.

Published pages (private to Henrique's account; still valid for reading):
strategy brief https://claude.ai/artifact/P5ZSRJPmn2mFpJaF2gMFVS · naming round 2 https://claude.ai/artifact/FFh29UPzHQCKJAh93kW2bW ·
design compare https://claude.ai/artifact/J8Zapq3J1taJJ9hx7iqsxo · full site https://claude.ai/artifact/E6M4mYgTGMg4MAP3Bf9oaC ·
answers/README/offer https://claude.ai/artifact/8GfCvf7a8Kxq1VvVsGxT7W

## 4. What was done (chronological, condensed)
1. Research (5 parallel agents): competitive landscape, market + monetization (EU AI Act Art. 4 amended July 2026: "take measures to support" literacy, still binding on SMEs), naming collisions, analogy evidence (calculators in math ed, aviation automation, Papert/computational thinking, AI deskilling), footprint baseline (71 stars, 441 video views, YouTube channel is hydroponics; PonicLabs is a separate agritech brand).
2. Strategy brief + the matrix. First prototype site (editorial, 9 pages), blind-reviewed and fixed.
3. Naming round 2 (120 candidates, 32 cleared). Three animated design directions built in parallel and compared. Henrique chose C and kept the name.
4. Full nine-page site in Direction C; blind review (0 high, 4 medium, 14 low) and fix pass; 123/123 checks: 72 clean loads, lowest contrast 4.98:1, 26,880/26,880 diagnostic paths, readable without JS, 330 KB.
5. The diagnostic skill; blind review (4 high, 9 medium, 7 low) and fix pass with rulings: autonomy must be set from cited evidence; binding constraint = lowest weak cognitive layer; Evaluation/Harness ❌ at Autonomous+ = "blocking gap"; a setup outside scope is ◻️ not ❌; the script rejects fabricated citations (test file with 16 planted defects fails as it should).
6. New README, offer brainstorm, hosting + GitHub guidance. Branch published via GitHub Desktop.
7. **2026-10-25 (local session):** decisions recorded; license split; five cards restored; pen-name credit removed; `docs/_qa/blind-review.md`
   deleted; reusable QA gate `strategy/qa/site_qa.py` (97/97, build log rewritten from measurement); blind review of the edits and fix pass;
   skill re-run blind on 3 eval cases (9/9) and Windows fixes (UTF-8 output, `-X utf8`, audit JSON outside scope); R6 one-off offers research;
   PR #2 merged; GitHub Pages enabled and verified.
8. **2026-10-28:** modefluency.com on Cloudflare DNS, HTTPS enforced, Email Routing hello@ → Gmail, mailto on work.html (PRs #4, #5).
9. **2026-10-29 (overnight, Henrique's review of the live site):** PR #6 merged: prices off, work page reframed around engagements, hero
   "AI: Know which mode you're in", "dross" → "noise", method notes/version labels/build disclaimers removed, About trimmed (removed HTML
   archived in workspace/deliverables/), colophon framing, learn 501/601 scopes, Article 4 condensed, Stack diagram rebuilt to the published
   figure, regress paragraph aligned with the PDF (R7). Three preview branches for Henrique to judge (see §5). Research: R7 (stack page vs PDF),
   R8 (essay title options). Reviews: strategy/site-review/review-2026-10-29.md.

## 5. What is left (suggested order)
1. **Henrique's calls on the three preview branches** (each built from main, QA 97/97, pushed, not merged; open the worktree's docs/index.html
   locally or read the screenshots in workspace/previews/):
   - `preview/landing-doors` (workspace/worktrees/landing-doors): a three-door strip under the hero (learn 101→401 / find your stance / go deeper).
     Cost: the hero grows ~220 px at 1280×800 and the strip sits at the fold. Counter-argument and a cheaper one-line alternative in
     workspace/previews/landing-doors-NOTE.md.
   - `preview/essay-mode-confusion` (workspace/worktrees/essay-mode-confusion): the essay retitled "Mode Confusion" per R8; file name and URL unchanged.
     If accepted, also update HANDOFF §5.5, STRATEGY_BRIEF.md and briefs/00_SHARED_CONTEXT.md mentions of the old title.
   - `preview/stances-document` (workspace/worktrees/stances-document): THE_FOURTEEN_STANCES.md at the repo root, reviewed against the source,
     linked from README, stances.html, matrix.html, MODE_FLUENCY_MATRIX.md and LICENSE. Six source-vs-Matrix disagreements are stated neutrally
     inside it; Henrique should read §4.2 (the Collaborator) before publishing.
   To merge one: `gh pr create --base main --head preview/<name>` then merge; then fast-forward meta-strategy; then `git worktree remove` the folder.
   To drop one: `git branch -D preview/<name>` and `git push origin --delete preview/<name>`, and remove the worktree.
2. **Lexical substrate:** Henrique has two unpublished companion documents (The Lexical Substrate; Lexical Field Guide, July 2026) in his notes.
   The published Stack PDF does not mention them, so the site does not. When he publishes them, add the substrate band under the layers in the
   Stack diagram (its own §6 gives the placement) and a component card.
3. **Still open for Henrique:** the first harness-kit job family; whether to keep "stances" (site term) or go back to "archetypes" (his document's
   term; see the 2026-10-29 report); whether to polish the Oracle and Genie expectation sentences on the cards (his raw wording, verbatim).
4. **Real-device checks nobody has done:** Safari, Firefox, a real screen reader, battery/perf on a mid laptop, the particle field on a phone.
5. **Trademark sanity search** for "Mode Fluency" (USPTO had no hit on 2026-10-21; EU/WIPO not checked).
6. **Launch essay distribution:** the essay (title per item 1) on LinkedIn + a "From AI Fluency (4Ds) to Mode Fluency" piece; 5-post series; HN once.
   A "Mode Fluency" playlist and channel section on his main YouTube channel; the learn page links the playlist.
7. **Announce the skill** (repo README links it). Grader 04's units check is thin (EVAL_RERUN_2026-10-25).
8. **First one-off product:** the Workflow teardown (R6 shortlist #1): one-page offer and intake form; then the Article 4 evidence pack.
9. **Next content:** AI 501 as previewed on the learn page; the 90-day plan in STRATEGY_BRIEF.md §3.5.
## 6. How we worked (keep these conventions)
- **Orchestrator thin, agents do bulk work.** Every delegated task got a written brief in `strategy/briefs/` (Minimal Viable Spec or PRD: inputs by path, exact output path, binary acceptance criteria, non-goals, uncertainty policy, budget, tier, "no helpers"). Agents write to disk and return ≤15 lines. Important artefacts get a **blind review** by a fresh agent that did not build them, then a fix pass by the builder, then the orchestrator verifies deterministically (greps, tests, contrast scans) before committing.
- **Save early.** One run of three builders was lost to a cloud worker restart before any file was saved. Builders now write a working file within 15 minutes and keep a STATUS.md.
- **Site QA gate:** `python strategy/qa/site_qa.py docs --write-buildlog --out docs/_qa/qa-report.md` (about 3 minutes). It implements the recipe: Playwright, headless Chromium, file://, 390 and 1280 px, light/dark, reduced-motion on/off, JS off; console errors, failed requests, scrollWidth ≤ viewport; programmatic contrast scan of all text nodes ≥ 4.5:1; grep banned words; exhaustive diagnostic path check; footer build-log numbers must be real.
- **Voice:** Henrique's: plain, direct, dry humor allowed, no hype. Credit lineage generously (Anthropic 4D, Mollick, Nate B. Jones, Karpathy, Felix Rieseberg, CHI 2026 archetypes paper).
- **Pronouns:** he/him for Henrique (set by him on 2026-10-25; the local CLAUDE.md is the authority).

## 7. Known rough edges
- The three third-party article texts (Nadella, Rieseberg, Sivulka) live only in `workspace/research/src_*`; cite by URL, never commit.
- `workspace/` and `repo-agentic-engineering/strategy/` overlap; the repo copy is canonical.
- `place-files.sh` in the skill's evals showed as "changed" on Windows (executable bit); `core.fileMode false` is set in this clone, so it no longer does.
- `docs/_qa/` ships the QA report and build log with the site (the footer links to them); keep them current with `--write-buildlog`.
- Frame rates for the particle field were measured only in headless Chromium.
