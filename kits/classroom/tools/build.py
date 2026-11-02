"""Build the classroom pack: Markdown -> HTML (print stylesheet) -> PDF, then check every PDF.

Usage (from the kit folder):  python tools/build.py
Inputs:  teacher-guide.md, lesson-slides.md, student-self-check.md, assignment-sheet.md, stance-cards.md
Outputs: the PDF with the same name next to each Markdown file, plus lesson-notes.pdf (the speaker notes of the slides).

Needs: Python 3.9+, Playwright for Python with Chromium (pip install playwright; playwright install chromium), and the
`markdown` package or markdown-it-py. Optional: pypdf or poppler's pdfinfo/pdftotext for the checks (a fallback reads the PDF).

Checks after the build: page count and page size per file, no slide or card whose text overflows its box, text selectable
(fonts embedded, the first heading found in the text when pdftotext is present), and no banned words, prices or pen name in
the sources. Any failure prints a PROBLEM line and the script exits with 1.

Adapted from strategy/drafts/build_pdf.py in the Mode Fluency repository. Code MIT.
"""
from __future__ import annotations

import html as htmlmod
import pathlib
import re
import shutil
import subprocess
import sys

KIT = pathlib.Path(__file__).resolve().parent.parent

BANNED = ["revolutionary", "unlock", "supercharge", "game-changing", "game changing", "seamless", "empower", "Hayen"]
PRICE = re.compile(r"[$£€]\s?\d")

# name: (kind, min pages, max pages)
JOBS = {
    "teacher-guide": ("doc", 8, 12),
    "lesson-slides": ("slides", 12, 16),
    "student-self-check": ("form", 2, 2),
    "assignment-sheet": ("form", 1, 1),
    "stance-cards": ("cards", 3, 3),
    "mode-log": ("form", 1, 1),
    "activity-handout": ("form", 1, 1),
}
A4 = (595.0, 842.0)        # points, tolerance below
WIDE = (960.0, 540.0)      # 13.333 x 7.5 in, 16:9

FONT_SERIF = 'Cambria, Georgia, "Times New Roman", serif'
FONT_SANS = '"Segoe UI", "Helvetica Neue", Arial, sans-serif'

BASE_CSS = f"""
html {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
body {{ font-family: {FONT_SERIF}; color: #111; background: #fff; margin: 0; }}
a {{ color: #111; text-decoration: underline; overflow-wrap: anywhere; }}
table {{ width: 100%; border-collapse: collapse; }}
th, td {{ border: 0.6pt solid #555; padding: 3pt 5pt; vertical-align: top; text-align: left; }}
th {{ background: #e8e8e8; }}
code {{ font-family: Consolas, "Courier New", monospace; }}
.pagebreak {{ break-after: page; page-break-after: always; height: 0; }}
"""

DOC_CSS = BASE_CSS + """
@page { size: A4; margin: 2cm; }
body { font-size: 11pt; line-height: 1.42; }
h1 { font-size: 21pt; line-height: 1.15; margin: 0 0 8pt; }
h2 { font-size: 14pt; margin: 18pt 0 6pt; break-after: avoid; page-break-after: avoid; }
h3 { font-size: 11.5pt; margin: 12pt 0 4pt; break-after: avoid; page-break-after: avoid; }
p, li { orphans: 3; widows: 3; }
p { margin: 0 0 7pt; }
ul, ol { margin: 0 0 7pt; padding-left: 18pt; }
li { margin-bottom: 2.5pt; }
p.meta { font-size: 9.5pt; color: #333; border-bottom: 0.75pt solid #999; padding-bottom: 8pt; margin-bottom: 12pt; }
blockquote { margin: 8pt 0; padding: 6pt 10pt; border-left: 3pt solid #111; background: #f2f2f2; break-inside: avoid; }
blockquote p { margin: 0; }
table { margin: 4pt 0 10pt; font-size: 9.5pt; line-height: 1.32; break-inside: avoid; page-break-inside: avoid; }
tr { break-inside: avoid; page-break-inside: avoid; }
section.refs li { font-size: 8.8pt; margin-bottom: 1.5pt; overflow-wrap: anywhere; }
h2.slide-head { font-size: 12pt; margin: 14pt 0 4pt; border-top: 0.75pt solid #999; padding-top: 8pt; }
"""

FORM_CSS = BASE_CSS + """
@page { size: A4; margin: 1.1cm 1.6cm; }
body { font-size: 10.5pt; line-height: 1.32; }
h1 { font-size: 17pt; margin: 0 0 5pt; }
h2 { font-size: 12.5pt; margin: 7pt 0 3pt; }
p { margin: 0 0 5pt; }
p.lead { font-size: 9.5pt; color: #222; }
ul { list-style: none; margin: 0 0 6pt; padding-left: 12pt; }
li { margin: 0 0 1pt; }
table { margin: 3pt 0 7pt; font-size: 9pt; line-height: 1.25; }
td:empty { height: 8.5mm; }
th:first-child:nth-last-child(2) { width: 42%; }
.blank { display: inline-block; width: 62mm; border-bottom: 0.75pt solid #111; height: 11pt; vertical-align: bottom; }
.blank.short { width: 32mm; }
.blank.tiny { width: 10mm; }
p.foot { font-size: 7.5pt; color: #444; margin-top: 6pt; }
blockquote { margin: 6pt 0 8pt; padding: 6pt 10pt; border-left: 3pt solid #111; background: #f2f2f2; }
blockquote p { margin: 0 0 4pt; }
ol { margin: 0 0 6pt; padding-left: 18pt; }
hr.cut { border: 0; border-top: 0.8pt dashed #555; margin: 14mm 0 10mm; }
"""

SLIDE_CSS = BASE_CSS + f"""
@page {{ size: 13.333in 7.5in; margin: 0; }}
body {{ font-family: {FONT_SANS}; }}
.slide {{ width: 13.333in; height: 7.5in; box-sizing: border-box; padding: 0.55in 0.8in 0.6in; position: relative;
         overflow: hidden; break-after: page; page-break-after: always; display: flex; flex-direction: column;
         justify-content: center; }}
.slide:last-child {{ break-after: auto; page-break-after: auto; }}
.slide h1 {{ font-size: 54pt; line-height: 1.08; margin: 0 0 18pt; }}
.slide h2 {{ font-size: 42pt; line-height: 1.1; margin: 0 0 16pt; }}
.slide p, .slide li {{ font-size: 26pt; line-height: 1.3; margin: 0 0 10pt; }}
.slide ul, .slide ol {{ margin: 0 0 8pt; padding-left: 30pt; }}
.slide table {{ font-size: 22pt; line-height: 1.25; margin: 6pt 0 12pt; }}
.slide th, .slide td {{ padding: 6pt 10pt; border-color: #333; }}
.slide p.example {{ font-family: {FONT_SERIF}; font-style: italic; border-left: 5pt solid #111; padding-left: 14pt;
                   margin-top: 8pt; }}
.slide p.small {{ font-size: 13pt; color: #333; margin-top: 10pt; }}
.slide .num {{ position: absolute; right: 0.5in; bottom: 0.3in; font-size: 11pt; color: #444; }}
.slide .mark {{ position: absolute; left: 0.8in; bottom: 0.3in; font-size: 11pt; color: #444; }}
.slide.title h1 {{ font-size: 64pt; }}
"""

CARD_CSS = BASE_CSS + f"""
@page {{ size: A4; margin: 0; }}
.sheet {{ width: 210mm; height: 297mm; break-after: page; page-break-after: always; position: relative; }}
.sheet:last-child {{ break-after: auto; page-break-after: auto; }}
.card {{ width: 210mm; height: 148.5mm; box-sizing: border-box; padding: 11mm 15mm 9mm; overflow: hidden; position: relative; }}
.card + .card {{ border-top: 0.8pt dashed #555; }}
.card h2 {{ font-family: {FONT_SANS}; font-size: 32pt; margin: 0 0 1mm; }}
.card p {{ font-size: 14pt; line-height: 1.32; margin: 0 0 3.4mm; }}
.card p > strong:first-child {{ display: block; font-size: 9.5pt; text-transform: uppercase; letter-spacing: 1.2pt;
                               color: #333; margin-bottom: 0.6mm; }}
.card p.rule {{ border: 1.5pt solid #111; padding: 2.5mm 4mm; font-weight: 600; }}
.card .lic {{ position: absolute; bottom: 5mm; left: 15mm; font-size: 7pt; color: #555; font-family: {FONT_SANS}; }}
.card p.tag {{ font-family: {FONT_SANS}; font-size: 12pt; text-transform: uppercase; letter-spacing: 1.5pt; color: #333;
              margin-bottom: 5mm; border-bottom: 1.5pt solid #111; padding-bottom: 2.5mm; }}
.card p.small {{ font-size: 8.5pt; color: #333; position: absolute; bottom: 7mm; left: 15mm; right: 15mm; margin: 0; }}
.card strong {{ font-family: {FONT_SANS}; }}
.card .cut {{ position: absolute; top: 3mm; right: 6mm; font-size: 7pt; color: #666; font-family: {FONT_SANS}; }}
"""

DOC_HEADER = ('<div style="font-family: Cambria, Georgia, serif; font-size: 7.5pt; color: #555; width: 100%; padding: 0 2cm; '
              'text-align: right;">{title}</div>')
DOC_FOOTER = ('<div style="font-family: Cambria, Georgia, serif; font-size: 7.5pt; color: #555; width: 100%; padding: 0 2cm; '
              'display: flex; justify-content: space-between;"><span>Mode Fluency classroom pack · CC BY-SA 4.0</span>'
              '<span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>')


# ---------- Markdown ----------

def md_to_html(text: str) -> str:
    try:
        import markdown  # type: ignore
        return markdown.markdown(text, extensions=["tables", "fenced_code"])
    except ImportError:
        from markdown_it import MarkdownIt
        return MarkdownIt("commonmark", {"html": True}).enable("table").render(text)


def strip_comments(text: str) -> str:
    return re.sub(r"<!--.*?-->\s*", "", text, flags=re.S)


def link_urls(body: str) -> str:
    return re.sub(r'(?<![="\'>])(https?://[^\s<]+?)([.,;)]?)(?=[\s<])',
                  lambda m: f'<a href="{m.group(1)}">{htmlmod.escape(m.group(1))}</a>{m.group(2)}', body)


def page(css: str, title: str, body: str) -> str:
    return (f'<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><title>{htmlmod.escape(title)}</title>'
            f"<style>{css}</style></head>\n<body>\n{body}\n</body></html>\n")


def first_heading(md: str) -> str:
    m = re.search(r"^#{1,3}\s+(.+)$", md, flags=re.M)
    return m.group(1).strip() if m else ""


def split_blocks(md: str) -> list[str]:
    """Split on lines holding only '---' (tables use |---|, so they are not affected)."""
    return [b.strip() for b in re.split(r"^---\s*$", strip_comments(md), flags=re.M) if b.strip()]


# ---------- Builders: each returns (html, pdf options) ----------

def build_doc(md: str) -> tuple[str, dict]:
    title = first_heading(md)
    body = md_to_html(strip_comments(md))
    body = re.sub(r"(</h1>\s*)<p>(.*?)</p>",
                  lambda m: m.group(1) + '<p class="meta">' + m.group(2).replace("\n", "<br>") + "</p>",
                  body, count=1, flags=re.S)
    body = link_urls(body)
    if "<h2>Sources</h2>" in body:
        body = body.replace("<h2>Sources</h2>", '<section class="refs"><h2>Sources</h2>', 1) + "</section>"
    opts = dict(format="A4", display_header_footer=True, header_template=DOC_HEADER.format(title=htmlmod.escape(title)),
                footer_template=DOC_FOOTER, margin={"top": "2cm", "bottom": "2cm", "left": "2cm", "right": "2cm"})
    return page(DOC_CSS, title, body), opts


def build_form(md: str) -> tuple[str, dict]:
    title = first_heading(md)
    body = link_urls(md_to_html(strip_comments(md)))
    return page(FORM_CSS, title, body), dict(format="A4", prefer_css_page_size=True)


def slide_parts(md: str) -> list[tuple[str, str]]:
    out = []
    for block in split_blocks(md):
        parts = re.split(r"^Notes:\s*$", block, maxsplit=1, flags=re.M)
        out.append((parts[0].strip(), parts[1].strip() if len(parts) > 1 else ""))
    return out


def build_slides(md: str) -> tuple[str, dict]:
    slides = slide_parts(md)
    secs = []
    for i, (content, _notes) in enumerate(slides, 1):
        cls = "slide title" if i == 1 else "slide"
        secs.append(f'<section class="{cls}">{md_to_html(content)}'
                    f'<div class="mark">Which mode are you in?</div><div class="num">{i} / {len(slides)}</div></section>')
    return page(SLIDE_CSS, first_heading(md), "\n".join(secs)), dict(prefer_css_page_size=True)


def build_notes(md: str) -> tuple[str, dict]:
    slides = slide_parts(md)
    deck = first_heading(md)
    body = [f"<h1>{htmlmod.escape(deck)} Lesson notes</h1>",
            '<p class="meta">Speaker notes for the slides, one section per slide, with timings. About 50 minutes in all.<br>'
            "Print this for yourself; the slides are in lesson-slides.pdf.</p>"]
    for i, (content, notes) in enumerate(slides, 1):
        head = first_heading(content)
        body.append(f'<h2 class="slide-head">Slide {i} · {htmlmod.escape(head)}</h2>')
        body.append(md_to_html(notes) if notes else "<p><em>No notes.</em></p>")
    title = f"{deck} Lesson notes"
    opts = dict(format="A4", display_header_footer=True, header_template=DOC_HEADER.format(title=htmlmod.escape(title)),
                footer_template=DOC_FOOTER, margin={"top": "2cm", "bottom": "2cm", "left": "2cm", "right": "2cm"})
    return page(DOC_CSS, title, link_urls("\n".join(body))), opts


def build_cards(md: str) -> tuple[str, dict]:
    lic = '<span class="lic">Mode Fluency classroom pack · CC BY-SA 4.0 · modefluency.com</span>'
    cards = []
    for i, c in enumerate(split_blocks(md)):
        inner = md_to_html(c).replace("<p><strong>The one rule</strong>", '<p class="rule"><strong>The one rule</strong>')
        cut = '<span class="cut">cut along the dashed line</span>' if i % 2 else ""
        foot = lic if "<p class=\"small\">" not in inner else ""
        cards.append(f'<div class="card">{cut}{inner}{foot}</div>')
    sheets = ['<div class="sheet">' + "".join(cards[i:i + 2]) + "</div>" for i in range(0, len(cards), 2)]
    return page(CARD_CSS, "Stance cards", "\n".join(sheets)), dict(prefer_css_page_size=True)


BUILDERS = {"doc": build_doc, "form": build_form, "slides": build_slides, "cards": build_cards}


# ---------- Checks ----------

def pdf_pages_and_sizes(pdf: pathlib.Path) -> tuple[int, list[tuple[float, float]]]:
    try:
        from pypdf import PdfReader  # type: ignore
        r = PdfReader(str(pdf))
        return len(r.pages), [(float(p.mediabox.width), float(p.mediabox.height)) for p in r.pages]
    except ImportError:
        pass
    exe = shutil.which("pdfinfo")
    if exe:
        out = subprocess.run([exe, "-f", "1", "-l", "9999", str(pdf)], capture_output=True, text=True,
                             encoding="utf-8", errors="replace").stdout
        n = int(re.search(r"^Pages:\s+(\d+)", out, flags=re.M).group(1))
        sizes = [(float(a), float(b)) for a, b in re.findall(r"Page\s+\d+ size:\s+([\d.]+) x ([\d.]+)", out)]
        return n, sizes
    raw = pdf.read_bytes().decode("latin-1")
    boxes = re.findall(r"/Type\s*/Page\b(?!s).*?/MediaBox\s*\[\s*0 0 ([\d.]+) ([\d.]+)\s*\]", raw, flags=re.S)
    return len(re.findall(r"/Type\s*/Page\b(?!s)", raw)), [(float(a), float(b)) for a, b in boxes]


def pdf_text(pdf: pathlib.Path) -> str | None:
    exe = shutil.which("pdftotext")
    if not exe:
        return None
    return subprocess.run([exe, str(pdf), "-"], capture_output=True, text=True, encoding="utf-8", errors="replace").stdout


def check_pdf(pdf: pathlib.Path, lo: int, hi: int, size: tuple[float, float], heading: str) -> list[str]:
    problems = []
    n, sizes = pdf_pages_and_sizes(pdf)
    if not lo <= n <= hi:
        problems.append(f"{pdf.name}: {n} pages, expected {lo}-{hi}")
    for i, (w, h) in enumerate(sizes, 1):
        if abs(w - size[0]) > 4 or abs(h - size[1]) > 4:
            problems.append(f"{pdf.name}: page {i} is {w:.0f} x {h:.0f} pt, expected {size[0]:.0f} x {size[1]:.0f}")
            break
    if b"/Font" not in pdf.read_bytes():
        problems.append(f"{pdf.name}: no fonts found, text may not be selectable")
    txt = pdf_text(pdf)
    if txt is not None and heading:
        words = re.sub(r"[^\w ]", " ", heading).split()[:3]
        flat = re.sub(r"\s+", " ", txt)
        if not all(w in flat for w in words):
            problems.append(f"{pdf.name}: heading '{heading}' not found in the extracted text")
    print(f"  {pdf.name}: {n} pages, {sizes[0][0]:.0f} x {sizes[0][1]:.0f} pt" if sizes else f"  {pdf.name}: {n} pages")
    return problems


def check_sources() -> list[str]:
    problems = []
    for md in sorted(KIT.glob("*.md")):
        text = md.read_text(encoding="utf-8")
        for w in BANNED:
            if re.search(r"\b" + re.escape(w), text, flags=re.I):
                problems.append(f"{md.name}: banned word '{w}'")
        if PRICE.search(text):
            problems.append(f"{md.name}: looks like a price: {PRICE.search(text).group(0)!r}")
    return problems


def overflow(pg, selector: str) -> list[int]:
    return pg.evaluate("""sel => [...document.querySelectorAll(sel)]
        .map((e, i) => (e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1) ? i + 1 : 0)
        .filter(Boolean)""", selector)


# ---------- Main ----------

def render(browser, html: str, out: pathlib.Path, opts: dict, box: str | None) -> list[str]:
    pg = browser.new_page()
    pg.set_content(html, wait_until="load")
    pg.emulate_media(media="print")
    problems = []
    if box:
        bad = overflow(pg, box)
        if bad:
            problems.append(f"{out.name}: text overflows {box} number(s) {bad}")
    pg.pdf(path=str(out), print_background=True, **opts)
    pg.close()
    return problems


def main() -> int:
    from playwright.sync_api import sync_playwright
    problems = check_sources()
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for name, (kind, lo, hi) in JOBS.items():
            md = (KIT / f"{name}.md").read_text(encoding="utf-8")
            html, opts = BUILDERS[kind](md)
            out = KIT / f"{name}.pdf"
            box = {"slides": ".slide", "cards": ".card"}.get(kind)
            problems += render(browser, html, out, opts, box)
            size = WIDE if kind == "slides" else A4
            heading = first_heading(md) if kind != "cards" else "The Oracle"
            problems += check_pdf(out, lo, hi, size, heading)
            if kind == "slides":
                nhtml, nopts = build_notes(md)
                nout = KIT / "lesson-notes.pdf"
                problems += render(browser, nhtml, nout, nopts, None)
                problems += check_pdf(nout, 1, 99, A4, "Lesson notes")
                missing = [i for i, (_c, n) in enumerate(slide_parts(md), 1) if not n]
                if missing:
                    problems.append(f"lesson-slides.md: slides without notes: {missing}")
        browser.close()
    for p in problems:
        print("PROBLEM:", p)
    print("build OK" if not problems else f"{len(problems)} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
