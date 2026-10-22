# EVAL: how this skill was tested

Built 2026-10-22 by Claude (Opus, no helpers) from brief W4. Builder and tester were the same model, so treat the results
as a careful self-test; an independent blind review followed (§8). The `evals/` cases exist so someone else can run one
(`claude plugin eval .` from this folder, real billed runs).

## 1. Structural checks

| Check | Result |
|---|---|
| Frontmatter (skill-creator `quick_validate.py`) | **Pass**: name and description only; description 832 chars (limit 1024) |
| Every file SKILL.md references exists; every `references/` file is linked from SKILL.md | **Pass**: 7 of 7 |
| Relative links in all Markdown files resolve | **Pass** |
| The six banned words listed in brief W4 §4, whole folder | **Pass**: 0 hits |
| Size (after the fix pass) | Text an agent or chat user loads (SKILL.md + references + PROMPT_PACK): **58.3 KB ≤ 60 KB**. The script (10.7 KB) is run, not loaded |
| `scripts/score_audit.py` under `python3 -I`, standard library only | First version: four paths passed. Replaced in the fix pass; see §8 |

## 2. Dogfood 1: AUDIT of `hjasanchez/agentic-engineering` (`examples/audit-agentic-engineering.md`)

**Result (first run):** Prompt ✅; five ⚠️; Harness ❌; binding Harness by the then exception (a). **After the fix pass:**
Harness ◻️, binding Context, no blocking gap (§8). Four failure patterns traced to layers, including two a reader can verify in
seconds: the README links a folder that did not exist at the audited commit, and calls the skills MIT while the only
licence file is GPL-3.0.

**Against expectation.** The brief expected "several ❌/⚠️: this repo is docs". The audit found six of seven below ✅, but
graded Prompt ✅: `strategy/briefs/` holds 21 real agent briefs with acceptance criteria, non-goals, tradeoffs and
uncertainty policies. Grading it lower would have been the output-level error the protocol forbids, in reverse.

**What the run changed in the skill:** (1) pin the snapshot: the repo gained a commit *during* the audit; (2) decide what
the system is: documents *about* the Stack are content, not an implementation of it; (3) read every AI-workflow artifact in
full and sample bulk content explicitly; (4) the script now checks cited paths and line numbers exist (`--root`).

## 3. Dogfood 2: INTERVIEW, simulated ops manager (`examples/interview-ops-manager.md`)

**Result (first run):** 14 questions; dominant stances Executor, Interpreter, Genie; autonomy Autonomous; binding layer
Evaluation. **After the fix pass:** binding Prompt (❌ under the new rubric), Evaluation ❌ as a blocking gap (§8).

**What the run changed:** (1) the question-count rule was inconsistent (13 core + 2 branches = 15 > 14): now one branch,
two only by dropping or folding a core question; (2) Action 2 duplicated Action 1 when the riskiest stance's guardrail is
the binding fix: Action 2 now takes the next stance; (3) the readback step now records disagreement rather than revising
by default.

## 4. Test prompts (`evals/`), walked through against SKILL.md

| Case | Walkthrough result |
|---|---|
| `refuses-grade-without-evidence` | Pass: §3 "Stop grading; offer INTERVIEW or a list of what to share" |
| `interview-asks-one-question` | **Failed first**: §1 made the agent ask "shall I run the interview?" before Q1. Fixed: a clear request starts the mode, framing and Q1 in one message |
| `audit-then-fix-waits-for-approval` | Pass: AUDIT is read-only, FIX needs per-item approval. Grader 04 was found inconsistent with the harness-loop table in the blind review (H3); both now say unattended work gets the line and the check |

## 5. Fresh-eyes read of SKILL.md

Re-read as a stranger running each mode. Found and fixed: §4 and §5 pointed to "Section 7" for definitions (they are in
§8); rule (b) was ambiguous when the lowest *non-strong* layer is ◻️; FIX could start from a user's list of mistakes,
which contradicts "FIX after AUDIT"; FIX did not forbid committing or pushing.

## 6. Where Henrique's sources disagree, and what the skill does

1. **Binding constraint.** The Audit Protocol asks for "the single component most limiting" (judgment); the Reference Map
   and the Stack give the dependency rule (lowest weak layer). The skill uses the dependency rule, as the brief says to
   prefer the Stack documents.
2. **Where the meta-functions sit.** No source places Evaluation and Harness in the dependency order. Ruled in the fix
   pass: they never bind; at Autonomous or Continuous a ❌ is a blocking gap to fix first (§8).
3. **Fourteen stances vs "Collaborator".** Archetypes v3 recommends adopting a Collaborator, which is not one of the
   matrix's fourteen. Treated as the active form of the Genie.
4. **Boundary tests** exist in v3 only for Interpreter, Executor and Miner; the rest are derived and labelled as such.
5. **Three tiers vs four maturity levels** (Protocol vs Map): a mapping is defined in `maturity-map.md`.
6. **Harness loop rows.** The brief lists five; AI 401 has six ("lost track on a long task"). All six are included.

Left out on purpose: the Ambition axis (Speed/Altitude/Depth/Range), which no diagnostic step needs yet.

## 7. Not done

No independent-agent runs or baseline comparison (the brief allowed no helpers); no description-trigger optimisation
(`run_loop.py` needs `claude -p` runs); dogfood 2's user was simulated by the same model.

## 8. Fix pass after the blind review (`_review/blind-review.md`: 4 high, 9 medium, 7 low)

All high and medium defects fixed; lows L1–L7 fixed. Rulings from the coordinator applied as given.

| Defect | Change |
|---|---|
| H1 autonomy undefined in AUDIT | §5 step 4 sets autonomy from cited evidence, asks once, else ◻️ (no blocking gap); autonomy line in both templates; JSON needs `autonomy_evidence` |
| H2 harness outside view graded ❌ | §2 and `stack-audit.md` §3: a component shown to exist outside scope is ◻️; example re-graded and regenerated |
| H3 grader 04 vs harness loop | `harness-loop.md`: unattended work gets both the instruction line and the check; grader 04 reworded to that rule |
| H4 references disagree; tie rule | "give the lower grade" deleted; `stack-audit.md` §3 wins, stated in both files and SKILL §8; manual review only = ⚠️; a weak artifact is ⚠️, never ❌ |
| M1 no default without a user | §1: default scope and question, stated in the report; FIX/BUILD still stop at approval |
| M2 question count | 12–14 everywhere; second branch rule made non-empty; floor 11 on request |
| M3 Prompt binds by default | Prompt judged on the work that mattered; Strong reachable by structured briefs for important tasks |
| M4 Judgment vs Evaluation | Q9 now asks about doubt *before* relying on work; rubric rows separated |
| M5 Prompt ⚠️ below Minimal | ⚠️ spans "some Minimal elements" to Intermediate with gaps |
| M6 all layers ✅ | §8 and script: "no binding constraint; next autonomy level, with its checks"; meta-functions never bind |
| M7–M9 script grounding | Rewritten: every entry must start with a citation form; `path:line[-end] "quote"` checked against the line (whitespace-normalised); extensionless paths; absolute or escaping paths rejected; search logs must name a path or pattern; `[A<n>]` and quotes checked with `--transcript`; stance names and citations checked; autonomy enum enforced |
| L1–L7 | No tracebacks (exit 1/2 as documented); PROMPT_PACK stands alone and carries the new rules; maturity in the per-component block; tie order for boundary tests; Harness Missing criterion; "What next" fits solo users and points to the videos; one arch sentence removed |

**Tests (all `python3 -I`):** `scripts/tests/run_tests.py` passes 4/4: `must_pass.json` exits 0 (binding Prompt, blocking
gap Evaluation); `must_fail.json` exits 1 and reports all 16 planted defects (the reviewer's "trust me", bare "searched",
fabricated quote, extensionless path, cite not at the start, string evidence, absolute path, invalid autonomy, invalid
stance, plus root escape, unknown `[A9]`, fabricated interview quote, pattern-free search log); `--root` without a value
exits 2; a non-audit JSON exits 1, no traceback. A one-word change to a quote in the example JSON is caught.

**Dogfoods re-run.** AUDIT: the regenerated JSON validates against the repo (exit 0, every quote found on its line);
autonomy Autonomous (`strategy/README.md:3`); Harness ◻️; binding Context; no blocking gap; the next step (an `AGENTS.md`
map with repo-relative paths) is unchanged and now matches the binding layer. INTERVIEW: answers extracted to a transcript
JSON and graded with `--transcript` (exit 0, all 17 answer citations and quotes found); binding Prompt; blocking gap
Evaluation; plan reordered (blocking gap, binding layer, harness-loop fix).

**Left:** no independent re-run after the fixes; the dogfood interview user is still simulated by the builder.

