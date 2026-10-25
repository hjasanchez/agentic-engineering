## Task: Check a list of candidate umbrella names for collisions (domains, trademarks-in-use, GitHub, existing brands) and generate 10 more candidates that pass the same checks.
### Goal
The orchestrator will pick a brand name tonight. It needs a collision table so it does not pick something taken or generic.
### Inputs
- /home/user/meta-strategy/briefs/00_SHARED_CONTEXT.md (read fully first)
- Candidate list (check every one):
  Agentic Engineering; PonicLabs; Pilot in Command; Mode Fluency; Agentic Fluency; Agent Fluency; Agentic Literacy;
  Delegation Engineering; The Delegation Stack; Directing Intelligence; Intelligence Direction; AI Direction;
  Conducting Intelligence; Instrument Rating; Agentcraft; Agentmanship; Stancework; Operatorship; Cognitive Delegation;
  Human in Command; Tokencraft; Delegacy; Agentic Stewardship; Workcraft; Take the Reins; Reinsmanship; Cockpit;
  Agentic Numeracy; The Calculator Problem; Specwork; Articulate; AIES; AI-Human Engineering Stack; Harnesscraft; Delegate Well.
### Output
- Write /home/user/meta-strategy/research/R3_naming_and_brand_check.md with:
  1. Table, one row per candidate (originals + your 10 new ones): name | .com | .ai | .io | .dev availability (AVAILABLE /
     TAKEN / UNKNOWN) | existing company/product using the name (URL) | existing book/course using it | GitHub org or
     popular repo with the name | genericness (is it a common phrase in AI discourse? cite one usage) | verdict
     (CLEAR / CROWDED / TAKEN / GENERIC) | one-line note.
  2. Method section: exactly how you checked domains (RDAP endpoints, DNS, whois) and what the limits of that check are.
  3. For every name with verdict CLEAR or CROWDED-but-viable, one sentence on how it reads to a non-technical office worker
     (friendly / intimidating / confusing).
  4. Your 10 new candidates must each be explained in one line: what metaphor or word-root they come from. Favor words that
     (a) a non-technical worker finds inviting, (b) imply the HUMAN remains in charge/responsible, (c) can cover both a
     curriculum and a consulting practice, (d) are pronounceable and spellable on hearing.
### Acceptance criteria
- [ ] Every candidate has all four TLD columns filled (UNKNOWN allowed only if the check failed, with the error noted)
- [ ] Every TAKEN/CROWDED verdict has at least one URL as evidence
- [ ] 10 new candidates present and checked identically
### Constraints
- Domain check method: try RDAP first (e.g. https://rdap.verisign.com/com/v1/domain/NAME.com for .com; https://rdap.org/domain/NAME.ai;
  https://rdap.identitydigital.services/rdap/domain/NAME.io may or may not work; Google RDAP https://pubapi.registry.google/rdap/domain/NAME.dev).
  HTTP 404 = likely available, 200 = registered. Fall back to `dig +short NAME.tld` and `whois` if installed. Record which method gave each answer.
- Budget ≤80 HTTP requests + ≤30 web searches. No helpers.
### Non-goals
- Do NOT pick a winner. Do NOT design logos. Do NOT check social handles beyond GitHub.
### Tradeoffs
- An honest UNKNOWN beats a guessed AVAILABLE. Mark GENERIC aggressively: if a phrase returns thousands of unrelated results it is generic.
### If uncertain
- Mark UNKNOWN and say why.
### Verification you run yourself
- Spot-check 5 "AVAILABLE" results with a second method (DNS) and report agreement.
