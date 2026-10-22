# Interview question bank

Ask **10–14 questions, one per message**: the 13 core questions in order, plus **one** branch question where the
branching note makes it eligible (asked after Q11, before Q12). A second branch question needs room: drop Q12 (solo users)
or fold Q8 into Q13, and mark the folded layer lower confidence. Allow one follow-up per question, only to turn an
abstract answer into a concrete example; follow-ups do not count toward the 14. Number answers A1, A2... in the order
asked, and note which bank ID each answers.

Phrase questions in the user's vocabulary (Q1 tells you it). Do not name stances or layers while interviewing.

## Core questions

| ID | Ask | Probes | Branching note |
|---|---|---|---|
| Q1 | What is your role, and what kind of work fills most of your week? | context for the rest | Sets vocabulary and what "high stakes" means for them |
| Q2 | Which AI tools do you use for work, and roughly how often each? | Harness, Autonomy | Any agent (Copilot agents, Claude Code, Codex, Cursor agent, ChatGPT agent or tasks, Gemini CLI) → H1/H2 become eligible |
| Q3 | Walk me through the last time you used AI for real work: what you gave it, what you expected back, and what you did with the result. | Stance, Prompt | Episode 1. If the answer is a category ("emails"), ask for that specific email |
| Q4 | Now a different kind of task from the last two weeks: the same three parts. | Stance | Episode 2. If it is the same stance as Q3, ask for something that felt different |
| Q5 | Think of the AI-assisted work that mattered most recently: it went to a customer, your manager, or into a decision. Same three parts, and how did you check it before it left your hands? | Stance, Evaluation, Judgment | Episode 3 (high stakes) |
| Q6 | When you start a task with AI, what do you usually tell it? If you have a saved prompt or template, describe or paste one. | Prompt | Pasted prompt: grade it against the Prompt check in stack-audit.md §3 |
| Q7 | What does it know when it works for you: do you attach files, keep notes or instructions it reads every time, or start fresh? | Context, Coherence | "Fresh every time" → Context ≤ ⚠️ |
| Q8 | Does it ever know *why* a task matters or what to favour when things conflict, say speed against accuracy? Where would it learn that? | Intent | |
| Q9 | What do you want it to do when it isn't sure? Have you ever told it? | Judgment | |
| Q10 | Tell me about the last time an AI output was wrong or disappointing. What did you do next? | Evaluation, mode fluency | The key question. Note whether they re-entered at the failing layer or rewrote the prompt |
| Q11 | Is there a mistake it makes again and again? How do you handle it today? | Harness loop | The answer is the raw material for 30-day Action 3 |
| Q12 | If a colleague ran the same task with AI, would they get the same kind of result? Is anything shared: prompts, instructions, a team assistant? | Coherence | Skip for solo users with no team |
| Q13 | Last one: if this went well, what would be different about your AI work 30 days from now? | Intent | Anchors the plan; always ask it last |

## Branch questions (one, or two if room was made)

| ID | Ask when | Ask | Probes |
|---|---|---|---|
| H1 | Q2 named an agent | When an agent does a multi-step job for you, where does it run, what is it allowed to change or send, and what do you look at before you accept the result? | Harness, Executor guardrail |
| H2 | Q2 named an agent | Before it starts, do you see or approve a plan? Afterwards, does it tell you where it departed from what you asked? | Judgment (pre-implementation), deviation report |
| I1 | An episode was Interpreter, Librarian or Oracle | When it summarised or answered from documents, how did you know each point was really in the source? | Evaluation |
| M1 | An episode was Muse or Miner | When you ask for ideas, what happens to the ones you don't use right away? | Context (writing) |

Priority when several are eligible: H1, then I1 or M1 (whichever matches the higher-stakes episode), then H2.

## Reading the layers from answers

| Layer | Strong | Partial | Missing |
|---|---|---|---|
| Prompt [Q3, Q6] | Briefs state task, scope, format and limits; reused template | Some structure, inconsistent | One-line requests |
| Context [Q7, M1] | Persistent instructions or reference files loaded every time; notes kept | Attaches files ad hoc | Starts fresh every time |
| Intent [Q8, Q13] | Why and tradeoffs written where the AI reads them | Says why sometimes, in passing | Never; "it just does the task" |
| Judgment [Q9, Q5, H2] | Told it when to ask, flag or stop; approves plans first | Checks afterwards only | Has never considered it |
| Coherence [Q12, Q7] | Shared instructions or assistant; results consistent across people or sessions | Some sharing, unmaintained | Everyone does it their own way |
| Evaluation [Q5, Q10, I1] | A routine check before anything leaves (traces sources, numbers, a checklist or script) | Reads it over; checks when it "looks off" | Forwards as is |
| Harness [Q2, H1, Q11] | Defined workspace, permissions, recurring mistakes fixed in the setup | Some setup, fixes by hand each time | Not assessable for chat-only users unless they describe a setup |

Grade from what they *do* in the episodes, not what they say they usually do. When the two disagree, the episode wins;
quote both.
