"""Site QA gate for docs/ (the Mode Fluency site). Run before every commit that touches docs/.

Usage:
    python strategy/qa/site_qa.py <docs-dir> [--write-buildlog] [--out <report.md>] [--network] [--pages a.html,b.html]

Prints one PASS/FAIL line, writes a Markdown report (one table per check), exits 0 on PASS, 1 on FAIL, 2 on a
harness error. Headless Chromium through Playwright for Python, pages opened from file://.

Checks (the gate in CLAUDE.md):
  1. Loads: every page at 390 and 1280 px, light and dark, reduced motion on and off (4 loads per page and width
     pair): 0 console errors (console.error and uncaught page errors), 0 failed requests, scrollWidth <= viewport width
     at the top, middle and bottom of the page.
  2. JavaScript off: every page at 390 and 1280 px (light). "Readable" = <main> has >= 400 characters of text, the h1
     is visible, no horizontal overflow, and no text that is visible with JS on is hidden without JS, except inside
     instruments the CSS hides on purpose (`html:not(.js) ...` rules; detected by adding the `js` class and checking
     the element appears).
  3. Contrast: every visible text element on every page at both widths, in both themes, on the reduced-motion loads
     (static frames), plus three interactive states (diagnostic report, a matrix selection, a stances filter). Ported from strategy/design-directions/A-instrument/_qa/qa.js: the text
     colour is composited over the stack of backgrounds under the element's centre (elementsFromPoint, alpha
     compositing, SVG fills). Changes from qa.js: any CSS colour syntax is resolved through a 1x1 canvas (qa.js
     silently skipped colours it could not parse); ancestor opacity is multiplied into the text alpha; disabled
     controls are listed but exempt (WCAG 1.4.3 "inactive user interface component"). Floor 4.5:1.
  4. Banned words (revolutionary, unlock, supercharge, game-changing, seamless, empower): case-insensitive substring
     match on the visible text of every page (innerText with JS on and with JS off, plus the <title>).
  5. Diagnostic: every answer combination from docs/assets/diagnose.js returns a non-empty stance, layer, guardrail
     and level, with no "undefined"/"NaN" in the result or the copied text (window.ModeFluencyDiagnostic.compute/text
     over .paths()). The expected count is derived twice, independently: by parsing STANCE_QS/COMMON_QS in the
     source, and by walking every branch of the live UI (clicking options and Back). All three numbers must agree.
  6. Footer build log: the numbers in every page's footer (<ol id="ticker-lines">) must equal what this run
     measured (and, only if about.html still carries an <!-- @aboutlog --> table, that table too).

Where the footer gets its numbers: nowhere at runtime. Each page carries a static copy of the build log inside
    <ol class="sys ticker-lines" id="ticker-lines"> ... </ol>
(assets/field.js only appends one live "live: N fields ..." line, aria-hidden). docs/_qa/buildlog.json holds the
same text but no page reads it. --write-buildlog therefore rewrites buildlog.json and the ticker list in every page,
dated today, then re-reads them to confirm they match. The about.html build-log table (between <!-- @aboutlog -->
and <!-- /@aboutlog -->) was removed on 2026-10-29; the markers are optional, and when they are absent no about rows
are written or checked.

No network: requests to http(s) hosts (Google Fonts, YouTube thumbnails) are answered locally with an empty
stylesheet / a 1x1 GIF and listed in the report, so pages render in fallback fonts. --network lets them through.
"""
from __future__ import annotations

import argparse
import datetime as _dt
import html
import json
import math
import re
import sys
import time
from pathlib import Path

try:
    from playwright.sync_api import sync_playwright
except ImportError:  # pragma: no cover
    print("FAIL harness: playwright for Python is not installed (pip install playwright; playwright install chromium)")
    sys.exit(2)

WIDTHS = [390, 1280]
HEIGHTS = {390: 844, 1280: 800}
THEMES = ["light", "dark"]
MOTIONS = ["no-preference", "reduce"]  # reduced motion off, on
BANNED = ["revolutionary", "unlock", "supercharge", "game-changing", "seamless", "empower"]
FLOOR = 4.5
GIF_1PX = bytes.fromhex("47494638396101000100800000ffffff00000021f90401000000002c00000000010001000002024401003b")

# --------------------------------------------------------------------------------------------- browser-side code
CONTRAST_JS = r"""
() => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const cache = new Map(); const unparsed = new Set();
  function parse(c) {
    if (!c || c === 'none' || c === 'transparent') return null;
    if (cache.has(c)) { const v = cache.get(c); return v && v.slice(); }
    let out = null, m;
    if ((m = c.match(/^rgba?\(([^)]+)\)$/))) {
      const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);
      out = [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
    } else if ((m = c.match(/^color\(srgb ([^)]+)\)$/))) {
      const q = m[1].split(/[ \/]+/).filter(Boolean).map(Number);
      out = [q[0] * 255, q[1] * 255, q[2] * 255, q.length > 3 ? q[3] : 1];
    }
    if (!out || out.some(v => !isFinite(v))) {
      // any other syntax (oklch, lab, color-mix results ...): let the browser draw it and read the pixel back
      cx.fillStyle = '#010203'; cx.fillStyle = c;
      if (String(cx.fillStyle).toLowerCase() === '#010203' && c.toLowerCase() !== '#010203') { unparsed.add(c); out = null; }
      else { cx.clearRect(0, 0, 1, 1); cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; out = [d[0], d[1], d[2], d[3] / 255]; }
    }
    cache.set(c, out); return out && out.slice();
  }
  function lum([r, g, b]) { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); }
  function over(top, bot) { const a = top[3]; return [top[0] * a + bot[0] * (1 - a), top[1] * a + bot[1] * (1 - a), top[2] * a + bot[2] * (1 - a), 1]; }
  function visible(el) {
    for (let n = el; n && n.nodeType === 1; n = n.parentElement || n.parentNode) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
      if (n.getAttribute && n.getAttribute('opacity') === '0') return false;
    }
    const r = el.getBoundingClientRect(); return r.width > 1 && r.height > 1;
  }
  function cumOpacity(el) { let o = 1; for (let n = el; n && n.nodeType === 1; n = n.parentElement) { const v = parseFloat(getComputedStyle(n).opacity); if (isFinite(v)) o *= v; } return o; }
  function sel(el) {
    let s = el.tagName.toLowerCase(); if (el.id) s += '#' + el.id;
    const c = (el.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 2); if (c.length) s += '.' + c.join('.');
    return s;
  }
  let base = [255, 255, 255, 1];
  const htmlBg = parse(getComputedStyle(document.documentElement).backgroundColor); if (htmlBg && htmlBg[3] > 0) base = over(htmlBg, base);
  const bodyBgRaw = parse(getComputedStyle(document.body).backgroundColor);
  const bodyBg = bodyBgRaw && bodyBgRaw[3] > 0 ? over(bodyBgRaw, base) : base;
  const els = new Set();
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) { const t = tw.currentNode; if (t.nodeValue.trim() && t.parentElement && !t.parentElement.closest('script,style,noscript,title,desc,template')) els.add(t.parentElement); }
  const out = [];
  const sx = scrollX, sy = scrollY;
  for (const el of els) {
    if (!visible(el)) continue;
    if (el.closest('.vh')) continue;
    if (el.closest('details:not([open])') && !el.closest('summary')) continue;
    if (el.classList.contains('skip-link')) { window.scrollTo(0, 0); el.focus(); } else el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
    const r = el.getBoundingClientRect();
    const isSvg = el instanceof SVGElement;
    const cs = getComputedStyle(el);
    let fg = parse(isSvg ? cs.fill : cs.color);
    if (!fg) { out.push({ skipped: true, why: 'colour not parsed: ' + (isSvg ? cs.fill : cs.color), text: (el.textContent || '').trim().slice(0, 50), sel: sel(el) }); continue; }
    if (isSvg) fg[3] *= parseFloat(cs.fillOpacity || 1);
    fg[3] *= cumOpacity(el);
    const ownerSvg = isSvg ? el.ownerSVGElement || el.closest('svg') : null;
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const stack = [];
    const list = document.elementsFromPoint(Math.min(innerWidth - 1, Math.max(0, x)), Math.min(innerHeight - 1, Math.max(0, y)));
    for (const c of list) {
      // SVG shapes count as background only if painted before the text (earlier in document order); later ones sit on top
      const rel = c === el || c.contains(el) || (ownerSvg && ownerSvg.contains(c) && c !== el && !(c instanceof SVGTextElement) && !(c instanceof SVGTSpanElement)
                  && (c.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING));
      if (!rel) continue;
      const ccs = getComputedStyle(c);
      let col = null;
      if (c instanceof SVGGeometryElement && !(c instanceof SVGTextContentElement)) {
        if (c.tagName === 'line' || c.tagName === 'path' && ccs.fill === 'none') continue;
        col = parse(ccs.fill); if (col) col[3] *= parseFloat(ccs.fillOpacity || 1) * parseFloat(ccs.opacity || 1);
      } else if (!(c instanceof SVGElement)) { col = parse(ccs.backgroundColor); }
      if (col && col[3] > 0) { stack.push(col); if (col[3] >= 1) break; }
    }
    let bg = bodyBg;
    for (let i = stack.length - 1; i >= 0; i--) bg = stack[i][3] >= 1 ? stack[i] : over(stack[i], bg);
    if (fg[3] < 1) fg = over(fg, bg);
    const L1 = lum(fg), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    if (el.classList.contains('skip-link')) el.blur();
    const exempt = !!el.closest(':disabled, [aria-disabled="true"]');
    out.push({ ratio: Math.round(ratio * 100) / 100, raw: ratio, text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50), sel: sel(el),
               fg: fg.slice(0, 3).map(Math.round).join(','), bg: bg.slice(0, 3).map(Math.round).join(','), exempt });
  }
  window.scrollTo(sx, sy);
  return { items: out, unparsed: [...unparsed] };
}
"""

VISIBLE_TEXT_JS = r"""
() => {
  return { inner: document.body.innerText, title: document.title };
}
"""

NOJS_JS = r"""
() => {
  const vis = el => el.checkVisibility({ opacityProperty: true, visibilityProperty: true });
  const main = document.querySelector('main');
  const h1 = document.querySelector('h1');
  const name = el => { let s = el.tagName.toLowerCase(); if (el.id) s += '#' + el.id; const c = (el.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 2); if (c.length) s += '.' + c.join('.'); return s; };
  const path = el => { const parts = []; for (let n = el; n && n !== document.body; n = n.parentElement) {
      if (n.id) { parts.unshift('#' + CSS.escape(n.id)); break; }
      let k = 1; for (let s = n.previousElementSibling; s; s = s.previousElementSibling) if (s.tagName === n.tagName) k++;
      parts.unshift(n.tagName.toLowerCase() + ':nth-of-type(' + k + ')'); }
    return (parts[0] && parts[0][0] === '#' ? '' : 'body > ') + parts.join(' > '); };
  const roots = new Map();
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) {
    const t = tw.currentNode, v = t.nodeValue.replace(/\s+/g, ' ').trim(), p = t.parentElement;
    if (!v || !p || p.closest('script,style,noscript,template')) continue;
    if (vis(p)) continue;
    let r = p; while (r.parentElement && r.parentElement !== document.body && !vis(r.parentElement)) r = r.parentElement;
    if (!roots.has(r)) roots.set(r, []);
    roots.get(r).push(v);
  }
  const out = [];
  const html = document.documentElement;
  for (const [r, texts] of roots) {
    let cat;
    if (r.hidden || r.closest('[hidden]') || r.closest('details:not([open])')) cat = 'by-design';
    else { html.classList.add('js'); const withJs = vis(r); html.classList.remove('js'); cat = withJs ? 'js-only' : 'hidden-regardless'; }
    out.push({ root: name(r), path: path(r), cat, texts });
  }
  return { mainChars: main ? main.innerText.trim().length : 0, h1: !!h1 && vis(h1) && h1.innerText.trim().length > 0,
           sw: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), iw: innerWidth,
           inner: document.body.innerText, title: document.title, roots: out };
}
"""

DIAG_API_JS = r"""
() => {
  const D = window.ModeFluencyDiagnostic; if (!D) return { error: 'window.ModeFluencyDiagnostic missing' };
  const p = D.paths(); let ok = 0, total = 0; const bad = []; const st = new Set(), lv = new Set();
  for (const sp of p.stancePaths) for (const c of p.commonCombos) {
    total++; const ans = Object.assign({ stance: sp.stance }, c); let r, t;
    try { r = D.compute(ans); t = D.text(r); } catch (e) { if (bad.length < 20) bad.push({ ans, err: String(e) }); continue; }
    const f = [r.stance && r.stance.name, r.layer, r.guardrail, r.level, r.levelInfo && r.levelInfo.title];
    const blob = JSON.stringify(r) + '\n' + t;
    if (f.every(x => typeof x === 'string' && x.trim()) && !/undefined|NaN/.test(blob)) { ok++; st.add(r.stanceKey); lv.add(r.level); }
    else if (bad.length < 20) bad.push({ ans, fields: f });
  }
  return { stancePaths: p.stancePaths.length, commonCombos: p.commonCombos.length, total, ok, bad, stances: [...st].sort(), levels: [...lv].sort() };
}
"""

DIAG_UI_JS = r"""
() => {
  const R = document.getElementById('dg-report'), back = document.getElementById('dg-back'), opts = document.getElementById('dg-opts');
  const qsr = document.getElementById('dg-qsr'), root = document.getElementById('console');
  if (!R || !back || !opts || !qsr || !root) return { error: 'diagnostic console elements missing' };
  const memo = new Map(), stances = new Set(), levels = new Set(), bad = []; let reports = 0, clicks = 0;
  const key = () => qsr.textContent.replace(/^Question \d+\.\s*/, '') + '||' + [...opts.querySelectorAll('.opt')].map(b => b.textContent).join('|');
  function checkReport() {
    reports++;
    const v = {}; for (const [k, s] of [['stance', '#r-stance'], ['layer', '#r-layer'], ['guardrail', '#r-guardrail'], ['level', '#r-level']]) { const e = document.querySelector(s); v[k] = e ? e.textContent.trim() : ''; }
    const s = root.getAttribute('data-result-stance'); if (s) stances.add(s);
    const l = root.getAttribute('data-result-level'); if (l) levels.add(l);
    const blob = R.textContent + '\n' + (R._text || '');
    if (!v.stance || !v.layer || !v.guardrail || !v.level || /undefined|NaN/.test(blob)) { if (bad.length < 20) bad.push(v); }
  }
  function driveOne() { let d = 0; while (R.hidden && d < 20) { opts.querySelector('.opt').click(); clicks++; d++; } checkReport(); for (let i = 0; i < d; i++) back.click(); }
  function walk(depth) {
    if (!R.hidden) { checkReport(); return 1; }
    if (depth > 20) throw new Error('diagnostic deeper than 20 questions');
    const k = key();
    if (memo.has(k)) { driveOne(); return memo.get(k); }
    const n = opts.querySelectorAll('.opt').length; let total = 0;
    for (let i = 0; i < n; i++) { opts.querySelectorAll('.opt')[i].click(); clicks++; total += walk(depth + 1); back.click(); }
    memo.set(k, total); return total;
  }
  const count = walk(0);
  return { count, reports, clicks, distinctQuestions: memo.size, stances: [...stances].sort(), levels: [...levels].sort(), bad };
}
"""

STATE_ACTIONS = {
    "diagnose.html": ("diagnostic report", r"""() => { const R = document.getElementById('dg-report'); let n = 0;
        while (R && R.hidden && n < 20) { const b = document.querySelector('#dg-opts .opt'); if (!b) break; b.click(); n++; }
        return !!R && !R.hidden; }"""),
    "matrix.html": ("Librarian selected", r"""() => { const b = document.querySelector('.s-node[data-i="5"]') || document.querySelector('.s-node'); if (b) b.click(); return !!b; }"""),
    "stances.html": ("first layer filter on", r"""() => { const b = document.querySelectorAll('.chip[data-filter="layer"]')[1]; if (b) b.click(); return !!b; }"""),
}


# --------------------------------------------------------------------------------------------- helpers
def fmt_int(n: int) -> str:
    return f"{n:,}"


def md_escape(s: str) -> str:
    return str(s).replace("|", "\\|").replace("\n", " ")


def deployable_files(docs: Path) -> list[Path]:
    out = []
    for p in sorted(docs.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(docs).as_posix()
        if rel.startswith("_qa/") or p.name == "STATUS.md":
            continue
        out.append(p)
    return out


def static_diag_count(src: str) -> dict:
    """Derive the number of answer combinations from the source text of diagnose.js, without running it."""
    m1 = re.search(r"var STANCE_QS = \{(.*?)\n  \};", src, re.S)
    m2 = re.search(r"var COMMON_QS = \[(.*?)\n  \];", src, re.S)
    if not m1 or not m2:
        return {"error": "STANCE_QS or COMMON_QS block not found"}
    tree = {}
    for qm in re.finditer(r"(\w+): \{ text: .*?options: \[(.*?)\] \}", m1.group(1), re.S):
        opts = re.findall(r"\{ v: \"[^\"]+\", label: \"(?:[^\"\\]|\\.)*\", (stance|next): \"(\w+)\" \}", qm.group(2))
        tree[qm.group(1)] = opts
    if "family" not in tree:
        return {"error": "no 'family' question found"}

    leaves = []

    def walk(q, depth=0):
        if depth > 20:
            raise ValueError("cycle")
        for kind, val in tree[q]:
            if kind == "stance":
                leaves.append(val)
            else:
                walk(val, depth + 1)

    walk("family")
    counts = []
    for qm in re.finditer(r"\{ id: \"(\w+)\".*?options: \[(.*?)\] \}", m2.group(1), re.S):
        counts.append((qm.group(1), len(re.findall(r"\{ v: \"", qm.group(2)))))
    combos = math.prod(c for _, c in counts) if counts else 0
    return {"stancePaths": len(leaves), "stances": sorted(set(leaves)), "common": counts, "commonCombos": combos,
            "total": len(leaves) * combos}


# --------------------------------------------------------------------------------------------- footer
TICKER_RE = re.compile(r'(<ol class="sys ticker-lines" id="ticker-lines">)(.*?)(\n[ \t]*</ol>)', re.S)
ABOUT_RE = re.compile(r"(<!-- @aboutlog -->)(.*?)(<!-- /@aboutlog -->)", re.S)


def num(s: str) -> float:
    return float(s.replace(",", ""))


def parse_claims(lines: list[str]) -> dict:
    """Pull the numbers out of build-log text (ticker lines or about rows joined as 'key: value')."""
    t = "\n".join(lines)
    c = {}
    pats = {
        "pages": r"build: (\d+) pages|pages: (\d+)",
        "files": r"build: \d+ pages, (\d+) files|files: (\d+)",
        "external_scripts": r"external scripts (\d+)",
        "bytes": r"size: ([\d,]+) bytes",
        "loads": r"(\d+) headless Chromium loads|QA loads: (\d+)",
        "console_errors": r"console errors (\d+)",
        "failed_requests": r"failed requests (\d+)",
        "overflow": r"horizontal overflow (\d+)",
        "contrast_elements": r"([\d,]+) text elements",
        "lowest_light": r"lowest(?: contrast)? ([\d.]+):1 light",
        "lowest_dark": r"([\d.]+):1 dark",
        "diag_ok": r"([\d,]+) of [\d,]+ answer combinations",
        "diag_total": r"[\d,]+ of ([\d,]+) answer combinations",
        "ui_paths": r"(\d+) paths driven through the UI",
        "checks_passed": r"checks: (\d+) of \d+ passed",
        "checks_total": r"checks: \d+ of (\d+) passed",
    }
    for k, p in pats.items():
        for m in re.finditer(p, t):
            g = next((x for x in m.groups() if x is not None), None)
            if g is not None:
                c.setdefault(k, []).append(num(g))
    return {k: v for k, v in c.items()}


def read_footers(docs: Path, pages: list[str]) -> dict:
    res = {"pages": {}, "about": None, "buildlog": None}
    for p in pages:
        text = (docs / p).read_text(encoding="utf-8")
        m = TICKER_RE.search(text)
        if m:
            lines = [html.unescape(re.sub(r"<[^>]+>", "", x)).strip() for x in re.findall(r"<li[^>]*>(.*?)</li>", m.group(2), re.S)]
            res["pages"][p] = lines
        else:
            res["pages"][p] = None
        if p == "about.html":
            a = ABOUT_RE.search(text)
            if a:
                rows = re.findall(r"<th[^>]*>(.*?)</th><td>(.*?)</td>", a.group(2), re.S)
                res["about"] = [(html.unescape(k).strip(), html.unescape(re.sub(r"<[^>]+>", "", v)).strip()) for k, v in rows]
    bl = docs / "_qa" / "buildlog.json"
    if bl.exists():
        try:
            res["buildlog"] = json.loads(bl.read_text(encoding="utf-8"))
        except ValueError:
            res["buildlog"] = "unreadable"
    return res


def build_log_text(m: dict, today: str, old: dict | None) -> tuple[list[str], list[list[str]]]:
    """Ticker lines and about rows with this run's numbers. Lines this harness does not measure are kept as they were."""
    old_ticker = (old or {}).get("ticker") or []
    old_about = dict((k, v) for k, v in ((old or {}).get("about") or []))
    suffix = "; report in _qa/qa-report.md"
    for line in old_ticker:
        mm = re.match(r"checks: \d+ of \d+ passed(.*)$", line)
        if mm:
            suffix = mm.group(1)
    nl, nd = m["contrast"]["light"]["count"], m["contrast"]["dark"]["count"]
    elems = f"{fmt_int(nl)} text elements scanned per theme" if nl == nd else f"{fmt_int(nl)} (light) and {fmt_int(nd)} (dark) text elements scanned"
    ll, ld = m["contrast"]["light"]["lowest"], m["contrast"]["dark"]["lowest"]
    d = m["diag"]
    np = m["inventory"]["pages"]
    ticker = [
        f"build: {np} pages, {m['inventory']['files']} files; plain HTML, CSS and JS; frameworks 0; libraries 0; external scripts {m['inventory']['external_scripts']}",
        f"size: {fmt_int(m['inventory']['bytes'])} bytes deployable, fonts excluded (budget 900,000)",
        f"qa {today}: {m['loads_total']} headless Chromium loads ({np} pages × 390/1280 × light/dark × motion on/off); console errors {m['loads_errors']}; failed requests {m['loads_failed']}; horizontal overflow {m['loads_overflow']}",
        f"a11y: {elems}; lowest contrast {ll:.2f}:1 light, {ld:.2f}:1 dark (floor 4.5)",
        f"diagnostic: {fmt_int(d['api_ok'])} of {fmt_int(d['api_total'])} answer combinations return a result; {d['ui_reports']} paths driven through the UI",
        f"checks: {m['checks_passed']} of {m['checks_total']} passed{suffix}",
    ]
    contrast_about = (f"{fmt_int(nl)} text elements per theme" if nl == nd else f"{fmt_int(nl)} (light) and {fmt_int(nd)} (dark) text elements") + f"; lowest {ll:.2f}:1 light, {ld:.2f}:1 dark"
    pages_txt = re.sub(r"^\d+", str(np), old_about.get("pages", f"{np}"))
    files_txt = re.sub(r"^\d+", str(m["inventory"]["files"]), old_about.get("files", f"{m['inventory']['files']} deployable"))
    new_vals = {
        "date": today,
        "pages": pages_txt,
        "files": files_txt,
        "size": f"{fmt_int(m['inventory']['bytes'])} bytes, fonts excluded (budget 900,000)",
        "QA loads": f"{m['loads_total']} in headless Chromium: console errors {m['loads_errors']}, failed requests {m['loads_failed']}, horizontal overflow {m['loads_overflow']}",
        "contrast": contrast_about,
        "diagnostic": f"{fmt_int(d['api_ok'])} of {fmt_int(d['api_total'])} answer combinations return a result; {d['ui_reports']} paths driven through the UI",
        "checks": f"{m['checks_passed']} of {m['checks_total']} passed",
    }
    order = [k for k, _ in ((old or {}).get("about") or [])] or list(new_vals)
    for k in new_vals:
        if k not in order:
            order.append(k)
    about = [[k, new_vals.get(k, old_about.get(k, ""))] for k in order]
    return ticker, about


def write_buildlog(docs: Path, pages: list[str], ticker: list[str], about: list[list[str]]) -> list[str]:
    changed = []
    about_page = docs / "about.html"
    if not (about_page.exists() and ABOUT_RE.search(about_page.read_text(encoding="utf-8"))):
        about = []  # the about.html build-log table is optional (removed 2026-10-29); nothing to write or check
    bl = docs / "_qa" / "buildlog.json"
    bl.parent.mkdir(exist_ok=True)
    bl.write_text(json.dumps({"ticker": ticker, "about": about}, indent=1, ensure_ascii=False), encoding="utf-8")
    changed.append("_qa/buildlog.json")
    for p in pages:
        f = docs / p
        text = f.read_text(encoding="utf-8")
        m = TICKER_RE.search(text)
        if m:
            indent = re.search(r"\n([ \t]*)<li", m.group(2))
            ind = indent.group(1) if indent else "        "
            body = "".join(f"\n{ind}<li>{html.escape(x, quote=False)}</li>" for x in ticker)
            text = text[: m.start(2)] + body + text[m.end(2):]
        if p == "about.html":
            a = ABOUT_RE.search(text)
            if a:
                rows = "".join(f'\n          <tr><th scope="row" class="sys">{html.escape(k, quote=False)}</th><td>{html.escape(v, quote=False)}</td></tr>' for k, v in about)
                text = text[: a.start(2)] + rows + "\n" + text[a.end(2):]
        if text != f.read_text(encoding="utf-8"):
            f.write_text(text, encoding="utf-8", newline="\n")
            changed.append(p)
    return changed


def compare_footer(foot: dict, m: dict) -> tuple[bool, list[dict]]:
    expect = {
        "pages": m["inventory"]["pages"], "files": m["inventory"]["files"], "external_scripts": m["inventory"]["external_scripts"],
        "bytes": m["inventory"]["bytes"], "loads": m["loads_total"], "console_errors": m["loads_errors"],
        "failed_requests": m["loads_failed"], "overflow": m["loads_overflow"],
        "contrast_elements": m["contrast"]["light"]["count"] if m["contrast"]["light"]["count"] == m["contrast"]["dark"]["count"] else None,
        "lowest_light": m["contrast"]["light"]["lowest"], "lowest_dark": m["contrast"]["dark"]["lowest"],
        "diag_ok": m["diag"]["api_ok"], "diag_total": m["diag"]["api_total"], "ui_paths": m["diag"]["ui_reports"],
        "checks_passed": m["checks_passed"], "checks_total": m["checks_total"],
    }
    rows = []
    ok = True
    sources = [(f"{p} footer", lines) for p, lines in foot["pages"].items()]
    if foot["about"] is not None:
        sources.append(("about.html build-log table", [f"{k}: {v}" for k, v in foot["about"]]))
    bl = foot["buildlog"]
    if isinstance(bl, dict):
        sources.append(("_qa/buildlog.json", list(bl.get("ticker") or []) + [f"{k}: {v}" for k, v in (bl.get("about") or [])]))
    for name, lines in sources:
        if lines is None:
            rows.append({"source": name, "item": "(build log)", "claimed": "missing", "measured": "", "ok": False}); ok = False
            continue
        claims = parse_claims(lines)
        for k, want in expect.items():
            got = claims.get(k)
            if not got:
                continue  # this source does not state that number
            if want is None:  # light and dark counts differ; any single "per theme" number is wrong
                good = False; want_s = f"{m['contrast']['light']['count']} / {m['contrast']['dark']['count']}"
            else:
                good = all(abs(g - want) < 0.005 for g in got); want_s = f"{want:g}" if isinstance(want, float) else str(want)
            rows.append({"source": name, "item": k, "claimed": ", ".join(f"{g:g}" for g in sorted(set(got))), "measured": want_s, "ok": good})
            ok &= good
    return ok, rows


# --------------------------------------------------------------------------------------------- run
def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("docs")
    ap.add_argument("--write-buildlog", action="store_true", help="rewrite _qa/buildlog.json and every footer (plus the about.html table, if its markers exist) with this run's numbers")
    ap.add_argument("--out", help="Markdown report path (default: <docs>/../site-qa-report.md)")
    ap.add_argument("--network", action="store_true", help="let http(s) requests through instead of answering them locally")
    ap.add_argument("--pages", help="comma-separated subset of pages (debugging; the gate needs all pages)")
    a = ap.parse_args()

    if a.write_buildlog and a.pages:
        print("FAIL harness: --write-buildlog needs the full page set (drop --pages)"); return 2
    docs = Path(a.docs).resolve()
    if not docs.is_dir():
        print(f"FAIL harness: {docs} is not a directory"); return 2
    out = Path(a.out).resolve() if a.out else docs.parent / "site-qa-report.md"
    pages = sorted(p.name for p in docs.glob("*.html"))
    if a.pages:
        pages = [p for p in pages if p in a.pages.split(",")]
    if not pages:
        print("FAIL harness: no pages"); return 2
    t0 = time.time()
    today = _dt.date.today().isoformat()

    # inventory
    dep = deployable_files(docs)
    ext_scripts = sum(len(re.findall(r"<script[^>]+src=[\"']https?://", (docs / p).read_text(encoding="utf-8"), re.I)) for p in pages)
    inventory = {"pages": len(pages), "files": len(dep), "bytes": sum(p.stat().st_size for p in dep), "external_scripts": ext_scripts}

    loads, contrast_runs, nojs, stubbed = [], [], [], {}
    banned_text = {}  # page -> list of (source, text)
    diag = {}

    def handle_route(route):
        url = route.request.url
        host = re.sub(r"^https?://([^/]+).*$", r"\1", url)
        stubbed[host] = stubbed.get(host, 0) + 1
        rt = route.request.resource_type
        if rt == "stylesheet":
            route.fulfill(status=200, content_type="text/css", body="")
        elif rt == "image":
            route.fulfill(status=200, content_type="image/gif", body=GIF_1PX)
        else:
            route.fulfill(status=204, body="")

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)

        def new_ctx(width, theme, motion, js=True):
            ctx = browser.new_context(viewport={"width": width, "height": HEIGHTS[width]}, color_scheme=theme,
                                      reduced_motion=motion, device_scale_factor=1, java_script_enabled=js)
            if not a.network:
                ctx.route(re.compile(r"^(https?|wss?)://"), handle_route)
            return ctx

        def settle(page, motion):
            try:
                page.evaluate("() => Promise.race([document.fonts ? document.fonts.ready : null, new Promise(r => setTimeout(r, 4000))])")
            except Exception:
                pass
            page.wait_for_timeout(500 if motion == "reduce" else 900)

        # 1 + 3: loads, overflow, contrast
        for pg in pages:
            url = (docs / pg).as_uri()
            for w in WIDTHS:
                for th in THEMES:
                    for mo in MOTIONS:
                        ctx = new_ctx(w, th, mo)
                        page = ctx.new_page()
                        errors, failed = [], []
                        page.on("console", lambda msg, e=errors: e.append(msg.text) if msg.type == "error" else None)
                        page.on("pageerror", lambda exc, e=errors: e.append("pageerror: " + str(exc)))
                        page.on("requestfailed", lambda r, f=failed: f.append(f"{r.url} {r.failure}"))
                        page.on("response", lambda r, f=failed: f.append(f"{r.url} HTTP {r.status}") if r.status >= 400 else None)
                        page.goto(url, wait_until="load")
                        settle(page, mo)
                        sws = []
                        for frac in (0, 0.5, 1):
                            page.evaluate("f => window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f)", frac)
                            page.wait_for_timeout(150 if mo == "reduce" else 500)
                            sws.append(page.evaluate("() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)"))
                        page.evaluate("() => window.scrollTo(0, 0)")
                        if mo == "reduce":
                            res = page.evaluate(CONTRAST_JS)
                            contrast_runs.append({"page": pg, "width": w, "theme": th, "state": "load", **res})
                            if th == "light" and w == 1280:
                                vt = page.evaluate(VISIBLE_TEXT_JS)
                                banned_text.setdefault(pg, []).append(("JS on, innerText", vt["inner"]))
                                banned_text[pg].append(("title", vt["title"]))
                            if pg in STATE_ACTIONS:
                                label, js = STATE_ACTIONS[pg]
                                try:
                                    done = page.evaluate(js)
                                except Exception as exc:  # noqa: BLE001
                                    done = False; errors.append(f"harness: state action failed: {exc}")
                                page.wait_for_timeout(500)
                                if done:
                                    res = page.evaluate(CONTRAST_JS)
                                    contrast_runs.append({"page": pg, "width": w, "theme": th, "state": label, **res})
                                else:
                                    contrast_runs.append({"page": pg, "width": w, "theme": th, "state": label + " (could not set)", "items": [], "unparsed": []})
                        page.wait_for_timeout(100)
                        loads.append({"page": pg, "width": w, "theme": th, "motion": "on" if mo == "no-preference" else "off (reduced)",
                                      "errors": errors, "failed": failed, "sw": max(sws), "overflow": int(max(sws) > w)})
                        ctx.close()
            print(f"  loads done: {pg} ({time.time() - t0:.0f}s)", flush=True)

        # 2: JS off
        for pg in pages:
            for w in WIDTHS:
                ctx = new_ctx(w, "light", "reduce", js=False)
                page = ctx.new_page()
                failed = []
                page.on("requestfailed", lambda r, f=failed: f.append(f"{r.url} {r.failure}"))
                page.goto((docs / pg).as_uri(), wait_until="load")
                page.wait_for_timeout(300)
                r = page.evaluate(NOJS_JS)
                lost = []
                suspects = [x for x in r["roots"] if x["cat"] == "hidden-regardless"]
                if suspects:
                    # same element, same width, JS on: if it is visible there, JavaScript was needed to show it
                    jctx = new_ctx(w, "light", "reduce")
                    jp = jctx.new_page()
                    jp.goto((docs / pg).as_uri(), wait_until="load")
                    settle(jp, "reduce")
                    shown = jp.evaluate("ps => ps.map(p => { try { const e = document.querySelector(p); return !!e && e.checkVisibility({ opacityProperty: true, visibilityProperty: true }); } catch (x) { return false; } })",
                                        [x["path"] for x in suspects])
                    jctx.close()
                    for x, vis in zip(suspects, shown):
                        if vis:
                            lost += [f"{x['root']}: {t}" for t in x["texts"]]
                readable = r["mainChars"] >= 400 and r["h1"] and r["sw"] <= w and not lost and not failed
                nojs.append({"page": pg, "width": w, "mainChars": r["mainChars"], "h1": r["h1"], "sw": r["sw"], "failed": failed,
                             "jsOnly": sorted({x["root"] for x in r["roots"] if x["cat"] == "js-only"}), "lost": lost, "readable": readable})
                if w == 1280:
                    banned_text.setdefault(pg, []).append(("JS off, innerText", r["inner"]))
                ctx.close()
        print(f"  JS-off done ({time.time() - t0:.0f}s)", flush=True)

        # 5: diagnostic
        if "diagnose.html" in pages:
            src = (docs / "assets" / "diagnose.js").read_text(encoding="utf-8")
            diag["static"] = static_diag_count(src)
            ctx = new_ctx(1280, "light", "reduce")
            page = ctx.new_page()
            derr = []
            page.on("pageerror", lambda exc: derr.append(str(exc)))
            page.goto((docs / "diagnose.html").as_uri(), wait_until="load")
            settle(page, "reduce")
            diag["api"] = page.evaluate(DIAG_API_JS)
            diag["ui"] = page.evaluate(DIAG_UI_JS)
            diag["errors"] = derr
            ctx.close()
            print(f"  diagnostic done ({time.time() - t0:.0f}s)", flush=True)
        browser.close()

    # ------------------------------------------------------------------ evaluate
    m = {"inventory": inventory}
    m["loads_total"] = len(loads)
    m["loads_errors"] = sum(len(x["errors"]) for x in loads)
    m["loads_failed"] = sum(len(x["failed"]) for x in loads)
    m["loads_overflow"] = sum(x["overflow"] for x in loads)
    checks = []  # (name, ok)
    for x in loads:
        checks.append((f"load {x['page']} {x['width']} {x['theme']} motion {x['motion']}", not x["errors"] and not x["failed"] and not x["overflow"]))
    for x in nojs:
        checks.append((f"JS off {x['page']} {x['width']}", x["readable"]))

    m["contrast"] = {}
    for th in THEMES:
        items = [dict(i, page=r["page"], width=r["width"], state=r["state"]) for r in contrast_runs if r["theme"] == th for i in r["items"]]
        scored = [i for i in items if not i.get("skipped") and not i.get("exempt")]
        scored.sort(key=lambda i: i["ratio"])
        m["contrast"][th] = {
            "count": len(scored), "lowest": scored[0]["ratio"] if scored else 0.0, "lowest_items": scored[:10],
            "fails": [i for i in scored if i.get("raw", i["ratio"]) < FLOOR], "skipped": [i for i in items if i.get("skipped")],
            "exempt": [i for i in items if i.get("exempt")],
            "unparsed": sorted({u for r in contrast_runs if r["theme"] == th for u in r["unparsed"]}),
            "states_missing": sorted({f"{r['page']}: {r['state']}" for r in contrast_runs if r["theme"] == th and "could not set" in r["state"]}),
        }
        c = m["contrast"][th]
        checks.append((f"contrast {th}", c["count"] > 0 and not c["fails"] and not c["skipped"] and not c["states_missing"]))

    hits = []
    for pg, sources in banned_text.items():
        for src_name, text in sources:
            low = text.lower()
            for wd in BANNED:
                for mm in re.finditer(re.escape(wd), low):
                    hits.append({"page": pg, "source": src_name, "word": wd, "context": text[max(0, mm.start() - 40): mm.end() + 40].replace("\n", " ")})
    m["banned_hits"] = hits
    checks.append(("banned words (visible text)", not hits and len(banned_text) == len(pages)))

    if diag:
        api, ui, st = diag["api"], diag["ui"], diag["static"]
        d = {"api_ok": api.get("ok", 0), "api_total": api.get("total", 0), "ui_count": ui.get("count"), "ui_reports": ui.get("reports", 0),
             "static_total": st.get("total")}
        d["exhaustive_ok"] = "error" not in api and api["ok"] == api["total"] and api["total"] > 0 and not diag["errors"]
        d["counts_agree"] = "error" not in st and "error" not in ui and st["total"] == api["total"] == ui["count"]
        d["ui_ok"] = "error" not in ui and not ui["bad"] and len(ui["stances"]) == api.get("stancePaths", -1)
        checks += [("diagnostic: every combination returns a result", d["exhaustive_ok"]),
                   ("diagnostic: count equals source-derived and UI-derived counts", d["counts_agree"]),
                   ("diagnostic: UI reports complete for every stance", d["ui_ok"])]
    else:
        d = {"api_ok": 0, "api_total": 0, "ui_count": None, "ui_reports": 0, "static_total": None}
        checks.append(("diagnostic (diagnose.html not in page set)", False))
    m["diag"] = d

    m["checks_total"] = len(checks) + 1  # + footer check
    other_passed = sum(ok for _, ok in checks)
    # the footer check is judged against the numbers as they will stand if it passes
    m["checks_passed"] = other_passed + 1

    written = []
    if a.write_buildlog:
        foot_before = read_footers(docs, pages)
        old = foot_before["buildlog"] if isinstance(foot_before["buildlog"], dict) else None
        ticker, about = build_log_text(m, today, old)
        written = write_buildlog(docs, pages, ticker, about)
    foot = read_footers(docs, pages)
    footer_ok, footer_rows = compare_footer(foot, m)
    consistent = len({json.dumps(v) for v in foot["pages"].values()}) == 1
    footer_ok = footer_ok and consistent and len(pages) == len(list(docs.glob("*.html")))
    if not footer_ok:
        m["checks_passed"] = other_passed
        footer_ok_final, footer_rows = compare_footer(foot, m)  # re-run so "checks" rows show the real count
    checks.append(("footer build log equals this run", footer_ok))
    passed = all(ok for _, ok in checks)
    elapsed = time.time() - t0

    # ------------------------------------------------------------------ report
    R = []
    P = R.append
    P(f"# Site QA report\n")
    P(f"Run: {today}, `strategy/qa/site_qa.py` on `{docs}`. Headless Chromium (Playwright for Python), pages from file://. "
      f"Network: {'allowed' if a.network else 'off (http/https requests answered locally, see section 1)'}. Runtime {elapsed:.0f} s.\n")
    P(f"**Result: {'PASS' if passed else 'FAIL'}: {sum(ok for _, ok in checks)} of {len(checks)} checks passed.**\n")
    if written:
        P(f"`--write-buildlog` rewrote: {', '.join(written)}.\n")
    P("## Summary\n\n| Check | Result | Evidence |\n|---|---|---|")
    P(f"| Loads ({len(loads)}) | {'PASS' if not (m['loads_errors'] or m['loads_failed'] or m['loads_overflow']) else 'FAIL'} | console errors {m['loads_errors']}; failed requests {m['loads_failed']}; loads with horizontal overflow {m['loads_overflow']} |")
    P(f"| JavaScript off ({len(nojs)}) | {'PASS' if all(x['readable'] for x in nojs) else 'FAIL'} | readable {sum(x['readable'] for x in nojs)} of {len(nojs)} |")
    for th in THEMES:
        c = m["contrast"][th]
        low = c["lowest_items"][0] if c["lowest_items"] else {}
        P(f"| Contrast {th} | {'PASS' if dict(checks)[f'contrast {th}'] else 'FAIL'} | {fmt_int(c['count'])} text elements; below 4.5:1: {len(c['fails'])}; lowest {c['lowest']:.2f}:1 (`{md_escape(low.get('sel', ''))}` \"{md_escape(low.get('text', ''))}\", {low.get('page', '')} {low.get('width', '')}); not parsed {len(c['skipped'])}; exempt (disabled) {len(c['exempt'])} |")
    P(f"| Banned words | {'PASS' if not hits else 'FAIL'} | {len(hits)} hits |")
    P(f"| Diagnostic | {'PASS' if diag and d['exhaustive_ok'] and d['counts_agree'] and d['ui_ok'] else 'FAIL'} | {fmt_int(d['api_ok'])} of {fmt_int(d['api_total'])} return a result; derived from source {d['static_total'] if d['static_total'] is None else fmt_int(d['static_total'])}; derived from UI {d['ui_count'] if d['ui_count'] is None else fmt_int(d['ui_count'])} |")
    P(f"| Footer build log | {'PASS' if footer_ok else 'FAIL'} | {sum(not r['ok'] for r in footer_rows)} mismatches; footers identical on all pages: {'yes' if consistent else 'no'} |")

    P("\n## 0. Inventory\n\n| Item | Value |\n|---|---|")
    P(f"| Pages | {inventory['pages']} ({', '.join(pages)}) |\n| Deployable files (excl. `_qa/`, STATUS.md) | {inventory['files']} |\n| Deployable bytes | {fmt_int(inventory['bytes'])} |\n| External scripts | {inventory['external_scripts']} |")

    P("\n## 1. Loads\n\nEach row: one fresh browser context. Counts: console errors (incl. uncaught page errors), failed requests "
      "(network failures and HTTP >= 400), overflow (1 if `scrollWidth` > viewport width at the top, middle or bottom). `sw` = largest scrollWidth seen.\n")
    P("| Page | Width | Theme | Motion | Console errors | Failed requests | Overflow | sw |\n|---|---|---|---|---|---|---|---|")
    for x in loads:
        P(f"| {x['page']} | {x['width']} | {x['theme']} | {x['motion']} | {len(x['errors'])} | {len(x['failed'])} | {x['overflow']} | {x['sw']} |")
    det = [x for x in loads if x["errors"] or x["failed"]]
    if det:
        P("\nDetails:\n")
        for x in det:
            for e in x["errors"] + x["failed"]:
                P(f"- {x['page']} {x['width']} {x['theme']} motion {x['motion']}: {md_escape(e)[:300]}")
    P("\nRequests answered locally (no network): " + (", ".join(f"{h} ({n})" for h, n in sorted(stubbed.items())) or "none") + ".")

    P("\n## 2. JavaScript off\n\n\"Readable\" = main text >= 400 characters, visible h1, no horizontal overflow, no failed requests, and no text "
      "that is visible with JS on but hidden without JS outside the JS-only instruments.\n")
    P("| Page | Width | Main text (chars) | h1 | sw | Lost text | JS-only instruments hidden | Readable |\n|---|---|---|---|---|---|---|---|")
    for x in nojs:
        P(f"| {x['page']} | {x['width']} | {fmt_int(x['mainChars'])} | {'yes' if x['h1'] else 'no'} | {x['sw']} | {len(x['lost'])} | {md_escape(', '.join(x['jsOnly']) or 'none')} | {'yes' if x['readable'] else 'no'} |")
    for x in nojs:
        for t in x["lost"][:10]:
            P(f"- lost without JS, {x['page']} {x['width']}: \"{md_escape(t[:80])}\"")

    P("\n## 3. Contrast\n\nEvery visible text element, reduced-motion loads at 390 and 1280, plus interactive states. Ratios rounded down to two decimals.\n")
    P("| Theme | Elements | Below 4.5 | Lowest | Element | Text | Page | Width | State |\n|---|---|---|---|---|---|---|---|---|")
    for th in THEMES:
        c = m["contrast"][th]; low = c["lowest_items"][0] if c["lowest_items"] else {}
        P(f"| {th} | {fmt_int(c['count'])} | {len(c['fails'])} | {c['lowest']:.2f} | `{md_escape(low.get('sel', ''))}` | {md_escape(low.get('text', ''))} | {low.get('page', '')} | {low.get('width', '')} | {low.get('state', '')} |")
    for th in THEMES:
        c = m["contrast"][th]
        P(f"\n**{th.capitalize()}: lowest ten**\n\n| Ratio | Text | Element | fg | bg | Page | Width | State |\n|---|---|---|---|---|---|---|---|")
        for i in c["lowest_items"]:
            P(f"| {i['ratio']:.2f} | {md_escape(i['text'])} | `{md_escape(i['sel'])}` | {i['fg']} | {i['bg']} | {i['page']} | {i['width']} | {i['state']} |")
        if c["fails"]:
            P(f"\nBelow 4.5:1 ({len(c['fails'])}):\n")
            for i in c["fails"][:40]:
                P(f"- {i['ratio']:.2f} `{md_escape(i['sel'])}` \"{md_escape(i['text'])}\" {i['page']} {i['width']} ({i['state']})")
        if c["skipped"]:
            P(f"\nNot scored, colour not parsed ({len(c['skipped'])}): " + "; ".join(f"{i['sel']} {i['why']}" for i in c["skipped"][:10]))
        if c["exempt"]:
            P(f"\nExempt as disabled controls ({len(c['exempt'])}): " + "; ".join(sorted({f'{i["sel"]} ({i["ratio"]:.2f}, {i["page"]})' for i in c["exempt"]}))[:600])
        if c["states_missing"]:
            P("\nInteractive states that could not be set: " + "; ".join(c["states_missing"]))
    P("\nPer scan:\n\n| Page | Width | Theme | State | Elements | Lowest |\n|---|---|---|---|---|---|")
    for r in contrast_runs:
        sc = [i for i in r["items"] if not i.get("skipped") and not i.get("exempt")]
        P(f"| {r['page']} | {r['width']} | {r['theme']} | {r['state']} | {len(sc)} | {min((i['ratio'] for i in sc), default=0):.2f} |")

    P("\n## 4. Banned words\n\nCase-insensitive substring match for: " + ", ".join(BANNED) + ". Text scanned per page: innerText with JS on (1280, light), innerText with JS off (1280), the title.\n")
    P("| Page | Hits |\n|---|---|")
    for pg in pages:
        P(f"| {pg} | {sum(h['page'] == pg for h in hits)} |")
    for h in hits:
        P(f"- {h['page']} ({h['source']}): **{h['word']}** in \"{md_escape(h['context'])}\"")

    P("\n## 5. Diagnostic\n")
    if diag:
        api, ui, st = diag["api"], diag["ui"], diag["static"]
        P("| Measure | Value |\n|---|---|")
        P(f"| Combinations run through `compute()` and `text()` | {fmt_int(api.get('total', 0))} |")
        P(f"| ... returning non-empty stance, layer, guardrail, level, no undefined/NaN | {fmt_int(api.get('ok', 0))} |")
        P(f"| Stance paths x common-answer combinations (`paths()`) | {api.get('stancePaths')} x {fmt_int(api.get('commonCombos', 0))} |")
        if "error" in st:
            st_txt = st["error"]
        else:
            st_txt = f"{st['stancePaths']} stance paths x " + " x ".join(f"{n} ({q})" for q, n in st["common"]) + " = " + fmt_int(st["total"])
        P(f"| Derived from the source text | {md_escape(st_txt)} |")
        P(f"| Derived by walking the live UI (options and Back, memoised per question) | {md_escape(ui.get('error') or fmt_int(ui['count']))} |")
        if "error" not in ui:
            P(f"| UI reports reached and checked | {fmt_int(ui['reports'])} ({ui['clicks']:,} option clicks, {ui['distinctQuestions']} distinct questions) |")
            P(f"| Stances reached in the UI | {len(ui['stances'])}: {', '.join(ui['stances'])} |")
            P(f"| Levels reached in the UI | {', '.join(ui['levels'])} |")
        P(f"| Stances / levels reached via compute() | {len(api.get('stances', []))} / {', '.join(api.get('levels', []))} |")
        P(f"| Page errors during the walk | {len(diag['errors'])} |")
        for b in (api.get("bad") or [])[:10] + (ui.get("bad") or [])[:10]:
            P(f"- bad result: {md_escape(json.dumps(b))[:300]}")
    else:
        P("diagnose.html not in the page set.")

    P("\n## 6. Footer build log\n\nThe footer is static HTML in every page (`<ol id=\"ticker-lines\">`), plus the about.html table between "
      "`<!-- @aboutlog -->` markers only if they exist; `_qa/buildlog.json` holds the same text. Dates are not compared. Run with `--write-buildlog` to refresh.\n")
    P("| Source | Item | Claimed | Measured | Match |\n|---|---|---|---|---|")
    for r in footer_rows:
        P(f"| {r['source']} | {r['item']} | {r['claimed']} | {r['measured']} | {'yes' if r['ok'] else '**no**'} |")
    if not consistent:
        P("\nThe footers are not identical on every page.")

    P("\n## 7. Not checked by this harness\n\n- Browsers other than headless Chromium; real devices; screen readers.\n"
      "- Pages render in fallback fonts unless `--network` is given (Google Fonts are answered locally with an empty stylesheet).\n"
      "- Text drawn over canvases is measured against the CSS background under it, not the canvas pixels.\n"
      "- Contrast on the motion-on loads (scanned on reduced-motion loads only, where frames are static).\n"
      "- Footer items the harness does not measure (frameworks/libraries text, hero field agents and fps, field counts) are left as written.\n"
      "- Content accuracy, prices, invented numbers: see the blind review.\n")
    P("\n## All checks\n\n| Check | Result |\n|---|---|")
    for n, ok in checks:
        P(f"| {md_escape(n)} | {'pass' if ok else '**FAIL**'} |")

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(R) + "\n", encoding="utf-8")

    cl, cd = m["contrast"]["light"]["lowest"], m["contrast"]["dark"]["lowest"]
    fails = [n for n, ok in checks if not ok]
    print(f"{'PASS' if passed else 'FAIL'} site_qa {today}: {sum(ok for _, ok in checks)}/{len(checks)} checks; loads {len(loads)} "
          f"(errors {m['loads_errors']}, failed {m['loads_failed']}, overflow {m['loads_overflow']}); JS-off readable "
          f"{sum(x['readable'] for x in nojs)}/{len(nojs)}; contrast lowest {cl:.2f} light / {cd:.2f} dark; banned {len(hits)}; "
          f"diagnostic {d['api_ok']:,}/{d['api_total']:,}; footer {'ok' if footer_ok else 'mismatch'}; {elapsed:.0f}s; report {out}"
          + (f"; failing: {', '.join(fails[:5])}{' ...' if len(fails) > 5 else ''}" if fails else ""))
    return 0 if passed else 1


if __name__ == "__main__":
    try:
        sys.exit(main())
    except SystemExit:
        raise
    except Exception as exc:  # noqa: BLE001
        import traceback
        traceback.print_exc()
        print(f"FAIL harness error: {exc}")
        sys.exit(2)
