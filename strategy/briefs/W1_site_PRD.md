# PRD: Mode Fluency website prototype (static, GitHub Pages-ready)

## 1. What and why
Build a static website prototype for Henrique Jr. Sanchez's "Mode Fluency" practice. It must make a first-time visitor
(a non-technical knowledge worker or SME manager) understand in 60 seconds (a) the thesis ("the calculator problem"),
(b) the four axes and the Stances × Stack matrix, (c) where to learn (AI @ Workplace videos), and (d) how to hire Henrique.
It is a prototype for Henrique to react to and edit, not a final launch. It will be committed to the repo under `site/`
and later served from GitHub Pages, so: NO build step, NO framework, NO package.json. Plain HTML, CSS, vanilla JS.
Must also be viewable by opening `site/index.html` from disk (relative paths only).

## 2. Success metrics (binary)
- [ ] Opening site/index.html from disk in Chromium renders with zero console errors (verify with Playwright at /opt/pw-browsers/chromium).
- [ ] All pages pass at 390px and 1280px width with no horizontal scroll (Playwright screenshots saved to site/_qa/).
- [ ] Every one of the 14 stances, 7 stack components, 4 autonomy modes, 4 ambition types appears with accurate text
      derived from the source files (not invented).
- [ ] The interactive diagnostic returns a stance and a binding layer for every path through its questions.
- [ ] Lighthouse-style basics: semantic landmarks, alt text on every image, visible focus states, prefers-color-scheme support.
- [ ] Total site under 2 MB; no external JS; fonts from Google Fonts only or system stack.
- [ ] No fabricated testimonials, logos, client names, prices beyond the ranges given, or statistics without a source line.

## 3. Pages (multi-page static; shared header/footer copied into each file)
1. `index.html` Home: hero with the thesis; the four axes as four cards; "Start here" paths (Learner / Team lead / Builder);
   the matrix teaser; services teaser; latest essay teaser; footer with repo link and license.
2. `calculator-problem.html` The launch essay. ~900–1200 words written FROM the sources (see §6), in Henrique's first-person
   voice (plain, direct, no buzzwords; see the slides for voice). Must cite: METR 2025 RCT, S&P Global 42%, the calculator
   precedent, aviation mode confusion, Anthropic 4D (as the baseline), Karpathy's agentic engineering, Nate Jones's intent
   engineering. Use research/R4_analogy_evidence.md for citations if it exists at build time; otherwise use the facts in
   STRATEGY_BRIEF.md §2 and mark any missing citation with a visible "[source needed]".
3. `stances.html` The Fourteen Stances: filterable grid (by load-bearing layer; by consumption/construction), each card has
   expectation, why it stays hidden, boundary test (where present), failure mode, cardinal rule. Text from src_archetypes_v3.md.
4. `stack.html` The AI-Human Engineering Stack: the 5 layers + 2 meta-functions as a visual stack (inline SVG, not an image),
   each with the question, scope, and failure signature from the Component Reference Map; the dependency rule; the diagnostic
   loop (evaluate → diagnose → re-enter). Link to the two protocol documents in the repo.
5. `matrix.html` The Mode Fluency Matrix: the full table from MODE_FLUENCY_MATRIX.md rendered as an interactive table
   (click a stance → highlights its layer in a mini stack; click a layer → highlights its stances).
6. `diagnose.html` "Which mode are you in?": 7–9 question branching self-diagnostic (vanilla JS, state in memory, optional
   localStorage wrapped in try/catch). Output: your default stance, its load-bearing layer, the one guardrail to adopt,
   and which AI @ Workplace level to watch next. Include a "copy result as text" button.
7. `learn.html` AI @ Workplace 101→601: cards for 101, 201, 301, 401 with YouTube links (from research/src_repo_readme.md),
   one-line syllabus each (from the slide texts), slides links to the GitHub PDFs; 501 and 601 marked "coming" with the
   described scope (local agents; dark factories). Embed NO iframes (privacy, offline); use thumbnail links
   https://i.ytimg.com/vi/<id>/hqdefault.jpg.
8. `work.html` Work with me: the Mode Fluency Assessment (what it is, deliverables incl. the Article 4 evidence pack, "from
   $3,500", ~2 weeks), AI @ Workplace workshops (half/full day, remote), and a note that skills are released free. Contact =
   a mailto: placeholder `hello@modefluency.com` clearly marked as placeholder in an HTML comment, plus LinkedIn link
   https://www.linkedin.com/in/henriquejsanchez and GitHub link.
9. `about.html` Henrique: full-time professional in another field who built this as a practitioner; the lineage paragraph
   (credit Anthropic 4D, Mollick, Nate B. Jones, Karpathy, the CHI 2026 paper); the "we audited ourselves" note; license.

## 4. Design constraints
- Distinctive, calm, editorial. NOT the generic AI look (no purple-blue gradients, no glowing orbs, no robot imagery).
  Think: a well-set field manual or a pilot's handbook. One accent color. Serif display + humanist sans body, or a
  single strong sans. Define colors as CSS custom properties on :root with a dark theme under prefers-color-scheme.
- Motif: modes/dials/compass (the four axes). One inline SVG "mode compass" on the home page, reused small in the header.
- Mobile first. 16px side gutters at phone width. Max content width ~72ch for prose.
- Typography does the work; minimal decoration. No stock photos. No emoji.
- Accessibility: contrast ≥ 4.5:1, focus rings, skip link, aria on the filter controls and the diagnostic.

## 5. Technical constraints
- Files: site/index.html, site/*.html, site/assets/style.css, site/assets/site.js, site/assets/*.svg, site/README.md
  (how to preview, how to deploy to GitHub Pages from /site using a `.nojekyll` file), site/_qa/ (screenshots + a
  qa-report.md with the console-error check and viewport checks).
- Shared chrome is duplicated per page (no includes). Keep it identical across pages.
- All links relative. External links open in same tab (plain). The repo link: https://github.com/hjasanchez/agentic-engineering
- Tone: Henrique's own, from the slides and the Stack doc: plain, direct, dry humor allowed, no hype words
  ("revolutionary", "unlock", "supercharge" are banned).

## 6. Content sources (read these; do not invent)
- /home/user/meta-strategy/STRATEGY_BRIEF.md (positioning, naming, services, what to credit)
- /home/user/meta-strategy/MODE_FLUENCY_MATRIX.md (matrix text, verbatim allowed)
- /home/user/meta-strategy/research/src_archetypes_v3.md (stances)
- /home/user/meta-strategy/research/AI-Human-Stack-Component-Reference-Map.md (stack components, verbatim allowed)
- /home/user/meta-strategy/research/src_aies_stack.txt (stack narrative, diagnostic loop, fractal property)
- /home/user/meta-strategy/research/src_specifying_work.txt (autonomy modes table, Intent Doc)
- /home/user/meta-strategy/research/src_rieseberg_ambition.md (four ambition types; credit Felix Rieseberg by name + URL)
- /home/user/meta-strategy/research/src_ai101_slides.txt ... src_ai401_slides.txt (syllabus lines, voice)
- /home/user/meta-strategy/research/src_repo_readme.md (video and PDF links)
- /home/user/meta-strategy/research/R4_analogy_evidence.md (citations; may not exist yet, check)
- /home/user/meta-strategy/research/R1_competitive_landscape.md §2 and §5 (who to credit, how to phrase complementarity)

## 7. Non-goals (and why)
- No CMS, no build tooling, no React/Tailwind CDN (must work from disk and on Pages with zero setup).
- No analytics, no cookie banner, no forms that post anywhere (nothing to host yet).
- No pricing beyond "from $3,500" for the assessment and "from $1,200" per workshop (ranges come from benchmarks; the
  decision is Henrique's).
- No testimonials, client logos, or case studies (none exist; fabricating them would be harmful).
- No blog system; the essay is one page.
- Do not modify anything outside /home/user/meta-strategy/site/.
- Do not write a logo wordmark image; text wordmark "Mode Fluency" is fine.

## 8. Uncertainty policy
- If a fact is needed and not in the sources: write "[source needed]" visibly and continue. Never invent.
- If the source texts conflict (e.g., slide vs. Stack doc), prefer the Stack doc for framework text and the slides for voice.
- Tradeoffs: accuracy over polish; fewer pages done well over nine pages half done (but all nine must exist, even if a page
  is short); readability over cleverness; vanilla over clever JS.

## 9. Verification the builder runs itself
- Playwright script (node, using executablePath '/opt/pw-browsers/chromium' or the installed @playwright/test if present;
  do not run `playwright install`) that opens each page from file://, records console errors, takes 390px and 1280px
  screenshots into site/_qa/, and checks document.documentElement.scrollWidth <= viewport width.
- A grep that every stance name (14), every stack component (7), "Assistive", "Directed", "Autonomous", "Continuous",
  "Speed", "Altitude", "Depth", "Range" appears somewhere in the site.
- Write site/_qa/qa-report.md with the results. Return to the orchestrator ≤15 lines: pages built, QA pass/fail per check,
  anything marked [source needed], any deviation from this PRD and why.

## 10. Delegation and budget
- Model: opus. Effort: high. You may NOT spawn helpers.
- Budget: aim for ≤ 2.5 hours wall clock. If running long, finish all nine pages at a simpler level rather than polishing three.
