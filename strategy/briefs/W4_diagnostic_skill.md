# PRD: "Mode Fluency Diagnostic", a downloadable skill people run with their own agent

## 1. What and why
Henrique's philosophy: free resources for everyone; charge for his human time. The repo currently spotlights two raw
"AIES Implementation Docs" (an Agent Audit Protocol and a Component Reference Map). Replace that with ONE polished,
rigorous, installable skill that lets anyone point their own agent (Claude Code first; Codex, Cursor, Copilot, Gemini CLI
and plain chatbots second) at their way of working, their workflow, or their repo, and get a Mode Fluency diagnosis plus,
if they want, fixes. It must be good enough that a sceptical engineer respects it and clear enough that an operations
manager can run it in a chat window.

## 2. Inputs (read before writing)
- /home/user/meta-strategy/briefs/00_SHARED_CONTEXT.md (all updates)
- /home/user/meta-strategy/STRATEGY_BRIEF.md §0–§1 and §3.3 (what the assessment product is; the skill is its free self-serve cousin)
- /home/user/meta-strategy/MODE_FLUENCY_MATRIX.md (stance → layer → guardrail)
- /home/user/meta-strategy/research/AI-Human-Stack-Agent-Audit-Protocol.md (the audit, reuse and tighten; it is Henrique's)
- /home/user/meta-strategy/research/AI-Human-Stack-Component-Reference-Map.md (maturity levels per component)
- /home/user/meta-strategy/research/src_archetypes_v3.md (stances, boundary tests, failure modes)
- /home/user/meta-strategy/research/src_specifying_work.txt (Intent Doc, Minimal Viable Spec, autonomy modes, vague-requirement translator)
- /home/user/meta-strategy/research/src_ai401_slides.txt (the harness improvement loop: "never fix the same mistake twice by hand"; the starter kit; folder layout)
- /root/.claude/skills/synced/*/spec-subagent-work-v3/SKILL.md (an example of a tight skill distilled from Henrique's guide; match its rigour, not its subject)
- Load the skill `anthropic-skills:skill-creator` via the Skill tool before you start, and follow its structure guidance.

## 3. Deliverable: /home/user/meta-strategy/skills/mode-fluency-diagnostic/
- SKILL.md (Claude Code / Agent Skills format: YAML frontmatter with name, description that triggers on phrases like
  "diagnose my AI workflow", "audit this repo for how we use AI", "which stance am I in", "mode fluency"; then the
  instructions). The skill has four modes the agent selects with the user:
  1. INTERVIEW (no files needed): 10–14 questions, one at a time, adaptive; output a Stance Profile (dominant stances, their
     failure modes and guardrails), an Autonomy level, a Binding Layer with evidence from the answers, and a 30-day plan of
     three actions. Suitable for a chatbot user with no repo.
  2. AUDIT (files/repo/workflow docs available): run the Stack audit (the seven components, Strong/Partial/Missing with cited
     evidence only, no inference), map observed usage to stances via the boundary tests, identify the binding constraint,
     and produce the layer-by-layer report. Must refuse to grade what it cannot see.
  3. FIX (after AUDIT, with explicit approval per item): propose the highest-leverage fixes using the harness improvement
     loop table (rule → instruction-file line; ignored rule → check script/hook; bad procedure → skill; missing info →
     context file/connector; missing judgment → write the judgment down). Implement only approved items, in the smallest
     reversible way, and end with a deviation report. Never touch files outside the agreed scope; never change tests the
     audit relies on.
  4. BUILD (optional): when a fix needs a small tool (a check script, a template, an intake form), spec it with an Intent
     Doc first, get approval, build it, and show how to run it.
  Plus: an explicit uncertainty policy (ask / flag / stop per situation), evidence standards (every finding cites a file,
  line, message or answer), what the skill must not do (no grading without evidence, no silent fixes, no claims of
  completion without verification), and a closing "What next" that points to the free site/videos and, only once and
  briefly, to the paid assessment.
- references/: stance-matrix.md (from MODE_FLUENCY_MATRIX.md), stack-audit.md (the tightened protocol), maturity-map.md,
  spec-templates.md (Intent Doc, Minimal Viable Spec, vague-requirement translator), harness-loop.md (401 table + starter kit),
  question-bank.md (the interview questions with branching notes).
- scripts/ (optional, only if genuinely useful): e.g. a tiny Python script that scores an audit JSON into a report; must run with python3 -I and no dependencies.
- PROMPT_PACK.md: the agent-agnostic version: one copy-paste prompt per mode for ChatGPT/Gemini/Copilot users who cannot install skills, with the references inlined or linked.
- README.md: what it does, who it is for, 60-second install for Claude Code (~/.claude/skills/ or a project .claude/skills/),
  Codex (AGENTS.md pointer), Cursor (rules), plain chat (PROMPT_PACK), example session transcripts (two short real ones you
  produce in §4), the free/paid line, license MIT, how to cite.
- EVAL.md: how you tested it and the results.

## 4. Verification you run yourself
- Dogfood 1: run the AUDIT mode against /home/user/hjasanchez/agentic-engineering (the repo clone) and save the resulting
  report as examples/audit-agentic-engineering.md. It must grade only with evidence (expect several ❌/⚠️: this repo is docs, not an agentic workflow).
- Dogfood 2: run the INTERVIEW mode as a simulated user (play a mid-size company operations manager who uses ChatGPT daily
  and just started Copilot agents) and save examples/interview-ops-manager.md.
- Lint: SKILL.md frontmatter valid; every reference file linked from SKILL.md exists; no banned words
  (revolutionary, unlock, supercharge, game-changing, seamless, empower); total ≤ 60 KB of text.
- A fresh-eyes read: re-open SKILL.md and check a stranger could run each mode unambiguously.

## 5. Non-goals
- Not a marketing document; no pitch beyond the one "What next" line.
- Do not modify files outside skills/mode-fluency-diagnostic/ (read-only on the repo clone).
- Do not build a web app.

## 6. Uncertainty policy and budget
Rigour over breadth: fewer, sharper questions and checks beat long lists. If Henrique's source documents conflict, prefer
the Stack document and the matrix; note the conflict in EVAL.md. Model: opus, effort high, no helpers, up to 2.5 hours.
Save early and often; keep STATUS.md updated. Return ≤12 lines: files produced, both dogfood results in one line each,
lint results, open questions for Henrique.
