# Spec templates

Source: *The Complete Guide to Specifying Work for AI* (Mill & Sanchez, March 2026). The largest preventable failure is
an AI executing competently on a misunderstood instruction. As autonomy rises, the written spec becomes the only control
between intent and execution, so spec rigour must rise with it.

## Right-size the spec

| Task | Format |
|---|---|
| Small: one file, one tool, one change | Intent Doc |
| Medium: several files, a check plus its wiring, a template set | Minimal Viable Spec |
| Large: a new system | Full PRD (out of scope for this skill: recommend it, do not build it) |

## Intent Doc (four lines)

```
1. TASK: [what specifically will be built or changed]
2. SCOPE: [what is affected; what is excluded]
3. BOUNDARIES: [what will NOT be done: no new dependencies, no edits outside X, no changes to existing tests]
4. IF UNCERTAIN: [ask / flag / stop, and when]
```

Example (BUILD after an audit finding "figures in reports are not traced to sources"):

```
1. TASK: Write checks/check_sources.py: fail if any line in outputs/*.md containing a digit lacks a "[source:" tag.
2. SCOPE: Reads outputs/*.md only. Prints PASS or one FAIL line per offending line (file:line). Exit code 0/1.
3. BOUNDARIES: Standard library only. Does not edit any file. Does not touch inputs/ or existing tests.
4. IF UNCERTAIN: Headings and dates count as exempt; any other ambiguous case is a FAIL with reason "check manually".
```

## Minimal Viable Spec

```
## Task: [one sentence]
### Goal
[What it accomplishes, for the person who will use it]
### Acceptance criteria (binary-testable)
- [ ] ...
### Constraints
- Follow the pattern in [file]; stack/tools; budget
### Non-goals (at least as detailed as the goals)
- ...
### Tradeoffs
- When X conflicts with Y, prefer X.
### If uncertain
- Guess / flag / stop, and for which kinds of ambiguity
### Verification
- [the command that proves it works; a passing and a failing sample]
```

## Correctness before the spec (six questions)

1. **Audience**: who uses the output, and what decision do they make with it?
2. **Failure**: what would make it useless?
3. **Danger**: what would make it actively harmful?
4. **Uncertainty policy**: guess, flag or stop?
5. **Risk tolerance**: is a confident wrong answer worse than a refusal?
6. **Verification**: how would you check it? If you cannot say, the spec has a gap.

## Vague-requirement translator

For every qualitative word, name the observable behaviour that satisfies it. If you cannot, it is not ready to specify.

| Vague | Translation |
|---|---|
| "Make it better" | "Section 2 under 200 words, no adjectives" |
| "Reduce hallucinations" | "Any factual claim without a citable source is omitted" |
| "Make it accurate" | "Every number matches the source spreadsheet to two decimals" |
| "Keep it simple" | "At most 3 files, no new dependencies, no function over 30 lines" |
| "Production-ready" | "Handles errors on every external call, passes the existing linter, tests cover the new path" |

## Autonomous looping block (when a built tool runs an agent unattended)

Entry criteria (inputs it has) · machine-verifiable success criteria · iteration budget (attempts before escalating) ·
escalation protocol (what to do when stuck) · side-effect boundaries (what it may and may not modify). The checks the
loop is judged by are locked: the loop may not edit them.

## Spec self-check (score before building)

☐ problem before solution · ☐ audience named · ☐ success binary-testable · ☐ failure modes listed · ☐ danger modes listed ·
☐ non-goals at least as detailed as goals · ☐ constraints explicit · ☐ uncertainty policy · ☐ tradeoffs · ☐ verification ·
☐ vague terms translated · ☐ no tacit knowledge assumed · ☐ size fits the task · ☐ a stranger could execute it.
11–14 = build · 7–10 = revise · under 7 = rethink.
