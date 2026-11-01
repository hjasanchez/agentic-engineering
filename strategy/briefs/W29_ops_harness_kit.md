# Task: build the first harness starter kit — Operations & admin, "three quotes, one recommendation" — 2026-11-01

## 1. What and why
Henrique approved the recommendation in strategy/research/R10_harness_kit_job_family.md: the first free harness kit is for operations and
admin people in small and mid-sized companies, built around one recurring workflow: compare three supplier quotes and draft a recommendation
for someone else to sign. The kit is AI @ Workplace 401 made concrete: a folder, one instruction file, the three checks that matter, one worked
example. It must work with whatever assistant the reader has (Claude, ChatGPT, Copilot, Gemini) and need no coding to use.
Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs (read first)
- R10 (the workflow, stance, binding layer, three checks, public basis, design-partner idea).
- "The Complete Guide to Specifying Work for AI.pdf" (Intent Doc and Minimal Viable Spec templates; pdftotext), AI-Human-Stack-Agent-Audit-Protocol.md,
  AI-Human-Stack-Component-Reference-Map.md, THE_FOURTEEN_STANCES.md (Executor and Interpreter), MODE_FLUENCY_MATRIX.md (their guardrails).
- skills/mode-fluency-diagnostic/ for the house conventions of a shipped folder (README, LICENSE, examples/, tests).
- Anthropic's knowledge-work-plugins (public, Apache-2.0) exist and cover the skills; the kit must not compete with them. Its value is the
  harness: the instruction file, the checks, the sign-off discipline and the stance.

## 3. Deliverable: kits/ops-three-quotes/ in the repo
- README.md: who it is for, what it does in one paragraph, a ten-minute start (copy the instruction file into your assistant's project or
  custom instructions; put the three quotes and the request in the inbox folder; run; check), what it will never do (send anything to a
  supplier, invent a figure), how it relates to the Stack and the stances (two sentences with links), licence (MIT for files that are code,
  CC BY-SA 4.0 for text), and a "design partner wanted" line with hello@modefluency.com.
- INSTRUCTIONS.md: the instruction file, tool-agnostic, written for the assistant: the task (Executor stance; Interpreter step when reading a
  quote), inputs expected, the plan-before-action rule, the three checks as hard requirements, the deviation report format, the sign-off rule,
  the output template. Positive phrasing; constraints in one labelled block.
- checks/: one file per check in plain language plus, where it can be mechanical, a spreadsheet formula or a tiny Python script with -I usage:
  (1) every figure traced to its source page (a trace table the assistant must fill); (2) totals recomputed outside the model (sheet formula
  and script); (3) request-line coverage per supplier with gaps listed, plus the deviation report. A short "how to read the checks" note.
- templates/: request.md (what the company asked suppliers for, with line items), recommendation.md (the decision note the human signs),
  deviation-report.md.
- example/: three synthetic supplier quotes (PDF-like Markdown or .txt, realistic for one SME purchase such as office network hardware or a
  catering contract), each with exactly one planted fault (a unit mismatch, an omitted line, a total that does not add up); the request; the
  expected recommendation; a walkthrough.md that shows a full run including the three checks catching the three faults and the deviation
  report. Everything invented must be clearly synthetic (fictional company names, "example" in file names).
- CHANGELOG.md with version 0.1, 2026-11-01.

## 4. Acceptance
- [ ] A reader can start in ten minutes with any mainstream assistant and no code
- [ ] The three planted faults are caught by the three checks in the walkthrough, and the script in checks/ runs with `python -I` and finds the total mismatch
- [ ] No real company, person or price presented as real; no banned words; no pen name; Henrique's plain voice
- [ ] `grep -rn "\$[0-9]" kits/ops-three-quotes/README.md` finds nothing (prices appear only inside the synthetic example quotes)
- [ ] Links to the Stack, Stances, Matrix and Specifying guide resolve (relative within the repo or to modefluency.com)

## 5. Output and constraints
- The folder in place, uncommitted. STATUS.md in the scratchpad within 15 minutes. Return ≤12 lines: file list, how the three faults are caught, what you were unsure about.
- Budget: 90 minutes. Model: opus. No helpers. Touch nothing outside kits/ops-three-quotes/.
