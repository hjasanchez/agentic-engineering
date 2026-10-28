# Task: draft a publishable "The Fourteen Stances" document from Henrique's archetypes notes — 2026-10-29

## 1. What and why
The site's stances and matrix pages were citing "Archetypes of LLM-Human Interaction (v3)", an internal working file that is a chat
transcript, not a document. Henrique wants either a proper document on GitHub, in the style of his other published documents, or no
citation at all. Draft the document so he can decide in the morning. It is his own text; your job is editing and structure, not invention.
Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs (read before writing)
- strategy/research/Archetypes_LLM-Human_Interaction_V3.md: the source. It contains Henrique's prompt, the fourteen archetypes with expectation,
  why it stays hidden, boundary test, failure mode, cardinal rule/guardrail, examples, the consumption/construction table, and the meta-pattern
  (passive vs active, the Collaborator as the active Genie). Everything in the new document must trace to it or to the Matrix.
- MODE_FLUENCY_MATRIX.md (the stance × layer matrix; guardrails and load-bearing layers), docs/stances.html (the current public rendering, with the
  cards' exact field texts, already verified verbatim against the source), docs/matrix.html.
- AI-Human-Stack-Component-Reference-Map.md and AI-Human-Stack-Agent-Audit-Protocol.md: the house style for a published document (title block,
  version and date, purpose, numbered sections, tables, a closing "how to use this" section).
- README.md "Credits and lineage" for the lineage to credit (Anthropic 4Ds, Mollick, Nate B. Jones, Karpathy, Rieseberg, the CHI 2026 archetypes paper).

## 3. The document
- Path: C:\Users\henri\AppData\Local\Temp\claude\C--Users-henri-Desktop-CCode-modefluency\30d2be6e-ee02-497a-9ebc-a4b5153f79ac\scratchpad\THE_FOURTEEN_STANCES.md
  (the orchestrator moves it into the repo on a preview branch; do not write into the repo).
- Title: "The Fourteen Stances: archetypes of human-AI interaction". Author line: Henrique Jr. Sanchez. Version 1.0, date 2026-10-29. No version suffix
  anywhere in the body. Licence line: CC BY-SA 4.0 (documents), consistent with the repo's LICENSE.
- Structure: (0) purpose and how to read, two paragraphs; (1) why stances: the axis "what am I expecting from this exchange", the Oracle/Genie default and
  why both are fragile (his own words); (2) the fourteen, one subsection each, in the order the site uses, with the fields: expectation, why it stays hidden,
  boundary test, failure mode, cardinal rule, example (where the source has one); (3) consumption and construction, the table; (4) the meta-pattern:
  passive and active stances, the Collaborator as the active form of the Genie; (5) stances and the Stack: the load-bearing layer per stance and the
  guardrail, as a table pointing to the Matrix; (6) how to use this: pick the stance before you type; the diagnostic skill; (7) lineage and references.
- Text rule: wherever the source already has a sentence, use it verbatim (same rule the site follows). Where you must write connective prose, keep it to
  the minimum and keep his voice: plain, direct, dry. Banned words: revolutionary, unlock, supercharge, game-changing, seamless, empower.
  Replace "dross" with "noise" (his 2026-10-29 decision) and avoid the word "pantheon" in headings.
- Do not mention the chat origin, "v3", the pen name, or any internal file path.

## 4. Output
- The document, plus a short C:\…\scratchpad\W16_NOTES.md listing: every sentence you wrote that is not in the source (with the section), and any place
  where the source and the Matrix disagree.
- Return ≤12 lines: word count, sections, the count of non-source sentences, the disagreements found.

## 5. Constraints
- Budget: 60 minutes. Model: opus. No helpers. Read-only on the repo.
