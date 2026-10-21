## Task: Measure Henrique's current public footprint so the strategy starts from real baselines.
### Goal
Know how "semi-popular" the repo and videos actually are, and what already exists under "PonicLabs", before deciding whether
to rebrand.
### Inputs
- /home/user/meta-strategy/briefs/00_SHARED_CONTEXT.md (read fully first)
- /home/user/meta-strategy/research/src_repo_readme.md (the four YouTube URLs are in it)
### Output
- Write /home/user/meta-strategy/research/R5_footprint_audit.md with:
  1. GitHub repo hjasanchez/agentic-engineering: stars, forks, watchers, created date, last push, open issues, who links to it
     (web search "hjasanchez/agentic-engineering" and "agentic-engineering" + "Sanchez"). NOTE: api.github.com is blocked in this
     sandbox; try fetching https://github.com/hjasanchez/agentic-engineering HTML directly (curl or WebFetch) and parse the
     counts, or use a web search result snippet. Record which method worked.
  2. YouTube: for each of the 4 videos (jljFm4YPHO8, WVDDf8IlG6E, R2p5aFcb0lY, p6nMtu7iH1g): title, publish date, view count,
     like count if visible, duration; channel @henriquejsanchez subscriber count and total videos. Try curl on the watch page and
     grep for "viewCount", or WebFetch. Record the method.
  3. "PonicLabs": what is it? Any website, LinkedIn page, products, domain (ponniclabs.com? poniclabs.com? check RDAP/DNS),
     other repos. Is it a brand worth keeping?
  4. Other footprint: LinkedIn profile if publicly findable (name + "PonicLabs" or + "agentic engineering"), Medium/Substack,
     X/Twitter, talks. Do not guess; only report what a search returns.
  5. Baseline table: metric | value | date observed | method.
### Acceptance criteria
- [ ] All 4 videos have view counts or an explicit FAILED-with-reason
- [ ] GitHub stars/forks reported or explicit FAILED-with-reason
- [ ] Every number has a method column
### Constraints
- Budget ≤30 requests/searches. No helpers. Read-only: never log in, never post.
### Non-goals
- Do NOT evaluate content quality. Do NOT look up private information (home address, employer details beyond what a public
  profile headline says).
### If uncertain
- Report FAILED with the reason; do not estimate.
