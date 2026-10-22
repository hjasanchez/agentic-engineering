# Harness improvement loop and starter kit

Source: *AI 401 @ Workplace* (Henrique Jr. Sanchez, 2026). **Rule: never fix the same mistake twice by hand.**
Agent = model + harness; the harness is everything that is not the model.

## Mistake → fix

| The mistake was... | Fix it with | Smallest version |
|---|---|---|
| It didn't know a rule | One line in the instruction file (`AGENTS.md` / `CLAUDE.md` / Cursor rule / Copilot instructions / custom-GPT instructions) | One sentence, written because of this mistake |
| It knew the rule but ignored it sometimes | A script, lint or hook that checks it every time | A check that prints PASS/FAIL with a reason; a hook only after the check works |
| It did a multi-step procedure badly | A skill with the procedure written out | A `SKILL.md` with the steps and the checks inside it |
| It couldn't reach the information | A connector, or a file in the folder | A reference file the instruction file points to; connectors start read-only |
| It lost track on a long task | Smaller tasks in a loop, with notes in files | A `notes/progress.md` it reads at start and updates at end |
| It lacked your judgment | Translation: write the judgment down | A short decision note: "when X, we do Y, because Z" |

Before choosing a fix, find the layer (SKILL.md §8): a missing rule is usually Prompt or Intent, missing information is
Context, an ignored rule is an Evaluation/Harness gap, missing judgment is Intent or Judgment. Fix at the layer that failed.

**Instruction file rules:** keep it short (a map, not an encyclopedia; under ~40 lines; link out to detail files), write
each line because of a real mistake, review it monthly and delete what no longer applies.

**Determinism toolbox:** scripts do work; checks judge work; hooks enforce checks; schedules start work. An instruction can
be ignored; a hook cannot. Hooks fire before an action (can block), after an action (feed errors back), and when the agent
tries to finish (can say "not yet").

**The sandwich:** deterministic in (fetch, extract, validate) → probabilistic middle (interpret, draft, flag) →
deterministic out (lint, check numbers, enforce format) → human (judgment, taste, sign-off).

## Starter kit (the minimum harness)

- [ ] One folder per recurring task, with `inputs/` (read-only for the agent) and `outputs/` (the only place it writes)
- [ ] An instruction file under ~40 lines, written from real mistakes
- [ ] Version history on, so any run can be undone
- [ ] Permissions set to "ask" for anything that deletes, sends or spends
- [ ] A `notes/progress.md` the agent updates at the end of each session

For a chat-only user the same kit maps to: one project or custom assistant per recurring task; its instructions written
from real mistakes; saved outputs kept outside the chat; a "Sources" line required in every answer that will be forwarded.

## Permission dials

| Dial | Safe default | Loosen when |
|---|---|---|
| What it can read | Only the task folder | It needs a reference library: add it read-only |
| What it does without asking | Read, search, write to `outputs/` | You have watched it do that action correctly many times |
| What it can never do | Delete, send messages, touch originals, spend money | Never on the agent's say-so; only by your explicit change |

## Translation (moving tacit know-how into files)

Four ways to extract it: be interviewed by the agent one question at a time until it could do the task without you, then
have it write the skill; narrate while you work and have it draft the procedure; mine your mistake log; restructure old
prose documents into constraints and steps. Every library item gets an owner and a review date, or it rots.
Success measure: interventions per run, week 1 vs week 4. That number falling is what AI-optimised work looks like.
