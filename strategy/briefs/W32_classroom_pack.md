# Task: the Mode Fluency classroom pack — repackage existing material for teachers and students — 2026-11-02

## 1. What and why
Henrique wants teachers and students served without his hours: take what already exists on the site and in the repo and repackage it
into downloadable, printable material that a teacher can use as is: a guide, a one-lesson slide deck, a student self-check, an assignment
sheet, stance cards. Free, CC BY-SA 4.0, no accounts, no data collected, nothing that runs online. Students addressed are 16 and older;
the teacher is the user. Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs (read before writing; reuse text verbatim where it fits)
- strategy/research/R13_education_angle.md: the gap (a shared vocabulary for "what help am I asking for, and who checks"), the evidence
  (Bastani et al., PNAS July 2025: same model as tutor vs answer machine gave opposite exam results; Kosmyna et al., June 2025, preprint;
  the calculator meta-analysis and Papert already in the essay), the five classroom stances it proposes (Oracle, Tutor, Mirror, Adversary,
  Librarian), the "Who checks?" sheet idea, the mode log, and the constraints (minors, safeguarding, Claude.ai is 18+ so the skill is for teachers only).
- THE_FOURTEEN_STANCES.md and docs/stances.html (the card texts, verbatim), MODE_FLUENCY_MATRIX.md (guardrails), docs/calculator-problem.html
  (the essay "Mode Confusion", its education sections and sources), docs/diagnose.html + docs/assets/diagnose.js (the question logic to adapt on paper),
  "AI 101 @ Workplace.pdf" slides (pdftotext) for the beginner framing, skills/mode-fluency-diagnostic/ (the interview questions).
- strategy/drafts/build_pdf.py: the HTML→PDF pipeline to reuse (copy it into the pack as tools/build.py, adapted for A4 portrait documents,
  A4 cards and 16:9 slides).
- Voice: Henrique's, plain, direct, dry; banned words: revolutionary, unlock, supercharge, game-changing, seamless, empower; no pen name; no prices;
  every statistic dated and sourced; nothing invented about schools, laws or outcomes.

## 3. Deliverable: kits/classroom/ with Markdown sources, built PDFs, and a README
1. **README.md**: who it is for (teachers of students 16+, first-year university), what is inside, how to use it in one lesson and then across a
   term, what it does not do (no grading, no detection, no accounts, no data), licence, "tell me how it went" with hello@modefluency.com,
   and one honest line that this is a first edition built from the Mode Fluency material and not yet piloted.
2. **teacher-guide.md → teacher-guide.pdf** (8–12 A4 pages): why banning and free-for-all both fail (evidence, dated); the stance idea in classroom
   terms; the five classroom stances with their failure mode and one rule each (verbatim from the stances where possible, with the adult examples
   swapped for school ones); the "Who checks?" principle; three assignment modes (no AI; tutor only, with a mode log; full use with a deviation
   report and an unaided part); how to read a mode log; what to do when a student hands in AI work as their own (the method, not the policy:
   the unaided part is the check); a one-term plan; sources.
3. **lesson-slides.md → lesson-slides.pdf** (12–16 slides, 16:9, one idea per slide, large type; speaker notes under each slide in the Markdown):
   the calculator lesson, "which mode are you in", the five stances with one example each, the failure of the Oracle (fluently wrong),
   who checks, the mode log, the assignment modes, the one rule to take away. Also export the deck as .pptx if the python-pptx package is
   installed (check with `python -c "import pptx"`); otherwise PDF only and say so.
4. **student-self-check.md → .pdf** (2 A4 pages): a paper questionnaire adapted from the diagnostic's INTERVIEW questions for a 16-year-old
   ("When you open the AI, what are you hoping comes back?" …), scoring to one of the five classroom stances, the stance's one rule, and the
   mode log (a small table the student fills per assignment: what I asked, which mode, what I checked myself, what I changed).
5. **assignment-sheet.md → .pdf** (1 A4 page, fillable by hand): the "Who checks?" sheet the teacher attaches to an assignment: allowed mode,
   what must be done unaided, what to declare, the deviation report lines, the teacher's check.
6. **stance-cards.md → stance-cards.pdf** (5 cards, A5 each, two per A4 page): name, one-line expectation, the failure mode, the one rule,
   one school example; printable in black and white.
7. **tools/build.py**: rebuilds every PDF from the Markdown with Playwright; `python tools/build.py` from the kit folder; a CHANGELOG.md, version 0.1.
- Everything in Henrique's voice; students addressed as "you", teachers as "you" in the guide. No real school, teacher or student. Any example
  is clearly a made-up example.

## 4. Acceptance
- [ ] All PDFs build from the Markdown with one command; page counts as specified; A4 and 16:9 respected; text selectable (not images)
- [ ] Every statistic and study dated and sourced in the guide; the stance texts match THE_FOURTEEN_STANCES.md where quoted
- [ ] No banned words, no pen name, no prices, no claim of piloted results, nothing for under-16s, nothing collecting data
- [ ] A teacher can run the lesson from the slides and notes alone, and set an assignment from the sheet alone

## 5. Output and constraints
- The folder in place, uncommitted. STATUS.md in the scratchpad within 15 minutes (write the README and the guide skeleton first).
- Return ≤12 lines: file list with page counts, whether .pptx was produced, what you were unsure about.
- Budget: 120 minutes. Model: opus. No helpers. Touch nothing outside kits/classroom/.
