# Task: blind review of the pre-launch edits before merge to main — 2026-10-25

## 1. Goal
Find what is wrong before the site goes live. You did not make these edits. Do not trust the builder's return or STATUS file;
form your own findings from the files and the diff.

## 2. Inputs
- Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering. The edits are uncommitted: `git status` and
  `git diff` show them; `git diff --stat` lists the files.
- The requirement: strategy\briefs\W6_prelaunch_edits.md (what was supposed to change and what was not)
- Sources of truth: strategy\research\Archetypes_LLM-Human_Interaction_V3.md (card text), https://creativecommons.org/licenses/by-sa/4.0/legalcode.txt
  (license text), README.md as it reads now
- The site: docs\*.html opened from file:// in headless Chromium (Python Playwright is installed) at 390 and 1280 px

## 3. What to check
1. Scope: every changed line is one the brief asked for. List any change outside the brief's scope.
2. Licenses: LICENSES\CC-BY-SA-4.0.txt is the verbatim legal code (compare to the URL, byte-level after newline normalisation);
   the root LICENSE pointer is accurate about which folders are which; README, about.html and all nine footers say the same thing.
3. Cards: the five restored cards match V3 word for word (your own extraction, not the builder's script); the other nine are unchanged
   versus `git show HEAD:docs/stances.html`; the page still renders, filters and animates at both widths with 0 console errors.
4. Pen name: `grep -ril <pen-name surname>` excluding .git and *.pdf is empty, and every sentence that was edited still reads as a sentence.
5. Nothing regressed: 0 console errors on all nine pages at both widths; no banned words (revolutionary, unlock, supercharge,
   game-changing, seamless, empower) in visible text; docs\_qa\blind-review.md gone and docs\README.md consistent.

## 4. Output
- Write docs\_qa\prelaunch-review-2026-10-25.md (it will be deleted before commit; do not worry about it shipping) with: pass/fail
  per check above with evidence (commands run, quotes), then defects ranked: factual/invented first, broken function, accessibility,
  copy/tone, then nits. Three things that are right.
- Return ≤15 lines: counts by severity, the top 5 defects.

## 5. Constraints
- Read-only except the one output file. Do not fix anything. Budget: 40 minutes. No helpers. Model: opus.
- If uncertain, flag as a question, not a defect.
