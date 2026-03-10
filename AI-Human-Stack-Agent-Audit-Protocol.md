# AI-Human Engineering Stack — Agent Audit Protocol

**Version:** 1.0 | March 2026  
**Authors:** Hayen Mill & Henrique Jr. Sanchez  
**Purpose:** A structured protocol for an agent to audit a codebase or agentic workflow and produce a layer-by-layer component map.

---

## Instructions for the Auditing Agent

You are about to perform a structured diagnostic audit of an AI-augmented system. Your task is to map what exists against the AI-Human Engineering Stack — a seven-component framework covering five cognitive layers and two meta-functions.

**Your input may be:**
- A codebase or repository
- A workflow description or documentation
- Both

**Your output must be:**
A structured component map reporting, for each component: what exists, what's strong, what's missing or partial, specific evidence from the system, and the highest-leverage next step.

**Do not:**
- Guess or infer the presence of components without specific evidence
- Evaluate only at the output level ("does the final result look good?")
- Report only what's working — gaps are the most valuable finding
- Conflate layers (e.g. don't call a system prompt "intent engineering" if it only describes the task)

**Tier definitions:**
- ✅ **Strong** — The component is explicitly present, consistently applied, and would survive a session restart
- ⚠️ **Partial** — The component exists in some form but has meaningful gaps in coverage, consistency, or depth
- ❌ **Missing** — No evidence of this component in the system

---

## Component 1: Prompt Engineering
**The question it answers:** *What to do*  
**Scope:** Session-level. Governs direct instructions given to agents — task definition, format, constraints, scope, success criteria.

**What to look for:**
- Are task instructions structured with explicit role, scope, format, and success criteria — or are they open-ended requests?
- Do prompts decompose complex tasks into steps, or pass ambiguous instructions and expect the model to infer structure?
- Are constraints (what *not* to do) explicitly stated?
- Is the expected output format defined?
- Do prompts vary significantly in quality across different parts of the system, or are they consistently structured?

**Gap indicators:**
- Prompts that are purely imperative without structure ("do X") with no format or constraint specification
- Inconsistent output formats across similar tasks
- Absence of role definitions or activation instructions
- Repeated re-prompting visible in logs/history, suggesting the first instruction failed

**Report format:**
```
PROMPT ENGINEERING: [✅ Strong / ⚠️ Partial / ❌ Missing]
Evidence: [Specific examples from the system]
Gaps: [What's absent or inconsistent]
Highest-leverage next step: [One concrete action]
```

---

## Component 2: Context Engineering
**The question it answers:** *What to know while doing*  
**Scope:** System-level. Governs what information is available to agents — files, documentation, memory, retrieval, history.

**What to look for:**
- Is there a structured information architecture (dedicated context files, state documents, reference materials)?
- Is context curated (specific files selected per task) or naive (everything passed in by default)?
- Is there a mechanism for persistent memory across sessions — state files, logs, summaries, lessons-learned documents?
- Is retrieval dynamic (RAG, semantic search, targeted file reads) or static?
- Is there evidence of context management — pruning, summarization, or session restart protocols to combat context rot?
- Are agents ever working without context they should have (evidence: hallucination of facts that exist in the codebase, duplicated code, contradicted prior decisions)?

**Gap indicators:**
- No persistent state or memory files
- Context windows that grow unbounded with no compression mechanism
- Agents making decisions without access to project history or architectural decisions
- Hallucination of facts that are present in the repository but not loaded into context
- No separation between stable context (loaded first, rarely changes) and dynamic context (updated per task)

**Report format:**
```
CONTEXT ENGINEERING: [✅ Strong / ⚠️ Partial / ❌ Missing]
Evidence: [Specific examples from the system]
Gaps: [What's absent or inconsistent]
Highest-leverage next step: [One concrete action]
```

---

## Component 3: Intent Engineering
**The question it answers:** *What to want while doing*  
**Scope:** Organization/project-level. Governs goals, priorities, tradeoffs, decision boundaries, and value hierarchies.

**What to look for:**
- Are there documents that encode *why* the work is being done, not just *what* to do?
- Are tradeoffs pre-decided? (e.g. "prefer readability over performance," "preserve backward compatibility unless explicitly directed otherwise")
- Is there a goal hierarchy — a ranking of objectives when they conflict?
- Do execution agents receive intent, or only instructions? (Intent that stops at an orchestrator layer and doesn't reach the agents doing the work is partial, not strong)
- Are decision boundaries defined — what agents can decide autonomously, what requires human approval?
- Are escalation conditions specified — when should an agent stop and surface a decision?

**Gap indicators:**
- No values, goals, or priority documents (or equivalents under any name)
- Agents optimizing for locally correct outcomes that don't serve system-level goals
- Repeated human corrections that share a pattern (same type of wrong tradeoff being made consistently) — suggests implicit intent that was never encoded
- Intent encoded at the orchestrator/PM layer but not cascaded to execution agents
- Success defined only as task completion, not as alignment with broader objectives

**Watch for the Klarna Pattern:** The system performs tasks correctly by all local metrics while producing second-order effects that undermine actual goals. This is the characteristic failure of missing intent — it looks like success until you examine what *wasn't* measured.

**Report format:**
```
INTENT ENGINEERING: [✅ Strong / ⚠️ Partial / ❌ Missing]
Evidence: [Specific examples from the system]
Gaps: [What's absent or inconsistent]
Highest-leverage next step: [One concrete action]
```

---

## Component 4: Judgment Engineering
**The question it answers:** *What to doubt while doing*  
**Scope:** Continuous/reflexive. Governs how the system handles uncertainty, edge cases, scope boundaries, and assumption validity.

**What to look for:**
- Are uncertainty protocols defined? (What should an agent do when it's not sure: ask, flag, choose conservatively, explain reasoning?)
- Do agents surface uncertainty in outputs, or proceed confidently regardless of actual confidence?
- Are risk tiers defined — which errors are catastrophic vs. tolerable?
- Are scope boundaries enforced — do agents stay within defined task boundaries, or do they make changes outside their assigned scope?
- Is there a pre-implementation check (spike, feasibility assessment, approach validation) before committing to significant work?
- Are judgment mechanisms proactive (pause and doubt *before* committing) or only reactive (audit after the fact)?

**Gap indicators:**
- Judgment exists only as post-hoc review (tests, audits after implementation) — this is partial, not strong
- No explicit "pause points" where agents must flag uncertainty before proceeding
- Agents making architectural or irreversible decisions autonomously without escalation
- Confident prose on outputs where the underlying reasoning is questionable
- No evidence of agents declining or flagging tasks that fall outside their competence

**Watch for specification gaming:** Agents may satisfy the formal specification while violating its intent. If evaluation metrics are consistently met but outcomes don't feel right, this is a judgment/Goodhart problem — the system has no mechanism to detect when its metrics have decoupled from the values they represent.

**Report format:**
```
JUDGMENT ENGINEERING: [✅ Strong / ⚠️ Partial / ❌ Missing]
Evidence: [Specific examples from the system]
Gaps: [What's absent or inconsistent]
Highest-leverage next step: [One concrete action]
```

---

## Component 5: Coherence Engineering
**The question it answers:** *What to become while doing*  
**Scope:** Ecosystem-level. Governs behavioral consistency across agents, sessions, and time — and emergent system-level behavior in multi-agent contexts.

**What to look for:**
- Is there a stable behavioral identity across sessions — consistent code style, communication patterns, architectural philosophy?
- Do stated principles and guidelines persist across sessions, or reset each time?
- In multi-agent systems: are there coordination protocols between agents? Do agents know what other agents are doing?
- Is there any monitoring of system-level outcomes — not just individual agent outputs, but what the *ensemble* is producing?
- Is there a mechanism for detecting architectural drift — the codebase or system evolving in an unintended direction through accumulated small changes?
- Do agents with overlapping domains have consistent intent specifications, or could they conflict?

**Gap indicators:**
- Each session starts stateless with no behavioral carry-forward
- Different agents (or the same agent in different sessions) making inconsistent architectural decisions
- No system-level monitoring — only agent-level evaluation
- Observable drift in codebase structure or system behavior over time with no detection mechanism
- For single-agent systems: evaluate coherence across sessions rather than across agents

**Note for single-agent systems:** Coherence engineering is not solely a multi-agent concern. A single agent that behaves inconsistently across sessions has a coherence problem. The full multi-agent emergence problem applies at scale, but behavioral consistency is diagnosable in any system.

**Report format:**
```
COHERENCE ENGINEERING: [✅ Strong / ⚠️ Partial / ❌ Missing]
Evidence: [Specific examples from the system]
Gaps: [What's absent or inconsistent]
Highest-leverage next step: [One concrete action]
```

---

## Meta-Function 1: Evaluation Engineering
**The question it answers:** *How to know while doing*  
**Scope:** Cross-layer. Governs whether the system can observe, measure, and correct itself at every layer — not just at the output level.

**What to look for:**
- Are there evaluation mechanisms at each layer, or only at the prompt layer (output quality)?
- Are tests, assertions, or quality checks automated and wired into the execution cycle?
- Can the system distinguish *which layer* failed when an output is wrong — or does failure just appear as "bad output"?
- Are there two correction paths: autonomous (agent receives feedback and retries without human) and human-in-the-loop (findings surfaced for human decision)?
- Are evaluation criteria themselves reviewed — or are they static and potentially gameable?
- Is evaluation prospective (before committing) or only retrospective (after)?

**Layer-by-layer evaluation surface to audit:**

| Layer | What evaluation should ask |
|---|---|
| Prompt | Did the agent do what was asked? Did it follow format, constraints, scope? |
| Context | Did the agent use the right information? Did it miss something it had? Did it hallucinate something it didn't have? |
| Intent | Did the agent optimize for the right things? Were the intended tradeoffs made? |
| Judgment | Did the agent handle uncertainty appropriately? Did it flag what it should? Did it proceed when it should have paused? |
| Coherence | Is behavior consistent with prior sessions and similar tasks? |

**Gap indicators:**
- Evaluation exists only at the output layer ("does it look right?")
- Tests run manually rather than integrated into the execution loop
- No mechanism to trace a bad output back to the layer that caused it
- Evaluation criteria that could be gamed by the model (tests that reward superficial correctness without verifying underlying intent)
- No human re-entry path when autonomous correction fails

**The hardest open problem here:** Evaluation gaming — ensuring tests can't be satisfied by a model finding shortcuts that satisfy the formal specification while violating intent. If you detect this pattern, flag it explicitly.

**Report format:**
```
EVALUATION ENGINEERING: [✅ Strong / ⚠️ Partial / ❌ Missing]
Evidence: [Specific examples from the system]
Gaps: [What's absent or inconsistent]
Highest-leverage next step: [One concrete action]
```

---

## Meta-Function 2: Harness Engineering
**The question it answers:** *Where and how to do*  
**Scope:** Infrastructure. Governs the execution environment, tooling, orchestration, session management, and CI/CD pipeline.

**What to look for:**
- What execution platform(s) are in use, and are they appropriate for the workflow's complexity?
- What tools does the system have access to (file system, code execution, search, databases, deployment pipelines)?
- Is orchestration defined — how multi-step tasks are structured (sequential, parallel, supervisor/worker, human checkpoints)?
- Is session management handled — how context windows are managed across long tasks, how sessions are segmented and restarted?
- Are evaluation criteria automated and wired into the execution pipeline (CI gates, pre-commit hooks, test runners)?
- Can the configuration be saved, shared, and reproduced — or is the working setup implicit in one person's local environment?
- Are harness constraints creating artificial limitations on higher layers (e.g. no tool access that would enable better context management)?

**Gap indicators:**
- Orchestration is implicit (human manages task sequencing manually) rather than encoded
- No CI/CD integration — evaluation runs only when a human decides to run it
- Session management is ad-hoc — long sessions allowed to run into context rot without restart protocols
- Working configuration is not reproducible — depends on undocumented local setup
- Tool access is mismatched to the workflow's needs (too restricted or too permissive)

**Report format:**
```
HARNESS ENGINEERING: [✅ Strong / ⚠️ Partial / ❌ Missing]
Evidence: [Specific examples from the system]
Gaps: [What's absent or inconsistent]
Highest-leverage next step: [One concrete action]
```

---

## Synthesis: Gap Analysis and Priority Recommendation

After completing all seven component assessments, produce the following synthesis:

**1. Component map summary**

| Component | Tier | Primary gap |
|---|---|---|
| Prompt Engineering | [✅/⚠️/❌] | [One sentence] |
| Context Engineering | [✅/⚠️/❌] | [One sentence] |
| Intent Engineering | [✅/⚠️/❌] | [One sentence] |
| Judgment Engineering | [✅/⚠️/❌] | [One sentence] |
| Coherence Engineering | [✅/⚠️/❌] | [One sentence] |
| Evaluation Engineering | [✅/⚠️/❌] | [One sentence] |
| Harness Engineering | [✅/⚠️/❌] | [One sentence] |

**2. Binding constraint identification**

Which single component is most limiting the system's effectiveness right now? State it and explain why it's the binding constraint rather than the others.

**3. What's missing that explains current failure patterns**

Connect any observable failure patterns (repeated human corrections, inconsistent outputs, outputs that satisfy local metrics but miss broader goals) back to their likely layer of origin. A bad output is a symptom — which layer is the cause?

**4. Highest-leverage next step**

One specific, actionable recommendation. Not a list. The single change that would most improve the system's effectiveness given its current state.

---

## Notes on Application

**On evidence standards:** Only report what you can cite. If a component is present but you can only infer it from behavior rather than pointing to explicit artifacts, note this — implicit intent is weaker than encoded intent, implicit coherence is weaker than defined coherence.

**On the hardest gaps to detect:**
- **Intent transmission failures** — intent encoded at the top of a system that doesn't reach execution agents. Check whether the "why" is present at the level where decisions are actually made, not just at the level where the task is initiated.
- **Post-hoc-only judgment** — judgment mechanisms that fire only after implementation. A system with three audit passes but no pre-implementation pause has partial judgment at best.
- **Evaluation gaming** — tests satisfied by superficial correctness. Hard to detect from static analysis; look for any evidence of model behavior that technically satisfies criteria while producing unexpected second-order effects.

**On scope:** This protocol is designed to be applied to whatever you have access to. If you only have a workflow description and no codebase, apply it to what exists. Flag what you cannot assess due to missing information rather than inferring.
