# Common brief for the three design-direction builders (read with 00_SHARED_CONTEXT.md)

## What you are building
ONE home page (index.html) for the practice described in STRATEGY_BRIEF.md, as a distinct visual direction. It must itself
demonstrate what an AI agent can build: motion, interaction and finish that a visitor has not seen on a consultant's site.
This is a concept page for Henrique to choose between; the other eight pages come later. Do not build them. Links to them
may point to "#" with a title attribute "coming in the full build".

## Content (reuse, do not invent)
- Copy and structure: /home/user/meta-strategy/site/index.html is the content baseline (hero thesis, four axes, three paths,
  matrix excerpt, services, essay teaser, footer). Keep every claim; you may cut length, reorder, and rewrite for rhythm.
- The four axes and the matrix: /home/user/meta-strategy/MODE_FLUENCY_MATRIX.md and STRATEGY_BRIEF.md §0.
- Stances text: /home/user/meta-strategy/research/src_archetypes_v3.md. Stack: research/AI-Human-Stack-Component-Reference-Map.md.
- The brand NAME IS UNDECIDED. Use the wordmark "Mode Fluency" as a placeholder, defined ONCE (a JS constant AND a CSS
  --brand custom property used by the header, title and footer) so it can be swapped in one edit. Say so in a comment.
- Prices only as "from $3,500" (assessment) and "from $1,200" (workshop). No testimonials, logos, client names, fake stats.
- Banned words: revolutionary, unlock, supercharge, game-changing, seamless, cutting-edge, empower.

## Technical constraints
- Output folder: the one your brief names. Everything self-contained there: index.html, assets/ (css, js, svg). Nothing
  outside that folder is touched. Relative paths only; must open from disk via file://.
- Plain HTML/CSS/JS. External scripts ONLY from https://cdnjs.cloudflare.com/ajax/libs/..., pinned to an exact version
  (e.g. gsap/3.12.5/gsap.min.js and ScrollTrigger.min.js, three.js/0.160.0/three.min.js). Use a library only if it does real
  work; prefer native CSS scroll-driven animations (animation-timeline: view()/scroll()), View Transitions where sensible,
  @property-animated custom properties, variable fonts, IntersectionObserver, Canvas/WebGL for generative visuals.
- Fonts from Google Fonts only (link tag) with real fallback stacks. Variable fonts encouraged.
- Both themes via tokens on :root, @media (prefers-color-scheme: dark) guarded with :root:not([data-theme="light"]), and
  :root[data-theme="dark"]; body sets an explicit background token. A direction may commit to a single theme deliberately
  (say so in a comment) but must then set every colour explicitly.
- Phone-first: 390px with 16px gutters (padding-left/right: max(16px, env(safe-area-inset-left/right, 0px))), no horizontal
  scroll ever, 1280px desktop. Touch-friendly targets.
- Motion rules: the page is COMPLETE AT REST. Nothing readable is left at opacity 0 waiting for a scroll; entrance motion
  starts from a visible state or completes within ~1.5 s without scrolling, and if JS fails every word is still visible.
  Full prefers-reduced-motion support (motion off, state still correct). 60 fps on a mid-range laptop: transform/opacity
  only for continuous animation, no layout thrash, requestAnimationFrame throttled, WebGL paused when off-screen or hidden.
- Accessibility: landmarks, skip link, alt text, focus-visible rings, 4.5:1 contrast on all text in both themes (check it
  programmatically), keyboard-operable interactions, aria on controls.
- Performance budget: ≤ 600 KB total excluding fonts; first paint fast; no blocking scripts in head (defer).
- Do NOT produce the AI-default looks: cream + serif + terracotta; near-black + one acid-green; purple-blue gradient hero;
  Inter/Space Grotesk; emoji markers; everything centered; rounded cards with accent rails everywhere; glowing orbs; robots.

## Required signature moments (at least 3, chosen from your direction's brief) and these two for everyone
1. The "four axes" must be an interactive instrument, not a static graphic: it responds to pointer/scroll/touch and shows
   which mode is selected.
2. The matrix excerpt must assemble or reveal in a way that teaches the stance→layer link (e.g. a stance lights its layer).

## QA you run yourself (write results to <your folder>/_qa/qa-report.md; screenshots to /home/user/meta-strategy/design-qa-screenshots/<dir letter>/)
- Playwright with Chromium at /opt/pw-browsers/chromium (an install exists under /tmp/claude-0/-home-user/a796e04e-6d69-549d-a3e4-d8074fbd356d/scratchpad/; never run `playwright install`):
  open from file://, 390 and 1280, light and dark, reduced-motion on and off; record console errors and failed requests;
  check scrollWidth ≤ viewport; screenshot at top, mid and bottom; a 1280 screenshot after interacting with the instrument.
- Contrast check of all text nodes in both themes. Report the lowest ratio.
- Grep for banned words.
- Report the total byte size.
## Return ≤12 lines: concept in two sentences, the signature moments built, QA pass/fail per check, byte size, anything cut.
## Budget: 2 hours wall clock. Model: opus, effort high. No helpers.

## Addendum (2026-10-22 19:10 UTC): write to disk early and often
A previous run of these builds was lost when the session's worker restarted before any file was saved. Therefore:
write a first complete, working index.html to your output folder within your first 15 minutes, then improve it in place and
save after every major step. Keep a one-line <folder>/STATUS.md you update at each milestone (e.g. "hero done; matrix next").
Partial work on disk is worth more than perfect work in memory.
