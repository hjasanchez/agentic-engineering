# Mode Fluency

**Know which mode you're in when you work with AI.**

Free guides, videos and tools for people who use AI at work every day and still get burned, and for the teams that have to show they did something about it. Everything here is free. Made by [Henrique Jr. Sanchez](https://www.linkedin.com/in/henriquejsanchez). Website: modefluency.com *(coming)*.

## Start here

Pick the door that fits you today.

| If you… | Start with | Time |
|---|---|---|
| use ChatGPT, Claude, Gemini or Copilot and want to get reliably better | **[AI @ Workplace](#learn-ai--workplace)**, the video series, from 101 | 20 min per level |
| want to know what is actually going wrong in how you (or your team) work with AI | **[The Mode Fluency Diagnostic](#diagnose-run-it-with-your-own-agent)**, run with your own AI | 10 min interview, or a full audit |
| build agents, workflows or custom bots | **[The frameworks](#understand-the-frameworks)**: the Stack and the guide to specifying work | an evening |

## Learn: AI @ Workplace

A video series that assumes you already know how to do your job and teaches you how to do it with AI. Each level builds on the last.

| Level | For | What you learn | Watch | Slides |
|---|---|---|---|---|
| **101** | absolute beginners | what an LLM is, how to write a prompt, what to look out for | [video](https://www.youtube.com/watch?v=jljFm4YPHO8) | [PDF](AI%20101%20%40%20Workplace.pdf) |
| **201** | regular chatbot users | prompt systems, workflows, task decomposition, quality control | [video](https://www.youtube.com/watch?v=WVDDf8IlG6E) | [PDF](AI%20201%20%40%20Workplace%202026.pdf) · [templates](https://drive.google.com/drive/folders/1bltRycYpeBnKVlTjlSZhwFEI1KKc-bRe) |
| **301** | advanced users | custom bots, context management, from chatbots to agents, the eval mindset | [video](https://youtu.be/R2p5aFcb0lY) | [PDF](AI%20301%20%40%20Workplace%202026.pdf) |
| **401** | agent users | the agent harness, deterministic tools, skills and MCP, loops, the translation barrier | [video](https://youtu.be/p6nMtu7iH1g) | [PDF](AI%20401%20%40%20Workplace%202026.pdf) |
| 501 | *coming* | local agents | | |
| 601 | *coming* | agents that run the shop ("dark factories") | | |

## Diagnose: run it with your own agent

**The Mode Fluency Diagnostic** is a free skill you install in your own AI (Claude Code first; Codex, Cursor, Copilot and plain chat too). It asks you questions or reads your workflow and repo, tells you which *stance* you are in, which *layer* is holding you back, and the one guardrail to adopt. With your approval it can also fix things.

- [Install and run it](skills/mode-fluency-diagnostic/) (60 seconds for Claude Code)
- [Prompt pack](skills/mode-fluency-diagnostic/PROMPT_PACK.md) if you cannot install skills: paste into any chatbot
- [See an example report](skills/mode-fluency-diagnostic/examples/)

Three words you will meet: a **stance** is what you expect from the AI (an oracle? a genie? an executor?); a **layer** is what you must supply for that expectation to hold (instructions, information, purpose, doubt…); a **mode** is where you are on both at once. Knowing which mode you're in is the whole skill.

## Understand: the frameworks

- **[The Calculator Problem](https://modefluency.com/calculator-problem)** *(essay)*: why we taught everyone to press the buttons and nobody taught them which problems the machine is for.
- **[The Fourteen Stances](strategy/research/Archetypes_LLM-Human_Interaction_V3.md)**: the fourteen things people expect from an AI, each with its failure mode and its one rule.
- **[The AI-Human Engineering Stack](The%20AI-Human%20Engineering%20Stack.pdf)**: five layers (what to do, know, want, doubt, become) and two meta-functions (how to know, where to run). The architecture of delegating work to a machine.
- **[The Mode Fluency Matrix](MODE_FLUENCY_MATRIX.md)**: which layer carries each stance, and the guardrail that follows.
- **[The Complete Guide to Specifying Work for AI](The%20Complete%20Guide%20to%20Specifying%20Work%20for%20AI.pdf)**: how to write the work down so the machine does what you meant (Intent Doc, Minimal Viable Spec, PRD).
- Diagrams: [the agentic loop](agentic_loop.jpg) · [the Stack](agenticengineering.jpg)

For practitioners who want the raw instruments behind the diagnostic: [Agent Audit Protocol](AI-Human-Stack-Agent-Audit-Protocol.md) · [Component Reference Map](AI-Human-Stack-Component-Reference-Map.md).

## Work with me

Everything above is free and stays free. What I charge for is my time: a two-week **Mode Fluency Assessment** of how your team works with AI (including the written "AI literacy measures" the EU AI Act asks deployers to show), and **AI @ Workplace workshops** run on your own workflows. Details on the website, or message me on [LinkedIn](https://www.linkedin.com/in/henriquejsanchez).

## Credits and lineage

This work builds on Anthropic's AI Fluency framework (the 4Ds), Ethan Mollick's *Co-Intelligence*, Nate B. Jones's intent engineering, Andrej Karpathy's agentic and context engineering, Felix Rieseberg's four kinds of ambition, and the human-LLM archetypes literature. The AI-Human Engineering Stack and the Specifying guide were co-written with "Hayen Mill", a pen name used while drafting with AI.

## License and citation

Code and skills: MIT. Documents, slides and videos: GPL-3.0 as published (a move to CC BY-SA 4.0 is under consideration). Cite as: Sanchez, H. J. (2026). *Mode Fluency*. github.com/hjasanchez/agentic-engineering.
