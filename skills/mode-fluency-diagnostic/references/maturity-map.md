# Maturity map: what each component looks like as it matures

Source: *AI-Human Engineering Stack — Component Reference Map* v1.0 (Mill & Sanchez, March 2026), condensed.
Use it to assign a maturity level and to pick a next step that is one level up, not three.

**Grade ↔ maturity.** ❌ Missing = Absent. ⚠️ Partial = Minimal, or Intermediate with gaps. ✅ Strong = Intermediate
complete, or Advanced. ◻️ Not assessable has no maturity level.

| Component | Minimal | Intermediate | Advanced | Failure signature |
|---|---|---|---|---|
| **Prompt** (what to do) | Task, format and constraints stated explicitly | Templates with role, step decomposition, "do not" lists, success criteria; consistent across similar tasks | Versioned prompt library, reviewed and iterated like code | Incoherent capability: each output plausible, together inconsistent |
| **Context** (what to know) | Relevant files attached; some notes kept between sessions | State/outcomes files, decision records, lessons log; retrieval by relevance; restart protocol | Stability-ordered context, isolated subagents, explicit "what survives compaction" rules | Informed incompetence: good instructions, wrong or missing information |
| **Intent** (what to want) | Goals or values somewhere the agent can read | Ranked goals, pre-decided tradeoffs, decision boundaries, escalation conditions | Intent cascades to every executing agent; values turned into observable behaviours; regular review | Misaligned optimisation: task done right, goal undermined |
| **Judgment** (what to doubt) | Agents told to flag rather than guess | Uncertainty protocol per decision type, scope boundaries, pre-implementation checkpoint, risk tiers | Mid-task assumption checks, counter-Goodhart checks, graceful degradation | Confident wrongness: metrics fine, reality drifting |
| **Coherence** (what to become) | Guidelines that persist across sessions | Inter-agent coordination, ownership boundaries, ensemble-level monitoring | Ecosystem-level specs above agents; drift detection; coherence audits | Emergent misalignment: each agent right, the whole wrong |
| **Evaluation** (how to know) | Tests or manual review; can tell when output is wrong | Checks wired into the run, failures fed back; layer-attributed diagnosis; autonomous and human correction paths | Coverage of all seven components; criteria reviewed for gaming; prospective checks too | Silent failure: cannot see what is breaking or where |
| **Harness** (where and how) | A chosen platform, basic tools, manual orchestration | Defined orchestration and human checkpoints; session management; checks in the pipeline; reproducible config | CI gates, tool access matched precisely, version-controlled shareable config, harness reviewed when needs change | Capability mismatch: the platform limits what the layers could do |

## Boundaries (to avoid conflating layers)

- **Prompt / Context**: format instructions are Prompt; deciding which files to include is Context.
- **Prompt / Intent**: "refactor this function" is Prompt; "we value readability over cleverness; juniors maintain this" is Intent.
- **Context / Intent**: which information is present is Context; which goal wins given that information is Intent.
- **Intent / Judgment**: Intent says what to want; Judgment says when to doubt whether that is still right.
- **Judgment / Evaluation**: Judgment is the agent asking "should I be doing this?" before acting; Evaluation is an
  observer asking "was this done well?"
- **Intent / Coherence**: Intent aligns one agent; Coherence makes many aligned agents (or many sessions) add up.
- **Harness**: the kitchen, not the recipe. Name any harness limit that silently caps a higher layer.

## The dependency rule

No aligned tradeoffs (Intent) without the information to see them (Context); no useful doubt (Judgment) without knowing
what you want (Intent). Most people and teams in 2026 bind at Context or Intent (the rule itself: SKILL.md §8).
