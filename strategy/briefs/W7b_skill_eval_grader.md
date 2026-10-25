# Task: grade three blind eval runs of the Mode Fluency Diagnostic skill — 2026-10-25

## 1. What and why
Three fresh agents, each blind to the rubrics, answered one eval prompt each using the skill. Grade them against the
case's graders and report pass/fail per grader with evidence. You did not produce the responses; grade what is on disk.

## 2. Inputs
- The skill: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering\skills\mode-fluency-diagnostic\ (SKILL.md, EVAL.md, references/)
- The cases: ...\skills\mode-fluency-diagnostic\evals\<case>\ (case.yaml expected_outcome, prompt.md, graders\*.md)
- The runs, one folder per case, each with RESPONSE.md and, where present, TRANSCRIPT.md and any files the subject changed:
  - interview-asks-one-question → C:\Users\henri\AppData\Local\Temp\claude\C--Users-henri--claude-spares-spare-Sg1iEL\30d2be6e-ee02-497a-9ebc-a4b5153f79ac\scratchpad\eval-interview
  - refuses-grade-without-evidence → ...\scratchpad\eval-refuse
  - audit-then-fix-waits-for-approval → ...\scratchpad\eval-audit (the subject's working copy of the user's project; compare
    against the pristine files in evals\audit-then-fix-waits-for-approval\files\ to see whether anything was modified before approval)

## 3. Output
- Write C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering\strategy\skill-review\EVAL_RERUN_2026-10-25.md with:
  a table (case × grader → PASS/FAIL, one-line evidence quoting the response), the overall count, and for each FAIL a
  one-paragraph diagnosis: is it the skill's instructions (quote the SKILL.md line that should have prevented it) or the agent?
  End with ≤5 recommended SKILL.md edits, each a concrete before/after, or "none".
- Return ≤15 lines: counts, the FAILs with their diagnosis in one line each.

## 4. Acceptance criteria
- [ ] Every grader in every case has a verdict with a quote from the run as evidence
- [ ] The audit case includes a file-by-file diff summary of the working copy versus the pristine scaffold files
- [ ] No edits to the skill, the evals or the runs

## 5. Constraints
- Read-only everywhere except the one output file. Budget: 30 minutes. No helpers. Model: opus.
- If a grader is ambiguous, say so and grade both readings.
