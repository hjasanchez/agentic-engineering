# Task: check the Stack page's claims against the published document — 2026-10-29

## 1. What and why
Henrique asked whether the Stack page's "Where the regress stops" paragraph is faithful to his document, and whether the page
misstates the document anywhere else. Answer from the primary source. Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs
- "The AI-Human Engineering Stack.pdf" at the repo root (read it in full; use the Read tool with page ranges). The passage he quotes begins
  "An astute reader might wonder why we only specified 5 hierarchical layers, and not for example 15…".
- AI-Human-Stack-Component-Reference-Map.md and AI-Human-Stack-Agent-Audit-Protocol.md (same repo root).
- docs/stack.html: the paragraph under `<h3>Where the regress stops</h3>` (~line 258) and every other descriptive sentence on the page about the
  seven components (prompt, context, intent, judgment, coherence, evaluation, harness), the dependency rule, the diagnostic loop and the fractal property.
  Ignore the `<div class="stackdiag">` block and the §2 dependency_rule section: they are being rebuilt by another agent.

## 3. Questions to answer, with page citations from the PDF
1. The page says: "If judgment monitors intent, what monitors judgment? The regress is terminated by human governance. At some point in every
   system there must be a human, or a human institution, that says: 'This is what we value…' That foundation cannot be automated without circularity."
   Henrique's understanding: the regress is terminated at coherence engineering, the top layer, for the reasons the document gives about diminishing
   returns of abstraction. Is that right? Per the document, what sits above judgment, what sits above coherence, and where exactly does the document
   place "governance": inside the stack as coherence, or outside engineering altogether (politics, ethics, philosophy)? Quote the PDF.
2. Does the page's sentence need to change? If yes, give a replacement paragraph in Henrique's plain voice that matches the document precisely.
3. Does the PDF, the Reference Map or the Audit Protocol mention a "lexical substrate" or "lexical engineering" anywhere? (Henrique has an unpublished
   companion document on it; the site should not mention it unless the published documents do.)
4. Walk every other component description on stack.html (questions, scopes, failure signatures, the dependency rule as stated in prose, the diagnostic
   loop, the fractal property) against the PDF and the Reference Map. List each discrepancy with the page's words, the document's words and a page number.

## 4. Output
- Write strategy/research/R7_stack_page_vs_document.md: answers 1–4 with quotes and PDF page numbers; a "proposed edits" section with exact before/after
  strings for stack.html; and a one-paragraph plain-English answer for Henrique on question 1.
- Return ≤15 lines: the answer to question 1 in two sentences, the count of discrepancies found, and whether the regress paragraph needs a change.

## 5. Constraints
- Read-only except the one output file. Budget: 40 minutes. Model: opus. No helpers. Quote, do not paraphrase, when the wording matters.
