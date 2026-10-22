# Stance matrix: stance → load-bearing layer → guardrail

Source: *The Mode Fluency Matrix* v0.1 and *Archetypes of LLM-Human Interaction* v3 (Henrique Jr. Sanchez).
A stance is the contract the human *thinks* they have with the AI. The load-bearing layer is what they must actually
supply for that contract to hold, so it is where the stance fails and where its guardrail goes.

## The matrix

| Stance | The human expects | Load-bearing layer | Characteristic failure | Guardrail |
|---|---|---|---|---|
| Oracle | Truth to a hard question | Judgment | Confident plausible prose taken as fact | Ask for the uncertainty before the answer; treat the answer as a claim |
| Genie | A discrete deliverable | Prompt | Literal compliance with a brittle wish | Scope, boundaries and success criteria first (an Intent Doc) |
| Interpreter | Meaning decoded from material *they supplied* | Evaluation | Confabulated meaning that sounds insightful | "Show me which parts of the text support each conclusion" |
| Executor | A delegated job, reviewed after | Harness + Judgment | Automation complacency; locally correct steps compound into a wrong outcome, found late | Plan before action, checkpoints, deviation report, nothing consequential ships uninspected |
| Miner | The shape of a space, many options | Context (writing) | Believing the anomaly you wanted; losing the vein | Assay cold, later; record every find when you find it |
| Tutor | A path to understanding they keep | Intent | Taught toward a goal never stated | State what you want to be able to do afterwards, first |
| Adversary | An attack on their plan | Intent | Critique of the wrong thing | Name what you are defending and what would change your mind |
| Scribe | Craft applied to their substance | Prompt | Polished form over a hollow draft | Supply substance and format; review for what was invented to fill gaps |
| Simulator | A rehearsal of reality | Context | Rehearsing a scenario that is not theirs | Load the real constraints, counterpart and stakes |
| Librarian | Synthesis of what is known | Evaluation | Confident retrieval of what was never said | Check the citation exists and says what is claimed |
| Mirror | Their own thinking, clarified | Coherence | Flattery mistaken for reflection | Ask for the structure of the argument back, not agreement |
| Translator | A bridge between two worlds | Context | A bridge to a caricature of the other side | Supply both maps; name both audiences |
| Therapist / Confessor | A space to think aloud | Judgment | Dependency; outsourcing judgment about one's own life | Decide in advance what you will not delegate |
| Muse | Provocation, not correctness | (none) | None: only dross | None; it cannot be metric'd |

## Boundary tests (assign a stance from an episode, not a self-label)

Ask of each episode: *what did the human hand over, what did they expect back, and what did they do with it?*

- **Material in?** If the human supplied the material and wanted its meaning → **Interpreter**. If the AI had to find or
  recall the material → **Librarian** (what has been said) or **Oracle** (what *is* true, accepted without method).
- **Lasting understanding or a conclusion?** Understanding they keep → **Tutor**. A conclusion they use → Interpreter.
- **One deliverable or a job?** The deliverable is the whole of the work and they inspected it → **Genie**. The deliverable
  ends a chain of steps they never saw → **Executor**.
- **Whose substance?** They supplied the substance and wanted it polished or reformatted → **Scribe**. Only the goal → Genie or Executor.
- **One good thing or the space?** One provocation judged on arrival → **Muse**. Volume generated, judgment withheld, selected
  later → **Miner**. ("If you are evaluating while you read, you are not mining; you are browsing.")
- **Attack or reflect?** Asked to find holes → **Adversary**. Asked to organise their own thoughts → **Mirror**.
- **Rehearsal?** Played a counterpart, market or scenario → **Simulator**.
- **Two audiences?** Re-expressed for another domain or culture → **Translator**.
- **Personal processing?** Thinking aloud about their own life or feelings → **Therapist**. Note it, do not probe it; it is
  outside a work diagnostic unless the user brings it in.

Only Interpreter, Executor and Miner have boundary tests written out in Archetypes v3; the others above are derived from
each stance's stated expectation. When an episode fits two stances, record both and say which test separated them.

## Consumption vs construction

Every stance has a passive form and an active one (Archetypes v3, §IV): Oracle → Tutor; Genie → collaborative iteration;
Interpreter unverified → Interpreter with an evidence trail; Muse → Miner; Executor blind → Executor with staged oversight.
In a profile, say which form the episodes show. The guardrail is usually the move from the passive form to the active one.

## In a diagnosis

When work went wrong, find the stance, go to its layer, re-enter there; do not rewrite the prompt first. For a team, the
stances used most say which layers the shared setup must make strong. As autonomy rises, stances drift toward Executor and
the load moves to Harness, Judgment and Evaluation.
