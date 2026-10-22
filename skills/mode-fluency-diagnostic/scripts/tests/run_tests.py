"""Run score_audit.py on the must-pass and must-fail inputs. Usage: python3 -I scripts/tests/run_tests.py"""
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT = os.path.join(HERE, "..", "score_audit.py")
BASE = [sys.executable, "-I", SCRIPT]
OPTS = ["--root", os.path.join(HERE, "fixture"), "--transcript", os.path.join(HERE, "transcript.json")]
MUST_REPORT = [
    "autonomy 'Autonomous agent' is not one of",          # invalid autonomy enum
    "not a citation", "trust me",                          # T1: free text as evidence
    "context: not a citation", "'searched'",               # T2: bare "searched"
    'quote not found on CLAUDE.md:2: "never edit inputs/"',  # T9: fabricated quote on a real line
    "judgment: Makefile has 2 lines; cited 3",              # T4: extensionless path is checked
    "'see CLAUDE.md:99'",                                   # T5: cite not at the start
    "evaluation: evidence must be a list",                  # T6: string instead of list
    "absolute path not allowed: /etc/passwd",               # T8: absolute path
    "path escapes --root: ../../score_audit.py",            # new: relative escape
    "[A9] not in transcript",                               # interview cite that does not exist
    "search log names no path or pattern",                  # "searched everywhere"
    "stance 'Wizard' is not one of the fourteen",           # T3: invalid stance name
    "stance Wizard: cited file not found: nofile.md",       # T3: stance cite path-checked
    'quote not found in [A3]: "I checked every row"',       # fabricated interview quote
]
failures = 0
p = subprocess.run(BASE + [os.path.join(HERE, "must_pass.json")] + OPTS, capture_output=True, text=True)
ok = p.returncode == 0 and "Binding constraint:** Prompt" in p.stdout and "Evaluation ❌: fix before the layer fix" in p.stdout
print(("PASS" if ok else "FAIL") + " must_pass.json: exit 0, binding Prompt, blocking gap Evaluation")
failures += not ok
if not ok:
    print(p.stdout, p.stderr)
f = subprocess.run(BASE + [os.path.join(HERE, "must_fail.json")] + OPTS, capture_output=True, text=True)
missing = [m for m in MUST_REPORT if m not in f.stdout]
ok = f.returncode == 1 and not missing
print(("PASS" if ok else "FAIL") + f" must_fail.json: exit {f.returncode}, {len(MUST_REPORT) - len(missing)}/{len(MUST_REPORT)} expected errors reported")
failures += not ok
for m in missing:
    print("  not reported:", m)
if not ok:
    print(f.stdout)
for argv, code in [(["--root"], 2), ([os.path.join(HERE, "transcript.json")], 1)]:
    r = subprocess.run(BASE + [os.path.join(HERE, "must_pass.json")] + argv if argv == ["--root"] else BASE + argv,
                       capture_output=True, text=True)
    ok = r.returncode == code and "Traceback" not in r.stdout + r.stderr
    print(("PASS" if ok else "FAIL") + f" {' '.join(os.path.basename(a) for a in argv)}: exit {r.returncode} (want {code}), no traceback")
    failures += not ok
sys.exit(1 if failures else 0)
