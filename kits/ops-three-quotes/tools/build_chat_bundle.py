"""Assemble CHAT-BUNDLE.md from the kit's own files (run from the kit folder)."""
import re
import sys
from pathlib import Path

kit = Path(sys.argv[1])
head = """# Chat bundle: three quotes, one recommendation

For chat assistants (a Claude or ChatGPT project, a Gemini Gem, a Copilot agent). The person uploads this file and the files from
their `inbox` folder: the request and the quotes, as text. This file holds the instruction file (Part 1), the templates (Part 2)
and the three check procedures (Part 3), copied from the kit's `INSTRUCTIONS.md`, `templates/` and `checks/`.

## Read this first: how the instructions map onto a chat

- **`inbox/`** means the request and quotes the person uploaded. **`outputs/`** means what you hand back: the trace table as a CSV
  code block (or a file, if your chat can create one), and the deviation report, recommendation and progress log as Markdown.
- **Paths such as `checks/1-trace.md` or `templates/recommendation.md`** refer to the parts of this file with the same name.
- **If the person also uploaded `check_quotes.py` and you can run Python:** put the uploaded request and quotes in a folder
  `inbox/`, your trace table (and later the two documents) in `outputs/`, and run `python -I check_quotes.py <that folder>`. Use its
  output exactly as Part 1 describes.
- **If you cannot run the script:** step 4 belongs to the person. Give them the trace table and Part 3, "Check 2", and wait.
  Ask them to send back exactly these spreadsheet figures: any `MISMATCH` rows from column O; the like-for-like price per request
  line per supplier (column P, after unit normalisation); and per supplier the subtotal, priced lines, VAT and total (columns S to
  V), with the lowest complete and compliant quote named. Build the comparison table from those figures only, say in the
  recommendation that they are the person's, and leave out "Above the lowest" and THRESHOLD: the spreadsheet does not produce them.
  The person writes the RESULT line. Never compute a sum, a VAT figure or a percentage yourself, and never describe a figure as
  checked.

---

# Part 1. Instructions

"""
parts = [("INSTRUCTIONS.md", None)]
templates = ["templates/request.md", "templates/trace-table.csv", "templates/deviation-report.md", "templates/recommendation.md"]
checks = ["checks/README.md", "checks/1-trace.md", "checks/2-recompute.md", "checks/3-coverage.md"]


def demote(text):
    text = re.sub(r"\[([^\]]+)\]\((?!https?:)[^)]+\)", r"\1", text)  # kit-relative links do not resolve inside the bundle
    return re.sub(r"^(#{1,5}) ", lambda m: "#" + m.group(1) + " ", text, flags=re.M)


body = [head, demote(kit.joinpath("INSTRUCTIONS.md").read_text(encoding="utf-8")).strip(), "\n\n---\n\n# Part 2. Templates\n"]
for t in templates:
    text = kit.joinpath(t).read_text(encoding="utf-8").strip()
    body.append(f"\n## {t}\n")
    body.append(f"```csv\n{text}\n```" if t.endswith(".csv") else "````markdown\n" + text + "\n````")
body.append("\n\n---\n\n# Part 3. The checks\n")
for c in checks:
    body.append(f"\n## {c}\n\n" + demote(demote(kit.joinpath(c).read_text(encoding="utf-8"))).strip())
out = "\n".join(body).rstrip() + "\n"
kit.joinpath("CHAT-BUNDLE.md").write_text(out, encoding="utf-8")
print(len(out), "characters")
