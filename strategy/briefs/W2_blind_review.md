## Task: Blind review of the Mode Fluency website prototype against its PRD and its content sources.
### Goal
Find what is wrong before Henrique sees it. You did not build this; do not trust the builder's QA report (do not read site/_qa/qa-report.md until you have formed your own findings).
### Inputs
- /home/user/meta-strategy/briefs/W1_site_PRD.md (the requirement)
- /home/user/meta-strategy/site/ (the artefact)
- Content sources listed in PRD §6 (to check accuracy of claims and quotes)
### Output
- Write /home/user/meta-strategy/site/_qa/blind-review.md with: (1) a pass/fail per PRD §2 success metric with evidence
  (commands run, screenshots you took into site/_qa/review-*.png); (2) a numbered list of defects ranked by severity:
  factual errors or invented content first, then broken functionality, then accessibility, then copy/tone (banned words:
  revolutionary, unlock, supercharge, and any hype), then design; (3) three things that work well (so Henrique knows what to keep).
- Return ≤15 lines: counts of defects by severity and the top 5 defects.
### Acceptance criteria
- [ ] Every page opened in headless Chromium from file:// with console errors recorded
- [ ] Every statistic and quote on calculator-problem.html traced to a source file or flagged
- [ ] All 14 stances and 7 components checked present and accurately described (spot-check 5 stances word-for-word against src_archetypes_v3.md)
- [ ] The diagnostic exercised through at least 4 distinct paths
### Constraints
- Read-only on site/ except for writing into site/_qa/. Do not fix anything. Budget ≤60 minutes. No helpers. Model: opus.
### Non-goals
- Do not redesign. Do not rewrite copy. Do not evaluate the business strategy.
### If uncertain
- Flag it as a question rather than a defect.
