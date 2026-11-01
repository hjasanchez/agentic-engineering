"""Tests for check_quotes.py on the worked example. Run from the kit folder: python -I checks/tests/test_check_quotes.py
Each tampering test copies the example to a temporary folder, changes one thing, and expects the run to fail.
Licence: MIT (LICENSES/MIT.txt at the repository root)."""
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

KIT = Path(__file__).resolve().parents[2]
SCRIPT = KIT / "checks" / "check_quotes.py"
TABLE = Path("outputs") / "example-trace-table.csv"
REC = Path("outputs") / "example-recommendation.md"
REPORT = Path("outputs") / "example-deviation-report.md"


def run(folder):
    p = subprocess.run([sys.executable, "-I", str(SCRIPT), str(folder)], capture_output=True, text=True, encoding="utf-8")
    assert "Traceback" not in p.stdout + p.stderr, p.stdout + p.stderr
    return p.returncode, p.stdout


def tampered(*edits):
    """Copy the example and apply (relative path, old, new) edits; an empty `new` with `old` ending in a newline drops a line."""
    tmp = Path(tempfile.mkdtemp())
    shutil.copytree(KIT / "example", tmp / "example")
    for rel, old, new in edits:
        path = tmp / "example" / rel
        text = path.read_text(encoding="utf-8")
        assert old in text, f"fixture text not found in {rel}: {old}"
        path.write_text(text.replace(old, new, 1), encoding="utf-8")
    return tmp


def expect_fail(tmp, *phrases):
    try:
        code, out = run(tmp / "example")
        assert code == 1, out
        for phrase in phrases:
            assert phrase in out, f"missing {phrase!r} in:\n{out}"
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def test_example_is_ready_and_shows_the_three_faults():
    code, out = run(KIT / "example")
    assert code == 0, out
    assert 'FLAG  Fernwick Network Supply R5: quoted 1 x "half day (4 h)"' in out, out
    assert "MISMATCH  Orrin Bay Systems: lines add up to 3,854.00, quote says subtotal 3,584.00" in out, out
    assert "GAP   Tallowmere IT R5 (On-site installation and configuration): missing" in out, out
    assert "| Subtotal excl. VAT | 4,006.20 | 3,139.80 + R5 not priced | 3,854.00 |" in out, out
    assert "AWARD  Orrin Bay Systems" in out and "R5 come to 530.67 or less" in out, out
    assert "READY FOR REVIEW" in out


# Item 3: trace is line-level, and "missing" is verified against the quote.
def test_wrong_number_that_appears_elsewhere_on_the_page_fails():
    expect_fail(tampered((TABLE, "Delivery,1,lot,60.00,60.00", "Delivery,1,lot,640.00,640.00")),
                "Orrin Bay Systems R6: the line", "does not show unit_price 640.00, amount 640.00")


def test_unit_written_as_requested_fails():
    expect_fail(tampered((TABLE, "1,half day (4 h),380.00", "1,day (8 h),380.00")), 'does not show unit "day (8 h)"')


def test_model_arithmetic_in_the_table_fails():
    expect_fail(tampered((TABLE, "Subtotal,,,,3584.00", "Subtotal,,,,3854.00")),
                "Orrin Bay Systems subtotal: the line", "does not show amount 3854.00")


def test_false_missing_fails():
    expect_fail(tampered((TABLE, "Orrin Bay Systems,R6,line,quoted,Delivery,1,lot,60.00,60.00,,example-quote-C-orrinbay.txt,1,1,pos 6",
                          "Orrin Bay Systems,R6,line,missing,,,,,,,example-quote-C-orrinbay.txt,,,")),
                'Orrin Bay Systems R6: marked missing, but "delivery" appears')


# Item 1: the recommendation is checked against the script's own computation.
def test_altered_award_fails():
    expect_fail(tampered((REC, "**Recommended award:** Orrin Bay Systems", "**Recommended award:** Fernwick Network Supply")),
                'recommends "Fernwick Network Supply", the script\'s AWARD is Orrin Bay Systems')


def test_model_figure_in_recommendation_fails():
    expect_fail(tampered((REC, "Fernwick is +3.9% and not faster", "Fernwick at 3,806.20 is not faster")),
                "example-recommendation.md: figures not from the quotes, the request or this script: 3,806.20")


def test_edited_comparison_table_fails():
    expect_fail(tampered((REC, "| Subtotal excl. VAT | 4,006.20 |", "| Subtotal excl. VAT | 3,806.20 |")),
                "the comparison table differs from the script's")


def test_wrong_units_needed_fails():
    expect_fail(tampered((TABLE, "380.00,380.00,,example-quote-A-fernwick.txt,1,2,", "380.00,380.00,,example-quote-A-fernwick.txt,1,1,")),
                "Fernwick Network Supply R5: units_needed is 1, the request needs 2")


# Item 2: limits in the request are enforced.
def test_lead_time_over_the_limit_fails():
    expect_fail(tampered(("inbox/example-quote-B-tallowmere.txt", "Lead time 15 working days", "Lead time 20 working days"),
                         (TABLE, "Tallowmere IT,T1,term,quoted,Lead time,15,", "Tallowmere IT,T1,term,quoted,Lead time,20,")),
                "Tallowmere IT T1: 20 working days, request says at most 15, but the row says quoted")


def test_reported_breach_still_blocks_until_in_the_report():
    expect_fail(tampered(("inbox/example-quote-B-tallowmere.txt", "Lead time 15 working days", "Lead time 20 working days"),
                         (TABLE, "Tallowmere IT,T1,term,quoted,Lead time,15,", "Tallowmere IT,T1,term,qualified,Lead time,20,")),
                "FLAG  Tallowmere IT T1: BREACH", "Tallowmere IT T1: this finding is not in example-deviation-report.md")


# Coverage and reports.
def test_dropped_row_and_unreported_finding_fail():
    expect_fail(tampered((TABLE, "Tallowmere IT,R5,line,missing,,,,,,,example-quote-B-tallowmere.txt,,,no installation line or mention anywhere in the quote\n", ""),
                         (REPORT, "| 4 | Orrin Bay Systems | total | as above | Total 4,300.80", "| 4 | Orrin Bay Systems | sum | as above | 4,300.80"),
                         (REPORT, "VAT 770.80 and total 4,624.80", "VAT 770.80 and 4,624.80")),
                "Tallowmere IT R5: 0 rows in the trace table", "Orrin Bay Systems total: this finding is not in")


# Item 5: a CSV saved by a spreadsheet (BOM, semicolons, Excel quoting) still reads.
def test_excel_style_csv_reads():
    tmp = tampered()
    try:
        path = tmp / "example" / TABLE
        import csv
        rows = list(csv.reader(path.open(encoding="utf-8")))
        with path.open("w", encoding="utf-8-sig", newline="") as f:
            csv.writer(f, delimiter=";", quoting=csv.QUOTE_ALL).writerows(rows)
        code, out = run(tmp / "example")
        assert code == 0 and "READY FOR REVIEW" in out, out
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def test_quote_with_decimal_commas_traces():
    tmp = tampered()
    try:
        import re
        path = tmp / "example" / "inbox" / "example-quote-C-orrinbay.txt"
        swap = lambda m: m.group(0).replace(",", "_").replace(".", ",").replace("_", ".")
        path.write_text(re.sub(r"\d{1,3}(?:,\d{3})*\.\d{2}", swap, path.read_text(encoding="utf-8")), encoding="utf-8")
        assert "3.584,00" in path.read_text(encoding="utf-8")
        code, out = run(tmp / "example")
        assert code == 0 and "READY FOR REVIEW" in out, out
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def test_bad_table_gives_a_stop_line_not_a_traceback():
    expect_fail(tampered((TABLE, "supplier,ref,kind", "vendor,ref,kind")), "STOP", "missing columns ['supplier']")


if __name__ == "__main__":
    tests = [f for name, f in globals().items() if name.startswith("test_")]
    for t in tests:
        t()
        print(f"ok  {t.__name__}")
    print(f"{len(tests)}/{len(tests)} passed")
