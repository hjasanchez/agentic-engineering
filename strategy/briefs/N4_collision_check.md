## Task: Collision-check 32 shortlisted umbrella names (domains, existing companies/products, trademarks, GitHub, handles, search shadowing) and produce a verdict table.
Read /home/user/meta-strategy/briefs/00_SHARED_CONTEXT.md and the Method section of /home/user/meta-strategy/research/R3_naming_and_brand_check.md first (reuse its RDAP/DNS method and its limits).
### Shortlist (check every one; slug = lowercase, no spaces/hyphens unless noted)
Agentwise; Agentry; Agents at Work; Deliberate AI; Agent Stance; AI Stance; Directed AI; Modus AI; Agent Mandate; Human-Led AI;
AI Gears; Agent Lead; Run Your AI; Delegated Intelligence; Working Intelligence; AI Steering; AI Conduct; Steer AI; Agent Method;
AI Kata; AI-Rated; Off Autopilot; Modewise AI; AgentModes; Agentwork; AI Discipline; AI Principal; Chief of Agents;
AI Ground School; Agent Charter; AI Habits; AI Mode Standard.
### For each name produce one row
name | .com | .ai | .io (AVAILABLE[R]/TAKEN[R|D]/UNKNOWN, method tag as in R3) | existing company/product/software with this exact
name (URL, what it does, how big; "none found" if a search of the exact phrase in quotes returns nothing relevant) |
trademark hits (see below) | GitHub org/repo with the slug (WebFetch github.com/<slug>; api is blocked) | handle collisions
(@slug on YouTube/X/LinkedIn via web search only) | search shadowing (does a Google/Bing search for the exact phrase get
dominated by an incumbent, e.g. Google's "AI Mode" for anything with "mode"; note the top 3 results) | verdict
CLEAR / CROWDED / TAKEN / GENERIC | one-line note.
### Trademark check
Try EUIPO eSearch plus (https://euipo.europa.eu/eSearch/) and USPTO (https://tmsearch.uspto.gov/) and WIPO Global Brand DB
(https://branddb.wipo.int/) via WebFetch/curl first for the exact words in classes 41 (education/training) and 42/35
(consulting). If those block automated access, you MAY use the person's Chrome browser as a read-only fallback: first load
the skill `anthropic-skills:chrome-browser` via the Skill tool and follow it; open a new tab, search, read results, never log
in, never submit forms other than the search box, never post. If Chrome tools are unavailable, mark trademark cells UNVERIFIED
and say why. Report hits as "live mark in class X owned by Y (URL)" or "no exact hit found" or UNVERIFIED.
### Output: /home/user/meta-strategy/naming/N4_collision_check.md with the table, the method section, and a final "Top 10 by
cleanliness" list (names with no exact-name company, no live mark found, at least .com or .ai available, no shadowing).
### Budget: ≤120 HTTP requests, ≤50 web searches, ≤25 Chrome actions. 60 minutes. No helpers. Model: opus.
### Non-goals: do not pick a winner; do not judge brand quality; do not check social handles beyond a web search.
### If uncertain: UNKNOWN/UNVERIFIED beats a guess. An "AVAILABLE" needs RDAP 404 or an explicit registrar "not registered".
### Return ≤12 lines: counts by verdict, the Top 10 by cleanliness, and any trademark live-mark hits.
