# Handoff — overnight session 2026-10-21

## Read first (updated 2026-10-22 evening)
- Full site in Direction C (nine pages): https://claude.ai/artifact/E6M4mYgTGMg4MAP3Bf9oaC
- Design directions compared: https://claude.ai/artifact/J8Zapq3J1taJJ9hx7iqsxo (A: 5Lr9jYVvjtPeToUwutnze3, B: 1tU4Zq9n6PfGbV82pZW3EG, C: MRTdQ589uCkGsNwZuACURx)
- Naming round 2: https://claude.ai/artifact/FFh29UPzHQCKJAh93kW2bW (decision: keep "Mode Fluency")
- Answers, proposed README, offer plan: https://claude.ai/artifact/8GfCvf7a8Kxq1VvVsGxT7W
- The diagnostic skill: skills/mode-fluency-diagnostic/ on the branch

## Read first (original)
- Strategy brief (phone-friendly): https://claude.ai/artifact/P5ZSRJPmn2mFpJaF2gMFVS
- Website prototype (tap through all nine pages): https://claude.ai/artifact/DN8xJuzxUstVykxiJU13W5
- Same content as files: /home/user/meta-strategy/STRATEGY_BRIEF.md and /home/user/meta-strategy/site/

## Where the work lives
- Local git branch `meta-strategy` in /home/user/hjasanchez/agentic-engineering, two commits on top of main:
  1. strategy/ (brief, research R1–R5, agent briefs) + MODE_FLUENCY_MATRIX.md at root
  2. docs/ (the website, GitHub Pages-ready: Settings → Pages → deploy from branch, folder /docs)
- The push was refused: this session has no GitHub credential for the repo. Fix: https://claude.ai/connect-github
  (install the Claude GitHub App on hjasanchez/agentic-engineering), then retry `git push -u origin meta-strategy`
  from a session with the repo attached. Fallbacks in /home/user/meta-strategy/deliverables/: `meta-strategy.bundle`
  (git bundle of the branch) and `patches/` (git format-patch files).

## Decisions waiting on Henrique (STRATEGY_BRIEF.md §5 and docs/_qa/qa-report.md "Open questions")
1. Umbrella name: Mode Fluency (recommended) or another from research/R3.
2. Retitle "AIES" → "The AI-Human Engineering Stack" and "Archetypes" → "The Fourteen Stances".
3. Assessment price ($2,500 / $3,500 / $6,000) and workshop price (from $1,200).
4. Separate the AI content from the PonicLabs YouTube channel.
5. The Hayen Mill byline line going forward.
6. Skills license (repo is GPL-3.0; brief suggests MIT for the skill pack).
7. Replace the placeholder email hello@modefluency.com on work.html.

## Corrections to existing documents (from research/R4)
- Stop citing METR's 19% as the current state (METR's Feb 2026 update no longer shows a slowdown).
- S&P Global 42% figure is dated 14 March 2025, not "late 2025".
