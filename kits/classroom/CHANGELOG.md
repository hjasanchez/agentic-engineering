# Changelog

## 0.2 (2026-11-02)

- Bastani et al. (PNAS, July 2025) stated exactly in the guide and on slide 5: both AI versions raised practice scores; on the exam
  without AI, the answering version did about 17% worse than no AI and the tutor version showed no significant difference.
- A ready, made-up example for the slide 12 checking activity: `activity-handout.pdf`, the slide 12 notes, and a guide appendix with
  the key. The README's one-lesson steps now include preparing it.
- Mode B named precisely everywhere: Tutor, Mirror, Adversary or Librarian; not the Oracle. A one-page `mode-log.pdf`, one per
  assignment.
- The unaided part is always supervised (in class or in conversation); the slide 13 notes speak for the pack, not the school, on
  detectors.
- Smaller fixes: calculator, ban and usage evidence worded no stronger than the sources; no unsourced "usually"; lesson timings add
  up to 50 minutes; a name line and a reading-the-log box on the assignment sheet; reading times agree; links work outside the repo.
- Re-review: "a tutor with guardrails largely removed the harm"; the example log entry is a Tutor line in the guide and on the slide;
  one rule for the Oracle in Mode B on the sheet, the log, the guide and the notes ("If you used the Oracle in Mode B, record it; it counts as a deviation.");
  the handout and slide 12 notes say to swap in a checked-wrong answer from your own subject; the unused Wharton source is gone.


## 0.1 (2026-11-02)

- First edition: a teacher guide (10 A4 pages), a one-lesson deck (16 slides, 16:9) with speaker notes in the Markdown and as
  lesson-notes.pdf, a two-page student self-check with a mode log, a one-page "Who checks?" assignment sheet, and five A5 stance
  cards (Oracle, Tutor, Mirror, Adversary, Librarian) printed two per A4 page.
- `tools/build.py` rebuilds every PDF from the Markdown with Playwright and checks page counts, page sizes, and that no slide or card
  overflows.
- The slides are PDF only.
- Built from the Mode Fluency material. Not yet piloted in a classroom.
