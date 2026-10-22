# EVAL: how this skill was tested

Built 2026-10-22 by Claude (Opus, no helpers) from brief W4. Builder and tester were the same model, so treat the results
as a careful self-test, not an independent evaluation. The `evals/` cases exist so someone else can run one
(`claude plugin eval .` from this folder, real billed runs).

## 1. Structural checks

| Check | Result |
|---|---|
| Frontmatter (skill-creator `quick_validate.py`) | **Pass**: name and description only; description 832 chars (limit 1024) |
| Every file SKILL.md references exists; every `references/` file is linked from SKILL.md | **Pass**: 7 of 7 |
| Relative links in all Markdown files resolve | **Pass** |
| The six banned words listed in brief W4 §4, whole folder | **Pass**: 0 hits |
| Size | Skill text an agent or chat user loads (SKILL.md + references + script + PROMPT_PACK): **58.6 KB ≤ 60 KB**. Whole folder with examples, evals, README, EVAL: ~95 KB (see open question 4) |
| `scripts/score_audit.py` under `python3 -I`, standard library only | **Pass** on four paths: the dogfood JSON (exit 0, all 26 cited `path:line` exist in the repo); a broken fixture (exit 1, all 8 planted errors reported); a ◻️-below-weak case (binding "undetermined", candidate named); an unattended case (exception (a) fires) |

## 2. Dogfood 1: AUDIT of `hjasanchez/agentic-engineering` (`examples/audit-agentic-engineering.md`)

**Result:** Prompt ✅; Context, Intent, Judgment, Coherence, Evaluation ⚠️; Harness ❌; binding constraint Harness (exception
(a)); in the JSON, 26 `path:line` citations (all machine-checked) and 4 search logs. Four failure patterns traced to layers, including two a reader can verify in
seconds: the README links a folder that did not exist at the audited commit, and calls the skills MIT while the only
licence file is GPL-3.0.

**Against expectation.** The brief expected "several ❌/⚠️: this repo is docs". The audit found six of seven below ✅, but
graded Prompt ✅: `strategy/briefs/` holds 21 real agent briefs with acceptance criteria, non-goals, tradeoffs and
uncertainty policies. Grading it lower would have been the output-level error the protocol forbids, in reverse.

**What the run changed in the skill:** (1) pin the snapshot: the repo gained a commit *during* the audit; (2) decide what
the system is: documents *about* the Stack are content, not an implementation of it; (3) read every AI-workflow artifact in
full and sample bulk content explicitly; (4) the script now checks cited paths and line numbers exist (`--root`).

## 3. Dogfood 2: INTERVIEW, simulated ops manager (`examples/interview-ops-manager.md`)

**Result:** 14 questions, one per message; dominant stances Executor, Interpreter, Genie (each assigned by a boundary test,
with the Genie/Scribe call explained); autonomy Autonomous (two weeks); binding layer Evaluation (exception (a)); three
actions with done-checks; readback disagreement recorded.

**What the run changed:** (1) the question-count rule was inconsistent (13 core + 2 branches = 15 > 14): now one branch,
two only by dropping or folding a core question; (2) Action 2 duplicated Action 1 when the riskiest stance's guardrail is
the binding fix: Action 2 now takes the next stance; (3) the readback step now records disagreement rather than revising
by default.

## 4. Test prompts (`evals/`), walked through against SKILL.md

| Case | Walkthrough result |
|---|---|
| `refuses-grade-without-evidence` | Pass: §3 "Stop grading; offer INTERVIEW or a list of what to share" |
| `interview-asks-one-question` | **Failed first**: §1 made the agent ask "shall I run the interview?" before Q1. Fixed: a clear request starts the mode, framing and Q1 in one message |
| `audit-then-fix-waits-for-approval` | Pass: AUDIT is read-only, FIX needs per-item approval; the fixture's two by-hand fixes map to "rule ignored → check" in the harness loop. Fixture graded with the script: binding Prompt (`CLAUDE.md:3` "Be accurate.") |

## 5. Fresh-eyes read of SKILL.md

Re-read as a stranger running each mode. Found and fixed: §4 and §5 pointed to "Section 7" for definitions (they are in
§8); rule (b) was ambiguous when the lowest *non-strong* layer is ◻️; FIX could start from a user's list of mistakes,
which contradicts "FIX after AUDIT"; FIX did not forbid committing or pushing.

## 6. Where Henrique's sources disagree, and what the skill does

1. **Binding constraint.** The Audit Protocol asks for "the single component most limiting" (judgment); the Reference Map
   and the Stack give the dependency rule (lowest weak layer). The skill uses the dependency rule, as the brief says to
   prefer the Stack documents.
2. **Where the meta-functions sit.** No source places Evaluation and Harness in the dependency order. Exception (a)
   (they bind when autonomy is Autonomous or Continuous and they are ❌) is this skill's synthesis, drawn from the matrix
   (Executor → Harness + Judgment) and AI 401. It fired in both dogfoods. Needs a ruling.
3. **Fourteen stances vs "Collaborator".** Archetypes v3 recommends adopting a Collaborator, which is not one of the
   matrix's fourteen. Treated as the active form of the Genie.
4. **Boundary tests** exist in v3 only for Interpreter, Executor and Miner; the rest are derived and labelled as such.
5. **Three tiers vs four maturity levels** (Protocol vs Map): a mapping is defined in `maturity-map.md`.
6. **Harness loop rows.** The brief lists five; AI 401 has six ("lost track on a long task"). All six are included.

Left out on purpose: the Ambition axis (Speed/Altitude/Depth/Range), which no diagnostic step needs yet.

## 7. Not done

No independent-agent runs or baseline comparison (the brief allowed no helpers); no description-trigger optimisation
(`run_loop.py` needs `claude -p` runs); dogfood 2's user was simulated by the same model.
