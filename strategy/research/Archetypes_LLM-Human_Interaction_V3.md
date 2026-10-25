
> prompt: ive been thinking a lot about the abstract concepts of humans interacting with LLMs. I think we have some archetypal narratives going on. So far I have mapped two: the oracle, and the genie. The oracle, in the human's eye, is the mental model of coming to the LLM with the expectation of receiving truth in the form of an answer to a difficult question not easily knowable by the human. The genie, in the human's eye, is the mental model of coming to the LLM with the expectation of asking for a wish, a request with a discrete deliverable outcome which can be verified, and receiving that by the LLM/"genie". I am interested in discovering which other subconscious/unspecified archetypes we might be expecting, and which would be more useful for humans to possess. what do you think?

This is a fertile line of inquiry. The Oracle and the Genie are indeed dominant, perhaps because they map neatly onto the two oldest human impulses toward knowledge: _knowing_ and _having_. But they also happen to be the two most fragile archetypes for LLMs, because they demand unilateral authority (truth without method, deliverables without negotiation) that the technology cannot reliably provide.

Here is a map of other archetypes I see operating beneath the surface, grouped by the kind of transaction they imply, followed by thoughts on which might be more useful to cultivate.

---

### I. The Hidden Pantheon

**The Tutor (or Socratic Midwife)**
_Expectation:_ Not an answer, but a path to an answer. The human arrives confused and expects the LLM to diagnose gaps in understanding, ask clarifying questions, and guide discovery.
_Why it stays hidden:_ It requires patience. The user must tolerate being questioned in return, which feels slower than the Oracle.

**The Mirror**
_Expectation:_ The LLM reflects the user's own thoughts back with greater clarity, precision, or structure. The value is not in novelty but in _recognition._
_Why it stays hidden:_ It feels almost embarrassing to admit you are talking to a machine just to hear your own thoughts organized. Yet this is an enormous use case.

**The Adversary (or Devil's Advocate)**
_Expectation:_ The human brings a belief, plan, or draft and expects the LLM to attack it, find holes, or steel-man the opposition.
_Why it stays hidden:_ It requires the user to suspend ego and invite criticism from a non-human, which feels unnatural unless explicitly framed.

**The Librarian (not the Oracle)**
_Expectation:_ Retrieval and synthesis of _known_ information, not prophecy. The user wants to know what has been said, not what _is_.
_Why it stays hidden:_ It blurs with the Oracle, but the emotional contract is different. The Librarian admits fallibility; the Oracle does not.

**The Interpreter**
_Expectation:_ The human brings the material — a paper, a contract, a dataset, a statute, a medical report — and expects the LLM to decode it: compress the complexity, say what it actually means, and draw out what conclusions or actions follow from it. The implicit contract is: "I don't have time to master this domain. Tell me what this thing means and what I should take from it."
_Why it stays hidden:_ It masquerades as its neighbors. It feels like the Librarian (it isn't — the Librarian finds material; the Interpreter decodes material you already have), and it feels like the Tutor (it isn't — the Tutor builds understanding you keep; the Interpreter delivers conclusions you use). Users rarely notice it as its own act because "just reading, but outsourced" doesn't feel like a skill.
_The boundary test:_ Did you hand the AI something to decode? If the AI has to go find the material, that's the Librarian. If the goal is lasting understanding rather than a conclusion, that's the Tutor. The Interpreter is the middle act: material in, meaning and conclusions out.
_The failure mode (teach this explicitly):_ The Interpreter is the most hallucination-prone archetype in the pantheon, because confabulated interpretation looks exactly like correct interpretation. An Oracle that errs is obviously wrong; an Interpreter that errs sounds _insightful_. Worse, the user who needs an Interpreter is by definition the least equipped person in the loop to catch the error — they handed the material over precisely because they couldn't decode it themselves. The defensive move converts the passive Interpreter into an active one: "Show me exactly which parts of the text support each conclusion." The human must be able to trace every interpretation back to the source, every time.

**The Simulator**
_Expectation:_ The LLM becomes a sandbox. Simulate a negotiation, a historical figure, a market, a difficult conversation. The user wants to rehearse reality.
_Why it stays hidden:_ It feels like "playing," not working, though it is often the highest-value interaction.

**The Scribe / Intern**
_Expectation:_ Transform rough material into polished form. Transcribe, format, expand bullet points, clean up code. The human provides the substance; the LLM provides the craft.
_Why it stays hidden:_ It is humble. There is no magic in it, so users rarely name it as an archetype, yet it dominates actual usage.

**The Executor**
_Expectation:_ Full delegation of an outcome. The human supplies the goal; the agent supplies the steps, the labor, and the intermediate decisions; the work happens where the human is not looking; the human reviews when it is done. "Fix the failing tests." "Book the trip." "Reconcile these accounts and draft the summary." Not a single wish (the Genie) and not craft applied to material you supplied (the Scribe) — a _job_, supervised after the fact.
_Why it stays hidden:_ It is new — it barely existed before agents — and it doesn't register as a stance toward AI at all, because it feels like simply _managing_. It also hides inside the Genie's vocabulary ("I asked it to do X"), which obscures the difference between inspecting one deliverable and supervising a workflow you never watched.
_The boundary test:_ Two questions. Did you inspect the deliverable as the whole of the work (Genie), or is the deliverable just the end of a chain you never saw (Executor)? And did you supply the substance the craft works on (Scribe), or only the goal? The Executor is defined by a delegated _how_: execution judgment is transferred; goal judgment is supposed to stay with you.
_The failure mode (teach this explicitly):_ Not hallucination (Oracle, Interpreter), not literalism (Genie) — _automation complacency_, and it fails on the human's side of the contract. Oversight atrophies because not-watching is the entire point of delegation; the agent completes the letter of the task and misses its point; many small, locally correct steps compound into one wrong outcome; and the failure surfaces late — later than any other archetype in this document — at the moment you lean on the finished work. The cardinal rule: **delegation transfers labor, never responsibility — and if you can't see where the work went, you don't have completed work; you have confident claims about completed work.** The guardrail is structural, not interpretive: plan before action, checkpoints at intermediate states, an explicit deviation report ("tell me everywhere you departed from the letter of the task, and why"), and nothing consequential ships uninspected.

**The Muse**
_Expectation:_ Not correctness, but _provocation_. The user wants lateral jumps, absurd juxtapositions, metaphors from unrelated domains.
_Why it stays hidden:_ It contradicts the utility-focused narrative around AI. You cannot metric a muse.

**The Miner**
_Expectation:_ Not an output but a _space_. The human treats the model as a vast, mostly unvisited space of possible outputs and works it like a vein: many variations generated cheaply, collected without immediate judgment, then selected and assayed later with cold attention. The implicit contract is "show me what the space contains" — not "tell me the best answer," and not "provoke me once."
_Why it stays hidden:_ It hides inside the Muse — "I asked for ideas" — and the difference between receiving one provocation and working a vein looks like degree rather than kind. It also looks wasteful: generating seven outputs to keep one violates every efficiency instinct the interface trains. And most of what comes up is dross, so without the selection discipline the dross rate reads as the tool failing rather than as the cost of ore.
_The boundary test:_ Did you ask for one good thing, or for the shape of the space? The Muse receives a provocation and judges it on arrival. The Miner generates in volume, withholds judgment, selects late — and keeps the strange results somewhere separate to be read cold. If you are evaluating while you read, you are not mining; you are browsing.
_The failure mode (teach this explicitly):_ The Miner is the only archetype that deliberately courts malfunction — hallucinated connections, wrong-but-interesting tangents, answers to questions you didn't ask. That is its value and its vulnerability in one, and there are two errors to name in the same breath. The first is _assaying nothing_: the anomaly gets believed because it was wanted — sycophancy entered through the side door. The mined idea is ore, never a citation; nothing mined enters anything you stake something on until it has survived an independent check. The second is _losing the vein_: the ore is generated by sampling, not stored in the weights, so the vein moves — you cannot re-find a nugget by re-running the same prompt. Hence the Miner's cardinal rule, which stands to it as the evidence trail stands to the Interpreter: **if you didn't record it when you found it, you never had it.**

**The Therapist / Confessor**
_Expectation:_ A non-judgmental space to externalize thoughts. The LLM has no social stake in the user's life, making it a safe sounding board for half-formed ideas or emotional processing.
_Why it stays hidden:_ The stigma around "talking to a machine" about human matters, plus legitimate concerns about emotional dependency.

**The Translator (Between Worlds)**
_Expectation:_ Translate not just languages, but _cultures_ and _domains_. Explain the engineer to the marketer, the doctor to the patient, the parent to the teenager.
_Why it stays hidden:_ It requires the user to already hold two incomplete maps and know they need a bridge.

---

### II. Why the Oracle and Genie Dominate (and Fail)

Both the Oracle and the Genie are **zero-sum archetypes**: the human asks, the LLM delivers. The human's cognitive load is minimized. This makes them seductive, but they create a dangerous expectation asymmetry:

- **The Oracle** collapses when the LLM hallucinates or confabulates, because the user has outsourced their epistemic filter. They asked for _truth_ and received _plausible prose_.

- **The Genie** collapses when the deliverable requires context the user did not provide, because wishes, by mythological contract, are literal and brittle.

- **The Interpreter** doesn't collapse loudly — it collapses _silently_, and this makes it arguably the most dangerous archetype to hold unconsciously. When the Oracle fails, the error is usually visible (the fact is wrong, the citation doesn't exist). When the Interpreter fails, the fabrication is delivered with the same fluency and confidence as a correct reading, and it often sounds _more_ insightful than the truth. The user, who handed over the material precisely because they lacked the expertise to decode it, has no internal alarm bell to ring. Hence the Interpreter's cardinal rule: never accept an interpretation you cannot trace back to the source. If you can't point to the sentence, clause, or row that supports the conclusion, you don't have an interpretation — you have a rumor in polished prose.

- **The Executor** fails latest of all — and on the human's side of the contract. Oversight atrophies because not-watching is the point of delegation; the work goes wrong in small, locally correct steps that compound; and the error surfaces only when you lean on the finished result. The other archetypes deliver wrong answers; the Executor delivers _confident claims about completed work_.

The Miner never appears on this timeline, and the absence is itself a teaching point: it is the only archetype that ingests malfunction _on purpose_, so it cannot be betrayed by the system in quite the same way. It fails by drift instead of collapse — the anomaly believed because it was wanted, the discovery trusted to memory in a system that cannot re-run — which is why its guardrails (assay cold; keep the journal) are aimed at the worker rather than at the output.

These archetypes treat the LLM as a **black box endpoint**. The hidden archetypes above treat it as an **interface for thinking** — with one instructive exception: the Executor _wants_ the black box, and is therefore the only archetype whose guardrail is structural (a harness of checkpoints) rather than interpretive (a habit of verification). The exception marks the edge of the framework: everywhere else, the discipline lives in the operator.

---

### III. Which Archetypes Would Be More Useful to Possess?

If you are asking which mental models humans should _consciously adopt_ to get more value and less harm from LLMs, I would advocate for four in particular:

**1. The Tutor (over the Oracle)**
Adopt the expectation that the LLM's job is not to _give_ you the answer, but to help you _earn_ it. This preserves your epistemic autonomy. The useful prompt becomes: "Don't tell me the answer yet. What questions should I be asking?" This archetype is robust against hallucination because it keeps the human in the reasoning loop.

**2. The Collaborator / Co-pilot (over the Genie)**
Adopt the expectation that the first output is a _rough joint draft_, not a finished wish. The useful prompt becomes: "Here is my intent and my constraints. Let's iterate." This archetype is robust against the "literal genie" problem because it makes negotiation explicit.

**3. The Simulator (as a distinct practice)**
Consciously adopt the expectation that the LLM is a _rehearsal space_ for reality. This is uniquely powerful because it leverages what LLMs do best—probabilistic modeling of human behavior and language—without pretending to truth or finality. The useful prompt becomes: "Simulate how a skeptical board member would respond to this proposal."

**4. The Miner (over the Muse)**
Adopt the expectation that good ideas are _sampled_, not received. The useful prompt becomes: "Give me seven approaches from seven different angles. Do not evaluate them — I will choose," followed by a side-file where the strange outputs wait to be assayed cold. This archetype is robust against the median: the plausible average that satisfies a one-shot request is exactly what volume-plus-selection is built to escape. It is the only advocacy on this list that turns the system's non-determinism from a hazard into the resource — and it arrives with its disciplines attached: anomalies are ore, never citations, and the journal is the only claim you own on what you find.

**A note on the Interpreter:** it does not belong on this list of archetypes to _adopt_ — it is too passive for that — but it belongs in every curriculum as the archetype most in need of a _guardrail_. Anyone taught to use an LLM as an Interpreter must be taught the evidence-trail habit in the same breath: "Show me exactly which parts of the text support each conclusion." Without that pairing, the Interpreter quietly becomes the Oracle in disguise.

**A note on the Executor:** it does not belong on this list — not because it is dispensable, but because its discipline is not a habit of mind. As agents spread, this will become the default way people "use AI," and it must be taught with its harness attached in the same breath: plan before action, checkpoints at intermediate states, deviation reports, nothing consequential ships uninspected. It must also be taught with a boundary around it: the Executor's stance — delegate and stop watching — is poison when it bleeds into the Tutor, the Adversary, or the Miner. Variance is the ore of the Miner and the defect of the Executor; a fluent user holds both, in different rooms.

---

### IV. A Meta-Pattern

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

The passive archetypes position the human as a recipient. The active archetypes position the human as a participant in the thinking. As LLMs become more embedded in serious work, the shift from passive to active archetypes may be the single most important cognitive upgrade users can make.

The Interpreter sits at the hinge of this table: it is passive by default and active only when the user demands the evidence trail. It is the clearest illustration of the meta-pattern's claim — the same tool, the same material, but a fundamentally different cognitive role for the human depending on which version of the archetype they hold.

The newest rows push the table to its two edges. The Executor sits at the passive extreme: the human's cognitive role in the transaction approaches zero, which is exactly why its guardrail cannot be cognitive and must be built out of structure instead. The Miner sits at the active extreme: the human supplies no content at all, and everything that matters is selection — which is why its guardrail is the journal, the only form a find can take in a system that cannot be re-run. Between those edges, the hinge still holds: every archetype is one habit away from its active form, and the pantheon is now wide enough to show the law and its boundary cases together.
