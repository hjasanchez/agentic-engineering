## Task: Blind review of the "Mode Fluency Diagnostic" skill as a stranger who must run it.
### Inputs
- /home/user/meta-strategy/briefs/W4_diagnostic_skill.md (the requirement)
- /home/user/meta-strategy/skills/mode-fluency-diagnostic/ (the artefact). Do not read EVAL.md or STATUS.md until you have formed your own findings.
### Do
1. Read SKILL.md and README.md as a sceptical senior engineer AND as an operations manager with no repo. For each mode, could you run it unambiguously? Note every place you would hesitate.
2. Execute the skill yourself, following SKILL.md literally, in two runs: (a) AUDIT mode against the synthetic files in evals/audit-then-fix-waits-for-approval/files/ (copy them to a scratch dir under /tmp/claude-0/-home-user/a796e04e-6d69-549d-a3e4-d8074fbd356d/scratchpad/skillreview/ first; treat that dir as the user's repo); produce the report exactly as the skill prescribes and run scripts/score_audit.py on your JSON with python3 -I. (b) INTERVIEW mode: play BOTH the agent following the skill and a user who is a solo freelance translator using Claude and ChatGPT daily; keep to the skill's one-question-at-a-time rule; produce the final report.
3. Check: frontmatter valid; every link in SKILL.md/README.md/PROMPT_PACK.md resolves to an existing file; the PROMPT_PACK prompts stand alone (no references to files a chat user cannot open); the "What next" line mentions the paid assessment at most once; no banned words (revolutionary, unlock, supercharge, game-changing, seamless, empower); the evidence standard is actually enforceable by the script.
4. Write /home/user/meta-strategy/skills/mode-fluency-diagnostic/_review/blind-review.md: pass/fail per PRD §3–§4 item with evidence; defects ranked (contradictions and places a stranger would misrun it first, then correctness of the script, then clarity, then tone); your two run transcripts saved as _review/run-audit.md and _review/run-interview.md; three things that work well.
### Constraints
Read-only on the skill except writing into _review/. Budget 60 minutes. No helpers. Model: opus.
### Return ≤12 lines: counts by severity and the top 5 defects.
