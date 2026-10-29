# Task: trademark sanity search for "Mode Fluency" — 2026-10-29

## 1. What and why
Henrique has launched modefluency.com and will post about it. Before spending more on the name, check whether "Mode Fluency" (and close
variants) is registered or applied for as a trademark in the registers that matter to a global, English-language, EU-based practice.
This is a sanity check, not legal advice; say so in the output. Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs
- strategy/research/R3_naming_and_brand_check.md and strategy/naming/ (what was checked on 2026-10-21: USPTO had no hit; EU/WIPO blocked automation).
- Registers to try, in this order, with WebFetch/WebSearch: TMview (tmdn.org), EUIPO eSearch plus (euipo.europa.eu/eSearch), WIPO Global Brand Database
  (branddb.wipo.int), USPTO (tmsearch.uspto.gov), UKIPO (search-for-trademark.service.gov.uk). Also a plain web search for "Mode Fluency" + trademark,
  and for companies or products called "Mode Fluency", "ModeFluency", "Mode-Fluency".
- Terms: "Mode Fluency", "ModeFluency", "Fluency Mode", and the nearest marks in Nice classes 41 (education, training) and 42 (software, consulting);
  note near marks like "AI Fluency" (Anthropic's course name) and anything with "Fluency" in class 41/42 that a lawyer would flag.

## 3. Output
- Write strategy/research/R9_trademark_sanity_2026-10-29.md: a table per register (register · query · result · date · URL or "blocked: <what happened>"),
  a list of near marks with owner, class and status, a plain-English read (clear / caution / conflict) with reasons, and what a lawyer would need
  to confirm. Every row dated. Nothing invented: if a register blocks the fetch, write exactly that; the orchestrator can retry those by hand in a browser.
- Return ≤12 lines: the read, the near marks that matter, and which registers were blocked.

## 4. Constraints
- Read-only except the one output file. Budget: 40 minutes. Model: opus. No helpers. No legal advice beyond "what a lawyer would need".
