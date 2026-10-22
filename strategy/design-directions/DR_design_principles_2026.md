# Design principles 2026: a solo expert's site that has to impress
*DR brief output. Researched 2026-10-22, 39 searches/fetches. Every claim carries a URL and a date. "UNVERIFIED" marks claims I could not confirm.*

**Bottom line.** The craft bar in 2025–26 is set by sites where **the site itself proves the skill being sold** (Bruno Simon, Anime.js, Oryzo). Award winners score **lowest on accessibility** (6.6–7.6/10), so "award-level motion *and* audit-clean accessibility" is open ground that suits a consultant selling rigour.

---

## 1. Platform techniques: what is safe to use now

| Technique | Status (source, date) | What it enables for our site |
|---|---|---|
| **View Transitions (same-document)** | Baseline Newly available through Interop 2025 ([web.dev, 2026-02-12](https://web.dev/blog/interop-2026)) | Morph a rendered section into the spec that produced it, and morph stance cards into detail views. |
| **Anchor positioning** | Baseline Newly available Jan 2026 (Firefox 147, Chrome 125, Safari 26) ([web.dev, Jan 2026](https://web.dev/blog/web-platform-01-2026); [MDN anchor-name](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor-name)) | Annotations, footnotes and tooltips pinned to parts of the Stack diagram, using CSS only. |
| **Scroll-driven animations** | **Not Baseline.** MDN says "Limited availability" ([MDN animation-timeline, read 2026-10-22](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)). It is an Interop 2026 focus area ([web.dev, 2026-02-12](https://web.dev/blog/interop-2026)) | Scroll-linked reveals of each layer, used **as progressive enhancement only**: the page must be complete without them. |
| **Container queries** | Size queries are widely supported ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries), modified 2026-07-08; I did not capture the Baseline badge date, so the date is UNVERIFIED). | One card or diagram component that re-lays itself out wherever it sits (hero, grid, sidebar). |
| **@property** | Baseline 2024, Newly available since July 2024 ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)) | Typed custom properties that can be animated, such as a "layer health" gauge, without JS. |
| **oklch / color-mix** | oklch is Widely available, since May 2023 ([MDN oklch](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)). Status of color-mix is UNVERIFIED this session ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)) | One perceptually even palette (one hue per stance or layer) derived from a few tokens, with clean light and dark themes. |
| **Variable fonts** | Long-standing support; date UNVERIFIED this session ([MDN guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide)) | Type that responds (weight or width tied to state) from one file. |
| **text-wrap** | `text-wrap` Baseline 2024 (March). The `pretty` value has "varying levels of support" ([MDN text-wrap-style](https://developer.mozilla.org/docs/Web/CSS/text-wrap-style)) | `balance` on headings and `pretty` on body text give an editorial finish at no cost. |
| **WebGPU** | Shipping in Chrome, Safari (all platforms, 2025-09) and Firefox (Windows 2025-07, Apple Silicon 2025-11). Linux and Android are in progress ([Khronos, 2026](https://www.khronos.org/developers/linkto/webgl-and-webgpu-sigg26)). | Not needed: use WebGL2/Three.js if any 3D. |

**Principle:** build the base layer on Baseline features (view transitions, anchor positioning, @property, oklch, text-wrap), and treat scroll timelines and WebGPU as enhancements.

---

## 2. Reference sites (Apr 2025 – Oct 2026)
Scores are from each site's Awwwards page. "Steal" means structure, not visuals.

1. **Lando Norris**, by OFF+BRAND: [landonorris.com](https://landonorris.com/). Site of the Year 2025 ([Awwwards SOTY](https://www.awwwards.com/websites/sites_of_the_year/)) and Site of the Day 2025-11-17, animations 8.6 and accessibility 7.0 ([Awwwards](https://www.awwwards.com/sites/lando-norris)). *Good:* a site for one person, built on two colours (#D2FF00 on #111112), WebGL and gestures. *Steal:* a personal brand with a single signature colour, so the motion carries the identity instead of decoration.
2. **Messenger**, by abeto: [messenger.abeto.co](https://messenger.abeto.co). Site of the Year 2025 and Site of the Day 2025-11-10, animations 9.0, **performance (WPO) 8.8** ([Awwwards](https://www.awwwards.com/sites/messenger)). *Good:* a small explorable world. *Steal:* proof that a rich 3D site can also score high on performance, and the idea of a "place" that visitors move through rather than a page they scroll.
3. **Bruno Simon portfolio**: [bruno-simon.com](https://bruno-simon.com). Site of the Month Jan 2026 and Site of the Day 2026-01-21, accessibility **6.6** ([Awwwards](https://www.awwwards.com/sites/brunos-portfolio)). *Good:* a solo expert whose site *is* the portfolio piece. *Steal:* the "the site is the demonstration" stance. *Avoid:* the low accessibility; give visitors a plain path as well.
4. **Oryzo AI**, by Lusion: [oryzo.ai](https://oryzo.ai). Site of the Month Apr 2026 and Site of the Day 2026-04-13 ([Awwwards](https://www.awwwards.com/sites/oryzo-ai)). A deadpan "AI product launch" for a cork coaster ([Lusion BTS](https://blog.lusion.co/oryzo-bts-part-1-7-concept-and-creative-direction)). *Steal:* wit aimed at AI-launch clichés, which signals that you are above them, plus its **3D → 2D → 3D transition**, a structural device for moving between levels of abstraction (layer ↔ whole Stack).
5. **The Renaissance Edition**, by Shopify Design: [shopify.com/editions/winter2026](https://www.shopify.com/editions/winter2026). Site of the Day 2026-02-09, animations **9.4** ([Awwwards](https://www.awwwards.com/sites/the-renaissance-edition)). *Good:* more than 150 product updates turned into one art-directed experience, with a custom 404. *Steal:* how to make a **large catalogue** (curriculum 101–601, 14 stances) browsable under one strong concept.
6. **Why Zero**, for Zero University: [why.zero.university](https://why.zero.university/). Site of the Month Sep 2026 and Site of the Day 2026-09-07 ([Awwwards](https://www.awwwards.com/sites/why-zero)). An *AI-native education* offer: narrative scroll, a "hold to proceed" interaction, and a waitlist that rewards each visitor with a personalised origami animal. *Steal:* a reward unique to each visitor at the conversion point. *Avoid:* its accessibility score of 6.6.
7. **Terminal Industries**, by REJOUICE: [terminal-industries.com](https://terminal-industries.com). Site of the Month Sep 2025 and Site of the Day 2025-09-03, animations 8.8, WPO 8.2 ([Awwwards](https://www.awwwards.com/sites/terminal-industries)). *Good:* a B2B subject with no glamour (shipping yards) made gripping through scroll storytelling. *Steal:* storytelling discipline for an enterprise buyer.
8. **Anime.js**, by Julian Garnier: [animejs.com](https://animejs.com). Site of the Month May 2025 and Site of the Day 2025-05-06, animations 9.0 ([Awwwards](https://www.awwwards.com/sites/anime-js)). *Good:* the homepage is made of live specimens of the library, for example a scroll scrubber. *Steal:* **"the docs are the demo"**: every claim is a working, interactive specimen.
9. **Anthropic / Claude** (an AI company that does not look generic). Third-party analyses describe warm paper-white backgrounds, a serif display face and warm neutrals with "no cool blue-grays", reading like "a magazine essay" rather than a startup ([webdesignhot](https://www.webdesignhot.com/design.md/claude-ai/), undated, so the date is UNVERIFIED). *Steal:* a literary, editorial register as the differentiator within the AI category.
10. *(Outside the 18-month window, included for structure)* **Bartosz Ciechanowski**: [ciechanow.ski](https://ciechanow.ski/archives/), latest essay "Moon", 2024-12-17. *Steal:* explanations in which every figure can be manipulated. The model for teaching the dependency rule.

**Pattern across 1–8:** animation sub-scores run 8.4–9.4, while accessibility runs 6.6–7.6 and is usually the lowest developer sub-score (from the Awwwards pages above).

---

## 3. Why "AI company" sites look generic, and the opposite moves

**The tells:**
- Purple or indigo gradients on white, Inter or Roboto, a centred hero with a call to action, three icon boxes, rounded corners with soft shadows, and "subtle fades" as the only motion ([prg.sh, 2025-10-26](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)).
- Dark backgrounds, blue-violet glows, **luminous orbs**, floating dashboards, nodes and particles, glassy surfaces ("beigeification") ([StartupBusiness, 2026-06-18](https://www.startupbusiness.it/en/why-ai-standardises-the-visual-identity-of-start-ups-and-how-to-avoid-it/177662/)).

**Why it happens:**
- Tailwind's indigo-500 default (secondary account, UNVERIFIED; [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)).
- LLMs spread design trends within a week, a claim credited to a YC designer and known only from a podcast summary, so UNVERIFIED ([StationLM](https://stationlm.com/analysis/a7f747d3-9216-4c92-8bf9-aaa3c5c1feae)).

**Three examples:**
1. **Landing pages in default Tailwind UI / shadcn styling.** These are the named source of the indigo look and of predictable components ([prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)).
2. **The circular-gradient logo cohort**: OpenAI, Claude and others share a round gradient mark with a central opening. DeepSeek and Midjourney are exceptions ([VelvetShark, 2025-04-10](https://velvetshark.com/ai-company-logos-that-look-like-buttholes)).
3. **The "dark hero + glow orb + floating dashboard"** template described by [StartupBusiness](https://www.startupbusiness.it/en/why-ai-standardises-the-visual-identity-of-start-ups-and-how-to-avoid-it/177662/). It is a pattern, not one named firm, so I am not naming individual companies.

**Opposite moves:**
- Warm paper or ink backgrounds instead of dark glow.
- A serif or characterful variable face instead of Inter.
- One signature colour instead of gradients.
- **Diagrams of real mechanisms** (the Stack, failure patterns) instead of abstract orbs and particles.
- Live specimens instead of mock dashboards.
- Wit about AI tropes (Oryzo) instead of awe.
- The "competitor test": if a rival could use your site unchanged, repositioning is the fix, not visual tweaks ([StartupBusiness](https://www.startupbusiness.it/en/why-ai-standardises-the-visual-identity-of-start-ups-and-how-to-avoid-it/177662/)).

---

## 4. Accessibility and performance norms for a motion-heavy site
- **Core Web Vitals** at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 ([web.dev, updated 2024-10-31](https://web.dev/articles/vitals)). The hero's LCP element should be real HTML text, not a WebGL canvas (my recommendation).
- **Animate only `transform` and `opacity`.** Other properties trigger layout or paint on the main thread ([web.dev animations guide](https://web.dev/articles/animations-guide); [compositor explainer](https://web.dev/articles/animations-and-performance)).
- **Reduced motion.**
  - WCAG 2.3.3 (AAA): motion triggered by interaction must be possible to disable unless it is essential.
  - Use `prefers-reduced-motion` in CSS (technique C39) and in JS (SCR40), and offer a site-level toggle.
  - Colour and opacity changes do not count as motion.
  - Motion the page starts by itself falls under 2.2.2 Pause, Stop, Hide.
  - Source: [W3C Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), WCAG 2.2.
  - Make the reduced-motion version a first-class layout, not a broken one.
- **Scrolljacking** caused disorientation, and was worst on mobile and when combined with text people had to read. If used: keep it short, never change scroll direction, keep important text out of it, place it below the fold, give mobile a separate treatment, and keep sticky navigation available as an escape ([NN/g, 2023-08-06](https://www.nngroup.com/articles/scrolljacking-101/)).
- **GPU budget** (community rules of thumb, not official numbers, so UNVERIFIED):
  - Fewer than 100 draw calls ideally, 500 at most.
  - Cap device pixel ratio at about 1.5 on mobile and 2 elsewhere.
  - About 5 ms of rendering per 16.7 ms frame.
  - Sources: [MetaDesign](https://metadesignsolutions.com/blog/threejs-performance-optimization-best-practices); [three.js forum](https://discourse.threejs.org/t/restricting-viewport-size-for-mobile/7270).

---

## 5. Five ways to show "an agent built this" without being tacky
1. **Spec ↔ page toggle.** Every section has a "show the spec" control. A same-document View Transition morphs the rendered section into the Intent Doc or Minimal Viable Spec that produced it, then back. It shows the *method* (Specifying Work), not just the output.
2. **A living colophon / build ledger.** A dated, public log on the site and in the GitHub repo: the agent sessions, the number of iterations, which evals failed and what fixed them. This is Sivulka's "evals are the new OKRs", made visible.
3. **A public quality bar.** A footer stamp with the latest Lighthouse score, field Core Web Vitals, zero axe violations, and parity between the reduced-motion and full versions, each dated. It turns the award sites' weak spot (accessibility 6.6–7.6) into the brand claim: *award-level motion that passes the audit.*
4. **The Stack as an instrument.** One explorable diagram in the Ciechanowski / Oryzo 3D↔2D manner. Pick a failure pattern, and the binding layer lights up while annotations anchor to it (anchor positioning) and a layer-health gauge moves (@property). The reduced-motion version is the same content as a static table.
5. **A stance switcher.** One paragraph rendered through each of the 14 stances. The variants are generated ahead of time, not live, so there is no latency, cost or hallucination risk.

**What to avoid:**
- A chatbot bubble on the home page.
- A "typing" hero effect.
- Sparkle icons and "✨ AI-generated" badges.
- Orbs, and dark glow over a dashboard.

The proof should be the craft and the receipts, not a label.
