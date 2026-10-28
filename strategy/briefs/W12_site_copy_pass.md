# Task: site and README copy pass from Henrique's 2026-10-29 review

## 1. What and why
Henrique reviewed the live site and the README and listed changes. Apply the ones below exactly. They are his words or the
orchestrator's chosen wording; do not improvise copy beyond what is given. Repo root: C:\Users\henri\Desktop\CCode\modefluency\repo-agentic-engineering
Voice: plain, direct, no hype. Banned words: revolutionary, unlock, supercharge, game-changing, seamless, empower.

## 2. Hard rules for this task
- Use targeted string edits (the Edit tool), never whole-file rewrites. Another agent is editing docs/stack.html's diagram section
  (the `<div class="stackdiag">` block and the §2 dependency_rule section) and docs/assets/field.css and field.js at the same time.
  You may edit stack.html ONLY outside those regions (its footer ticker head and any disclaimer sentence elsewhere on the page).
  Never touch field.css or field.js.
- Do not touch prices or copy on any page except as listed. Do not add a CNAME. Do not commit.
- Keep every page valid, readable without JS, and the shared footer identical across the nine pages.

## 3. Website changes (docs/)
1. **index.html hero:** `<h1 id="hero-title">Know which mode you're in.</h1>` → `AI: Know which mode you're in.` Also the `<title>`:
   "Mode Fluency · AI: Know which mode you're in".
2. **Prices off the site, payment reframed.**
   - index.html §5 services: delete the two `<p class="sys price">` lines. Replace `<p class="svc-free">Everything on this site and in the repo is free. You pay for my time.</p>`
     with `<p class="svc-free">Everything on this site and in the repository is free to read and use. For your own team, I take on a small number of engagements at a time.</p>`.
     The "Details" button stays.
   - work.html: meta description becomes "Work with Henrique Jr. Sanchez: a fixed-scope assessment of where your team's AI work breaks, and AI @ Workplace workshops on your own workflows. Everything on the site and in the repository is free; engagements are scoped in writing."
     `<p class="free-line">Everything on this site and in the repo is free. You pay for my time.</p>` → `<p class="free-line">Everything on this site and in the repository is free to read and use.</p>`
     The intro prose paragraph → `<p>I take on a small number of engagements at a time: an assessment of where your team's AI work breaks, or a workshop built on your own workflows. Both are vendor-neutral. Scope and terms are agreed in writing before anything starts. Write to <a href="mailto:hello@modefluency.com">hello@modefluency.com</a> with a line about your team.</p>`
     Delete both `<p class="price-big">…</p>` lines (assessment and workshop). Where the assessment card said "from $3,500 · about two weeks", keep a line `<p class="sys">fixed scope &middot; about two weeks</p>` in the same place; for the workshop `<p class="sys">remote &middot; half day or full day</p>`.
     The source-note "Prices are starting points … new practice." → `Scope and terms are confirmed in writing before any work begins. There are no client testimonials on this site yet because this is a new practice.`
   - Grep the whole docs/ folder and README.md for `$1,200`, `$3,500`, `pay for`, `price`: none may remain on the site. (README: see §4.)
3. **"dross" → "noise"** everywhere in docs/ (matrix.html Muse row, stances.html Muse failure mode and the Miner failure-mode paragraph:
   "most of what comes up is noise, so without the selection discipline the noise rate reads as the tool failing…"). Also in
   MODE_FLUENCY_MATRIX.md so the document and the site agree.
4. **stances.html, stop explaining the method:** delete the paragraph at ~line 259 ("The Collaborator appears in this table as the active form
   of the Genie … shows them as 'Not placed'."). Remove the "Not placed" filter chip and the three `<span class="tag">Not placed in v3 table</span>`
   tags; make sure the filter JS does not break without that chip (check field.js or inline script for `unplaced`; if the handler is generic, nothing to do;
   if it references the chip, tell the orchestrator the exact line instead of editing field.js). Caption "The meta-pattern, from Archetypes v3" → "The meta-pattern".
   Source-note at ~line 48: rewrite without any document title or version: `Stance texts are Henrique Jr. Sanchez's own. Where a stance states its cardinal rule
   explicitly, the card quotes it; otherwise the rule comes from the guardrail column of the Matrix. Load-bearing layers are from the Matrix.`
   Section tag "§1 pantheon" → "§1 the_fourteen". Line ~251 "There may be a deeper axis under the pantheon" → "under the fourteen". Leave the Interpreter card's
   own text alone (it is his verbatim text) and list it in your return.
5. **Footer sentence (all nine pages):** "Everything on this site and in the repository is free to read and use; paid work is listed on Work with me." →
   `Everything on this site and in the repository is free to read and use; interested in a more tailored experience? Check the <a href="work.html">Work with me</a> page.`
   (keep whatever link markup the footer already uses for Work with me).
6. **Footer ticker head (all nine pages):** make the build log read as deliberate. Replace the ticker head's dim text so the line reads:
   `> cat build.log — colophon. Built by an AI agent from my written briefs; this is its own log, unedited.` Keep the `#ticker-title` id, classes and the glyph span.
7. **about.html:**
   - "…are not really AI skills. They are intelligence skills." → "…are not really AI skills. They are intelligence and collaboration skills."
   - Delete the sentence "If the method cannot diagnose its own author, it should not be sold to anyone else." (and fix the paragraph so it still reads).
   - The agent paragraph becomes: `This site was designed and built by an AI agent (Claude, working in Claude Code). It worked from written briefs (a design brief, three competing visual directions of which I chose this one, and a product spec for the nine pages) and from my own source texts. The agent wrote the code, ran its own quality checks, and wrote a report about where it departed from the spec.`
   - Delete the "Deviation report" heading and list (the `<!-- @deviations -->` … `<!-- /@deviations -->` block), the build-log table (the `<!-- @aboutlog -->` … markers and their heading), and the whole "Re-audited with its own protocol" subsection. Fix the meta description (line 10) so it no longer promises a build log and deviation report.
   - Before deleting, copy the removed HTML verbatim into C:\Users\henri\Desktop\CCode\modefluency\workspace\deliverables\about-removed-2026-10-29.html (outside the repo; create the folder if needed).
   - Then update strategy/qa/site_qa.py and strategy/qa/README.md so `--write-buildlog` and the footer check no longer expect the about.html table (keep the ticker check). Do not run the full gate; just make the script tolerate the missing markers and say so.
8. **learn.html:** delete the source-note "Videos are linked, not embedded. The four thumbnail images load from YouTube's image host…". Change "context management" → "context engineering" in AI 301.
   501 scope line → `Going hands-free: workflows as loops and graphs, the inner loop versus the outer loop, keeping costs from running away, and a first look at running models locally.`
   601 scope line → `Many agents at once: orchestration, nested subagents, who does what and when, lights-on versus lights-off operation, and what uneven model ability does to real work.`
   Keep the "coming" tags.
9. **Disclaimer sweep, all nine pages:** find and delete every sentence that exposes build mechanics or agent housekeeping to a reader
   (how images load, what is lazy, what the spec required, "the builder chose", "Henrique still has to decide", file names like _qa/…, "v3", "the brief").
   The footer ticker is the one deliberate exception. List every sentence you removed in your return (page:line, first 8 words).
10. **work.html Article 4 section:** replace the heading and the two prose paragraphs with: heading `Article 4, briefly`; one paragraph:
    `Since July 2026, Article 4 of the EU AI Act asks organisations to take measures that support their staff's AI literacy. It sets no certificate and no fixed level. The evidence pack is a plain written record of the measures you actually take, tailored to your tools and roles. It is not legal advice.`
    Keep the sources line (dated) as it is.
11. **matrix.html ~line 151:** "Stances build on <em>Archetypes of LLM-Human Interaction</em> (v3)." → "The stances grew out of an earlier set of archetypes of LLM-human interaction." Keep the rest of the paragraph.

## 4. README.md changes
- Line 5: "Website: modefluency.com *(coming)*." → "Website: [modefluency.com](https://modefluency.com)."
- Line 13: "the video series, from 101 | 20 min per level" → "the video series, from 101 onwards | <real range> per level". Get the real durations: for each of the
  four video IDs in the table (101–401), `curl -sL "https://www.youtube.com/watch?v=<id>"` and read `"lengthSeconds":"<n>"`. Report the four durations in your
  return and write the range as e.g. "45–75 min per level" rounded to 5 minutes. If YouTube blocks the fetch, write "about an hour per level" and say so.
- Learn section sentence: "…teaches you how to do it with AI." → "…teaches you how to do more and better with AI."
- Line 25: "context management" → "context engineering".
- Rows 27–28: 501 → `going hands-free: loops and graphs, inner vs outer loop, keeping costs in check, local inference`; 601 → `many agents at once: orchestration, nested subagents, lights-on vs lights-off operation, uneven model ability`.
- Line 43: link "The Fourteen Stances" to https://modefluency.com/stances.html instead of the research file.
- Work-with-me section: remove any price and the "what you pay for is my time" sentence; use: "Everything here is free to read and use. For your own team I take on a small number of engagements at a time, scoped in writing. Write to hello@modefluency.com." Keep the two offer names.

## 5. Output and acceptance
- Edits in place; nothing committed. STATUS.md at C:\Users\henri\AppData\Local\Temp\claude\C--Users-henri-Desktop-CCode-modefluency\30d2be6e-ee02-497a-9ebc-a4b5153f79ac\scratchpad\W12_STATUS.md within 15 minutes.
- Return ≤15 lines: items done by number, the four video durations, the disclaimer sentences removed (count + list path), anything skipped and why.
- [ ] `grep -rn -i "dross\|v3\|Not placed\|pay for\|\$1,200\|\$3,500\|i.ytimg\|deviation report" docs/*.html README.md` returns only the calculator-problem.html essay/matrix/stances uses of "deviation report" as a guardrail concept
- [ ] All nine footers identical; `git diff --stat` touches only docs/*.html, README.md, MODE_FLUENCY_MATRIX.md, strategy/qa/*
- [ ] The removed About HTML exists in workspace/deliverables/about-removed-2026-10-29.html
- Budget: 60 minutes. Model: opus. No helpers. If an instruction cannot be applied as written, do the nearest thing and flag it.
