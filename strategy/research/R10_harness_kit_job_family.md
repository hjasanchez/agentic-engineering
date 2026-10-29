# R10: Which job family gets the first harness starter kit

Research date: 2026-10-29. Brief: `strategy/briefs/W24_harness_kit_job_family.md`. Inputs read: `OFFER_BRAINSTORM.md`,
`research/R2_market_and_monetization.md`, `research/R6_one_off_offers.md`, `STRATEGY_BRIEF.md` §3, `MODE_FLUENCY_MATRIX.md`,
`THE_FOURTEEN_STANCES.md` (Executor), `AI-Human-Stack-Agent-Audit-Protocol.md`, and the skill's `references/harness-loop.md` and
`references/spec-templates.md` (the condensed Specifying guide). About 25 web searches and fetches.

**How to read this.** Every number carries its date and source URL. "Secondary" means I read a write-up, not the publisher's own page.
UNVERIFIED means I could not confirm it. Scores are my judgement on the evidence below, not measurements. Internal document; nothing
here goes on the site.

---

## 1. The finding that changes the brief: free job-family skill packs already exist

Anthropic's `knowledge-work-plugins` repository (Apache-2.0; 33.8k stars and 3.7k forks when read on 2026-10-29) ships role plugins for
sales, customer support, product management, marketing, legal, finance, data, operations and human resources, plus a `small-business`
plugin with 44 skills (finance, sales, marketing, operations, hiring) that includes `close-month`, `invoice-chase`, `hiring-screener`,
`contract-review` and `ticket-deflector`. The operations plugin has `/vendor-review`, `/process-doc`, `/status-report` and `/runbook`.
Source: https://github.com/anthropics/knowledge-work-plugins (README, `operations/`, `small-business/`, read 2026-10-29). OpenAI Academy
publishes role "prompt packs" (sales, HR, IT, managers, executives, customer success; finance per one source) — secondary only:
https://blog.bismart.com/en/prompt-packs-openai (UNVERIFIED against OpenAI).

**Consequence.** A Mode Fluency kit cannot be "skills that do the job": that is free, official and well funded in every family on the
list. What nobody ships is the part this method owns: the harness around the job (folder, permissions, instruction file written from
mistakes), the three checks, and the stance the person is in while the agent works. So the kit is tool-neutral (a ChatGPT project, a
Copilot agent, Claude, or one of the plugins above all fit inside it), and its value is supervision, not generation. This also tilts
the choice toward a family where deterministic checks are possible and matter.

---

## 2. Evidence by family

### Adoption (who uses generative AI at work, and for what)
| Evidence | Figure | Date | Source |
|---|---|---|---|
| Eurostat, EU enterprises using AI, by purpose | Marketing or sales **34.70%**; business administration processes or management **31.05%**; logistics 6.08% (lowest). Small firms (10–49) using AI at all: 17.00% | 2025 survey, extracted Dec 2025 | https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises |
| Eurostat, barrier among firms that considered AI and did not adopt | Lack of relevant expertise **70.89%** | same | same |
| Anthropic Economic Index (Nov 2025 sample) | Office & administrative support **13%** of first-party API traffic (8% of Claude.ai); computer & mathematical 46% API / 34% Claude.ai; API use is about three-quarters automation | Published 15 Jan 2026 | https://www.anthropic.com/research/anthropic-economic-index-january-2026-report |
| Gallup, US workers using AI at least a few times a year, by industry | Technology 77%, finance **64%**, professional services **62%**, retail 33%; finance and professional services grew most (+6, +5 pts) | Q4 2025, published Jan 2026 | https://www.gallup.com/workplace/701195/frequent-workplace-continued-rise.aspx |
| Gartner, finance functions using AI | **59%** (58% in 2024, 37% in 2023); n=183 CFOs and finance leaders, May–Jun 2025 | 18 Nov 2025 | https://www.gartner.com/en/newsroom/press-releases/2025-11-18-gartner-survey-shows-finance-ai-adoption-remains-steady-in-2025 |
| Thomson Reuters Institute, professional services | Legal organisations actively using gen AI **26%** (14% in 2024); tax firms implementing 21% (8%) | Apr 2025 | https://thomsonreuters.com/en/press-releases/2025/april/from-incubation-to-integration-generative-ai-adoption-nearly-doubles-as-professional-services-reach-crossroads |
| General Assembly, HR professionals (US/UK, n=288) | **82%** use AI at work; **30%** have had job-specific AI training | Jun 2025 (secondary) | https://www.staffingindustry.com/news/global-daily-news/ai-adoption-outpaces-training-in-hr-departments |
| PMI, project professionals (n=500) | About two in five use gen AI on more than half their projects | Sep 2024 (no 2025 edition found) | https://www.pmi.org/about/press-media/press-releases/genai-adoption-research |
| Pew, US workers who have used chatbots for work: tasks | Research 57%, editing 52%, drafting reports or documents 47%, summarising 40%, analysing data or code 27% | Survey Oct 2024, published 25 Feb 2025 | https://www.pewresearch.org/social-trends/2025/02/25/workers-experience-with-ai-chatbots-in-their-jobs/ |
| Small-business surveys (marketing, support) | Content generation 69% of store owners (Shopify); about one in three SMBs use AI for customer-service replies (Revenued). Small samples, vendor-run | 2025 | https://www.revenued.com/small-business-ai-usage — UNVERIFIED methodology |

### Error cost (where checks matter)
| Family | Documented failure | Date | Source |
|---|---|---|---|
| Legal | Charlotin's crowd-sourced database of court filings with AI hallucinations: about **1,600** worldwide by mid-2026, US about two-thirds (counts vary by outlet) | mid-2026 (secondary) | https://library.law.unc.edu/2026/06/handling-hallucinations-a-reflection/ |
| Consulting / reports (applies to any written deliverable) | Deloitte Australia agreed to repay the final instalment of an A$440,000 government contract after a 237-page report contained a fabricated court quote and non-existent references | 7 Oct 2025 | https://www.ctvnews.ca/business/article/deloitte-to-partially-refund-australian-government-for-report-with-apparent-ai-generated-errors/ |
| Customer support | *Moffatt v Air Canada*, 2024 BCCRT 149: airline liable for its chatbot's wrong bereavement-fare answer; $650.88 damages, $812.02 total | 14 Feb 2024 | https://www.mltaikins.com/insights/that-wasnt-me-that-was-my-chatbot |
| HR / hiring | *Mobley v Workday*: age-discrimination claim over AI screening conditionally certified as a nationwide collective | 16 May 2025 | https://www.hklaw.com/en/insights/publications/2025/05/federal-court-allows-collective-action-lawsuit-over-alleged |
| HR / hiring (EU) | Annex III high-risk obligations (which cover hiring tools) apply from **2 Dec 2027** after the Digital Omnibus | Jun 2026 | R2 §1, citing https://datamatters.sidley.com/2026/06/22/eu-lawmakers-reach-provisional-agreement-to-delay-key-eu-ai-act-obligations/ |
| Finance, ops, sales, marketing, PM | No comparable public case found in this pass. Errors here are usually internal and recoverable (a wrong total, a missed line, an off-brand post) | — | UNVERIFIED gap |

### Training demand
- Zapier (n=542 US executives, firms 1,000+ staff, 30–31 Mar 2026): IT/engineering teams most often trained (51%); business/operations
  "just under half"; finance, sales/marketing, product, HR and legal about 40%. Secondary:
  https://www.nojitter.com/ai-automation/lack-of-ai-training-still-a-problem-zapier-survey-finds
- Access Group (1,000 UK employees, Dec 2025): 70% of workers who use AI learned by experimenting; 19% have taken a course. Secondary:
  https://www.staffingindustry.com/news/global-daily-news/most-uk-workers-using-ai-have-no-formal-training
- No source found that breaks SME training purchases down by job family. UNVERIFIED gap. The Eurostat 70.89% "lack of expertise"
  barrier is the best SME-specific signal and is not family-specific.

---

## 3. Scored table

Scale 1–5, higher is better for a first kit. "Insider" = how far a credible kit can go without having done the job.
"Reach" = Henrique's channels: LinkedIn (audience size unverified, R5), the site, warm network. His GitHub bio reads "R&D Engineer in
Biological WWT", so his warm network is probably technical and industrial operations; that is an inference, UNVERIFIED.

| Family | Adoption | Pain / error cost | Public material | Stance fit | Reach | Insider | **Total /30** | Note |
|---|---|---|---|---|---|---|---|---|
| **Operations & admin** (SME back office; founders and GMs merged here, since in an SME they run it) | 4 — Eurostat 31.05% business admin; office & admin 13% of API traffic, automation-heavy | 3 — money and supplier commitments, mostly recoverable if caught | 5 — SOPs, public procurement rules, Anthropic ops plugin (Apache-2.0) | 5 — Executor with an Interpreter step: exactly the 401 harness lesson | 4 — every SME has this person; closest to his likely network | 4 — quote comparison and process docs need no credential | **25** | Best balance |
| **Finance & bookkeeping** | 4 — Gartner 59% of finance functions; Gallup finance 64% | 5 — numbers, audit trail | 4 — close checklists, AP procedures; Anthropic small-business `close-month` | 5 — Executor; checks can be fully deterministic | 2 — accountants are a distinct community he is not in | 2 — needs a practitioner; "not financial advice" line | **22** | Strong second |
| **Marketing** | 5 — Eurostat 34.70% (with sales); content is the top SMB use | 2 — brand risk, rarely costly | 5 — saturated | 2 — mostly Scribe/Genie/Muse; Prompt layer; checks are not load-bearing | 3 | 4 | **21** | Most crowded, least need for checks |
| **Sales** | 4 — shares the Eurostat 34.70% | 2 | 5 | 3 — Librarian for prospect research, Scribe for outreach | 3 | 3 | **20** | Crowded; sending is the risk |
| **Customer support** | 3 — about 1 in 3 SMBs (weak sources) | 4 — *Moffatt v Air Canada* | 4 — KB and macro templates, Anthropic support plugin | 4 — Librarian; Evaluation layer | 2 | 3 | **20** | Good later kit |
| **Project management** | 3 — PMI 2024 only | 2 | 4 — PMI and template libraries | 4 — Executor for status reports | 3 | 4 | **20** | Low stakes, so weak demo of checks |
| **HR / people ops** | 4 — 82% of HR pros (n=288) | 5 — *Mobley*, EU Annex III from 2 Dec 2027 | 3 | 3 — Scribe for job posts; screening is regulated | 2 | 1 — legal exposure without an insider | **18** | Not first |
| **Legal / compliance** | 3 — 26% of legal orgs | 5 — ~1,600 hallucination cases | 3 | 4 — Librarian/Interpreter; Evaluation | 1 | 1 | **17** | Highest stakes, lowest permission to play |

Sensitivity: drop Reach and Insider (the two scores that depend on Henrique rather than the market) and finance (18) passes operations
(16). The recommendation therefore rests on reachability and on being able to build it credibly now; if a finance design partner turns up
first, swap the order.

---

## 4. Recommendation

**First kit: Operations & admin for SMEs.** Second: **Finance & bookkeeping** (first workflow there: invoice-to-PO matching with an
exceptions list), built after a finance practitioner agrees to review it.

Why operations: it is the second-largest AI purpose in EU firms (31.05%, Eurostat 2025) and the one with the clearest automation
signal (office & admin, 13% of Anthropic API traffic, Nov 2025); every SME has the person who does it, often the founder; a credible
example needs no professional credential; and its natural first workflow sits on the boundary with finance, so the checks it teaches
(trace, recompute, coverage) carry straight into kit two.

### The first workflow: "Three quotes, one recommendation"
The person collects two to four supplier quotes against a request (a spec, an RFQ or an email) and needs a like-for-like comparison and
a recommendation they can sign. Grant-funded and public bodies already have to do this: US 2 CFR 200.320(a)(2) requires "price or rate
quotations … from an adequate number of qualified sources" for simplified acquisitions (https://www.law.cornell.edu/cfr/text/2/200.320,
read 2026-10-29).

- **Stance: Executor**, with an **Interpreter** step inside it. The agent reads quotes the person supplied (Interpreter: decode my
  material), then normalises, compares and drafts (Executor: a delegated job, reviewed after). The characteristic failure is the
  Executor's: locally correct extractions compounding into a wrong recommendation, found when the purchase order is already out.
- **Binding layer: Harness + Judgment** (the Executor row of the Matrix). Harness: one folder with `inputs/` read-only (request and
  quotes), `outputs/` the only place it writes, permission set to "never send" to suppliers, version history on, and a
  `notes/progress.md`. Judgment: a short decision note the agent cannot override: "the award is mine; when price and lead time conflict,
  we prefer [X], because [Y]". The instruction file stays under 40 lines and gains a line only after a real mistake.
- **The three checks**
  1. **Trace.** Every figure and claim in the comparison table carries `[source: file, page]`, and a check confirms the figure appears in
     that source. This is the `check_sources.py` pattern already in `references/spec-templates.md`. Interpreter guardrail: no claim you
     cannot trace.
  2. **Recompute.** Totals, unit prices, currency, tax and delivery charges are recalculated by a deterministic step (a spreadsheet
     formula or a 20-line script), never by the model, and compared with the model's table. Any mismatch is a FAIL.
  3. **Coverage and deviation.** Every line of the request appears for every supplier as quoted, excluded, qualified or missing, and the
     agent ends with a deviation report: "everywhere I departed from the request or guessed, and why" (the Executor's cardinal rule).
     Nothing goes to a supplier and no award is made without the person's sign-off.
- **Kit layout:** `README` (what this kit is, which stance you are in, when not to use it), `INSTRUCTIONS.md` (under 40 lines),
  `inputs/` with a fictional request and three fictional quotes (one with a hidden exclusion, one with a unit mismatch, one with a
  total that does not add up, so each check catches one planted fault), `checks/` (the three checks, plus a chat-only version as a
  checklist), `outputs/` (a worked example), `notes/progress.md`.
- **Public source material:** 2 CFR 200.320 (quotation requirement); Anthropic's operations plugin `/vendor-review` (Apache-2.0, may be
  named as an optional engine inside the harness, with attribution); the method's own `harness-loop.md` starter kit, `spec-templates.md`
  (Intent Doc, six correctness questions), the Matrix rows for Executor and Interpreter, and the Agent Audit Protocol's Evaluation and
  Harness components. Sample quotes are written from scratch and labelled fictional. No third-party templates copied.

### Getting the insider knowledge: one design partner
Recruit one practitioner who buys for an SME (office or operations manager, or a founder who still signs purchase orders) through a
LinkedIn post or the warm network. They run the kit on two of their own past quote sets (redacted), tell Henrique what the checks miss,
and are interviewed by an agent one question at a time (the "translation" method in `harness-loop.md`) until the decision note reads like
their judgement. In return: named credit in the kit README and a free workflow teardown. Their two runs become the first case note;
no figures are claimed until measured (interventions per run, week 1 vs week 4, per `harness-loop.md`). Use the same approach, with a
bookkeeper or accountant, before building the finance kit.

---

## 5. Gaps and caveats
- Henrique's LinkedIn audience and network composition are unverified (R5: LinkedIn blocked fetches). The Reach column is the weakest.
- No SME training-purchase data by job family was found. Training-demand evidence is large-firm (Zapier) or cross-functional.
- Microsoft Work Trend Index 2026 (May 2026) was found only through secondary coverage and is not used here:
  https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization
- McKinsey's per-function adoption figures (State of AI, Nov 2025) could not be read (page timed out); not used.
- Error-cost evidence for operations and finance is thin in public cases; the score rests on the nature of the work, not on incidents.
- The Anthropic plugin finding should be re-checked before the kit ships; the repo moves quickly.
