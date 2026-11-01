# Task: Stack v2, production pass — restructure, verify, and build the PDF — 2026-11-01

## 1. What and why
Henrique read the summary of the v2 draft and gave three instructions: (1) lexical engineering becomes the LAST section of the body, because it
is the most complex and nuanced, with the overview still introducing the substrate once; (2) the document ships as a PDF; (3) the figure is the
new PNG (another agent is drawing it to strategy/drafts/figures/aies-stack-v2.png). Also resolve every item in the draft's "Before publication"
block so the result is publishable, pending his final read. Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs
- strategy/drafts/The-AI-Human-Engineering-Stack-v2-DRAFT.md (the reviewed and fixed draft), strategy/drafts/REVIEW-v2-2026-10-29.md,
  the writer's notes in the scratchpad (W23_NOTES.md), and the PDF text of v1 (pdftotext) for anything you need to check.
- House style: the two protocol documents at the repo root. Web access for verification.

## 3. Do, in this order
1. **Restructure.** Move the lexical section to the end of the body: after the meta-functions and the interaction model / diagnostic loop /
   fractal / boundaries sections, immediately before the Conclusion. Renumber or re-letter as the document's own scheme requires. Fix every
   forward and backward reference ("see the substrate section below/above"). The Overview keeps its one-paragraph definition of the substrate
   and the boundary test, and points forward to the last section. Layer 1 keeps its one sentence of handshake. The diagnostic-loop rule stays
   where it is. Read the whole document once after moving to make sure the argument still flows from Prompt to Coherence to the meta-functions
   and ends on the substrate as a coda, with the Conclusion after it.
2. **Resolve the "Before publication" items.** Version string → "Version 2.0 · November 2026"; move the change log out to
   strategy/drafts/CHANGELOG-v2.md; verify each [to verify] marker by web search (Klarna claim: outlet, date, figure; Nate B. Jones; Google ADK;
   the Martin, Manus and METR post URLs; ASD-STE100 word and rule counts), fix or cut, no marker may remain; the Figure 2 placeholder becomes the
   figure reference; the pointer to the unpublished Field Guide is cut (the instruments are summarised in the section itself).
3. **Figure.** Where the document's figure sits, reference `figures/aies-stack-v2.png` with the figure description as caption. If the PNG does
   not exist yet when you build, leave the reference in place and say so; the orchestrator re-runs the build.
4. **Build.** Write strategy/drafts/build_pdf.py: Markdown → HTML (use the `markdown` package if installed, else a minimal converter) with an
   embedded print stylesheet (A4, 2 cm margins, serif body at 11 pt, monospace for code and tables' system labels, running header with the
   title, page numbers, the PNG scaled to the text width, tables that do not overflow) → PDF via Python Playwright `page.pdf()`. Output
   strategy/drafts/The-AI-Human-Engineering-Stack-v2.pdf and the intermediate .html. Open the PDF text (pdftotext) and check the section order,
   that no "[to verify]" or "DRAFT" remains, and that the page count is sane (v1 was 29 pages).
5. **Rename** the Markdown to strategy/drafts/The-AI-Human-Engineering-Stack-v2.md (keep the -DRAFT file as the pre-production copy).

## 4. Output
- The .md, .html, .pdf, CHANGELOG-v2.md and build_pdf.py in strategy/drafts/. Return ≤12 lines: final section order (one line), word count, page
  count, each [to verify] item's resolution in a few words, whether the figure was embedded.

## 5. Constraints
- Budget: 75 minutes. Model: opus. No helpers. Write only inside strategy/drafts/ (it is git-ignored; nothing is committed). Keep Henrique's
  voice; banned words: revolutionary, unlock, supercharge, game-changing, seamless, empower. No pen name.
