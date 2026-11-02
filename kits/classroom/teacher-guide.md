# Which mode are you in? A teacher's guide to AI in the classroom

Henrique Jr. Sanchez · Mode Fluency · CC BY-SA 4.0
For teachers of students aged 16 and over, and first-year university teaching. First edition, not yet piloted.

## 1. What this guide is for

Your students use AI. Some of them use it for everything, some hide it, and most have never been taught anything about it except
that it is either cheating or the future. Your school may have a policy that says how much AI an assignment allows. It almost
certainly does not give you, or them, words for the question that decides whether the AI helps them learn or does the learning for
them: **what kind of help am I asking for, and who checks the result?**

This guide gives you that vocabulary and a few pieces of paper to use it with. It takes about 25 minutes to read. It assumes nothing
about which AI tools your school allows; use the ones it has approved, under their age limits.

What is in the pack:

- this guide;
- a one-lesson slide deck with notes (about 50 minutes);
- five stance cards to print;
- a student self-check;
- a mode log sheet, one per assignment;
- a handout for the lesson's checking activity;
- an assignment sheet, "Who checks?", that you attach to any assignment.

Everything is on paper or on your screen. Nothing logs in, nothing collects data, nothing grades or detects anything. You are the
user of this material; your students see the slides, the cards, the self-check and the sheet.

A note on honesty: this pack is built from the Mode Fluency material written for adults at work, adapted for school. It has not yet
been run in a classroom. Where the evidence below is strong I say so, and where it is thin I say that too.

## 2. Why banning and free-for-all both fail

Schools and school systems have moved in both directions. Some restrict student use: in September 2026 New York City announced a
one-year moratorium on student-facing generative AI from its youngest classes through grade 8, while giving high-school students AI
literacy lessons and small pilots, and Los Angeles kept student generative AI off district devices for the 2026–27 year while it
reviews safeguards [1][2]. Elsewhere there is no rule at all, which in practice means anything goes. The evidence says the useful
question is neither "allow it" nor "ban it". It is what kind of help the tool gives.

**The same model, different results.** The cleanest test so far is a field experiment by Bastani and colleagues, published in PNAS in
July 2025 [3]. About a thousand high-school maths students in Turkey practised with one of two versions of the same model, or with no
AI. One version, "GPT Base", behaved like ordinary ChatGPT and answered questions. The other, "GPT Tutor", was prompted to give hints
and not answers. During practice, both AI versions improved scores: GPT Base by about 48% and GPT Tutor by about 127%. Then came the
exam, without AI. Students who had practised with GPT Base did about 17% *worse* than students who never had AI. For students who had
practised with GPT Tutor, the study found no significant difference from students without AI.

Put plainly: unrestricted answers hurt the exam; a tutor with guardrails largely removed the harm. Both groups had the same AI. The difference
was the kind of help.

**The tutor can work very well.** At Harvard, an introductory physics course compared a carefully designed AI tutor with in-class
active learning in a crossover trial of 194 students (Kestin et al., Scientific Reports, June 2025) [4]. Median learning gains with
the tutor were more than double, in a median of 49 minutes. It was two lessons with a short-term test, and the tutor had been built
with pre-written solutions and step-by-step scaffolding. But it shows what is possible: help that keeps the student doing the thinking
can beat a good lesson.

**What students actually ask for.** When Anthropic analysed 574,740 anonymised conversations by university students in April 2025,
about 47% were "direct": the student asked for an answer or a finished piece with little back-and-forth [5]. That does not prove the
thinking was handed over each time, but it is the pattern the Tutor stance is meant to change.

**What a ban can and cannot do.** A ban enforced with supervised work protects what is supervised; that is Mode A in this pack
(section 6). It does not reach homework or coursework done elsewhere, and it leaves students with no vocabulary for the AI use that
happens anyway. The tempting tool for checking that work, detection, is not fair: a 2023 study found that GPT detectors flagged essays
by non-native English writers as AI-generated far more often than essays by native speakers (Liang et al., Patterns, July 2023) [6].
You cannot build fair assessment on that.

**Smaller signals, with caveats.** An MIT preprint from June 2025 had 54 adults write essays with an AI model, a search engine, or
nothing; the AI group showed the weakest brain connectivity on EEG and the lowest sense of ownership, and struggled to quote their
own essays (Kosmyna et al.) [7]. It is a small lab study published as a preprint, it does not show lasting harm, and a January 2026
comment argues for more conservative readings of it [22]. A January 2026 trial with 52 junior software engineers learning a new
library found the AI group scored 50% on a follow-up quiz against 67% without AI, and those who asked the AI for explanations rather
than code retained more (Shen and Tamkin, Anthropic) [8]. Adults, not students; read both as signals, not findings.

**The calculator already taught us this.** When calculators arrived, the US National Council of Teachers of Mathematics recommended
in 1980 that programs "take full advantage of the power of calculators and computers at all grade levels" [9]. The research
afterwards is specific. A 1986 meta-analysis of 79 research reports found that sustained calculator use in Grade 4 "appears to
hinder the development of basic skills in average students" [10]. A 2003 meta-analysis of 54 studies found that calculator use "did
not hinder the development of mathematical skills", and that skills improved when calculators were "an integral part of testing and
instruction" [11]. Foundations first, then the tool. And redesign the checking around the tool.

That is the calculator's lesson. Not "should we use it", but "for which problems, when, and who checks".

**Where the analogy breaks.** A calculator returns the same correct answer every time. A language model is probabilistic and can be
fluently wrong, in the same confident tone it uses when it is right. A calculator automates a skill below the problem. An AI model
reaches into the framing, the reasoning and the writing: the part you are trying to teach. There is no clean line below which
handing it over is safe, so your students need a way to decide case by case. That is what the rest of this guide is for.

## 3. The stance idea, in classroom terms

Every exchange with an AI starts with an unspoken answer to one question: **what am I expecting from this exchange?** That
expectation is a *stance*. A student who types "explain photosynthesis" might want the answer to copy into a worksheet, a path to
understanding it before Friday's test, or a check on whether their own explanation holds up. Same words, three different stances,
three different results.

Most people, students and adults, hold one or two stances without naming them. The commonest is the Oracle: "the AI knows; tell me
the answer". Its twin is the Genie: "make me the thing". These are the two stances Bastani's GPT Base served, and the two that can
do the learning for the student.

Mode fluency, the idea behind this pack, is knowing which stance you are in, choosing it on purpose, and when the work goes wrong,
going back to the right step instead of retyping the question. For a student, that comes down to two habits:

1. **Name the stance before you type.** Say, or write, what kind of help you want.
2. **Do that stance's one check.** Each stance has a characteristic way of failing and one rule that guards against it.

Seymour Papert said it about computers in 1980: "true computer literacy is not just knowing how to make use of computers and
computational ideas. It is knowing when it is appropriate to do so" [12]. Swap "computers" for "AI" and it still holds.

The full Mode Fluency set has fourteen stances, written for adults at work. Five of them are useful and safe in a classroom. The
next section gives them in the words of the original texts, with the adult examples swapped for school ones.

## 4. Five stances for the classroom

Each stance below gives the expectation the student brings, how it fails, the one rule, and a made-up school example. The
expectation, failure and rule are quoted from *The Fourteen Stances* and the Mode Fluency Matrix [13][14]; the examples are new and
invented for this pack.

### The Oracle: the answer machine

**Expectation.** "The Oracle is the expectation of truth. You bring a hard question you cannot easily answer yourself, and you expect
the answer to be correct."

**How it fails.** "The Oracle collapses when the LLM hallucinates or confabulates, because the user has outsourced their epistemic
filter. They asked for *truth* and received *plausible prose*." In classroom terms: the answer is fluent, confident and sometimes
wrong, and the student has no way of telling which.

**The one rule.** "Ask for the uncertainty before the answer. Treat the answer as a claim, not a verdict."

**Example (made up).** A student revising for a history test asks for the three main causes of a war and the date it ended. The
answer reads well and has the end date wrong by a year. Applying the rule: "Before you answer, tell me which parts of this you are
least sure about." Then the student checks the date in the textbook.

The Oracle is the stance most students start in. The Fourteen Stances lists the Tutor first among the stances worth adopting: the Tutor over the
Oracle.

### The Tutor: a path to the answer

**Expectation.** "Not an answer, but a path to an answer. The human arrives confused and expects the LLM to diagnose gaps in
understanding, ask clarifying questions, and guide discovery."

**How it fails.** "Being taught toward a goal you never stated." The AI teaches what it guesses you need, which may not be what the
test, the essay or the next lesson needs.

**The one rule.** "State what you want to be able to do afterwards before the first question."

**Example (made up).** "I have a test on Friday on solving quadratic equations, without a calculator. I want to be able to do them on
my own. Don't tell me the answer yet. What questions should I be asking?" The last two sentences are quoted from the original stance;
they are the most useful thing in this pack.

The Tutor is slower than the Oracle, and that is the point. Bastani's tutor group did not beat the no-AI group on the exam; it
avoided the damage the answer machine did. Psychologists call the useful kind of effort a "desirable difficulty" [15].

### The Mirror: my own thinking, clarified

**Expectation.** "The LLM reflects the user's own thoughts back with greater clarity, precision, or structure. The value is not in
novelty but in *recognition*."

**How it fails.** "Flattery mistaken for reflection." A model may simply agree with the person typing: a student who asks "is my argument good?" may hear yes whether
it is or not.

**The one rule.** "Ask for the structure of your argument back, not for agreement."

**Example (made up).** A student pastes their own notes for an English essay on a novel: "List the claims I make, in order, and the
evidence I give for each. Do not tell me whether they are good and do not add any of your own." The student then sees that two
claims have no evidence at all.

### The Adversary: attack my draft

**Expectation.** "The human brings a belief, plan, or draft and expects the LLM to attack it, find holes, or steel-man the
opposition."

**How it fails.** "Critique of the wrong thing." The AI attacks the spelling, or a point the student never meant to defend, and misses
the weak link.

**The one rule.** "Name what you are defending and what would change your mind."

**Example (made up).** Before a debate on whether a town should build a bypass, a student writes: "I am arguing that the bypass
should be built. My main reason is the air quality on the high street. I would change my mind if the traffic would simply move to
the villages. Attack that reason the way a well-prepared opponent would."

### The Librarian: what has been said

**Expectation.** "Retrieval and synthesis of *known* information, not prophecy. The user wants to know what has been said, not what
*is*." The Librarian "admits fallibility; the Oracle does not."

**How it fails.** "Confident retrieval of what was never said." Invented sources, real authors with books they never wrote, real books
with quotations that are not in them.

**The one rule.** "Check the citation exists and says what is claimed."

**Example (made up).** For a geography project on coastal erosion, a student asks for five published sources with author, year and
title. Applying the rule, the student looks each one up in the library catalogue or online before using it. One does not exist;
another exists but is about a different coast.

### The stances left out, and why

- **The Genie** ("make me the thing") and **the Executor** ("do the whole job while I am not looking") are the stances an assignment
  mode governs (section 6). They are not banned; they are what the "full use" mode allows, with a deviation report and an unaided part
  attached.
- **The Therapist or Confessor** (a space to think aloud about personal matters) is a safeguarding matter with students, not a study
  skill. If a student tells you they use AI this way, follow your school's safeguarding and pastoral routes.
- **The Interpreter** (decode this document for me) is useful for older students, with one habit attached: "Show me exactly which
  parts of the text support each conclusion." Add it when your class is ready.
- The rest (Simulator, Scribe, Muse, Miner, Translator) are in *The Fourteen Stances* if you want them.

## 5. Who checks?

The single most useful question to ask about any piece of AI-assisted work is **who checks it, and against what?**

The principle, as this pack uses it:

> **Every piece of AI-assisted work has a checker, named before the work starts. The checker is never the chat that wrote it.**

Asking the same chat "is this right?" is not a check. The chat that produced a confident wrong date may simply agree with itself, or with you. A check
is something outside the conversation:

- **the student**, against a source: the textbook, their notes, the original document, their own working;
- **the student**, by doing one part without help and comparing;
- **you**, through the part of the assignment done unaided (section 6);
- **a peer**, who explains the work back.

Training alone will not make the check happen. A review of automation research found that automation bias "cannot be prevented by
training or instructions" (Parasuraman and Manzey, Human Factors, 2010) [16]. If instruction alone does not prevent it in trained
professionals, a lesson alone will not prevent it in students; that inference is mine, not the review's. So this pack puts the
check into structure. In a classroom, the structure is the assignment: what is done unaided, what is declared, and who checks.

**The same rule applies to you.** If you use AI to draft feedback, plan a lesson or summarise a set of essays, you are in a stance
too, usually the Oracle or the Interpreter, and you are the checker. Read the student's work yourself before you read anything an AI
says about it. Do not paste student names or personal data into a tool your school has not approved for it.

## 6. Three assignment modes

Every assignment you set already has an answer to "how much AI is allowed?", even if the answer is unstated. The assignment sheet in
this pack makes it explicit with three modes. They are deliberately few.

| Mode | The AI may | The student hands in | Who checks |
|---|---|---|---|
| **A: No AI** | Nothing | The work | You, as always; done in class if it must be secure |
| **B: Tutor only** | Act as Tutor, Mirror, Adversary or Librarian, each with its one rule. Not the Oracle: no asking it for answers. It writes no part of what is handed in. | The work and the mode log | The student, in the log; you, by reading the log and asking about one entry |
| **C: Full use** | Anything your school's rules allow, including drafting | The work, the mode log, a deviation report, and an unaided part | You, by comparing the unaided part with the work |

**Mode A** is the calculator rule: foundations first. Keep at least one no-AI task in every unit, done where you can see it. It is
not a punishment; it is the baseline that makes the other two modes readable.

**Mode B** is the one that does the most good, if the Bastani result holds outside its maths classroom: the tool as tutor, not as
answer machine. Four stances are allowed: the Tutor, and the three that work on the student's own thinking or sources (Mirror,
Adversary, Librarian). The Oracle is not: in Mode B the student does not ask the AI for answers. The student keeps a mode log (the mode
log sheet, one per assignment): what they asked, which stance, what they checked themselves, what they changed.

**Mode C** lets students use AI as they would at work, with two conditions borrowed from how adults are told to supervise AI that
works for them. First, a **deviation report**: a few lines saying which parts the AI produced or changed, where the student departed
from what it gave and why, what they checked and how, and what they could not check. The original rule for adults is "tell me
everywhere you departed from the letter of the task, and why"; here the student writes it about their own use. Second, an **unaided
part**: a short task done without AI, in class or in conversation, on the same material. A paragraph written in ten minutes, three
questions answered aloud, one step of the method redone on paper.

The unaided part is what makes Mode C fair. A student who understood the work they handed in can do the unaided part. A student who
did not, cannot, and no detector is needed to see it.

These modes sit next to existing frameworks, not against them. The AI Assessment Scale (Perkins, Roe and Furze, revised December 2024)
sets out five levels from "No AI" to "AI Exploration" [17]; the University of Sydney's "two-lane" approach separates secure,
supervised assessment from open assessment where AI is permitted [18]. If your school uses one of these, map Mode A to the secure end
and Mode C to the open end. What this pack adds is the layer underneath: within whatever is allowed, which kind of help, and who
checks.

## 7. How to read a mode log

A mode log has one line per time the student used AI on the assignment. A Mode B log might look like this:

| Date | What I asked (a few words) | Which mode | What I checked myself | What I changed |
|---|---|---|---|---|
| 4 Mar | how to factorise when a ≠ 1 | Tutor | did the last 3 practice questions alone | nothing, it was right |
| 6 Mar | where my steps for Q4 go wrong, no answer | Tutor | checked against worked example p. 41 | the sign in step 2 |

*Made-up entries, for illustration.*

**What it is for.** The log is a habit and a conversation starter. It makes the student name the stance at the moment of use, which is
the habit you are trying to build, and it gives you something concrete to ask about. It is not evidence of honesty and should not be
treated as one.

**Good signs.** Stances are named, and vary with the task. Checks are specific ("checked against worked example p. 41", not
"checked it"). Some entries say "changed: nothing" and some do not. In a Mode C log, the occasional honest Oracle entry.

**Signs worth a conversation.**

- An Oracle entry in a Mode B log. The rule on the sheet and the log is the same sentence: "If you used the Oracle in Mode B, record it; it counts as a deviation." The student told
  you; talk first, then apply what the sheet said.
- Every entry is the Oracle, with "checked: nothing" (Mode C). The student is using the tool as an answer machine. Talk about the Tutor.
- Every check is the AI checking itself ("asked it if it was sure"). Talk about who checks.
- Every entry is a tidy Tutor entry, and the work reads nothing like the student's unaided writing. Ask about one entry.
- The log is empty, but the work moved a long way between drafts. Ask how.

**How to ask.** Pick one entry and say "show me". "Show me the bit you checked on page 41." "Tell me what you changed in step 2 and
why." A student who did what the log says can show you in a minute.

**What not to do.** Do not mark the log for which stances appear. Even in Mode B, a student who logs an honest Oracle use is more
useful to you than one who logs a tidy Tutor use that never happened. If you give credit for the log at all, give it for being complete and specific.

## 8. When a student hands in AI work as their own

This section is about method, not policy. What counts as misconduct, and what happens next, is your school's or exam board's
decision; follow it. What follows is how to get to a fair conversation without guessing.

1. **Do not start from a detector or a feeling about the style.** Detectors are unreliable and unfair to some students (section 2).
   A hunch that "this doesn't sound like them" is a reason to look, not a finding.
2. **Start from the unaided part.** That is why it exists. Put it next to the submitted work. Does the student handle the same
   material, at roughly the same level, with the same ideas? A gap is normal (people write better with time and help); a gap in
   *understanding* is what matters.
3. **Have a short conversation about the work.** Ask the student to explain one paragraph in their own words, to say why they chose
   one source or one step, or to redo one small part in front of you. Keep it about the work, not about the AI. Students who did the
   thinking can do this, even if an AI helped them write.
4. **Look at the declarations.** Did the mode log or deviation report say what the AI did? A student who declared heavy use in a Mode
   C task has done what was asked. A student who declared nothing in a Mode B task, and cannot explain the work, has a different
   conversation coming.
5. **Write down what you saw, then apply your policy.** What the unaided part showed, what the student could and could not explain,
   what they declared.
6. **Change the next assignment, not only the student.** If several students could not explain their own work, the assignment was
   answerable by the answer machine. Move more of it into the unaided part, or ask for the judgment (which source, which claim, why)
   rather than the finished product.

The unaided part turns "did they use AI?", which you cannot answer, into "do they understand their own work?", which you can.

## 9. A one-term plan

A suggested plan for a twelve-week term. Adjust to your calendar.

| Week | What you do | Material |
|---|---|---|
| 0 | Read this guide. Choose three assignments in the term and a mode for each. | Guide, assignment sheet |
| 1–2 | Run the lesson. Students do the self-check. | Slides, notes, cards, self-check, activity handout |
| 2–4 | Assignment 1, **Mode A (no AI)**, done partly in class. This is the baseline. | Assignment sheet |
| 4–7 | Assignment 2, **Mode B (tutor only)** with a mode log. Read the logs; ask each student about one entry. | Assignment sheet, mode log sheet |
| 7 | Ten minutes in class: which stances did you use, and what did you check? Hands up, no names written down. | Cards |
| 7–10 | Assignment 3, **Mode C (full use)** with a mode log, a deviation report and an unaided part. | Assignment sheet, mode log sheet |
| 11 | A short no-AI task on the term's content. Compare with week 2–4, for your own information. | — |
| 12 | Students answer the self-check's first question again. Ask the class what changed. | Self-check |

What you will have at the end: three assignments with known modes, a set of mode logs, one unaided task per unit, and your own
sense of whether naming the stance changed anything. If you are willing to share that sense (not student work, not names), see the
last section.

## 10. What this pack does not claim

- **It has not been piloted.** This is a first edition. I have no classroom results to report, and I make no claim that it improves
  grades, learning or honesty.
- **The key claim is untested.** In Bastani's and Kestin's studies the tutoring behaviour was built into the tool. Nobody has yet
  shown that students who *choose* the Tutor stance themselves, in an ordinary chatbot that will also give answers, get the same
  protection. The one adult hint points that way: in Shen and Tamkin's trial, the engineers who asked for explanations retained more
  [8]. This pack bets that naming the stance helps. It might not.
- **Age.** It is written for students aged 16 and over, with you as the user. Tools have their own age rules: for example, Claude.ai
  requires users to be 18 or over (Anthropic consumer terms, effective 8 October 2025) [19]. Use the tools your school has approved,
  under their terms.
- **No data.** Nothing in the pack collects anything. Mode logs and self-checks stay on paper with the student and with you.

**Tell me how it went.** If you use any of this, I would like to hear what worked and what did not: hello@modefluency.com. Please send
what you saw, not student work or names.

Credit where it is due: the stance idea draws on Anthropic's AI Fluency course and its 4Ds (Delegation, Description, Discernment,
Diligence) [20]; Ethan and Lilach Mollick's "Assigning AI: seven approaches for students" (tutor, coach, mentor, teammate, tool,
simulator, student) got to classroom roles first [21]; Nate B. Jones's intent engineering, Andrej Karpathy's context engineering,
Felix Rieseberg's types of ambition, and the CHI 2026 paper on archetypes of roles assigned to AI shaped the larger framework this
pack comes from.

## Appendix: a ready example for the "Fluently wrong" activity

Slide 12 needs one AI-style answer with errors students can find. If you cannot make your own with a school-approved tool, use this
one: it is printed twice per page, ready to cut, in activity-handout.pdf. **It is a made-up illustration written for this pack, not
real AI output.** It imitates the confident style an answering AI often has.

**The question, asked in the Oracle stance:** "Why did the United States join the First World War, and how did the war end? Give me a
source."

> The United States entered the First World War in April 1916, after German submarines sank the passenger liner Lusitania and Germany
> returned to unrestricted submarine warfare. The Zimmermann Telegram, in which Germany proposed an alliance with Mexico, turned
> American opinion further against Germany. American troops arrived in France in large numbers during 1918 and helped stop the German
> spring offensives. The war ended when the armistice was signed in the Hall of Mirrors at the Palace of Versailles at 11 a.m. on
> 11 November 1918.
>
> Source: M. Hartwell, *Empires at the Brink: Europe 1900–1918* (Oxford: Clarendon Press, 2009), p. 212.

**The three checks a student runs.**

1. **Underline every claim you could check:** dates, places, names, the source.
2. **Check two of them against the textbook or notes:** when did the United States enter the war? Where was the armistice signed?
3. **Look the source up** in the library catalogue or online: does the book exist, and does page 212 say this?

**Key for you.** The United States declared war in April 1917, not 1916 (the Zimmermann Telegram the answer mentions is from January
1917, so the timeline does not even fit itself). The armistice was signed in a railway carriage near Compiègne in France, in the early
morning; it took effect at 11 a.m. The Hall of Mirrors is where the Treaty of Versailles was signed, on 28 June 1919. The source was
invented for this illustration: students should not find it, and if a book of that name turns up, it is a coincidence. The rest is
broadly right, which is the point: the errors sit inside fluent, mostly correct prose. Stance: the Oracle. What to ask first: "Before
you answer, tell me which parts you are least sure about", and for the source, the Librarian's rule.

## Sources

Accessed 2026-11-01 unless stated.

1. News 12, "New York City schools ban student use of generative AI through 8th grade", 2 September 2026. https://hudsonvalley.news12.com/new-york-city-schools-ban-student-use-of-generative-ai-through-8th-grade
2. NBC Los Angeles, LAUSD generative AI restriction for 2026–27, 2 September 2026. https://www.nbclosangeles.com/news/local/lausd-generative-ai-ban/3936907/
3. Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö. & Mariman, R. (July 2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. PNAS 122(26), doi:10.1073/pnas.2422633122. https://ideas.repec.org/a/nas/journl/v122y2025pe2422633122.html
4. Kestin, G., Miller, K., Klales, A., Milbourne, T. & Ponti, G. (June 2025). AI tutoring outperforms in-class active learning. Scientific Reports 15:17458. https://pmc.ncbi.nlm.nih.gov/articles/PMC12179260/
5. Anthropic (8 April 2025). Anthropic Education Report: How university students use Claude. https://www.anthropic.com/news/anthropic-education-report-how-university-students-use-claude
6. Liang, W. et al. (10 July 2023). GPT detectors are biased against non-native English writers. Patterns. https://arxiv.org/abs/2304.02819
7. Kosmyna, N. et al. (June 2025). Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task. arXiv preprint. https://arxiv.org/abs/2506.08872
8. Shen, J. H. & Tamkin, A. / Anthropic (29 January 2026). How AI assistance impacts the formation of coding skills. https://www.anthropic.com/research/AI-assistance-coding-skills
9. NCTM (1980). An Agenda for Action: Recommendations for School Mathematics of the 1980s. ERIC ED186265. https://eric.ed.gov/?id=ED186265
10. Hembree, R. & Dessart, D. J. (1986). Effects of Hand-Held Calculators in Precollege Mathematics Education: A Meta-Analysis. JRME 17(2):83–99. https://pubs.nctm.org/view/journals/jrme/17/2/article-p83.xml
11. Ellington, A. J. (2003). A Meta-Analysis of the Effects of Calculators on Students' Achievement and Attitude Levels in Precollege Mathematics Classes. JRME 34(5):433–463. https://pubs.nctm.org/view/journals/jrme/34/5/article-p433.xml
12. Papert, S. (1980). Mindstorms: Children, Computers, and Powerful Ideas. Basic Books. https://worrydream.com/refs/Papert_1980_-_Mindstorms,_1st_ed.pdf
13. Sanchez, H. J. (29 October 2026). The Fourteen Stances: archetypes of human-AI interaction. https://github.com/hjasanchez/agentic-engineering/blob/main/THE_FOURTEEN_STANCES.md
14. Sanchez, H. J. (October 2026). The Mode Fluency Matrix. https://modefluency.com/matrix.html
15. Bjork, E. L. & Bjork, R. A. (2011). Making things hard on yourself, but in a good way: Creating desirable difficulties to enhance learning. https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/04/EBjork_RBjork_2011.pdf
16. Parasuraman, R. & Manzey, D. H. (2010). Complacency and Bias in Human Use of Automation: An Attentional Integration. Human Factors 52(3):381–410. https://doi.org/10.1177/0018720810376055
17. Perkins, M., Roe, J. & Furze, L. (December 2024). The AI Assessment Scale revisited. https://arxiv.org/abs/2412.09029
18. University of Sydney, the two-lane approach to assessment. https://educational-innovation.sydney.edu.au/teaching@sydney/?p=21264
19. Anthropic, Consumer Terms of Service, effective 8 October 2025, section 2. https://www.anthropic.com/legal/consumer-terms
20. Anthropic, with J. Feller and R. Dakan. AI Fluency: Framework & Foundations. https://www.anthropic.com/ai-fluency
21. Mollick, E. & Mollick, L. (2023). Assigning AI: Seven Approaches for Students, with Prompts. SSRN 4475995. https://papers.ssrn.com/abstract=4475995
22. Stankovic, M. et al. (January 2026). Comment on: Your Brain on ChatGPT. arXiv 2601.00856. https://arxiv.org/abs/2601.00856
