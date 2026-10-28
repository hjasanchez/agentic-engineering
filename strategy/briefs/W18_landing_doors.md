# Task: make the stances and the 101→401 series visible on the home page without weakening it — preview branch, 2026-10-29

## 1. What and why
Henrique's worry: a first-time visitor to modefluency.com may not realise that (a) there is a mapped set of fourteen ways to work with AI
beyond treating it as an oracle, and (b) there is a full beginner-to-advanced video series, AI @ Workplace 101 to 401. He suspects those two
are more original and more established than the Stack, and that the home page under-sells them. He asks how to make them more visible
and whether that would hurt the page's current impact. Build the proposal so he can see it, on a branch, not on main.
Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering. Work on the branch the orchestrator names in the prompt.

## 2. Inputs
- docs/index.html as it is now (hero, the four-axis instrument, the stance selector, the sections §1–§6), docs/assets/field.css and field.js.
- README.md: its "three doors" framing (learn / diagnose / go deeper), which is the content model to reuse.
- strategy/briefs/W3_full_site_direction_C.md (the design system's rules: two-voice typography, motion at rest, reduced motion, budgets, contrast).
- docs/learn.html and docs/stances.html (what the doors lead to).

## 3. The change (one proposal, built, not three described)
- Directly under the hero's lede and buttons, add a compact "three doors" strip: Learn (AI @ Workplace, 101 to 401, with "then 501 and 601"),
  Find your stance (fourteen ways to work with AI; the Oracle is only one of them), Go deeper (the Stack and the Matrix). Each door: a system-voice
  label, one human-voice sentence, a link. Mobile: stacked; desktop: three columns. Text only or one small glyph each; no new images.
- Rewrite nothing else on the page. The hero stays. The existing stance selector stays (it is the live demonstration of the fourteen); if a door
  and a section now say the same thing twice within one screen, shorten the section's intro by a sentence, not the door.
- Keep the page under its byte budget, 0 console errors, no overflow at 390 px, contrast ≥ 4.5:1 both themes, readable with JS off, no animation
  under reduced motion. Banned words: revolutionary, unlock, supercharge, game-changing, seamless, empower. Plain voice.

## 4. Output
- The change committed on the branch (commit message starts "Preview: home page three doors"), pushed. Nothing merged.
- Screenshots at 390 and 1280 px, light and dark, of the hero plus the strip, to C:\Users\henri\Desktop\CCode\modefluency\workspace\previews\landing-doors-*.png.
- A short note C:\Users\henri\Desktop\CCode\modefluency\workspace\previews\landing-doors-NOTE.md: what changed, what it costs the hero (if anything),
  and the honest counter-argument (why Henrique might prefer the page as it is).
- Return ≤12 lines.

## 5. Constraints
- Budget: 60 minutes. Model: opus. No helpers. Do not touch other pages. Do not change the hero copy.
