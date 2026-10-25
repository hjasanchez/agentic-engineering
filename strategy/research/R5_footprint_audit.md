# R5 Footprint Audit: Henrique Sanchez / PonicLabs / agentic-engineering

Observed 2026-10-21. Read-only. About 27 requests/searches used (budget 30). No logins, no posting.

## Headline
- The repo is small: 71 stars, 7 forks, 7 watchers, 1 open issue, 24 commits, GPL-3.0. "Semi-popular" is generous. It is a real but early-stage footprint.
- The four AI @ Workplace videos have 50 to 247 views each (total 441). The channel has 2.43K subscribers and 44,804 lifetime views, and most of the channel is hydroponics/aquaponics content (the AI series is only 4 of the 85 videos and about 1% of lifetime views).
- "PonicLabs" is a hydroponics/aquaponics agritech brand (poniclabs.com, WordPress, registered 2018). It has no AI content on the site. The YouTube channel title "Henrique Sanchez (PonicLabs)" is the only place the brand touches AI.
- The AI work is not yet findable via search. Searches for the repo path, "PonicLabs", and the name plus "agentic engineering" returned nothing about Henrique.

## 1. GitHub: hjasanchez/agentic-engineering
Method that worked: WebFetch of https://github.com/hjasanchez/agentic-engineering (HTML parsed by the fetch tool). Plain `curl` to the same URL returned 403 (the sandbox blocks GitHub unless a repo is attached with add_repo; I did not attach one, as the brief did not authorise it). api.github.com was not tried (the brief says it is blocked).

| Item | Value | Source / method |
|---|---|---|
| Stars | 71 | WebFetch https://github.com/hjasanchez/agentic-engineering |
| Forks | 7 | same |
| Watchers | 7 | same |
| Open issues | 1 | same |
| Commits on main | 24 | same |
| License | GPL-3.0 | same |
| Created | Approx. 2026-03-05 (date of "Initial commit" cd80722; the repo creation timestamp itself is not shown, so treat as approximate) | WebFetch https://github.com/hjasanchez/agentic-engineering/commits/main |
| Last push | 2026-10-14 (commits "Add AI 401 section to README" and "Add files via upload"; date only, no time) | same |
| Commit cadence visible | 2026-03-05, 2026-03-18 (burst), 2026-09-24 (AI 301), 2026-10-14 (AI 401) | same |
| Account hjasanchez | 9 followers, 2 following, 1 public repo (this one), no organizations shown; bio "R&D Engineer in Biological WWT / Hydroponics Hobbyist / AI enthusiast / Author"; links to Linktree, X @iberianpoet, YouTube | WebFetch https://github.com/hjasanchez |

Who links to it:
- Web searches returned nothing that links to or mentions the repo: `"hjasanchez/agentic-engineering"` returned only generic "agentic engineering" glossary pages (uxcel, gigaspaces, addyosmani.com, etc.) and arXiv papers, none mentioning Sanchez. A second search combining "agentic-engineering" with Sanchez/AIES/"AI @ Workplace" also returned nothing relevant. Conclusion: no indexed inbound links found. UNVERIFIED whether any exist outside the search index (GitHub's own "used by"/referrer data is not public).
- Outbound: Linktree, the YouTube channel and the GitHub profile link to it or sit alongside it (Linktree lists the GitHub org OikoSol, not hjasanchez; see section 4).
- Note: the repo name "agentic-engineering" uses the generic term Karpathy popularised (already established); searching it surfaces many unrelated sources, which is a discoverability problem.

## 2. YouTube
Channel: https://www.youtube.com/@henriquejsanchez (channel id UCeNEVbHbYPaeZnNXy6csYjA), displayed name "Henrique Sanchez (PonicLabs)".

Method that worked: `curl -A "Mozilla/5.0"` on the channel page (https://www.youtube.com/@henriquejsanchez and /about) and parsing the embedded JSON. Method FAILED for individual watch pages: `curl` to /watch?v=... returned HTTP 429 for all four; WebFetch on a watch page returned only footer text. `https://www.youtube.com/oembed` worked for titles only (HTTP 200). The RSS feed URL returned 404. Consequence: exact publish dates are FAILED (only YouTube's relative age is available on the channel page, e.g. "7mo ago"); like counts are FAILED (not on the channel page; watch pages blocked). Not retried to avoid hammering a rate-limited endpoint.

| Video | Title | Views | Duration | Published (relative, as shown 2026-10-21) | Likes |
|---|---|---|---|---|---|
| jljFm4YPHO8 | AI 101 @ Workplace: Introduction to LLMs and prompts | 93 | 20:28 | "7mo ago" (approx. Mar 2026) | FAILED (watch page blocked) |
| WVDDf8IlG6E | AI 201 @ Workplace: Prompt engineering, prompt chains and workflows, quality control | 247 | 49:40 | "8mo ago" (approx. Feb-Mar 2026) | FAILED |
| R2p5aFcb0lY | AI 301 @ Workplace: Context engineering, custom bots, introduction to agents and evals | 50 | 1:02:35 | "3w ago" (approx. late Sep 2026; consistent with the 2026-09-24 repo commit) | FAILED |
| p6nMtu7iH1g | AI 401 @ Workplace: Agents, Harness engineering, determinism, add-ons, intro to loops | 51 | 1:25:14 | "6d ago" (approx. 2026-10-15; consistent with the 2026-10-14 repo commit) | FAILED |

Caveats: the channel page lists views in a compact metadata row per video; I mapped the number shown next to each title. The channel page only exposes the first rows, and view counts are not rounded for values under 1,000. The 301 and 401 videos are days to weeks old, so they will still be accruing views.

Related video found on the channel (not in the brief's list): "Context Engineering, Writing good specs for AI, and the full AI-Human Engineering Stack", 119 views, 17:56, "7mo ago".

Channel-level (from /about and channel page):
- Subscribers: 2.43K (page text "2.43K subscribers"; structured data shows 2430).
- Total videos: 85.
- Lifetime views: 44,804.
- Joined: 2019-02-14. Country: Sweden.
- Description: "Experiments with hydroponics, AI, and other videos"; channel keywords: hydroponics, aquaponics, peeponics, anthroponics.
- Channel mix: the other visible recent uploads are hydroponics/aquaponics talks and experiments (e.g. "Passive organic hydroponics using JADAM..." 300 views; "Aquaponics Virtual Conference 2024: Sustainable Hydroponic Practices" 199 views) and two poetry/music uploads. Other view figures of 1.1K to 2.3K appear on the channel page but I could not map them to specific videos (UNVERIFIED which videos).
- Channel links: Linktree (linktr.ee/henriquejsanchez) and poniclabs.com.

## 3. PonicLabs
- What it is: "Ponic Labs", an agritech/hydroponics brand. Its About page (https://poniclabs.com/about/) says: "an enterprise of engineers" exploring soil-free cultivation; "bootstrapped"; revenue ideas listed as online courses, books, consulting, technical advising, trainings and workshops; "future humanitarian collaborations". Footer reads "2018 Ponic Labs".
- Domain: poniclabs.com is live (HTTP 200, WordPress, trilingual EN/ES/PT). RDAP (via https://rdap.org/domain/poniclabs.com): registered 2018-08-18, expires 2027-08-18, status "client transfer prohibited", last changed 2026-07-19. ponniclabs.com: RDAP 404 (no data returned; not conclusive of availability, did not check further). poniclabs.org / .net returned redirects only (not followed; UNVERIFIED who holds them). poniclabs.io: no RDAP service.
- Site navigation: Services (seminars/trainings/workshops, technical advisory, design and dimensioning, commercial turnkey consultancy), Library (hydroponics, aquaponics, anthroponics, bioponics), Software Tools, Research, Blog, Shop/Merch, Spanish Aquaponics Course. Homepage tagline: "Researching Resilience". Homepage banner: "Coming soon: Solarpunk Farming Book". The Updates page says "under construction". The site contains no mention of AI, agents, or the AI @ Workplace series (searched the homepage HTML for "AI", "agentic", "artificial intelligence").
- Team page (https://poniclabs.com/team/): co-founders Henrique Sanchez (MSc Environment Engineering, 10+ years hydroponics, based in Sweden) and Martin Basterrechea (MSc Bioinformatics, software developer, Denmark); core member Akarsh Annaiah. Described as "very small, mostly-remote". So PonicLabs has at least one other named co-founder: relevant to the "solo founder" assumption and to who owns the brand. UNVERIFIED: legal entity, ownership split.
- Web search for "PonicLabs" returned no results about it (only similarly named companies: PION Labs, Ponalab Biogrowth, Ponic Kit). It has essentially no search presence beyond its own properties.
- Other repos: none under hjasanchez besides agentic-engineering. Linktree lists a separate GitHub org OikoSol (https://github.com/OikoSol/), contents not inspected.
- Is it worth keeping? Evidence for the orchestrator (not a content judgement): the name literally means "-ponics Labs" (hydroponics). It is semantically tied to agriculture, has a co-founder, and a hydroponics audience that differs from the knowledge-worker/SME target. For an AI-literacy brand it is a mismatch and shares no audience with it; its one asset is an existing 2018 domain and YouTube name recognition (small). A rebrand would still need an owner check with the co-founder for the PonicLabs name; a personal-name brand or a new name avoids that.

## 4. Other footprint
Only what searches and public pages returned. The primary source is the owner's own Linktree (https://linktr.ee/henriquejsanchez, fetched 200); that page is self-declared, not independent.
- LinkedIn: https://www.linkedin.com/in/henriquejsanchez/ is listed on the Linktree. WebFetch returned HTTP 999 (blocked), so headline, followers and content are FAILED/UNVERIFIED. A web search for the name plus "PonicLabs agentic engineering LinkedIn" returned no LinkedIn profile.
- X/Twitter: https://x.com/iberianpoet (poetry handle per Linktree; not fetched, content UNVERIFIED). Bluesky: bsky.app/profile/iberianpoet.bsky.social (listed; not fetched).
- GitHub: hjasanchez (9 followers) and org OikoSol (listed on Linktree).
- ResearchGate profile and an Amazon author page (listed on Linktree; not fetched, so book/paper content UNVERIFIED). Henrique's GitHub bio says "Author".
- Instagram accounts and other personal/hobby links also appear on the Linktree; not relevant and omitted deliberately.
- Old YouTube channel under the pen name, listed on Linktree as "Old YouTube Channel". This matches the pen-name persona in the shared context; not fetched.
- Medium/Substack/talks: no search result found for any. The web searches run (`"PonicLabs"`, name + PonicLabs + agentic engineering, and repo path) returned none. Past talk/webinar footprint exists in hydroponics: "Aquaponics Virtual Conference 2024" video and "Low-Tech Hydroponics @ Museum of the Future" (2025) on the channel. No AI talks found.
- Discord: an OikoSol Discord and a "Clean Air Brigade" Discord are listed on the Linktree (unrelated to AI).

## 5. Baseline table

| Metric | Value | Date observed | Method |
|---|---|---|---|
| GitHub stars (hjasanchez/agentic-engineering) | 71 | 2026-10-21 | WebFetch of repo HTML page |
| GitHub forks | 7 | 2026-10-21 | WebFetch of repo HTML page |
| GitHub watchers | 7 | 2026-10-21 | WebFetch of repo HTML page |
| GitHub open issues | 1 | 2026-10-21 | WebFetch of repo HTML page |
| Commits on main | 24 | 2026-10-21 | WebFetch of repo HTML page |
| Repo created | approx. 2026-03-05 (initial commit date) | 2026-10-21 | WebFetch of commits page |
| Last push | 2026-10-14 | 2026-10-21 | WebFetch of commits page |
| GitHub profile followers | 9 | 2026-10-21 | WebFetch of profile page |
| Inbound links to repo found | 0 | 2026-10-21 | 2 web searches (no result mentions it) |
| YouTube AI 101 views | 93 | 2026-10-21 | curl of channel page, parsed JSON |
| YouTube AI 201 views | 247 | 2026-10-21 | same |
| YouTube AI 301 views | 50 | 2026-10-21 | same |
| YouTube AI 401 views | 51 | 2026-10-21 | same |
| AI series total views | 441 (sum of the four) | 2026-10-21 | arithmetic on the above |
| YouTube likes (all four) | FAILED: watch pages return HTTP 429 to curl; WebFetch returns footer only | 2026-10-21 | curl, WebFetch |
| YouTube exact publish dates (all four) | FAILED: only relative ages available (see table in section 2) | 2026-10-21 | curl of channel page |
| Video durations | 20:28 / 49:40 / 1:02:35 / 1:25:14 (101/201/301/401) | 2026-10-21 | curl of channel page, parsed JSON |
| Channel subscribers | 2.43K (2430 in structured data) | 2026-10-21 | curl of channel /about |
| Channel total videos | 85 | 2026-10-21 | curl of channel page |
| Channel lifetime views | 44,804 | 2026-10-21 | curl of channel /about |
| Channel joined | 2019-02-14 | 2026-10-21 | curl of channel /about |
| poniclabs.com live | Yes (HTTP 200, WordPress, EN/ES/PT) | 2026-10-21 | curl |
| poniclabs.com registered / expires | 2018-08-18 / 2027-08-18 | 2026-10-21 | RDAP via rdap.org |
| Web search presence for "PonicLabs" | none about it | 2026-10-21 | WebSearch |
| LinkedIn profile content | FAILED: HTTP 999 | 2026-10-21 | WebFetch |

## Open questions / anomalies
1. Likes and exact publish dates need a browser or the YouTube Data API; a human can read them in seconds on the watch pages.
2. The AI 301 and 401 videos are new (3 weeks and 6 days old); their view counts are not yet representative.
3. Does co-founder Martin Basterrechea have a stake in the PonicLabs name? Matters before any use or retirement of the brand.
4. LinkedIn follower count and headline unverified (blocked). This is the likely channel for the non-technical knowledge worker and SME audience.
5. Name collision: the repo name "agentic-engineering" and the GitHub handle do not surface in search for the generic term (competes with many glossary, paper and tool pages).
