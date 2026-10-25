# Task: pre-launch edits to the repo (license split, five stance cards, pen-name removal, QA file) — 2026-10-25

## 1. What and why
Henrique decided four things on 2026-10-25. Apply them exactly, nothing more, so the site can be merged to `main` and go live.
Repo root (all paths below are relative to it): C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs (read before writing)
- README.md (sections "Credits and lineage", "License and citation"), LICENSE (GPL-3.0 today)
- docs/*.html (nine pages; the shared footer carries the line "Repository license: GPL-3.0"), docs/about.html (a paragraph on GPL and a hidden
  comment "DECISION FOR HENRIQUE" about the co-author), docs/stack.html (source-note crediting the co-author), docs/README.md
- docs/stances.html and strategy/research/Archetypes_LLM-Human_Interaction_V3.md (Henrique's own text; the source for the cards)
- docs/_qa/blind-review.md §3 (which five cards are abridged and how)
- AI-Human-Stack-Agent-Audit-Protocol.md, AI-Human-Stack-Component-Reference-Map.md, MODE_FLUENCY_MATRIX.md, strategy/**/*.md

## 3. The four changes
1. **License split.** Code and skills MIT; documents, slides and videos CC BY-SA 4.0.
   - Create `LICENSES/MIT.txt` (standard MIT text, "Copyright (c) 2026 Henrique Jr. Sanchez") and `LICENSES/CC-BY-SA-4.0.txt`
     holding the full legal code fetched from https://creativecommons.org/licenses/by-sa/4.0/legalcode.txt (verbatim, do not type it from memory).
   - Replace root `LICENSE` with a short plain-text pointer: what is MIT (code: `docs/`, `skills/`, scripts), what is CC BY-SA 4.0
     (the PDFs, the two protocol .md files, MODE_FLUENCY_MATRIX.md, essays and site copy), where the texts live, and one sentence that
     versions published before 2026-10-25 remain available under GPL-3.0 as released.
   - README.md "License and citation": state the split in two sentences, keep the citation line. Remove "under consideration".
   - Site: the footer line on all nine pages becomes "Code MIT · documents CC BY-SA 4.0" (same markup, same element). The about.html
     GPL paragraph is rewritten to the same fact in Henrique's plain voice. docs/README.md line 61 updated to match. `skills/mode-fluency-diagnostic/LICENSE` stays.
2. **Five stance cards.** On docs/stances.html, the Oracle, Genie, Interpreter, Executor and Miner cards carry text cut or lightly
   edited from the V3 source. Restore each field (expectation, why it stays hidden, boundary test, failure mode, cardinal rule, examples
   where the card has that field) to the V3 wording, word for word. Keep the card markup, classes and the live-canvas elements untouched.
   Write a small check script (scratchpad, not the repo) that extracts each of the five cards' text fields and asserts each is a verbatim
   substring of the V3 file after whitespace normalisation; it must pass for all five and still pass for the nine cards already verified.
3. **Pen-name removal.** Remove the pen-name co-author credit from every text file in the repo. PDFs stay untouched.
   - Credit lines (README credits paragraph, docs/stack.html source-note, the two protocol .md files, any others): credit Henrique alone,
     e.g. "Henrique Jr. Sanchez, March 2026". Delete the README sentence about the pen name entirely. Delete the about.html hidden comment.
   - Strategy files that *discuss* the pen name (STRATEGY_BRIEF.md, HANDOFF.md, briefs/00_SHARED_CONTEXT.md, research/R5_footprint_audit.md):
     replace the name with "the pen name" or "a pen name" so the sentence still reads; keep the surrounding decision text.
   - Acceptance: `grep -ril <pen-name surname>` over the repo, excluding `.git` and `*.pdf`, returns nothing.
4. **Delete `docs/_qa/blind-review.md`.** Update docs/README.md line 18 so it no longer tells the reader to delete it (say the review was
   removed before launch).

## 4. Output
- The edits in place in the repo. Do not commit; the orchestrator commits after QA.
- STATUS.md at C:\Users\henri\AppData\Local\Temp\claude\C--Users-henri--claude-spares-spare-Sg1iEL\30d2be6e-ee02-497a-9ebc-a4b5153f79ac\scratchpad\W6_STATUS.md,
  written within 15 minutes and updated as you go.
- Return ≤15 lines: files changed, the five-card check result, the pen-name grep result, anything you could not do.

## 5. Acceptance criteria (binary)
- [ ] `LICENSES/MIT.txt` and `LICENSES/CC-BY-SA-4.0.txt` exist; the CC file's first line matches the creativecommons.org legal code
- [ ] `grep -rn "GPL" README.md docs/` returns only the sentence about pre-2026-10-25 releases, if you put one on the site at all
- [ ] All nine docs/*.html footers show "Code MIT · documents CC BY-SA 4.0"
- [ ] Five-card verbatim check passes; nine previously verified cards unchanged
- [ ] `grep -ril <pen-name surname>` (excluding .git, *.pdf) is empty
- [ ] docs/_qa/blind-review.md is gone; docs/README.md updated
- [ ] No other copy, style, script or asset changed (`git status` lists only the files this brief names plus LICENSES/)

## 6. Constraints and non-goals
- Do not touch the contact email, the footer build-log numbers, docs/_qa/buildlog.json or qa-report.md, the skill folder, or any PDF.
- Do not add a CNAME file. Do not rewrite copy beyond the lines named here. Banned words: revolutionary, unlock, supercharge,
  game-changing, seamless, empower. Voice: plain, direct. No helpers. Budget: 45 minutes. Model: opus.
- If uncertain (e.g. a card field has no V3 counterpart), leave that field as is and list it in your return.
