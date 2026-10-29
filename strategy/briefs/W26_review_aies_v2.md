# Task: blind review of the Stack v2 draft before Henrique reads it — 2026-10-29

## 1. Goal
Find what would make Henrique distrust the draft. You did not write it. Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs
- The draft: strategy/drafts/The-AI-Human-Engineering-Stack-v2-DRAFT.md (with its change log at the end).
- The requirement: strategy/briefs/W23_aies_v2_lexical.md.
- The sources: "The AI-Human Engineering Stack.pdf" at the repo root (extract with `pdftotext -layout`), and Henrique's two companion
  documents at C:\Users\henri\Documents\Hayen Mill\1. Rough Notes\AI\AI-Human Engineering\Lexical-Substrate.md and Lexical-Field-Guide.md.
- The writer's notes: C:\Users\henri\AppData\Local\Temp\claude\C--Users-henri-Desktop-CCode-modefluency\30d2be6e-ee02-497a-9ebc-a4b5153f79ac\scratchpad\W23_NOTES.md
  (read it last, after forming your own view).

## 3. Check
1. Fidelity: sample 40 sentences the change log marks as unchanged and confirm they are verbatim in the PDF text; sample every sentence the log marks
   as new or condensed in the Overview, Layer 1, the new section's first and last subsections, the diagnostic loop and the conclusion, and judge
   whether each is faithful to its source or an invention. List inventions.
2. Structure: does the new section sit naturally after Layer 1 at the same depth and rhythm as the layer sections? Is the "when not to bother"
   passage present and honest (for most teams the content layers dominate; the substrate is the last place to look)? Does the "why five layers"
   argument still hold with the substrate present, in one sentence?
3. Diagram: does the ASCII figure match the Substrate document's §6 placement, and does the description keep user, final output and re-entry?
4. Claims and citations: every statistic dated and sourced; the METR and S&P corrections right; anything marked "verify" by the writer listed
   with what a check would need. Any claim in the new section that goes beyond the Substrate document's own evidence grades.
5. Voice and rules: banned words (revolutionary, unlock, supercharge, game-changing, seamless, empower); the pen name absent; "dross" absent;
   no internal paths; the author line is Henrique alone.
6. Length: the new section is longer than any layer. Propose the specific cuts (quote first words) that bring it to about the length of Layer 4
   without losing the instruments or the graveyard.

## 4. Output
- strategy/drafts/REVIEW-v2-2026-10-29.md: pass/fail per check with evidence; defects ranked (inventions first, then unsourced claims, structure,
  voice, nits); the proposed cuts; three things that are right; and your own answer to the writer's three questions as advice to Henrique.
- Return ≤15 lines: counts by severity, the inventions found, the top 5 defects.

## 5. Constraints
- Read-only except the one output file. Do not fix anything. Budget: 45 minutes. Model: opus. No helpers.
