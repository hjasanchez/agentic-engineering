# Interview: operations manager, mid-size distributor (simulated)

*Dogfood run of the INTERVIEW mode, SKILL.md §4. The user is simulated: an operations manager at a ~450-person industrial
parts distributor who uses ChatGPT daily and started using a Copilot agent two weeks ago. Claude played both roles and
kept them apart: the interviewer saw only the answers. 14 questions (13 core + branch H1), no follow-ups needed.*

## Transcript (condensed; the questions are verbatim)

**Agent:** About 12–14 questions, one at a time, roughly ten minutes. No wrong answers; a concrete recent example beats a
general description; skip anything you like.

1. **Q1** *What is your role, and what kind of work fills most of your week?*
   **A1** "Ops manager. Weekly KPI pack for leadership, supplier escalations, SOP updates, shift planning."
2. **Q2** *Which AI tools do you use for work, and roughly how often each?*
   **A2** "ChatGPT Team, maybe fifteen times a day. Copilot in Outlook. And for two weeks a Copilot agent IT built that reads
   our supplier SharePoint list and drafts the Monday supplier-delay summary."
3. **Q3** *Walk me through the last time you used AI for real work...*
   **A3** "Thursday. I pasted a supplier's email chain and asked ChatGPT for 'a firm but polite reply'. I read it, deleted a
   sentence offering them a 5% credit we never agreed, and sent it."
4. **Q4** *Now a different kind of task from the last two weeks...*
   **A4** "Monday: I pasted three exports (on-time delivery, backorders, freight cost) and asked what's going on with
   delivery performance, for leadership. It gave four bullets; I pasted them straight into the KPI deck."
5. **Q5** *The AI-assisted work that mattered most recently... how did you check it?*
   **A5** "The agent's supplier summary to the COO. I skimmed it; the numbers looked like what I remembered. It said
   Supplier K was on track. K had posted a three-week delay in our Teams channel."
6. **Q6** *When you start a task with AI, what do you usually tell it?*
   **A6** "One or two lines. I keep a 'make this sound professional' prompt in a Word doc."
7. **Q7** *What does it know when it works for you?*
   **A7** "New chat every time; I paste what's needed. Custom instructions say I'm an ops manager in a distributor.
   The agent only has the SharePoint list."
8. **Q8** *Does it ever know why a task matters, or what to favour when things conflict?*
   **A8** "No. I suppose it assumes accuracy matters."
9. **Q9** *What do you want it to do when it isn't sure? Have you ever told it?*
   **A9** "Tell me. I've never said so."
10. **Q10** *The last time an output was wrong or disappointing: what did you do next?*
    **A10** "The K thing. The COO asked why K was on track. I apologised, then typed to the agent 'be more careful and check
    all sources'. IT told me later it can't read Teams at all."
11. **Q11** *A mistake it makes again and again?*
    **A11** "'I hope this email finds you well', American spelling, and it rounds on-time % differently from finance's
    dashboard. I fix all three by hand every time."
12. **H1** *When the agent does a multi-step job, where does it run, what may it change or send, what do you look at?*
    **A12** "In Teams. It reads the list and posts a draft to my chat; IT made it unable to send email. I read the draft
    and forward it."
13. **Q12** *Would a colleague running the same task get the same kind of result? Is anything shared?*
    **A13** "My two shift leads each do their own thing in ChatGPT. Only the agent is shared."
14. **Q13** *If this went well, what would be different 30 days from now?*
    **A14** "I'd forward things to the COO without the knot in my stomach, and stop fixing the same three things."

---

# Mode Fluency Profile: Operations manager, 2026-10-22

## Stance Profile

| Stance | Seen in | Characteristic failure | Guardrail (do this) |
|---|---|---|---|
| **Executor** | [A5] [A10] [A12] agent drafts a summary from steps never watched; forwarded to the COO | Locally correct steps, wrong outcome, found late (K "on track") | Nothing consequential ships uninspected: require a source and date per line before forwarding |
| **Interpreter** | [A4] material in (three exports), conclusions out, into the leadership deck | Confabulated meaning that sounds insightful | "Show me which rows support each bullet." |
| **Genie** | [A3] goal only ("firm but polite"), deliverable inspected as a whole | Literal compliance; it filled the gap with a 5% credit | State boundaries first: "do not offer credits, dates or commitments I have not stated" |

The Genie/Scribe test decided A3: she supplied the email chain but not the position to take, so the AI supplied the
substance. All three are the passive form of their stance (Stances §"Consumption vs construction").

## Autonomy level: Autonomous (two weeks), otherwise Directed
Weekly real work runs through the agent [A2] [A12]; ChatGPT work is Directed: she describes, it drafts, she reviews [A3] [A4].

## Layer readings

| Layer | Reading | Evidence |
|---|---|---|
| Prompt | ⚠️ Partial | one or two lines [A6]; one saved prompt; no boundaries [A3] |
| Context | ⚠️ Partial | role-only custom instructions, fresh chats [A7]; the agent cannot see Teams [A10] |
| Intent | ❌ Missing | never states why or what to favour [A8] |
| Judgment | ❌ Missing | never told it to ask or flag [A9] |
| Coherence | ⚠️ Partial | shared agent; nothing else shared [A13] |
| Evaluation | ❌ Missing | skimmed against memory [A5]; bullets pasted unchecked [A4] |
| Harness | ⚠️ Partial | IT-set workspace and permissions, cannot send [A12]; repeat mistakes fixed by hand [A11] |

## Binding layer: Evaluation
The lowest weak cognitive layer is Prompt, but SKILL.md §8 exception (a) applies: she now runs Autonomous work weekly and
Evaluation is Missing, so nothing above it can be trusted until there is a check. It already cost her: the COO caught the
error, not her [A5]. Her fix went to the wrong layer: she re-prompted ("be more careful") [A10] for what was a Context gap
(the agent cannot read Teams) that only an Evaluation check would have exposed. The Executor guardrail and the binding layer
point at the same move.

## 30-day plan
1. **Binding layer: a pre-forward check for the Monday summary.** Ask the agent to end every summary with a table: supplier,
   status, source item, date of that item. Before forwarding, open three rows at random and check them against SharePoint
   and the Teams channel. *Lives in:* a note pinned in the Teams chat. *Time:* 5 minutes a week. *Done-check:* by day 28,
   four summaries forwarded with a source table, and every mismatch you found written in one list.
2. **Interpreter guardrail for the KPI deck.** Add one line to your analysis request: "For each conclusion, cite the file and
   the rows that support it; say UNVERIFIED if none." Delete any bullet you cannot trace. *Lives in:* the saved Word prompt.
   *Time:* 2 minutes per deck. *Done-check:* by day 21, every bullet in the leadership deck has a row reference.
3. **Never fix the same mistake twice by hand.** Add four lines to ChatGPT custom instructions: British spelling; no "I hope
   this email finds you well"; round on-time % to one decimal as finance does; never offer credits, discounts or dates I
   have not stated. Ask IT to add one line to the agent's instructions: "You cannot see Teams; say so in every summary."
   *Time:* 15 minutes. *Done-check:* by day 30, none of the three repeat fixes [A11] needed for a week.

**Readback.** Asked whether any reading felt wrong, the user said Intent seemed harsh. Asked for the example that
contradicts it, she gave "I write 'for leadership'" [A15]. Naming the audience is Context, not a tradeoff or a priority, so
Intent stays ❌; the disagreement is recorded here.

## What this interview could not see
The agent's actual configuration, how often its summaries are wrong, and the shift leads' own usage.

## What next
> **What next.** Everything behind this diagnosis is free: the AI @ Workplace videos (101–401) and the Stack, Stances and
> Specifying guides at https://github.com/hjasanchez/agentic-engineering. Re-run this diagnostic in 30 days and compare.
> If you would rather have a human run it with your team, Henrique offers a paid Mode Fluency Assessment:
> https://www.linkedin.com/in/henriquejsanchez
