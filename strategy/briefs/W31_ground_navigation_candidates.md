# Task: ground the five navigation candidates with evidence and rank them against R11 — 2026-11-01

## 1. What and why
strategy/research/R12_scalable_products_navigation.md (read first, in full) found five product directions that R11's ranking could not see.
Ground each with dated, sourced evidence and rank all of them against R11's twelve on one table with the same arithmetic. Henrique decides.
Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs
- R12 (the candidates and the questions at its end), R11 (the method, the reach assumptions, the appendix arithmetic), R2 (Article 4 and market),
  R6 (one-off offers), strategy/OFFER_BRAINSTORM.md (decisions on file, including the earlier refusal of "certification").
- Web research, every claim dated with URL, UNVERIFIED where you cannot confirm:
  1. **The AI literacy record.** The text of Article 4 and the Commission's AI literacy Q&A (what a "measure" is, whether records are expected,
     what enforcement looks like from August 2026); who already sells "Article 4" or "AI literacy" training with a certificate in the EU
     (providers, prices per person, format, 2025–2026); any guidance that a self-declared record from a small provider counts or does not;
     how the assessment would be graded automatically without an LLM judge being gamed; liability wording a lawyer would want.
  2. **Spec lint.** Existing prompt or spec linters and scorers (open source and commercial), what they check, whether anyone pays; the
     feasibility of a client-side implementation with no server (a Claude skill, a CLI, a static web page).
  3. **The named spec.** Adoption and revenue stories of community specs (Keep a Changelog, Semantic Versioning, Conventional Commits,
     the Agile Manifesto → Scrum.org): what made them spread, how long it took, where money appeared.
  4. **Library membership.** Benchmarks for template/kit libraries and memberships in the professional-development niche (prices, churn, what is
     inside), 2025–2026.
  5. **The book.** Self-publishing economics for a 40–60k-word non-fiction title (KDP, Leanpub, IngramSpark): royalties, typical first-year
     sales for an author with a small audience, time to produce from existing documents; the authority effect, with any evidence rather than lore.

## 3. Output
- strategy/research/R14_navigation_candidates_grounded.md: one section per candidate (evidence, build hours, ongoing cost, price band with
  benchmarks, 12-month revenue low/high with the arithmetic, legal or reputational risk, what it feeds in the ladder); then ONE ranking table of
  all seventeen candidates (R11's twelve + these five) by 12-month revenue ÷ total hours and by strategic value; a recommended first build and a
  recommended sequence of three; the decisions this asks Henrique to revisit (certification refusal; the no-prices rule vs a storefront; the team
  edition) with the evidence for each.
- Append "## Navigation candidates (added 2026-11-01)" to strategy/OFFER_BRAINSTORM.md, ≤20 lines, pointing to R12 and R14.
- Return ≤12 lines: the top three, the first build, the decisions to revisit, the biggest risk.

## 4. Constraints
- Read-only except the two output files. Budget: 75 minutes. Model: opus. No helpers. Banned words apply. No legal advice beyond "what a lawyer
  would need". Nothing invented.
