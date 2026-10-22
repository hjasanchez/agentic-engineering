# Stack audit: hjasanchez/agentic-engineering, 2026-10-22

*Dogfood run of the AUDIT mode by Claude (Opus) following SKILL.md §5. Grades also in
[`audit-agentic-engineering.json`](audit-agentic-engineering.json), validated with
`python3 -I scripts/score_audit.py examples/audit-agentic-engineering.json --root <repo>` (exit 0; every cited
`path:line` exists).*

Scope: the whole repo at commit `31eadf4` (branch `meta-strategy`) · Out of scope: the workspace at `/home/user/meta-strategy`,
the claude.ai sessions, the PDFs' contents · Mode: read-only · Question: *how does this repo work with AI, and what one
change would help most?*

**Reading the scope.** Most of this repo is published documentation *about* the Stack. Documents that describe intent
engineering are not intent engineering, so the guides and slides count for nothing here. What is graded is the AI workflow
the repo itself records: the agent briefs in `strategy/briefs/`, the handoff and status files, the QA reports and scripts,
and the commit history (5 of 6 commits co-authored by Claude, `git log`).

## Summary

| Component | Grade | Maturity | Primary gap |
|---|---|---|---|
| Prompt | ✅ Strong | Intermediate | Short naming and design briefs have no acceptance criteria of their own |
| Context | ⚠️ Partial | Minimal–Intermediate | The context architecture lives outside the repo; nothing in it tells an agent where to start |
| Intent | ⚠️ Partial | Intermediate, gaps | Tradeoffs restated per brief; no standing ranked goals |
| Judgment | ⚠️ Partial | Minimal–Intermediate | Uncertainty policy in prose; no risk tiers; nothing enforced |
| Coherence | ⚠️ Partial | Minimal | README, licence and file tree already disagree; nothing detects it |
| Evaluation | ⚠️ Partial | Minimal | Good QA *events* (builder QA, blind review), no QA *mechanism* in the repo |
| Harness | ❌ Missing | Absent | No instruction file, config, hook or CI in the repo |

## Binding constraint

**Harness**, by exception (a) of SKILL.md §8: the work ran at the Autonomous level (`strategy/README.md:3` "drafted overnight
... with Claude orchestrating five research agents") and nothing in the repo says where or how those agents ran, what they
could touch, or which checks gate them. The lowest weak cognitive layer is Context, and that gap has the same cause: the
real workspace is `/home/user/meta-strategy` (every brief's inputs, e.g. `strategy/briefs/R1_competitive_landscape.md:6`),
and the repo receives exports of it. Until the workspace lives in the repo, no Context or Evaluation fix here can be re-run.

## Component findings

### Prompt: ✅ Strong
Evidence: research briefs follow a Minimal Viable Spec with acceptance criteria (`R1_competitive_landscape.md:26`), non-goals
(:33), tradeoffs (:35), uncertainty policy (:37) and self-verification (:39); the blind-review brief has the full structure
(`W2_blind_review.md:1–24`); short briefs layer on shared files (`N1_enterprise_register.md:2`). Gaps: `N1`–`N3` and
`DA`–`DC` define success only by count or by the common file. Next step: none needed before the binding constraint.

### Context: ⚠️ Partial
Evidence: one shared context file every agent reads first (`strategy/briefs/00_SHARED_CONTEXT.md:1`), kept current with dated
updates (:50, :58); a handoff file (`strategy/HANDOFF.md:1`); per-direction status files. Gaps: all inputs and outputs are
absolute paths outside the repo (`R1:6`, `N1:7`); source texts deliberately not committed (`strategy/README.md:12`); a stale
fact in the living file (`00_SHARED_CONTEXT.md:41` "Today is 2026-10-21"); `searched AGENTS.md, CLAUDE.md, notes/,
progress.md, lessons/mistake logs: none`. Next step: an entry file that maps the repo with repo-relative paths.

### Intent: ⚠️ Partial
Evidence: the why and the customer (`00_SHARED_CONTEXT.md:30–34`); decision boundaries, "[YOUR CALL]"
(`strategy/STRATEGY_BRIEF.md:6`) and "Decisions only you can make" (:262); per-brief tradeoffs ("Precision over coverage",
`R1:36`); intent reaches the executing agents because every brief loads the shared file. Gap: `searched VALUES.md, goals,
principles, ranked priorities: none`; when reach, revenue and rigour conflict, no standing ranking says which wins.
Next step: a five-line ranked goals block in the shared context.

### Judgment: ⚠️ Partial
Evidence: "A refusal plus a flag beats a guess" (`00_SHARED_CONTEXT.md:42–43`); read-only scope and "flag it as a question"
(`W2_blind_review.md:20, 23–24`); a real pre-implementation checkpoint: one concept page per direction for the owner to choose
before the full build (`D_design_common.md:6`). Gaps: no risk tiers; every boundary is prose an agent can ignore.

### Coherence: ⚠️ Partial
Evidence: one shared file and one brief template across agents. Drift already visible: `README.md:61` says skills are MIT,
`LICENSE:1` is GPL-3.0 and no MIT licence file exists; `README.md:34` links `skills/mode-fluency-diagnostic/`, absent at
`31eadf4`; briefs and reports name `site/` (`W2_blind_review.md:6`) where the repo has `docs/`; AIES vs Stack naming still
open (`strategy/HANDOFF.md:19`). Next step: a check that fails on broken relative links.

### Evaluation: ⚠️ Partial
Evidence: builder QA with 36 page loads (`docs/_qa/qa-report.md:1–14`) and an independent blind review that did not trust the
builder's report (`docs/_qa/blind-review.md:7`, brief `W2_blind_review.md:3`). Gaps: the QA script was "kept outside the repo"
(`docs/_qa/qa-report.md:4`); the committed one hard-codes the workspace path (`.../A-instrument/_qa/qa.js:5`);
`searched .github/workflows, tests/, .pre-commit-config.yaml, checks/: none`. Nothing caught the broken link above.

### Harness: ❌ Missing
Evidence: `searched AGENTS.md, CLAUDE.md, GEMINI.md, .claude/, .cursor/, .github/, .mcp.json, .codex/, Makefile: none`.
The harness that ran the work exists but is outside view: the push was refused for lack of a credential
(`strategy/HANDOFF.md:12`), and QA depends on a machine-specific Playwright path (`.../A-instrument/_qa/qa.js:2`).

## Observed stances

| Usage record | Stance | Boundary test that decided it | Guardrail present? |
|---|---|---|---|
| Research briefs R1–R5 | Librarian | the AI had to find the material | Yes: "Re-open every URL you cite" (`R1:40`) |
| Naming briefs N1–N3 + N4 | Miner | volume, no ranking, a separate later check (`N_naming_common.md:27`) | Yes: assay cold by a separate agent |
| Site and design builds (W1, D*) | Executor | a chain of steps never watched, reviewed at the end | Partly: deviation report asked (`W1_site_PRD.md:104`); no hooks |
| Blind review (W2) | Adversary | asked to find what is wrong (`W2_blind_review.md:3`) | Yes: defends the PRD |

Stances fit the matrix: an Executor-heavy workflow needs Harness and Judgment, and those are where this one is weakest.

## Failure patterns → layer of origin
1. Broken README link to the skill (`README.md:34`) → **Evaluation** (no link check), rooted in **Harness** (no CI).
2. Licence contradiction (`README.md:61` vs `LICENSE:1`) → **Coherence**: a decision (`HANDOFF.md:23`) reached one file, not the others.
3. `site/` vs `docs/` in briefs and reports → **Context**: workspace paths and repo paths diverged.
4. Push refused overnight (`HANDOFF.md:12`) → **Harness**: tool access did not match the job.

## Highest-leverage next step
Make the repo the workspace: add a root `AGENTS.md` (under 40 lines, `CLAUDE.md` pointing to it) that maps where briefs, state
and checks live with repo-relative paths and states the rules every brief now repeats. FIX would then add one check at a time
to a `checks/` folder, starting with broken relative links.

## What this audit could not see
The workspace at `/home/user/meta-strategy`, the session settings and transcripts, whether any check runs outside the repo,
and how often Henrique corrects the agents. Questions I would ask the owner (≤5): How often do you correct an agent's output,
and what is the most common correction? Which of the 2026-10-22 decisions has an agent already got wrong once?

## Search log
`find . -name` for AGENTS.md, CLAUDE.md, GEMINI.md, .github, .cursor, .cursorrules, .windsurfrules, .claude, .claude-plugin,
.mcp.json, .codex, .vscode, .pre-commit-config.yaml, Makefile, tests, notes, VALUES.md: none. `ls skills`: no such directory.
`find . -iname '*mit*'`: none. `git log`: 6 commits, 5 with `Co-Authored-By: Claude`. Briefs: `grep -c` for non-goals,
acceptance, uncertainty across 21 files.

## What next
> **What next.** Everything behind this diagnosis is free: the AI @ Workplace videos (101–401) and the Stack, Stances and
> Specifying guides at https://github.com/hjasanchez/agentic-engineering. Re-run this diagnostic in 30 days and compare.
> If you would rather have a human run it with your team, Henrique offers a paid Mode Fluency Assessment:
> https://www.linkedin.com/in/henriquejsanchez
