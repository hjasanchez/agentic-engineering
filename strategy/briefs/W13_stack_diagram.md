# Task: rebuild the Stack page diagram to match the published AI-Human Engineering Stack — 2026-10-29

## 1. What and why
Henrique says the current diagram on docs/stack.html misreads his original: the Harness is drawn as a base layer, when in the
published figure it is an enclosure around everything; the "mark a layer weak to find the binding constraint" controls are
redundant (a layer you mark weak is by definition the constraint); and the stack should read bottom-up, as a pyramid, not as
equal rectangles. Rebuild it. Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. The source of truth (reproduce its structure)
`agenticengineering.jpg` at the repo root (open it; it is an image) and "The AI-Human Engineering Stack.pdf" (figure and layer text).
Structure of the figure:
- Five layers stacked bottom-up as a pyramid, widest at the bottom: Prompt (What to do) → Context (What to know while doing) →
  Intent (What to want while doing) → Judgment (What to doubt while doing) → Coherence (What to become while doing).
- Evaluation Engineering ("How to know while doing") is a vertical bar to the LEFT of the layers, spanning all five, with arrows into
  each layer: "each layer is evaluated in a loop autonomously".
- Harness Engineering ("Where and how to do") is a dashed enclosure around the layers AND the evaluation bar, labelled top-right.
- USER at the bottom-left outside the enclosure: "user begins with the prompt" (arrow into Prompt), "user sets up the harness initially
  and may intervene/adjust as needed" (dashed arrow to the enclosure), "user re-enters each layer if needed depending on evaluation".
- FINAL OUTPUT at the top, fed from Coherence.
- A note on the right: "each layer depends on all layers beneath it".
- Keep the seven component facts the current page shows (question, scope, "fails as") somewhere readable: inside the nodes where they fit,
  or as the existing component map further down the page (that §/map section already exists; do not duplicate content).

## 3. Scope of edits (hard boundary; another agent is editing the rest of the site concurrently)
- You may edit: in docs/stack.html the `<div class="stackdiag" id="stackdiag">…</div>` block and the §2 dependency_rule section's sentences that
  refer to marking layers weak or the interactive demo; in docs/assets/field.css the `.stackdiag`, `.sd-*` rules; in docs/assets/field.js only the
  code that drives the stack diagram (the mark-weak / reset / readout / wires logic). Use targeted edits (the Edit tool), never a whole-file rewrite
  of stack.html. Touch nothing else on any page.
- Remove: the per-layer "state: ok / mark weak" controls, the reset button, the `#sd-readout` live region, and their JS. The dependency rule stays
  as text ("the lowest weak layer is the binding constraint…"), without the "click to find it" framing.
- Keep: the page's two-voice typography and the field aesthetic (monospace system labels, serif human text), the `js-only` conventions, theme
  variables, and the pulse animation only if it respects `prefers-reduced-motion`. A static SVG or CSS layout that is correct with JS off is required;
  JS may add motion only.
- Accessibility: the diagram must have a text equivalent (an ordered list or table, visually hidden or shown under reduced motion) stating the
  five layers bottom-up, the evaluation bar, the harness enclosure and the user/output flow; every visible text ≥ 4.5:1 contrast in both themes;
  no horizontal overflow at 390 px (the pyramid may become narrower bands, still widest at the bottom).
- Shape: widths step down from Prompt to Coherence so the stack reads as a pyramid; at 390 px the step may be subtle but visible.

## 4. Output
- Edits in place; nothing committed. STATUS.md at C:\Users\henri\AppData\Local\Temp\claude\C--Users-henri-Desktop-CCode-modefluency\30d2be6e-ee02-497a-9ebc-a4b5153f79ac\scratchpad\W13_STATUS.md within 15 minutes.
- Screenshots (Python Playwright is installed) of the new diagram at 390 and 1280 px, light and dark, saved to
  C:\Users\henri\Desktop\CCode\modefluency\workspace\previews\stack-diagram-2026-10-29-*.png (create the folder).
- Return ≤15 lines: what the diagram now shows, files/regions changed, the JS removed, console-error check result on stack.html at both widths with JS on and off.

## 5. Acceptance criteria
- [ ] Harness is drawn as an enclosure around the five layers and the evaluation bar, never as a base node
- [ ] Evaluation is a bar beside all five layers with per-layer links
- [ ] Layers read bottom-up as a pyramid; User enters at the bottom, Final Output leaves at the top
- [ ] No mark-weak, reset or readout controls remain; `grep -n "sd-reset\|sd-readout\|Mark a layer weak\|state: ok" docs/stack.html` is empty
- [ ] 0 console errors on stack.html at 390 and 1280 px, JS on and off; no horizontal overflow; diagram text readable with JS off
- [ ] Reduced motion: no animation runs

## 6. Constraints
- Budget: 75 minutes. Model: opus. No helpers. Banned words apply. Do not add the "lexical substrate" (an unpublished companion document); leave
  the markup easy to extend with one more band under the layers later.
