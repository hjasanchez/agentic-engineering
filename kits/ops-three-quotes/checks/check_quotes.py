"""Checks a quote comparison and computes it: trace, recompute, coverage and compliance, comparison, award.

Usage (from the kit folder; Python 3.9+, standard library only, nothing to install):
    python -I checks/check_quotes.py            # checks this folder: inbox/ and outputs/
    python -I checks/check_quotes.py example    # checks the worked example
Reads inbox/*request*.md, the quotes as text files in inbox/, outputs/*trace-table.csv and, once written,
outputs/*deviation-report.md and outputs/*recommendation.md. Writes nothing.
Exit 0 = ready for the person's review; exit 1 = not ready (or a STOP: the input could not be read).
Licence: MIT (LICENSES/MIT.txt at the repository root).
"""
import csv
import io
import math
import re
import sys
from decimal import Decimal, InvalidOperation
from pathlib import Path

CENT = Decimal("0.01")
COLUMNS = ["supplier", "ref", "kind", "status", "quote_text", "qty", "unit", "unit_price", "amount", "vat_rate",
           "source_file", "page", "units_needed", "note"]
ITEM_STATUS = {"quoted", "qualified", "excluded", "missing", "extra"}
STOPWORDS = {"with", "without", "included", "including", "price", "prices", "items", "other", "about", "least",
             "which", "where", "there", "after", "before", "order", "total", "their", "these", "those"}


class Stop(Exception):
    pass


# ---------- reading ----------

def read_text(path):
    data = path.read_bytes()
    for enc in ("utf-8-sig", "cp1252"):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            continue
    raise Stop(f"cannot decode {path.name}; save it as UTF-8 text")


def find_one(folder, pattern, required=True):
    if not folder.is_dir():
        raise Stop(f"folder {folder} not found; create inbox/ and outputs/ in the kit folder (see README, Getting started)")
    hits = sorted(folder.glob(pattern))
    if len(hits) > 1 or (required and not hits):
        raise Stop(f"expected one {pattern} in {folder}, found {len(hits)}")
    return hits[0] if hits else None


def num(text):
    """'1,090.00', '1.090,00', 'EUR 380', '20%' -> Decimal; None if empty or not a number."""
    s = re.sub(r"[^\d.,\-]", "", str(text or ""))
    if not re.search(r"\d", s):
        return None
    if "," in s and "." in s:
        dec = "," if s.rfind(",") > s.rfind(".") else "."
        s = s.replace("." if dec == "," else ",", "").replace(",", ".")
    elif "," in s:
        s = s.replace(",", ".") if re.fullmatch(r"-?\d+,\d{1,2}", s) else s.replace(",", "")
    elif re.fullmatch(r"-?\d{1,3}(\.\d{3})+", s):
        s = s.replace(".", "")
    try:
        return Decimal(s)
    except InvalidOperation:
        return None


def numbers_in(text):
    return {n for n in (num(t) for t in re.findall(r"\d[\d.,]*\d|\d", text)) if n is not None}


def money(value):
    return f"{value:,.2f}"


def norm(text):
    return " ".join(str(text or "").lower().split())


def has_phrase(phrase, text):
    return re.search(r"(?<!\w)" + re.escape(norm(phrase)) + r"(?!\w)", norm(text)) is not None


def read_table(path):
    text = read_text(path)
    header = text.splitlines()[0] if text.strip() else ""
    delim = max([",", ";", "\t"], key=header.count)
    rows = list(csv.reader(io.StringIO(text), delimiter=delim))
    if not rows:
        raise Stop(f"{path.name} is empty")
    head = [norm(h) for h in rows[0]]
    absent = [c for c in COLUMNS if c not in head]
    if absent:
        raise Stop(f"{path.name} is missing columns {absent}; copy the header from templates/trace-table.csv")
    out = []
    for cells in rows[1:]:
        if not any(c.strip() for c in cells):
            continue
        cells = cells + [""] * (len(head) - len(cells))
        r = {h: cells[i].strip() for i, h in enumerate(head)}
        r["kind"], r["status"], r["ref"] = norm(r["kind"]), norm(r["status"]), r["ref"].upper()
        out.append(r)
    return out


def read_request(path):
    text = read_text(path)
    lines, rule = {}, {"pct": None, "days": None, "term": None}
    for line in text.splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) >= 4 and re.fullmatch(r"[A-Z]\d+", cells[0]):
            what = norm(cells[1])
            limit = "max" if re.search(r"at most|no more than|maximum|within", what) else \
                    "min" if re.search(r"at least|no less than|minimum", what) else None
            lines[cells[0]] = {"what": cells[1], "qty": num(cells[2]), "unit": cells[3], "limit": limit}
        m = re.search(r"prefer faster if:?\**\s*(.*)", line, re.I)
        if m and not re.match(r"no\b|none|\[", m.group(1).strip(), re.I):
            pct = re.search(r"within\s+(\d+(?:\.\d+)?)\s*%", m.group(1))
            days = re.search(r"at least\s+(\d+)\s+.*?sooner", m.group(1))
            term = re.search(r"\b(T\d+)\b", m.group(1))
            if not (pct and days and term):
                raise Stop("the request's 'Prefer faster if' line must read like: within 5% and at least 5 working "
                           "days sooner on T1 (or: no)")
            rule = {"pct": Decimal(pct.group(1)), "days": Decimal(days.group(1)), "term": term.group(1)}
    if not lines:
        raise Stop(f"no request lines (| R1 | ... |) found in {path.name}; use templates/request.md")
    return lines, rule, text


def pages(path):
    text = read_text(path)
    if "\f" in text:
        return {str(i + 1): p for i, p in enumerate(text.split("\f"))}
    parts = re.split(r"^=+\s*Page\s+(\d+).*$", text, flags=re.M | re.I)
    if len(parts) == 1:
        return {"1": text}
    return {parts[i]: parts[i + 1] for i in range(1, len(parts) - 1, 2)}


# ---------- units ----------

def unit_size(unit):
    u = norm(unit)
    m = re.search(r"\((\d+(?:\.\d+)?)\s*(h|hrs?|hours?)\)", u)
    if m:
        return Decimal(m.group(1)), "h"
    m = re.search(r"(?:pack|box|bag|roll|set|case) of (\d+)", u)
    if m:
        return Decimal(m.group(1)), "pcs"
    if u in ("each", "piece", "pcs", "unit"):
        return Decimal(1), "pcs"
    return None


def units_needed(row, want):
    """Quoted units needed to cover the request line, or None if the units cannot be converted."""
    q = num(row["qty"])
    if norm(row["unit"]) == norm(want["unit"]):
        return want["qty"]
    a, b = unit_size(row["unit"]), unit_size(want["unit"])
    if q is None or not a or not b or a[1] != b[1]:
        return None
    return Decimal(math.ceil(want["qty"] * b[0] / a[0]))


# ---------- the checks ----------

def check_trace(rows, request, inbox, out, findings):
    out.append("CHECK 1  TRACE: every figure is on the quote line it cites, in the unit it is quoted")
    fails = traced = 0
    for r in rows:
        who, ref, kind, status = r["supplier"], r["ref"], r["kind"], r["status"]
        tag = f"{who} {ref or kind}"
        src = inbox / r["source_file"]
        if not src.is_file():
            out.append(f"  FAIL  {tag}: source file {r['source_file']} not found in inbox/")
            fails += 1
            continue
        all_pages = pages(src)
        if status == "missing":
            words = [w for w in re.findall(r"[a-z]{5,}", norm(request.get(ref, {}).get("what", "")))
                     if w not in STOPWORDS]
            for w in words:
                for p, text in all_pages.items():
                    hit = next((l for l in text.splitlines() if re.search(r"\b" + w[:6], l.lower())), None)
                    if hit:
                        out.append(f"  FAIL  {tag}: marked missing, but \"{w}\" appears on {r['source_file']} p.{p}:"
                                   f" \"{hit.strip()[:70]}\". Cite that line and mark it quoted, qualified or excluded")
                        fails += 1
                        break
                else:
                    continue
                break
            continue
        page = all_pages.get(r["page"])
        if page is None:
            out.append(f"  FAIL  {tag}: {r['source_file']} has no page {r['page'] or '(blank)'}")
            fails += 1
            continue
        if not r["quote_text"]:
            out.append(f"  FAIL  {tag}: quote_text is empty; copy the words of the quote line that carries the figures")
            fails += 1
            continue
        candidates = [l for l in page.splitlines() if has_phrase(r["quote_text"], l)]
        if not candidates:
            out.append(f"  FAIL  {tag}: \"{r['quote_text']}\" is not on {r['source_file']} p.{r['page']}")
            fails += 1
            continue
        wanted = {c: num(r[c]) for c in ("qty", "unit_price", "amount", "vat_rate") if num(r[c]) is not None}
        unit = r["unit"] if kind in ("line", "term") else ""
        ok = [l for l in candidates if set(wanted.values()) <= numbers_in(l) and (not unit or norm(unit) in norm(l))]
        if not ok:
            line = candidates[0].strip()
            missing = [f"{c} {r[c]}" for c, v in wanted.items() if v not in numbers_in(candidates[0])]
            if unit and norm(unit) not in norm(candidates[0]):
                missing.append(f"unit \"{unit}\"")
            out.append(f"  FAIL  {tag}: the line \"{line[:70]}\" ({r['source_file']} p.{r['page']}) does not show "
                       + ", ".join(missing))
            fails += 1
            continue
        traced += len(wanted)
        want = request.get(ref)
        if want and kind in ("line", "term"):
            differs = norm(r["unit"]) != norm(want["unit"]) or (kind == "line" and num(r["qty"]) != want["qty"])
            said = f"quoted {r['qty']} x \"{r['unit']}\", request says {want['qty']} x \"{want['unit']}\""
            if differs and status == "quoted":
                out.append(f"  FAIL  {tag}: {said}, but the row says quoted (mark it qualified)")
                fails += 1
            elif differs:
                out.append(f"  FLAG  {tag}: {said}")
                findings.append((who, ref))
    out.append(f"  ....  {traced} figures found on the quote lines they cite")
    return fails


def check_totals(rows, suppliers, out, findings):
    out.append("CHECK 2  RECOMPUTE: each quote's own arithmetic, recalculated here, not by the model")
    fails = 0
    for who in suppliers:
        mine = [r for r in rows if r["supplier"] == who]
        lines = [r for r in mine if r["kind"] == "line" and num(r["amount"]) is not None]
        stated = {k: next((num(r["amount"]) for r in mine if r["kind"] == k), None) for k in ("subtotal", "vat", "total")}
        rate = next((num(r["vat_rate"]) for r in mine if r["kind"] == "vat"), None) or Decimal(0)
        if stated["subtotal"] is None or stated["total"] is None:
            out.append(f"  FAIL  {who}: no subtotal or total row in the trace table")
            fails += 1
            continue
        problems = []
        for r in lines:
            q, p, a = num(r["qty"]), num(r["unit_price"]), num(r["amount"])
            if q is not None and p is not None and (q * p).quantize(CENT) != a:
                problems.append((r["ref"], f"{r['ref']} {q} x {p} = {money(q * p)}, quote says {money(a)}"))
        line_sum = sum((num(r["amount"]) for r in lines), Decimal(0))
        vat_on_stated = (stated["subtotal"] * rate / 100).quantize(CENT)
        right_vat = (line_sum * rate / 100).quantize(CENT)
        right_total = line_sum + right_vat
        if line_sum != stated["subtotal"]:
            problems.append(("subtotal", f"lines add up to {money(line_sum)}, quote says subtotal {money(stated['subtotal'])}"
                                         f" (difference {money(abs(line_sum - stated['subtotal']))})"))
        if vat_on_stated != (stated["vat"] or Decimal(0)):
            problems.append(("vat", f"VAT {rate}% of {money(stated['subtotal'])} is {money(vat_on_stated)},"
                                    f" quote says {money(stated['vat'] or 0)}"))
        if right_total != stated["total"]:
            problems.append(("total", f"recomputed VAT {money(right_vat)} and total {money(right_total)}, quote says total"
                                      f" {money(stated['total'])} (difference {money(abs(right_total - stated['total']))})"))
        for key, text in problems:
            out.append(f"  MISMATCH  {who}: {text}")
            findings.append((who, key))
        if not problems:
            out.append(f"  PASS  {who}: lines, subtotal, VAT and total add up (total {money(stated['total'])})")
    return fails


def check_coverage(rows, request, suppliers, out, findings, facts):
    out.append("CHECK 3  COVERAGE AND COMPLIANCE: every request line for every supplier, every limit met")
    fails = 0
    for who in suppliers:
        mine = [r for r in rows if r["supplier"] == who]
        items = [r for r in mine if r["kind"] in ("line", "term")]
        refs = [r["ref"] for r in items]
        for ref in request:
            if refs.count(ref) != 1:
                out.append(f"  FAIL  {who} {ref}: {refs.count(ref)} rows in the trace table, need exactly 1")
                fails += 1
        for r in mine:
            if r["kind"] in ("subtotal", "vat", "total"):
                if r["status"] != "stated":
                    out.append(f"  FAIL  {who} {r['kind']}: status must be \"stated\" on subtotal, VAT and total rows")
                    fails += 1
                continue
            if r["kind"] not in ("line", "term"):
                out.append(f"  FAIL  {who} {r['ref']}: kind \"{r['kind']}\" is not line, term, subtotal, vat or total")
                fails += 1
                continue
            if r["status"] not in ITEM_STATUS:
                out.append(f"  FAIL  {who} {r['ref']}: status \"{r['status']}\" is not one of {sorted(ITEM_STATUS)}")
                fails += 1
            elif r["status"] != "quoted":
                what = request.get(r["ref"], {}).get("what", r["quote_text"])
                out.append(f"  GAP   {who} {r['ref']} ({what}): {r['status']}")
                findings.append((who, r["ref"]))
        # compliance with the request's limits
        f = facts[who]
        for ref, want in request.items():
            if not ref.startswith("T"):
                continue
            row = next((r for r in items if r["ref"] == ref), None)
            value = num(row["qty"]) if row and row["status"] in ("quoted", "qualified") else None
            f["terms"][ref] = value
            if value is None or norm(row["unit"]) != norm(want["unit"]):
                f["compliant"] = False
                f["why"].append(f"{ref} not stated in the request's unit")
                continue
            if want["limit"] is None:
                out.append(f"  NOTE  {who} {ref}: the request sets no 'at most' or 'at least'; compare by eye")
                continue
            breach = value > want["qty"] if want["limit"] == "max" else value < want["qty"]
            if breach:
                f["compliant"] = False
                f["why"].append(f"{ref} {value} {want['unit']} breaks the limit of {want['qty']}")
                limit = "at most" if want["limit"] == "max" else "at least"
                said = f"{value} {want['unit']}, request says {limit} {want['qty']}"
                if row["status"] == "quoted":
                    out.append(f"  FAIL  {who} {ref}: {said}, but the row says quoted (mark it qualified and report it)")
                    fails += 1
                else:
                    out.append(f"  FLAG  {who} {ref}: BREACH {said}")
                    findings.append((who, ref))
    return fails


def normalise(rows, request, suppliers, out, facts):
    fails = 0
    for who in suppliers:
        f = facts[who]
        for ref, want in request.items():
            if not ref.startswith("R"):
                continue
            row = next((r for r in rows if r["supplier"] == who and r["ref"] == ref and r["kind"] == "line"), None)
            price = num(row["unit_price"]) if row else None
            if not row or row["status"] not in ("quoted", "qualified") or price is None:
                f["lines"][ref] = None
                f["unpriced"].append(ref)
                continue
            need = units_needed(row, want)
            given = num(row["units_needed"])
            if need is None:
                f["lines"][ref] = None
                f["unpriced"].append(ref)
                if given is not None:
                    out.append(f"  FAIL  {who} {ref}: \"{row['unit']}\" cannot be converted to \"{want['unit']}\"; leave"
                               f" units_needed empty and ask the supplier")
                    fails += 1
                continue
            if given != need:
                out.append(f"  FAIL  {who} {ref}: units_needed is {row['units_needed'] or '(blank)'}, the request needs {need}"
                           f" x \"{row['unit']}\"")
                fails += 1
            f["lines"][ref] = ((need * price).quantize(CENT), need, price, row["unit"])
        priced = [v[0] for v in f["lines"].values() if v]
        f["sub"] = sum(priced, Decimal(0))
        f["complete"] = not f["unpriced"]
    return fails


def decide(facts, rule, extra=None):
    """Award under the request's rule among complete and compliant suppliers. extra = (supplier, subtotal) to try."""
    subs = {w: f["sub"] for w, f in facts.items() if f["complete"] and f["compliant"]}
    if extra:
        subs[extra[0]] = extra[1]
    if not subs:
        return None
    low = min(subs, key=lambda w: subs[w])
    if rule["pct"] is None:
        return low
    lead = {w: facts[w]["terms"].get(rule["term"]) for w in subs}
    faster = [w for w in subs if w != low and lead[w] is not None and lead[low] is not None
              and subs[w] <= subs[low] * (1 + rule["pct"] / 100) and lead[w] <= lead[low] - rule["days"]]
    return min(faster, key=lambda w: (lead[w], subs[w])) if faster else low


def comparison(request, suppliers, facts, rule, rates, out):
    out.append("COMPARISON  computed by this script; paste the table and the AWARD line into the recommendation unchanged")
    award = decide(facts, rule)
    eligible = [f["sub"] for f in facts.values() if f["complete"] and f["compliant"]]
    low = min(eligible) if eligible else None
    table = ["| Line | " + " | ".join(suppliers) + " |", "|---" * (len(suppliers) + 1) + "|"]
    for ref, want in request.items():
        cells = []
        for who in suppliers:
            f = facts[who]
            if ref.startswith("R"):
                v = f["lines"].get(ref)
                if v is None:
                    cells.append("not priced")
                elif norm(v[3]) == norm(want["unit"]) and v[1] == want["qty"]:
                    cells.append(money(v[0]))
                else:
                    cells.append(f"{money(v[0])} ({v[1]} x {money(v[2])} per {v[3]})")
            else:
                value = f["terms"].get(ref)
                cells.append("not stated" if value is None else f"{value} {want['unit']}")
        table.append(f"| {ref} {want['what']}, {want['qty']} {want['unit']} | " + " | ".join(cells) + " |")
    rows = {"Subtotal excl. VAT": [], "VAT": [], "Total incl. VAT": [], "Above the lowest": [], "Complete and compliant": []}
    for who in suppliers:
        f = facts[who]
        if f["complete"]:
            vat = (f["sub"] * rates[who] / 100).quantize(CENT)
            rows["Subtotal excl. VAT"].append(money(f["sub"]))
            rows["VAT"].append(f"{money(vat)} ({rates[who]}%)")
            rows["Total incl. VAT"].append(money(f["sub"] + vat))
        else:
            rows["Subtotal excl. VAT"].append(f"{money(f['sub'])} + {', '.join(f['unpriced'])} not priced")
            rows["VAT"].append("-")
            rows["Total incl. VAT"].append("-")
        if f["complete"] and low is not None:
            pct = ((f["sub"] / low - 1) * 100).quantize(Decimal("0.1"))
            rows["Above the lowest"].append("lowest" if f["sub"] == low else f"+{pct}%")
        else:
            rows["Above the lowest"].append("-")
        why = ([f"{', '.join(f['unpriced'])} not priced"] if f["unpriced"] else []) + f["why"]
        rows["Complete and compliant"].append("yes" if not why else "no: " + "; ".join(why))
    table += [f"| {k} | " + " | ".join(v) + " |" for k, v in rows.items()]
    out.extend(table)
    clause = "" if rule["pct"] is None else (f"; prefer faster if within {rule['pct']}% and at least {rule['days']}"
                                             f" fewer {request[rule['term']]['unit']} on {rule['term']}")
    out.append(f"AWARD  {award or 'none'}" + (f" (rule: lowest complete and compliant{clause})" if award else
                                               " (no quote is both complete and compliant)"))
    for who in suppliers:
        f = facts[who]
        if f["complete"] or not f["compliant"]:
            continue
        top = max([g["sub"] for g in facts.values() if g["complete"]] + [f["sub"]]) * 2
        lo, hi = 0, int(top * 100)
        if decide(facts, rule, (who, f["sub"])) != who:
            out.append(f"THRESHOLD  {who}: would not win under the rule even if {', '.join(f['unpriced'])} cost nothing")
            continue
        while lo < hi:
            mid = (lo + hi + 1) // 2
            lo, hi = (mid, hi) if decide(facts, rule, (who, f["sub"] + Decimal(mid) / 100)) == who else (lo, mid - 1)
        out.append(f"THRESHOLD  {who}: wins under the rule only if the unpriced line(s) {', '.join(f['unpriced'])}"
                   f" come to {money(Decimal(lo) / 100)} or less, excl. VAT")
    return table, award


def check_outputs(outputs, findings, table, award, known, out):
    out.append("OUTPUTS  the deviation report and the recommendation match this run")
    fails = 0
    report = find_one(outputs, "*deviation-report.md", required=False)
    if not report:
        out.append("  FAIL  no deviation report in outputs/ yet")
        fails += 1
    else:
        text = [norm(line) for line in read_text(report).splitlines()]
        unique = list(dict.fromkeys(findings))
        for who, key in unique:
            pattern = r"\b" + re.escape(key.lower()) + r"\b"
            if not any(norm(who) in line and re.search(pattern, line) for line in text):
                out.append(f"  FAIL  {who} {key}: this finding is not in {report.name}")
                fails += 1
        out.append(f"  ....  {len(unique)} findings looked up in {report.name}")
    rec = find_one(outputs, "*recommendation.md", required=False)
    if not rec:
        out.append("  FAIL  no recommendation in outputs/ yet")
        return fails + 1
    rec_text = read_text(rec)
    rec_lines = {norm(line) for line in rec_text.splitlines()}
    changed = [row for row in table if norm(row) not in rec_lines]
    if changed:
        out.append(f"  FAIL  {rec.name}: the comparison table differs from the script's, first at \"{changed[0][:80]}\"")
        fails += 1
    m = re.search(r"recommended award:\**\s*(.+)", rec_text, re.I)
    named = norm(re.sub(r"[*_`]", "", m.group(1))) if m else ""
    if not m:
        out.append(f"  FAIL  {rec.name}: no \"**Recommended award:**\" line")
        fails += 1
    elif not named.startswith(norm(award or "none")):
        out.append(f"  FAIL  {rec.name}: recommends \"{m.group(1).strip()[:50]}\", the script's AWARD is {award or 'none'}")
        fails += 1
    for path in [p for p in (report, rec) if p]:
        body = read_text(path)
        figures = re.findall(r"\d[\d.,]*[.,]\d{2}(?!\d)|\d+(?:\.\d+)?\s*%", body)
        unknown = sorted({t for t in figures if num(t) not in known}, key=str)
        if unknown:
            out.append(f"  FAIL  {path.name}: figures not from the quotes, the request or this script: {', '.join(unknown)}")
            fails += 1
    return fails


def main(folder):
    inbox, outputs = folder / "inbox", folder / "outputs"
    request_path = find_one(inbox, "*request*.md")
    request, rule, request_text = read_request(request_path)
    rows = read_table(find_one(outputs, "*trace-table.csv"))
    if not rows:
        raise Stop("the trace table has a header but no rows")
    suppliers = list(dict.fromkeys(r["supplier"] for r in rows))
    rates = {w: next((num(r["vat_rate"]) for r in rows if r["supplier"] == w and r["kind"] == "vat"), None)
             or Decimal(0) for w in suppliers}
    facts = {w: {"lines": {}, "terms": {}, "unpriced": [], "why": [], "compliant": True, "complete": False,
                 "sub": Decimal(0)} for w in suppliers}
    out, findings = [], []
    fails = check_trace(rows, request, inbox, out, findings)
    fails += check_totals(rows, suppliers, out, findings)
    fails += check_coverage(rows, request, suppliers, out, findings, facts)
    fails += normalise(rows, request, suppliers, out, facts)
    table, award = comparison(request, suppliers, facts, rule, rates, out)
    known = numbers_in("\n".join(out)) | numbers_in(request_text)
    for r in rows:
        known |= {num(r[c]) for c in ("qty", "unit_price", "amount", "vat_rate") if num(r[c]) is not None}
    for src in {r["source_file"] for r in rows}:
        if (inbox / src).is_file():
            known |= numbers_in(read_text(inbox / src))
    fails += check_outputs(outputs, findings, table, award, known, out)
    print("\n".join(out))
    if fails:
        print(f"RESULT  NOT READY: {fails} problem(s) marked FAIL above. Fix the table or the outputs, then run again.")
        return 1
    print("RESULT  READY FOR REVIEW: figures traced, sums and award computed here, every finding reported."
          " The decision is yours.")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main(Path(sys.argv[1] if len(sys.argv) > 1 else ".")))
    except Stop as e:
        print(f"STOP  {e}")
        sys.exit(1)
    except (OSError, ValueError, KeyError, InvalidOperation) as e:
        print(f"STOP  could not read the inputs ({type(e).__name__}: {e}). Check the file formats in checks/README.md.")
        sys.exit(1)
