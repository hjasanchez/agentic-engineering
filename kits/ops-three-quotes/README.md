# Three quotes, one recommendation

**A starter kit for operations and admin people who compare supplier quotes and write up a recommendation for someone else to sign.**
Office manager, operations lead, the founder who still signs the purchase orders: if you collect quotes against a request and then
have to say which one, and why, this is for you.

## What it does

You put your request and the suppliers' quotes in one folder and give your AI assistant one instruction file. The assistant plans
first, then reads each quote into a trace table where every figure points to the quote line it came from. A short script (or, if
you have no way to run code, a spreadsheet you fill in) does all the arithmetic: it checks each quote's sums, prices every quote
for exactly what you asked for, checks your limits such as lead time, and applies your award rule. The assistant writes a deviation
report and a recommendation marked "draft, not signed" from those figures, and the script rejects a recommendation whose
comparison table or award differs from its own. You read one table and one report, decide, and sign.

## Getting started (about ten minutes with the script, half an hour on the chat path)

1. **Get the folder.** Download this repository (on GitHub: Code, then Download ZIP), copy `kits/ops-three-quotes/` somewhere that
   is yours, and create two empty folders in it: `inbox` and `outputs`.
2. **Fill the request.** Copy [`templates/request.md`](templates/request.md) into `inbox/` (keep "request" in the file name), list
   what you asked for, one line per item with quantity and unit, and fill in "How we decide". Put the quotes in `inbox/` as text
   ([how to get text out of a PDF](checks/README.md#getting-text-out-of-pdf-quotes)).
3. **Choose your path.**
   - *Assistant that can open folders and run code* (Claude Code or Cowork, Codex, Copilot in agent mode, Cursor): open the kit
     folder and say "Follow INSTRUCTIONS.md and compare the quotes in the inbox." It runs `python -I checks/check_quotes.py` itself.
     Python 3.9 or later; nothing to install.
   - *Chat assistant* (a Claude or ChatGPT project, a Gemini Gem, a Copilot agent): upload [`CHAT-BUNDLE.md`](CHAT-BUNDLE.md) and
     the files from `inbox/`, and say "Follow CHAT-BUNDLE.md." If your chat assistant can run Python, upload
     `checks/check_quotes.py` too and it runs the checks itself. If it cannot, you do the sums in a spreadsheet with the formulas in
     the bundle, the assistant waits for your figures, and you write the RESULT line. The model never does the arithmetic.
4. **Read the plan** the assistant sends back, then say go.
5. **Check and sign.** Read the deviation report and the recommendation. Sign only when the RESULT line says READY FOR REVIEW
   (written by the script, or by you after the spreadsheet check). [How to read the checks](checks/README.md).

**Try it on the example first.** [`example/`](example/) holds a fictional request, three fictional quotes with one planted fault
each, and the expected output. [`example/walkthrough.md`](example/walkthrough.md) shows a full run and how each check catches its
fault. With Python: `python -I checks/check_quotes.py example`.

## What it will never do

Send anything to a supplier, accept or reject a quote, or place an order: the assistant writes only to `outputs/`, and the award is
yours. Invent a figure: a price that is not on a quote line is "not priced". Decide on its own arithmetic: the script
recomputes every deciding figure (each quote's sums, the like-for-like subtotals, VAT and totals, the award), and it rejects a
recommendation whose comparison table or award differs from its own. On the chat path without Python, your spreadsheet does that
work instead.

## When not to use it

- One quote, or a purchase small enough that comparing takes less time than setting this up.
- Choices decided mostly on quality, design or trust (an architect, an agency): the kit compares prices, units, coverage and stated
  limits, and leaves the rest to you.
- Public tenders or regulated procurement with its own procedure: follow that procedure; the kit can help you check figures inside it.
- Quotes in different currencies, or scanned images you cannot turn into text.

## Limits worth knowing

- The script checks a figure against the quote text it is given. If the assistant made that text copy, it is checking its own
  transcription, so make the copy yourself or spot-check it.
- Units convert when the request and quote state hours (`day (8 h)` against `half day (4 h)`) or packs (`pack of 10` against
  `each`); anything else stays "not priced" until the supplier clarifies.
- The award rule is "lowest complete and compliant quote", with an optional "prefer faster if" clause. Other preferences are yours
  to weigh at sign-off.
- Specs in "Must have / notes" are not checked by the script. Read them against the quotes yourself, or ask the assistant to list
  each one in the deviation report.
- Figures in the recommendation's own sentences are checked only loosely: a two-decimal figure or a percentage must appear somewhere
  in the quotes, the request or the script's output, but not necessarily in the right place, and whole numbers are not checked. A
  sentence can still quote the wrong figure or argue for the wrong supplier. The table and the award line are exact; read the prose
  against them.
- If the assistant matches a request line to the wrong line of a quote, and copies that line's figures correctly, the checks
  pass. The quote may then look incomplete or cheaper than it is. Check each `qualified` row in the deviation report against the
  quote.

## Where it comes from

The kit puts the Harness and Judgment layers of the [AI-Human Engineering Stack](../../AI-Human-Stack-Component-Reference-Map.md)
around one recurring task: a folder with read-only inputs, an instruction file, checks a script can run, and a decision rule only
you can apply. You are in the [Executor stance](../../THE_FOURTEEN_STANCES.md) (delegating a job you review afterwards), with an
Interpreter step whenever the assistant reads a quote; the [Mode Fluency Matrix](../../MODE_FLUENCY_MATRIX.md) lists the
guardrails both need, and the instruction file follows the Intent Doc pattern in
[The Complete Guide to Specifying Work for AI](../../The%20Complete%20Guide%20to%20Specifying%20Work%20for%20AI.pdf).

It does not replace the skills or plugins your assistant already has, such as Anthropic's free
[knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins); any of them can do the reading inside this folder.
What the kit adds is the supervision around the job.

## Design partner wanted

If you buy for a small or mid-sized company and would run this on two of your own past quote sets (redacted), write to
hello@modefluency.com. You get named credit here and a free review of the workflow; the kit gets the checks your work needs.

## Files

`INSTRUCTIONS.md` (the instruction file) · `CHAT-BUNDLE.md` (the same, with the templates and check procedures, for chat
assistants) · `checks/` (the three checks, `check_quotes.py`, tests) · `templates/` (request, recommendation, deviation report,
trace table) · `example/` (fictional request and quotes, expected outputs, walkthrough) · [`CHANGELOG.md`](CHANGELOG.md)

## Licence

Text and templates: CC BY-SA 4.0 ([LICENSES/CC-BY-SA-4.0.txt](../../LICENSES/CC-BY-SA-4.0.txt)). `check_quotes.py` and its tests:
MIT ([LICENSES/MIT.txt](../../LICENSES/MIT.txt)). Cite as: Sanchez, H. J. (2026). *Three quotes, one recommendation* (harness
kit). github.com/hjasanchez/agentic-engineering/tree/main/kits/ops-three-quotes
