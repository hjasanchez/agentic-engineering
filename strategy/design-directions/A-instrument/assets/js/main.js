/* Direction A, "The Instrument". Plain JS, no libraries.
   Everything readable is already in the HTML; this file adds the instruments. */
(function () {
  "use strict";

  /* BRAND PLACEHOLDER: the name is undecided. Change it here (one edit): this sets the document title and the CSS
     --brand property that draws the header and footer wordmarks. --brand in main.css is only the no-JS fallback. */
  var BRAND = "Mode Fluency";

  var root = document.documentElement;
  root.style.setProperty("--brand", JSON.stringify(BRAND));
  document.title = BRAND + " · Know which mode you’re in";

  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduced = reduceMQ.matches;
  if (reduceMQ.addEventListener) reduceMQ.addEventListener("change", function (e) { reduced = e.matches; kick(); });
  var SVGNS = "http://www.w3.org/2000/svg";
  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, parent) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ------------------------------------------------------------------ data (from MODE_FLUENCY_MATRIX.md) */
  var LAYERS = [
    { id: "prompt", name: "Prompt", code: "PRM", q: "what to do" },
    { id: "context", name: "Context", code: "CTX", q: "what to know" },
    { id: "intent", name: "Intent", code: "ITN", q: "what to want" },
    { id: "judgment", name: "Judgment", code: "JDG", q: "what to doubt" },
    { id: "coherence", name: "Coherence", code: "COH", q: "what to become" },
    { id: "evaluation", name: "Evaluation", code: "EVL", q: "how to know", meta: true },
    { id: "harness", name: "Harness", code: "HRN", q: "where and how", meta: true }
  ];
  var LI = {}; LAYERS.forEach(function (l, i) { LI[l.id] = i; });
  var STANCES = [
    { name: "Oracle", code: "ORA", expect: "Truth to a hard question", layers: ["judgment"], fail: "Confident plausible prose taken as fact.", guard: "Ask for the uncertainty before the answer. Treat the answer as a claim, not a verdict." },
    { name: "Genie", code: "GEN", expect: "A discrete deliverable", layers: ["prompt"], fail: "Literal compliance with a brittle wish.", guard: "Specify scope, boundaries and success criteria before you ask (an Intent Doc)." },
    { name: "Tutor", code: "TUT", expect: "A path to the answer", layers: ["intent"], fail: "Being taught toward a goal you never stated.", guard: "State what you want to be able to do afterwards before the first question." },
    { name: "Mirror", code: "MIR", expect: "My own thinking, clarified", layers: ["coherence"], fail: "Flattery mistaken for reflection.", guard: "Ask for the structure of your argument back, not for agreement." },
    { name: "Adversary", code: "ADV", expect: "Attack on my plan", layers: ["intent"], fail: "Critique of the wrong thing.", guard: "Name what you are defending and what would change your mind." },
    { name: "Librarian", code: "LIB", expect: "Synthesis of what is known", layers: ["evaluation"], fail: "Confident retrieval of what was never said.", guard: "Check the citation exists and says what is claimed." },
    { name: "Interpreter", code: "INT", expect: "Decode material I supply", layers: ["evaluation"], fail: "Confabulated meaning that sounds insightful.", guard: "“Show me exactly which parts of the text support each conclusion.” Never accept an interpretation you cannot trace." },
    { name: "Simulator", code: "SIM", expect: "A rehearsal of reality", layers: ["context"], fail: "A rehearsal of a scenario that is not yours.", guard: "Load the real constraints, the real counterpart, the real stakes." },
    { name: "Scribe", code: "SCR", expect: "Craft applied to my substance", layers: ["prompt"], fail: "Polished form over a hollow draft.", guard: "Provide the substance and the format; review for what was invented to fill gaps." },
    { name: "Executor", code: "EXE", expect: "A delegated job, reviewed after", layers: ["harness", "judgment"], fail: "Automation complacency: locally correct steps compounding into the wrong outcome, found late.", guard: "Plan before action, checkpoints, a deviation report, nothing consequential ships uninspected. Delegation transfers labor, never responsibility." },
    { name: "Muse", code: "MUS", expect: "Provocation, not correctness", layers: [], fail: "There is no failure, only dross.", guard: "None. This is why the Muse stays hidden: it cannot be metric’d." },
    { name: "Miner", code: "MIN", expect: "The shape of a space, not one answer", layers: ["context"], layerNote: "Context (writing)", fail: "Believing an anomaly because you wanted it; losing the vein.", guard: "Assay cold, later. Record every find when you find it: if you didn’t record it, you never had it." },
    { name: "Therapist", full: "Therapist / Confessor", code: "THR", expect: "A space to think aloud", layers: ["judgment"], fail: "Dependency; outsourcing judgment about your own life.", guard: "Decide in advance what you will not delegate." },
    { name: "Translator", code: "TRL", expect: "A bridge between two worlds", layers: ["context"], fail: "A bridge from one world to a caricature of the other.", guard: "Supply both maps; name both audiences." }
  ];
  var AUTONOMY = [
    { name: "Assistive", code: "ASST", d: "you type, AI suggests" },
    { name: "Directed", code: "DIR", d: "you describe, AI types, you review" },
    { name: "Autonomous", code: "AUTO", d: "you assign, AI executes, you review" },
    { name: "Continuous", code: "CONT", d: "AI runs as a background service" }
  ];
  var AMBITION = [
    { name: "Speed", code: "SPD", pitch: 0 },
    { name: "Altitude", code: "ALT", pitch: 7 },
    { name: "Depth", code: "DPT", pitch: -7 },
    { name: "Range", code: "RNG", pitch: 0 }
  ];
  /* From Archetypes v3: the Executor's stance is "poison when it bleeds into the Tutor, the Adversary, or the Miner". */
  var BLEED = { 2: 1, 4: 1, 11: 1 };

  function layerLong(s) { return s.layerNote || (s.layers.length ? s.layers.map(function (id) { return LAYERS[LI[id]].name; }).join(" + ") : "(none)"); }
  function layerShort(s) { return s.layers.length ? s.layers.map(function (id) { return LAYERS[LI[id]].code; }).join("+") : "NONE"; }
  function layerQ(s) { return s.layers.length ? s.layers.map(function (id) { return LAYERS[LI[id]].q; }).join(" + ") : "no layer: it cannot be metric’d"; }

  /* ------------------------------------------------------------------ shared state */
  var state = { stance: 0, auto: 2, amb: 1 };
  var listeners = [];
  function confusion() { return state.auto >= 2 && !!BLEED[state.stance]; }
  function set(patch, src) {
    var changed = false;
    for (var k in patch) if (state[k] !== patch[k]) { state[k] = patch[k]; changed = true; }
    if (changed) listeners.forEach(function (fn) { fn(src); });
  }

  /* ------------------------------------------------------------------ header: height, nav, theme */
  var header = document.querySelector(".site-header");
  function measureHeader() { root.style.setProperty("--hdr", header.offsetHeight + "px"); }
  measureHeader();
  if (window.ResizeObserver) new ResizeObserver(measureHeader).observe(header);
  else window.addEventListener("resize", measureHeader);

  var navBtn = document.querySelector(".nav-toggle"), nav = $("site-nav");
  navBtn.addEventListener("click", function () {
    var open = navBtn.getAttribute("aria-expanded") !== "true";
    navBtn.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) { navBtn.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); } });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { navBtn.setAttribute("aria-expanded", "false"); nav.classList.remove("open"); navBtn.focus(); } });

  var darkMQ = window.matchMedia("(prefers-color-scheme: dark)");
  var themeBtn = $("theme-toggle");
  function effectiveTheme() { var t = root.getAttribute("data-theme"); return t || (darkMQ.matches ? "dark" : "light"); }
  function paintThemeBtn() {
    var t = effectiveTheme();
    themeBtn.setAttribute("aria-pressed", String(t === "dark"));
    themeBtn.setAttribute("aria-label", "Panel lighting: " + (t === "dark" ? "night" : "day") + ". Switch to " + (t === "dark" ? "day" : "night"));
    themeBtn.querySelectorAll(".tt-seg").forEach(function (s) { s.classList.toggle("tt-on", s.getAttribute("data-t") === t); });
  }
  themeBtn.addEventListener("click", function () {
    var next = effectiveTheme() === "dark" ? "light" : "dark";
    var apply = function () { root.setAttribute("data-theme", next); paintThemeBtn(); };
    if (document.startViewTransition && !reduced) document.startViewTransition(apply); else apply();
    try { localStorage.setItem("mf-theme", next); } catch (e) {}
  });
  if (darkMQ.addEventListener) darkMQ.addEventListener("change", paintThemeBtn);
  paintThemeBtn();

  /* ------------------------------------------------------------------ radiogroups (roving tabindex) */
  function radioGroup(container, items, getIdx, onPick) {
    container.innerHTML = "";
    var btns = items.map(function (it, i) {
      var b = document.createElement("button");
      b.type = "button"; b.setAttribute("role", "radio"); b.textContent = it.name;
      b.addEventListener("click", function () { onPick(i); });
      container.appendChild(b);
      return b;
    });
    container.addEventListener("keydown", function (e) {
      var d = (e.key === "ArrowRight" || e.key === "ArrowDown") ? 1 : (e.key === "ArrowLeft" || e.key === "ArrowUp") ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = (getIdx() + d + items.length) % items.length;
      onPick(n); btns[n].focus();
    });
    function paint() { var c = getIdx(); btns.forEach(function (b, i) { b.setAttribute("aria-checked", String(i === c)); b.tabIndex = i === c ? 0 : -1; }); }
    paint();
    return paint;
  }
  var paintAuto = radioGroup($("seg-auto"), AUTONOMY, function () { return state.auto; }, function (i) { set({ auto: i }, "ui"); });
  var paintAmb = radioGroup($("seg-amb"), AMBITION, function () { return state.amb; }, function (i) { set({ amb: i }, "ui"); });

  /* ------------------------------------------------------------------ the mode instrument (hero dial) */
  var dial = $("dial");
  var C = 300, A0 = -135, A1 = 135, SPAN = A1 - A0;
  var R = { st: [246, 286], ly: [204, 232], au: [164, 190], am: [124, 150], adi: 106 };
  function P(r, a) { var t = a * Math.PI / 180; return [C + r * Math.sin(t), C - r * Math.cos(t)]; }
  function sector(r0, r1, a0, a1) {
    var p0 = P(r1, a0), p1 = P(r1, a1), p2 = P(r0, a1), p3 = P(r0, a0), lg = (a1 - a0) > 180 ? 1 : 0;
    return "M" + p0[0].toFixed(2) + " " + p0[1].toFixed(2) + "A" + r1 + " " + r1 + " 0 " + lg + " 1 " + p1[0].toFixed(2) + " " + p1[1].toFixed(2) +
      "L" + p2[0].toFixed(2) + " " + p2[1].toFixed(2) + "A" + r0 + " " + r0 + " 0 " + lg + " 0 " + p3[0].toFixed(2) + " " + p3[1].toFixed(2) + "Z";
  }
  var segSt = SPAN / STANCES.length;
  function stanceAngle(i) { return A0 + segSt * (i + 0.5); }

  var segEls = { st: [], ly: [], au: [], am: [] }, txtEls = { st: [], ly: [], au: [], am: [] };
  var needleG, horizonG, readName, readIdx, readLayer, bankPtr, cautionTxt, knob;

  function ring(key, items, r, gapAfter, labelFn, fs) {
    var n = items.length, gapDeg = gapAfter != null ? 6 : 0, usable = SPAN - gapDeg, w = usable / n;
    items.forEach(function (it, i) {
      var a0 = A0 + i * w + (gapAfter != null && i > gapAfter ? gapDeg : 0), a1 = a0 + w;
      var path = el("path", { d: sector(r[0], r[1], a0 + 0.8, a1 - 0.8), "class": "seg-" + key, fill: "var(--bg-3)", stroke: "var(--line)", "stroke-width": "1" }, dial);
      if (it.meta) path.setAttribute("stroke-dasharray", "3 3");
      var mid = P((r[0] + r[1]) / 2, (a0 + a1) / 2);
      var t = el("text", { x: mid[0].toFixed(1), y: (mid[1] + fs * 0.36).toFixed(1), "text-anchor": "middle", "font-size": fs, "font-weight": "700", "letter-spacing": "0.6", fill: "var(--ink-3)" }, dial);
      t.textContent = labelFn(it);
      segEls[key].push({ path: path, a0: a0, a1: a1 }); txtEls[key].push(t);
    });
  }

  function buildDial() {
        var defs = el("defs", {}, dial);
    var cp = el("clipPath", { id: "adi-clip" }, defs); el("circle", { cx: C, cy: C, r: R.adi }, cp);
    // bezel + outer scale
    el("circle", { cx: C, cy: C, r: 300, fill: "var(--bg-2)", stroke: "var(--line)", "stroke-width": "1.5" }, dial);
    for (var a = A0; a <= A1 + 0.01; a += segSt / 2) {
      var maj = Math.abs(((a - A0) / segSt) % 1) < 0.01;
      var p0 = P(maj ? 288 : 291, a), p1 = P(298, a);
      el("line", { x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], stroke: maj ? "var(--ink-3)" : "var(--line)", "stroke-width": maj ? 1.5 : 1 }, dial);
    }
    ring("st", STANCES, R.st, null, function (s) { return s.code; }, 15);
    ring("ly", LAYERS, R.ly, 4, function (l) { return l.code; }, 13);
    ring("au", AUTONOMY, R.au, null, function (x) { return x.code; }, 12);
    ring("am", AMBITION, R.am, null, function (x) { return x.code; }, 12);
    // attitude indicator (centre)
    var adi = el("g", { "clip-path": "url(#adi-clip)" }, dial);
    horizonG = el("g", {}, adi);
    el("rect", { x: C - 200, y: C - 260, width: 400, height: 260, fill: "var(--sky)" }, horizonG);
    el("rect", { x: C - 200, y: C, width: 400, height: 260, fill: "var(--ground)" }, horizonG);
    el("line", { x1: C - 200, y1: C, x2: C + 200, y2: C, stroke: "var(--ink)", "stroke-width": "1.5" }, horizonG);
    [-30, -20, -10, 10, 20, 30].forEach(function (p) {
      var y = C - p * 2.2, w = Math.abs(p) % 20 === 0 ? 26 : 14;
      el("line", { x1: C - w, y1: y, x2: C + w, y2: y, stroke: "var(--ink-2)", "stroke-width": "1" }, horizonG);
      if (Math.abs(p) % 20 === 0) { var t = el("text", { x: C + w + 6, y: y + 3.5, "font-size": "9", fill: "var(--ink-2)" }, horizonG); t.textContent = Math.abs(p); }
    });
    el("circle", { cx: C, cy: C, r: R.adi, fill: "none", stroke: "var(--line)", "stroke-width": "1.5" }, dial);
    // bank scale + pointer
    [-60, -45, -30, -20, -10, 0, 10, 20, 30, 45, 60].forEach(function (b) {
      var q0 = P(R.adi + 2, b), q1 = P(R.adi + (b % 30 === 0 ? 12 : 7), b);
      el("line", { x1: q0[0], y1: q0[1], x2: q1[0], y2: q1[1], stroke: "var(--ink-3)", "stroke-width": "1.2" }, dial);
    });
    bankPtr = el("path", { d: "M" + C + " " + (C - R.adi + 3) + "l-6 10h12z", fill: "var(--sel)" }, dial);
    // fixed aircraft symbol
    el("path", { d: "M" + (C - 62) + " " + C + "h34l10 12 10-12" + "M" + (C + 62) + " " + C + "h-34", fill: "none", stroke: "var(--warn)", "stroke-width": "5", "stroke-linejoin": "round", "stroke-linecap": "square" }, dial);
    el("rect", { x: C - 3, y: C - 3, width: 6, height: 6, fill: "var(--warn)" }, dial);
    cautionTxt = el("text", { x: C, y: C + 70, "text-anchor": "middle", "font-size": "11", "font-weight": "700", "letter-spacing": "1.6", fill: "var(--warn)", opacity: "0" }, dial);
    cautionTxt.textContent = "MODE CONFUSION";
    // digital window in the open sector
    el("rect", { x: C - 92, y: 496, width: 184, height: 74, fill: "var(--bg-3)", stroke: "var(--line)" }, dial);
    readIdx = el("text", { x: C, y: 516, "text-anchor": "middle", "font-size": "11", "letter-spacing": "1.4", fill: "var(--ink-3)" }, dial);
    readName = el("text", { x: C, y: 543, "text-anchor": "middle", "font-size": "22", "font-weight": "700", "letter-spacing": "1.6", fill: "var(--sel)" }, dial);
    readLayer = el("text", { x: C, y: 562, "text-anchor": "middle", "font-size": "11", "font-weight": "700", "letter-spacing": "1.2", fill: "var(--ink-2)" }, dial);
    // needle
    needleG = el("g", {}, dial);
    var tip = P(296, 0), base = P(120, 0);
    el("line", { x1: base[0], y1: base[1], x2: tip[0], y2: tip[1] + 14, stroke: "var(--sel)", "stroke-width": "2.5" }, needleG);
    el("path", { d: "M" + C + " " + (C - 300) + "l-9 18h18z", fill: "var(--sel)" }, needleG);
    knob = el("circle", { cx: C, cy: C - 312, r: 14, fill: "var(--bg)", stroke: "var(--sel)", "stroke-width": "2", "class": "knob" }, needleG);
    el("circle", { cx: C, cy: C - 312, r: 4, fill: "var(--sel)", "pointer-events": "none" }, needleG);
  }

  // animation state for the dial
  var anim = { na: stanceAngle(0), ta: stanceAngle(0), bank: 0, tbank: 0, pitch: 7, tpitch: 7, dragging: false };
  var heroVisible = true, raf = 0, lastT = 0;
  function paintDial() {
    needleG.setAttribute("transform", "rotate(" + anim.na.toFixed(2) + " " + C + " " + C + ")");
    var wob = (!reduced && heroVisible) ? Math.sin(lastT / 1400) * 0.5 : 0;
    var b = anim.bank + wob;
    horizonG.setAttribute("transform", "rotate(" + b.toFixed(2) + " " + C + " " + C + ") translate(0 " + (anim.pitch * 2.2).toFixed(2) + ")");
    bankPtr.setAttribute("transform", "rotate(" + b.toFixed(2) + " " + C + " " + C + ")");
    var wm = $("wm-horizon"); if (wm) wm.setAttribute("transform", "rotate(" + b.toFixed(1) + " 16 16)");
  }
  function frame(t) {
    raf = 0; lastT = t;
    var k = reduced ? 1 : 0.16;
    if (!anim.dragging) anim.na += (anim.ta - anim.na) * k;
    anim.bank += (anim.tbank - anim.bank) * (reduced ? 1 : 0.06);
    anim.pitch += (anim.tpitch - anim.pitch) * (reduced ? 1 : 0.06);
    paintDial();
    var busy = Math.abs(anim.ta - anim.na) > 0.05 || Math.abs(anim.tbank - anim.bank) > 0.05 || Math.abs(anim.tpitch - anim.pitch) > 0.05;
    if (!reduced && heroVisible && !document.hidden) kick(); // gentle idle wobble while visible
    else if (busy) kick();
  }
  function kick() { if (!raf && needleG) raf = requestAnimationFrame(frame); }

  function paintSegs() {
    var s = STANCES[state.stance];
    segEls.st.forEach(function (g, i) { var on = i === state.stance; g.path.setAttribute("fill", on ? "var(--sel-soft)" : "var(--bg-3)"); g.path.setAttribute("stroke", on ? "var(--sel)" : "var(--line)"); txtEls.st[i].setAttribute("fill", on ? "var(--sel)" : "var(--ink-3)"); });
    segEls.ly.forEach(function (g, i) { var on = s.layers.indexOf(LAYERS[i].id) > -1; g.path.setAttribute("fill", on ? "var(--sel)" : "var(--bg-3)"); g.path.setAttribute("stroke", on ? "var(--sel)" : "var(--line)"); txtEls.ly[i].setAttribute("fill", on ? "var(--sel-ink)" : "var(--ink-3)"); });
    [["au", state.auto], ["am", state.amb]].forEach(function (x) {
      segEls[x[0]].forEach(function (g, i) { var on = i === x[1]; g.path.setAttribute("fill", on ? "var(--sel)" : "var(--bg-3)"); g.path.setAttribute("stroke", on ? "var(--sel)" : "var(--line)"); txtEls[x[0]][i].setAttribute("fill", on ? "var(--sel-ink)" : "var(--ink-3)"); });
    });
    readIdx.textContent = "STANCE " + String(state.stance + 1).padStart(2, "0") + " / 14";
    readName.textContent = (s.full || s.name).toUpperCase();
    readName.setAttribute("font-size", (s.full || s.name).length > 12 ? "15" : "22");
    readLayer.textContent = "LAYER  " + layerLong(s).toUpperCase();
    var c = confusion();
    cautionTxt.setAttribute("opacity", c ? "1" : "0");
    anim.tbank = c ? -16 : 0;
    anim.tpitch = AMBITION[state.amb].pitch;
    dial.setAttribute("aria-valuenow", String(state.stance + 1));
    dial.setAttribute("aria-valuetext", (s.full || s.name) + ". Load-bearing layer: " + layerLong(s) + "." + (c ? " Caution: mode confusion." : ""));
  }

  // pointer: mouse/pen drags anywhere on the stance ring; touch taps select, or drags the needle knob
  function svgPoint(e) {
    var m = dial.getScreenCTM(); if (!m) return null;
    var pt = dial.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    var p = pt.matrixTransform(m.inverse());
    var dx = p.x - C, dy = p.y - C;
    return { r: Math.sqrt(dx * dx + dy * dy), a: Math.atan2(dx, -dy) * 180 / Math.PI };
  }
  function idxAt(a, n, gapAfter) {
    var gapDeg = gapAfter != null ? 6 : 0, w = (SPAN - gapDeg) / n, x = clamp(a, A0, A1) - A0;
    if (gapAfter != null && x > (gapAfter + 1) * w) x -= gapDeg;
    return clamp(Math.floor(x / w), 0, n - 1);
  }
  var down = null;
  dial.addEventListener("pointerdown", function (e) {
    var p = svgPoint(e); if (!p) return;
    var onKnob = e.target === knob;
    down = { x: e.clientX, y: e.clientY, p: p, drag: onKnob || (e.pointerType !== "touch" && p.r >= R.st[0] - 10) };
    if (down.drag) { anim.dragging = true; dial.classList.add("dragging"); try { dial.setPointerCapture(e.pointerId); } catch (er) {} e.preventDefault(); }
  });
  dial.addEventListener("pointermove", function (e) {
    if (!down || !down.drag) return;
    var p = svgPoint(e); if (!p) return;
    var a = clamp(p.a, A0, A1);
    anim.na = a; anim.ta = a;
    set({ stance: idxAt(a, STANCES.length) }, "drag");
    kick();
  });
  function endPointer(e) {
    if (!down) return;
    var moved = Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y);
    if (down.drag) { anim.dragging = false; dial.classList.remove("dragging"); }
    if (moved < 8) {
      var p = down.p, a = p.a;
      if (Math.abs(a) <= 135) {
        if (p.r >= R.st[0] - 10 && p.r <= 320) set({ stance: idxAt(a, STANCES.length) }, "tap");
        else if (p.r >= R.au[0] && p.r <= R.au[1]) set({ auto: idxAt(a, 4) }, "tap");
        else if (p.r >= R.am[0] && p.r <= R.am[1]) set({ amb: idxAt(a, 4) }, "tap");
      }
    }
    anim.ta = stanceAngle(state.stance); kick();
    down = null;
  }
  dial.addEventListener("pointerup", endPointer);
  dial.addEventListener("pointercancel", function () { if (down && down.drag) { anim.dragging = false; dial.classList.remove("dragging"); } down = null; anim.ta = stanceAngle(state.stance); kick(); });
  dial.addEventListener("keydown", function (e) {
    var i = state.stance, n = STANCES.length;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") i = Math.min(n - 1, i + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") i = Math.max(0, i - 1);
    else if (e.key === "Home") i = 0; else if (e.key === "End") i = n - 1;
    else if (e.key === "PageUp") i = Math.min(n - 1, i + 3); else if (e.key === "PageDown") i = Math.max(0, i - 3);
    else return;
    e.preventDefault(); set({ stance: i }, "key");
  });
  $("prev-stance").addEventListener("click", function () { set({ stance: (state.stance + STANCES.length - 1) % STANCES.length }, "ui"); });
  $("next-stance").addEventListener("click", function () { set({ stance: (state.stance + 1) % STANCES.length }, "ui"); });

  /* ------------------------------------------------------------------ readouts that follow the instrument */
  var srLive = document.createElement("p"); srLive.className = "vh"; srLive.setAttribute("aria-live", "polite"); document.body.appendChild(srLive);
  var srTimer = 0, lastStance = -1;
  function setFma(id, long, short) { var n = $(id); n.querySelector(".long").textContent = long; n.querySelector(".short").textContent = short; }
  function paintReadouts(src) {
    var s = STANCES[state.stance], c = confusion();
    setFma("fma-stance", s.name, s.code);
    setFma("fma-layer", layerLong(s), layerShort(s));
    setFma("fma-auto", AUTONOMY[state.auto].name, AUTONOMY[state.auto].code);
    setFma("fma-amb", AMBITION[state.amb].name, AMBITION[state.amb].code);
    $("fma-caution").setAttribute("data-on", String(c));
    $("ro-stance").textContent = s.full || s.name;
    $("ro-expect").textContent = "expects " + s.expect.charAt(0).toLowerCase() + s.expect.slice(1);
    $("ro-layer").textContent = layerLong(s);
    $("ro-layer-q").textContent = layerQ(s);
    var note = $("ro-note");
    note.innerHTML = "";
    if (c) {
      var b = document.createElement("b"); b.textContent = "Mode confusion. ";
      note.appendChild(b);
      note.appendChild(document.createTextNode("Executor habits in a " + s.name + " room: delegate-and-stop-watching is poison when it bleeds into the Tutor, the Adversary or the Miner. "));
    }
    note.appendChild(document.createTextNode("Guardrail: "));
    var g = document.createElement("span"); g.id = "ro-guard"; g.textContent = s.guard; note.appendChild(g);
    $("live-stance").textContent = s.name;
    if (lastStance !== state.stance) {
      var roll = $("live-fail");
      roll.textContent = s.fail;
      if (!reduced && lastStance !== -1) { roll.classList.remove("in"); void roll.offsetWidth; roll.classList.add("in"); }
      lastStance = state.stance;
    }
    paintAuto(); paintAmb();
    clearTimeout(srTimer);
    if (src !== "init") srTimer = setTimeout(function () { srLive.textContent = (s.full || s.name) + ": " + s.fail + " Layer: " + layerLong(s) + "." + (c ? " Caution, mode confusion." : ""); }, 700);
  }

  /* ------------------------------------------------------------------ §1 gauges */
  function buildGauge(svg, n, labels) {
    var cx = 130, cy = 136, r1 = 116, r0 = 92, g = { segs: [], n: n };
    for (var i = 0; i < n; i++) {
      var a0 = -90 + (180 / n) * i, a1 = a0 + 180 / n;
      var d = (function (r0, r1, a0, a1) {
        function Q(r, a) { var t = a * Math.PI / 180; return [cx + r * Math.sin(t), cy - r * Math.cos(t)]; }
        var p0 = Q(r1, a0), p1 = Q(r1, a1), p2 = Q(r0, a1), p3 = Q(r0, a0);
        return "M" + p0.join(" ") + "A" + r1 + " " + r1 + " 0 0 1 " + p1.join(" ") + "L" + p2.join(" ") + "A" + r0 + " " + r0 + " 0 0 0 " + p3.join(" ") + "Z";
      })(r0, r1, a0 + 0.7, a1 - 0.7);
      g.segs.push(el("path", { d: d, fill: "var(--bg-3)", stroke: "var(--line)", "stroke-width": "1" }, svg));
    }
    for (var j = 0; j <= n; j++) {
      var a = (-90 + (180 / n) * j) * Math.PI / 180;
      el("line", { x1: cx + 120 * Math.sin(a), y1: cy - 120 * Math.cos(a), x2: cx + 128 * Math.sin(a), y2: cy - 128 * Math.cos(a), stroke: "var(--ink-3)", "stroke-width": "1" }, svg);
    }
    g.needle = el("g", {}, svg);
    el("line", { x1: cx, y1: cy, x2: cx, y2: cy - 84, stroke: "var(--sel)", "stroke-width": "2" }, g.needle);
    el("circle", { cx: cx, cy: cy, r: 5, fill: "var(--bg)", stroke: "var(--sel)", "stroke-width": "2" }, svg);
    g.txt = el("text", { x: cx, y: cy - 30, "text-anchor": "middle", "font-size": "15", "font-weight": "700", "letter-spacing": "1", fill: "var(--sel)", "font-family": "B612, sans-serif" }, svg);
    g.cx = cx; g.cy = cy;
    return g;
  }
  var gaugeSvgs = document.querySelectorAll(".gauge .g-svg");
  var G = {
    stance: buildGauge(gaugeSvgs[0], 14), structure: buildGauge(gaugeSvgs[1], 7),
    autonomy: buildGauge(gaugeSvgs[2], 4), ambition: buildGauge(gaugeSvgs[3], 4)
  };
  G.structure.needle.style.display = "none";
  [G.stance, G.autonomy, G.ambition].forEach(function (g) { g.needle.style.transition = reduced ? "none" : "transform .5s cubic-bezier(.2,.7,.1,1)"; g.needle.style.transformOrigin = g.cx + "px " + g.cy + "px"; g.needle.style.transformBox = "view-box"; });
  function paintGauge(g, lit, pointIdx, label) {
    g.segs.forEach(function (p, i) { var on = lit.indexOf(i) > -1; p.setAttribute("fill", on ? "var(--sel)" : "var(--bg-3)"); p.setAttribute("stroke", on ? "var(--sel)" : "var(--line)"); });
    if (pointIdx != null) g.needle.style.transform = "rotate(" + (-90 + (180 / g.n) * (pointIdx + 0.5)) + "deg)";
    g.txt.textContent = label;
  }
  function paintGauges() {
    var s = STANCES[state.stance];
    paintGauge(G.stance, [state.stance], state.stance, s.code);
    paintGauge(G.structure, s.layers.map(function (id) { return LI[id]; }), null, layerShort(s));
    paintGauge(G.autonomy, [state.auto], state.auto, AUTONOMY[state.auto].code);
    paintGauge(G.ambition, [state.amb], state.amb, AMBITION[state.amb].code);
    document.querySelector('[data-gv="stance"]').textContent = String(state.stance + 1).padStart(2, "0") + " / 14";
    document.querySelector('[data-gv="autonomy"]').textContent = String(state.auto + 1).padStart(2, "0") + " / 04";
    document.querySelector('[data-gv="ambition"]').textContent = String(state.amb + 1).padStart(2, "0") + " / 04";
    document.querySelectorAll("[data-set-stance]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-set-stance") === state.stance)); });
    document.querySelectorAll("[data-set-auto]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-set-auto") === state.auto)); });
    document.querySelectorAll("[data-set-amb]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-set-amb") === state.amb)); });
    document.querySelectorAll("[data-layer-chip]").forEach(function (c) { c.classList.toggle("lit", s.layers.indexOf(c.getAttribute("data-layer-chip")) > -1); });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-set-stance],[data-set-auto],[data-set-amb]"); if (!b) return;
    if (b.hasAttribute("data-set-stance")) set({ stance: +b.getAttribute("data-set-stance") }, "chip");
    if (b.hasAttribute("data-set-auto")) set({ auto: +b.getAttribute("data-set-auto") }, "chip");
    if (b.hasAttribute("data-set-amb")) set({ amb: +b.getAttribute("data-set-amb") }, "chip");
  });

  /* ------------------------------------------------------------------ hero: scroll sweeps the stances */
  var track = $("hero-track"), pinMQ = window.matchMedia("(min-width: 960px) and (min-height: 660px) and (prefers-reduced-motion: no-preference)");
  var lastScrollIdx = null, scrollRaf = 0, cue = document.querySelector(".scroll-cue .bar");
  function heroProgress() {
    var top = track.getBoundingClientRect().top + window.scrollY;
    var hdr = header.offsetHeight;
    var range = track.offsetHeight - (window.innerHeight - hdr);
    if (range <= 0) return null;
    return clamp((window.scrollY + hdr - top) / range, 0, 1);
  }
  function onScrollHero() {
    if (!pinMQ.matches) return;
    var p = heroProgress(); if (p == null) return;
    if (cue) cue.style.setProperty("--hp", p.toFixed(3));
    var idx = Math.round(p * (STANCES.length - 1));
    if (idx !== lastScrollIdx) { lastScrollIdx = idx; set({ stance: idx }, "scroll"); }
  }

  /* ------------------------------------------------------------------ §2 mode confusion demo */
  var PAIRS = [
    { prompt: "Reconcile these accounts and draft the summary.",
      a: { name: "Genie", read: "You inspect the deliverable as the whole of the work.", fail: "Literal compliance with a brittle wish.", layers: ["prompt"], guard: "Specify scope, boundaries and success criteria before you ask (an Intent Doc)." },
      b: { name: "Executor", read: "The deliverable is just the end of a chain you never saw.", fail: "Automation complacency: locally correct steps compound into the wrong outcome, found late.", layers: ["harness", "judgment"], guard: "Plan before action, checkpoints, a deviation report; nothing consequential ships uninspected." } },
    { prompt: "Explain why our customer churn went up this quarter.",
      a: { name: "Oracle", read: "You expect the truth to a hard question.", fail: "Confident plausible prose taken as fact.", layers: ["judgment"], guard: "Ask for the uncertainty before the answer. Treat the answer as a claim, not a verdict." },
      b: { name: "Tutor", read: "You expect a path to the answer, and understanding you keep.", fail: "Being taught toward a goal you never stated.", layers: ["intent"], guard: "State what you want to be able to do afterwards before the first question." } },
    { prompt: "Give me ideas for the product launch.",
      a: { name: "Muse", read: "You want one provocation, judged on arrival.", fail: "There is no failure, only dross.", layers: [], guard: "None. The Muse cannot be metric’d, which is why it stays hidden." },
      b: { name: "Miner", read: "You want the shape of the space: many variations, judgment withheld, selection late.", fail: "Believing an anomaly because you wanted it; losing the vein.", layers: ["context"], layerNote: "Context (writing)", guard: "Assay cold, later. Record every find when you find it: if you didn’t record it, you never had it." } }
  ];
  var mc = { pair: 0, b: false }, mcSvg = $("mc-svg"), mcPaths = [], mcLeds = [], mcLabels = [];
  (function buildMc() {
    var inY = 200;
    el("rect", { x: 1, y: inY - 22, width: 92, height: 44, fill: "var(--bg-3)", stroke: "var(--line)" }, mcSvg);
    var t = el("text", { x: 47, y: inY + 4, "text-anchor": "middle", "font-size": "11", "font-weight": "700", "letter-spacing": "1.4", fill: "var(--ink-2)", "font-family": "B612, sans-serif" }, mcSvg);
    t.textContent = "PROMPT";
    var mt = el("text", { x: 252, y: 262, "font-size": "9.5", "letter-spacing": "1.4", fill: "var(--ink-3)", "font-family": "B612, sans-serif" }, mcSvg); mt.textContent = "META-FUNCTIONS";
    LAYERS.forEach(function (l, i) {
      var y = 26 + i * 48 + (l.meta ? 22 : 0);
      var d = "M93 " + inY + " H140 C190 " + inY + " 190 " + y + " 240 " + y + " H250";
      el("path", { d: d, fill: "none", stroke: "var(--line-soft)", "stroke-width": "1.5" }, mcSvg);
      var hot = el("path", { d: d, fill: "none", stroke: "var(--sel)", "stroke-width": "2.5", opacity: "0" }, mcSvg);
      mcPaths.push(hot);
      mcLeds.push(el("rect", { x: 252, y: y - 9, width: 18, height: 18, fill: "var(--led-off)", stroke: "var(--line)" }, mcSvg));
      var tx = el("text", { x: 282, y: y + 4, "font-size": "12.5", "font-weight": "700", "letter-spacing": "1", fill: "var(--ink-2)", "font-family": "B612, sans-serif" }, mcSvg);
      tx.textContent = l.name.toUpperCase();
      var q = el("tspan", { "font-weight": "400", fill: "var(--ink-3)", "letter-spacing": "0.2", dx: "8" }, tx); q.textContent = l.q;
      mcLabels.push(tx);
    });
  })();
  var mcSwitch = $("mc-switch");
  function paintMc(animate) {
    var P2 = PAIRS[mc.pair], s = mc.b ? P2.b : P2.a, other = mc.b ? P2.a : P2.b;
    $("mc-prompt").textContent = P2.prompt;
    $("mc-a").textContent = P2.a.name; $("mc-b").textContent = P2.b.name;
    $("mc-a").classList.toggle("on", !mc.b); $("mc-b").classList.toggle("on", mc.b);
    mcSwitch.setAttribute("aria-checked", String(mc.b));
    mcSwitch.setAttribute("aria-label", "Stance: " + s.name + ". Switch to " + other.name);
    $("mc-read").textContent = s.read; $("mc-fail").textContent = s.fail;
    $("mc-layer").textContent = s.layerNote || (s.layers.length ? s.layers.map(function (id) { return LAYERS[LI[id]].name; }).join(" + ") : "(none)");
    $("mc-guard").textContent = s.guard;
    LAYERS.forEach(function (l, i) {
      var on = s.layers.indexOf(l.id) > -1, p = mcPaths[i];
      mcLeds[i].setAttribute("fill", on ? "var(--sel)" : "var(--led-off)");
      mcLeds[i].setAttribute("stroke", on ? "var(--sel)" : "var(--line)");
      mcLabels[i].setAttribute("fill", on ? "var(--sel)" : "var(--ink-2)");
      if (on) {
        var len = p.getTotalLength ? p.getTotalLength() : 300;
        p.style.transition = "none"; p.setAttribute("opacity", "1");
        if (animate && !reduced) {
          p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
          p.getBoundingClientRect();
          p.style.transition = "stroke-dashoffset .7s cubic-bezier(.2,.7,.1,1)"; p.style.strokeDashoffset = "0";
        } else { p.style.strokeDasharray = "none"; p.style.strokeDashoffset = "0"; }
      } else { p.setAttribute("opacity", "0"); }
    });
  }
  mcSwitch.addEventListener("click", function () { mc.b = !mc.b; paintMc(true); });
  var pairBtns = Array.prototype.slice.call(document.querySelectorAll("#mc-pairs [data-pair]"));
  function pickPair(i) { mc.pair = i; mc.b = false; pairBtns.forEach(function (b, j) { b.setAttribute("aria-checked", String(i === j)); b.tabIndex = i === j ? 0 : -1; }); paintMc(true); }
  pairBtns.forEach(function (b, i) { b.addEventListener("click", function () { pickPair(i); }); });
  $("mc-pairs").addEventListener("keydown", function (e) {
    var d = (e.key === "ArrowRight" || e.key === "ArrowDown") ? 1 : (e.key === "ArrowLeft" || e.key === "ArrowUp") ? -1 : 0;
    if (!d) return; e.preventDefault(); var n = (mc.pair + d + PAIRS.length) % PAIRS.length; pickPair(n); pairBtns[n].focus();
  });
  paintMc(false);

  /* ------------------------------------------------------------------ §3 matrix switch panel */
  var swWrap = $("switches"), on = {}, swBtns = [], typeEl = $("typeout"), typeTimer = 0;
  var spLive = document.createElement("p"); spLive.className = "vh"; spLive.setAttribute("aria-live", "polite"); document.body.appendChild(spLive);
  typeEl.removeAttribute("aria-live");
  STANCES.forEach(function (s, i) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "tsw" + (s.name === "Executor" ? " guarded" : "");
    b.setAttribute("role", "switch"); b.setAttribute("aria-checked", "false");
    b.innerHTML = '<span class="slot" aria-hidden="true"><i></i></span><span class="nm"></span><span class="ly"></span>';
    b.querySelector(".nm").textContent = s.full || s.name;
    b.querySelector(".ly").textContent = layerLong(s);
    b.addEventListener("click", function () { toggleSw(i); });
    swWrap.appendChild(b); swBtns.push(b);
  });
  function typeOut(parts) {
    clearTimeout(typeTimer);
    typeEl.innerHTML = "";
    var spans = parts.map(function (p) { var sp = document.createElement("span"); if (p.c) sp.className = p.c; typeEl.appendChild(sp); return sp; });
    var caret = document.createElement("span"); caret.className = "caret"; caret.setAttribute("aria-hidden", "true");
    spLive.textContent = parts.map(function (p) { return p.t; }).join("");
    if (reduced) { parts.forEach(function (p, i) { spans[i].textContent = p.t; }); return; }
    typeEl.appendChild(caret);
    var pi = 0, ci = 0;
    (function step() {
      if (pi >= parts.length) { typeTimer = setTimeout(function () { if (caret.parentNode) caret.remove(); }, 1600); return; }
      ci += 2; spans[pi].textContent = parts[pi].t.slice(0, ci);
      if (ci >= parts[pi].t.length) { pi++; ci = 0; }
      typeTimer = setTimeout(step, 16);
    })();
  }
  function paintPanel(changedLayers) {
    var counts = {}; LAYERS.forEach(function (l) { counts[l.id] = 0; });
    var n = 0;
    STANCES.forEach(function (s, i) { swBtns[i].setAttribute("aria-checked", String(!!on[i])); if (on[i]) { n++; s.layers.forEach(function (id) { counts[id]++; }); } });
    LAYERS.forEach(function (l) {
      var led = document.querySelector('[data-led="' + l.id + '"]');
      led.classList.toggle("on", counts[l.id] > 0);
      led.querySelector(".ct").textContent = String(counts[l.id]);
      if (changedLayers && changedLayers.indexOf(l.id) > -1 && !reduced) { led.classList.remove("pulse"); void led.offsetWidth; led.classList.add("pulse"); }
    });
    $("sp-count").textContent = n + " of 14 stances on";
  }
  function toggleSw(i) {
    on[i] = !on[i];
    var s = STANCES[i];
    paintPanel(s.layers);
    if (on[i]) typeOut([{ t: s.name.toUpperCase(), c: "t-st" }, { t: " › " + layerLong(s).toUpperCase() + " › ", c: "t-ly" }, { t: s.guard }]);
    else typeOut([{ t: s.name.toUpperCase(), c: "t-st" }, { t: " › OFF › ", c: "t-ly" }, { t: Object.keys(on).filter(function (k) { return on[k]; }).length ? "Lit layers show what the remaining stances need you to supply." : "Panel dark. Flip a stance on." }]);
  }
  on[0] = true; paintPanel(null);
  $("sp-reset").addEventListener("click", function () { on = {}; paintPanel(null); typeOut([{ t: "PANEL RESET", c: "t-st" }, { t: " › " }, { t: "Flip on the stances your team uses most." }]); });

  /* ------------------------------------------------------------------ §4 altitude ladder */
  var tapeInner = $("tape-inner"), tapeBox = $("tape-box"), rungs = Array.prototype.slice.call(document.querySelectorAll(".rung"));
  var PX = 1.2, TOP = 700;
  (function buildTape() {
    var html = "";
    for (var v = 0; v <= TOP; v += 20) {
      var y = (TOP - v) * PX, maj = v % 100 === 0;
      html += '<span class="tk' + (maj ? " maj" : "") + '" style="top:' + y + 'px"></span>';
      if (maj) html += '<span class="tl" style="top:' + y + 'px">' + v + "</span>";
    }
    tapeInner.innerHTML = html;
  })();
  var lastAlt = -1;
  function onScrollLadder() {
    var ref = window.innerHeight * 0.5, levels = rungs.map(function (r) { return +r.getAttribute("data-level"); });
    var tops = rungs.map(function (r) { return r.getBoundingClientRect().top; });
    var i = 0; for (var k = 0; k < tops.length; k++) if (tops[k] <= ref) i = k;
    var alt;
    if (tops[0] > ref) alt = levels[0];
    else if (i >= tops.length - 1) alt = levels[levels.length - 1];
    else alt = levels[i] + (levels[i + 1] - levels[i]) * clamp((ref - tops[i]) / (tops[i + 1] - tops[i]), 0, 1);
    var a = Math.round(alt);
    if (a === lastAlt) return; lastAlt = a;
    rungs.forEach(function (r, j) { r.classList.toggle("active", j === i); });
    tapeInner.style.transform = "translateY(" + (-(TOP - alt) * PX).toFixed(1) + "px)";
    tapeBox.textContent = String(a);
    var onLoop = a >= 400;
    $("tape-mode").textContent = onLoop ? "On the loop" : "In the loop";
    $("tape-sub").textContent = onLoop ? "You set the goal and the guardrails." : "You are between every turn.";
  }

  /* ------------------------------------------------------------------ wiring */
  buildDial();
  listeners.push(function (src) {
    if (!anim.dragging) anim.ta = stanceAngle(state.stance);
    paintSegs(); paintReadouts(src); paintGauges(); kick();
  });
  paintSegs(); paintReadouts("init"); paintGauges(); paintDial();

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { heroVisible = es[0].isIntersecting; kick(); }).observe(dial);
  }
  document.addEventListener("visibilitychange", kick);

  function onScroll() {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(function () { scrollRaf = 0; onScrollHero(); onScrollLadder(); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScrollHero(); onScrollLadder(); kick();
})();
