# Blind review: classroom pack (kits/classroom/), read as a teacher — 2026-11-02

Brief: strategy/briefs/W32b_review_classroom_pack.md. Reviewer did not build the pack. Read-only on the repo; rebuild done in a scratch
copy. Requirement checked against: strategy/briefs/W32_classroom_pack.md, THE_FOURTEEN_STANCES.md, MODE_FLUENCY_MATRIX.md,
docs/calculator-problem.html, strategy/research/R13_education_angle.md.

**Verdict as a teacher:** yes, I would use it next week, after correcting one sentence in the guide and one question in the slide-5 notes
by hand (D1) and spending 20–30 minutes making the slide-12 printout myself (D10). The core (stances, "Who checks?", the unaided part)
is sound and honestly framed.

## Result per check

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Usability | **Partial pass** | The lesson runs from slides + notes alone, except the slide-12 activity, whose material the teacher must create (D10). The sheet alone sets an assignment; reading a returned mode log needs guide §7 (D13). Places I had to invent something: D9, D10, D11, D12. |
| 2 | Fidelity | **Fail (one wrong claim)** | Stance texts: all five expectations, failure modes and rules match THE_FOURTEEN_STANCES.md §2.1–2.6 and the Matrix rows word for word (grep). Five classroom stances = R13 E3 exactly (Oracle, Tutor, Mirror, Adversary, Librarian). Every study in the guide carries a date and a numbered source. Stated no stronger than source: fails on Bastani (D1, D2); smaller overstatements D3–D7. Kosmyna: dated, called a preprint, "does not show lasting harm" — acceptable. Calculator meta-analyses and Papert quotes match the essay verbatim; their paraphrases on the slides are firmer (D4). |
| 3 | Appropriateness | **Pass, one note** | 16+ throughout; Claude.ai 18+ stated with source; no accounts, no device needed by students; self-check not collected, no name field on it; feedback email asks for no student work or names; Therapist/Confessor routed to safeguarding; "not yet piloted" in README, guide header, §1 and §10; examples labelled made up. Note: the slide-13 notes script a no-detector promise the teacher may not control (D8). |
| 4 | Build | **Pass** | Scratch copy, `python tools/build.py`: exit 0, "build OK", 7 s. Teacher guide 10 A4; slides 16 at 960×540 pt (16:9); lesson notes 4 A4; self-check 2 A4; sheet 1 A4; cards 3 A4 (5 stance cards + 1 how-to card, A5 halves). pdftotext returns text for all six; rebuilt text identical to the shipped PDFs. README links resolve inside the repo. No .pptx: python-pptx is absent on this machine too; disclosed in CHANGELOG and README. |
| 5 | Voice and rules | **Pass, nits** | 0 hits for revolutionary/unlock/supercharge/game-changing/seamless/empower, 0 for the pen name, 0 prices, in all .md sources and all PDF text. Voice is plain and dry. Housekeeping wording in README/CHANGELOG (D17). |

## Time the reads took

Wall-clock for this reviewer: README + slides + notes 09:22:13, guide 09:22:21, sheet + self-check + cards 09:22:34 (machine reads, seconds).
Teacher-equivalent at ~200 words/min, from the PDF word counts (pdftotext):
- Slides (856 words) + lesson notes (1,930): about 14 minutes. Enough to run the lesson, plus slide-12 preparation (20–30 min, not in the README steps).
- Assignment sheet (312 words): about 2 minutes to set an assignment. Reading a mode log needs guide §7 as well (~550 words, 3 minutes).
- Teacher guide (4,972 words): about 25 minutes for all of it. The guide says "about an hour"; the README says "sections 1 to 6, about 30 minutes" (D16).
- Self-check (725) and cards (593): about 7 minutes together.

## Defects, ranked

Order: wrong or overstated claims, then unsafe for a school, then unusable steps, then clarity, then nits. Severity in brackets.

### Wrong or overstated claims

**D1 [High] Bastani misread: the tutor, not the answer version, made practice look best.** Guide §2: "Read that twice. The tool that made
practice look best made learning worst." Slide 5 notes: "Ask: 'Why would the version that made practice look best make the exam worse?'"
The pack's own figures (slide 5 table, guide §2, source [4]) give practice +48% for the answer version and +127% for the tutor version.
So the answer version made practice look *better than no AI*, not *best*. A student looking at the slide will see this while the teacher
asks the question. Fix: "The version that made practice look good made the exam worse" / "Why would a version that raised practice scores
make the exam worse?"

**D2 [Medium] "Same AI, opposite results" (slide 5 title; guide §2 "The same model, opposite results").** The exam results were harm
(−17%) versus no measurable difference ("the same as no AI", as the slide's own table says). That is harm versus no harm, not opposite
results. The wording comes from the W32 brief and R13, but it is stronger than the study. Suggest "Same AI, different results" or "One
version hurt; the other did not".

**D3 [Medium] Unsourced behaviour claims stated as frequencies.** Slide 13 notes and guide §5: the AI that gave the wrong date "will
usually tell you it's right" / "will usually confirm it". Slide 9 notes and guide §4 Mirror: ask "is my essay good?" and "you'll
usually hear yes". No source is given for "usually", and models also cave and change a correct answer when challenged. The point (the
same chat is not a check) holds either way; the frequency claim is not needed. Suggest "may simply agree with itself, or with you".

**D4 [Low] Calculator evidence firmed up on the slides.** Slide 3: "The one harm: heavy use too early, before the basics"; its notes:
"very heavy use in Grade 4 got in the way of basic skills". Source (Hembree & Dessart 1986, as quoted in the guide): sustained use in
Grade 4 "appears to hinder the development of basic skills in average students". Slide 2: "US maths teachers were told to use
calculators" — NCTM made a recommendation; nobody was told.

**D5 [Low] The ban framing.** Guide §2 opens with NYC as the example of the "ban" position, but the NYC moratorium covers 2-K to grade 8
and (per R13) gives high schoolers AI-literacy lessons and pilots: it is outside this pack's 16+ audience and arguably on its side.
"Schools have mostly taken one of two positions" has no source. "A ban ... leaves you checking work with ... detection" does not follow:
a ban can be enforced with supervised work, which is what the pack's own Mode A does. A teacher in a banning district may put the pack
down here.

**D6 [Low] Anthropic's 47% "direct" equated with Bastani's answer version.** Guide §2: "Nearly half the time, in other words, students
used the tool the way Bastani's answering version worked." The report classes conversations as direct vs collaborative; it does not
say those conversations replaced the student's thinking. Suggest "about half the time, students asked for the answer or the finished
piece".

**D7 [Low] Small stretches, bundled.** (a) Guide §5 after Parasuraman & Manzey: "Knowing the rules was not enough; what helped was
structure" — the second half is not in the cited source as quoted. (b) Guide §4: *The Fourteen Stances* "recommends one move above all
others: adopt the Tutor over the Oracle" — §4.3 lists four adoptions; the Tutor is first, not above all others. (c) Guide §3: Papert's
"true *computer* literacy" becomes "true literacy". (d) Guide §2 heads Kosmyna "The early warning signs are real but small" and omits the
January 2026 comment (arXiv 2601.00856) that R13 recorded; "real" is more than a preprint supports.

### Unsafe for a school

**D8 [Medium] A detection promise the teacher may not control.** Slide 13 notes have the teacher say "I don't need a detector" and, if
asked, "This class does not use them." If the school or exam board runs an AI detector on submissions, the script puts a false promise
in the teacher's mouth. Suggest: "I won't rely on a detector; the unaided part is how I check." Nothing else in the pack would worry a
safeguarding lead: no data, no accounts, no student device use, Therapist use routed to pastoral care.

### Unusable steps (places the teacher has to invent something)

**D9 [Medium] Is the Oracle allowed in Mode B?** The sheet's Mode B allows Tutor plus ticked Mirror/Adversary/Librarian; the Oracle is
not listed. Yet the student declaration offers "Oracle", the slide-14 example log and guide §7 show an Oracle entry, and guide §7 says an
honest Oracle entry is welcome. A teacher reading a Mode B log with "Oracle, checked nothing" has no rule for whether that is a breach or a
conversation. Add one line to the sheet and §6.

**D10 [Medium] The core activity (slide 12, "Fluently wrong", 7 minutes) ships without material.** The teacher must generate an AI
answer in their subject containing an error they have verified, with a school-approved tool. No ready-made example is provided, the
README's one-lesson steps do not mention the preparation, there is no path for a school with no approved tool, and "this usually takes
two or three tries" is unsourced. Suggest one printable, clearly made-up worked example per broad subject (history dates, a maths
solution, a fake source list) as a fallback.

**D11 [Medium] One mode log per student per term.** The only log is the bottom of self-check page 2 (7 rows). The term plan needs logs for
at least two assignments (B and C), and slide 16 tells students to "keep the mode log page for the next assignment". There is no
standalone log sheet; photocopying page 2 reprints the scoring key each time. Suggest a one-page mode log as a seventh PDF.

**D12 [Medium] "On paper at home" offered as an unaided option.** Assignment sheet, "Done unaided": ☐ on paper at home. Guide §6 defines
the unaided part as "in class or in conversation" and §8 makes it *the* check; an unaided part done at home checks nothing. Drop the box
or add "(not as the check)".

**D13 [Low] The sheet alone does not tell you how to read the log it asks for.** Setting the assignment from the sheet works. Reading
the log returned needs guide §7 (good signs, signs worth a conversation, "show me"). A three-line "reading the log" box on the sheet's
teacher section, or on the back, would close it.

### Clarity

**D14 [Low] The lesson does not fit its stated length.** Slide timings sum to 45 minutes; the self-check adds 10 ("if there are ten
minutes left"), so 55 against "about 50 minutes" (README, notes header, guide §1).

**D15 [Low] No student name on the assignment sheet.** Only a signature line; with 30 sheets back, a printed name field helps.

**D16 [Low] Reading-time estimates disagree.** Guide §1 "about an hour to read"; README "sections 1 to 6 (about 30 minutes)". The whole
guide is ~5,000 words, about 25 minutes.

### Nits

**D17** README "Changing it" and CHANGELOG expose build housekeeping to a teacher: "the banned words", "prints a PROBLEM line",
"python-pptx was not installed on the build machine". Say "checks page sizes and that nothing overflows" and "the slides are PDF only".

**D18** README links `../../LICENSES/`, `../../THE_FOURTEEN_STANCES.md`, `../../MODE_FLUENCY_MATRIX.md` resolve in the repo but break if a
teacher downloads only the kit folder; no licence text sits inside the kit. Use absolute GitHub/site URLs.

**D19** AIAS authors: guide §6 "Perkins, Furze and Roe"; source [18] "Perkins, Roe & Furze" (arXiv 2412.09029 order). Make them agree.

Not a defect: lesson-notes page check in build.py accepts 1–99 pages (lax but harmless); no .pptx (python-pptx absent, disclosed).

## Counts

High 1 · Medium 7 (D2, D3, D8, D9, D10, D11, D12) · Low 8 (D4, D5, D6, D7, D13, D14, D15, D16) · Nits 3 (D17–D19).

## Three things right

1. **Fidelity of the stances.** Every quoted expectation, failure mode and rule matches *The Fourteen Stances* and the Matrix word for
   word, the examples are new, school-shaped and labelled made up, and the five chosen are exactly R13's classroom set.
2. **Honesty and safety by design.** "Not yet piloted" and "the key claim is untested" (guide §10) are said plainly; nothing collects
   data, students need no account or device, the self-check is never collected, Claude.ai's 18+ rule is stated with its source, and the
   feedback email asks for no student work or names.
3. **The unaided part as the check.** Guide §8 turns "did they use AI?" into "do they understand their own work?" without a detector,
   defers to school and exam-board policy, and ends with "change the next assignment, not only the student". That is the page a head of
   department would photocopy. The build also reproduces exactly: one command, 7 seconds, identical text.

## Re-review after the fix pass (CHANGELOG 0.2) — 2026-11-02

Same reviewer, the kit as it stood at 09:33. Rebuilt in a fresh scratch copy: `python tools/build.py` ends "build OK" (exit 0).
Guide 11 A4, slides 16 at 960×540 pt, notes 5 A4, self-check 2, sheet 1, cards 3, mode log 1, activity handout 1. pdftotext text of
every rebuilt PDF is identical to the shipped PDF. 0 banned words, pen name or prices in sources or PDF text (the only grep hits were
"problem" and "not banned"). README links are now absolute URLs. Lesson timings now add up to 42 min + 8 min self-check = 50.

**Verdict: no blocker for merge. I would use it next week as shipped.**

### Original defects

| # | Sev. | Result | Evidence |
|---|---|---|---|
| D1 | High | **Pass** | Guide §2 and slide-5 notes: "both AI versions improved scores: GPT Base by about 48% and GPT Tutor by about 127%"; exam "about 17% worse" for GPT Base, "no significant difference" for GPT Tutor. "Look best / worst" is gone everywhere (grep). |
| D2 | Med | **Pass** | "Same AI, different results" (slide 5) and "The same model, different results" (guide). No "opposite" anywhere. See N1 for a residual. |
| D3 | Med | **Pass** | No unsourced "usually". Now reads "may simply agree with itself, or with you" (guide §5, slides 9 and 13). |
| D4 | Low | **Pass** | Slide 3 quotes "appears to hinder" basic skills in average students. Slide 2 notes: "recommended". |
| D5 | Low | **Pass** | Guide §2 says NYC gives high schoolers AI literacy lessons and pilots. "Mostly" is dropped, and the ban paragraph credits supervised work (Mode A). |
| D6 | Low | **Pass** | "That does not prove the thinking was handed over each time". |
| D7 | Low | **Pass** | (a) Parasuraman: the inference is labelled "mine, not the review's". (b) "lists the Tutor first among the stances worth adopting". (c) Papert quote is complete, with "computer". (d) The Kosmyna comment is cited as [23]. |
| D8 | Med | **Pass** | Slide-13 notes: "speak for this pack, not for the school: 'This pack uses no detector'"; "Your school's or exam board's own rules still apply." |
| D9 | Med | **Pass, residuals N2 and N3** | Mode B = Tutor, Mirror, Adversary, Librarian; "not the Oracle" in the sheet, guide §6 table and text, §7, slide 15 and its notes, slide-14 notes and mode-log.pdf. The guide §7 example log is now Mode B, with no Oracle line. |
| D10 | Med | **Pass, residual N4** | activity-handout.pdf (made-up WWI answer, labelled "not real AI output", two per page); slide-12 notes and guide appendix carry the three checks and a key with three errors. The key's facts are correct: US entry April 1917, Zimmermann Telegram January 1917, armistice signed at Compiègne and in force at 11 a.m., Hall of Mirrors = Treaty of Versailles 28 June 1919. README step 3 covers preparation, with a no-approved-tool fallback. |
| D11 | Med | **Pass** | mode-log.pdf: 16 rows, one sheet per assignment. The self-check log is "for your first". README term step 2 hands one out per assignment. |
| D12 | Med | **Pass** | Sheet: "where I can see it: ☐ in class ☐ in a short conversation with me ☐ other, supervised". No "at home" (grep). |
| D13 | Low | **Pass** | "Reading the log" box on the sheet's teacher section. |
| D14 | Low | **Pass** | 42 + 8 = 50 minutes. |
| D15 | Low | **Pass** | Name line in part 2. |
| D16 | Low | **Pass** | Guide "about 25 minutes"; README "sections 1 to 6 about 15 minutes; the whole guide takes about 25". |
| D17 | Nit | **Pass** | README and CHANGELOG no longer mention banned words, PROBLEM lines or the build machine. |
| D18 | Nit | **Pass** | Absolute URLs for the licences, *The Fourteen Stances* and the Matrix. |
| D19 | Nit | **Pass** | "Perkins, Roe and Furze" in the guide, the sources and the README. |

### New or residual defects (none blocking)

**N1 [Low] "A tutor with guardrails removed the harm"** (slide 5 body; guide §2 "removed the harm"). The study found no significant
difference for GPT Tutor. That is not proof of no harm, and to my recollection the authors' own wording is "largely mitigates"; I have
not re-opened the paper this session. Suggest "largely removed the harm" or "showed no significant harm".

**N2 [Low] The same example log line carries two stances.** Slide 14: "where my steps for Q4 go wrong, no answer | Tutor". Guide §7:
"where my steps for Q4 differ from a worked method, no answer | Mirror". Both stances are allowed in Mode B, but the teacher's two
examples teach different labels for nearly the same request. Pick one.

**N3 [Low] "Oracle (Mode C only)" on the student declaration** clashes with the mode log sheet, the slide-14 notes and the sheet's
own reading box, which all tell a Mode B student to write an Oracle use down anyway. A Mode B student who used it may not circle it.
Suggest "Oracle (outside Mode B; circle it if you used it)".

**N4 [Low] The ready-made activity assumes a WWI source in the room.** Steps 2–3 ("check against your textbook or notes", "look the
source up") need a history textbook or a device. A maths or science class has neither, and the lesson says students need no device.
Suggest a note in the slide-12 notes: the teacher reads out or projects the two facts from the key for pairs to check against,
and handles the source check as a class discussion.

**N5 [Nit] Source [4] (Knowledge at Wharton) is listed but no longer cited in the guide text.** Cite it or drop it.

Counts after the fix pass: High 0 · Medium 0 · Low 4 (N1–N4) · Nit 1 (N5). All 19 original defects pass.
