# Task: blind review of the first harness kit before it ships — 2026-11-01

## 1. Goal
Use the kit as its reader would, and find what would make an operations manager stop trusting it. You did not build it.
Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering. The kit: kits/ops-three-quotes/ (uncommitted).

## 2. Inputs
- The requirement: strategy/briefs/W29_ops_harness_kit.md and strategy/research/R10_harness_kit_job_family.md.
- The method it must match: THE_FOURTEEN_STANCES.md (Executor, Interpreter), MODE_FLUENCY_MATRIX.md, "The Complete Guide to Specifying Work for AI.pdf" (pdftotext), AI-Human-Stack-Agent-Audit-Protocol.md.

## 3. Check
1. **Run it as the reader.** Follow README's ten-minute start literally, with yourself as the assistant: load INSTRUCTIONS.md as your instructions,
   take the example request and the three example quotes, produce the recommendation, fill the trace table, run the totals script with `python -I`,
   write the deviation report. Did the three checks catch the three planted faults? Did anything in the instructions make you do the wrong thing,
   skip a check, or invent a figure? Time it.
2. **Instruction quality.** Positive phrasing, constraints in one block, stance named and correct (Executor with an Interpreter step), plan-before-action,
   sign-off rule, output template unambiguous. Would it work pasted into ChatGPT or Copilot as well as Claude (no Claude-only features assumed)?
3. **Checks.** Each mechanical where it can be; the script's exit codes and messages clear; the trace table catches a figure with no source page;
   coverage check lists gaps per supplier.
4. **Synthetic example.** Realistic, clearly fictional, one fault per quote, no real company or person, no price in README.
5. **Rules.** No banned words (revolutionary, unlock, supercharge, game-changing, seamless, empower), no pen name, Henrique's voice, licence lines
   correct (MIT code, CC BY-SA text), links resolve, nothing promises what the kit cannot do.

## 4. Output
- strategy/site-review/review-ops-kit-2026-11-01.md: pass/fail per check with evidence; defects ranked (wrong method or unsafe instruction first,
  then checks that miss, then clarity, then nits); the time your run took; three things right.
- Return ≤12 lines: counts by severity, whether the three faults were caught, top 5 defects.

## 5. Constraints
- Read-only except the review file and a scratch folder for your run (scratchpad). Do not fix. Budget: 45 minutes. Model: opus. No helpers.
