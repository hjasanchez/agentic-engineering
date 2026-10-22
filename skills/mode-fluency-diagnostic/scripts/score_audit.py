#!/usr/bin/env python3
"""Validate a Mode Fluency audit JSON and print its summary and binding constraint.

Usage: python3 -I score_audit.py audit.json [--root PATH]
  --root PATH  also check that every cited "path:line" exists under PATH and the line is in range.
Exit code: 0 = valid, 1 = validation errors (printed), 2 = unreadable input. Standard library only.
"""
import json
import os
import re
import sys

LAYERS = ["prompt", "context", "intent", "judgment", "coherence"]
META = ["evaluation", "harness"]
GRADES = {"strong": "✅ Strong", "partial": "⚠️ Partial", "missing": "❌ Missing",
          "not_assessable": "◻️ Not assessable"}
WEAK = {"partial", "missing"}
CITE = re.compile(r"^([^\s:]+\.[A-Za-z0-9]+|[^\s:]+/):(\d+)")


def validate(audit, root):
    errors = []
    comps = audit.get("components", {})
    for name in LAYERS + META:
        c = comps.get(name)
        if not isinstance(c, dict):
            errors.append(f"{name}: missing component entry")
            continue
        grade, ev = c.get("grade"), c.get("evidence") or []
        if grade not in GRADES:
            errors.append(f"{name}: grade {grade!r} is not one of {sorted(GRADES)}")
            continue
        if grade in ("strong", "partial") and not ev:
            errors.append(f"{name}: graded {grade} with no evidence")
        if grade == "missing" and not any(str(e).lower().startswith("searched") for e in ev):
            errors.append(f"{name}: graded missing without a 'searched ...' log entry")
        if grade == "not_assessable" and not c.get("gap"):
            errors.append(f"{name}: not_assessable needs a gap note saying what would make it assessable")
        if root:
            for e in ev:
                m = CITE.match(str(e))
                if not m:
                    continue
                path, line = os.path.join(root, m.group(1)), int(m.group(2))
                if not os.path.isfile(path):
                    errors.append(f"{name}: cited file not found: {m.group(1)}")
                    continue
                with open(path, encoding="utf-8", errors="replace") as fh:
                    n = sum(1 for _ in fh)
                if not 1 <= line <= n:
                    errors.append(f"{name}: {m.group(1)} has {n} lines; cited line {line}")
    for s in audit.get("stances", []):
        if not s.get("evidence"):
            errors.append(f"stance {s.get('stance')!r}: mapping without evidence")
    return errors


def binding(audit):
    comps = audit["components"]
    autonomy = str(audit.get("autonomy", "unknown")).lower()
    if autonomy in ("autonomous", "continuous"):
        for m in META:
            if comps[m]["grade"] == "missing":
                return m, f"exception (a): autonomy is {autonomy} and {m} is missing"
    for i, layer in enumerate(LAYERS):
        g = comps[layer]["grade"]
        if g == "not_assessable":
            above = [x for x in LAYERS[i + 1:] if comps[x]["grade"] in WEAK]
            hint = f"; lowest weak layer seen above it: {above[0]}" if above else ""
            return None, f"undetermined: {layer} is not assessable and every layer below it is strong{hint}"
        if g in WEAK:
            return layer, "dependency rule: lowest cognitive layer graded partial or missing"
    weak_meta = [m for m in META if comps[m]["grade"] in WEAK]
    if weak_meta:
        return weak_meta[0], "all cognitive layers strong; weakest meta-function"
    return None, "no weak component found"


def main(argv):
    args = argv[1:]
    root = None
    if "--root" in args:
        i = args.index("--root")
        root = args[i + 1] if i + 1 < len(args) else None
        args = args[:i] + args[i + 2:]
    if len(args) != 1:
        print(__doc__)
        return 2
    try:
        with open(args[0], encoding="utf-8") as fh:
            audit = json.load(fh)
    except (OSError, ValueError) as exc:
        print(f"cannot read audit JSON: {exc}")
        return 2
    errors = validate(audit, root)
    if errors:
        print("INVALID: fix these before reporting any grade")
        for e in errors:
            print(f"- {e}")
        return 1
    print(f"# Audit summary: {audit.get('scope', '(scope not stated)')}\n")
    print("| Component | Grade | Evidence items | Primary gap |")
    print("|---|---|---|---|")
    for name in LAYERS + META:
        c = audit["components"][name]
        gap = str(c.get("gap", "")).replace("|", "/")
        print(f"| {name.capitalize()} | {GRADES[c['grade']]} | {len(c.get('evidence') or [])} | {gap} |")
    comp, why = binding(audit)
    print(f"\n**Binding constraint:** {comp.capitalize() if comp else 'none'} ({why})")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
