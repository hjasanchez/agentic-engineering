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
| Hero copy | "We taught everyone to press the buttons. Nobody taught them which problems the **machine** is for." Essay keeps the title "The Calculator Problem". |
| Website design | **Direction C, "The Field"** (reactive particle field, two-voice typography: serif human / monospace system). Full nine-page build done. |
| Repo name | keep `agentic-engineering` for now (rides Karpathy's generic term); the site/branding is Mode Fluency. |
| Retitle | "AIES" → spell out "The AI-Human Engineering Stack" (AIES is an AAAI/ACM conference). "Archetypes" → "The Fourteen Stances" in headlines, archetypes kept in lineage. |
| Business model | Ladder: free videos → free diagnostic skill → (later) course → workshops from $1,200 → **Mode Fluency Assessment** from $3,500 (incl. EU AI Act Art. 4 "literacy measures" evidence pack) → Workflow Delegation Sprint → retainer. Skills are free (MIT). |
| Hosting | Static site in `docs/`; recommended Cloudflare Pages connected to the repo (output dir `docs`), or GitHub Pages (main, /docs). Henrique buys the domain (modefluency.com and .dev were free on 2026-10-21; .ai/.io unverified). |
| Evidence rules | Every stat dated and sourced; METR's "19% slower" is history (METR's Feb 2026 update shows no slowdown); S&P 42% figure is March 2025. Banned words everywhere: revolutionary, unlock, supercharge, game-changing, seamless, empower. No testimonials, logos or invented numbers. |

## 3. Where everything is (after extracting the backup zip into the folder above)
```
modefluency/
  README-FIRST.txt
  repo-agentic-engineering/      <- THE SOURCE OF TRUTH. A git clone; branch meta-strategy published to GitHub (9 commits).
    README.md                    new newcomer README (three doors: learn / diagnose / go deeper)
    MODE_FLUENCY_MATRIX.md       the stance x layer artifact
    docs/                        the full website (Direction C, 9 pages, static, .nojekyll, README with deploy steps, _qa/ reports)
    skills/mode-fluency-diagnostic/   the free skill: SKILL.md (INTERVIEW/AUDIT/FIX/BUILD), references/, scripts/score_audit.py
                                 (+ scripts/tests/run_tests.py, 4/4 pass with python3 -I), PROMPT_PACK.md, README.md, EVAL.md, examples/, evals/, LICENSE (MIT)
    strategy/                    STRATEGY_BRIEF.md, OFFER_BRAINSTORM.md, HANDOFF.md (this file; the older 2026-10-21 handoff is in git history), research/R1–R5 + Archetypes v3,
                                 naming/ (N1–N4 + NAMING_ROUND2.md), design-directions/ (A, B, C single pages + DR_design_principles_2026.md),
                                 briefs/ (every agent spec), skill-review/ (blind-review transcripts)
    (original files: the 4 AI@Workplace PDFs, the two guide PDFs, the two protocol .md files, two diagrams, LICENSE GPL-3.0)
  workspace/                     the cloud working folder: same content as strategy/ plus site/ (first prototype), site-c/ (= docs/),
                                 design-directions/, deliverables/ (the HTML pages that were published as Claude artifacts,
                                 make_artifact_variant.py), readme/, naming/, research/ (incl. third-party source texts: do NOT commit those)
```
GitHub: https://github.com/hjasanchez/agentic-engineering, branch `meta-strategy` at commit 6d012bc (tree identical to local).
`main` is untouched. Nothing is merged yet. Pages is not enabled yet.

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

## 5. What is left (suggested order)
1. **Merge and go live:** open the PR for `meta-strategy` → merge to `main` → Settings → Pages (main, /docs) or Cloudflare Pages. Verify the live URL on a phone and a laptop. Then delete `docs/_qa/blind-review.md` before or after (the site README says to).
2. **Real-device checks nobody has done:** Safari, Firefox (scroll-driven animations are behind @supports), a real screen reader, battery/perf on a mid laptop. Fix what shows.
3. **Decisions Henrique made on 2026-10-25** (apply, do not re-ask): (a) license: code and skills MIT, documents/slides/videos
   CC BY-SA 4.0, root LICENSE points to `LICENSES/`, README and site footer say "Code MIT · documents CC BY-SA 4.0", earlier GPL-3.0
   releases stay as published; (b) restore the full Archetypes v3 text on the five abridged cards (Oracle, Genie, Interpreter,
   Executor, Miner); (c) contact stays hello@modefluency.com: domain via Namecheap, DNS on Cloudflare, Cloudflare Email Routing
   to his Gmail, placeholder text until the forward works; (d) remove the pen-name co-author credit from the site, README, matrix and all
   other repo text, PDFs stay as published; (e) Mode Fluency videos go on his existing main YouTube channel in a "Mode Fluency"
   playlist and channel section, the site links the playlist; (f) assessment stays "from $3,500", first two or three clients may
   get $2,500 for a written case study, agreed in conversation only; (g) no team edition for now, Sprint off the site and offered
   only as an upsell to assessment clients. **Still open:** the first harness-kit job family (the one Henrique knows from his day job).
4. **Domain:** register modefluency.com (+ .dev; check .ai/.io at a registrar); a trademark sanity search (EU/WIPO blocked automated checks; USPTO had no hit).
5. **Launch essay distribution:** "The Calculator Problem" on LinkedIn + a "From AI Fluency (4Ds) to Mode Fluency" piece; 5-post series; HN once. Playlist/channel split for the AI videos.
6. **Skill hardening:** an independent agent has not re-run the skill since its fix pass; run the 3 eval cases in `skills/mode-fluency-diagnostic/evals/` with a fresh agent; then announce the skill (repo README already links it).
7. **Next content:** AI 501 (local agents) as planned; the 90-day plan in STRATEGY_BRIEF.md §3.5.
8. Later products per OFFER_BRAINSTORM.md: team edition of the diagnostic, harness starter kits per job family, evals starter.

## 6. How we worked (keep these conventions)
- **Orchestrator thin, agents do bulk work.** Every delegated task got a written brief in `strategy/briefs/` (Minimal Viable Spec or PRD: inputs by path, exact output path, binary acceptance criteria, non-goals, uncertainty policy, budget, tier, "no helpers"). Agents write to disk and return ≤15 lines. Important artefacts get a **blind review** by a fresh agent that did not build them, then a fix pass by the builder, then the orchestrator verifies deterministically (greps, tests, contrast scans) before committing.
- **Save early.** One run of three builders was lost to a cloud worker restart before any file was saved. Builders now write a working file within 15 minutes and keep a STATUS.md.
- **Site QA recipe** (reuse): Playwright, headless Chromium, file://, 390 and 1280 px, light/dark, reduced-motion on/off, JS off; console errors, failed requests, scrollWidth ≤ viewport; programmatic contrast scan of all text nodes ≥ 4.5:1; grep banned words; exhaustive diagnostic path check; footer build-log numbers must be real.
- **Voice:** Henrique's: plain, direct, dry humor allowed, no hype. Credit lineage generously (Anthropic 4D, Mollick, Nate B. Jones, Karpathy, Felix Rieseberg, CHI 2026 archetypes paper).
- **Pronouns:** he/him for Henrique (set by him on 2026-10-25; the local CLAUDE.md is the authority).

## 7. Known rough edges
- The three third-party article texts (Nadella, Rieseberg, Sivulka) live only in `workspace/research/src_*`; cite by URL, never commit.
- `workspace/` and `repo-agentic-engineering/strategy/` overlap; the repo copy is canonical.
- `place-files.sh` in the skill's evals shows as "changed" in GitHub Desktop on Windows (executable bit). Harmless; commit or ignore.
- `docs/_qa/` ships QA reports with the site; harmless but delete `blind-review.md` before launch if you prefer.
- Frame rates for the particle field were measured only in headless Chromium.
