## Direction A: "The Instrument" (cockpit / flight-deck precision)
Read 00_SHARED_CONTEXT.md and D_design_common.md first.
### Concept
The site is an instrument panel for working with AI. Precision, calm, authority. The core idea "know which mode you're in"
is rendered literally: a live mode indicator, gauges for the four axes, a horizon that tilts when you are in the wrong
stance. Inspiration: primary flight displays, glass cockpits, Swiss instrument typography; NOT sci-fi HUD clichés.
### Direction specifics
- Type: use B612 (Google Fonts; designed for aircraft cockpit displays, a real subject detail) for data/labels and a
  humanist sans or a crisp serif for headlines; tabular numerals everywhere digits align.
- Palette: a deliberate single-theme dark panel is allowed, but avoid "near-black + lone acid green". Think charcoal-blue
  panel, bone-white type, one signal colour used like an instrument warning (amber), with cyan as the "mode selected" hue.
  If single-theme, say so and set all colours explicitly.
- Signature moments (build at least these): (1) hero: a large SVG/Canvas "mode instrument": four axes as concentric arcs;
  scrolling or dragging moves the needle through stances and the headline copy changes to that stance's failure mode;
  (2) "mode confusion" micro-demo: a toggle that shows the same prompt under two stances and animates the different layer
  lighting up; (3) the matrix as a switch panel: flipping a stance toggle lights its layer LED and prints the guardrail on a
  one-line readout with a typewriter effect; (4) scroll-driven altitude ladder for the 101→601 curriculum.
- Micro-interactions: button hover with a 1px indicator slide; focus rings as instrument bezels; section labels as flight
  deck annunciators.
### Output folder: /home/user/meta-strategy/design-directions/A-instrument/
