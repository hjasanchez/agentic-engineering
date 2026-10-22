#!/usr/bin/env python3
"""Validate a Mode Fluency audit JSON, then print its summary, binding constraint and blocking gaps.

Usage: python3 -I score_audit.py AUDIT.json [--root DIR] [--transcript ANSWERS.json]
  --root DIR          check every cited path:line exists under DIR, and that a quoted fragment appears on that line
  --transcript FILE   interview answers as {"A1": "text", ...}; every [A<n>] cited must exist, and its quote must appear
Exit: 0 valid · 1 validation errors (all printed) · 2 bad arguments or unreadable input. Standard library only.
"""
import json
import os
import re
import sys

LAYERS = ["prompt", "context", "intent", "judgment", "coherence"]
META = ["evaluation", "harness"]
GRADES = {"strong": "✅ Strong", "partial": "⚠️ Partial", "missing": "❌ Missing",
          "not_assessable": "◻️ Not assessable"}
AUTONOMY = ["assistive", "directed", "autonomous", "continuous", "not_assessable"]
STANCES = {"oracle", "genie", "interpreter", "executor", "miner", "tutor", "adversary", "scribe", "simulator",
           "librarian", "mirror", "translator", "therapist", "therapist / confessor", "confessor", "muse"}
QUOTE = r'(?:\s*["“](?P<q>[^"”]+)["”])?'
FILE_CITE = re.compile(r'^(?P<path>[^\s:"“\[]+):(?P<a>\d+)(?:[-–](?P<b>\d+))?' + QUOTE)
ANSWER_CITE = re.compile(r'^\[A(?P<n>\d+)\]' + QUOTE)
MSG_CITE = re.compile(r'^\[msg\]\s*["“][^"”]+["”]')
EMBEDDED = re.compile(r'(?<![\w/.])([\w.-]*[./][\w./-]*):(\d+)(?:[-–](\d+))?')
SEARCH = re.compile(r'^searched\s+(?P<what>.+)$', re.I)
PATTERNISH = re.compile(r'[\w*?\]-]*[./*][\w*?./\[\]-]*|\b[A-Z][A-Za-z]+file\b')


def norm(text):
    return re.sub(r"\s+", " ", text).strip().lower()


class Checker:
    def __init__(self, root, answers):
        self.root, self.answers, self.errors, self.unchecked = root, answers, [], 0

    def err(self, msg):
        self.errors.append(msg)

    def file_lines(self, where, path):
        if os.path.isabs(path):
            self.err(f"{where}: absolute path not allowed: {path}")
            return None
        full = os.path.realpath(os.path.join(self.root, path))
        if os.path.commonpath([full, os.path.realpath(self.root)]) != os.path.realpath(self.root):
            self.err(f"{where}: path escapes --root: {path}")
            return None
        if not os.path.isfile(full):
            self.err(f"{where}: cited file not found: {path}")
            return None
        with open(full, encoding="utf-8", errors="replace") as fh:
            return fh.read().splitlines()

    def check_file(self, where, path, a, b, quote):
        if self.root is None:
            self.unchecked += 1
            return
        lines = self.file_lines(where, path)
        if lines is None:
            return
        a, b = int(a), int(b or a)
        if not 1 <= a <= b <= len(lines):
            self.err(f"{where}: {path} has {len(lines)} lines; cited {a}" + (f"-{b}" if b != a else ""))
            return
        if quote and norm(quote) not in norm(" ".join(lines[a - 1:b])):
            self.err(f'{where}: quote not found on {path}:{a}' + (f"-{b}" if b != a else "") + f': "{quote}"')

    def entry(self, where, e):
        """Check one evidence string. Returns its kind: file, answer, msg, search, or None if invalid."""
        if not isinstance(e, str) or not e.strip():
            self.err(f"{where}: evidence entries must be non-empty strings, got {e!r}")
            return None
        e = e.strip()
        kind = None
        m = SEARCH.match(e)
        if m:
            if not PATTERNISH.search(m.group("what")):
                self.err(f"{where}: search log names no path or pattern: {e!r}")
                return None
            kind = "search"
        elif ANSWER_CITE.match(e):
            m = ANSWER_CITE.match(e)
            key = f"A{m.group('n')}"
            if self.answers is not None:
                if key not in self.answers:
                    self.err(f"{where}: [{key}] not in transcript")
                elif m.group("q") and norm(m.group("q")) not in norm(str(self.answers[key])):
                    self.err(f'{where}: quote not found in [{key}]: "{m.group("q")}"')
            kind = "answer"
        elif MSG_CITE.match(e):
            kind = "msg"
        elif FILE_CITE.match(e):
            m = FILE_CITE.match(e)
            self.check_file(where, m.group("path"), m.group("a"), m.group("b"), m.group("q"))
            kind = "file"
        else:
            self.err(f"{where}: not a citation (use path:line, [A<n>], [msg] \"quote\" or 'searched <pattern>'): {e!r}")
            return None
        rest = e[FILE_CITE.match(e).end():] if kind == "file" else e
        if kind != "search":
            for p, a, b in EMBEDDED.findall(rest):
                self.check_file(where, p, a, b, None)
        return kind

    def evidence(self, where, ev):
        if not isinstance(ev, list):
            self.err(f"{where}: evidence must be a list, got {type(ev).__name__}")
            return []
        return [k for k in (self.entry(where, e) for e in ev) if k]


def validate(audit, chk):
    if not isinstance(audit, dict):
        chk.err("top level must be a JSON object")
        return
    auto = audit.get("autonomy")
    if auto not in AUTONOMY:
        chk.err(f"autonomy {auto!r} is not one of {AUTONOMY}")
    elif auto != "not_assessable":
        kinds = chk.evidence("autonomy", audit.get("autonomy_evidence", []))
        if not any(k in ("file", "answer", "msg") for k in kinds):
            chk.err("autonomy: needs at least one file, [A<n>] or [msg] citation in autonomy_evidence (or use not_assessable)")
    comps = audit.get("components")
    if not isinstance(comps, dict):
        chk.err("components must be an object keyed by component name")
        return
    for name in LAYERS + META:
        c = comps.get(name)
        if not isinstance(c, dict):
            chk.err(f"{name}: missing component entry")
            continue
        grade = c.get("grade")
        if grade not in GRADES:
            chk.err(f"{name}: grade {grade!r} is not one of {sorted(GRADES)}")
            continue
        kinds = chk.evidence(name, c.get("evidence", []))
        if grade in ("strong", "partial") and not any(k in ("file", "answer", "msg") for k in kinds):
            chk.err(f"{name}: graded {grade} without a file, [A<n>] or [msg] citation")
        if grade == "missing" and "search" not in kinds and "answer" not in kinds:
            chk.err(f"{name}: graded missing without a search log (or, in an interview, an [A<n>] answer)")
        if grade == "not_assessable" and not str(c.get("gap", "")).strip():
            chk.err(f"{name}: not_assessable needs a gap note saying what would make it assessable")
    stances = audit.get("stances", [])
    if not isinstance(stances, list):
        chk.err("stances must be a list")
        return
    for s in stances:
        if not isinstance(s, dict):
            chk.err(f"stance entry must be an object, got {s!r}")
            continue
        name = str(s.get("stance", ""))
        if name.lower() not in STANCES:
            chk.err(f"stance {name!r} is not one of the fourteen")
        kinds = chk.evidence(f"stance {name}", s.get("evidence", []))
        if not any(k in ("file", "answer", "msg") for k in kinds):
            chk.err(f"stance {name!r}: mapping without a file, [A<n>] or [msg] citation")


def diagnose(audit):
    comps, auto = audit["components"], audit["autonomy"]
    binding = None
    for i, layer in enumerate(LAYERS):
        g = comps[layer]["grade"]
        if g == "not_assessable":
            above = [x for x in LAYERS[i + 1:] if comps[x]["grade"] in ("partial", "missing")]
            hint = f"; candidate: {above[0].capitalize()}" if above else ""
            binding = f"undetermined until {layer.capitalize()} is seen{hint}"
            break
        if g in ("partial", "missing"):
            binding = f"{layer.capitalize()} (lowest weak cognitive layer)"
            break
    if binding is None:
        binding = "none: all five layers strong; next step is the next autonomy level, with its checks"
    meta = [f"{m.capitalize()} {GRADES[comps[m]['grade']]}" for m in META if comps[m]["grade"] != "strong"]
    if auto == "not_assessable":
        blocking = ["not checked: autonomy not assessable"]
    elif auto in ("autonomous", "continuous"):
        blocking = [f"{m.capitalize()} ❌: fix before the layer fix" for m in META if comps[m]["grade"] == "missing"]
    else:
        blocking = []
    return binding, meta, blocking


def main(argv):
    args, opts = [], {}
    it = iter(argv[1:])
    for a in it:
        if a in ("--root", "--transcript"):
            v = next(it, None)
            if not v or v.startswith("--"):
                print(f"{a} needs a value")
                return 2
            opts[a] = v
        else:
            args.append(a)
    if len(args) != 1:
        print(__doc__)
        return 2
    root = opts.get("--root")
    if root and not os.path.isdir(root):
        print(f"--root is not a directory: {root}")
        return 2
    answers = None
    try:
        with open(args[0], encoding="utf-8") as fh:
            audit = json.load(fh)
        if "--transcript" in opts:
            with open(opts["--transcript"], encoding="utf-8") as fh:
                answers = json.load(fh)
            if not isinstance(answers, dict):
                print("transcript must be an object like {\"A1\": \"...\"}")
                return 2
    except (OSError, ValueError) as exc:
        print(f"cannot read input: {exc}")
        return 2
    chk = Checker(root, answers)
    validate(audit, chk)
    if chk.errors:
        print(f"INVALID ({len(chk.errors)} errors): fix these before reporting any grade")
        for e in chk.errors:
            print(f"- {e}")
        return 1
    print(f"# Audit summary: {audit.get('scope', '(scope not stated)')}\n")
    print(f"Autonomy: {audit['autonomy']}\n")
    print("| Component | Grade | Evidence items | Primary gap |\n|---|---|---|---|")
    for name in LAYERS + META:
        c = audit["components"][name]
        gap = str(c.get("gap", "")).replace("|", "/")
        print(f"| {name.capitalize()} | {GRADES[c['grade']]} | {len(c.get('evidence', []))} | {gap} |")
    binding, meta, blocking = diagnose(audit)
    print(f"\n**Binding constraint:** {binding}")
    print(f"**Meta-function gaps:** {', '.join(meta) or 'none'}")
    print(f"**Blocking gaps:** {', '.join(blocking) or 'none'}")
    if chk.unchecked:
        print(f"\nNote: {chk.unchecked} file citations not checked (pass --root to check them).")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
