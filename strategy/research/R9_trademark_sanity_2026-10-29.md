# R9 — Trademark sanity search: "Mode Fluency" (2026-10-29)

**This is a sanity check, not legal advice and not a clearance opinion.** It records what free public registers and web searches
returned on 2026-10-29 through an agent's WebFetch and WebSearch tools. Where a register blocked the fetch, the row says exactly
what happened. Nothing here was checked by a lawyer.

Brief: `strategy/briefs/W21_trademark_sanity.md`. Earlier work: `strategy/research/R3_naming_and_brand_check.md` (2026-10-21,
no trademark search possible) and `strategy/naming/N4_collision_check.md` (USPTO backend worked then; EUIPO, TMview and WIPO blocked).

## 1. Read: CAUTION (leaning clear in the US; EU, UK and international unverified)

- **US: no exact or near-identical mark found.** No live or dead mark reading MODE FLUENCY, MODEFLUENCY or FLUENCY MODE turned up
  in the Trademarkia mirror of the USPTO register (0 results for `modefluency` and for `"mode fluency"`), and no web result shows
  a company, product or course using the name.
- **Why not "clear":** the registers that matter most for an EU-based practice (EUIPO, TMview, WIPO Madrid, UKIPO) all blocked
  automated access today, as they did on 2026-10-21. Their status is UNVERIFIED.
- **"Fluency" is a crowded element in classes 41 and 42.** Several live marks use FLUENCY alone or in a compound (section 3).
  None combines it with MODE, and the ones in class 41 are in language teaching or translation; the class 42 ones are in
  influencer commerce, clinical documentation and an unconfirmed biotech listing. A crowded element usually makes each
  owner's rights narrower, which helps a newcomer whose mark differs as a whole; a lawyer should confirm that reading.
- **"AI Fluency":** the one US filing (AI Fluency LLC, classes 41 and 42, AI education and AI consulting) is abandoned. No
  trademark filing by Anthropic for "AI Fluency" surfaced in any search. Anthropic uses it as a course name.

## 2. Register-by-register log

| Register | Query | Result | Date | URL or "blocked: <what happened>" |
|---|---|---|---|---|
| TMview (tmdn.org) | `mode fluency`, basic search (UI URL) | No data | 2026-10-29 | blocked: WebFetch of `https://www.tmdn.org/tmview/#/tmview/results?...basicSearch=mode%20fluency` returned an empty page (no text, no markup) |
| TMview (tmdn.org) | `mode fluency`, API | No data | 2026-10-29 | blocked: `https://www.tmdn.org/tmview/api/search/results?basicSearch=mode%20fluency...` returned `read ECONNRESET` |
| TMview (tmdn.org) | home page | No data | 2026-10-29 | blocked: `https://www.tmdn.org/tmview/` returned an empty page |
| EUIPO eSearch plus | `mode fluency` | No data | 2026-10-29 | blocked: `https://euipo.europa.eu/eSearch/#basic/.../mode%20fluency` returned `read ECONNRESET` |
| EUIPO eSearch plus | home page | No data | 2026-10-29 | blocked: `https://euipo.europa.eu/eSearch/` returned `read ECONNRESET` |
| EUIPO eSearch plus | `fluency` | No data | 2026-10-29 | blocked: `read ECONNRESET` (third attempt) |
| WIPO Global Brand Database | brand name `mode fluency` | No data | 2026-10-29 | blocked: `https://branddb.wipo.int/en/similarname/results?...` is a JavaScript shell behind an ALTCHA captcha (`api.branddb.wipo.int/captcha`); no results without solving it. Not attempted further (captchas are off limits) |
| USPTO Trademark Search (official) | `"mode fluency"` | No data | 2026-10-29 | blocked: `https://tmsearch.uspto.gov/search/search-results?query=%22mode%20fluency%22` returned only the heading "Trademark search" (results load by JavaScript). A direct query to the search backend, which worked on 2026-10-21, was refused by this session's permission policy and not retried |
| USPTO via Trademarkia mirror | `modefluency` | **0 results** | 2026-10-29 | https://www.trademarkia.com/search/trademarks?q=modefluency |
| USPTO via Trademarkia mirror | `"mode fluency"` | **0 results** | 2026-10-29 | https://www.trademarkia.com/search/trademarks?q=%22mode%20fluency%22 |
| USPTO via Trademarkia mirror | `mode fluency` (unquoted, fuzzy) | 17,249 fuzzy hits; first page all FLUENCY marks, none with MODE | 2026-10-29 | https://www.trademarkia.com/search/trademarks?q=mode%20fluency |
| USPTO via Trademarkia mirror | `fluency mode` | Same 17,249 fuzzy hits; first page has no mark with MODE | 2026-10-29 | https://www.trademarkia.com/search/trademarks?q=fluency%20mode |
| USPTO via Trademarkia mirror | `ai fluency` | AI FLUENCY (99165315) ranked first, abandoned; rest are FLUENCY marks | 2026-10-29 | https://www.trademarkia.com/search/trademarks?q=ai%20fluency |
| USPTO via Trademarkia mirror | `agentic fluency` | 496 hits; first page: FLUENCY GO, CQ FLUENCY, FLUENCY LAB, AGENTIC (Epic Games, cl. 9/41) | 2026-10-29 | https://www.trademarkia.com/search/trademarks?q=agentic%20fluency |
| USPTO via Trademarkia mirror | `digital fluency` | First page: same compound FLUENCY marks; no DIGITAL FLUENCY mark shown | 2026-10-29 | https://www.trademarkia.com/search/trademarks?q=digital%20fluency |
| USPTO via Trademarkia mirror | `fluency`, page 2 | 218 results; page 2 lists dead marks plus Solventum FLUENCY (pending, cl. 42) | 2026-10-29 | https://www.trademarkia.com/search/trademarks?q=fluency&page=2 |
| USPTO via Trademarkia mirror | `mode` | 1,872 results; first page: one class 41 MODE (night club services), none in 42 | 2026-10-29 | https://www.trademarkia.com/search/trademarks?q=mode |
| USPTO via Justia | `mode fluency` search; MODE record 86090220 | No data | 2026-10-29 | blocked: `https://trademarks.justia.com/search?q=mode+fluency` and `.../mode-86090220.html` both returned HTTP 403 |
| UKIPO | `mode fluency` (brief's host `search-for-trademark.service.gov.uk`) | No data | 2026-10-29 | blocked: `getaddrinfo ENOTFOUND www.search-for-trademark.service.gov.uk` (host does not resolve) |
| UKIPO | gov.uk link target | Live service is `trademarks.ipo.gov.uk/ipo-tmtext/start` | 2026-10-29 | https://www.gov.uk/search-for-trademark |
| UKIPO | `mode fluency` on the live service | No data | 2026-10-29 | blocked: `https://trademarks.ipo.gov.uk/ipo-tmtext?wordSearchPhrase=mode+fluency...` and `.../ipo-tmtext/start` both returned HTTP 403 |
| Web search | `"Mode Fluency" trademark` | No record for the phrase; only M*MODAL FLUENCY (medical software) and separate MODE and FLUENCY marks | 2026-10-29 | WebSearch; e.g. https://trademarks.justia.com/990/01/fluency-99001443.html |
| Web search | `"ModeFluency" OR "Mode-Fluency" OR "Mode Fluency"` company/app/course | No company, app or course found; results were other "fluency" language brands (Fluencia, goFLUENT, InFluency Academy, Fluency Academy) | 2026-10-29 | WebSearch |
| Web search | `Anthropic "AI Fluency" trademark application` | No filing found; "AI Fluency" appears as a course name (https://dou.ua/lenta/news/anthropic-courses-and-guides/) | 2026-10-29 | WebSearch |
| Web search | `"AI Fluency"` EUIPO / EU trade mark / class 41 | No EU or US class 41 record surfaced; UK journal hits were other AI education marks | 2026-10-29 | WebSearch |

The search tool is not an exact-phrase engine, and Trademarkia is a third-party mirror, not the register of record. "0 results"
there is a strong signal for the US, not a certificate.

## 3. Near marks a lawyer would look at (US register, via Trademarkia, 2026-10-29)

| Mark | Serial / Reg. | Owner | Class | Goods/services (short) | Status (date) | Why it matters |
|---|---|---|---|---|---|---|
| AI FLUENCY | 99165315 | AI Fluency LLC, Billings, MT | 41, 42 | AI education courses, workshops, mentorship; platform connecting users with AI consultants | **Dead/Abandoned** 2026-01-14 (no response to office action of 2025-09-30) | Same services as Mode Fluency. Dead, so no registered right, but the LLC may still use the name (common-law rights) and could refile. https://www.trademarkia.com/ai-fluency-99165315 |
| CQ FLUENCY | 98382430 / 7608318 | CQ Fluency, LLC, Hackensack, NJ | 41 | Education and entertainment; translation | Live/Registered 2024-12-17 | Live class 41 FLUENCY compound. https://www.trademarkia.com/cq-fluency-98382430 |
| FLUENCY LAB | 98710721 / 7853738 | Luz Angela Velandia Blanco, Prestatyn, UK | 16, 41 | Language teacher training, language courses, teaching materials | Live/Registered 2025-07-01 | Live class 41 FLUENCY compound; UK-based owner (UK register not checked). https://www.trademarkia.com/fluency-lab-98710721 |
| FLUENCY | 98613043 / 8275577 | Wantable, Inc., Milwaukee, WI | 35, 42 | Software platform for influencer/brand sales; influencer marketing | Live/Registered 2026-05-26 | Bare FLUENCY in class 42. Different field. https://www.trademarkia.com/fluency-98613043 |
| FLUENCY | 99001443 | Solventum Intellectual Properties Company | 42 | SaaS for clinical documentation | Live/Pending 2026-07-15 | Bare FLUENCY in class 42, pending. Different field. |
| FLUENCY | 97602539 | Immuneering Corporation | 42 | Not checked (goods not fetched) | Live/Registered 2024-09-17 | Bare FLUENCY in class 42; goods unverified. |
| FLUENCY | 85923328 | Telemundo Network Group LLC | 41 | Not checked | Dead/Cancelled 2023-08-04 | Dead; listed for completeness. |
| MODE | 99260168 | Bram Portnoy | 41 | Night club services | Live/Registered | MODE alone in class 41; unrelated field. |
| AGENTIC | 97183028 | Epic Games, Inc. | 9, 41 | Not checked | Live/Registered | Surfaced in the "agentic fluency" query; no FLUENCY element. |

Not found in any US query: MODE FLUENCY, MODEFLUENCY, FLUENCY MODE, or any mark combining MODE and FLUENCY.
Also not found: a trademark filing by Anthropic for AI FLUENCY. Mode Analytics (BI software, owned by ThoughtSpot since 2023)
may hold MODE marks in class 42; a web search could not confirm owner or status, and the Justia record was blocked (HTTP 403).

## 4. What a lawyer would need to confirm

1. **EUIPO and TMview** for MODE FLUENCY, MODEFLUENCY and FLUENCY MODE, and for FLUENCY-containing marks in classes 41 and 42,
   including Madrid designations of the EU. This is the main gap: it is the home market and nothing could be fetched.
2. **WIPO Global Brand Database / Madrid** for the same terms (captcha blocked).
3. **UKIPO** for the same terms; FLUENCY LAB's owner is UK-based.
4. **National registers** in the countries Henrique would trade from (TMview covers most EU national offices once it loads).
5. **USPTO on the official system** to confirm the mirror's 0 results, and to read the goods of Immuneering's FLUENCY (97602539)
   and any MODE marks in class 42 (e.g. Mode Analytics / ThoughtSpot).
6. **Unregistered use:** whether AI Fluency LLC (Billings, MT) still trades under that name, and whether anyone uses "Mode Fluency"
   in commerce without a filing. A register search does not catch either.
7. **Likelihood-of-confusion view:** whether a crowded FLUENCY element plus MODE gives enough distinctiveness for classes 41 and 42,
   and whether "Mode Fluency" is registrable at all or would draw a descriptiveness objection.
8. **Whether to file**, in which register (EUTM, UK, US, or Madrid) and which classes. That is a decision for Henrique and his lawyer.

## 5. Method and limits

- Tools: WebFetch (about 30 fetches) and WebSearch (6 searches), 2026-10-29. No browser, no captcha solving, no logins.
- A direct POST to the USPTO search backend (the method that worked on 2026-10-21, see N4) was refused by this session's
  permission policy; the US check therefore rests on the Trademarkia mirror.
- Only first pages of fuzzy result lists were read; marks deeper in those lists were not reviewed. Design marks, phonetic
  variants and non-English equivalents were not searched.
- Retry by hand in a browser: TMview (https://www.tmdn.org/tmview/), EUIPO eSearch plus (https://euipo.europa.eu/eSearch/),
  WIPO Global Brand Database (https://branddb.wipo.int/), UKIPO (https://trademarks.ipo.gov.uk/ipo-tmtext/start),
  USPTO (https://tmsearch.uspto.gov/).

## Addendum: TMview searched by hand in a browser (orchestrator, 2026-10-29)

TMview (tmdn.org, EUIPO-run; covers EUIPO, WIPO international registrations and the EU national offices, plus USPTO and others)
answered in the browser where the automated fetch had failed. Basic search, all offices, all statuses:

| Query | Result | Date |
|---|---|---|
| mode fluency | 4 hits, all USPTO: REMODEL FLUENCY (filed 30/09/2026, class 42) and REMODEL FLUENCY (ended, filed 18/02/2026, class 42); DIGITAL FLUENCY MODEL (ended, 2019, classes 35, 42); CULTURAL SITUATIONAL FLUENCY MODEL … (ended, 2014, class 35) | 2026-10-29 |
| modefluency | no rows found | 2026-10-29 |
| fluency mode | the same 4 USPTO hits | 2026-10-29 |

Read: no EU, international or national-EU mark contains "mode fluency" or "modefluency". The only live near mark is the US class 42
application REMODEL FLUENCY (filed 30 September 2026), which shares the word "fluency" and the string "model/mode" but not the meaning;
a lawyer would note it and most likely dismiss it. TMview states it is not an official register and has no legal effect; this remains a
sanity check, not legal advice.
