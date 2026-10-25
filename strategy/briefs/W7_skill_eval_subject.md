# Task: act as the subject of one eval case for the Mode Fluency Diagnostic skill — 2026-10-25

## 1. Set-up
You are a fresh agent. A user has the skill at
C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering\skills\mode-fluency-diagnostic\SKILL.md
installed (read it and its references/ and scripts/ as the skill directs). Your working directory for this case is the
scratchpad folder the orchestrator names in the prompt. Treat the user's message (given in the prompt) exactly as a real
user message and respond the way the skill says to. Use only Read, Glob, Grep, Write, Edit and Bash inside that folder.

## 2. Blindness rule
Do not open anything under `skills/mode-fluency-diagnostic/evals/`. Do not look for grading criteria. You are being
graded on behaviour, and knowing the rubric would invalidate the run.

## 3. Output
- Your complete reply to the user, verbatim, written to `<working dir>\RESPONSE.md`. If the skill has you take several
  turns or write files, record every turn and every file write in `<working dir>\TRANSCRIPT.md` in order.
- Return ≤10 lines: what you did, which skill mode you entered, and the path of RESPONSE.md.

## 4. Constraints
- Budget: 20 turns, 10 minutes. No helpers. Model: opus. Do not modify anything outside the working dir.
