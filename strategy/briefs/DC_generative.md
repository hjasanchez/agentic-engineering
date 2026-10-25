## Direction C: "The Field" (generative, computational)
Read 00_SHARED_CONTEXT.md and D_design_common.md first.
### Concept
The delegation space made visible. A living field of particles (tokens, agents) in Canvas 2D or WebGL that reacts to the
visitor: the pointer is the human; particles organise into a stance when you choose one; in "Executor" mode they run off on
their own and you see where they go; in "Miner" mode they scatter and you collect. It should feel like watching a system,
not like a screensaver. Inspiration: Sivulka's "you just hired a million employees", flocking/boids, slime-mould
simulations, vector fields; restraint over spectacle.
### Direction specifics
- Tech: Canvas 2D with your own particle system (preferred for weight), or three.js from cdnjs pinned to 0.160.0 if you
  need it. Pause when off-screen; cap particle count on mobile; respect reduced-motion with a static frame of the field.
- Type: monospace for the "system" voice (e.g. JetBrains Mono / IBM Plex Mono) paired with a sober sans or a sharp serif for
  human-voice copy; the two voices are a design idea (machine text vs human text).
- Palette: avoid neon-on-black. Try an ink-on-graphite or deep-green-grey field with warm-white type and a single
  "human" colour for the pointer trail; or a light field with charcoal particles. Both themes or deliberate single theme.
- Signature moments (build at least these): (1) hero field reacting to pointer/touch with the four-axis compass drawn in
  the field itself; (2) a "stance selector": pick a stance and the field reorganises (Oracle: everything converges on one
  bright point; Executor: a stream leaves the frame and a checkpoint line catches it; Miner: scatter + collect; Tutor: a
  path forms); the stance's failure mode and guardrail appear as "system log" lines; (3) the matrix as a circuit: stance
  nodes on the left, layer nodes on the right, a pulse travels along the load-bearing link when you hover; (4) a quiet
  "built by an agent" ticker in the footer that prints the page's own build facts (bytes, no frameworks, checks passed)
  as monospace system lines, with real numbers from your QA.
- Micro-interactions: field reacts to scroll velocity; buttons are "commands" with a blinking caret on focus.
### Output folder: /home/user/meta-strategy/design-directions/C-field/
