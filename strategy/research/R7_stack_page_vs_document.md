# R7: Stack page vs. the published document (2026-10-29)

Brief: `strategy/briefs/W14_stack_page_vs_document.md`. Sources read in full: `The AI-Human Engineering Stack.pdf` (29 pages),
`AI-Human-Stack-Component-Reference-Map.md`, `AI-Human-Stack-Agent-Audit-Protocol.md`, `docs/stack.html`.

Method note: the Read tool could not render the PDF (pdftoppm is not installed on this machine), so the text was extracted with
`pdftotext -layout` and split on form feeds; page numbers below are PDF page indices 1–29, cross-checked against `pypdf`
(29 pages). Out of scope per the brief: the `<div class="stackdiag">` block and the §2 dependency_rule section (a short note on
§2 is at the end for whoever rebuilds it).

---

## For Henrique: the plain answer to question 1

You are half right, and the page is half right. The document says two things in two consecutive paragraphs on p.27. First,
the *stack* stops at coherence because abstraction has diminishing returns: the layer above coherence would be about keeping
the whole human-AI civilisation aligned with human flourishing, and "at that level, the problem is no longer engineering. It is
politics, ethics, and philosophy." Second, the *regress* ("what monitors judgment? what governs the coherence framework?") is
"terminated by human governance": a human or human institution deciding what we value. That governance sits outside the stack
and outside engineering; it is not coherence. Coherence is "governance-oriented" (p.18), meaning it builds mechanisms
analogous to organisational governance among agents, but its own framework is one of the things the human foundation has to
govern. The page quotes the second paragraph faithfully but drops the first, and drops the half of the regress question that
mentions coherence, so a reader can come away thinking "human governance" is the layer above judgment. The fix is to restore
both halves (proposed text below).

---

## 1. Where the regress stops: what the document says

**What sits above judgment.** Coherence, Layer 5. The generative logic (p.4): "Layer 4 solves the self-correction problem...
But self-correcting individual agents revealed a new problem: many individually correct agents can produce collectively
incoherent behavior." Then: "Layer 5 addresses the emergence problem. Coherence engineering, at last, ensures that
multi-agent systems produce emergent behavior consistent with the overarching purpose of the ecosystem".

That judgment monitors intent is the document's own claim: judgment "can recognize when their own operating assumptions,
including their intent specifications, have become insufficient" (p.14); "Assumption monitoring. Continuous verification that
the environmental conditions assumed by the intent specification still hold." (p.17). The Reference Map (line 107): "Intent is
encoded at a point in time; judgment monitors whether the encoding remains valid."

**What sits above coherence.** No further layer of engineering. p.27, verbatim:

> "An astute reader might wonder why we only specified 5 hierarchical layers, and not for example 15. Each layer in the stack
> addresses a problem at a progressively higher level of abstraction. But abstraction has diminishing returns. Beyond coherence
> engineering, the next hypothetical layer would address the question: "How do we ensure that the entire human-AI civilization,
> including the humans who design the intent specs, the organizations that deploy the agents, and the societies affected by the
> outcomes, remains aligned with human flourishing?" At that level, the problem is no longer engineering. It is politics,
> ethics, and philosophy. These are real and important problems, but they are not engineering disciplines in any recognizable
> sense. They belong to democratic governance, moral philosophy, and institutional design."

**Where the regress ends.** The next paragraphs, p.27, verbatim:

> "The DIKW hierarchy mentioned earlier in this document has also been criticized for implying an infinite regress: if wisdom
> evaluates knowledge, what evaluates wisdom? The same potential regress exists here: if judgment monitors intent, what monitors
> judgment? If coherence governs individual agents, what governs the coherence framework itself?"
>
> "The answer is that the regress is terminated by human governance. At some point in every system (no matter how sophisticated
> its autonomous capabilities) there must be a human (or a human institution) that says: "This is what we value. This is what we
> are willing to be held accountable for. This is the foundation on which everything else rests." That foundation cannot be
> automated without circularity, because the question "what should we ultimately value?" is constitutive of human agency
> itself."
>
> "At face value this might seem like some inherent limitation of AI systems, but it is actually a structural feature of any
> system that acts on behalf of human purposes. The same limit applies to human organizations: no management framework, no
> governance structure, no set of rules and processes can substitute for the foundational act of deciding what matters."

**Where "governance" appears in the document, and what it refers to each time:**

| Page | Wording | Inside or outside the stack |
|---|---|---|
| p.18 | Coherence is "Governance-oriented. It requires mechanisms analogous to organizational governance: shared protocols, coordination structures, conflict resolution processes, and system-level monitoring." | Inside: an engineering property of Layer 5 |
| p.20 | Coherence draws "From governance theory... Constitutional governance does not control every decision citizens make." | Inside: an analogy for Layer 5 |
| p.21 | "Ecosystem-level intent... These ecosystem-level specifications define the "constitution" of the multi-agent system." | Inside: a Layer 5 practice |
| p.22 | Fractal property, organizational level: "the strategic AI governance framework" | Inside, and it is the *intent* slot of the five-item list, not coherence |
| p.27 | "They belong to democratic governance, moral philosophy, and institutional design." | Outside: not engineering |
| p.27 | "the regress is terminated by human governance" | Outside: the human foundation the whole stack rests on |

**Verdict on Henrique's reading.** "The regress is terminated at coherence engineering" is not what the document says. The
document says the *hierarchy of engineering layers* terminates at coherence (diminishing returns of abstraction), and the
*regress of monitors* terminates in human governance, which it explicitly places outside engineering ("politics, ethics, and
philosophy"; "democratic governance, moral philosophy, and institutional design"). The two are linked: the reason there is no
sixth engineering layer is that the next question up is one only humans can answer. Coherence is governance-*like*
(p.18, p.20) but it is itself something that needs governing: "what governs the coherence framework itself?" (p.27).

## 2. Does the page's paragraph need to change?

Yes, though it is not wrong. Every sentence on the page is the document's own wording (p.27). The problems are omissions:

1. It drops the "why five, not fifteen" paragraph, so the page never says the stack stops at coherence or why.
2. It quotes only half of the regress question. The dropped half ("If coherence governs individual agents, what governs the
   coherence framework itself?") is the half that answers Henrique's question.
3. It cuts the quoted declaration at two of its three sentences ("This is the foundation on which everything else rests." is
   dropped) and drops the reason for the circularity ("because the question "what should we ultimately value?" is
   constitutive of human agency itself").
4. Placement: on the page it sits under the fractal property; in the document it closes "Boundaries of the Stack: Why These
   Five Layers" (p.26–27). Under the fractal heading, "human governance" reads like a sixth level.

Replacement paragraph (in proposed edit E1 below), in plain voice, built from the document's own words:

> Why five layers and not fifteen? Each layer works at a higher level of abstraction than the one below it, and abstraction has
> diminishing returns. Coherence is the top. The next layer up would ask how the whole human-AI civilization stays aligned with
> human flourishing, and at that level the problem is no longer engineering. It is politics, ethics and philosophy: democratic
> governance, moral philosophy and institutional design.
>
> The same limit stops the regress. If judgment monitors intent, what monitors judgment? If coherence governs the agents, what
> governs the coherence framework? A human, or a human institution, that says: "This is what we value. This is what we are
> willing to be held accountable for. This is the foundation on which everything else rests." That foundation cannot be
> automated without circularity, because the question "what should we ultimately value?" is constitutive of human agency
> itself. The stack ends at coherence; the regress ends with people.

Banned-word check on the replacement: none of revolutionary, unlock, supercharge, game-changing, seamless, empower.

## 3. "Lexical substrate" / "lexical engineering"

Not mentioned anywhere in the published documents. Searches (case-insensitive) for `lexic` and `substrate`:
- PDF full text (pdftotext and pypdf): 0 hits for either.
- `AI-Human-Stack-Component-Reference-Map.md`: 0 hits.
- `AI-Human-Stack-Agent-Audit-Protocol.md`: 0 hits.
- `docs/` (whole site): 0 hits for `lexic`.

The site should not mention it, and currently does not.

## 4. Every other description on stack.html, checked

Legend: **OK** = matches the PDF or Reference Map (verbatim or a faithful trim). **Minor** = wording trim, no change of meaning.
**Note** = not a page error, but worth knowing.

### Page head and §1 prose (outside the stackdiag block)

| Page (stack.html line) | Document | Result |
|---|---|---|
| L43 "Five layers of cognitive engineering, two meta-functions that operate across them, and a user interaction model that ties them together." | p.1, same words | OK |
| L44 "Each layer answers a different categorical question. Each depends on all layers beneath it." | p.1, same words | OK |
| L44 "The gap between people who use AI effectively ... the ones the Stack is designed to make visible." | p.29 "...the ones this stack is designed to make visible." | OK |
| L52 "Evaluation runs alongside every layer; the harness is the platform underneath." | p.22 "runs alongside every layer at once"; p.24 "the platform on which all cognitive concerns are implemented"; p.25 "evaluation resting on and running through the harness frame" | OK |
| L52 "Each layer is harder to see, harder to specify, and harder to evaluate than the one below." | p.28, same words | OK |

### §4 component cards (questions, definitions, scopes, artifacts, failure signatures, asides)

Questions (q-line and Governs): all seven match p.2–3 and Reference Map lines 25–31. **OK.**

Characteristic artifacts: all seven match Reference Map lines 25–31 verbatim. **OK.**

Scopes: page uses the Reference Map's terms (Per-session, Per-system, Per-organization, Continuous, Per-ecosystem, Cross-layer,
Infrastructure), lines 25–31. The PDF says "Session-scoped" (p.5), "System-scoped" (p.7), "Organization-scoped" (p.11),
judgment "Dynamic... operates continuously" (p.14), "Ecosystem-scoped" (p.18). **OK.**

Failure signatures: the five layer signatures match the Reference Map verbatim and the PDF's names: "incoherent capability"
(p.5), "informed incompetence" (p.8), "misaligned optimization" (p.12), "confident wrongness at scale" (p.16), "emergent
misalignment" (p.19). Evaluation "Silent failure" and Harness "Capability mismatch" appear only in the Reference Map (line
30–31), not the PDF; the card section is labelled "From the Component Reference Map" (L148), so this is sourced. **OK / Note.**

Definitions:

| Card | Document | Result |
|---|---|---|
| Prompt L154 | p.4, verbatim | OK |
| Context L167 | p.7, verbatim | OK |
| Intent L180 | p.11, verbatim | OK |
| Judgment L193 "can adapt, escalate, or gracefully degrade" | p.14 "can either adapt, escalate, or gracefully degrade" | Minor (one word dropped) |
| Coherence L206 | p.18, verbatim | OK |
| Evaluation L219 "Not a layer: a parallel function that observes, measures, and corrects every layer of the stack, continuously and often autonomously. The layers tell you what to configure; evaluation tells you whether it's working." | p.22 "a parallel function that observes, measures, and corrects every layer of the stack. And it does so continuously, and often autonomously." / "While the five previous layers tell you what to configure, evaluation tells you whether it's working." | OK |
| Harness L232 | p.24 "governs the infrastructure, tooling, and execution environment in which the stack operates. It is the second meta-function, and not a layer of cognitive concern, but the platform on which all cognitive concerns are implemented." | OK |

Asides:

| Card | Page | Document | Result |
|---|---|---|---|
| Prompt L161 | "The human feels like they are talking to a brilliant entity that cannot understand what they mean." | p.5, verbatim | OK |
| Context L174 | "...follows instructions perfectly but has some sort of troublesome amnesia." | p.8, verbatim | OK |
| Intent L187 | "It looks like success until you examine the second-order effects. Metrics improve. Dashboards are green." | p.12 "...is that it looks like success until you examine the second-order effects. Metrics improve. Dashboards are green." | OK |
| Judgment L200 | "It hits every metric. It violates no explicit boundary. And it is steadily drifting." | p.16 "...And it is steadily drifting into territory where its technically correct actions are producing strategically harmful outcomes." | **Minor**: the third sentence is cut mid-sentence and given a full stop; it loses the point (correct actions, harmful outcomes). Edit E2. |
| Coherence L213 | "Auditing any single agent shows correct behavior. The problem exists only at the system level." | p.19, verbatim (trimmed after the colon) | OK |
| Evaluation L226 | "If you remove evaluation, the layers still function; you just can't see whether they're functioning well." | p.22 "...the layers still function, however you just can't see whether they're functioning well." | OK |
| Harness L239 | kitchen/recipe | p.24 and Reference Map line 200 | OK |

**Note (source-internal, not a page error):** the document defines coherence two ways. p.18 definition and "Fundamentally
plural... coherence engineering exists only in the context of multiple interacting agents"; but the same page, "It governs the
AI's consistency of identity, behavior, and principle across time and across tasks", and the diagnostic loop (p.25) asks "Is the
behavior inconsistent with previous work (coherence)?". The Reference Map (line 153) and Audit Protocol (line 171) reconcile
this: single-agent coherence is consistency across sessions; multi-agent coherence adds emergence. The page uses the
multi-agent definition on the card and the single-agent question in the loop, which faithfully mirrors the source.

### §3 interaction model and diagnostic loop

| Page | Document | Result |
|---|---|---|
| L121 "The stack is not a one-shot configuration..." | p.25, verbatim | OK |
| L122 "The user begins at the bottom... configured bottom-up but often set up in parallel." | p.25, verbatim with parentheticals trimmed | OK |
| L124 "The Stack gives a more precise diagnostic." | p.25 "This stack helps provide a more precise diagnostic" | OK |
| L136–138 steps 1–3 | p.25, verbatim | OK |
| L140 "The resulting skill is mode fluency: recognizing which layer is failing and intervening at the right level. Most AI frustration..." | p.25–26 "The resulting effect becomes mode fluency, or the skill of recognizing which layer is failing and intervening at the right level." / "Most AI frustration comes from..." | OK |
| SVG figure text | consistent with p.25 | OK |

**Note:** the PDF gives two correction paths (p.23): "Path 1 -- Autonomous correction" and "Path 2 -- Human-in-the-loop
correction", and says the human path is "the diagnostic path". The page shows only the human path. That is an omission, not a
misstatement; no edit proposed.

### §5 fractal property

| Page | Document | Result |
|---|---|---|
| L251 "The same five-layer structure applies at every scale of human-machine collaboration (a property Nate B. Jones identified)." | p.21 "Nate Jones, who suggested the existence and need of the intent engineering layer, identifies a critical property of the stack, that it is fractal. In our case, the same five-layer structure applies at every scale of human-machine collaboration." | OK |
| L253 Individual | p.21, verbatim | OK |
| L254 Team | p.21, verbatim | OK |
| L255 Organization "the prompt libraries and standards, ..., the AI governance framework, ..., the ecosystem management that keeps hundreds of AI deployments coherent." | p.22 "The enterprise prompt libraries and standards, ..., the strategic AI governance framework, ..., the ecosystem management that ensures hundreds of AI deployments produce coherent rather than contradictory outcomes." | **Minor**: "enterprise" and "strategic" dropped. Meaning kept. Worth noting for Q1: in the document this "governance framework" fills the *intent* slot at organisational scale. Optional edit E3. |
| L257 "The individual who masters intent engineering for their personal workflow..." | p.22 "...for their personal AI workflow..." | OK |
| L258–259 Where the regress stops | p.27 | **Substantive omission**, see sections 1–2. Edit E1. |

### §6 and source notes

| Page | Document | Result |
|---|---|---|
| L273 "(Henrique Jr. Sanchez, March 2026)" | PDF p.1 byline "Hayen Mill & Henrique Jr. Sanchez, March 2026" | **Note**: differs from the PDF, but follows the decision on file (remove the Hayen Mill credit from the site; PDFs stay as published). No edit. |
| L148 "From the Component Reference Map, v1.0, March 2026." | Reference Map line 3 "Version: 1.0 \| March 2026" | OK |

### Note on §2 dependency_rule (out of scope; for the agent rebuilding it)

L112–113 are the Reference Map's lines 230–234 nearly verbatim, and consistent with the PDF: "Each layer requires the previous
layers to be at least partially solved before it becomes the binding constraint" (p.27); "identify which layer is your current
binding constraint, invest there, and prepare for the next layer. For most individuals in early 2026, that means mastering
context engineering and beginning to develop intent engineering." (p.28). "Lowest weak layer = binding constraint" is the
Reference Map's rule (line 232); the PDF does not state it in those words.

### Count

- Substantive discrepancies: **1** (the regress paragraph omits the "why five" argument, the coherence half of the regress
  question, and the reason for circularity).
- Minor wording trims: **3** (judgment definition "either"; judgment aside cut mid-sentence; organisation fractal bullet drops
  "enterprise" and "strategic").
- Factual misstatements of the document: **0**.
- Notes (not errors): 4 (Evaluation/Harness signatures are Reference-Map-only; coherence's two definitions; Path 1 omitted;
  byline per decision).

---

## Proposed edits for docs/stack.html

Apply in a commit that passes the site QA gate. Strings are exact as of this read.

**E1 (recommended).** Line 259.

Before:
```html
    <p>If judgment monitors intent, what monitors judgment? The regress is terminated by human governance. At some point in every system there must be a human, or a human institution, that says: &ldquo;This is what we value. This is what we are willing to be held accountable for.&rdquo; That foundation cannot be automated without circularity.</p>
```

After:
```html
    <p>Why five layers and not fifteen? Each layer works at a higher level of abstraction than the one below it, and abstraction has diminishing returns. Coherence is the top. The next layer up would ask how the whole human-AI civilization stays aligned with human flourishing, and at that level the problem is no longer engineering. It is politics, ethics and philosophy: democratic governance, moral philosophy and institutional design.</p>
    <p>The same limit stops the regress. If judgment monitors intent, what monitors judgment? If coherence governs the agents, what governs the coherence framework? A human, or a human institution, that says: &ldquo;This is what we value. This is what we are willing to be held accountable for. This is the foundation on which everything else rests.&rdquo; That foundation cannot be automated without circularity, because the question &ldquo;what should we ultimately value?&rdquo; is constitutive of human agency itself. The stack ends at coherence; the regress ends with people.</p>
```

Optional with E1: the document places this passage under "Boundaries of the Stack: Why These Five Layers" (p.26–27). If the
page gets a boundaries section later, move the `<h3>` and both paragraphs there; until then, keeping it after the fractal
property is acceptable because the new first sentence states the topic.

**E2 (optional).** Line 200.

Before:
```html
  <p class="aside-line">It hits every metric. It violates no explicit boundary. And it is steadily drifting.</p>
```

After:
```html
  <p class="aside-line">It hits every metric. It violates no explicit boundary. And it is steadily drifting into territory where its technically correct actions are producing strategically harmful outcomes.</p>
```

**E3 (optional, cosmetic).** Line 255.

Before:
```html
      <li><strong>Organization:</strong> the prompt libraries and standards, the data and knowledge architecture, the AI governance framework, the feedback systems that detect misalignment, and the ecosystem management that keeps hundreds of AI deployments coherent.</li>
```

After:
```html
      <li><strong>Organization:</strong> the enterprise prompt libraries and standards, the data and knowledge architecture, the strategic AI governance framework, the feedback systems that detect misalignment, and the ecosystem management that keeps hundreds of AI deployments coherent rather than contradictory.</li>
```

Verification after applying: `grep -n "constitutive of human agency" docs/stack.html` returns 1 line; `grep -n -i -E
"revolutionary|unlock|supercharge|game-changing|seamless|empower" docs/stack.html` returns 0; `grep -n -i "lexic"
docs/stack.html` returns 0; then the full site QA gate (390/1280, light/dark, motion on/off, JS off).
