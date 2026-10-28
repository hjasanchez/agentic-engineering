# R8: Title options for the essay now called "The Calculator Problem"

Run date: 2026-10-29. Brief: `strategy/briefs/W15_essay_title_research.md`. Read-only research; nothing on the site was changed.

**Input gap.** The brief's second input, `C:\Users\henri\Documents\Hayen Mill\0. prescreening\1.1 calculator problem.md`, does not exist
at that path (checked 2026-10-29; the folder exists, the file does not, and a name search of Documents found no match). The other model's
candidates and terms are taken from the brief's own list; its reasoning was not read. **Brief correction:** the essay's "where the
analogy breaks" section is §3, not §4; §4 is the cockpit.

**Decision status.** `strategy/HANDOFF.md` §2 records "Essay keeps the title 'The Calculator Problem'". This memo reopens that decision
only because Henrique commissioned W15. If the title changes, that row needs updating.

## 1. What the essay argues (five lines)

1. Papert (1980): literacy is knowing *when* to use the machine, not only how. Swap computers for AI.
2. The buttons are mostly taught; the losses sit at the interface between purpose and execution (S&P 42%, March 2025; METR's feeling-vs-fact gap, July 2025 / Feb 2026).
3. Calculators show the curriculum can move up a level if foundations come first and the checking is redesigned (NCTM 1980; Hembree & Dessart 1986; Ellington 2003). That is the "calculator problem": for which problems, when, and who checks.
4. The analogy breaks (§3): LLMs are probabilistic and fluently wrong, and they reach into the reasoning layer, so there is no clean line. The better analogy is the cockpit (§4): skilled crews fail through **mode confusion**, and training alone does not fix complacency (NTSB 2014; FAA 2013; Parasuraman & Manzey 2010).
5. So the skill is **mode fluency** (§5): knowing which mode you are in across stance, structure, autonomy and ambition, choosing it on purpose, and checking the right layer when work fails.

**Where the calculator is load-bearing:** the lede, all of §2, the sentence "That is the calculator problem", the opening of §3, and the
closing line "You may use the calculator. You still sign the exam." **Where it is dismantled:** §3 calls it "a flattering comparison";
§4 and §5, the best-sourced part of the essay, run on aviation and on the word *mode*. The home page §6 quotes Papert, not the
calculator. The stances, stack and matrix pages do not depend on the title.

**What each candidate forces to change.** Every candidate changes the same title slots: `<title>`, `data-title`, the `cat essays/...md`
sys-line, `<h1>`, the meta description, the nav label on all 9 pages, the home §6 `<h2>`, README.md line 42. Beyond those:

| Candidate | In-body sentences that would have to change |
|---|---|
| Keep "The Calculator Problem" | None. |
| Mode Confusion | Only line 74, "That is the calculator problem." §4 already introduces the term ("Aviation has a name for one version of this: mode confusion") and §5 is its cure. Lede and closing line can stay. |
| Which Mode Are You In? | Line 74. The page already ends with the CTA "? Which mode are you in?", which would then repeat the title. |
| The Fluency Illusion | Line 74; a new paragraph defining the illusion (Bjork) and reconciling it with "Mode Fluency" and with the AI Fluency credit in §6. The METR paragraph becomes the thesis, not a side point. |
| No Clean Line | Line 74; the phrase moves from §3 to the title, so §3 would need to become the centre of the essay. |
| The Who-Checks Problem | Line 74; §2–§4 reweighted toward verification; §5's four axes no longer follow from the title. |
| The Offloading Problem | Line 74; new evidence on cognitive offloading (not cited today); lede. |
| The Second-Brain Problem | Line 74; new framing throughout (the essay never discusses memory or note-taking). |
| The Autopilot Problem | Line 74; §4 reframed from mode confusion to handover. |
| Cognitive Debt | Line 74; new evidence (Kosmyna 2025 is not cited); the essay's thesis changes from "choose the mode" to "AI erodes thinking". |

## 2. Candidates

All collision searches were run on 2026-10-29 (web search plus arXiv/ORA pages fetched). "None found" means none in those searches, not
trademark clearance.

| Candidate | Meaning in one line | Fit with "Mode Fluency" | Collisions found | SEO / discoverability | Cost to change | Verdict |
|---|---|---|---|---|---|---|
| **The Calculator Problem** (current) | We have handled a capable machine before; the question is which problems it is for, and who checks. | Indirect: the word "mode" never appears in the title. | No essay of this name found (2026-10-29), consistent with R3 (2026-10-21: CLEAR, .com and .dev unregistered). Close neighbours: Potkalitsky, "The Calculator / AI Analogy: A Broken but Useful Tool for Thought" (Substack, 30 Jul 2023) https://nickpotkalitsky.substack.com/p/the-calculator-ai-connection-a-broken ; Voinea, Porsdam Mann, Savulescu & Earp, "The calculator analogy: epistemic virtues for using LLMs", *Technology in Society* 85:103198, 13 Dec 2025 (see §2a). | Poor. A search for the exact phrase returns maths-teaching and calculator pages. It also now sits next to a peer-reviewed Oxford paper with near-identical framing. R3 (2026-10-21) rated it "confusing and negative". | Zero. | Defensible fallback. |
| **Mode Confusion** | The failure aviation named: skilled people with working automation who do not know which mode they are in. | Exact: the title names the failure, the brand names the cure. | No AI essay, book or product with this title found. An established human-factors term: NTSB AAR-14/01 (2014); FAA PARC/CAST (2013); Rushby, Crow & Palmer, DASC 1999 https://www.csl.sri.com/papers/dasc99/dasc99.pdf ; Spencer, *Cockpit Automation and Mode Confusion* (Air Univ. 2000, reprint 2012) https://readings.com.au/product/9781286864111/9781286864111 . No AI-specific "mode confusion" concept found. A 2026 Mollick post on confusing AI product modes was seen only through a mirror; its date and wording are unverified. | Good for the brand: it puts "mode" into the title and borrows a term with 25+ years of literature. Risk: Google's "AI Mode" shadows the word (HANDOFF §2), and readers may read "modes" as product settings until the lede corrects them. | Low: title slots plus one sentence. | **Recommend.** |
| **Which Mode Are You In?** | The diagnostic question as the title. | Strong; it repeats the site's CTA. | Crowded: Buildtolaunch Substack reframes AI use as "What mode am I in?" https://buildtolaunch.substack.com/p/ai-tool-paralysis-daily-ai-workflow-universal ; other "modes of working with AI" frameworks: Kentz https://mikekentz.substack.com/p/the-butler-thinking-sparring-framework , AI with ALLIE https://aiwithallie.beehiiv.com/p/the-four-modes-of-ai-interaction (all undated in results, seen 2026-10-29). | Weak: generic question, many near matches. | Low, but duplicates the end-of-page CTA. | Better as the CTA it already is. |
| **The Fluency Illusion** (other model's top pick) | Smooth output and easy use mistaken for competence or correctness. | Poor. A site called Mode Fluency headlining "fluency is an illusion" contradicts its own name. It also reads as a dig at Anthropic's *AI Fluency* course, which §6 credits as the baseline. | Established learning-science term: fluency mistaken for learning (Bjork lineage; Bjork, Dunlosky & Kornell, *Annu. Rev. Psychol.* 64:417–444, 2013, https://doi.org/10.1146/annurev-psych-113011-143823 ; Yan, Bjork & Bjork 2016 summary https://sites.edb.utexas.edu/slam/on-the-difficulty-of-dislodging-learners-illusions-about-how-best-to-learn/ ). Already applied to AI: LessWrong "Mirror thinking" https://www.lesswrong.com/posts/a7NHb67br4siS436y/mirror-thinking ; iatroX blog https://www.iatrox.com/blog/illusion-of-learning-ai-fluency-vs-recall ; DEV "The Fluency Fallacy" https://dev.to/tawe/the-fluency-fallacy-why-ai-sounds-right-but-thinks-wrong-23dn ; Selsbæk-Reitz, *Promptism* ("fluency trap") https://technicspub.com/promptism/ . No book or essay with the exact title found (2026-10-29). | Borrowing helps search volume and confuses meaning. In learning science it means ease of study mistaken for learning; the essay is about choosing modes. | High: new thesis paragraph and brand reconciliation. | Reject. |
| **No Clean Line** | No line exists beneath which delegation is safe. | Neutral. | None found (2026-10-29). | Near zero; abstract. | Medium: §3 would become the centre. | Reject; good as it is, a §3 sentence. |
| **The Who-Checks Problem** | Verification is the bottleneck. | Weak; covers one layer (evaluation/judgment). | Close: Ahuja, "The Checking Problem: What must be true before AI ships in a regulated firm", arXiv:2607.28666, 25 Jul 2026 https://arxiv.org/abs/2607.28666 ; AWS Builder "Who Checks the Checker" https://builder.aws.com/content/3FTzerTPHx1IwLyLX2MIox9XZwf/dear-human-7-who-checks-the-checker | Weak, awkward hyphen. | Medium. | Reject. |
| **The Offloading Problem** | Handing thinking to the tool erodes it. | Weak. | "Cognitive offloading" is an established term: Risko & Gilbert, *Trends Cogn. Sci.* 20(9):676–688, 2016, https://doi.org/10.1016/j.tics.2016.07.002 . "The cognitive offloading problem" is a section heading in an Imperial College blog post https://medlearn.imperial.ac.uk/innovation/?p=345 . | Crowded topic. | High: new evidence; implies a deskilling thesis the essay does not make. | Reject. |
| **The Second-Brain Problem** | Outsourced memory. | None. | Forte, *Building a Second Brain* (Simon & Schuster, 14 Jun 2022) https://www.simonandschuster.ca/books/Building-a-Second-Brain/Tiago-Forte/9781982167400 and the PKM community around it. | Searchers would expect note-taking advice. | High. | Reject. |
| **The Autopilot Problem** | Handover between a human and automation. | Medium. | Armstrong, Bradshaw, Beckstead & Sandberg, "The autopilot problem" (FHI, 2014, listing only) https://www.fhi.ox.ac.uk/?p=21994 ; Tesla Autopilot associations; Tian Pan, "copilot vs autopilot" (4 May 2026) https://tianpan.co/blog/2026-05-04-copilot-vs-autopilot-ai-automation-spectrum | Car-dominated results. | Medium. | Reject; Mode Confusion is the more precise term from the same section. |
| **Cognitive Debt** (borrowed) | Short-term ease, long-term cognitive cost. | None. | Kosmyna et al., "Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task", arXiv:2506.08872, v1 10 Jun 2025, v2 31 Dec 2025, MIT Media Lab, preprint, not peer reviewed, n=54 https://arxiv.org/abs/2506.08872 . Also Storey, "From Technical Debt to Cognitive and Intent Debt", arXiv:2603.22106, 23 Mar 2026: team-level erosion of shared understanding https://arxiv.org/abs/2603.22106 ; LeadDev coverage (Jun 2026) https://leaddev.com/ai/ai-coding-creates-two-kinds-of-debt-youre-only-measuring-one | High volume, two existing owners with different meanings. | High: changes the thesis. | Reject. |

### 2a. The two papers the brief asked to verify

- **Oxford "calculator analogy" paper: exists.** Voinea, C., Porsdam Mann, S., Savulescu, J. & Earp, B. "The calculator analogy: epistemic
  virtues for using LLMs." *Technology in Society* 85:103198, published 2025-12-13, DOI 10.1016/j.techsoc.2025.103198,
  https://ora.ox.ac.uk/objects/uuid:88fa642b-42f7-4401-b86f-88d8925c745c (Savulescu: Uehiro Oxford Institute). It argues the
  analogy is a useful but insufficient starting point for LLMs in education. The two technologies mediate learning differently, so
  users need epistemic virtues (patience, reflective engagement, vigilance and humility), and LLM design should build those virtues in
  through prompts, feedback loops and reflective questions. It matters here because it is peer-reviewed prior art for the exact move the
  essay makes in §2–§3. If the title stays "The Calculator Problem", the essay should cite it in §3. Under any title, citing it in §3
  is good practice.
- **MIT "cognitive debt": confirmed as the coinage in the title of Kosmyna et al. (arXiv:2506.08872, June 2025).** The abstract never
  defines the term; it appears in the title only (arXiv page, read 2026-10-29). It is a preprint with no journal listed. Storey
  (arXiv:2603.22106, March 2026) independently uses "cognitive debt" for a team-level software concept and says she first used it in
  October 2025. The term already has two owners with different meanings.
- Related, for completeness: Simkute et al., "Ironies of Generative AI" (arXiv:2402.11364, 2024, ACM) https://arxiv.org/abs/2402.11364
  extends Bainbridge's "Ironies of Automation" (*Automatica* 19(6), 1983, https://doi.org/10.1016/0005-1098(83)90046-8) to GenAI.
  Both are worth a §4 citation; neither works as a title because both are taken.

## 3. Recommendation

**First choice: "Mode Confusion".** Reasons:
1. It names what the essay actually diagnoses. §4 introduces the term with its strongest sources (NTSB 2014, FAA 2013, Parasuraman &
   Manzey 2010), and §5 defines mode fluency as its opposite: "knowing which mode you are in". The title and the brand become a pair,
   problem and practice, so every share of the essay carries the word *mode*.
2. It is honest about the essay's structure. The calculator stays as the opening analogy and the closing line; the title moves to the
   analogy the essay itself calls the better one, so §3's "flattering comparison" no longer undercuts the headline.
3. The term is established and has no AI-essay owner (2026-10-29). Unlike "fluency illusion" or "cognitive debt", the essay uses it in
   its original meaning, with the original sources cited.
4. Cheapest real change: the title slots plus one sentence. It also shortens the nav label from 22 characters to 14, which helps at 390 px.
5. Accepted risks: "confusion" is a negative word, the same objection R3 raised against "problem". It reads as the problem half of a
   problem/practice pair, and the brand supplies the positive half. Google "AI Mode" and product-mode chatter may blur the word for a
   week of search; the lede and §4 correct that within the first screen.

**Second choice: keep "The Calculator Problem", and add the Voinea et al. citation to §3.** The critique is right that the title
elevates an analogy the essay half-dismantles, and that the exact phrase searches badly. It is wrong if it implies the title is
misleading: the essay keeps the calculator honestly, names its limits on the page, and closes on it. The title is collision-clean and
already used by the planned talk (OFFER_BRAINSTORM, R6 §G). Keep it if Henrique values the hook over the brand pairing.

## 4. Exact copy for "Mode Confusion"

Site files (all in `docs/`):

| Slot | Current | New |
|---|---|---|
| `<title>` (calculator-problem.html:9) | `The Calculator Problem · Mode Fluency` | `Mode Confusion · Mode Fluency` |
| meta description (:10) | `We taught everyone to press the buttons. Nobody taught them which problems the calculator is for. An essay on mode fluency, with sources.` | `Calculators, cockpits and AI: skilled people with working tools who do not know which mode they are in. An essay on mode fluency, with sources.` |
| `body data-title` (:21) | `The Calculator Problem` | `Mode Confusion` |
| sys-line (:43) | `cat essays/the-calculator-problem.md` | `cat essays/mode-confusion.md` |
| `<h1>` (:44) | `<h1 id="essay-title">The Calculator Problem</h1>` | `<h1 id="essay-title">Mode Confusion</h1>` |
| lede (:45) | unchanged | `We taught everyone to press the buttons. Nobody taught them which problems the calculator is for.` (keep verbatim; it sets up §2) |
| nav label, 9 pages (about, calculator-problem, diagnose, index, learn, matrix, stack, stances, work; line 31/32) | `>The Calculator Problem</a>` | `>Mode Confusion</a>` (href unchanged) |
| home §6 `<h2>` (index.html:248) | `<h2 id="essay-title">The Calculator Problem</h2>` | `<h2 id="essay-title">Mode Confusion</h2>` |
| home §6 lede (index.html:250) | `Swap &ldquo;computers&rdquo; for &ldquo;AI&rdquo; and you have the problem this site is about.` | `Swap &ldquo;computers&rdquo; for &ldquo;AI&rdquo; and you have the problem this site is about. Classrooms met it with calculators; cockpits met it with autopilots, and called the failure mode confusion.` |
| in-body sentence (calculator-problem.html:74) | `That is the calculator problem. Not &ldquo;should we use it&rdquo;, but &ldquo;for which problems, when, and who checks&rdquo;.` | `That is the calculator&rsquo;s lesson. Not &ldquo;should we use it&rdquo;, but &ldquo;for which problems, when, and who checks&rdquo;.` |

No other in-body sentence names the old title. §2's heading "What the calculator taught us", §3, §4 ("Aviation has a name for one
version of this: mode confusion.") and the closing "You may use the calculator. You still sign the exam." stay as they are.

README.md:42:
`- **[Mode Confusion](https://modefluency.com/calculator-problem)** *(essay)*: what calculators and cockpits teach about working with AI, and why the skill is knowing which mode you are in.`

Outside the site (not required for launch): update HANDOFF.md §2 "Hero copy" row and the essay-title mentions in STRATEGY_BRIEF.md
(lines 159, 208, 225), HANDOFF.md:77 and `briefs/00_SHARED_CONTEXT.md:63`. Leave the dated briefs, research files and the three
`design-directions/` prototypes as historical record. The talk can keep "The Calculator Problem" as its own title or follow the essay;
that is Henrique's call.

QA note: the change alters deployable bytes, so the footer build-log `size:` figure (330,484 on 2026-10-28) must be re-measured and the
site QA gate rerun before commit. Page and file counts do not change if the slug stays.

## 5. URL policy

**Recommendation: keep `docs/calculator-problem.html` and the `/calculator-problem` slug.**
- The site has been live on modefluency.com since 2026-10-28 (HANDOFF.md). GitHub Pages cannot send a 301, so a rename needs a
  meta-refresh stub. That adds a tenth HTML file, changes the build-log counts (9 pages, 16 files) the QA gate checks, and leaves a
  weaker redirect than a 301.
- The slug stays truthful: the essay still opens with the calculator, and §2 is titled "What the calculator taught us".
- Only the sys-line `cat essays/mode-confusion.md` shows a filename, and it is decorative.

**If Henrique wants the shared URL to match the title,** do it before the LinkedIn launch (HANDOFF "what is left" item 5), when few
inbound links exist: rename to `mode-confusion.html`; keep `calculator-problem.html` as a stub with
`<meta http-equiv="refresh" content="0; url=mode-confusion.html">`, `<link rel="canonical" href="https://modefluency.com/mode-confusion">`
and a visible link; update every nav href, the two `Read the essay` links on index.html (lines 52, 251), README.md and docs/README.md:8;
update the QA script page list and footer counts.
