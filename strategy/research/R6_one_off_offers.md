# R6: One-off offers, expanded and benchmarked

Research date: 2026-10-25. Brief: `strategy/briefs/W8_one_off_offers.md`. Inputs: `OFFER_BRAINSTORM.md`, `R2_market_and_monetization.md`,
`STRATEGY_BRIEF.md` §3, `README.md`, `MODE_FLUENCY_MATRIX.md`.

**How to read this.**
- "Accessed" is the date I read the live page. Rows marked *snippet only* come from a search-result summary; I could not open
  the page, so they are **UNVERIFIED**.
- Prices are quoted in the provider's own currency. I did not convert them.
- Most benchmark pages are vendors selling the thing they price. Treat each one as a single data point, not as a market average.
- Hours and async share are my planning estimates for Henrique. They are not measurements.
- These price bands are internal. Nothing here goes on the site; public copy keeps "from $1,200" and "from $3,500" only.

**The constraint every offer is judged against:** 5–10 h/week, evenings, buyers in other time zones, a day job, and scarcity
pricing (STRATEGY_BRIEF §3.7). An offer scores well when the client can buy it without a meeting, the work happens whenever
Henrique has an evening free, and the result points at the next rung.

**Verdicts on the eight ideas.** Five kept, two merged, one rejected, and two of my own added:

| # | Offer | Verdict |
|---|---|---|
| A | Workflow teardown (idea 1) | **Keep.** Adds a smaller "Redline" tier (my idea 10). |
| B | Stance-profile debrief (idea 2) | **Keep, capped.** |
| C | Team read without software (idea 3) | **Keep.** |
| D | Article 4 evidence pack (idea 4) | **Keep, narrowed.** |
| E | Second opinion (idea 5) | **Keep.** |
| F | One-workflow build (idea 6) | **Merge.** Widened from "Claude skill" to any tool, and sold only after a teardown. |
| G | The Calculator Problem talk (idea 7) | **Keep.** |
| H | Onboarding module licence (idea 8) | **Reject for now.** |
| I | Ten checks (my idea 9) | **New.** |

---

## A. Workflow teardown (with a smaller "Redline" tier)

**What the customer gets.** The client describes one recurring workflow in writing on an intake form: trigger, steps, tool,
what goes wrong, and an example input and output. They do not need to book a meeting. Within 5 working days they receive:
1. A written delegation spec of 3–5 pages:
   - the stance the person is actually in;
   - the load-bearing layer for that stance (from the Matrix);
   - the binding layer, meaning the one that is failing now;
   - an Intent Doc or Minimal Viable Spec, rewritten for this workflow;
   - three checks, saying what to verify, when, and by whom.
2. A walkthrough video of up to 15 minutes.

*Redline tier:* the client sends one prompt, custom-GPT instruction set or CLAUDE.md file. They get it back marked up against
the Specifying guide, with a short note on which stance the file assumes.

**Hours.** Teardown 4–6 h. Redline 1.5–2 h.

**Async share.** About 95%. An optional 30-minute call is the only live part.

**Reuses.** The Mode Fluency Matrix, *The Complete Guide to Specifying Work for AI* (Intent Doc and MVS templates), the Agent
Audit Protocol, and the free Diagnostic (the client can run it first and attach the output).

**Feeds which rung.** The Sprint is the same work done for real: harness built, evaluated, team taught. The teardown also feeds
the workshop, because the spec becomes workshop material. Credit the fee in full against a Sprint or assessment booked within
30 days. This is a common pattern; see benchmarks A3 and E1.

**Price band.** Teardown **$500–750**: launch at $500 and raise it after five are delivered. Redline **$150–250**.

| # | Provider | Offer | Price | Accessed | URL |
|---|---|---|---|---|---|
| A1 | Contra seller (no name shown) | "Know what to automate before you build": an AI workflow audit of **one** workflow, 4 business days. Delivers a decision brief, workflow map, risk register, pilot acceptance criteria and a 30/60/90 plan; 20-minute recording or 30-minute call | **from $395** | 2026-10-25 | https://contra.com/s/EccZBLlb-know-what-to-automate-before-you-build-ai-workflow-audit |
| A2 | Main & Machine | AI Readiness Audit across several workflows, 2–4 weeks, fixed in writing; implementation is separate | **$3,500–8,500** | 2026-10-25 (page © 2026, undated) | https://www.mainandmachine.com/services/ai-readiness-audit/ |
| A3 | Min Maung (Contra) | Format comparator: written teardown with severity-ranked findings, a walkthrough video and a 30-minute debrief. Website audit $300 (3 days); onboarding teardown $700 (5–7 days). Fee credited to a larger engagement within 14 days | **$300 / $700** | 2026-10-25 | https://contra.com/s/qrPRgXWF-landing-page-audit-or-onboarding-teardown |
| A4 | Contra seller | One-workflow AI audit with a 30-day roadmap, 3 days | **$150**, *snippet only, UNVERIFIED* | 2026-10-25 | https://contra.com/s/XgBvUXrq-ai-workflow-audit-30-day-automation-roadmap |
| A5 | "Dont Die" page audits | 48-hour single-page teardown (comparator for the Redline tier) | **$97**, *snippet only, UNVERIFIED* | 2026-10-25 | https://paste.rs/32bhb |

**Read.** At $500–750, a single-workflow teardown sits between the $395 workflow audit (A1) and the $700 teardown format (A3),
and well below multi-workflow audits (A2). A Redline at $150–250 sits above the commodity ~$100 page audit (A5). That is
reasonable for a named method, but the evidence for this tier is thin.

---

## B. Stance-profile debrief (individual)

**What the customer gets.** The client runs the free Diagnostic and sends its output. They receive:
- a one-page written read: which stance they default to, which layer is binding, and the one guardrail to adopt this month;
- one 45-minute call.

An async variant replaces the call with a 10-minute recorded walkthrough.

**Hours.** 2–2.5 h per client: read 30 minutes, write 45, call 45, plus admin.

**Async share.** About 60%, or about 95% for the async variant.

**Reuses.** The Diagnostic skill and its report format, the Matrix, and the Fourteen Stances.

**Feeds which rung.** Indirectly the workshop and assessment, through the person's employer. Its main value is case material.
This is the paid version of the "free 45-minute clinics" in the 90-day plan (STRATEGY_BRIEF §3.5, weeks 7–8).

**Price band.** **$150–250**, capped at 4 per month. It has the lowest $/hour of the kept offers, so use it for learning and
for the record of delivered work, not for income.

| # | Provider | Offer | Price | Accessed | URL |
|---|---|---|---|---|---|
| B1 | Intro.co, Karo Zieminski (AI product manager; AI-assisted coding, context engineering) | One expert video session | **$120 per session** | 2026-10-25 | https://intro.co/KaroZieminski |
| B2 | ConsultClarity (price comparison by a certified Working Genius facilitator) | MBTI: about $50 online, **$100+** with a practitioner-delivered debrief. CliftonStrengths 34 assessment $59.99 | **$100+** debrief | 2026-10-25 (page "last updated June 2026") | https://www.consultclarity.org/post/working-genius-vs-other-assessments-full-price-comparison |
| B3 | Independent sellers (Teachable / Gumroad) | 45-minute 1:1 AI coaching, $60; 30-minute "Starter Session" with written summary, $29 | **$29–60**, *snippet only, UNVERIFIED* | 2026-10-25 | https://choice-education.teachable.com/p/ai-for-educators-enhancing-lesson-planning-and-pedagogy ; https://wellwhile.gumroad.com/l/starter-session |

**Read.** Individual sessions on these platforms cluster at $29–120. A written read plus a call supports $150–250 only because
of the written artefact and the method. Expect price resistance from individuals paying out of pocket.

---

## C. Team read without software

**What the customer gets.** Five to ten people each run the free Diagnostic privately and send their outputs to Henrique, not
to their manager. The team receives:
- a 4–6 page team profile: the stance mix, the shared binding layer, the one constraint the team cannot fix individually, and
  three team guardrails;
- one 45-minute readout.

Individual outputs are never shown to the manager. That needs a one-line consent note on the intake form.

**Hours.** 8–10 h for 10 people: about 20 minutes per individual output, 3 h to write the profile, and the readout.

**Async share.** About 90%.

**Reuses.** The Diagnostic skill, the Matrix ("For a team" section), and the team-edition logic in OFFER_BRAINSTORM.

**Feeds which rung.** The assessment directly: the binding constraint it names is what the assessment fixes. It is also the
manual prototype of the **Team edition of the Diagnostic** (brainstorm item 2). Every manual read becomes a worked example and
a spec for the report generator, so the software is built after demand is shown, as the brainstorm proposes.

**Price band.** **$1,200–2,000 per team of up to 10.** This does not contradict the brainstorm's $/€290–990 for the *software*
team edition. The manual version costs more because it uses Henrique's hours, and the software version is cheaper because it
does not.

| # | Provider | Offer | Price | Accessed | URL |
|---|---|---|---|---|---|
| C1 | ConsultClarity (Australia/NZ Working Genius workshop costs) | Two-hour team introduction for 12–20 people: **AUD 1,800–3,500**. Half-day for 15–25: AUD 3,500–7,000 | **AUD 1,800–3,500** | 2026-10-25 (post "Jun 17", © 2026) | https://www.consultclarity.org/post/how-much-working-genius-workshop-cost-australia-new-zealand |
| C2 | Carnegie Mellon University HR (internal pricing for its own staff, not commercial) | Facilitated 3-hour Everything DiSC team session | **$90/person + $150 team report** | 2026-10-25 (© 2026) | https://www.cmu.edu/hr/career/development-programs/team/disc.html |
| C3 | Wavect (Austrian consultancy, its own planning ranges) | "Assessment / potential analysis" | **€0–4,000** (sometimes credited to a later engagement) | 2026-10-25 (published 24 Jun 2026, reviewed 5 Oct 2026) | https://wavect.io/blog/ai-consulting-austria-2026.md |

**Read.** Psychometric team debriefs are the closest analogy buyers already know. A short facilitated team session runs about
AUD 1,800–3,500 commercially (C1), and C2 gives a cost floor. $1,200–2,000 for ten people with a written profile is in line.

---

## D. EU AI Act Article 4 evidence pack (narrowed)

**What the customer gets.** A fixed-scope review of what the organisation already does: training records, AI-use policy, tool
list and role list. It is written up in the shape the Commission's AI Literacy Q&A describes:
- organisation role (provider or deployer);
- AI systems in use;
- risks in context;
- measures tailored to staff knowledge and context;
- internal records.

It ends with a gap list. There are no interviews, which is what separates it from the assessment. It states that it is not legal
advice and not a certificate. The duty is "take measures to support" literacy, as amended by Regulation (EU) 2026/1744 (R2 §1).

**Hours.** 10–12 h.

**Async share.** About 90%.

**Reuses.** R2 §1 (the legal reading, already verified), the assessment's evidence-pack template, and the AI @ Workplace
101–401 levels as the "measures" vocabulary.

**Feeds which rung.** The assessment, whose gap list becomes its scope. Credit the fee in full within 60 days.

**Price band.** **$1,500–2,500, or the euro equivalent quoted in euros.** It stays below the $3,500 assessment, which also
contains a pack, so the assessment still reads as the better deal.

| # | Provider | Offer | Price | Accessed | URL |
|---|---|---|---|---|---|
| D1 | Embed AI / Praxikon (NL), as listed on LearnWize's page | AI governance scan, **€2,950** (creditable). 30-day readiness sprint, **€9,900** | **€2,950 / €9,900** | 2026-10-25 (© 2026, undated) | https://learnwize.ai/article-4-evidence-dossier |
| D2 | Praxikon (same firm) | "Signed assessment" (DPIA, FRIA, AI Act classification, Art. 50 check, contract review), 1–4 weeks, fixed price | **from €495 per item** | 2026-10-25 | https://www.praxikon.com/en |
| D3 | Simon Cavanagh, "The AI Literacy Kit" (Payhip) | DIY: Excel tracker, measures register, guide; licensed to one organisation. This is the do-it-yourself floor | **£19.99** | 2026-10-25 (undated) | https://payhip.com/b/lkWmA |
| D4 | Praxikon blog (vendor estimates, unsourced) | Year-one AI Act cost for an SME that only deploys AI: €5,000–25,000. AI-literacy e-learning: €49–1,395 per person | **€5,000–25,000** | 2026-10-25 (post dated 7 Jul 2026) | https://www.praxikon.com/en/posts/what-does-eu-ai-act-compliance-cost-realistic-numbers |

**Read.** A €2,950 governance scan (D1) is the closest priced comparator, so $1,500–2,500 for a narrower records review fits.
D3 shows the do-it-yourself alternative costs about £20. The pack must therefore sell judgment ("is this proportionate for
your tools and roles?"), not a template.

**Risks.**
- The pack is legal-adjacent. It needs a "not legal advice" line and professional-indemnity cover first (R2 §5).
- It is EU-only.
- It must not be sold on fear of fines (R2 §1).

---

## E. Second opinion on an AI rollout plan or vendor pitch ("the Adversary, as a service")

**What the customer gets.** The client sends a rollout plan, vendor proposal or pilot report. They receive a written critique of
4–6 pages:
- what the plan assumes staff will do, meaning which stance it puts them in;
- which Stack layer it leaves unsupplied (usually judgment, evaluation or harness);
- where it confuses tool access with competence;
- five questions to put to the vendor or project lead;
- what was deliberately not assessed.

An optional 30-minute call follows. This is the Matrix's Adversary guardrail turned into a deliverable: "name what you are
defending and what would change your mind".

**Hours.** 5–8 h.

**Async share.** About 95%.

**Reuses.** The AI-Human Engineering Stack, the Matrix, R2's failure statistics (S&P 42%, McKinsey 39%), and R4's disanalogies
and automation-bias evidence.

**Feeds which rung.** The assessment or Sprint, when the critique shows the plan lacks a binding layer.

**Price band.** **$750–1,500.**

| # | Provider | Offer | Price | Accessed | URL |
|---|---|---|---|---|---|
| E1 | EPC Group | "AI Deployment Second Opinion": fixed fee, 10 business days, board-ready findings memo across five dimensions. Fee credited to remediation within 90 days | **$15,000** | 2026-10-25 (page "Updated July 3, 2026") | https://www.epcgroup.net/ai-deployment-second-opinion |
| E2 | Pravin Kumar (independent consultant) | Written second opinion, fixed fee sized to scope. States most projects run **$1,000–10,000**; no specific review price | **$1,000–10,000 (range of all projects)** | 2026-10-25 (post dated 19 Sep 2026) | https://www.pravinkumar.co/blog/why-i-charge-for-a-second-opinion-2026 |
| E3 | Gartner | Analyst-led tech proposal review; no price published | **UNVERIFIED (not published)** | 2026-10-25 | https://www.gartner.com/en/products/proposal-review |

**Read.** Enterprise second opinions cost five figures (E1). An independent's written review sits in the low thousands (E2).
$750–1,500 is the SME end, priced for a buyer who is about to spend much more on the thing being reviewed.

**Risk.** Conflict of interest with the day job if a vendor under review competes with Henrique's employer. Add a conflict check
to intake. Use an NDA by default.

---

## F. One-workflow build (merged: "custom skill build" widened to the client's tool)

**What the customer gets.** One workflow built in the tool the team already uses: a Claude skill, a ChatGPT project or GPT, or
a Copilot agent. It comes with an instruction file, three checks written as tests or a checklist, a README, and a recorded
handover. It is sold **only after a teardown (A)**, which is its spec.

**Hours.** 12–20 h.

**Async share.** About 80%.

**Reuses.** The teardown output, the Diagnostic skill's structure (SKILL.md, references, evals) as the template, and the AI 401
harness material.

**Feeds which rung.** The Sprint, which is the same thing plus evaluation and team teaching. This offer is in effect a
Sprint-lite.

**Price band.** **$1,500–3,000.** Include no free maintenance. Offer a paid re-check after model changes, quoted separately.
This does not contradict "Things I would not do: charge for skill files": the fee buys the build and the fit to one workflow,
and the files are the client's to keep.

| # | Provider | Offer | Price | Accessed | URL |
|---|---|---|---|---|---|
| F1 | Contra seller ("Custom Claude skills built to repeat, not rebuild") | Single custom Claude skill $500–1,500; skill library for a whole workflow $2,500–3,000. The page returned 404, so these come from embedded listing data; an earlier search snippet showed $400–800 | **$500–1,500**, *conflicting, UNVERIFIED* | 2026-10-25 | https://contra.com/s/27oeRFvU-custom-claude-skills-built-to-repeat-not-rebuild |
| F2 | SEOSLY | One custom GPT (SEO writer), one-time setup, one month of email support | **$1,999** | 2026-10-25 (© 2026) | https://seosly.com/services/custom-gpt-seo-writer/ |
| F3 | Wavect (planning ranges) | Workflow automation project | **€8,000–15,000** | 2026-10-25 (reviewed 5 Oct 2026) | https://wavect.io/blog/ai-consulting-austria-2026.md |
| F4 | Upwork seller | "Claude Code Setup & Configuration, Agentic Dev in 3 Days" (CLAUDE.md, MCP, hooks, agents) | **$297 / $597 / $997**, *snippet only, page returned 403, UNVERIFIED* | 2026-10-25 | https://www.upwork.com/services/product/development-it-claude-code-setup-configuration-agentic-dev-in-3-days-2052522725651022964 |

**Read.** Single-artifact builds cluster at $500–2,000 (F1, F2, F4). A full automation project is €8–15k (F3). $1,500–3,000
with checks and a handover is defensible, and it stays clearly below the $8–15k Sprint.

**Risk.** A maintenance tail into evenings. Models and tools change, and the client will call it a bug.

---

## G. One talk: *The Calculator Problem* (45 minutes, remote, slides left behind)

**What the customer gets.** A 45-minute remote session for an all-hands or leadership meeting, plus 15 minutes of Q&A. The
deck is left behind under the existing licence. No recording rights by default; offer them as a paid add-on.

**Hours.** 15–20 h once to build the talk. After that, 3–4 h per delivery: tailoring, delivery and admin.

**Async share.** 0%. It is live and usually in the client's working hours, which is the main conflict with the day job.

**Reuses.** The essay, the Matrix, the AI 101–401 slides, and R4's analogy evidence and disanalogies.

**Feeds which rung.** The workshop (from $1,200). A talk is the top of the paid funnel, and the brainstorm already lists "talks
and in-house keynotes" as paid.

**Price band.** **$1,500–3,000 per remote delivery.**

| # | Provider | Offer | Price | Accessed | URL |
|---|---|---|---|---|---|
| G1 | Building Creative Machines (PT/EN consultancy) | Talks (15-minute TED-style or 30-minute keynote) **from €2,000**; 4-hour workshop €6,000 | **from €2,000** | 2026-10-25 (© 2026) | https://www.buildingcreativemachines.com/p/talks-and-workshops |
| G2 | AI Smart Ventures (sells its own speaking) | "Emerging experts and niche practitioners" **$2,500–7,500**; virtual often 20–40% lower; base package 45–60 minutes | **$2,500–7,500** | 2026-10-25 (byline 27 Sep 2026) | https://aismartventures.com/posts/how-much-does-an-ai-speaker-cost-a-complete-guide-to-fees-tiers-and-event-budgeting/ |
| G3 | Futurist Speakers (agency) | Virtual keynotes **$5,000–15,000** | **$5,000–15,000** | 2026-10-25 (post "22 May", year not shown) | https://www.futuristsspeakers.com/ai-keynote-speaker-price-cost-futurist/ |

**Read.** Applying G2's 20–40% virtual discount to its emerging tier gives about $1,500–6,000. A new speaker with 441 total talk
views (STRATEGY_BRIEF §2) should start at the bottom of that range.

At $2,250 per delivery and 3.5 h each, with the 16 h build spread over the first four bookings, the effective rate is about
$300/h. That is the highest of any offer once built. Its weaknesses are the live slot and the selling.

---

## H. Onboarding module, licensed once: **rejected for now**

**What it would be.** A short written and video module, about 30 minutes, for new hires. It would be licensed once per
organisation with light branding.

**Hours.** 30–40 h to build. 1–2 h per sale after that.

**Async share.** 100%.

**Price band, if it were built.** **$500–1,500 per organisation.**

| # | Provider | Offer | Price | Accessed | URL |
|---|---|---|---|---|---|
| H1 | Flane / Fast Lane | "AI Literacy Training Compact", 45 minutes, minimum 10 learners | **€49.90/person** (10–50), down to €19.90 (501–1,000) | 2026-10-25 | https://www.flane.de/en/ai-competence-training-compact |
| H2 | Elephant | 24-minute AI-literacy course as a **free** SCORM download; content hub with SCORM export **€5,000/year** | **€0 / €5,000 per year** | 2026-10-25 | https://www.elephantcompany.com/en/platform/content-hub/courses/ai-literacy-according-to-the-ai-act |
| H3 | Section (R2 benchmark 5) | Team seats (<100 people) | **$750/seat** | 2026-10-21 (R2) | https://www.sectionai.com/pricing |

**Why rejected.**
- Free substitutes already exist: H2, Anthropic's free course, and Henrique's own free videos.
- Licensing a repackaging of free material cuts against the brainstorm's rule ("give the resources away").
- Selling a licence needs an audience Henrique does not yet have (STRATEGY_BRIEF §2).
- At $1,000 per sale it needs about 5 sales to repay a 35 h build at $150/h, with no channel to find them.

Revisit it in months 9–12 with the self-serve course, built from workshop recordings, as the brainstorm already plans.

---

## I. Ten checks (new; brainstorm item 4 "Evals starter" as a one-off)

**What the customer gets.** For one workflow, ideally one that has already been through a teardown, the first ten checks written
out. Each check says what is verified, the pass/fail rule, who runs it and when, and an example of a failure it would have
caught. The checks are wired into the team's instruction file or checklist, and a recorded handover is included.

**Hours.** 8–12 h.

**Async share.** About 85%.

**Reuses.** AI 301 (the eval mindset), AI 401 (the harness), the Matrix's Evaluation and Judgment rows, and the Diagnostic's
`evals/` folder as the example format.

**Feeds which rung.** The Sprint (evaluation is half of it). It also prototypes the "evals starter kits per job family" in the
brainstorm's productized column.

**Price band.** **$1,200–2,000.**

| # | Provider | Offer | Price | Accessed | URL |
|---|---|---|---|---|---|
| I1 | Vizra | "Eval Review": half a day; written plan (behaviours to test, dataset, judges) plus a 45-minute call; credited to a Sprint within 30 days | **from £600** | 2026-10-25 (© 2026) | https://vizra.ai/services |
| I2 | Vizra | "Eval Sprint": 4 weeks; dataset, one eval suite, CI gate, handover | **from £5,000** | 2026-10-25 | https://vizra.ai/services |
| I3 | Contra seller (A1) | One-workflow audit that includes "acceptance criteria for a small pilot" | **from $395** | 2026-10-25 | https://contra.com/s/EccZBLlb-know-what-to-automate-before-you-build-ai-workflow-audit |

**Read.** Engineering-grade eval work is priced at £600 for a plan (I1) and £5,000 or more for a suite (I2). A non-technical
team's first ten checks, written and wired in but without CI, fits between them at $1,200–2,000.

---

## Ladder check (acceptance criterion: no contradiction without a note)

The existing ladder is: free videos → free diagnostic → $49–149 course (later) → workshop from $1,200 → assessment from
$3,500 → $8–15k Sprint → retainer. These one-offs **add rungs; they move none.**

| Price zone | One-offs that sit there | Where they lead |
|---|---|---|
| **Below the workshop** | Redline ($150–250), debrief ($150–250), teardown ($500–750) | New entry points between the free Diagnostic and the workshop. This is a change to the ladder's shape, stated here explicitly: the brainstorm had no paid rung below $1,200 other than the future course. |
| **Workshop to assessment** | Team read, second opinion, Ten checks, Article 4 pack, talk | Each points at the assessment or Sprint. |
| **Below the Sprint** | One-workflow build | Kept clearly below $8–15k. |

**Other checks.**
- The Article 4 pack stays below the $3,500 assessment and is credited toward it, so the assessment keeps its position.
- The manual team read ($1,200–2,000) prices above the future software team edition ($/€290–990). That is consistent with
  "charge for what needs your human time".

---

## Ranked shortlist (value ÷ effort)

**How "value" is judged.** Value counts three things:
1. $/hour at the midpoint of the band and the hours. Arithmetic is in the appendix.
2. How directly the offer feeds the assessment or Sprint.
3. How strong the price evidence is.

**How "effort" is judged.** Effort counts three things:
1. Hours.
2. Live time in the client's working day.
3. Selling and maintenance tail.

| Rank | Offer | Band | Hours | Async | Mid $/h | Why here |
|---|---|---|---|---|---|---|
| **1** | **A. Workflow teardown** | **$500–750** (Redline $150–250) | 4–6 | 95% | ~125 | Easiest yes for a buyer, fully async, produces the Sprint's spec, and has the strongest one-workflow benchmarks (A1, A3) |
| 2 | C. Team read without software | $1,200–2,000 / team ≤10 | 8–10 | 90% | ~178 | Feeds the assessment directly and prototypes the team edition. Needs a consent line |
| 3 | E. Second opinion | $750–1,500 | 5–8 | 95% | ~173 | High value at a decision moment. Thin SME price evidence and a day-job conflict check |
| 4 | G. Talk | $1,500–3,000 / delivery | 3–4 (+16 once) | 0% | ~300 after build | Best rate once built, but live, daytime and sales-heavy. Take inbound bookings only |
| 5 | I. Ten checks | $1,200–2,000 | 8–12 | 85% | ~160 | Natural second purchase after A; teaches 301/401 by doing |
| 6 | D. Article 4 pack | $1,500–2,500 | 10–12 | 90% | ~182 | Good rate but EU-only and legal-adjacent. Needs indemnity cover first |
| 7 | B. Stance debrief | $150–250, cap 4/month | 2–2.5 | 60% | ~89 | Lowest rate. Keep it for case material, not income |
| 8 | F. One-workflow build | $1,500–3,000 | 12–20 | 80% | ~141 | Only after A. Maintenance tail and Sprint overlap |
| — | H. Onboarding module | — | 30–40 build | 100% | — | Rejected for now |

**Single strongest first product: the Workflow teardown at $500.**
- **Why.** It is bought without a meeting and delivered on any evening. It uses the Matrix and the Specifying guide as they
  stand, and its output is the first page of a Sprint.
- **Offer terms.** Credit the full fee against a Sprint or assessment booked within 30 days.

## Three things I would not do

1. **Sell open-ended calls ("pick my brain", hourly).** They fill evenings with cross-time-zone scheduling and train buyers to
   pay by the hour. That works against fixed-fee scarcity pricing. Every live minute should sit inside a fixed-scope written
   deliverable.
2. **Sell the Article 4 pack as compliance, a certificate, or protection from fines.** The amended Article 4 requires measures,
   not a level (R2 §1). Selling it on fear would be inaccurate and would put a non-lawyer's name on a legal claim. It stays
   "documented, proportionate measures, not legal advice".
3. **Build skills or GPTs for clients without a teardown first or a maintenance boundary.** An unscoped build becomes an unpaid
   support line into a day-job evening, and it blurs the Sprint, which is the higher rung.

---

## Appendix: arithmetic (Python, verbatim output)

Script: scratchpad `rate.py`. $/h low = band low ÷ hours high; high = band high ÷ hours low; mid = band midpoint ÷ hours
midpoint.

```
A Workflow teardown: $/h 83-188; mid 125
A' Redline: $/h 75-167; mid 114
B Stance debrief: $/h 60-125; mid 89
C Team read: $/h 120-250; mid 178
D Art.4 evidence pack: $/h 125-250; mid 182
E Second opinion: $/h 94-300; mid 173
F One-workflow build: $/h 75-250; mid 141
G Talk (per delivery): $/h 375-1000; mid 643
H Onboarding module (per sale, after build): $/h 250-1500; mid 667
I Ten checks: $/h 100-250; mid 160
Talk mid incl build amortised over 4: 300
Module: build 35h; sales to break even at mid $1000 vs $150/h opportunity: 5.2
```

Sources searched but not used as benchmarks:
- Speakers Canada: virtual fees "usually discounted 25%-40%", no amounts. https://speakerscanada.com/how-professional-speakers-assess-their-fees/
- Remo: no fee figures; updated 2023. https://remo.co/blog/speaker-fees-for-virtual-events
- Building Champions: no prices. https://www.buildingchampions.com/assessments
- CESA 6: no prices. https://cesa6.org/solutions/cliftonstrengths-individual-coaching-development
- bmdpat.com/workflow-audit: the search snippet described a $500 audit, but the live page is now a free software beta. Discarded.
