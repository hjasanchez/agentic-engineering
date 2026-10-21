# R2: Market size and monetization options

Research date: 2026-10-21. Every claim has a source URL. "Accessed" means the date the live page was read. UNVERIFIED means I could not confirm the claim from a primary or fetched source. The brief allowed 50 searches and fetches; I used 50.

---

## 1. Regulatory demand driver: EU AI Act Article 4 ("AI literacy")

**Original text.** Regulation (EU) 2024/1689 is dated 13 June 2024 and was published in OJ L on 12 July 2024. Article 4 read: "Providers and deployers of AI systems shall take measures to ensure, to their best extent, a sufficient level of AI literacy of their staff and other persons dealing with the operation and use of AI systems on their behalf, taking into account their technical knowledge, experience, education and training and the context the AI systems are to be used in…"
Article 3(56) defines AI literacy as "skills, knowledge and understanding that allow providers, deployers and affected persons … to make an informed deployment of AI systems, as well as to gain awareness about the opportunities and risks of AI and possible harm it can cause."
Source: https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng

**Since when.** Article 4 has applied since **2 February 2025**. Supervision and enforcement apply from **2 August 2026**. The Commission's AI Literacy Q&A, last updated 20 Oct 2026, confirms both dates: https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers

**Important change: the obligation was softened in July 2026.** **Regulation (EU) 2026/1744** (the "Digital Omnibus on AI") is dated 8 July 2026 and was published in OJ L on 24 July 2026. Its Article 1(5) replaces Article 4. New Art. 4(1) says: "Providers and deployers of AI systems shall take measures to support the development of AI literacy of their staff…" and "This obligation does not require providers or deployers to guarantee any specific level of AI literacy of any individual."
- Art. 4(2) has the Commission and Member States support providers and deployers, "in particular SMEs".
- Art. 4(3) has the AI Board adopt recommendations.
- Source: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202601744
- Entry into force is 27 July 2026, three days after publication. I inferred that date from Recital 46. https://www.euaiact.com/digital-omnibus-ai also states it.
- Background: the Commission's Nov 2025 proposal would have moved the duty onto Member States and the Commission entirely. Parliament restored a softer duty on organisations. Sidley (22 Jun 2026) covers this: https://datamatters.sidley.com/2026/06/22/eu-lawmakers-reach-provisional-agreement-to-delay-key-eu-ai-act-obligations/

**What counts as compliance.** All points below come from the Commission Q&A (20 Oct 2026).
- No certificate is required.
- No set format, duration, AI officer or governance board is required.
- Internal records of training and other initiatives are enough evidence.
- Relying only on instructions for use is "often" ineffective.
- Suggested minimum steps:
  1. Build general AI understanding in the organisation.
  2. Identify the organisation's role (provider or deployer).
  3. Assess the risks of its AI systems.
  4. Tailor the measures to staff knowledge and context.
- "Other persons" in scope can include contractors, service providers and clients.
- Deployers of high-risk systems still have separate human-oversight training duties.

**Penalties.**
- National market surveillance authorities enforce Article 4, not the AI Office.
- Penalties are set under national law and must be proportionate. The Q&A gives no fine amounts.
- The AI Act creates no criminal offences and no right to compensation.
- UNVERIFIED: I did not read Article 99 to confirm whether Article 4 is excluded from its fixed fine tiers.
- UNVERIFIED: law-firm blogs say missing training would mainly be an aggravating factor in other breaches. Example: https://www.traverssmith.com/knowledge/knowledge-container/the-eu-ai-acts-ai-literacy-requirement-key-considerations/

**SMEs.** SMEs are covered. The duty applies to every provider and deployer regardless of size, so any SME whose staff use ChatGPT, Copilot or similar tools at work is in scope (Q&A). The Omnibus also extends lower fine caps to "small mid-caps" via a new Art. 99(6a), according to secondary source euaiact.com.

**Related deadline shifts.** High-risk obligations moved:
- Annex III systems (e.g. HR and hiring tools) now apply from **2 Dec 2027**.
- Annex I product-embedded systems now apply from **2 Aug 2028**.
- Source: Sidley, 22 Jun 2026.

**Elsewhere (brief):**
- **Brazil, PL 2338/2023:** the Senate passed it in Dec 2024. It is still pending in the Chamber of Deputies, whose last recorded step was 2 Sep 2026, so it is not in force: https://casrai.org/guides/brazil-ai-bill-pl-2338-status
- **UK:** no statutory AI-literacy duty on employers. UNVERIFIED; I did not search this.
- **US states:** not researched (UNVERIFIED).
- **ISO/IEC 42001** (AI management system): clause 7.2 covers "competence" and 7.3 "awareness". UNVERIFIED; this comes from memory because the standard is paywalled. It is voluntary but increasingly requested in procurement (also UNVERIFIED).

**Implication for Henrique.** The compliance hook is real but weaker than the 2025 version that many vendors still market. The pitch to sell is "documented, proportionate literacy measures tailored to your tools and roles", with an evidence pack. Do not sell a "certification". Fear-based selling ("fines from Aug 2026") would be inaccurate.

---

## 2. Market size signals

**Training spend (US).**
- Total US corporate training spend in 2025 was **$102.8B**, up 4.9%.
- Spend on outside products and services was **$16B, up 29%**. This is the bucket an outside trainer competes for.
- Spend per learner was $874.
- Source: Training magazine 2025 Training Industry Report, Nov 2025. It covers US organisations with more than 100 employees. https://trainingmag.com/2025-training-industry-report/
- No reliable figure isolates *AI* training spend. One vendor report says AI training was about 4% of training budgets in 2024 data (UNVERIFIED, secondary): https://www.imocha.io/blog/employee-training-statistics

**SME adoption.**

| Source | Figure | Date |
|---|---|---|
| Eurostat (EU enterprises with 10+ staff) | 19.95% use AI (13.48% in 2024). Small (10–49): **17.00%**. Medium (50–249): **30.36%**. Large: 55.03% | 2025 survey, extracted Dec 2025. https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises |
| US Census BTOS | 17–20% of US firms used AI (Dec 2025–May 2026). About 37% at 250+ employees. **No significant growth among firms under 20 staff**. The question was broadened in Nov 2025, which creates a series break | May 2026. https://census.gov/library/stories/2026/05/ai-use-businesses.html |
| BTOS via WeWork (secondary) | 21.7% in Jul 2026, up from 17.7% in Jan | 2026. https://www.wework.com/ideas/research-insights/the-new-ai-divide |
| McKinsey State of AI 2025 | 88% use AI regularly in at least one function. About one third have begun scaling. **39% report enterprise-level EBIT impact**. 62% are at least experimenting with agents | Nov 2025. https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025 |
| OECD SME data | Not researched (budget) | n/a |

**Failure statistics.**
- **S&P Global Market Intelligence:** **42%** of companies abandoned *most* of their AI initiatives, up from 17% the year before. The average organisation scrapped **46% of proofs of concept** before production. The survey covered more than 1,000 respondents in North America and Europe. Source: CIO Dive, 14 Mar 2025: https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/
  - The figure is verified only through press coverage; I did not reach S&P's own report.
  - Some secondary sites misstate it as "expected to abandon".
- **MIT "95% of GenAI pilots fail":** not checked. UNVERIFIED; do not cite it until verified.

**Read-across.** The figures point to three things:
1. Usage is near-universal in large firms, but most do not see enterprise-level value (McKinsey 39% EBIT).
2. Small firms lag and are not catching up (BTOS under 20 staff, Eurostat small firms at 17%).
3. Abandonment rose sharply in 2025.

This fits Sivulka's thesis ("Nobody has AI working reliably yet"; transformation is a recurring, not one-off, purchase) and Nadella's (own your evals and learning loop). The gap is in operating competence, not in tool access. That favours a diagnostic-plus-training offer over a general prompt course.

---

## 3. Price benchmarks (17 benchmarks)

| # | Category | Offer | Price | Date / URL |
|---|---|---|---|---|
| 1 | Maven cohort (AI for work) | "Hands-on Agentic AI for Leaders" (James Gray). 4 weeks, no-code, 225 reviews (4.8) | **$1,350** (a search snippet showed $1,000 earlier, so the price has risen) | Accessed 2026-10-21; next cohort 9 Nov–11 Dec 2026. https://maven.com/james-gray/hands-on-ai-for-leaders |
| 2 | Maven cohort (technical slice) | "AI Evals for Engineers & PMs" (Husain/Shankar). 1,040 reviews; 4,500+ students in 15 months (page claim) | **$4,200** | Accessed 2026-10-21; cohort 10 Oct–21 Nov 2026. https://maven.com/parlance-labs/evals |
| 3 | Maven cohort | "Practical AI for Busy Professionals", 6 weeks, non-technical | Price not shown; "no longer available" | Accessed 2026-10-21. https://maven.com/pracai/prof |
| 4 | Section (individual) | AI Academy | Free tier. **$41/mo** (On Demand) or **$82/mo** (Unlimited), billed annually. A second page version shows **$62.50/mo** Premium, so the page is inconsistent | Accessed 2026-10-21. https://www.sectionai.com/pricing |
| 5 | Section (team / enterprise) | Small teams (<100) | **$750/seat**. Transformation services and large teams: price on request | Same URL |
| 6 | Workshop, small UK agency | Design for Online AI workshop | Half-day **from £850** for up to 12 people; full day quoted on scope | Accessed 2026-10-21 (page news dated 24 Aug 2026). https://designforonline.com/training-and-resources/ai-training-workshops/ |
| 7 | Workshop, Swiss provider | GlobalVision Communication (Geneva) AI workshop, half-day | **CHF 2,500** | Accessed 2026-10-21. https://globalvision.ch/product/artificial-intelligence-ai-workshop-half-day/ |
| 8 | Workshop, US market survey | SFAI Labs guide | Half-day (~25 people) **$3,000–8,000**. Full-day **$6,000–15,000**. 5–15 people, 1–2 sessions: **$2,000–4,500**. Self-paced seats $300–2,500/yr. Underlying "cost surveys" are unnamed | 16 Sep 2026. https://sfailabs.com/guides/how-much-does-corporate-ai-training-cost-in-florida-in-2026 |
| 9 | Workshop, consultancy | Phos AI Labs (Miami), role-specific training | **From $10,000** (quoted by SFAI, not checked at source; UNVERIFIED) | 16 Sep 2026, same URL |
| 10 | Reforge | Individual / team | **$1,995/yr** individual. **$9,995/yr** for 10 seats. **$23,995/yr** for 30 seats | Accessed 2026-10-21 (page undated). https://www.reforge.com/pricing |
| 11 | Coursera Plus | All-access subscription | **$59/mo or $399/yr** list price; promos down to $199–239 | Accessed 2026-10-21. https://coursera.org/courseraplus |
| 12 | LinkedIn Learning | Individual | **$39.99/mo or $239.88/yr**. Third-party sources only (UNVERIFIED against LinkedIn) | 2026. https://skillscouter.com/is-linkedin-learning-free/ |
| 13 | Fractional AI lead (UK/US) | Fractional AI officer guide | **$3,000–10,000/mo** for 2–6 days. **£3,500–9,000/mo**. Day rate **£800–1,500** | 2026, undated. https://www.lilachbullock.com/fractional-ai-officer/ |
| 14 | Fractional AI lead (EU SME) | First AI Movers | SME roadmap **€2,500–4,500/mo** (1–2 days/week). Advisory **€1,500–2,500/mo**. Fractional AI CTO €8,000–15,000/mo. From search snippets; pages not fetched | Feb 2026. https://radar.firstaimovers.com/fractional-cto-ai-strategy-package-european-smes-2026.md |
| 15 | GitHub Sponsors | Platform total | **>$100M** paid since 2019 to more than 70,000 maintainers and orgs. That averages about $1,400 each cumulatively (my arithmetic). One maintainer's 2025 Sponsors income: **$11,786** | 22 Jul 2026: https://itbrief.co.uk/story/github-sponsors-tops-usd-100-million-for-open-source ; 2025: https://joshuakgoldberg.com/blog/2025-finances-in-review/ |
| 16 | Paid newsletter | Average price and conversion | Average **$10/mo or $100/yr** (beehiiv data via Press Gazette). Tech free-to-paid conversion is **about 2%**; Substack's "5–10%" claim is disputed | 2026: https://pressgazette.co.uk/newsletters/newsletters-2026-prices-retention-churn/ ; https://simonowens.substack.com/p/whats-a-realistic-conversion-rate |
| 17 | Gumroad skill pack | "Claudecademy Essential" (Claude Code skills, agents, templates) | **$49** (currently "not for sale") | Accessed 2026-10-21. https://claudecademy.gumroad.com/l/essential |
| 18 | Books | Nonfiction advances | Bernoff survey of 96 traditionally published nonfiction authors (2019–2022): **median advance $17,500**. Royalty "around 10%" (weak source). No 2025–26 benchmark found | https://bernoff.com/blog/how-big-will-your-book-advance-be-results-of-my-nonfiction-author-survey ; https://scribecount.com/author-resource/traditional-hybrid-publishing/advances-explained |

Not found: Gumroad platform-wide creator averages, and independent YouTube sponsorship CPM for tech-education channels. Both are UNVERIFIED gaps.

**Pattern.**
- Individual learners pay **$20–$400/yr** for libraries (Coursera, LinkedIn, Section individual) but **$1,000–$4,200** for a live cohort with a named expert.
- Teams pay **$750–$2,000 per seat per year** (Section, Reforge).
- A half-day workshop runs **£850 to $8,000** depending on reputation and region.
- Fractional advisory starts around **€1,500/mo**.

---

## 4. The agent-skill economy

**Distribution is free and crowded.**
- **Anthropic official plugin directory.** The `claude-plugins-official` GitHub directory launched in late May 2026. A public submission portal opened on 25 Sep 2026 with Anthropic review and an "Anthropic Verified" badge. Listing is free and there is no revenue mechanism. Sources: https://www.claude.com/docs/plugins/submit ; https://borncity.com/news/anthropic-oeffnet-claude-verzeichnis-entwickler-reichen-plugins-direkt-ein/
  - UNVERIFIED (secondary): about 55 curated plugins in June 2026, and "Frontend Design" at about 829k installs.
- **skills.sh (Vercel).** Launched 20 Jan 2026. It is an open, uncurated leaderboard ranked by install telemetry and installed with `npx skills add`. It is free. https://vercel.com/blog/introducing-skills
- **MCP registries.** These are free directories with large and inconsistent counts. All counts below are secondary and UNVERIFIED:
  - Glama: about 20k–37k+ servers.
  - mcp.so: about 17–20k.
  - Smithery: 6,000+ (freemium).
  - Source: https://www.frankx.ai/blog/mcp-ecosystem-2026-clawhub-smithery-guide
  - PulseMCP: count not found.

**Paid layers exist but are nascent.**
- **Apify.** MCP servers and "Actors" earn per event (per run or API call). Apify handles billing and tax and takes a commission. It claims "$500k+ paid to developers every month" and "$1.7M last month"; the two claims conflict and are undated. https://apify.com/mcp/developers
- **MCPize and mctx.ai.** Advertise an 80/20 revenue share in the creator's favour. UNVERIFIED (search snippets only).
- **Agensi and Agent37.** Paid Claude-skill marketplaces described as "real but nascent" (ryandoser.com, 9 Jul 2026): https://ryandoser.com/claude-skills-marketplace/ . Agent37's own post (19 Jul 2026) sells hosted agents from $3.44–3.99/mo and gives no creator earnings: https://www.agent37.com/blog/claude-skills-marketplace
- **Unverified claims.** "Under 5% of MCP servers are monetized" and "a solo MCP server hit $10k MRR in 6 weeks" (UNVERIFIED; the original article was not identified).

**Willingness to pay.** Weak for skill *files*; better for *hosted, metered tools* and for *services built on skills*.
- A SKILL.md is plain text that can be copied once bought.
- The most-installed skills are free. Anthropic's document skills and community sets such as Superpowers and wshobson/agents are listed as free, the latter two under **MIT**: https://dupple.com/learn/best-claude-code-skills-2026
- Money appears where a human service sits on top. One anecdote is a $4,200 client engagement built on skill stacks: https://www.mejba.me/blog/claude-code-skills-businesses-pay-for-2026

**Licensing norm.** Permissive (MIT, sometimes Apache-2.0) for open skills. Paid packs use a personal or team-use licence through Gumroad-style storefronts. I found no standard commercial skill licence.

**Implication.** The skills Henrique already has (the Audit Protocol, the specification templates) are best released free under MIT as distribution and credibility. Charge for the assessment and training they lead to.

---

## 5. Five business models, ranked for 5–10 hours a week

Assumptions throughout:
- Henrique's current audience size is **unknown**. Repo stars and YouTube subscribers were not retrievable this session; repo access was denied (UNVERIFIED). Reach figures are planning assumptions, not measurements.
- All figures are gross USD before platform fees and tax.
- The day job limits live delivery. Remote sessions across time zones, early mornings, evenings, or a few vacation days are assumed.

| Rank | Model | Revenue mechanics | 12-month gross range (assumptions) | Hours/week | Asset it leans on |
|---|---|---|---|---|---|
| **1** | **Productized "AI operating assessment"** | Fixed-fee diagnostic for an SME team. Interviews, tool and workflow inventory, and an AIES layer-by-layer audit locating the weakest binding layer. Deliverables: a prioritised 90-day plan and an Article 4 "literacy measures" evidence pack. Optional monthly advisory afterwards | **$5,000 – $61,500**. Low: 2 clients × $2,500. High: 8 clients × $6,000 + 3 clients converting to advisory at $1,500/mo × 3 months ($13,500). Prices sit below the fractional range (benchmarks 13–14) and the SFAI workshop-plus-follow-up range | 1.5–5.6 (80–292 h/yr at ~20 h per assessment plus sales) | AIES Stack, Agent Audit Protocol, Component Reference Map, Specifying-Work guide, Sivulka/Nadella framing |
| **2** | **Paid workshops / team training for SMEs** | Remote half-day or full-day sessions per team, mapped to the AI 101–401 curriculum and the archetypes. Sold standalone or as the assessment's delivery step | **$4,800 – $60,000**. Low: 4 sessions × $1,200, below the £850–CHF 2,500 small-provider band because Henrique is new. High: 15 sessions × $4,000, low-to-mid of the SFAI US half-day band | 1.7–5.0 (88–260 h/yr at ~12 h per session plus sales) | AI 101–401 slides and videos, Archetypes v3 |
| 3 | Self-serve course | Repackage the 101–401 series with exercises, templates and a certificate; sell on own site or Gumroad. A later cohort version could reach Maven price levels | **$980 – $29,800**. Low: 2,000 reach × 1% × $49. High: 8,000 reach × 2.5% × $149 | 3–4 averaged (148–196 h/yr, mostly ~100 h of upfront build) | YouTube series, slides, repo |
| 4 | Sponsorship / affiliate / supporters | GitHub Sponsors, a paid newsletter tier, sponsored videos, tool affiliate links | **$1,500 – $30,300**. Sponsors: 5×$5×12 to 40×$10×12. Newsletter: 1,000×1%×$100 to 5,000×3%×$100. Sponsored pieces: 0 to 6×$1,000 (rate UNVERIFIED). Affiliate: 10×$20 to 150×$30 (UNVERIFIED) | 2–4 (100–200 h/yr) | Repo, YouTube, a newsletter that would need building |
| 5 | Paid skill pack / tool | Gumroad-style pack of premium skills (e.g. an "assessment-in-a-box" agent kit), individual and team licences | **$870 – $20,240**. Low: 30 × $29. High: 250 × $69 + 10 team licences × $299 | 1.5–2.3 (80–120 h/yr) | Audit Protocol, specification templates, repo |

Ranking logic: $/hour at the high end (computed below) and probability of the low case occurring, weighted by how well each model uses Henrique's existing, distinctive assets. The course and skill pack rank lower because their revenue depends on an audience size that is unknown, and evidence of willingness to pay for skill files is thin (Section 4).

**Start with #1 (assessment) and #2 (workshops), sold as a ladder.**
1. **They sell the distinctive part.** The binding-layer diagnosis (AIES) and the stance or archetype lens set Henrique apart. Generic prompt courses are a crowded, commoditised market at $20–400/yr. A diagnosis maps directly onto the market gap: 42% of companies abandoned most of their AI initiatives, and only 39% see EBIT impact.
2. **Highest $/hour and fewest buyers needed.** Two to eight SME clients make the year. That fits 5–10 hours a week. A course needs thousands of reached prospects.
3. **They feed each other and produce later assets.**
   - The assessment's findings become the workshop agenda.
   - Workshops produce testimonials, recordings and exercises. These become the course (model 3) in months 9–12.
   - The audit agent becomes the skill pack (model 5) as a free MIT release with a paid team edition later.
4. **They carry the regulatory hook honestly.** Each engagement ends with documented "AI literacy measures", which is exactly what the amended Article 4 and the Commission Q&A ask SMEs to show.

**Risks.**
- **Hours.** At the high end, assessments and workshops together need about 550 hours a year, roughly 10.6 a week. That is above budget, so expect the realistic combined result to be capped near the middle of the range.
- **Day job.** Live delivery conflicts with the day job.
- **Selling.** Selling to SMEs requires outreach Henrique has not yet done; the brief gives no evidence of existing B2B leads.

One sentence on structure: run it as a sole proprietorship (or the local equivalent) until revenue justifies more, with professional-indemnity cover before the first assessment.

---

## Appendix: Python recomputation (verbatim output)

Script: `/tmp/claude-0/-home-user/a796e04e-6d69-549d-a3e4-d8074fbd356d/scratchpad/rev.py`

```
== A. Paid SME workshops
  sessions x price: low 4x1200 = 4,800 | high 15x4000 = 60,000
  TOTAL low 4,800 | high 60,000
  $/hour: low 55 (on 88 h) | high 231 (on 260 h)
== B. Self-serve course
  reach x conversion x price: low 2000x0.01x49 = 980 | high 8000x0.025x149 = 29,800
  TOTAL low 980 | high 29,800
  $/hour: low 7 (on 148 h) | high 152 (on 196 h)
== C. AI operating assessment
  clients x fee: low 2x2500 = 5,000 | high 8x6000 = 48,000
  advisory follow-on: low 0 = 0 | high 3 clients x $1,500/mo x 3 mo = 13,500
  TOTAL low 5,000 | high 61,500
  $/hour: low 62 (on 80 h) | high 211 (on 292 h)
== D. Paid skill pack
  individual buyers x price: low 30x29 = 870 | high 250x69 = 17,250
  team licences x price: low 0x299 = 0 | high 10x299 = 2,990
  TOTAL low 870 | high 20,240
  $/hour: low 11 (on 80 h) | high 169 (on 120 h)
== E. Sponsorship/affiliate/supporters
  GitHub Sponsors (n x $/mo x 12): low 5x5x12 = 300 | high 40x10x12 = 4,800
  paid newsletter (free list x conv x $100/yr): low 1000x0.01x100 = 1,000 | high 5000x0.03x100 = 15,000
  sponsored videos/issues (n x fee, UNVERIFIED rate): low 0x300 = 0 | high 6x1000 = 6,000
  affiliate (buyers x commission, UNVERIFIED): low 10x20 = 200 | high 150x30 = 4,500
  TOTAL low 1,500 | high 30,300
  $/hour: low 15 (on 100 h) | high 152 (on 200 h)

Combined C+A (recommended start): low 9,800 | high 121,500
```

Hours per week = annual hours ÷ 52. Combined A+C high = 260 + 292 = 552 h, about 10.6 h a week, above the 5–10 h budget.
