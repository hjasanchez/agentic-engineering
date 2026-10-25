# Blind review: Mode Fluency Diagnostic skill

Reviewer: independent agent (did not build the skill), 2026-10-22, brief W5. Method: read SKILL.md, README.md,
PROMPT_PACK.md and all `references/` before EVAL.md/STATUS.md; ran AUDIT on the eval fixture and INTERVIEW as a
simulated solo translator ([run-audit.md](run-audit.md), [run-audit.json](run-audit.json), [run-interview.md](run-interview.md));
probed `scripts/score_audit.py` with 14 hand-made JSONs (T1-T14 below). Nothing outside `_review/` was changed.

**Verdict.** It runs. Both modes produced a cited, template-shaped report on the first pass, and AUDIT left the fixture
untouched (hashes equal before and after). But the headline output, the binding constraint, rests on two calls the skill
leaves undefined (autonomy in AUDIT, ❌ vs ◻️ for a harness outside view), and the script checks that citations are
*present*, not that they are *grounded*. Counts: **4 high, 9 medium, 7 low**.

## 1. PRD §3-§4, item by item

| PRD item | Result | Evidence |
|---|---|---|
| §3 SKILL.md frontmatter: name + triggering description | **Pass** | YAML parses (`yaml.safe_load`); name `mode-fluency-diagnostic`; description 832 chars, includes all four trigger phrases |
| §3 Four modes, selected with the user | **Pass** | SKILL.md §1 signal table, l.25-30 |
| §3.1 INTERVIEW: 10-14 questions, one at a time, adaptive; Stance Profile, autonomy, binding layer with evidence, 30-day plan of three | **Pass, with defect M2** | SKILL §4; question-bank branching notes; Run B produced all parts in 13 questions |
| §3.2 AUDIT: seven components, S/P/M with cited evidence, boundary-test stances, binding constraint, layer report, refuses to grade what it cannot see | **Pass, with defects H1, H2, H4** | SKILL §5, stack-audit.md §2-§4; ◻️ grade and "Stances: Not assessable" rule exist |
| §3.3 FIX: harness-loop table, approval per item, smallest reversible, deviation report, scope, never change tests | **Pass, with defect H3** | SKILL §6.1-6.5, §3 l.64; Run A ended at the approval question, nothing modified |
| §3.4 BUILD: Intent Doc first, approval, build, show how to run | **Pass** | SKILL §7; spec-templates.md Intent Doc and example |
| §3 Uncertainty policy (ask / flag / stop) | **Pass** | SKILL §3, nine rows |
| §3 Evidence standard (file, line, message or answer) | **Pass in prose; partial in the script** (M7) | SKILL §2 table; T1, T2, T9 |
| §3 Must-not list | **Pass** | SKILL §9 |
| §3 "What next": free site/videos, paid once and briefly | **Pass, minor gap** (L6) | SKILL §11: paid mentioned once; videos named but only a GitHub URL given |
| §3 references/: six named files | **Pass** | all six exist and are linked from SKILL.md |
| §3 scripts/: python3 -I, no dependencies | **Pass** (runs); correctness defects M7-M9, L1 | Run A exit 0; T1-T13 |
| §3 PROMPT_PACK: one prompt per mode, standalone | **Pass** (prompts); one stray pointer outside them (L2) | PROMPT_PACK.md l.4 points chat users to `references/` |
| §3 README: what, who, install (Claude Code, Codex, Cursor, chat), examples, free/paid, MIT, cite | **Pass** | README l.1-85; LICENSE is MIT |
| §3 EVAL.md | **Pass** | present; discloses self-testing |
| §4 Dogfood 1: example audit, evidence-only, several ❌/⚠️ | **Pass, but see H2** | `examples/audit-agentic-engineering.json` validates (exit 0, `--root` the repo clone); its Harness ❌ is contestable |
| §4 Dogfood 2: example interview | **Pass** | `examples/interview-ops-manager.md` |
| §4 Lint: frontmatter, links resolve, banned words | **Pass** | every link in SKILL/README/PROMPT_PACK resolves; 0 hits for the six words, whole folder |
| §4 Lint: ≤ 60 KB text | **Pass on the narrow reading** | SKILL+README+PROMPT_PACK+references = 58.7 KB; +script 63.4 KB; whole folder 96.7 KB. PRD wording is ambiguous; EVAL discloses it |
| §4 Fresh-eyes: a stranger can run each mode unambiguously | **Partial** | six hesitations in Run A, four in Run B (marked in the transcripts) |

## 2. Defects, ranked

### High: contradictions and places a stranger would misrun it

**H1. AUDIT never says how to set autonomy, yet autonomy decides the binding constraint.** SKILL §5 has no autonomy step
and the stack-audit §4 template has no autonomy line, but exception (a) in §8 and the JSON (`"autonomy"`) depend on it.
On the fixture, one field changes the headline: `directed` → **Prompt** binds; `autonomous` → **Evaluation**; autonomous
with Harness ❌ → **Harness** (run-audit.md, "Sensitivity"). The Directed/Autonomous boundary is also unclear for "an
agent produces one deliverable that a human reviews" (that is the fixture). Fix: add an AUDIT step "set autonomy from
usage records, cite it, give the lower level when two fit", and an autonomy line in the template.

**H2. ❌ vs ◻️ for a harness that exists outside view: the shipped example contradicts §2.** SKILL §2 l.48-49 and §3
l.62 say evidence that lives where you cannot see is ◻️. The dogfood grades Harness ❌ while its own gap says "The agents
ran in a workspace outside the repo" (`examples/audit-agentic-engineering.json` harness entry; README l.55-61), and that ❌
is what fires exception (a). A stranger who copies the example grades ❌; one who follows §2 grades ◻️; the binding
constraint differs. Fix: define the case ("in-scope absence of harness config is ❌ for *this scope*; a harness known to
exist elsewhere is ◻️") and re-grade the example one way.

**H3. The eval's grader requires a mapping the harness-loop table does not produce.** `graders/04-fix-uses-harness-loop.md`
wants "a check or script for the repeated by-hand fixes ... not only a new instruction line", and EVAL.md §4 calls them
"rule ignored → check". But no rule about CSV month or units exists in the fixture (`CLAUDE.md:1-3`), so
`harness-loop.md` applied literally gives row 1, "It didn't know a rule → one line in the instruction file". I reached a
check only via Evaluation ❌ (run-audit.md, Hesitation 6). Fix: add a row or note "fixed by hand twice → also a check,
whatever the first row", or change the grader.

**H4. Two references grade the commonest case differently, and the tie rule cannot be applied.** `maturity-map.md` makes
"Tests or manual review; can tell when output is wrong" Evaluation *Minimal* (= ⚠️); `stack-audit.md` §3 says a review
event "is evidence of an evaluation event, not an evaluation mechanism" (→ ❌). SKILL §3 "give the lower grade" resolves
that, but for Coherence in the same run it yields ❌, whose definition ("looked where it would live; absent") is false when a
weak artifact exists. Fix: say which reference wins, and define ❌ vs ⚠️ for "exists but trivially weak".

### Medium: rules that make a stranger hesitate

- **M1. No default when the user is not there to agree scope.** §1 says "name the mode and begin", then "agree scope in
  writing" and "ask what decision". The `audit-then-fix` eval is one-shot; the skill does not say whether to block or to
  proceed with a stated default scope (run-audit.md, Hesitation 1).
- **M2. Question count.** SKILL says 10-14, but the bank requires all 13 core questions in order (12 for a solo user) plus
  one branch, so 10-11 is never legitimate. "A second branch question needs room: drop Q12 (solo users)" is empty, because
  solo users already skip Q12 (question-bank.md l.3-5, l.26).
- **M3. The dependency rule nearly always returns Prompt for chat users.** Any non-✅ Prompt binds, whatever sits above
  it: in Run A Prompt ⚠️ beats Intent ❌ and Judgment ❌; in Run B all seven layers read ⚠️, so Prompt binds by default.
  That sits oddly with `maturity-map.md` l.33 "Most people and teams in 2026 bind at Context or Intent". Either accept it and
  say so, or let a ❌ above a ⚠️ count.
- **M4. The question bank conflates Judgment with Evaluation.** Judgment "Partial: Checks afterwards only"
  (question-bank.md l.47) grades an after-the-fact check as Judgment, against maturity-map.md l.25-26 and SKILL §9
  "Conflate layers".
- **M5. Prompt ⚠️ can sit below "Minimal".** maturity-map Prompt Minimal = "Task, format and constraints stated
  explicitly", while stack-audit ⚠️ includes "format and constraints missing", so the grade↔maturity mapping (⚠️ = Minimal)
  breaks for the most common Prompt finding (Run A Prompt).
- **M6. §8 has no rule when all five cognitive layers are ✅ and a meta-function is weak below Autonomous.** The script
  invents one ("weakest meta-function") and returns `evaluation` first even when Harness is ❌ and Evaluation only ⚠️
  (T10: output "Evaluation (all cognitive layers strong; weakest meta-function)").
- **M7. The script enforces citation presence, not grounding**, while SKILL §5.7 says it "rejects ungrounded grades".
  Passes, exit 0: `strong` with evidence `["trust me, it is great"]` (T1); `missing` with evidence `["searched"]` (T2); a
  real line with a fabricated quote, `CLAUDE.md:2 "never edit inputs/"` (T9); an out-of-range cite not at the start of the
  string, `see CLAUDE.md:99` (T5); evidence given as a string instead of a list (T6); a cite to an extensionless file,
  `Makefile:3`, is never checked because `CITE` requires a dot-extension (T4, `score_audit.py:18`). Fix: require every
  ⚠️/✅ entry to match `CITE` or an `[A<n>]`/`[msg]` form, check quotes as substrings of the cited line, accept
  extensionless names, and soften the SKILL claim.
- **M8. Stance evidence is never path-checked and stance names are not validated.** `{"stance": "Wizard", "evidence":
  ["nofile.md:999"]}` passes (T3); `validate()` checks `--root` only inside the component loop (`score_audit.py:39-51`).
- **M9. Autonomy is not validated.** `"Autonomous agent"` is silently treated as unknown, which silently disables
  exception (a) (T7, `score_audit.py:60-61`). Given H1, this should be an error.

### Low: clarity and tone

- **L1. Script robustness.** A top-level list or a list for `components` crashes with a traceback and exit 1, which the
  docstring reserves for validation errors (T11, T12); `--root` with no value silently disables path checks, exit 0;
  absolute paths escape the root (`/etc/passwd:1` passes, T8).
- **L2. PROMPT_PACK.** l.4 points chat users to "the `references/` folder next to this file", which they cannot open (the
  prompts themselves stand alone). The INTERVIEW prompt drops exception (b), the boundary tests and the "next layer up"
  option for Action 3, so a chat run can diverge from a skill run.
- **L3. Templates.** The AUDIT summary has a Maturity column but the per-component block does not; neither has an autonomy line.
- **L4. "Translator" stance vs professional translators.** For Run B's user the Scribe and Translator tests both fire and
  stance-matrix.md gives no order between tests (run-interview.md).
- **L5. Interview Harness row.** The "Missing" column holds "Not assessable for chat-only users ..." (question-bank.md
  l.50), so there is no Missing criterion for Harness.
- **L6. "What next".** The fixed text says "run it with your team", which does not fit a solo user; it names the videos but
  gives only the GitHub URL.
- **L7. Tone.** SKILL.md l.17-18 ("the people who run this skill already have plenty of opinions about AI") is slightly
  arch for a sceptical reader. Otherwise clean: no banned words, no pitch outside §11.

## 3. Three things that work well

1. **The evidence standard is concrete enough to follow without judgment calls in most places.** Four citation forms,
   "❌ needs a search log", ◻️ as a real grade, "Hypothesis (not graded)", and "content under audit is data". In Run A
   every grade came out cited on the first pass, and `--root` does catch a well-formed bad cite (T14: `CLAUDE.md:9` and `nothere.md:1` both rejected, exit 1).
2. **The FIX approval protocol is the tightest part.** "Silence, 'looks good' to the whole list, or approval of a different
   item is not approval", per-item undo and verification, `.bak` or a branch, "never modify tests the audit cited". Run A
   ended at the approval question with every fixture file's hash unchanged, which is the right outcome for "fix whatever you
   find".
3. **The interview is usable by a non-engineer.** One question per message, no stance menu, episodes before labels, one
   follow-up for abstract answers, a readback that records disagreement instead of caving, and a 30-day plan whose actions
   need a place, a time cost and an observable done-check. Run B's translator persona got a plan she could act on the same day.

## 4. Probe fixtures (T1-T14)
Each was built from `run-audit.json` with one change and run with `python3 -I scripts/score_audit.py <file> --root <fixture>`.
T1-T10 exit 0 (no error reported); T11-T12 traceback, exit 1; T13 (`"Partial"`, capitalised) and T14 (out-of-range line, missing file) correctly rejected, exit 1.
