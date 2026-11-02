# Task: blind review of the classroom pack, read as a teacher — 2026-11-02

## 1. Goal
You are a secondary-school or first-year-university teacher who has forty minutes to decide whether to use this pack next week. Find what
would make you put it down, and what is wrong in it. You did not build it. Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs
- The pack: kits/classroom/ (uncommitted): README, teacher guide, lesson slides with notes, student self-check, assignment sheet, stance cards,
  the built PDFs and tools/build.py.
- The requirement: strategy/briefs/W32_classroom_pack.md. The sources it must match: THE_FOURTEEN_STANCES.md, MODE_FLUENCY_MATRIX.md,
  docs/calculator-problem.html, strategy/research/R13_education_angle.md.

## 3. Check
1. **Usability.** From the slides and notes alone, could you run the lesson? From the assignment sheet alone, could you set an assignment and
   read the mode log a student hands back? Time each read. Note every place you would have to invent something the pack does not give you.
2. **Fidelity.** Stance texts quoted match the source; every study and statistic in the guide is dated and sourced and stated no stronger than
   its source (check Bastani 2025, Kosmyna 2025, the calculator meta-analysis, Papert); the five classroom stances are the ones R13 proposed.
3. **Appropriateness.** Students 16+, nothing collecting data, no accounts, no detection tool or grading promise, no claim of piloted results,
   nothing a school's safeguarding lead would object to; examples are made up and say so where it matters.
4. **Build.** Rebuild every PDF with `python tools/build.py` from the kit folder; page counts as specified; A4 and 16:9; text selectable
   (pdftotext returns the text); no broken links in the Markdown.
5. **Voice and rules.** Plain, Henrique's voice, no banned words (revolutionary, unlock, supercharge, game-changing, seamless, empower), no pen
   name, no prices, no agent housekeeping or internal file names in anything a teacher downloads.

## 4. Output
- strategy/site-review/review-classroom-pack-2026-11-02.md: pass/fail per check with evidence; defects ranked (wrong or overstated claims first,
  then anything unsafe for a school, then unusable steps, then clarity, then nits); the time your reads took; three things right.
- Return ≤12 lines: counts by severity, would you use it next week (yes/no and why), top 5 defects.

## 5. Constraints
- Read-only except the review file and a scratch copy for the rebuild. Do not fix. Budget: 45 minutes. Model: opus. No helpers.
