# Run B: INTERVIEW, following SKILL.md §4 and references/question-bank.md literally

Reviewer plays both sides. User: Ana, solo freelance translator (EN/ES → Brazilian Portuguese), legal and marketing
work, uses ChatGPT and Claude daily, no agents. Reviewer notes are in *italic brackets*.

---

**User:** someone sent me this "mode fluency" thing. which stance am I in?

**Agent (§1 + §4.1, framing and Q1 in one message):** I'll run the Mode Fluency interview: about 12 questions, one at a
time, roughly ten minutes. Concrete recent examples help far more than general descriptions, and you can skip any question.
**Q1.** What is your role, and what kind of work fills most of your week?

**A1 (Q1):** Freelance translator, English and Spanish into Brazilian Portuguese. About 60% legal (contracts, NDAs for two
law firms), 40% marketing: landing pages, app strings, newsletters.

**Q2.** Which AI tools do you use for work, and roughly how often each?

**A2 (Q2):** ChatGPT Plus every day, for first drafts of marketing copy. Claude Pro most days: I have a Claude Project for
my biggest law-firm client with their glossary uploaded and a short instruction. No agents, I don't trust them with client files.

**Q3.** Walk me through the last time you used AI for real work: what you gave it, what you expected back, and what you
did with the result.

**A3 (Q3):** Tuesday, a 2,000-word SaaS landing page. I pasted the English into ChatGPT and wrote "translate to Brazilian
Portuguese, keep it punchy". I expected a draft I could post-edit. I rewrote maybe 40%: the tone was too formal, and it
translated the product's button labels, which have to stay in English.

**Q4.** Now a different kind of task from the last two weeks: the same three parts.

**A4 (Q4):** I asked Claude what the right Brazilian term is for "hold harmless" versus "indemnify" in a services contract.
It gave me "isentar de responsabilidade" and "indenizar" with a nice explanation. I used them straight in the contract.

**Q5.** Think of the AI-assisted work that mattered most recently: it went to a customer, your manager, or into a
decision. Same three parts, and how did you check it before it left your hands?

**A5 (Q5):** A 30-page supply agreement for the law firm, in the Claude Project. It drafted section by section with the
glossary; I read everything side by side with the English and fixed style. The client's lawyer still flagged the
jurisdiction clause: it wrote "foro" phrasing that is Portugal usage, and a defined term that wasn't in the glossary was
translated two different ways.

**Q6.** When you start a task with AI, what do you usually tell it? If you have a saved prompt or template, describe or
paste one.

**A6 (Q6):** In ChatGPT just "translate to Brazilian Portuguese" plus the tone. The Claude Project instruction is: "You are
a legal translator. Use the attached glossary. Brazilian Portuguese. Keep the formatting."

**Q7.** What does it know when it works for you: do you attach files, keep notes or instructions it reads every time, or
start fresh?

**A7 (Q7):** For the law firm, the Project glossary (about 300 terms) and that instruction. Everything else starts fresh in
ChatGPT; I don't keep notes.

**Q8.** Does it ever know *why* a task matters or what to favour when things conflict, say speed against accuracy? Where
would it learn that?

**A8 (Q8):** Sometimes, I guess.

*[§3: abstract answer → ask once for a concrete example. Follow-ups do not count toward the 14.]*

**Agent (follow-up):** Can you think of the last time you told it why, or what to favour?

**A8b:** The landing page: I said "it's for a landing page". I've never said anything like "accuracy over speed". It
wouldn't know the contracts get signed.

**Q9.** What do you want it to do when it isn't sure? Have you ever told it?

**A9 (Q9):** I'd want it to mark doubtful terms with [?] so I look at them. I've never told it. It just picks one.

**Q10.** Tell me about the last time an AI output was wrong or disappointing. What did you do next?

**A10 (Q10):** The jurisdiction clause. I went back into the Project and typed "be more careful with legal terms, this is
for Brazil", and had it redo the clause. Then I fixed it myself anyway.

**Q11.** Is there a mistake it makes again and again? How do you handle it today?

**A11 (Q11):** Portugal Portuguese in ChatGPT drafts: "ecrã", "utilizador", "telemóvel". And it translates UI strings and
brand names that must stay English. I fix both by hand every time, with find-and-replace.

*[Branch: Q2 named no agent, so H1/H2 are not eligible. A4 is an Oracle episode (the AI recalled the material; the answer was
accepted without method), so I1 is eligible: asked after Q11. Q12 skipped: solo user, no team. Hesitation: the bank says a
second branch question needs room "drop Q12 (solo users)", but solo users already skip Q12, so it is unclear whether a
solo user may have two branches. Asked one.]*

**I1.** When it answered from documents or its own knowledge, how did you know each point was really right?

**A12 (I1):** For the hold-harmless terms I didn't check. It sounded right and matched what I half-remembered from a
contract years ago.

**Q13.** Last one: if this went well, what would be different about your AI work 30 days from now?

**A13 (Q13):** I'd stop fixing the same Portugal words by hand, and I'd trust the legal terms without calling a colleague.

*[13 questions asked (Q1-Q11, I1, Q13) plus one follow-up. Within 10-14.]*

**Agent (§4.3-4.8): the report**

# Mode Fluency Profile: freelance translator (EN/ES → PT-BR), 2026-10-22
## Stance Profile
| Stance | Seen in | Characteristic failure | Guardrail (do this) |
|---|---|---|---|
| Translator | [A3] "translate to Brazilian Portuguese, keep it punchy"; [A5] the supply agreement | A bridge to a caricature of the other side: Portugal usage in a Brazil text [A5] [A11], button labels translated [A3] | Supply both maps: name the target audience and locale, and the do-not-translate list, before every job |
| Oracle | [A4] "I used them straight in the contract"; [A12] "It sounded right" (single episode, high stakes: a signed contract) | Confident plausible prose taken as fact | Ask for the uncertainty before the answer; treat each legal term as a claim to verify |

How the stances were decided: [A3] and [A5] pass two tests, *Whose substance?* (Scribe) and *Two audiences?* (Translator);
*Two audiences?* separated them, because the work was re-expression for another market, not polishing in one language.
[A4] passed *Material in?* toward Oracle: the AI supplied the material and it was accepted without method ([A12]). Forms
seen: passive Oracle, passive Translator (no evidence trail).
*[Hesitation: for a professional translator the "Translator" stance and the job are the same word, and the Scribe and
Translator tests both fire; the matrix gives no order between tests. I chose by what was handed over.]*

## Autonomy level: Directed — evidence [A3] "a draft I could post-edit", [A5] "read everything side by side"
Every output is reviewed before use; [A2] "No agents". Nothing higher is being trialled.

## Layer readings
| Layer | Reading | Evidence |
|---|---|---|
| Prompt | ⚠️ Partial | [A6] "just 'translate to Brazilian Portuguese' plus the tone" (ChatGPT); the Project instruction has role, glossary, locale, format, but no do-not-translate rule or success criteria |
| Context | ⚠️ Partial | [A7] glossary and instruction for one client; "Everything else starts fresh"; [A5] a defined term missing from the glossary was translated two ways |
| Intent | ⚠️ Partial | [A8b] "it's for a landing page"; "never said anything like 'accuracy over speed'" (low confidence: needed a follow-up) |
| Judgment | ⚠️ Partial | [A9] "I've never told it. It just picks one"; checks only afterwards [A5] |
| Coherence | ⚠️ Partial | [A7] consistent setup for one client only; ChatGPT starts fresh each time; recurring errors [A11] |
| Evaluation | ⚠️ Partial | [A5] side-by-side read; [A12] "I didn't check" the legal terms; an error reached the client [A5] |
| Harness | ⚠️ Partial | [A2] a Claude Project with glossary and instruction; [A11] "I fix both by hand every time" |

*[Hesitation: the bank's Judgment "Partial = checks afterwards only" grades an after-the-fact Evaluation behaviour as
Judgment, which maturity-map.md's Judgment/Evaluation boundary forbids. Kept the bank's reading, cited A9 first.
Hesitation: SKILL §4.4 says chat users get Harness ◻️ "unless they described one"; she described a Project, so graded it.]*

## Binding layer: Prompt — why it binds and what it costs [A3] [A11]
By the dependency rule (SKILL.md §8) the lowest cognitive layer read as Partial is Prompt; no exception applies (autonomy
Directed). What it costs: the two mistakes she fixes by hand every time [A11], Portugal vocabulary and translated UI
strings, are rules the AI was never given ([A6]: the ChatGPT prompt states the language and tone only). Each one is about
40% rework on marketing jobs [A3]. The dominant stances add a second answer: when a legal term goes wrong, the Oracle
guardrail says check Judgment first (ask for uncertainty); when a translation misreads the market, the Translator guardrail
says check Context (both maps).

## 30-day plan
1. **Write a standing brief and use it every time** (fixes Prompt). A saved text, pasted as the first message in ChatGPT
   and added to the Claude Project instruction: target locale "Brazilian Portuguese, never Portugal usage (e.g. tela not
   ecrã, usuário not utilizador)", "do not translate: product names, UI strings in [brackets], brand names", audience and
   purpose per job, and "mark any term you are unsure of with [?]". Lives in: a note you keep, plus the Project
   instruction. Time: 30 minutes once. Done-check: by day 7, the next three marketing drafts need no find-and-replace for
   Portugal words or UI strings.
2. **Treat every legal term the AI proposes as a claim** (Oracle guardrail; Action 1 does not cover it). For each legal
   term not already in the glossary, ask "how sure are you, and which Brazilian source uses it?", check it in one
   reference you trust, then add it to the glossary with the source. Lives in: the Project glossary (new column "source").
   Time: about 5 minutes per new term. Done-check: by day 30, every term added since today has a source entry, and no
   client flags a term you did not verify.
3. **Never fix the Portugal words by hand again** (harness-loop: "It knew the rule but ignored it sometimes" → a check).
   Once the rule is in the brief (Action 1), keep a list of the 20 Portugal words you most often fix and run it as a
   find list in your editor before every delivery. Lives in: a saved search list. Time: 20 minutes once, 1 minute per job.
   Done-check: by day 21, the list finds zero hits on three deliveries in a row, or you have added the words it still
   misses to the brief.

## What this interview could not see
Your actual prompts and glossary (described, not shown); how often clients flag errors beyond the one example; whether
the Portugal-usage errors also occur in Claude. Coherence across clients is read from one answer [A7].

## What next
> **What next.** Everything behind this diagnosis is free: the AI @ Workplace videos (101–401) and the Stack, Stances and
> Specifying guides at https://github.com/hjasanchez/agentic-engineering. Re-run this diagnostic in 30 days and compare.
> If you would rather have a human run it with your team, Henrique offers a paid Mode Fluency Assessment:
> https://www.linkedin.com/in/henriquejsanchez

Does any of these readings feel wrong to you?

**User:** Prompt surprises me. I thought the glossary was the problem: the contract error was a missing term.

**Agent (§4.8):** Can you give me the example that contradicts the Prompt reading?

**User:** The "foro" clause. The glossary just didn't have it.

**Agent:** That example supports a Context gap, and it is recorded as one ([A5], Context ⚠️; Action 2 adds sources to the
glossary). It does not move the binding layer: by the dependency rule Prompt sits below Context, and your most frequent
cost [A11] comes from rules the prompt never states. **Disagreement recorded:** you read the binding layer as Context;
the profile keeps Prompt, with the reason above. If the 30-day re-run shows the Portugal and UI-string errors gone but
contract terms still flagged, Context becomes the binding layer.

*[Hesitation: "What next" is addressed to "your team" for a solo freelancer; the fixed wording does not fit every user.]*
