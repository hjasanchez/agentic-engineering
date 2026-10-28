# Task: blind review of the 2026-10-29 copy pass and the rebuilt Stack diagram, before merge

## 1. Goal
Find what is wrong before the site goes live again. You did not make these edits. Form your own findings from the diff and the
rendered pages; do not trust the builders' returns or STATUS files.

## 2. Inputs
- Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering; the edits are uncommitted (`git status`, `git diff`).
- The requirements: strategy\briefs\W12_site_copy_pass.md (every numbered item), W13_stack_diagram.md (the diagram), and agenticengineering.jpg
  (the figure the diagram must match; open it with the Read tool).
- Henrique's rule for public copy: nothing that exposes build mechanics, agent housekeeping, internal file names (_qa/…), document versions
  ("v3"), "the builder", "the spec", "Henrique still has to decide", or prices. The footer "cat build.log" colophon is the one deliberate exception.
- The site: docs\*.html opened from file:// in headless Chromium (Python Playwright is installed) at 390 and 1280 px, light and dark, JS on and off.

## 3. What to check
1. Every W12 item, 1–11 and the README list: applied exactly as written? List each as done / partly / missing with the evidence.
2. The sweep: read every page's visible text yourself and list any remaining sentence that breaks the public-copy rule, anywhere, including ones the
   builder was not told about. Also grep for `$1,200`, `$3,500`, `pay for`, `v3`, `dross`, `Not placed`, `i.ytimg`, `pantheon`, `_qa/`.
3. The diagram on stack.html versus agenticengineering.jpg: Harness is an enclosure around the layers and the Evaluation bar; Evaluation is a bar beside all
   five; the layers step down in width bottom-up; User enters at the bottom, Final Output at the top; no mark-weak/reset/readout controls remain; it reads
   correctly with JS off and under reduced motion; 0 console errors at both widths; no horizontal overflow at 390 px.
4. Collateral damage: the nine footers identical; the stances filter still works without the removed chip (click each remaining chip at 1280 px);
   the Muse and Miner cards read as sentences after "dross" → "noise"; about.html still reads as a page after the removals; the learn page's 501/601
   lines present; work.html's contact section intact; every internal link resolves (crawl the nine pages).
5. Voice: any hype or banned word (revolutionary, unlock, supercharge, game-changing, seamless, empower) in changed text; anything that reads as
   written by an agent rather than by Henrique.

## 4. Output
- Write strategy\site-review\review-2026-10-29.md with: pass/fail per check with evidence (commands, quotes, line numbers); defects ranked
  (factual or rule-breaking first, broken function, accessibility, copy/tone, nits); three things that are right.
- Screenshots of stack.html at 390 and 1280 px (light) to C:\Users\henri\Desktop\CCode\modefluency\workspace\previews\review-stack-*.png.
- Return ≤15 lines: counts by severity, the top 5 defects, and whether the diagram matches the figure.

## 5. Constraints
- Read-only except the one output file and the screenshots. Do not fix anything. Budget: 45 minutes. Model: opus. No helpers.
- If uncertain, flag as a question, not a defect.
