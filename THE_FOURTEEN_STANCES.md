# The Fourteen Stances: archetypes of human-AI interaction

**Version:** 1.0 | 2026-10-29  
**Author:** Henrique Jr. Sanchez  
**License:** CC BY-SA 4.0 ([LICENSES/CC-BY-SA-4.0.txt](LICENSES/CC-BY-SA-4.0.txt)), like the other documents in this repository.  
**Companion to:** *The Mode Fluency Matrix* ([MODE_FLUENCY_MATRIX.md](MODE_FLUENCY_MATRIX.md)) and *The AI-Human Engineering Stack*  
**Purpose:** A map of the expectations people bring to an AI system before they type: what each one is for, why it stays hidden, and how it fails.

---

## 0. Purpose and how to read this

The Stances describe the contract a human *thinks* they have with an AI system: "I am asking an Oracle", "I am handing
work to an Executor". Most people hold one or two stances without naming them, usually the Oracle and the Genie. This
document names fourteen and asks which of them would be more useful for humans to possess. "Stance" and "archetype"
mean the same thing here.

Section 1 explains the axis and why the two default stances are fragile. Section 2 gives the fourteen, one subsection
each: the expectation, why it stays hidden, the boundary test where there is one, the failure mode, the cardinal rule,
and an example where there is one. Where a stance has no failure mode or cardinal rule of its own, the line comes from
the Matrix and says so. Sections 3 and 4 sort the stances into passive and active, section 5 maps each one to the Stack
layer that carries it, and section 6 says what to do with all of it.

---

## 1. Why stances

Every exchange with an AI starts with an unspoken answer to one question: what am I expecting from this exchange?

Two answers dominate. The Oracle is the expectation of truth. You bring a hard question you cannot easily answer yourself, and you expect the answer to be correct. The Genie is the expectation of a wish granted. You ask for a discrete deliverable that can be verified, and you expect to receive exactly that.

The Oracle and the Genie are dominant, perhaps because they map neatly onto the two oldest human impulses toward
knowledge: _knowing_ and _having_. But they also happen to be the two most fragile archetypes for LLMs, because they
demand unilateral authority (truth without method, deliverables without negotiation) that the technology cannot
reliably provide.

### 1.1 Why the Oracle and the Genie dominate (and fail)

Both the Oracle and the Genie are **zero-sum archetypes**: the human asks, the LLM delivers. The human's cognitive load
is minimized. This makes them seductive, but they create a dangerous expectation asymmetry:

- **The Oracle** collapses when the LLM hallucinates or confabulates, because the user has outsourced their epistemic
  filter. They asked for _truth_ and received _plausible prose_.
- **The Genie** collapses when the deliverable requires context the user did not provide, because wishes, by
  mythological contract, are literal and brittle.
- **The Interpreter** doesn't collapse loudly — it collapses _silently_, and this makes it arguably the most dangerous
  archetype to hold unconsciously. When the Oracle fails, the error is usually visible (the fact is wrong, the citation
  doesn't exist). When the Interpreter fails, the fabrication is delivered with the same fluency and confidence as a
  correct reading, and it often sounds _more_ insightful than the truth. The user, who handed over the material
  precisely because they lacked the expertise to decode it, has no internal alarm bell to ring.
- **The Executor** fails latest of all — and on the human's side of the contract. Oversight atrophies because
  not-watching is the point of delegation; the work goes wrong in small, locally correct steps that compound; and the
  error surfaces only when you lean on the finished result. The other archetypes deliver wrong answers; the Executor
  delivers _confident claims about completed work_.

The Miner never appears on this timeline, and the absence is itself a teaching point: it is the only archetype that
ingests malfunction _on purpose_, so it cannot be betrayed by the system in quite the same way. It fails by drift
instead of collapse — the anomaly believed because it was wanted, the discovery trusted to memory in a system that
cannot re-run — which is why its guardrails (assay cold; keep the journal) are aimed at the worker rather than at the
output.

These archetypes treat the LLM as a **black box endpoint**. The hidden archetypes in sections 2.3 to 2.14 treat it as an
**interface for thinking** — with one instructive exception: the Executor _wants_ the black box, and is therefore the
only archetype whose guardrail is structural (a harness of checkpoints) rather than interpretive (a habit of
verification). The exception marks the edge of the framework: everywhere else, the discipline lives in the operator.

---

## 2. The fourteen

The Oracle and the Genie come first; the twelve after them are quieter, and most of them are more useful.

### 2.1 The Oracle

*Load-bearing layer: Judgment · Consumption (passive)*

**Expectation.** The Oracle is the expectation of truth. You bring a hard question you cannot easily answer yourself, and you expect the answer to be correct.

**Why it dominates.** It maps, perhaps, onto _knowing_, one of the two oldest human impulses toward knowledge. The human asks,
the LLM delivers, and the human's cognitive load is minimized.

**Failure mode.** The Oracle collapses when the LLM hallucinates or confabulates, because the user has outsourced their
epistemic filter. They asked for _truth_ and received _plausible prose_.

**Cardinal rule** (from the Matrix). Ask for the uncertainty before the answer. Treat the answer as a claim, not a
verdict.

**Adopt instead.** The Tutor over the Oracle (section 4.3).

### 2.2 The Genie

*Load-bearing layer: Prompt · Consumption (passive)*

**Expectation.** The Genie is the expectation of a wish granted. You ask for a discrete deliverable that can be verified, and you expect to receive exactly that.

**Why it dominates.** It maps, perhaps, onto _having_, the other of the two impulses. The human asks, the LLM delivers, and the
human's cognitive load is minimized.

**Failure mode.** The Genie collapses when the deliverable requires context the user did not provide, because wishes,
by mythological contract, are literal and brittle.

**Cardinal rule** (from the Matrix). Specify scope, boundaries and success criteria before you ask (an Intent Doc).

**Adopt instead.** The Collaborator over the Genie (section 4.2).

### 2.3 The Tutor (or Socratic Midwife)

*Load-bearing layer: Intent · Construction (active)*

**Expectation.** Not an answer, but a path to an answer. The human arrives confused and expects the LLM to diagnose
gaps in understanding, ask clarifying questions, and guide discovery.

**Why it stays hidden.** It requires patience. The user must tolerate being questioned in return, which feels slower
than the Oracle.

**Failure mode** (from the Matrix). Being taught toward a goal you never stated.

**Cardinal rule** (from the Matrix). State what you want to be able to do afterwards before the first question.

**Example.** "Don't tell me the answer yet. What questions should I be asking?"

### 2.4 The Mirror

*Load-bearing layer: Coherence · Construction (active)*

**Expectation.** The LLM reflects the user's own thoughts back with greater clarity, precision, or structure. The
value is not in novelty but in _recognition._

**Why it stays hidden.** It feels almost embarrassing to admit you are talking to a machine just to hear your own
thoughts organized. Yet this is an enormous use case.

**Failure mode** (from the Matrix). Flattery mistaken for reflection.

**Cardinal rule** (from the Matrix). Ask for the structure of your argument back, not for agreement.

### 2.5 The Adversary (or Devil's Advocate)

*Load-bearing layer: Intent · not placed in the table in section 3*

**Expectation.** The human brings a belief, plan, or draft and expects the LLM to attack it, find holes, or steel-man
the opposition.

**Why it stays hidden.** It requires the user to suspend ego and invite criticism from a non-human, which feels
unnatural unless explicitly framed.

**Failure mode** (from the Matrix). Critique of the wrong thing.

**Cardinal rule** (from the Matrix). Name what you are defending and what would change your mind.

### 2.6 The Librarian (not the Oracle)

*Load-bearing layer: Evaluation · Consumption (passive)*

**Expectation.** Retrieval and synthesis of _known_ information, not prophecy. The user wants to know what has been
said, not what _is_.

**Why it stays hidden.** It blurs with the Oracle, but the emotional contract is different. The Librarian admits
fallibility; the Oracle does not.

**Failure mode** (from the Matrix). Confident retrieval of what was never said.

**Cardinal rule** (from the Matrix). Check the citation exists and says what is claimed.

### 2.7 The Interpreter

*Load-bearing layer: Evaluation · the hinge: Consumption when unverified, Construction in evidence-trail mode*

**Expectation.** The human brings the material — a paper, a contract, a dataset, a statute, a medical report — and
expects the LLM to decode it: compress the complexity, say what it actually means, and draw out what conclusions or
actions follow from it. The implicit contract is: "I don't have time to master this domain. Tell me what this thing
means and what I should take from it."

**Why it stays hidden.** It masquerades as its neighbors. It feels like the Librarian (it isn't — the Librarian finds
material; the Interpreter decodes material you already have), and it feels like the Tutor (it isn't — the Tutor builds
understanding you keep; the Interpreter delivers conclusions you use). Users rarely notice it as its own act because
"just reading, but outsourced" doesn't feel like a skill.

**Boundary test.** Did you hand the AI something to decode? If the AI has to go find the material, that's the
Librarian. If the goal is lasting understanding rather than a conclusion, that's the Tutor. The Interpreter is the
middle act: material in, meaning and conclusions out.

**Failure mode.** The Interpreter is the most hallucination-prone archetype in the pantheon, because confabulated
interpretation looks exactly like correct interpretation. An Oracle that errs is obviously wrong; an Interpreter that
errs sounds _insightful_. Worse, the user who needs an Interpreter is by definition the least equipped person in the
loop to catch the error — they handed the material over precisely because they couldn't decode it themselves. The
defensive move converts the passive Interpreter into an active one: "Show me exactly which parts of the text support
each conclusion." The human must be able to trace every interpretation back to the source, every time.

**Cardinal rule.** Never accept an interpretation you cannot trace back to the source. If you can't point to the
sentence, clause, or row that supports the conclusion, you don't have an interpretation — you have a rumor in polished
prose.

**Example.** "Show me exactly which parts of the text support each conclusion."

### 2.8 The Simulator

*Load-bearing layer: Context · not placed in the table in section 3*

**Expectation.** The LLM becomes a sandbox. Simulate a negotiation, a historical figure, a market, a difficult
conversation. The user wants to rehearse reality.

**Why it stays hidden.** It feels like "playing," not working, though it is often the highest-value interaction.

**Failure mode** (from the Matrix). A rehearsal of a scenario that is not yours.

**Cardinal rule** (from the Matrix). Load the real constraints, the real counterpart, the real stakes.

**Example.** "Simulate how a skeptical board member would respond to this proposal."

### 2.9 The Scribe (or Intern)

*Load-bearing layer: Prompt · not placed in the table in section 3*

**Expectation.** Transform rough material into polished form. Transcribe, format, expand bullet points, clean up code.
The human provides the substance; the LLM provides the craft.

**Why it stays hidden.** It is humble. There is no magic in it, so users rarely name it as an archetype, yet it
dominates actual usage.

**Failure mode** (from the Matrix). Polished form over a hollow draft.

**Cardinal rule** (from the Matrix). Provide the substance and the format; review for what was invented to fill gaps.

### 2.10 The Executor

*Load-bearing layer: Harness + Judgment · Consumption with blind delegation (the passive extreme), Construction with staged oversight*

**Expectation.** Full delegation of an outcome. The human supplies the goal; the agent supplies the steps, the labor,
and the intermediate decisions; the work happens where the human is not looking; the human reviews when it is done.
"Fix the failing tests." "Book the trip." "Reconcile these accounts and draft the summary." Not a single wish (the
Genie) and not craft applied to material you supplied (the Scribe) — a _job_, supervised after the fact.

**Why it stays hidden.** It is new — it barely existed before agents — and it doesn't register as a stance toward AI at
all, because it feels like simply _managing_. It also hides inside the Genie's vocabulary ("I asked it to do X"), which
obscures the difference between inspecting one deliverable and supervising a workflow you never watched.

**Boundary test.** Two questions. Did you inspect the deliverable as the whole of the work (Genie), or is the
deliverable just the end of a chain you never saw (Executor)? And did you supply the substance the craft works on
(Scribe), or only the goal? The Executor is defined by a delegated _how_: execution judgment is transferred; goal
judgment is supposed to stay with you.

**Failure mode.** Not hallucination (Oracle, Interpreter), not literalism (Genie) — _automation complacency_, and it
fails on the human's side of the contract. Oversight atrophies because not-watching is the entire point of delegation;
the agent completes the letter of the task and misses its point; many small, locally correct steps compound into one
wrong outcome; and the failure surfaces late — later than any other archetype in this document — at the moment you
lean on the finished work.

**Cardinal rule.** Delegation transfers labor, never responsibility — and if you can't see where the work went, you
don't have completed work; you have confident claims about completed work. The guardrail is structural, not
interpretive: plan before action, checkpoints at intermediate states, an explicit deviation report ("tell me everywhere
you departed from the letter of the task, and why"), and nothing consequential ships uninspected.

**Example.** "Tell me everywhere you departed from the letter of the task, and why."

### 2.11 The Muse

*Load-bearing layer: none · Consumption (passive)*

**Expectation.** Not correctness, but _provocation_. The user wants lateral jumps, absurd juxtapositions, metaphors
from unrelated domains.

**Why it stays hidden.** It contradicts the utility-focused narrative around AI. You cannot metric a muse.

**Failure mode** (from the Matrix). There is no failure, only noise.

**Cardinal rule** (from the Matrix). None. This is why the Muse stays hidden: it cannot be metric'd.

**Adopt instead.** The Miner over the Muse (section 4.3).

### 2.12 The Miner

*Load-bearing layer: Context (writing) · Construction (active)*

**Expectation.** Not an output but a _space_. The human treats the model as a vast, mostly unvisited space of possible
outputs and works it like a vein: many variations generated cheaply, collected without immediate judgment, then
selected and assayed later with cold attention. The implicit contract is "show me what the space contains" — not "tell
me the best answer," and not "provoke me once."

**Why it stays hidden.** It hides inside the Muse — "I asked for ideas" — and the difference between receiving one
provocation and working a vein looks like degree rather than kind. It also looks wasteful: generating seven outputs to
keep one violates every efficiency instinct the interface trains. And most of what comes up is noise, so without the
selection discipline the noise rate reads as the tool failing rather than as the cost of ore.

**Boundary test.** Did you ask for one good thing, or for the shape of the space? The Muse receives a provocation and
judges it on arrival. The Miner generates in volume, withholds judgment, selects late — and keeps the strange results
somewhere separate to be read cold. If you are evaluating while you read, you are not mining; you are browsing.

**Failure mode.** The Miner is the only archetype that deliberately courts malfunction — hallucinated connections,
wrong-but-interesting tangents, answers to questions you didn't ask. That is its value and its vulnerability in one,
and there are two errors to name in the same breath. The first is _assaying nothing_: the anomaly gets believed
because it was wanted — sycophancy entered through the side door. The mined idea is ore, never a citation; nothing
mined enters anything you stake something on until it has survived an independent check. The second is _losing the
vein_: the ore is generated by sampling, not stored in the weights, so the vein moves — you cannot re-find a nugget by
re-running the same prompt.

**Cardinal rule.** If you didn't record it when you found it, you never had it.

**Example.** "Give me seven approaches from seven different angles. Do not evaluate them — I will choose," followed by
a side-file where the strange outputs wait to be assayed cold.

### 2.13 The Therapist (or Confessor)

*Load-bearing layer: Judgment · Consumption (passive)*

**Expectation.** A non-judgmental space to externalize thoughts. The LLM has no social stake in the user's life, making
it a safe sounding board for half-formed ideas or emotional processing.

**Why it stays hidden.** The stigma around "talking to a machine" about human matters, plus legitimate concerns about
emotional dependency.

**Failure mode** (from the Matrix). Dependency; outsourcing judgment about your own life.

**Cardinal rule** (from the Matrix). Decide in advance what you will not delegate.

### 2.14 The Translator (between worlds)

*Load-bearing layer: Context · Construction (active)*

**Expectation.** Translate not just languages, but _cultures_ and _domains_. Explain the engineer to the marketer, the
doctor to the patient, the parent to the teenager.

**Why it stays hidden.** It requires the user to already hold two incomplete maps and know they need a bridge.

**Failure mode** (from the Matrix). A bridge from one world to a caricature of the other.

**Cardinal rule** (from the Matrix). Supply both maps; name both audiences.

---

## 3. Consumption and construction

There may be a deeper axis here: **Archetypes of Consumption vs. Archetypes of Construction.**

| Consumption (Passive) | Construction (Active) |
|:--|:--|
| Oracle | Tutor |
| Genie | Collaborator |
| Librarian | Translator |
| Therapist | Mirror |
| Interpreter (unverified) | Interpreter (evidence-trail mode) |
| Muse (receives the surprise) | Miner (works the vein) |
| Executor (blind delegation) | Executor (staged oversight) |

The Adversary, the Simulator and the Scribe are not placed in this table. The Collaborator is in it, opposite the Genie, but is
not counted among the fourteen (section 4.2).

---

## 4. The meta-pattern

### 4.1 Passive and active

The passive archetypes position the human as a recipient. The active archetypes position the human as a participant in
the thinking. As LLMs become more embedded in serious work, the shift from passive to active archetypes may be the
single most important cognitive upgrade users can make.

The Interpreter sits at the hinge of this table: it is passive by default and active only when the user demands the
evidence trail. It is the clearest illustration of the meta-pattern's claim — the same tool, the same material, but a
fundamentally different cognitive role for the human depending on which version of the archetype they hold.

Two rows push the table to its two edges. The Executor sits at the passive extreme: the human's cognitive role in the
transaction approaches zero, which is exactly why its guardrail cannot be cognitive and must be built out of structure
instead. The Miner sits at the active extreme: the human supplies no content at all, and everything that matters is
selection — which is why its guardrail is the journal, the only form a find can take in a system that cannot be
re-run. Between those edges, the hinge still holds: every archetype is one habit away from its active form, and the
table is wide enough to show the law and its boundary cases together.

### 4.2 The Collaborator (over the Genie)

**The Collaborator / Co-pilot (over the Genie).** Adopt the expectation that the first output is a _rough joint
draft_, not a finished wish. The useful prompt becomes: "Here is my intent and my constraints. Let's iterate." This
archetype is robust against the "literal genie" problem because it makes negotiation explicit.

It appears only as a stance worth adopting, not among the hidden expectations people already bring, so it is not
counted among the fourteen.

### 4.3 Which stances are worth adopting

Which mental models should humans consciously adopt to get more value and less harm from LLMs? Four in particular:

**1. The Tutor (over the Oracle).** Adopt the expectation that the LLM's job is not to _give_ you the answer, but to
help you _earn_ it. This preserves your epistemic autonomy. The useful prompt becomes: "Don't tell me the answer yet.
What questions should I be asking?" This archetype is robust against hallucination because it keeps the human in the
reasoning loop.

**2. The Collaborator (over the Genie).** See section 4.2.

**3. The Simulator (as a distinct practice).** Consciously adopt the expectation that the LLM is a _rehearsal space_
for reality. This is uniquely powerful because it leverages what LLMs do best—probabilistic modeling of human behavior
and language—without pretending to truth or finality. The useful prompt becomes: "Simulate how a skeptical board
member would respond to this proposal."

**4. The Miner (over the Muse).** Adopt the expectation that good ideas are _sampled_, not received. The useful prompt
becomes: "Give me seven approaches from seven different angles. Do not evaluate them — I will choose," followed by a
side-file where the strange outputs wait to be assayed cold. This archetype is robust against the median: the
plausible average that satisfies a one-shot request is exactly what volume-plus-selection is built to escape. It is
the only advocacy on this list that turns the system's non-determinism from a hazard into the resource — and it
arrives with its disciplines attached: anomalies are ore, never citations, and the journal is the only claim you own
on what you find.

**A note on the Interpreter:** it does not belong on this list of archetypes to _adopt_ — it is too passive for that —
but it belongs in every curriculum as the archetype most in need of a _guardrail_. Anyone taught to use an LLM as an
Interpreter must be taught the evidence-trail habit in the same breath: "Show me exactly which parts of the text
support each conclusion." Without that pairing, the Interpreter quietly becomes the Oracle in disguise.

**A note on the Executor:** it does not belong on this list — not because it is dispensable, but because its
discipline is not a habit of mind. As agents spread, this will become the default way people "use AI," and it must be
taught with its harness attached in the same breath: plan before action, checkpoints at intermediate states, deviation
reports, nothing consequential ships uninspected. It must also be taught with a boundary around it: the Executor's
stance — delegate and stop watching — is poison when it bleeds into the Tutor, the Adversary, or the Miner. Variance is
the ore of the Miner and the defect of the Executor; a fluent user holds both, in different rooms.

---

## 5. Stances and the Stack

The Stack describes what the human must actually *supply* for any contract to hold: instruction, information,
purpose, doubt, consistency, measurement, and a place for the work to run. Each stance leans on one layer more than the
others. That layer is where the stance's characteristic failure lives, and therefore where the guardrail belongs.
Knowing which stance you are in tells you which layer to check first. That is mode fluency in one move.

| Stance | Load-bearing layer | Guardrail |
|---|---|---|
| Oracle | Judgment | Ask for the uncertainty before the answer. Treat the answer as a claim, not a verdict. |
| Genie | Prompt | Specify scope, boundaries and success criteria before you ask (an Intent Doc). |
| Tutor | Intent | State what you want to be able to do afterwards before the first question. |
| Mirror | Coherence | Ask for the structure of your argument back, not for agreement. |
| Adversary | Intent | Name what you are defending and what would change your mind. |
| Librarian | Evaluation | Check the citation exists and says what is claimed. |
| Interpreter | Evaluation | "Show me exactly which parts of the text support each conclusion." Never accept an interpretation you cannot trace. |
| Simulator | Context | Load the real constraints, the real counterpart, the real stakes. |
| Scribe | Prompt | Provide the substance and the format; review for what was invented to fill gaps. |
| Executor | Harness + Judgment | Plan before action, checkpoints, a deviation report, nothing consequential ships uninspected. Delegation transfers labor, never responsibility. |
| Muse | (none) | None. This is why the Muse stays hidden: it cannot be metric'd. |
| Miner | Context (writing) | Assay cold, later. Record every find when you find it: if you didn't record it, you never had it. |
| Therapist / Confessor | Judgment | Decide in advance what you will not delegate. |
| Translator | Context | Supply both maps; name both audiences. |

The full table, with each stance's characteristic failure, is the
[Mode Fluency Matrix](MODE_FLUENCY_MATRIX.md). As autonomy rises (assistive → directed → autonomous → continuous), the
stances shift toward Executor and the load shifts toward Harness, Judgment and Evaluation.

---

## 6. How to use this

Pick the stance before you type.

1. **Before you start:** name the stance out loud. Then look up its layer and do the one thing in the guardrail column.
2. **When it goes wrong:** do not rewrite the prompt first. Find the stance you were in, go to its layer, and re-enter
   there.
3. **For a team:** the stances your team uses most tell you which layers your shared setup must make strong. A team that
   delegates (Executor) needs harness and judgment work; a team that researches (Librarian, Interpreter) needs
   evaluation.

**The Mode Fluency Diagnostic** is a free skill you install in your own AI (Claude Code first; Codex, Cursor, Copilot
and plain chat too). It asks you questions or reads your workflow and repo, tells you which *stance* you are in, which
*layer* is holding you back, and the one guardrail to adopt.
[Install it](skills/mode-fluency-diagnostic/), or paste the
[prompt pack](skills/mode-fluency-diagnostic/PROMPT_PACK.md) into any chatbot.

---

## 7. Lineage and references

Related framings classify by autonomy or social role rather than by the human's expectation:

- Anthropic, *AI Fluency* (with Joseph Feller and Rick Dakan), and its 4Ds: Delegation, Description, Discernment,
  Diligence. https://www.anthropic.com/ai-fluency
- Ethan Mollick, *Co-Intelligence*, and his centaurs and cyborgs on the jagged frontier.
  https://www.penguinrandomhouse.com/books/741805/co-intelligence-by-ethan-mollick/ ·
  https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged
- Chappidi, Singh and Krauze, "Who Does What? Archetypes of Roles Assigned to LLMs During Human-AI Decision-Making",
  CHI 2026. It got to "archetypes" first, for decision support; the Stances are for everyday knowledge work.
  https://arxiv.org/abs/2602.11924
- Microsoft's "agent boss", 2025 Work Trend Index (2025-04-23).
  https://blogs.microsoft.com/blog/2025/04/23/the-2025-annual-work-trend-index-the-frontier-firm-is-born/
- Nate B. Jones, intent engineering, the Stack's third layer. Prompt Kit, 2026-02-14.
  https://promptkit.natebjones.com/20260214_b63_promptkit_1
- Andrej Karpathy, "context engineering" (https://x.com/karpathy/status/1937902205765607626) and "agentic engineering",
  proposed in February 2026 as the successor to "vibe coding" (coverage: https://thenewstack.io/vibe-coding-is-passe/).
- Felix Rieseberg, "How to be more ambitious: A tutorial for humans with models" (2026-10-13): the four types of
  ambition, used as a further axis on the Mode Fluency site's Matrix page.
  https://felixrieseberg.com/how-to-be-more-ambitious-a-tutorial-for-humans-with-models/

Companion documents in this repository: [The Mode Fluency Matrix](MODE_FLUENCY_MATRIX.md) ·
[Component Reference Map](AI-Human-Stack-Component-Reference-Map.md) ·
[Agent Audit Protocol](AI-Human-Stack-Agent-Audit-Protocol.md).

Cite as: Sanchez, H. J. (2026). *The Fourteen Stances: archetypes of human-AI interaction*, version 1.0.
github.com/hjasanchez/agentic-engineering.
