# Task: apply the recommended essay retitle on a preview branch — 2026-10-29

## 1. What and why
strategy/research/R8_essay_title_options.md recommends retitling "The Calculator Problem" to "Mode Confusion" and gives exact copy for every
slot. Henrique has not decided. Build it on the preview branch so he can see it; nothing merges.
Worktree (work ONLY here): C:\Users\henri\Desktop\CCode\modefluency\workspace\worktrees\essay-mode-confusion (branch preview/essay-mode-confusion).
The main checkout at ...\repo-agentic-engineering is read-only for you.

## 2. Inputs
- R8 §4 (the exact `<h1>`, `<title>`, meta, nav label, home §6 heading and lede, README mention, the in-body sentence replacement, URL policy: keep the file name).
- docs/calculator-problem.html, docs/index.html, the nav in all nine pages, README.md, strategy/HANDOFF.md §2 decision table (the "Hero copy" row says the essay keeps its title; update that row to say "preview branch proposes Mode Confusion, Henrique to decide").

## 3. Do
1. Apply R8's copy exactly. Keep the file name calculator-problem.html and all links to it.
2. Make sure the essay still introduces the calculator analogy as its opening image and that §3/§4 still make sense with the new title; if a sentence
   reads oddly after the change, list it rather than rewriting beyond R8's instructions.
3. Run `python strategy/qa/site_qa.py docs --write-buildlog --out docs/_qa/qa-report.md` inside the worktree; it must PASS.
4. Screenshots of the essay head and the home §6 at 1280 and 390 px (light) to C:\Users\henri\Desktop\CCode\modefluency\workspace\previews\essay-mode-confusion-*.png.
5. Commit on the branch with message starting "Preview: retitle the essay to Mode Confusion" and push (`git push -u origin preview/essay-mode-confusion`).

## 4. Output and acceptance
- Return ≤12 lines: files changed, the QA line, the sentences you flagged, the commit hash.
- [ ] `grep -rn "Calculator Problem" docs README.md` in the worktree returns nothing except, if R8 says so, one sentence that calls the analogy by name
- [ ] QA gate PASS in the worktree; nine footers identical
- Budget: 40 minutes. Model: opus. No helpers. Banned words apply.
