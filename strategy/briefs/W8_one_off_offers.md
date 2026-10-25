# Task: expand the one-off product ideas with dated, sourced price benchmarks — 2026-10-25

## 1. What and why
Henrique asked for products that are bought once and done, fitting a 5–10 h/week side practice delivered in evenings across
time zones. The orchestrator drafted eight ideas (below). Turn them into a decision-ready section with benchmarks.
Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering

## 2. Inputs
- strategy/OFFER_BRAINSTORM.md (the existing ladder and the "Things I would not do" list; do not contradict it without saying so)
- strategy/research/R2_market_and_monetization.md (benchmark table format, sources already found; reuse where still valid)
- strategy/STRATEGY_BRIEF.md §3 (positioning, constraints: day job, scarcity pricing)
- README.md and MODE_FLUENCY_MATRIX.md (what artefacts exist to reuse)

## 3. The eight ideas (expand, merge or reject each; add up to four of your own)
1. Workflow teardown: client sends one recurring workflow in writing; receives a delegation spec (stance, binding layer, three checks).
2. Written stance-profile debrief: run the free diagnostic, send output, receive a written read plus one 45-minute call.
3. Team read without software: 5–10 people run the diagnostic privately; Henrique writes the team profile and binding constraint by hand.
4. EU AI Act Article 4 evidence pack: fixed-scope review of existing literacy measures, written in the format the record needs, gaps listed.
5. Second opinion on an AI rollout plan or vendor pitch (the Adversary stance as a service): written critique.
6. Custom skill build: one Claude skill for one workflow, with tests and README, handed over.
7. One talk: 45-minute session on The Calculator Problem for a company all-hands, slides left behind.
8. Onboarding module: short written and video module for new hires, licensed once.

## 4. Output
- `strategy/research/R6_one_off_offers.md`: for each idea: what the customer gets, hours to deliver, async share (%), which
  existing artefact it reuses, which rung of the ladder it feeds, and a price band with 2–3 benchmarks. Every benchmark row:
  provider, offer, price, date accessed, URL. Mark anything unverifiable UNVERIFIED. End with a ranked shortlist (value ÷ effort)
  and three things you would not do.
- Append a section "## One-off products (added 2026-10-25)" to `strategy/OFFER_BRAINSTORM.md` summarising the shortlist in
  ≤25 lines and pointing to R6.
- Return ≤15 lines: the shortlist with price bands and the single strongest first product.

## 5. Acceptance criteria
- [ ] Every price in R6 has a dated, URL-cited benchmark or is marked UNVERIFIED
- [ ] No price appears anywhere in docs/ (you do not touch docs/)
- [ ] Banned words absent: revolutionary, unlock, supercharge, game-changing, seamless, empower
- [ ] Nothing contradicts the existing ladder (free videos → free diagnostic → course → workshop from $1,200 → assessment from $3,500 → sprint → retainer) without an explicit note

## 6. Constraints
- Web research allowed (WebSearch/WebFetch). Budget: 60 minutes. No helpers. Model: opus. Plain voice, no hype, no invented numbers.
- Non-goals: no site changes, no pricing on the site, no redesign of the ladder.
