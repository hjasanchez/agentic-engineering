# PRD: the full Mode Fluency website in Direction C ("The Field")

## 1. What and why
Henrique chose Direction C. Build the complete nine-page site in that design system so it can be deployed (GitHub Pages or
Cloudflare Pages, static, no build step). The home page from C is the reference for visual language, motion and voice; the
reviewed content of the earlier prototype (/home/user/meta-strategy/site/) is the reference for copy and structure of the
other eight pages. Wordmark: "Mode Fluency" (final). Hero lede: "We taught everyone to press the buttons. Nobody taught
them which problems the machine is for."

## 2. Inputs (read before writing)
- /home/user/meta-strategy/briefs/00_SHARED_CONTEXT.md (all updates) and /home/user/meta-strategy/briefs/D_design_common.md
  (all technical rules still apply: themes, gutters, motion-at-rest, reduced motion, contrast, budgets, banned words)
- /home/user/meta-strategy/design-directions/C-field/ (index.html, assets/field.css, assets/field.js, _qa/qa-report.md): the design system to extend
- /home/user/meta-strategy/site/*.html and site/assets/site.js: copy, page structure, the diagnostic's question logic
  (all 26,880 answer combinations were verified to return a result; keep the logic, re-skin the UI)
- /home/user/meta-strategy/site/_qa/blind-review.md and qa-report.md "Open questions": things already fixed; do not regress them
- /home/user/meta-strategy/MODE_FLUENCY_MATRIX.md, research/src_archetypes_v3.md, research/AI-Human-Stack-Component-Reference-Map.md,
  research/R4_analogy_evidence.md (essay citations), research/src_repo_readme.md (video links)
- /home/user/meta-strategy/design-directions/DR_design_principles_2026.md §5 (ideas for proving an agent built this)

## 3. Pages (all nine; shared header/footer identical across pages; relative links; every page opens from file://)
1. index.html: the C home page, with the new lede, "Mode Fluency" wordmark, and all nav links now live. Keep all four
   signature moments. Extend the stance selector so all 14 stances have a field behaviour (C built 7; design the other 7:
   Adversary, Librarian, Interpreter, Simulator, Scribe, Translator, Therapist), each short and legible, never gratuitous.
2. calculator-problem.html: the essay (from site/calculator-problem.html, keep its citations incl. the METR 2026 caveat and
   the Papert quote) set as long-form reading in C's two-voice typography (serif human voice, monospace system notes in the
   margin: citations, "system log" asides). Field is NOT behind the text; a thin reactive strip at the top only.
3. stances.html: all 14 stances, each with the field behaviour as a small live canvas in its card (lazy: only the visible
   ones animate), expectation, why it stays hidden, boundary test, failure mode, cardinal rule/guardrail; filters by
   load-bearing layer and consumption/construction (keep the "Not placed" handling and the Hinge tag only on Interpreter).
4. stack.html: the 7 components as a system diagram in C's style (nodes, wires, pulses), with the question, scope and failure
   signature of each; the dependency rule as an animated "binding constraint" demo (toggle a layer weak and watch the ones
   above dim); the diagnostic loop; links to the two protocol documents on GitHub.
5. matrix.html: the full circuit from C at page scale, all 14 wired to 7; hover/focus pulses; a text table fallback for
   reduced motion and screen readers; click a stance → its row's guardrail prints in the system log.
6. diagnose.html: the existing diagnostic logic re-skinned as a "console session": questions typed as system lines, answers
   as command buttons, result as a printed report (stance, layer, guardrail, which AI @ Workplace level next), "copy result"
   button, progress counter, keyboard operable.
7. learn.html: AI @ Workplace 101→601 as an "altitude" sequence (101–401 live with YouTube thumbnail links via
   https://i.ytimg.com/vi/<id>/hqdefault.jpg and slide PDF links; 501, 601 marked coming with their scope). Privacy sentence:
   thumbnails load from YouTube's image host; nothing else loads until you click.
8. work.html: the Mode Fluency Assessment (from $3,500, ~2 weeks, deliverables incl. the Article 4 literacy-measures evidence
   pack), AI @ Workplace workshops (from $1,200), and a clear free/paid split: "Everything on this site and in the repo is free.
   You pay for my time." Contact: the LinkedIn link https://www.linkedin.com/in/henriquejsanchez and the repo; email
   placeholder hello@modefluency.com shown as selectable text and marked in an HTML comment as a placeholder.
9. about.html: Henrique (full-time professional in another field, practitioner), lineage credits (Anthropic 4D, Mollick,
   Nate B. Jones, Karpathy, Felix Rieseberg, the CHI 2026 archetypes paper), the "we audited ourselves" note, and a
   "Built by an agent" section: the build log (real numbers), a deviation report (where this build departed from its spec,
   and why; keep it truthful, it is produced by you at the end), and a one-paragraph note that the site is re-audited with
   the repo's own protocol. License note (repo GPL-3.0; content CC BY-SA 4.0 suggested, mark as "proposed").
Footer on every page: C's build log ticker with real numbers from your final QA (bytes, pages, checks passed, date).

## 4. Success metrics (binary; write results to site-c/_qa/qa-report.md)
- [ ] 9 pages open from file:// in headless Chromium at 390 and 1280, light and dark, reduced-motion on and off: 0 console errors, 0 failed requests, no horizontal scroll
- [ ] Lowest text contrast ≥ 4.5:1 in both themes (programmatic scan of all text nodes on all pages)
- [ ] All 14 stances, 7 components, 4 autonomy modes, 4 ambition types present; stance texts spot-checked word-for-word against src_archetypes_v3.md for 5 stances
- [ ] Diagnostic: all answer combinations return a result (re-run the exhaustive check); 4 paths driven through the UI
- [ ] Every page readable with JavaScript disabled (content present, nothing hidden)
- [ ] Total site ≤ 900 KB excluding fonts; no external JS; fonts only from Google Fonts
- [ ] No banned words; no invented stats, testimonials, logos, prices beyond the two given
- [ ] "calculator" does not appear in the hero of index.html; "machine" does; the essay title is unchanged
- [ ] Wordmark "Mode Fluency" set once in CSS --brand and read by JS

## 5. Non-goals
- No CMS, analytics, cookie banner, forms that post, iframes, service workers.
- No new copy claims; no new statistics without a source line.
- Do not modify /home/user/meta-strategy/site/ or design-directions/; build in /home/user/meta-strategy/site-c/ only.
- Do not build the skill or the README (other agents do).

## 6. Deployment artefacts
- site-c/README.md: how to preview (open index.html), how to deploy on GitHub Pages (folder /docs on main) and on
  Cloudflare Pages (connect repo, build command none, output directory docs), how to set the custom domain (CNAME file for
  GitHub Pages; DNS CNAME for Cloudflare), and the one-line wordmark swap.
- site-c/.nojekyll present.

## 7. Uncertainty policy
Accuracy over polish. If a source fact is missing, write "[source needed]" visibly. If a page runs long, finish all nine at
a simpler level before polishing any. Keep STATUS.md updated and save working files early and often (a previous run was
lost to a worker restart).

## 8. Budget and tier
Model: opus, effort high, no helpers. Up to 3 hours wall clock. Return ≤15 lines: pages built, QA pass/fail per metric,
byte size, deviations from this PRD and why.
