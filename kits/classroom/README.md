# Which mode are you in? A classroom pack

**Printable material for teachers of students aged 16 and over, and for first-year university teaching, on using AI on purpose:
what kind of help you are asking for, and who checks the result.**
Free to use, copy and adapt. No accounts, no sign-up, nothing that runs online, no data collected by anyone but you.

This is a first edition, built from the Mode Fluency material (the stances, the matrix and the essay "Mode Confusion"). It has not
yet been piloted in a classroom.

## Who it is for

You teach students who are 16 or older, in a school, college or first-year university course, and your students already use AI
whether or not your policy allows it. You are the user of this pack: you read the guide, you run the lesson, you set the sheet.
Students see only the slides, the cards, the self-check and the assignment sheet, on paper or on your screen.

Nothing here is written for students under 16, and nothing asks a student to sign up for anything. Use the AI tools your school has
already approved, under their age limits and your school's rules.

## What is inside

| File | What it is | Pages |
|---|---|---|
| [`teacher-guide.pdf`](teacher-guide.pdf) | Why banning and free-for-all both fail, the five classroom stances, the "Who checks?" principle, three assignment modes, how to read a mode log, what to do when work is not the student's own, a one-term plan, an example for the checking activity, sources | 11 A4 |
| [`lesson-slides.pdf`](lesson-slides.pdf) | One 50-minute lesson: the calculator, which mode are you in, the five stances, who checks, the mode log, the assignment modes | 16 slides, 16:9 |
| [`lesson-notes.pdf`](lesson-notes.pdf) | The speaker notes for every slide, with timings and the class activities, to print for yourself | 5 A4 |
| [`student-self-check.pdf`](student-self-check.pdf) | A paper questionnaire: which stance do I usually use, its one rule, and a mode log for the first assignment | 2 A4 |
| [`mode-log.pdf`](mode-log.pdf) | A blank mode log, one sheet per assignment | 1 A4 |
| [`activity-handout.pdf`](activity-handout.pdf) | A ready, made-up AI-style answer with errors to find, for the lesson's checking activity (slide 12), two per page | 1 A4 |
| [`assignment-sheet.pdf`](assignment-sheet.pdf) | The "Who checks?" sheet you attach to an assignment: the allowed mode, what is done unaided, what to declare, your check | 1 A4 |
| [`stance-cards.pdf`](stance-cards.pdf) | Five stance cards (Oracle, Tutor, Mirror, Adversary, Librarian), A5, two per A4 page, black and white | 3 A4 |

Each PDF is built from the Markdown file with the same name, so you can edit the text and rebuild (see "Changing it" below).

## How to use it in one lesson

1. Read the teacher guide, sections 1 to 6 (about 15 minutes; the whole guide takes about 25).
2. Print the stance cards (one set per table) and the self-check (one per student). Print the lesson notes for yourself.
3. Prepare the checking activity on slide 12: print the activity handout (one half-page per pair), or make your own example with a
   school-approved AI tool as the slide 12 notes describe (allow 20 to 30 minutes for that).
4. Run the lesson from the slides. The notes for each slide say what to say, what to ask and how long it takes.
5. Students do the self-check in the last eight minutes, or as homework. It stays with them; you do not collect it.

## How to use it across a term

1. Run the lesson in week 1 or 2.
2. Pick three assignments in the term and attach the assignment sheet to each one, with the mode chosen: one with no AI, one tutor
   only with a mode log, one with full use, a mode log, a deviation report and an unaided part. Hand out a mode log sheet with each
   assignment that asks for one.
3. Keep one short unaided task in every unit (an in-class write, a short conversation about the work). That task is your check.
4. Read the mode logs as conversation starters, not as evidence (guide, section 7).
5. In the last week, ask the class the self-check's question again: what kind of help did you ask for, and what did you check?

The guide's section 9 sets this out week by week.

## What it does not do

- **No grading.** Nothing here grades a student or scores their work. The self-check is for the student; it has no right answer.
- **No detection.** It does not detect AI writing and does not ask you to. The check is the unaided part of the assignment.
- **No accounts and no data.** Nothing here runs online, logs in, or sends anything anywhere. Mode logs and self-checks stay with the
  student and with you, on paper.
- **No policy.** It does not replace your school's or exam board's rules on AI or on authenticating coursework. Where they say
  something different, they win.

## Changing it

The Markdown files are the source. To rebuild every PDF after an edit, from this folder:

```
python tools/build.py
```

You need Python 3.9 or later, Playwright for Python with Chromium (`pip install playwright`, then `playwright install chromium`)
and either `markdown` or `markdown-it-py` (`pip install markdown-it-py`). The script checks the page counts and page sizes, and
that no slide or card overflows. The slides are PDF only; open the file full screen to present.

## Licence and credits

Code MIT · documents CC BY-SA 4.0. The guide, slides, notes, self-check, sheet, log, handout and cards are CC BY-SA 4.0
([licence](https://creativecommons.org/licenses/by-sa/4.0/)); the build script is MIT
([both texts](https://github.com/hjasanchez/agentic-engineering/tree/main/LICENSES)). Adapt it for your class and share it on the same terms.

The stances come from [*The Fourteen Stances*](https://github.com/hjasanchez/agentic-engineering/blob/main/THE_FOURTEEN_STANCES.md) and the [Mode Fluency Matrix](https://modefluency.com/matrix.html).
Lineage and credit: Anthropic's AI Fluency course and its 4Ds; Ethan and Lilach Mollick's "Assigning AI: seven approaches for
students"; Nate B. Jones; Andrej Karpathy; Felix Rieseberg; the CHI 2026 archetypes paper; and, for assignment design, the AI
Assessment Scale (Perkins, Roe and Furze) and the University of Sydney's two-lane approach. The guide lists every source.

## Tell me how it went

If you use it, I would like to hear what worked, what did not and what your students made of it: hello@modefluency.com. Please do
not send student work or names, only what you saw.

Henrique Jr. Sanchez · [modefluency.com](https://modefluency.com)
