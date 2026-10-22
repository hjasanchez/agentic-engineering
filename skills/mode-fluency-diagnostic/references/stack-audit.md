# Stack audit: the tightened Agent Audit Protocol

Source: *AI-Human Engineering Stack — Agent Audit Protocol* v1.0 (Mill & Sanchez, March 2026), tightened for
reproducibility: explicit grade criteria per component, a fourth grade (◻️ Not assessable), a search log for every ❌,
and a deterministic binding-constraint rule.

## 1. Rules

The evidence standard and grades are in SKILL.md §2 and §8. Three additions: gaps are the most valuable finding; grade the
mechanism, never the output ("the result looks good"); a system prompt that describes the task is Prompt, and becomes
Intent only when it says why, what to trade off and what to escalate.

## 2. Artifact sweep (run it; keep the log)

Search the scope for each class. Record every pattern you searched and what it returned.

| Class | Typical paths and names |
|---|---|
| Instruction files | `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.cursor/rules/*`, `.cursorrules`, `.windsurfrules`, system-prompt files, custom-GPT instructions |
| Skills, commands, plugins | `.claude/skills/*/SKILL.md`, `.claude/commands/`, `.claude-plugin/`, `skills/`, prompt libraries (`prompts/`, `templates/`) |
| Harness config | `.claude/settings*.json` (hooks, permissions), `.mcp.json`, `.codex/`, `.vscode/`, devcontainer, Makefile, task runners |
| Checks | `tests/`, `*_test.*`, `test_*.py`, lint configs, `.pre-commit-config.yaml`, `checks/`, `scripts/check_*` |
| CI | `.github/workflows/`, `.gitlab-ci.yml`, other pipeline files |
| State and memory | `STATE.md`, `STATUS.md`, `HANDOFF.md`, `notes/`, `progress.md`, `ROADMAP.md`, `OUTCOMES.md`, lessons-learned or mistake logs |
| Intent | `VALUES.md`, goals or principles docs, PRDs and briefs with non-goals, tradeoff statements, decision-authority or escalation rules |
| Decisions | ADRs, `docs/decisions/`, decision logs, CHANGELOG with reasons |
| Usage records | agent transcripts, briefs given to agents, commit messages and PR descriptions that mention AI, task logs |

Also read: the README, the top-level tree, and `git log --oneline -n 30` when the scope is a git repo.

## 3. Per-component checks

For each: the question it answers, what ✅ requires (all of it), what makes it ⚠️ or ❌, and the conflation trap.

**Prompt — what to do.** ✅ task instructions state role or purpose, scope, output format, constraints (what not to do)
and success criteria, consistently across similar tasks. ⚠️ structured in some places, bare imperatives ("do X") in others,
or format and constraints missing. ❌ no instructions to agents exist in scope. Signals of failure: repeated re-prompting
in logs. Trap: polished human documentation is not an agent prompt.

**Context — what to know.** ✅ a curated information architecture (instruction file that points to where things are),
persistent state that survives a restart (state or progress file the agent updates), separation of stable and dynamic
context, and a restart or compaction protocol. ⚠️ some of these, or present but not maintained. ❌ nothing persists between
sessions and nothing tells an agent where to look. Four operations to check: write, select, compress, isolate. Trap: a big
folder of documents is storage, not context engineering, unless something selects from it.

**Intent — what to want.** ✅ the why is written down *and reaches the agent doing the work*: goal hierarchy or ranked
priorities, pre-decided tradeoffs ("prefer X over Y"), decision boundaries (decide alone vs ask), escalation conditions.
⚠️ goals stated somewhere but not in what agents read, or no tradeoffs/escalation. ❌ only task descriptions. Watch for the
Klarna pattern: local metrics met, the real goal undermined. Trap: a mission statement in a README is ⚠️ at most.

**Judgment — what to doubt.** ✅ an uncertainty protocol (ask / flag / stop per situation), risk tiers, enforced scope
boundaries, and a *pre-implementation* pause (plan approval, spike, contract-first). ⚠️ judgment only after the fact
(review, tests, audits) or rules without enforcement. ❌ no uncertainty handling anywhere. Trap: three audit passes with no
pause before commitment is ⚠️, not ✅.

**Coherence — what to become.** ✅ behavioural guidelines loaded every session (style, architectural principles), and for
multi-agent work: ownership boundaries, coordination protocol, ensemble-level monitoring or drift detection. ⚠️ guidelines
exist but are not loaded automatically, or contradict each other across files. ❌ each session starts from nothing. For a
single agent or person, grade consistency across sessions. Trap: one consistent document style is not behavioural coherence.

**Evaluation — how to know (meta-function).** ✅ automated checks wired into the run (tests, lints, hooks, CI) that feed
failures back, at more than the output layer, with a human re-entry path and some way to say which layer failed. ⚠️ checks
exist but run only when someone remembers, or check only format. ❌ no check of any kind. Flag evaluation gaming explicitly
if seen (tests that pass by shortcut, assertions edited to green). Trap: QA reports written once are evidence of an
evaluation *event*, not an evaluation *mechanism*.

**Harness — where and how (meta-function).** ✅ a defined execution environment, tool access matched to the work,
permissions (ask before delete/send/spend), encoded orchestration, reproducible configuration in version control, undo
(version history). ⚠️ some of it, or the setup lives in one person's machine. ❌ no evidence of where or how agents run.
Trap: the presence of a git repo is undo, not a harness.

## 4. Report template

```
# Stack audit: <scope>, <date>
Scope: <paths in> · Out of scope: <paths> · Mode: read-only · Question the owner asked: <...>

## Summary
| Component | Grade | Maturity | Primary gap (one sentence) |
(Prompt, Context, Intent, Judgment, Coherence, Evaluation, Harness)

## Binding constraint
<component> — why it binds (rule in SKILL.md §8; name any exception used) and what it is costing.

## Component findings
### <Component>: <grade>
Evidence: <citations> · Gaps: <...> · Next step: <one action>

## Observed stances
| Usage record | Stance | Boundary test that decided it | Citation |
(or "Not assessable: no usage records in scope")

## Failure patterns → layer of origin
## Highest-leverage next step (one)
## What this audit could not see
## Search log
## What next
```

## 5. Audit JSON (for scripts/score_audit.py)

```json
{
  "scope": "path or description",
  "autonomy": "assistive|directed|autonomous|continuous|unknown",
  "components": {
    "prompt":     {"grade": "strong|partial|missing|not_assessable", "evidence": ["path:line ..."], "gap": "..."},
    "context":    {"...": "..."}, "intent": {}, "judgment": {}, "coherence": {}, "evaluation": {}, "harness": {}
  },
  "stances": [{"stance": "Executor", "evidence": ["path:line ..."]}]
}
```

`missing` requires at least one evidence entry starting `searched` (the search log). `not_assessable` requires a note in
`gap` saying what would make it assessable.
