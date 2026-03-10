# AI-Human Engineering Stack — Component Reference Map

**Version:** 1.0 | March 2026  
**Authors:** Hayen Mill & Henrique Jr. Sanchez  
**Purpose:** A design reference for comparing architectures against the stack. Not a diagnostic questionnaire — a concrete map of what each component looks like when implemented, at different levels of maturity.

---

## How to Use This Document

This map makes the framework concrete enough to compare architectures against it. For each component, you'll find: what it governs, its characteristic artifacts (what you'd actually find in a well-engineered system), maturity levels from absent to advanced, and the boundary with adjacent components.

Use this to:
- Evaluate an existing architecture for coverage
- Design a new system by checking which components are accounted for
- Compare two architectures at the component level
- Identify which components are present but underdeveloped

---

## The Full Component Map

| Component | Governs | Characteristic artifacts | Scope | Failure signature |
|---|---|---|---|---|
| Prompt Engineering | What to do | Structured instructions, role definitions, format specs, task decomposition | Per-session | Incoherent capability — individually plausible, collectively inconsistent |
| Context Engineering | What to know | State files, context documents, retrieval systems, memory stores, compression protocols | Per-system | Informed incompetence — good instructions, wrong or missing information |
| Intent Engineering | What to want | Goal hierarchies, values docs, tradeoff specifications, decision boundaries, escalation logic | Per-organization | Misaligned optimization — task done correctly, actual goal undermined |
| Judgment Engineering | What to doubt | Uncertainty protocols, scope boundaries, pre-implementation checkpoints, escalation conditions | Continuous | Confident wrongness — high metric performance, progressive real-world drift |
| Coherence Engineering | What to become | Behavioral guidelines, inter-agent protocols, system-level monitoring, architectural principles | Per-ecosystem | Emergent misalignment — each agent correct, collective behavior wrong |
| Evaluation Engineering | How to know | Test suites, assertion libraries, layer-attributed diagnostics, autonomous correction loops | Cross-layer | Silent failure — the system can't see what's breaking or where |
| Harness Engineering | Where and how | Execution platform, tool integrations, orchestration definitions, CI/CD pipeline, session management | Infrastructure | Capability mismatch — the platform constrains what the cognitive layers could do |

---

## Component Detail

### Prompt Engineering — *What to Do*

**What it actually looks like:**

At minimum: instructions that specify task, format, and constraints explicitly rather than relying on the model to infer.

At intermediate: structured templates with role activation ("You are..."), step decomposition, negative constraints ("do not..."), and explicit success criteria. Consistent structure across similar task types.

At advanced: prompt libraries with versioning, systematic frameworks applied across the system (e.g. R.A.C.E., C.R.I.S.P., or equivalent), prompts treated as code artifacts with review and iteration processes.

**Characteristic artifacts:**
- System prompt documents
- Task-specific prompt templates
- Role activation patterns
- Format specifications
- Constraint lists

**Boundary with context engineering:** Prompt engineering ends when you move from "what to do with the information" to "which information to include." Format instructions are prompt concerns. Deciding which files to attach is a context concern.

**Boundary with intent engineering:** Prompt engineering defines the task space. Intent engineering defines the value function within that space. "Refactor this function" is a prompt. "We value readability over cleverness and this codebase is maintained by junior developers" is intent.

---

### Context Engineering — *What to Know While Doing*

**What it actually looks like:**

At minimum: relevant files and documentation attached to agent interactions. Some persistent notes between sessions.

At intermediate: dedicated context architecture — state documents, outcomes files, architectural decision records, lessons-learned logs. Dynamic retrieval (files pulled by relevance rather than loaded wholesale). Session restart protocols to avoid context rot.

At advanced: stability-ordered context (stable information first, dynamic information last to maximize cache efficiency), parallel subagents for context isolation, semantic retrieval with compression, explicit "what survives context compression" decisions.

**Characteristic artifacts:**
- `STATE.md` / `OUTCOMES.md` / `ROADMAP.md` style persistent documents
- Architectural decision records (ADRs)
- Retrieval configurations (RAG setup, file search)
- Context compression rules
- Session management protocols

**The four operations of context engineering:**
1. **Writing** — saving information outside the working context for later use
2. **Selecting** — pulling specific information in for the current decision
3. **Compressing** — retaining only what's needed, pruning what isn't
4. **Isolating** — splitting information across agents to prevent cross-contamination

**Boundary with intent engineering:** Context engineering is about what information is present. Intent engineering is about what the agent should prioritize across that information. If you're deciding which files to attach — context. If you're deciding which goal matters most given those files — intent.

---

### Intent Engineering — *What to Want While Doing*

**What it actually looks like:**

At minimum: some statement of project goals or values accessible to the agent. Often a README section or system prompt that goes beyond task description.

At intermediate: dedicated intent specification — explicit goal hierarchy (objectives ranked in conflict order), pre-decided tradeoffs ("we sacrifice X to preserve Y"), decision boundaries (what agents can decide autonomously vs. what requires human approval), escalation conditions.

At advanced: intent that cascades from orchestrator to execution agents — each agent in a pipeline understands not just its task but the system-level goal it serves. Value decomposition: high-level values translated into observable, agent-actionable behaviors. Regular intent review to prevent drift.

**Characteristic artifacts:**
- `VALUES.md` or equivalent
- Goal hierarchy documents
- Tradeoff matrices or explicit priority rankings
- Decision authority maps
- Escalation condition specifications
- "North star" injections into execution agent prompts

**The key transmission test:** Does intent reach the agents actually making decisions? Intent encoded only at the PM/orchestrator layer that doesn't cascade to execution agents is partial. Ask: does the agent writing code know *why* this feature matters and *what* it should sacrifice to preserve?

**Boundary with judgment engineering:** Intent says what the system should want. Judgment says when the system should doubt whether what it wants is still the right thing to want. Intent is encoded at a point in time; judgment monitors whether the encoding remains valid.

---

### Judgment Engineering — *What to Doubt While Doing*

**What it actually looks like:**

At minimum: some explicit uncertainty handling — agents instructed to flag rather than guess when outside their knowledge.

At intermediate: defined uncertainty protocols per decision type, scope boundaries that prevent agents from acting outside their authority, pre-implementation checkpoints ("verify approach before committing"), explicit risk tiers distinguishing tolerable from catastrophic errors.

At advanced: proactive judgment infrastructure — agents that pause mid-task to surface assumptions before proceeding, assumption monitoring that verifies environmental conditions still hold, counter-Goodhart mechanisms that detect metric/value divergence, graceful degradation when operating outside reliable parameters.

**Characteristic artifacts:**
- Uncertainty handling instructions in system prompts
- Scope boundary definitions
- Pre-implementation review steps (spike agents, feasibility checks)
- Escalation condition documents
- Risk tier classifications
- Assumption validation checkpoints

**The post-hoc problem:** Judgment that exists only as post-implementation review (audits, test passes after the fact) is partial judgment. Strong judgment engineering includes mechanisms that fire *before* commitment to significant work. Distinguish: "we have three audit passes" vs. "we have a pause-and-verify moment before the agent proceeds."

**Boundary with evaluation engineering:** Judgment is a cognitive layer — it governs the agent's own doubt about its reasoning. Evaluation is a meta-function — it observes whether the system as a whole is performing correctly. A judgment checkpoint is the agent asking "should I be doing this?" An evaluation mechanism is an external observer asking "did the system do this well?"

---

### Coherence Engineering — *What to Become While Doing*

**What it actually looks like:**

At minimum: behavioral guidelines that persist across sessions (style guides, architectural principles, communication standards loaded into every session).

At intermediate: explicit inter-agent coordination for multi-agent systems — agents aware of what other agents are doing, conflict escalation protocols for overlapping domains, system-level monitoring that evaluates outcomes the ensemble produces rather than individual agent outputs.

At advanced: ecosystem-level intent specifications that operate above individual agents — governing how agents interact, not just how they perform their tasks. Mechanisms for detecting architectural drift (the codebase evolving in an unintended direction through accumulated small changes). Regular coherence audits at the system level.

**Characteristic artifacts:**
- Cross-session behavioral guidelines
- Architectural principle documents
- Inter-agent communication protocols
- Domain boundary definitions (which agent owns what)
- System-level monitoring dashboards or reports
- Coherence audit processes

**Single-agent vs. multi-agent:** For single-agent systems, coherence engineering is primarily behavioral consistency across sessions. For multi-agent systems, it expands to include emergence management — ensuring the collective behavior of agents serves the system's purpose. Both are real; the multi-agent version is simply harder.

**Boundary with intent engineering:** Intent tells each agent what to want. Coherence ensures that what many agents collectively want — when their actions interact — still produces the right system-level outcome. An individual agent can have perfect intent alignment and still contribute to system-level incoherence.

---

### Evaluation Engineering — *How to Know While Doing*

**What it actually looks like:**

At minimum: test suites that verify output quality. Manual review processes. Some ability to identify when outputs are wrong.

At intermediate: automated evaluation wired into the execution cycle (tests run automatically, failures feed back to the agent). Layer-attributed diagnostics — ability to trace a bad output back to the layer that caused it, not just identify that output is wrong. Two distinct correction paths: autonomous (agent retries on feedback) and human-in-the-loop (findings surfaced for human decision).

At advanced: evaluation coverage across all seven components, not just output quality. Evaluation criteria themselves reviewed for gaming risk. Prospective evaluation (pre-commitment checks) alongside retrospective (post-implementation review). Behavioral benchmarks that verify reasoning patterns, not just output format.

**Characteristic artifacts:**
- Test suites and assertion libraries
- CI/CD evaluation integration
- Logging and observability infrastructure
- Layer-attribution diagnostic processes
- Evaluation criteria documents
- Human escalation paths and triggers

**The layer-attribution requirement:** Most systems evaluate only at the prompt layer — "does the output look right?" This is insufficient. When something is wrong, evaluation should be able to answer: was the instruction unclear (prompt failure)? Was information missing (context failure)? Were the wrong tradeoffs made (intent failure)? Was a risk ignored (judgment failure)? Is this inconsistent with prior work (coherence failure)? Evaluation that can't answer this question cannot guide improvement.

---

### Harness Engineering — *Where and How to Do*

**What it actually looks like:**

At minimum: a chosen execution platform with basic tool access. Manual orchestration.

At intermediate: defined orchestration architecture (sequential agents, parallel workers, supervisor/worker patterns, explicit human checkpoints). Session management protocols. Evaluation criteria automated into the pipeline. Configuration documented and reproducible.

At advanced: full CI/CD integration with automated evaluation gates. Tool access matched precisely to workflow requirements. Orchestration that adapts to task complexity. Configuration version-controlled and shareable. Harness decisions explicitly reviewed when cognitive layer requirements change.

**Characteristic artifacts:**
- Execution platform selection and configuration
- Tool integration definitions
- Orchestration architecture documentation
- Session management protocols
- CI/CD pipeline configuration
- Project configuration files (system prompts, rules, templates)
- Reproducibility documentation

**The kitchen/recipe distinction:** The harness is the kitchen; the five cognitive layers and two meta-functions are the recipe. A better kitchen doesn't change the recipe, but it changes what's feasible and efficient. Harness constraints can silently limit what higher layers can do — this is worth surfacing explicitly in any architecture review.

---

## Architecture Comparison Template

When comparing two architectures (System A vs. System B), use this table:

| Component | System A | System B | Notes |
|---|---|---|---|
| Prompt Engineering | [absent/minimal/intermediate/advanced] | | |
| Context Engineering | [absent/minimal/intermediate/advanced] | | |
| Intent Engineering | [absent/minimal/intermediate/advanced] | | |
| Judgment Engineering | [absent/minimal/intermediate/advanced] | | |
| Coherence Engineering | [absent/minimal/intermediate/advanced] | | |
| Evaluation Engineering | [absent/minimal/intermediate/advanced] | | |
| Harness Engineering | [absent/minimal/intermediate/advanced] | | |
| **Binding constraint** | | | |
| **Notable asymmetry** | | | |

**Comparison is most useful for:**
- Identifying which system has the higher ceiling (limited by which layer)
- Identifying which system has the stronger foundation (bottom layers)
- Understanding why two systems with similar prompts produce different outcomes (often a context or intent gap)
- Making deliberate investment decisions about where to develop next

---

## The Dependency Rule

Each layer depends on all layers beneath it. A system cannot have strong intent engineering without adequate context engineering — agents can't make aligned tradeoffs without the information to see what they're trading off. A system cannot have strong judgment engineering without clear intent — agents can't know when to doubt themselves if they don't know what they're supposed to want.

This means: when evaluating an architecture, identify the lowest weak layer. That is the binding constraint. Improving any layer above it before fixing the layer below produces diminishing returns.

The practical consequence: most architectures in 2026 have their binding constraint at context or intent engineering. Judgment and coherence engineering are important directions, but are rarely the right investment before context and intent are solid.
