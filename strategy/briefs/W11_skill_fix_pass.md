# Task: skill fix pass after the 2026-10-25 eval re-run

## 1. What and why
A blind re-run of the three eval cases passed, but the grader found bugs that bite on Windows and one gap in SKILL.md.
Apply the grader's before/after edits, nothing else.
Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering. Skill: skills\mode-fluency-diagnostic\

## 2. Inputs
- strategy\skill-review\EVAL_RERUN_2026-10-25.md: the findings and the concrete before/after edits (SKILL.md, scripts\score_audit.py,
  scripts\tests\run_tests.py and its test expectations, EVAL.md's claim). This is the spec.
- The skill folder itself. The eval runs in C:\Users\henri\AppData\Local\Temp\claude\C--Users-henri--claude-spares-spare-Sg1iEL\30d2be6e-ee02-497a-9ebc-a4b5153f79ac\scratchpad\eval-audit-2\_eval_scratch\audit.json (a valid audit JSON to smoke-test the script).

## 3. Edits
1. score_audit.py: make stdout/stderr UTF-8 regardless of console code page (the report's one-line reconfigure, or equivalent), so plain
   `python -I` exits 0 on a valid audit on Windows. Keep exit codes: 0 valid, 1 validation errors, 2 usage/path errors.
2. The Python 3.13+ `os.path.isabs` change: apply the report's fix so an absolute POSIX path is rejected with the "absolute path not allowed"
   message on Windows too, and the 16-defect test file still fails as it should.
3. run_tests.py: `-X utf8` in the child command and `encoding="utf-8"` on subprocess calls; 4/4 must pass under `python -I` on this machine.
4. SKILL.md: the command line (`python3 -I -X utf8 ...`, with a note that `python` replaces `python3` on Windows where `python3` is the Store
   stub) and the §5 step 8 rule that the audit JSON is written outside the audited scope (the report's wording). Any other SKILL.md edit the
   report lists under "recommended", only if it is a one-line clarification; list what you skipped.
5. EVAL.md / README.md: update any claim that no longer holds exactly (e.g. the test count, the command line).

## 4. Output
- Edits in place. Do not commit. Return ≤12 lines: files changed, the test result line, the score_audit smoke-test exit code, what you skipped.

## 5. Acceptance criteria
- [ ] `python -I skills\mode-fluency-diagnostic\scripts\tests\run_tests.py` prints 4/4 PASS on this Windows machine
- [ ] `python -I skills\...\scripts\score_audit.py --root <eval-audit-2 dir> <that audit.json>` exits 0 under the cp1252 console (no -X utf8)
- [ ] `grep -n "python3 -I" SKILL.md` shows the new command with `-X utf8`
- [ ] No change outside the skill folder; no change to evals\ except test expectations the report names

## 6. Constraints
- Model: opus. Budget: 30 minutes. No helpers. Banned words apply. Do not restructure the skill or rewrite prose beyond the named lines.
