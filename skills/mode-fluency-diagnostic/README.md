# Mode Fluency Diagnostic

**Know which mode you're in.** A free skill you run with your own AI. It interviews you, or reads your repo and workflow
files, and tells you which *stance* you take toward AI, which *layer* is holding you back, and the one change that would
help most. With your approval, item by item, it can also make the fixes.

It is the self-serve version of the method in Henrique Jr. Sanchez's *AI-Human Engineering Stack*, *The Fourteen Stances*
and *AI @ Workplace* series. Every finding it reports cites a file, a line or one of your answers; where it cannot see the
evidence it says "Not assessable" instead of guessing.

**Who it is for:** anyone who uses ChatGPT, Claude, Gemini or Copilot at work and still gets burned (INTERVIEW, in a chat
window, no files); teams with agents, instruction files or a repo (AUDIT, then FIX and BUILD).

| Mode | You need | You get |
|---|---|---|
| INTERVIEW | 10 minutes | Stance Profile, autonomy level, binding layer, a 30-day plan of three actions |
| AUDIT | a repo, folder or workflow docs | seven-component Stack report, evidence for every grade, the binding constraint, one next step |
| FIX | an AUDIT | up to five fixes, each approved by you, smallest reversible change, a deviation report |
| BUILD | an approved fix that needs a tool | an Intent Doc first, then a small check, template or form, shown working |

## Install (60 seconds)

**Claude Code** (the skill format is the open Agent Skills standard):

```bash
git clone --depth 1 https://github.com/hjasanchez/agentic-engineering /tmp/ae
cp -r /tmp/ae/skills/mode-fluency-diagnostic ~/.claude/skills/        # for you, in every project
# or: cp -r /tmp/ae/skills/mode-fluency-diagnostic .claude/skills/   # for one project, shared with the team via git
```

Then say: *"diagnose my AI workflow"*, *"audit this repo for how we use AI"* or *"which stance am I in?"*.

**Codex, Gemini CLI, Copilot (agent mode) and other agents that read an instruction file:** copy the folder into your repo
(e.g. `tools/mode-fluency-diagnostic/`) and add one line to `AGENTS.md` (or `GEMINI.md`, `.github/copilot-instructions.md`):

```
When asked to diagnose or audit how we work with AI, read tools/mode-fluency-diagnostic/SKILL.md and follow it.
```

**Cursor:** copy the folder as above and add `.cursor/rules/mode-fluency.mdc`:

```
---
description: Diagnose or audit how we work with AI (Mode Fluency)
alwaysApply: false
---
Read tools/mode-fluency-diagnostic/SKILL.md and follow it exactly.
```

**Plain chat (ChatGPT, Gemini, Copilot chat):** use [PROMPT_PACK.md](PROMPT_PACK.md): one copy-paste prompt per mode.

## Example sessions (both real runs, in `examples/`)

**AUDIT of this repository** ([full report](examples/audit-agentic-engineering.md)). Prompt ✅, Context, Intent, Judgment,
Coherence and Evaluation ⚠️, Harness ❌. Binding constraint: Harness, because the overnight agent work ran in a workspace the
repo does not contain. Two findings a reader can check in seconds: the README links a folder that did not exist at the
audited commit, and it calls the skills MIT while the only licence file is GPL-3.0.

> **Harness: ❌ Missing.** Evidence: `searched AGENTS.md, CLAUDE.md, GEMINI.md, .claude/, .cursor/, .github/, .mcp.json,
> .codex/, Makefile: none`. The harness that ran the work exists but is outside view: the push was refused for lack of a
> credential (`strategy/HANDOFF.md:12`).

**INTERVIEW of an operations manager** ([full profile](examples/interview-ops-manager.md); the user is simulated). Dominant
stances Executor, Interpreter, Genie; autonomy Autonomous for two weeks; binding layer Evaluation.

> **A10** "The COO asked why K was on track. I apologised, then typed to the agent 'be more careful and check all sources'.
> IT told me later it can't read Teams at all." → She re-prompted for what was a Context gap that only an Evaluation check
> would have exposed. Action 1: a source-and-date table under every summary, three rows spot-checked before forwarding.

## Free and paid

The skill, the prompt pack and everything they draw on are free and stay free. What costs money is Henrique's time: a
human-run Mode Fluency Assessment for a team, and AI @ Workplace workshops on your own workflows
([LinkedIn](https://www.linkedin.com/in/henriquejsanchez)).

## Files

`SKILL.md` (the instructions) · `references/` (stance matrix, Stack audit, maturity map, spec templates, harness loop,
question bank) · `scripts/score_audit.py` (validates an audit JSON and computes the binding constraint; `python3 -I`, no
dependencies) · `PROMPT_PACK.md` · `examples/` · `evals/` (test prompts) · `EVAL.md` (how it was tested).

## License and citation

MIT (see [LICENSE](LICENSE)). Cite as: Sanchez, H. J. (2026). *Mode Fluency Diagnostic* (skill).
github.com/hjasanchez/agentic-engineering/tree/main/skills/mode-fluency-diagnostic
