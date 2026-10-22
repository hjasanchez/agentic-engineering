# Shared context for all research agents (read first, in full)

## Who the client is
Henrique Jr. Sanchez (GitHub: hjasanchez; YouTube: "Henrique Sanchez (PonicLabs)", @henriquejsanchez). Creator of the public repo
https://github.com/hjasanchez/agentic-engineering ("semi-popular"). Works a full-time job in another (non-AI) field; this is a side
project that they hope can out-earn the day job so they can transition. Global, English-only market. Solo founder. The co-author
name "Hayen Mill" on two documents is an AI persona/pseudonym, not a second human. Pronouns: they/them.

## What they have built (all source texts are in /home/user/meta-strategy/research/)
1. "AI @ Workplace" video+slide series: AI 101 (LLM intro, prompts), 201 (prompt systems, workflows, quality control),
   301 (custom bots/RAG, context management, chatbot→agent, information map, failure patterns, eval mindset),
   401 (agent harness, determinism, skills/MCP, loops, "translation barrier"). Planned through 601 (local agents, "dark factories").
   Files: src_ai101_slides.txt ... src_ai401_slides.txt. Analogy they use: this is "how to use the calculator", assuming the
   reader can already do the math by hand.
2. "The AI-Human Engineering Stack" (AIES): 5 cognitive layers (Prompt=what to do, Context=what to know, Intent=what to want,
   Judgment=what to doubt, Coherence=what to become) + 2 meta-functions (Evaluation=how to know, Harness=where/how to do).
   Dependency rule (lowest weak layer is the binding constraint), "mode fluency" (diagnose which layer failed, re-enter there),
   fractal across individual/team/org. File: src_aies_stack.txt. Plus two implementation docs: AI-Human-Stack-Agent-Audit-Protocol.md
   (for an agent to audit a system) and AI-Human-Stack-Component-Reference-Map.md (for humans).
3. "The Complete Guide to Specifying Work for AI": Intent Doc / Minimal Viable Spec / PRD, autonomy modes
   (Assistive/Directed/Autonomous/Continuous), vague-requirement translator. File: src_specifying_work.txt.
4. "Archetypes of LLM-Human Interaction" (v3): Oracle, Genie, Tutor, Mirror, Adversary, Librarian, Interpreter, Simulator,
   Scribe, Executor, Muse, Miner, Therapist, Translator; consumption vs construction meta-pattern; each with a failure mode
   and a cardinal rule. File: src_archetypes_v3.md. This is the "what does the calculator enable, and when to use it" half.
5. Three outside articles that triggered the current thinking: Nadella "Reverse Information Paradox" (firms leak their know-how
   into models; own your learning loop; Control/Capability/Choice/Cost/Compound), Rieseberg "How to be more ambitious"
   (Speed/Altitude/Depth/Range), Sivulka "You just hired a million bad employees" (tokens behave like a workforce; 1 in 100 can
   give context; evals are the new OKRs; "AI transformation companies"). Files: src_nadella_*.md, src_rieseberg_*.md, src_sivulka_*.md.

## The strategic question (orchestrator owns the answer; your research feeds it)
Is there a "meta" discipline/brand that encompasses BOTH "how to operate AI" (the curriculum, the Stack) AND "what stance to take
toward it and when" (the archetypes, ambition), that is unique and makes Henrique stand out? Then: how to turn it into a
side-project business (consulting, website, installable agent skills, maybe paid software), primary customer = non-technical
knowledge workers and SME teams, with a slice of technical teams, leadership buyers, and individual learners.

## Already established (do not re-research, just cite if relevant)
- Andrej Karpathy coined "agentic engineering" in Feb 2026 as the successor term to "vibe coding"; the term is now generic.
- Anthropic has a free "AI Fluency" course (Feller & Dakan) with a "4D" framework: Delegation, Description, Discernment, Diligence.

## Rules for every agent
- Today is 2026-10-21. Prefer sources from 2025-2026. Date every claim you cite.
- Evidence standard: every factual claim carries a URL. Mark anything you could not verify as UNVERIFIED. Never invent sources,
  prices, dates or numbers. A refusal plus a flag beats a guess.
- Write your full output to the exact path your brief names (Markdown). Return to the orchestrator at most 15 lines:
  counts, the 3-5 most decision-relevant findings, anomalies, open questions. Do not paste the document back.
- Do not modify any file in research/ that you did not create. Do not spawn subagents unless your brief says you may.
- Budget: at most 40 web searches/fetches unless your brief says otherwise. If a site blocks you, note it and move on.
- Audience for your output: the orchestrator (an AI) and Henrique (a sharp, non-AI-specialist professional who will act on it).

## Update 2026-10-22 (Henrique's feedback after reviewing the overnight work)
- He liked the concept (four axes, stance × layer matrix) and the site skeleton.
- NOT sold on the name "Mode Fluency": feels long/awkward for an enterprise, and has no direct reference to AI, automation,
  LLMs or agents, which he believes is needed to reach the mass of potential customers and enterprises.
- The site design is "not captivating and unique enough". The site must itself showcase the animation and sophistication
  an agent can produce, or people will think "this guy claims AI can do all this but his website is crap".
- The strategy brief (STRATEGY_BRIEF.md) and the current prototype (site/) remain the reference for content and positioning.

## Update 2026-10-22 evening (Henrique's decisions)
- Design: Direction C ("The Field", /home/user/meta-strategy/design-directions/C-field/) is chosen. Build the full site in it.
- Name: "Mode Fluency" stays (it grew on him). Tagline: "Know which mode you're in."
- Landing copy: replace "calculator" with "machine" in the hero lede so first-time visitors are not puzzled:
  "We taught everyone to press the buttons. Nobody taught them which problems the machine is for."
  The essay keeps its title "The Calculator Problem" (the explanation follows immediately there).
- Philosophy: free resources for everyone; charge for what needs his human time. The repo's "AIES Implementation Docs"
  will be replaced in the spotlight by a polished, downloadable diagnostic skill people run with their own agent.
