# R14: The five navigation candidates, grounded and ranked against R11

Research date: 2026-11-01. Brief: `strategy/briefs/W31_ground_navigation_candidates.md`. Inputs: R12 (the five candidates), R11 (method,
reach assumptions, arithmetic), R2 §1 (Article 4), R6 (one-off offers), `OFFER_BRAINSTORM.md` (decisions on file).

**How to read this.** Same conventions as R11.
- "Accessed" is the date I read the live page (all 2026-11-01 unless stated). *Snippet only* means a search-result summary I could not
  confirm on the page: **UNVERIFIED**. Counts from the GitHub, PyPI, pypistats and npm APIs were pulled on 2026-11-01.
- Build hours, ongoing hours and volumes are planning estimates, not measurements. Reach is R11's: 300 (low) to 2,000 (high) people see a
  given paid offer in 12 months, 1–2% self-serve conversion. Where the buyer is a company, units are companies × seats.
- New candidates are lettered N–R so they sit beside R11's A, C–M on one table. All bands are internal: nothing here goes on the site or
  in the README (decision of 2026-10-29).
- Nothing below is legal advice. Where the law matters, the text lists what a lawyer would need, not an answer.

## Summary

| # | Candidate | Build h | Ongoing h/mo | Price band | 12-mo gross low–high | Mid ÷ build h | Mid ÷ (build + 12 mo ongoing) | Strategic (0–6) | Decision conflict |
|---|---|---|---|---|---|---|---|---|---|
| N | AI literacy record (scored, per person) | 50–80 | 2–4 | $19–29/person, 10-seat minimum | $190–5,220 | $42/h | $27/h | 5 | **Yes**: certification refusal (wording), team edition, no prices |
| O | Spec lint (free) + paid team report | 20–35 | 0.5–1 | free; report $49 | $0–490 | $9/h | $7/h | 5 | None for the free core |
| P | Named, versioned spec + badge | 10–15 | 0.5 | free | $0–0 | $0/h | $0/h | 3 | None |
| Q | Library membership | 25–40 | 4–8 | $12–19/mo | $180–3,800 | $61/h | $19/h | 3 | **Yes**: harness kits planned free; no prices |
| R | Book, 40–60k words | 70–120 | 0.5–1 | ebook $7.99–12.99, paperback $19.99–24.99 | $120–2,100 | $12/h | $11/h | 4 | Licence question (CC BY-SA); retailer shows a price |

Strategic score as R11: feeds the paid ladder (0–3) + builds the audience (0–3). Arithmetic: appendix.

**One-paragraph read.** The regulation does supply a demand, but not the one R12 hoped for. The Commission's Q&A (updated 2026-10-20) says
Article 4 "does not entail an obligation to measure the knowledge of AI of employees" and "there is no need for a certificate"; what it
names is an internal record of the measures taken. A scored per-person record (N) is therefore a legitimate *measure*, never a compliance
proof, and it enters a market where a 45-minute course with a certificate already costs €19.90–49.90 per person and several are free.
It has the largest upside of the five and the largest legal and reputational risk. The linter (O) and the spec (P) earn nothing directly
and are the best reach tools on the list, and the evidence says a spec spreads through its tool, not on its own. The library (Q) is R11's
D and E rebundled with a monthly content promise that eats the ratio. The book (R) is the slowest money on the table; its value is
authority, and the evidence for that effect is self-reported. **R11's first build (E) stays first.**

---

## N. AI literacy record (scored, per person)

**What it is.** A 30–40 minute online assessment built from the fourteen stances and the Stack's failure signatures, scored by fixed keys
(no model calls), producing a dated per-person record: name, date, content covered, duration, item-bank version, score band. A company buys
seats and files the records as one of its Article 4 measures. It is the per-person retail form of the assessment's evidence pack.

**What the regulation says (primary sources).**

| Point | Text | Date / URL |
|---|---|---|
| No duty to test | "Article 4 of the AI Act does not entail an obligation to measure the knowledge of AI of employees." | Commission AI Literacy Q&A, updated 2026-10-20. https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers |
| No certificate | "There is no need for a certificate." No mandatory trainings or fixed format. | Same |
| Records | "Organisations can keep an internal record of trainings and/or other guiding initiatives." | Same |
| Instructions for use are not enough | "Relying on the instructions of use is therefore not sufficient, further measures are necessary." | Same |
| Enforcement | National market surveillance authorities from 2 August 2026; any sanction "must be proportionate, based on the individual case". The page also says Member States were "due to adopt" penalty rules "by 2 August 2025", a date it does not reconcile. | Same |
| Amended duty | "take measures to support the development of AI literacy"; "does not require … any specific level of AI literacy of any individual". | Reg. (EU) 2026/1744, in force 2026-07-27 (R2 §1). https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202601744 |
| German regulator's record fields | Document "die Art der Maßnahmen, den inhaltlichen und zeitlichen Umfang, die teilnehmenden Personen"; no certification duty for training; recommends "regelmäßige Evaluation der Maßnahmen, z.B. um Zielerreichung zu überprüfen"; "Ein Mangel an KI-Kompetenz kann als Verletzung der Sorgfaltspflicht angesehen werden, insbesondere wenn dadurch ein Schaden entsteht." | Bundesnetzagentur, KI-Kompetenz page, © 2026, accessed 2026-11-01. https://www.bundesnetzagentur.de/DE/Fachthemen/Digitales/KI/7_Kompetenz/artikel.html . Its June 2025 *Hinweispapier* predates the amendment (secondary: https://www.otto-schmidt.de/blog/it-recht-blog/ki-kompetenzpflicht-konkret-das-neue-hinweispapier-der-bundesnetzagentur-ITBLOG0007923.html ) |
| Fines | Several secondary sources say Article 99 sets no fixed fine tier for Article 4; KI-Syndikat states there is no own fine for Article 4 in Germany. **UNVERIFIED** against Article 99 itself (same gap as R2). | https://www.ki-syndikat.de/akademie/kurse/ki-kompetenz-eu-ai-act/ |

**Does a small provider's record count?** No source sets any accreditation for literacy providers; the record that matters is the
*organisation's own* internal record, and the regulator's fields (type, content, duration, participants) can be filled by any provider.
A record from a solo provider is legally no weaker than one from a large one, because neither is a certificate. What a small provider lacks
is the buyer's trust, not legal standing. Competitors say so openly: KI-Syndikat's page states that its participation certificate does not come
from an authority and is not state-recognised (accessed 2026-11-01).

**Who already sells it (2025–2026).**

| Provider | Format | Price per person | Proof issued | Date / URL |
|---|---|---|---|---|
| Fast Lane / Flane, "AI Literacy Training Compact" | 45 min, min. 10 learners | €49.90 (10–50) down to €19.90 (501–1,000) | Certificate | Accessed 2026-10-25 (R6 H1), prices re-listed 2026-10-28 by beri.net. https://www.flane.de/en/ai-competence-training-compact |
| QA (UK) | 40 min, with assessment | £29.99 | Certificate not stated | Listed 2026-10-28 in https://www.beri.net/article/eu-ai-act-ai-literacy-training-article-4-best-providers-coursera-copilot-academy-aws-flane ; QA's own page not reached: **UNVERIFIED** |
| KI-Syndikat (DE) | 6 weeks self-paced + 4 live hours, ~10 h; 90-min written case exam, human-graded, one free retake | €490 net | Per-person *Schulungsnachweis* in the regulator's fields + participation certificate | Accessed 2026-11-01. https://www.ki-syndikat.de/akademie/kurse/ki-kompetenz-eu-ai-act/ |
| Implisense (DE) | Remote, min. 5 people | €450, €400 from the 11th person | n/a | *Snippet only*, UNVERIFIED. https://implisense.com/en/services/ki-schulung/ |
| VWA (DE) e-learning | Basic AI course | €177.31 incl. VAT | n/a | *Snippet only*, UNVERIFIED. https://w-vwa.de/event-pdf/59388 |
| CMS (law firm) e-learning | ~45 min, "according to Art. 4" | on request | not stated | Page modified 2026-06-30. https://cms.law/en/int/publication/e-learning-artificial-intelligence-principles-and-basic-skills-according-to-art.-4-ki-vo |
| Free substitutes | Elements of AI; Microsoft Copilot Academy (in M365); Elephant 24-min SCORM; Anthropic AI Fluency | €0 | varies | beri.net 2026-10-28 (above); R6 H2; R11 J |

Read: the per-person floor for a short course *with* a certificate is about €20–50; €177–550 buys a longer course with a human-graded exam.
A 30–40 minute self-check with a record but no teaching sits at or below the floor: **$19–29 per person, 10-seat minimum**. The free 101–401
videos are the teaching; the record is what a buyer pays for.

**Automatic grading without an LLM judge.**
- *Item type.* Situational-judgment items with one keyed answer: a short workplace scenario, then "which stance is this?", "which layer is
  missing?", "which check would have caught it?". The stances and the Stack's failure signatures give a natural blueprint (14 stances ×
  5 layers + 2 meta-functions). No free text, so no judge to game.
- *Item bank.* At least three parallel variants per blueprint cell, drawn at random, options shuffled; the record names the bank version.
  Estimate 60–90 items for a 25-item form.
- *Gaming is real.* In an unproctored online selection test, a verification study flagged 13.84% of candidates as suspected cheaters
  (Aguado et al., *Spanish Journal of Psychology*, 2018; *snippet only*, UNVERIFIED on the paper:
  https://www.cambridge.org/core/journals/spanish-journal-of-psychology/article/cheating-on-unproctored-internet-test-applications-an-analysis-of-a-verification-test-in-a-real-personnel-selection-context/110A6CE01AF51A57F429AA6D932AD9C6 ).
  Answer "dumps" are sold for Scrum.org's automated PSM I exam (sales page found 2026-11-01:
  https://cciedump.spoto.net/ja/scrum-psm-i-dumps-and-exam-questions.php ).
- *Where the key lives.* A key shipped in a static page is readable by anyone who opens the developer tools. Either accept that (the record
  says "unproctored self-assessment, completion record", which is all Article 4 asks for) or score in a Cloudflare Worker that holds the key
  and stores nothing (free plan 100,000 requests/day; paid from $5/mo, R11). The name is typed and printed in the browser, so no personal
  data reaches Henrique.
- *What it cannot be.* An unproctored keyed test is evidence that a person took a measure, not that they are competent. The record should
  carry that sentence.

**What a lawyer would need** (questions to put to one; not answered here):
1. The exact product name and record wording, to check it cannot be read as a certificate of competence or of compliance.
2. Who buys: B2B only, or also consumers (EU withdrawal rights on digital content apply differently); which Member States.
3. Terms of sale: limitation of liability, "not legal advice", "does not establish compliance with Regulation (EU) 2024/1689".
4. Whether Henrique is a controller or processor if names or scores pass through any server he runs (the Worker design aims at "no").
5. Whether professional indemnity cover is needed before launch (R6 already flags it for the Article 4 pack) and its cost.
6. Whether the record may cite the Bundesnetzagentur fields by name.

**Build.** 50–80 h: blueprint and 60–90 items (the largest part, and it needs Henrique's judgment on every key), a pilot with 10–20 people
to drop items nobody or everybody gets right, the scoring page, the record PDF, seat codes through the checkout, legal page.
**Ongoing.** 2–4 h/mo: item rotation, support, Q&A changes; Worker $0–5/mo; checkout 10% + $0.50 per order.
**12 months.** Low 1 company × 10 seats × $19 = **$190**. High 12 companies × 15 seats × $29 = **$5,220**. The high case needs twelve
EU companies to find and trust a new name in a market with free and €20 options; the first ones would come from the warm network and
assessment clients, as R12 already conceded.
**Risk.** Legal-adjacent under Henrique's name; reputational if anyone reads the record as compliance; EU-only demand; price competition.
**Feeds.** Every buying company is an assessment lead; the record is the assessment pack's per-person retail. Strategic 5 (ladder 3,
audience 2: each seat puts 10–20 people through the vocabulary).

## O. Spec lint (free) + paid team report

**What it is.** A checker that scores an instruction file or spec (CLAUDE.md, AGENTS.md, a delegation brief) against the Stack's layers and
the lexical checks in the Stack v2 draft (vague quantifiers, softened directives, negations, missing success criteria). Three forms from one
rule set: a Claude skill mode, a Python CLI (standard library, like `score_audit.py`), and a static browser page. Paid layer: a team report
($49) summarising several files.

**What already exists.**

| Tool | What it checks | Price / adoption | Date / URL |
|---|---|---|---|
| AgentLint (VS Code) | 67 rules in 14 categories: hedging ("try to"), vague instructions, secrets, length, contradictions, broken links; token-cost estimate; optional deep pass with your own Anthropic key | Free, MIT; **33 installs** | Accessed 2026-11-01. https://marketplace.visualstudio.com/items?itemName=agentlint.agentlint |
| agent-rules-lint (PyPI) | AGENTS.md, CLAUDE.md, Cursor, Copilot instruction files; quality and safety | Free, MIT; v0.2.0 (2026-09-16); **164 downloads last month** | PyPI + pypistats APIs, 2026-11-01. https://pypi.org/project/agent-rules-lint/ |
| katalint (PyPI) | "configuration smells" in agent instruction files, after an arXiv catalogue (2606.15828; not read, UNVERIFIED) | Free, MIT; v0.1.1 (2026-07-18); **13 downloads last month** | Same. https://pypi.org/project/katalint/ |
| prlyn (PyPI) | Prompt ambiguity, instruction strength, security, tokens | Free, MIT; v0.1.5 (2026-01-03); **7 downloads last month** | Same. https://pypi.org/project/prlyn/ |
| Promptfoo | Evaluation and red-teaming (runs prompts, not a static lint) | Free MIT core; enterprise custom-priced; OpenAI announced its acquisition on 2026-03-09 | https://siliconangle.com/2026/03/09/openai-acquire-promptfoo-expand-ai-application-testing-capabilities/ |
| Vale (prose linter) | Style rules as packages (Google, Microsoft, Red Hat styles) | Free; 6,312 GitHub stars (since 2017) | GitHub API 2026-11-01. https://github.com/vale-cli/vale |

Read: static instruction-file linters are free, recent (all 2026) and barely used; nobody in the evidence charges for one. The money in this
space is enterprise evaluation (Promptfoo), which is not what a solo practice sells. What none of them has is a *model* behind the rules: they
check hygiene, not whether intent, judgment or success criteria are present. That is the gap the Stack fills, and it is a reach argument,
not a revenue one.

**Feasibility, client-side.** High. The rule set is regular expressions plus a layer checklist; the site already ships client-side JS, the
skill already ships a standard-library scorer with 4/4 tests. A browser page can lint pasted text without sending it anywhere; the skill can
add a judgment pass using the user's own model. No server, no data held.
**Build.** 20–35 h (rule set from the Stack v2 lexical section, the three front ends, tests, examples). **Ongoing.** 0.5–1 h/mo.
**12 months.** Low **$0**. High 10 team reports × $49 = **$490**. Its case is distribution: listed beside the Diagnostic in skill
directories (R11 I), it gives strangers a reason to meet the method, and each finding points to the Redline ($150–250) or the teardown.
**Risk.** Low. A lint score can be mistaken for a quality guarantee; the page should say what it does not check.
**Feeds.** Redline, teardown, the spec (P). Strategic 5 (ladder 2, audience 3).

## P. Named, versioned spec + badge

**What it is.** The Intent Doc / Minimal Viable Spec format published as a named, versioned spec with a "written to the spec" badge.

**Adoption stories (GitHub API, 2026-11-01, unless stated).**

| Spec | Started | Adoption signal | Where money appeared |
|---|---|---|---|
| Semantic Versioning | repo 2011-05-29 | 7,872 stars | None for the spec. Its author, Tom Preston-Werner, co-founded GitHub; no revenue line traced to SemVer (my reading; no source claims one) |
| Keep a Changelog | repo 2014-05-31 | 6,747 stars | None found |
| Conventional Commits | repo 2016-04-05; v1.0.0 "dovetails with SemVer", types "based on the Angular convention", CC BY 3.0 | 9,340 stars; but its tooling is larger: commitlint **18,796 stars and 15.66 M npm downloads in the week 2026-10-23 to 29**; semantic-release 24,150 stars, 4.45 M weekly downloads | None on the spec page (https://www.conventionalcommits.org/en/v1.0.0/ ) |
| AGENTS.md | repo 2025-08-19 | 25,262 stars in 14 months; "adopted by more than 60,000 open source projects and agent frameworks" (vendor figure) | Donated by OpenAI to the Linux Foundation's Agentic AI Foundation, announced 2025-12-09 (https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation ). It spread because Codex, Cursor and Copilot read the file |
| llms.txt | repo 2024-09-01 | 2,673 stars | None found |
| Agile Manifesto (2001) → Scrum.org | Scrum.org founded 2009 by Ken Schwaber (https://en.wikipedia.org/wiki/Ken_Schwaber ; the reason for leaving Scrum Alliance is disputed there, "citation needed") | "over 100,000" Professional Scrum certifications by March 2017 (Scrum.org post, *snippet only*); "over 1,183,000" held globally (Scrum.org certification list, undated, *snippet only*, UNVERIFIED) | Paid automated exam: PSM I 80 questions, 60 min, 85% pass; $150 on Scrum.org pages, $200 in 2026 third-party guides (conflict, UNVERIFIED: https://open-exam-prep.com/study-guides/scrum-master-psm/introduction/exam-facts ) |

What made them spread: a tool or a platform that reads the format (commitlint and semantic-release for Conventional Commits; the coding
agents for AGENTS.md); a pain everyone already had (version numbers, changelogs). How long: years, except where a large vendor carried it.
Where money appeared: nowhere for the spec itself; only Scrum.org monetised, through an exam employers came to ask for, about eight years
after its founding to reach the first 100,000 certificates. For Mode Fluency: P alone will not spread; P as the format O checks has a chance.
**Build.** 10–15 h (spec page, version 1.0, three worked examples, badge, changelog). **Ongoing.** 0.5 h/mo.
**12 months.** **$0–0** direct. **Risk.** Low; a named spec nobody adopts is a quiet failure, not a harmful one.
**Feeds.** O, the teardown, the assessment vocabulary. Strategic 3 (ladder 1, audience 2). Build it inside O, not before it.

## Q. Library membership

**What it is.** One subscription: the Article 4 kit (E), the template pack (D), the harness kits, check lists, the team kit (L) when it
exists; one new artefact a month.

| Benchmark | Price / figure | Date / URL |
|---|---|---|
| Prompt-template memberships on Gumroad | $8–10/mo | *Snippet only*, UNVERIFIED, 2026-11-01. https://collectionprompt.gumroad.com/l/collection-prompt ; https://maximizeai.gumroad.com/l/membership |
| God of Prompt: Starter Pack / Complete AI Bundle (lifetime, includes future products) | $20 (list $120) / $150 (list $400) | Accessed 2026-11-01. https://www.godofprompt.ai/pricing |
| Reforge (professional development, 1,400+ artifacts, 600+ guides) | $1,995/yr individual; $9,995/yr for 10 seats | Accessed 2026-11-01. https://www.reforge.com/pricing |
| Skool paid communities | Median $72/mo | R11 H, verified to 2026-10-29 |
| Monthly churn: course bundles / paid communities / hybrid | "8% to 12% … typical, 5% to 7% is strong" / 6–9% / 4–6% | Kourses, updated 2026-06-04; platform's own observation, no study cited. https://www.kourses.com/member-retention |

Read: AI template libraries race to a $20–150 lifetime price; the professional-development end (Reforge) is priced on a large catalogue and
brand. At 8–12% monthly churn a member stays about 8–12 months, so the library must add something every month to stay ahead of it, and that
is time, not marginal cost.
**Build.** 25–40 h if D and E exist (platform, catalogue, onboarding, first three monthly items). **Ongoing.** 4–8 h/mo (the monthly item).
**12 months.** Low 3 × $12 × 5 paid months = **$180**. High 40 × $19 × 5 = **$3,800**. (Five average paid months: joins spread over the
year, minus churn.) **Risk.** Paywalls the harness kits, which were planned free as lead magnets; a subscription that stalls when Henrique's
evenings do. **Feeds.** Ladder 2, audience 1: strategic 3. R12's "one SKU instead of twelve" holds only after there are twelve things.

## R. Book, 40–60k words

**Raw material on disk (word counts, 2026-11-01).** Stack v2 draft 16,268; Specifying guide 6,328; Fourteen Stances 4,607; Audit Protocol
2,521; Reference Map 2,172; essay (calculator-problem page) 1,858; Matrix 837; AI @ Workplace 101–401 slide text 13,410. About 48,000 words,
much of it slide fragments and reference tables. A book needs connective chapters, one voice and a reader's order: an edit, not an export.

| Platform / figure | Terms | Date / URL |
|---|---|---|
| Leanpub | "80% royalty rate on most sales"; no restriction on publishing elsewhere | Help page dated 2025-02-14. https://help.leanpub.com/en/articles/5468013-what-is-leanpubs-royalty-rate |
| KDP ebook | 70% of list price without VAT, less delivery (average $0.06 per unit), in 70% territories; else 35% | Accessed 2026-11-01. https://kdp.amazon.com/en_US/help/topic/G200644210 . The 70% price band ($2.99–9.99, or $2.99–12.99 from 2026-07-07 per one guide) is UNVERIFIED: https://danieljtortora.com/blog/self-publishing-royalties |
| KDP print | 50% or 60% of list less printing (60% from $9.99 on Amazon.com) | Same third-party guide, Sept 2026, UNVERIFIED |
| IngramSpark | Market access fee 1.5% → 1.875% from 2026-02-01 | https://blog.bublish.com/ingramspark-raising-prices-in-2026 (secondary) |
| KDP and free text | Will not accept content "freely available on the web unless you are the copyright owner" | Quoted from KDP guidelines in a repost; live page not read: UNVERIFIED. https://kdp.amazon.com/en_US/help/topic/G200672390 |
| Sales | Self-published nonfiction median **1,100 units lifetime** (traditional 7,100), 172 authors, 2019–2022, self-selected | Bernoff, 2023-06-30. https://bernoff.com/blog/how-many-copies-will-your-book-sell |
| Authority effect | 263 business authors (Apr–Aug 2024): median direct book revenue **$5,500**; self-published authors take 51% of revenue from non-book sources (speaking, consulting); median non-book revenue $10,000. Sponsored by publishing and ghostwriting firms; no control group | Bernoff, 2024-11-21. https://bernoff.com/blog/business-book-roi-fact-among-serious-authors-only-1-3-of-revenue-comes-directly-from-the-book |
| Fee premium claims | "authors charge $345 vs $251 per hour"; "20–50% fee increases" | Publisher and ghostwriter marketing, no method shown: lore, not evidence |

Read: the 1,100 median is lifetime, from authors who answered a book consultant's survey; a first book from an author with 71 GitHub stars
and a small LinkedIn should plan on tens to a few hundred copies in year one. The authority effect is plausible and unmeasured: the best data
shows authors' money comes mostly from around the book, not that the book caused it.
**Licence.** R11 F holds that a compiled edition of the CC BY-SA documents must stay CC BY-SA. As sole author Henrique could license new text
differently; whether any included text has another rights holder is a question for him (and a lawyer if so). A free CC edition and KDP's
"freely available" rule need the copyright-owner route; KDP Select's exclusivity would conflict with a free edition (from memory of KDP's
terms, UNVERIFIED this session).
**Build.** 70–120 h (structure, connective chapters, one voice, copy-edit, cover, layout for ebook and print, ISBN). Much of it must be
Henrique's own writing, since the book carries his name. **Ongoing.** 0.5–1 h/mo.
**12 months.** Low 30 copies × $4 royalty = **$120**. High 300 × $7 = **$2,100**. **Risk.** Hours: the largest single build on the list
after K. **Feeds.** Authority with strangers for the assessment and talks; ladder 2, audience 2: strategic 4. It overlaps R11 F (the
e-book); R is F plus print, retail distribution and new text.

---

## One ranking: all seventeen

Midpoints, same arithmetic as R11 (script output in the appendix). "Total h" = mid build + 12 × mid ongoing.

| Rank (total) | # | Candidate | Mid 12-mo gross | Total h | $/h incl. ongoing | $/h build only | Strategic (0–6) |
|---|---|---|---|---|---|---|---|
| 1 | E | Article 4 DIY records kit | $1,286 | 32.5 | $40 | $73 | 4 |
| 2 | D | Template + kit pack | $1,052 | 29.0 | $36 | $53 | 2 |
| 3 | A | Self-paced course | $2,054 | 68.0 | $30 | $41 | 3 |
| 4 | M | GitHub Sponsors | $225 | 7.5 | $30 | $150 | 1 |
| 5 | F | Field guide e-book | $1,198 | 41.0 | $29 | $34 | 3 |
| 6 | **N** | **AI literacy record** | **$2,705** | 101.0 | **$27** | $42 | **5** |
| 7 | L | Team kit, offline | $810 | 34.0 | $24 | $32 | 5 |
| 8 | C | Licensing L&D / Udemy | $707 | 37.0 | $19 | $28 | 3 |
| 9 | **Q** | **Library membership** | $1,990 | 104.5 | $19 | $61 | 3 |
| 10 | K | Team edition, hosted | $2,105 | 116.0 | $18 | $26 | 4 |
| 11 | I | Paid skills listing | $190 | 17.0 | $11 | $24 | 0 |
| 12 | **R** | **Book** | $1,110 | 104.0 | $11 | $12 | 4 |
| 13 | J | Certification | $790 | 76.0 | $10 | $20 | 2 |
| 14 | H | Paid community | $2,466 | 250.0 | $10 | $247 | 4 |
| 15 | **O** | **Spec lint** | $245 | 36.5 | $7 | $9 | **5** |
| 16 | G | Paid newsletter tier | $672 | 197.0 | $3 | $134 | 5 |
| 17 | **P** | **Named spec** | $0 | 18.5 | $0 | $0 | 3 |

(E shows $73/h on build hours here and $74/h in R11: rounding of $1,286 ÷ 17.5.)

**By strategic value:** 5 — N, L, O, G; 4 — E, K, H, R; 3 — A, C, F, Q, P; 2 — D, J; 1 — M; 0 — I. Among the fives, O costs the fewest
hours and carries no risk or decision conflict; N has the most money and the most risk; G is time, not a product.

All five new candidates together: $490 (low) to $11,610 (high) gross in 12 months. None of them, alone or together at the low case,
replaces one assessment in year one. R12's claim that a regulation removes the audience problem does not hold: the demand exists, but so
do cheaper and free suppliers, and the buyer still has to find and trust the name.

## Recommendation

**First build: E, the Article 4 do-it-yourself records kit, with one addition from N:** a per-person record sheet in the Bundesnetzagentur
fields (type of measure, content, duration, participants) that a company fills after its people watch the free 101–401 videos. That is
the manual form of N, costs 2–3 extra hours, and tests whether anyone wants per-person records before 50–80 hours go into a scored
assessment. If Henrique keeps the storefront closed (decision 2 below), build O first instead: it needs no price.

**Sequence of three.**
1. **E + record sheet** (17–23 h). Revenue and leads; same template as the Article 4 pack and the assessment.
2. **O with P folded in** (25–40 h together). The spec is the linter's rule document; the evidence says a format spreads through the tool
   that reads it (commitlint has twice the stars of Conventional Commits and 15.7 M weekly downloads). Free; it builds reach, which every
   paid candidate lacks.
3. **N, the scored record**, only when two conditions hold: at least three E buyers or one assessment client ask for per-person records, and
   a lawyer has reviewed the wording (questions in N). Until then its 50–80 hours buy risk ahead of demand.

Not now: Q (needs the catalogue first and 4–8 h a month), R (70–120 h of Henrique's own writing; revisit when the Stack v2 and the essay
have readers), and R11's "not now" list unchanged.

## Decisions to revisit (Henrique's call)

| Decision on file | What the evidence says | Suggested question |
|---|---|---|
| "Sell certificates against Google and Coursera": would not do (OFFER_BRAINSTORM) | The refusal still holds for *certificates*: the Q&A says none is needed, the Bundesnetzagentur says training needs no certification, free certificates exist (Anthropic, Google, R11 J), and €19.90 courses issue them. But a *record of a measure taken* is what the Q&A names, and it is not a certificate. | Keep the refusal; allow a per-person "literacy record" that never claims competence or compliance, once a lawyer has seen the wording? |
| No prices on the site or README (2026-10-29) | Every paid self-serve candidate (A, C, D, E, F, K, L, N, Q, R, paid O) needs a public price at checkout; a book's retailer page shows one too. Only O-free, P and M avoid it. | May the site link to a priced storefront (Gumroad, Lemon Squeezy, Leanpub), keeping prices off the site's own pages? If not, the first build is O. |
| Team edition: "no for now; revisit after the first paid assessment" (CLAUDE.md 2026-10-25) | N sold by seats is a team product. Built client-side it is L's shape (no data held); with server-side scoring that stores nothing it stays close to that; with stored results it becomes K, with GDPR duties. | Does N fall under the team-edition decision (same trigger), or is a seat-coded record that stores no results outside it? |

## Biggest risk

Selling the record (N) or the kit (E) as Article 4 compliance. The Q&A says there is no duty to measure knowledge and no certificate; a
scored record marketed as proof would be inaccurate, would put a non-lawyer's name on a legal claim, and would compete on price with
€19.90 certificates and free courses. Second: the hours. N, Q and R each cost about 100 hours in year one, ten to twenty weeks of
Henrique's whole budget, and none of them returns one assessment's fee at current reach.

---

## Appendix: arithmetic (Python, verbatim output)

Script: session scratchpad `r14.py`. gross = units × price (× months where recurring). Net: Gumroad-style 10% + $0.50 per payment; N also
subtracts a $5/mo Worker in the high case; book royalties are already net of retailer share and printing. R11 rows use R11's midpoints.

```
N AI literacy record (scored, per person)
   low  1 company x 10 seats x $19 = $190 gross, $170 net
   high 12 companies x 15 seats x $29 = $5,220 gross, $4,632 net
   mid gross $2,705; build 50-80 h (mid 65.0); ongoing 2-4 h/mo (mid 3.0)
   rank metric: mid revenue / mid build h = $42/h; incl. 12 mo ongoing = $27/h
O Spec lint (free) + paid team report
   low  0 paid reports = $0 gross, $0 net
   high 10 team reports x $49 = $490 gross, $436 net
   mid gross $245; build 20-35 h (mid 27.5); ongoing 0.5-1 h/mo (mid 0.75)
   rank metric: mid revenue / mid build h = $9/h; incl. 12 mo ongoing = $7/h
P Named, versioned spec + badge
   low  no paid product = $0 gross, $0 net
   high no paid product = $0 gross, $0 net
   mid gross $0; build 10-15 h (mid 12.5); ongoing 0.5-0.5 h/mo (mid 0.5)
   rank metric: mid revenue / mid build h = $0/h; incl. 12 mo ongoing = $0/h
Q Library membership (all kits, monthly additions)
   low  3 members x $12 x 5 mo = $180 gross, $154 net
   high 40 members x $19 x 5 mo = $3,800 gross, $3,320 net
   mid gross $1,990; build 25-40 h (mid 32.5); ongoing 4-8 h/mo (mid 6.0)
   rank metric: mid revenue / mid build h = $61/h; incl. 12 mo ongoing = $19/h
R Book, 40-60k words (KDP + Leanpub + print)
   low  30 copies x $4 royalty = $120 gross, $120 net
   high 300 copies x $7 royalty = $2,100 gross, $2,100 net
   mid gross $1,110; build 70-120 h (mid 95.0); ongoing 0.5-1 h/mo (mid 0.75)
   rank metric: mid revenue / mid build h = $12/h; incl. 12 mo ongoing = $11/h

ALL 17, sorted by mid gross / (mid build + 12 x mid ongoing):
 1. E Article 4 DIY records kit                     mid $ 1,286 | total h   32.5 | $  40/h total | $  73/h build | strategic 4
 2. D Template + kit pack                           mid $ 1,052 | total h   29.0 | $  36/h total | $  53/h build | strategic 2
 3. A Self-paced course                             mid $ 2,054 | total h   68.0 | $  30/h total | $  41/h build | strategic 3
 4. M GitHub Sponsors                               mid $   225 | total h    7.5 | $  30/h total | $ 150/h build | strategic 1
 5. F Field guide e-book                            mid $ 1,198 | total h   41.0 | $  29/h total | $  34/h build | strategic 3
 6. N AI literacy record (scored, per person)       mid $ 2,705 | total h  101.0 | $  27/h total | $  42/h build | strategic 5
 7. L Team kit, offline                             mid $   810 | total h   34.0 | $  24/h total | $  32/h build | strategic 5
 8. C Licensing L&D / Udemy                         mid $   707 | total h   37.0 | $  19/h total | $  28/h build | strategic 3
 9. Q Library membership (all kits, monthly additions) mid $ 1,990 | total h  104.5 | $  19/h total | $  61/h build | strategic 3
10. K Team edition, hosted                          mid $ 2,105 | total h  116.0 | $  18/h total | $  26/h build | strategic 4
11. I Paid skills listing                           mid $   190 | total h   17.0 | $  11/h total | $  24/h build | strategic 0
12. R Book, 40-60k words (KDP + Leanpub + print)    mid $ 1,110 | total h  104.0 | $  11/h total | $  12/h build | strategic 4
13. J Certification                                 mid $   790 | total h   76.0 | $  10/h total | $  20/h build | strategic 2
14. H Paid community                                mid $ 2,466 | total h  250.0 | $  10/h total | $ 247/h build | strategic 4
15. O Spec lint (free) + paid team report           mid $   245 | total h   36.5 | $   7/h total | $   9/h build | strategic 5
16. G Paid newsletter tier                          mid $   672 | total h  197.0 | $   3/h total | $ 134/h build | strategic 5
17. P Named, versioned spec + badge                 mid $     0 | total h   18.5 | $   0/h total | $   0/h build | strategic 3

Sum of the five new candidates: low $490, high $11,610
```
