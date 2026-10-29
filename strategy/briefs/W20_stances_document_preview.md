# Task: review and place "The Fourteen Stances" document on a preview branch — 2026-10-29

## 1. What and why
A fresh agent drafted a publishable document from Henrique's archetypes notes. You did not write it. First check it against its source, then
place it in the repo on the preview branch and link it from the places that used to cite the internal file. Nothing merges; Henrique decides.
Worktree (work ONLY here): C:\Users\henri\Desktop\CCode\modefluency\workspace\worktrees\stances-document (branch preview/stances-document).

## 2. Inputs
- The draft: C:\Users\henri\AppData\Local\Temp\claude\C--Users-henri-Desktop-CCode-modefluency\30d2be6e-ee02-497a-9ebc-a4b5153f79ac\scratchpad\THE_FOURTEEN_STANCES.md
  and its notes W16_NOTES.md in the same folder (lists the 29 non-source sentences and six source-vs-Matrix disagreements).
- Source of truth: strategy/research/Archetypes_LLM-Human_Interaction_V3.md and MODE_FLUENCY_MATRIX.md (in the worktree).
- House style: AI-Human-Stack-Component-Reference-Map.md. Henrique's rules: his voice, plain; banned words revolutionary, unlock, supercharge,
  game-changing, seamless, empower; no "v3", no chat origin, no pen name, no internal paths; "dross" → "noise".

## 3. Do
1. Review: for each of the 29 non-source sentences, is it true to the source and in his voice? For each stance section, spot-check three fields
   verbatim against the source. Check the six disagreements are stated neutrally, not resolved by invention. Fix what is wrong with the smallest edit;
   list every edit you make.
2. Place: copy the document to the worktree root as THE_FOURTEEN_STANCES.md.
3. Link: README.md "The Fourteen Stances" bullet → link to THE_FOURTEEN_STANCES.md (keep the site link as a second link); docs/stances.html
   source-note → add "Full text: <a href=\"https://github.com/hjasanchez/agentic-engineering/blob/main/THE_FOURTEEN_STANCES.md\">The Fourteen Stances</a> on GitHub.";
   docs/matrix.html's lineage sentence → name the document with the same link; MODE_FLUENCY_MATRIX.md: any mention of the archetypes working file → the new document.
   The root LICENSE pointer: add THE_FOURTEEN_STANCES.md to the CC BY-SA list.
4. Run `python strategy/qa/site_qa.py docs --write-buildlog --out docs/_qa/qa-report.md` in the worktree; it must PASS.
5. Commit on the branch, message starting "Preview: publish The Fourteen Stances document", and push (`git push -u origin preview/stances-document`).

## 4. Output and acceptance
- Return ≤12 lines: review verdict, edits made, links added, the QA line, the commit hash.
- [ ] `grep -n -i "v3\|dross\|pantheon" THE_FOURTEEN_STANCES.md` returns at most the one verbatim body use of "pantheon"
- [ ] Every non-source sentence listed in W16_NOTES.md either stands or is edited with a reason
- Budget: 45 minutes. Model: opus. No helpers.
