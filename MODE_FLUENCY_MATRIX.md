# The Mode Fluency Matrix: which Stack layer carries each Stance

**Version:** 0.1 (draft) | October 2026 | **Author:** Henrique Jr. Sanchez
**Companion to:** *The AI-Human Engineering Stack* and *The Fourteen Stances (Archetypes of Human-AI Interaction, v3)*

## Why this table exists

The Stances describe the contract a human *thinks* they have with an AI system: "I am asking an Oracle", "I am handing
work to an Executor". The Stack describes what the human must actually *supply* for any contract to hold: instruction,
information, purpose, doubt, consistency, measurement, and a place for the work to run.

Each stance leans on one layer more than the others. That layer is where the stance's characteristic failure lives, and
therefore where the guardrail belongs. Knowing which stance you are in tells you which layer to check first. That is mode
fluency in one move.

## The matrix

| Stance | What you expect | Load-bearing layer | Characteristic failure | Guardrail (the cardinal rule) |
|---|---|---|---|---|
| **Oracle** | Truth to a hard question | **Judgment** | Confident plausible prose taken as fact | Ask for the uncertainty before the answer. Treat the answer as a claim, not a verdict. |
| **Genie** | A discrete deliverable | **Prompt** | Literal compliance with a brittle wish | Specify scope, boundaries and success criteria before you ask (an Intent Doc). |
| **Interpreter** | Decode material I supply | **Evaluation** | Confabulated meaning that sounds insightful | "Show me exactly which parts of the text support each conclusion." Never accept an interpretation you cannot trace. |
| **Executor** | A delegated job, reviewed after | **Harness + Judgment** | Automation complacency; locally correct steps compounding into the wrong outcome, found late | Plan before action, checkpoints, a deviation report, nothing consequential ships uninspected. Delegation transfers labor, never responsibility. |
| **Miner** | The shape of a space, not one answer | **Context (writing)** | Believing an anomaly because you wanted it; losing the vein | Assay cold, later. Record every find when you find it: if you didn't record it, you never had it. |
| **Tutor** | A path to the answer | **Intent** | Being taught toward a goal you never stated | State what you want to be able to do afterwards before the first question. |
| **Adversary** | Attack on my plan | **Intent** | Critique of the wrong thing | Name what you are defending and what would change your mind. |
| **Scribe** | Craft applied to my substance | **Prompt** | Polished form over a hollow draft | Provide the substance and the format; review for what was invented to fill gaps. |
| **Simulator** | A rehearsal of reality | **Context** | A rehearsal of a scenario that is not yours | Load the real constraints, the real counterpart, the real stakes. |
| **Librarian** | Synthesis of what is known | **Evaluation** | Confident retrieval of what was never said | Check the citation exists and says what is claimed. |
| **Mirror** | My own thinking, clarified | **Coherence** | Flattery mistaken for reflection | Ask for the structure of your argument back, not for agreement. |
| **Translator** | A bridge between two worlds | **Context** | A bridge from one world to a caricature of the other | Supply both maps; name both audiences. |
| **Therapist / Confessor** | A space to think aloud | **Judgment** | Dependency; outsourcing judgment about your own life | Decide in advance what you will not delegate. |
| **Muse** | Provocation, not correctness | *(none)* | There is no failure, only dross | None. This is why the Muse stays hidden: it cannot be metric'd. |

## How to use it

1. **Before you start:** name the stance out loud. Then look up its layer and do the one thing in the guardrail column.
2. **When it goes wrong:** do not rewrite the prompt first. Find the stance you were in, go to its layer, and re-enter there.
3. **For a team:** the stances your team uses most tell you which layers your shared setup must make strong. A team that
   delegates (Executor) needs harness and judgment work; a team that researches (Librarian, Interpreter) needs evaluation.

## Relationship to the autonomy ladder

As autonomy rises (assistive → directed → autonomous → continuous), the stances shift toward Executor and the load shifts
toward Harness, Judgment and Evaluation. This is why the AI @ Workplace curriculum spends 101–301 on the lower-left of the
table and 401–601 on the lower-right: the layer that carries the load moves as the human steps back.

## Lineage

Stances build on the author's *Archetypes of LLM-Human Interaction* (v3). Related framings that classify by autonomy or
social role rather than by the human's expectation: Anthropic's AI Fluency (4Ds: Delegation, Description, Discernment,
Diligence), Mollick's centaurs and cyborgs, Microsoft's "agent boss", and the CHI 2026 "human-LLM archetypes" paper for
decision support (arXiv 2602.11924). The Stack's "intent engineering" layer is credited to Nate B. Jones.
