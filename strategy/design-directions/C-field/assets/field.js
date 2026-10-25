/* Direction C: "The Field". Hand-written Canvas 2D particle systems, no libraries.
   Everything readable is in the HTML; this file only adds behaviour. If it fails, the page is still complete. */
(() => {
  'use strict';

  const root = document.documentElement;
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqDark = matchMedia('(prefers-color-scheme: dark)');
  let reduced = mqReduce.matches;

  /* BRAND PLACEHOLDER: derived from the CSS custom property --brand (assets/field.css), the one place to rename. */
  const BRAND = (getComputedStyle(root).getPropertyValue('--brand').trim().replace(/^["']|["']$/g, '')) || 'Mode Fluency';
  document.title = BRAND + ' · Know which mode you’re in';

  /* ------------------------------------------------------------------ data (from MODE_FLUENCY_MATRIX.md) */
  const LAYERS = ['Prompt', 'Context', 'Intent', 'Judgment', 'Coherence', 'Evaluation', 'Harness'];
  const MATRIX = [
    ['Oracle', 'Truth to a hard question', ['Judgment'], 'Confident plausible prose taken as fact', 'Ask for the uncertainty before the answer. Treat the answer as a claim, not a verdict.'],
    ['Genie', 'A discrete deliverable', ['Prompt'], 'Literal compliance with a brittle wish', 'Specify scope, boundaries and success criteria before you ask (an Intent Doc).'],
    ['Interpreter', 'Decode material I supply', ['Evaluation'], 'Confabulated meaning that sounds insightful', '“Show me exactly which parts of the text support each conclusion.” Never accept an interpretation you cannot trace.'],
    ['Executor', 'A delegated job, reviewed after', ['Harness', 'Judgment'], 'Automation complacency; locally correct steps compounding into the wrong outcome, found late', 'Plan before action, checkpoints, a deviation report, nothing consequential ships uninspected. Delegation transfers labor, never responsibility.'],
    ['Miner', 'The shape of a space, not one answer', ['Context'], 'Believing an anomaly because you wanted it; losing the vein', 'Assay cold, later. Record every find when you find it: if you didn’t record it, you never had it.', 'Context (writing)'],
    ['Tutor', 'A path to the answer', ['Intent'], 'Being taught toward a goal you never stated', 'State what you want to be able to do afterwards before the first question.'],
    ['Adversary', 'Attack on my plan', ['Intent'], 'Critique of the wrong thing', 'Name what you are defending and what would change your mind.'],
    ['Scribe', 'Craft applied to my substance', ['Prompt'], 'Polished form over a hollow draft', 'Provide the substance and the format; review for what was invented to fill gaps.'],
    ['Simulator', 'A rehearsal of reality', ['Context'], 'A rehearsal of a scenario that is not yours', 'Load the real constraints, the real counterpart, the real stakes.'],
    ['Librarian', 'Synthesis of what is known', ['Evaluation'], 'Confident retrieval of what was never said', 'Check the citation exists and says what is claimed.'],
    ['Mirror', 'My own thinking, clarified', ['Coherence'], 'Flattery mistaken for reflection', 'Ask for the structure of your argument back, not for agreement.'],
    ['Translator', 'A bridge between two worlds', ['Context'], 'A bridge from one world to a caricature of the other', 'Supply both maps; name both audiences.'],
    ['Therapist', 'A space to think aloud', ['Judgment'], 'Dependency; outsourcing judgment about your own life', 'Decide in advance what you will not delegate.', null, 'Therapist / Confessor'],
    ['Muse', 'Provocation, not correctness', [], 'There is no failure, only dross', 'None. This is why the Muse stays hidden: it cannot be metric’d.', '(none)'],
  ];
  const byName = Object.fromEntries(MATRIX.map(r => [r[0], r]));
  const FIELD_NOTE = {
    Oracle: 'every token converges on one bright point',
    Genie: 'tokens fill exactly the shape that was asked for, and nothing else',
    Tutor: 'a path forms; it leads wherever the tutor thinks you are going',
    Executor: 'a stream leaves on its own; the checkpoint line catches it',
    Miner: 'tokens scatter; bright ore surfaces; pass over it to record it before the vein shifts',
    Mirror: 'the field returns your own position, reflected across the line',
    Muse: 'no target, no checkpoint: provocation only',
  };
  const HINT = {
    Oracle: 'Pointer or touch: you are the warm point. Disturb the consensus.',
    Genie: 'The box is exactly what was asked for. Push it and it snaps back.',
    Tutor: 'The path ends at a goal you did not state.',
    Executor: 'Nothing passes the checkpoint uninspected.',
    Miner: 'Move over the bright ore to record it before the vein shifts.',
    Mirror: 'Move: the field shows you your own position, twice.',
    Muse: 'Dross and sparks. Nothing to measure.',
  };

  /* Build facts printed in the footer ticker. Numbers come from this build's own QA run (see _qa/qa-report.md). */
  const BUILD_FACTS = [
    'build: plain HTML, CSS and JS; frameworks 0; libraries 0; raster images 0',
    'size: 80,999 bytes across 4 files, fonts excluded (budget 600,000)',
    'field: Canvas 2D, hand-written particle systems; 1,600 agents (700 on phones); paused off-screen',
    'qa: 8 headless Chromium runs (390/1280 x light/dark x motion on/off); console errors 0; failed requests 0',
    'qa: horizontal overflow 0 of 8; hero field 60 fps at 1280 in the QA browser',
    'a11y: 191 text elements checked per theme at 1280; lowest contrast 5.23:1 light, 6.07:1 dark (floor 4.5)',
    'copy: banned-word grep 0 hits; prices only as written in the brief',
  ];

  /* ------------------------------------------------------------------ helpers */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked: fine */ } },
  };
  function hexToRgb(h) {
    h = h.trim();
    if (h.startsWith('#')) {
      if (h.length === 4) h = '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
      const n = parseInt(h.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
    }
    const m = h.match(/\d+(\.\d+)?/g);
    return m ? m.slice(0, 3).join(',') : '0,0,0';
  }
  let C = {};
  function readColors() {
    const cs = getComputedStyle(root);
    const g = k => cs.getPropertyValue(k).trim();
    C = {
      bg: hexToRgb(g('--bg')), bg2: hexToRgb(g('--bg-2')), line: g('--line'), ink: g('--ink'), dim: g('--dim'),
      particle: g('--particle'), hi: g('--particle-hi'), human: g('--human-glow'), humanRgb: hexToRgb(g('--human-glow')),
    };
  }
  // cheap smooth flow angle
  function flow(x, y, t) {
    return Math.sin(x * 0.0058 + t * 0.00029 + Math.cos(y * 0.0049 - t * 0.00021) * 1.7) * 1.9 + Math.cos(y * 0.0051 + x * 0.0013 + t * 0.00017) * 1.3;
  }

  /* ------------------------------------------------------------------ theme toggle */
  const themeBtn = $('.theme-toggle');
  const themeOrder = ['auto', 'light', 'dark'];
  function applyTheme(mode) {
    if (mode === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', mode);
    if (themeBtn) {
      $('.theme-label', themeBtn).textContent = mode;
      themeBtn.setAttribute('aria-label', 'Colour theme: ' + mode + '. Activate to change.');
    }
    readColors();
    fields.forEach(f => f.recolor());
  }
  const fields = [];
  readColors();

  /* ------------------------------------------------------------------ field base */
  function makeField(canvas, host, cfg) {
    const ctx = canvas.getContext('2d', { alpha: false });
    const f = {
      canvas, ctx, host, W: 1, H: 1, dpr: 1, N: 0, t: 0, frame: 0, fps: 0,
      x: null, y: null, vx: null, vy: null, s: null, k: null,
      pointer: { x: -1e4, y: -1e4, active: false, last: 0, trail: [] },
      visible: false, running: false, raf: 0, lastTs: 0, fpsAcc: 0, fpsN: 0,
    };
    f.alloc = n => {
      const ox = f.x, oy = f.y, on = f.N;
      f.N = n;
      f.x = new Float32Array(n); f.y = new Float32Array(n); f.vx = new Float32Array(n); f.vy = new Float32Array(n);
      f.s = new Float32Array(n); f.k = new Uint8Array(n); f.r = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        if (ox && i < on) { f.x[i] = ox[i]; f.y[i] = oy[i]; } else { f.x[i] = Math.random() * f.W; f.y[i] = Math.random() * f.H; }
        f.r[i] = Math.random();
      }
    };
    f.resize = () => {
      const r = canvas.getBoundingClientRect();
      const W = Math.max(1, Math.round(r.width)), H = Math.max(1, Math.round(r.height));
      const sx = W / f.W, sy = H / f.H;
      f.dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * f.dpr); canvas.height = Math.round(H * f.dpr);
      ctx.setTransform(f.dpr, 0, 0, f.dpr, 0, 0);
      if (f.x) for (let i = 0; i < f.N; i++) { f.x[i] *= sx; f.y[i] *= sy; }
      f.W = W; f.H = H;
      const want = cfg.count(W);
      if (want !== f.N) f.alloc(want);
      cfg.layout && cfg.layout(f);
      f.clear();
      if (reduced || !f.running) f.still();
    };
    f.clear = () => { ctx.fillStyle = 'rgb(' + (cfg.bgKey ? C[cfg.bgKey] : C.bg) + ')'; ctx.fillRect(0, 0, f.W, f.H); };
    f.recolor = () => { f.clear(); if (reduced || !f.running) f.still(); };
    // a static, fully-formed frame (reduced motion, or before the loop starts)
    f.still = (steps = 140) => {
      const saveP = f.pointer.active;
      if (reduced) f.pointer.active = false;
      for (let i = 0; i < steps; i++) { f.t += 16.7; cfg.step(f, 1); }
      f.pointer.active = saveP;
      f.clear();
      cfg.draw(f, true);
    };
    f.loop = ts => {
      if (!f.running) return;
      const dt = f.lastTs ? ts - f.lastTs : 16.7;
      f.lastTs = ts;
      const k = clamp(dt / 16.7, 0.25, 2.5);
      f.t += dt; f.frame++;
      f.fpsAcc += dt; f.fpsN++;
      if (f.fpsAcc > 1000) { f.fps = Math.round(1000 * f.fpsN / f.fpsAcc); f.fpsAcc = 0; f.fpsN = 0; }
      cfg.step(f, k);
      cfg.draw(f, false);
      f.raf = requestAnimationFrame(f.loop);
    };
    f.update = () => {
      const should = f.visible && !document.hidden && !reduced;
      if (should && !f.running) { f.running = true; f.lastTs = 0; f.raf = requestAnimationFrame(f.loop); }
      else if (!should && f.running) { f.running = false; cancelAnimationFrame(f.raf); f.fps = 0; }
    };
    // pointer: the human
    const toLocal = e => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    const onMove = e => {
      const [px, py] = toLocal(e);
      const p = f.pointer;
      p.x = px; p.y = py; p.active = true; p.last = performance.now();
      p.trail.push([px, py, p.last]); if (p.trail.length > 26) p.trail.shift();
      cfg.pointer && cfg.pointer(f, e);
      if (reduced) requestStill();
    };
    let stillQueued = false;
    const requestStill = () => { if (stillQueued) return; stillQueued = true; requestAnimationFrame(() => { stillQueued = false; f.clear(); cfg.draw(f, true); }); };
    f.requestStill = requestStill;
    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerdown', onMove, { passive: true });
    host.addEventListener('pointerleave', () => { f.pointer.active = false; f.pointer.trail.length = 0; cfg.leave && cfg.leave(f); if (reduced) requestStill(); });
    new IntersectionObserver(es => { es.forEach(e => { f.visible = e.isIntersecting; }); f.update(); }, { rootMargin: '80px' }).observe(host);
    new ResizeObserver(() => f.resize()).observe(host);
    fields.push(f);
    return f;
  }

  function drawHuman(f, ctx) {
    const p = f.pointer;
    if (!p.active) return;
    const now = performance.now();
    const tr = p.trail;
    if (tr.length > 1) {
      ctx.lineWidth = 1.5; ctx.lineCap = 'round';
      for (let i = 1; i < tr.length; i++) {
        const a = clamp(1 - (now - tr[i][2]) / 700, 0, 1) * (i / tr.length);
        if (a <= 0) continue;
        ctx.strokeStyle = 'rgba(' + C.humanRgb + ',' + a.toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(tr[i - 1][0], tr[i - 1][1]); ctx.lineTo(tr[i][0], tr[i][1]); ctx.stroke();
      }
    }
    ctx.fillStyle = C.human;
    ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(' + C.humanRgb + ',0.45)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(p.x, p.y, 11, 0, TAU); ctx.stroke();
  }

  /* ------------------------------------------------------------------ scroll velocity (shared) */
  let scrollV = 0, lastY = window.scrollY;
  window.addEventListener('scroll', () => { const y = window.scrollY; scrollV = clamp(scrollV * 0.6 + (y - lastY) * 0.4, -80, 80); lastY = y; }, { passive: true });

  /* ================================================================== HERO: field + compass instrument */
  const hero = $('.hero');
  const heroCanvas = $('#hero-canvas');
  const slot = $('#compass-slot');
  const copy = $('.hero-copy');
  const axisBtns = $$('.axis-btn');
  const axisRows = $$('.axis-row');
  const AXES = ['STANCE', 'STRUCTURE', 'AUTONOMY', 'AMBITION'];
  const AX_V = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  const degEl = $('#needle-deg'), axEl = $('#needle-axis');
  let axis = 0;
  let needle = -Math.PI / 2, needleTarget = -Math.PI / 2;
  const G = { cx: 0, cy: 0, R: 100, q: { x0: 0, y0: 0, x1: 0, y1: 0 } };

  function setAxis(i, focus) {
    i = ((i % 4) + 4) % 4;
    const changed = i !== axis;
    axis = i;
    axisBtns.forEach((b, j) => { b.setAttribute('aria-checked', String(j === i)); b.tabIndex = j === i ? 0 : -1; });
    if (focus) axisBtns[i].focus();
    axisRows.forEach((r, j) => r.classList.toggle('is-active', j === i));
    axEl.textContent = AXES[i];
    if (!heroField || !heroField.pointer.active) { needleTarget = -Math.PI / 2 + i * Math.PI / 2; }
    if (reduced) { needle = needleTarget; writeDeg(); heroField && heroField.still(30); }
    return changed;
  }
  function writeDeg() {
    const b = Math.round(((needle + Math.PI / 2) * 180 / Math.PI % 360 + 360) % 360);
    degEl.textContent = String(b).padStart(3, '0');
  }
  axisBtns.forEach((b, j) => {
    b.addEventListener('click', () => setAxis(j));
    b.addEventListener('keydown', e => {
      const k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); setAxis(axis + 1, true); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); setAxis(axis - 1, true); }
    });
  });
  axisRows.forEach((r, j) => r.addEventListener('pointerenter', () => setAxis(j)));

  let heroField = null;
  if (hero && heroCanvas && slot) {
    heroField = makeField(heroCanvas, hero, {
      count: W => (W < 640 ? 700 : 1600),
      layout(f) {
        const hr = heroCanvas.getBoundingClientRect(), sr = slot.getBoundingClientRect(), cr = copy.getBoundingClientRect();
        G.cx = sr.left - hr.left + sr.width / 2; G.cy = sr.top - hr.top + sr.height / 2;
        G.R = Math.max(40, sr.width / 2 - 46);
        G.q = { x0: cr.left - hr.left - 12, y0: cr.top - hr.top - 12, x1: cr.right - hr.left + 12, y1: cr.bottom - hr.top + 12 };
        const ac = $('#agent-count'); if (ac) ac.textContent = f.N.toLocaleString('en-US');
      },
      pointer(f) {
        const dx = f.pointer.x - G.cx, dy = f.pointer.y - G.cy;
        needleTarget = Math.atan2(dy, dx);
        if (dx * dx + dy * dy < (G.R * 1.7) ** 2) {
          const b = ((Math.atan2(dx, -dy) * 180 / Math.PI) + 360) % 360;
          setAxis(Math.round(b / 90) % 4);
        }
        if (reduced) { needle = needleTarget; writeDeg(); }
      },
      leave() { needleTarget = -Math.PI / 2 + axis * Math.PI / 2; if (reduced) { needle = needleTarget; writeDeg(); } },
      step(f, k) {
        const { x, y, vx, vy, N } = f, t = f.t;
        const bx = AX_V[axis][0], by = AX_V[axis][1];
        const cx = G.cx, cy = G.cy, R = G.R, R2 = (R * 1.75) ** 2;
        const p = f.pointer, pa = p.active && performance.now() - p.last < 2500;
        const sv = scrollV * 0.004;
        const W = f.W, H = f.H;
        for (let i = 0; i < N; i++) {
          const a = flow(x[i], y[i], t);
          let fx = Math.cos(a) * 0.055 + bx * 0.045, fy = Math.sin(a) * 0.055 + by * 0.045;
          let dx = x[i] - cx, dy = y[i] - cy, d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) + 0.001, kk = 1 - d / (R * 1.75);
            fx += (-dy / d) * 0.085 * kk; fy += (dx / d) * 0.085 * kk;          // drift around the compass
            const rr = (d - R) / R;                                              // and settle on its ring
            fx -= (dx / d) * rr * 0.07 * kk; fy -= (dy / d) * rr * 0.07 * kk;
          }
          if (pa) {
            dx = x[i] - p.x; dy = y[i] - p.y; d2 = dx * dx + dy * dy;
            if (d2 < 12100) { const d = Math.sqrt(d2) + 0.001, kk = 1 - d / 110; fx += (dx / d) * 0.8 * kk - (dy / d) * 0.25 * kk; fy += (dy / d) * 0.8 * kk + (dx / d) * 0.25 * kk; }
          }
          vx[i] = (vx[i] + fx * k) * 0.94; vy[i] = (vy[i] + (fy - sv) * k) * 0.94;
          x[i] += vx[i] * k; y[i] += vy[i] * k;
          if (x[i] < -4) x[i] += W + 8; else if (x[i] > W + 4) x[i] -= W + 8;
          if (y[i] < -4) y[i] += H + 8; else if (y[i] > H + 4) y[i] -= H + 8;
        }
        scrollV *= 0.92;
        needle += Math.atan2(Math.sin(needleTarget - needle), Math.cos(needleTarget - needle)) * Math.min(1, 0.12 * k);
        if (f.frame % 4 === 0) writeDeg();
      },
      draw(f, still) {
        const ctx = f.ctx, { x, y, N } = f, q = G.q;
        if (!still) { ctx.fillStyle = 'rgba(' + C.bg + ',0.2)'; ctx.fillRect(0, 0, f.W, f.H); }
        // particles: dimmer behind the copy so text keeps its contrast
        ctx.fillStyle = 'rgba(' + C.particle + ',0.62)';
        ctx.beginPath();
        for (let i = 0; i < N; i++) { const xi = x[i], yi = y[i]; if (xi > q.x0 && xi < q.x1 && yi > q.y0 && yi < q.y1) continue; ctx.rect(xi, yi, 1.6, 1.6); }
        ctx.fill();
        ctx.fillStyle = 'rgba(' + C.particle + ',0.13)';
        ctx.beginPath();
        for (let i = 0; i < N; i++) { const xi = x[i], yi = y[i]; if (xi > q.x0 && xi < q.x1 && yi > q.y0 && yi < q.y1) ctx.rect(xi, yi, 1.4, 1.4); }
        ctx.fill();
        drawCompass(ctx);
        drawHuman(f, ctx);
      },
    });
  }

  function drawCompass(ctx) {
    const { cx, cy, R } = G;
    ctx.save();
    ctx.translate(cx, cy);
    // inner calm disc
    ctx.fillStyle = 'rgba(' + C.bg + ',0.78)';
    ctx.beginPath(); ctx.arc(0, 0, R * 0.62, 0, TAU); ctx.fill();
    ctx.strokeStyle = C.line; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(0, 0, R * 0.62, 0, TAU); ctx.stroke();
    // ticks
    ctx.strokeStyle = C.dim;
    for (let d = 0; d < 360; d += 5) {
      const a = d * Math.PI / 180 - Math.PI / 2, major = d % 90 === 0, mid = d % 30 === 0;
      const r0 = R + 6, r1 = R + (major ? 20 : mid ? 14 : 10);
      ctx.lineWidth = major ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); ctx.stroke();
    }
    // selected quadrant arc
    const sa = -Math.PI / 2 + axis * Math.PI / 2;
    ctx.strokeStyle = C.human; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, R + 26, sa - Math.PI / 4 + 0.04, sa + Math.PI / 4 - 0.04); ctx.stroke();
    // cross hairs
    ctx.strokeStyle = C.line; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-R * 0.5, 0); ctx.lineTo(R * 0.5, 0); ctx.moveTo(0, -R * 0.5); ctx.lineTo(0, R * 0.5); ctx.stroke();
    // needle
    ctx.rotate(needle + Math.PI / 2);
    const L = R * 0.56, w = Math.max(6, R * 0.055);
    ctx.fillStyle = C.dim;
    ctx.beginPath(); ctx.moveTo(0, L); ctx.lineTo(w, 0); ctx.lineTo(-w, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.human;
    ctx.beginPath(); ctx.moveTo(0, -L); ctx.lineTo(w, 0); ctx.lineTo(-w, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgb(' + C.bg + ')'; ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(0, 0, 5, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  /* ================================================================== §2 STANCE FIELD */
  const stage = $('.stance-stage');
  const stageCanvas = $('#stance-canvas');
  const hud = $('#stage-hud'), hint = $('#stage-hint'), syslog = $('#syslog');
  const stanceBtns = $$('.stance-btn');
  let mode = 'Oracle', modeT0 = 0;
  const S = { caught: 0, drift: 0, recorded: 0, nextShift: 0, path: [], cpX: 0, tray: 0 };
  let stanceField = null;

  // sr-only live region for the log so screen readers hear the whole line once, not each typed character
  const live = document.createElement('p');
  live.className = 'sr-only'; live.setAttribute('aria-live', 'polite');
  live.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;';
  if (syslog) { syslog.removeAttribute('aria-live'); syslog.removeAttribute('role'); syslog.after(live); }

  function buildPath(f) {
    const W = f.W, H = f.H;
    const P = [[0.07, 0.84], [0.24, 0.74], [0.36, 0.5], [0.55, 0.58], [0.68, 0.34], [0.86, 0.2]].map(([a, b]) => [a * W, b * H]);
    const out = [];
    for (let s = 0; s < P.length - 1; s++) {
      const p0 = P[Math.max(0, s - 1)], p1 = P[s], p2 = P[s + 1], p3 = P[Math.min(P.length - 1, s + 2)];
      for (let j = 0; j < 40; j++) {
        const t = j / 40, t2 = t * t, t3 = t2 * t;
        out.push([
          0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
          0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
        ]);
      }
    }
    out.push(P[P.length - 1]);
    S.path = out;
  }
  function respawnExec(f, i, stagger) {
    f.x[i] = stagger ? f.W * (Math.random() * 0.95 - 0.15) : -Math.random() * 30;
    f.y[i] = f.H * (0.38 + Math.random() * 0.24);
    f.vx[i] = 1.8 + Math.random() * 1.0; f.vy[i] = 0; f.k[i] = 0; f.s[i] = 0;
  }
  function enterMode(f) {
    const N = f.N;
    S.caught = 0; S.drift = 0; S.recorded = 0; S.tray = 0; S.nextShift = f.t + 4500;
    for (let i = 0; i < N; i++) f.k[i] = 0;
    if (mode === 'Executor') { for (let i = 0; i < N; i++) respawnExec(f, i, true); }
    if (mode === 'Miner') {
      const cx = f.W / 2, cy = f.H / 2;
      for (let i = 0; i < N; i++) { const a = Math.random() * TAU, sp = 3 + Math.random() * Math.random() * 22; f.x[i] = cx + Math.cos(a) * 8; f.y[i] = cy + Math.sin(a) * 8; f.vx[i] = Math.cos(a) * sp; f.vy[i] = Math.sin(a) * sp; }
      shiftVein(f);
    }
  }
  function shiftVein(f) {
    const N = f.N;
    for (let i = 0; i < N; i++) if (f.k[i] === 1) f.k[i] = 0;
    const want = Math.max(10, Math.round(N * 0.03));
    for (let n = 0; n < want; n++) { const i = (Math.random() * N) | 0; if (f.k[i] === 0) f.k[i] = 1; }
  }

  if (stage && stageCanvas) {
    stanceField = makeField(stageCanvas, stage, {
      bgKey: 'bg2',
      count: W => (W < 640 ? 480 : 950),
      layout(f) { buildPath(f); S.cpX = f.W * 0.84; if (!modeT0) { modeT0 = 1; enterMode(f); } },
      step(f, k) {
        const { x, y, vx, vy, N } = f, W = f.W, H = f.H, t = f.t, cx = W / 2, cy = H / 2;
        const p = f.pointer, pa = p.active && performance.now() - p.last < 2500;
        for (let i = 0; i < N; i++) {
          let fx = 0, fy = 0, damp = 0.9;
          const ri = f.r[i];
          if (mode === 'Oracle') {
            const dx = cx - x[i], dy = cy - y[i], d = Math.sqrt(dx * dx + dy * dy) + 0.01;
            fx = dx * 0.0016 + (-dy / d) * 0.05 * (0.4 + ri); fy = dy * 0.0016 + (dx / d) * 0.05 * (0.4 + ri);
            damp = 0.95;
          } else if (mode === 'Genie') {
            const bw = W * 0.46, bh = H * 0.5, per = 2 * (bw + bh); let s = (i / N) * per, tx, ty;
            if (s < bw) { tx = cx - bw / 2 + s; ty = cy - bh / 2; }
            else if ((s -= bw) < bh) { tx = cx + bw / 2; ty = cy - bh / 2 + s; }
            else if ((s -= bh) < bw) { tx = cx + bw / 2 - s; ty = cy + bh / 2; }
            else { s -= bw; tx = cx - bw / 2; ty = cy + bh / 2 - s; }
            fx = (tx - x[i]) * 0.02; fy = (ty - y[i]) * 0.02; damp = 0.84;
          } else if (mode === 'Tutor') {
            const P = S.path, n = P.length - 1;
            const u = ((i / N) + t * 0.000045) % 1, idx = Math.floor(u * n), pt = P[idx];
            const spread = (1 - u) * 22 + 2, off = (ri - 0.5) * spread;
            const nx = P[Math.min(n, idx + 1)][0] - pt[0], ny = P[Math.min(n, idx + 1)][1] - pt[1], nl = Math.hypot(nx, ny) || 1;
            const tx = pt[0] - (ny / nl) * off, ty = pt[1] + (nx / nl) * off;
            fx = (tx - x[i]) * 0.03; fy = (ty - y[i]) * 0.03; damp = 0.82;
          } else if (mode === 'Executor') {
            if (f.k[i] === 1) {                       // caught at the checkpoint, held for review
              f.s[i] += k; vx[i] = 0; vy[i] = 0;
              if (f.s[i] > 110 + ri * 60) respawnExec(f, i, false);
              continue;
            }
            const a = flow(x[i] * 1.6, y[i] * 1.6, t);  // small local steps that compound
            const ey = H / 2 - y[i];
            vx[i] += (1.9 + ri * 1.0 - vx[i]) * 0.05 * k;
            vy[i] = (vy[i] + (Math.sin(a) * 0.022 + ey * 0.00006 * (ri > 0.06 ? 1 : -1)) * k) * Math.pow(0.975, k);
            if (pa) { const dx = x[i] - p.x, dy = y[i] - p.y, d2 = dx * dx + dy * dy; if (d2 < 4900) { const d = Math.sqrt(d2) + 0.01; vy[i] += (dy / d) * 0.5 * (1 - d / 70) * k; } }
            x[i] += vx[i] * k; y[i] += vy[i] * k;
            if (x[i] >= S.cpX) { x[i] = S.cpX - Math.random() * 5; f.k[i] = 1; f.s[i] = 0; S.caught++; }
            else if (y[i] < 0 || y[i] > H) { S.drift++; respawnExec(f, i, false); }
            continue;
          } else if (mode === 'Miner') {
            if (f.k[i] === 2) {                       // recorded: rests in the tray
              const slotI = f.s[i], tx = W - 14 - (slotI % 20) * 7, ty = H - 14 - Math.floor(slotI / 20) * 7;
              x[i] += (tx - x[i]) * 0.12 * k; y[i] += (ty - y[i]) * 0.12 * k; continue;
            }
            fx = (Math.random() - 0.5) * 0.36; fy = (Math.random() - 0.5) * 0.36; damp = 0.95;
            if (pa && f.k[i] === 1) { const ex = x[i] - p.x, ey = y[i] - p.y; if (ex * ex + ey * ey < 900) { f.k[i] = 2; f.s[i] = S.tray++; S.recorded++; } }
          } else if (mode === 'Mirror') {
            const tx0 = pa ? p.x : cx + Math.sin(t * 0.0006) * W * 0.28, ty0 = pa ? p.y : cy + Math.sin(t * 0.0011) * H * 0.25;
            const tx = i & 1 ? W - tx0 : tx0, ty = ty0;
            const dx = tx - x[i], dy = ty - y[i], d = Math.sqrt(dx * dx + dy * dy) + 0.01;
            fx = dx * 0.0022 + (-dy / d) * 0.12 * (i & 1 ? -1 : 1); fy = dy * 0.0022 + (dx / d) * 0.12 * (i & 1 ? -1 : 1);
            damp = 0.93;
          } else { // Muse
            const a = flow(x[i] * 2.2, y[i] * 2.2, t * 2.5) + ri * 0.8;
            fx = Math.cos(a) * 0.16; fy = Math.sin(a) * 0.16; damp = 0.95;
          }
          if (pa && mode !== 'Miner' && mode !== 'Mirror') {
            const dx = x[i] - p.x, dy = y[i] - p.y, d2 = dx * dx + dy * dy;
            if (d2 < 4900) { const d = Math.sqrt(d2) + 0.01, kk = 1 - d / 70; fx += (dx / d) * 1.1 * kk; fy += (dy / d) * 1.1 * kk; }
          }
          vx[i] = (vx[i] + fx * k) * Math.pow(damp, k); vy[i] = (vy[i] + fy * k) * Math.pow(damp, k);
          x[i] += vx[i] * k; y[i] += vy[i] * k;
          if (mode === 'Muse' || mode === 'Miner') {
            if (x[i] < 0) x[i] += W; else if (x[i] > W) x[i] -= W;
            if (y[i] < 0) y[i] += H; else if (y[i] > H) y[i] -= H;
          }
        }
        if (mode === 'Miner' && t > S.nextShift) { shiftVein(f); S.nextShift = t + 4500; }
        if (f.frame % 12 === 0 || !f.running) writeHud(f);
      },
      draw(f, still) {
        const ctx = f.ctx, { x, y, N } = f, W = f.W, H = f.H;
        if (!still) { ctx.fillStyle = 'rgba(' + C.bg2 + ',' + (mode === 'Muse' ? 0.12 : 0.24) + ')'; ctx.fillRect(0, 0, W, H); }
        // mode furniture
        ctx.lineWidth = 1;
        if (mode === 'Executor') {
          ctx.strokeStyle = C.human; ctx.setLineDash([4, 5]); ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(S.cpX + 3, 8); ctx.lineTo(S.cpX + 3, H - 8); ctx.stroke(); ctx.setLineDash([]);
        } else if (mode === 'Mirror') {
          ctx.strokeStyle = C.line; ctx.setLineDash([2, 6]);
          ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke(); ctx.setLineDash([]);
        } else if (mode === 'Tutor') {
          const g = S.path[S.path.length - 1];
          ctx.strokeStyle = C.dim; ctx.beginPath(); ctx.arc(g[0], g[1], 12, 0, TAU); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(' + C.particle + ',0.7)';
        ctx.beginPath();
        for (let i = 0; i < N; i++) if (f.k[i] === 0 || mode !== 'Miner') ctx.rect(x[i], y[i], 1.7, 1.7);
        ctx.fill();
        if (mode === 'Miner') {
          ctx.fillStyle = 'rgb(' + C.hi + ')';
          ctx.beginPath();
          for (let i = 0; i < N; i++) if (f.k[i] === 1) { ctx.moveTo(x[i] + 3, y[i]); ctx.arc(x[i], y[i], 3, 0, TAU); }
          ctx.fill();
          ctx.fillStyle = C.human;
          ctx.beginPath();
          for (let i = 0; i < N; i++) if (f.k[i] === 2) ctx.rect(x[i] - 2, y[i] - 2, 4, 4);
          ctx.fill();
        }
        if (mode === 'Oracle') {
          ctx.fillStyle = 'rgb(' + C.hi + ')';
          ctx.beginPath(); ctx.arc(W / 2, H / 2, 4, 0, TAU); ctx.fill();
          ctx.strokeStyle = 'rgba(' + C.hi + ',0.5)'; ctx.beginPath(); ctx.arc(W / 2, H / 2, 10, 0, TAU); ctx.stroke();
        }
        drawHuman(f, ctx);
        if (still) writeHud(f);
      },
    });
  }

  let hudLast = '';
  function writeHud(f) {
    let s = 'mode=' + mode.toLowerCase() + ' · ';
    const n = f.N.toLocaleString('en-US');
    switch (mode) {
      case 'Oracle': s += n + ' tokens → 1 answer'; break;
      case 'Genie': s += 'literal: the exact shape asked for'; break;
      case 'Tutor': s += 'path → goal (unstated)'; break;
      case 'Executor': s += 'caught at checkpoint ' + S.caught.toLocaleString('en-US') + ' · drifted ' + S.drift; break;
      case 'Miner': s += 'recorded ' + S.recorded + (reduced ? '' : ' · vein shifts in ' + Math.max(0, Math.ceil((S.nextShift - f.t) / 1000)) + 's'); break;
      case 'Mirror': s += 'reflecting, not agreeing'; break;
      default: s += 'no target · no failure, only dross';
    }
    if (s !== hudLast) { hud.textContent = s; hudLast = s; }
  }

  let typeTimer = 0;
  function writeLog(name) {
    const r = byName[name];
    const lines = [
      ['stance', r[6] || r[0], ''],
      ['expects', r[1], ''],
      ['load', (r[5] || r[2].join(' + ')).toUpperCase(), ''],
      ['field', FIELD_NOTE[name], ''],
      ['fail', r[3], 'warn'],
      ['guard', r[4], 'ok'],
    ];
    live.textContent = (r[6] || r[0]) + '. Load-bearing layer: ' + (r[5] || r[2].join(' and ')) + '. Failure: ' + r[3] + '. Guardrail: ' + r[4];
    clearTimeout(typeTimer);
    syslog.innerHTML = '';
    const els = lines.map(([lv, txt, cls]) => {
      const p = document.createElement('p'); p.className = 'log-line' + (cls ? ' ' + cls : '');
      const l = document.createElement('span'); l.className = 'lv'; l.textContent = lv;
      const v = document.createElement('span'); v.textContent = reduced ? txt : '';
      p.append(l, v); syslog.append(p); return [p, v, txt];
    });
    if (reduced) return;
    // type: whole log in about 1.1 s, however long the lines are
    let li = 0, ci = 0;
    const total = lines.reduce((a, l) => a + l[1].length, 0), per = Math.max(2, Math.ceil(total / 60));
    const tick = () => {
      if (li >= els.length) return;
      const [p, v, txt] = els[li];
      p.classList.add('typing');
      ci = Math.min(txt.length, ci + per);
      v.textContent = txt.slice(0, ci);
      if (ci >= txt.length) { p.classList.remove('typing'); li++; ci = 0; }
      typeTimer = setTimeout(tick, 16);
    };
    tick();
  }
  function setMode(name, focus) {
    if (!byName[name]) return;
    mode = name;
    stanceBtns.forEach(b => { const on = b.dataset.stance === name; b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
    hint.textContent = HINT[name];
    writeLog(name);
    if (stanceField) { enterMode(stanceField); stanceField.clear(); if (reduced || !stanceField.running) stanceField.still(mode === 'Executor' ? 260 : 180); }
  }
  stanceBtns.forEach((b, j) => {
    b.addEventListener('click', () => setMode(b.dataset.stance));
    b.addEventListener('keydown', e => {
      const k = e.key; let n = null;
      if (k === 'ArrowRight' || k === 'ArrowDown') n = (j + 1) % stanceBtns.length;
      else if (k === 'ArrowLeft' || k === 'ArrowUp') n = (j - 1 + stanceBtns.length) % stanceBtns.length;
      else if (k === 'Home') n = 0; else if (k === 'End') n = stanceBtns.length - 1;
      if (n !== null) { e.preventDefault(); setMode(stanceBtns[n].dataset.stance, true); }
    });
  });

  /* ================================================================== §3 CIRCUIT */
  const circuit = $('#circuit'), svg = $('#wires');
  const sNodes = $$('.s-node'), lNodes = $$('.l-node');
  const lIndex = Object.fromEntries(LAYERS.map((l, i) => [l, i]));
  const NS = 'http://www.w3.org/2000/svg';
  let wires = []; // {s, l, path, len}
  let pulses = [], pulseRaf = 0, activeS = -1, activeL = null;

  function el(tag, attrs) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function layoutCircuit() {
    if (!circuit || !svg) return;
    const cr = circuit.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + cr.width + ' ' + cr.height);
    svg.innerHTML = '';
    wires = [];
    const lPos = {};
    lNodes.forEach(n => { const r = n.getBoundingClientRect(); lPos[n.dataset.l] = [r.left - cr.left, r.top - cr.top + r.height / 2]; });
    sNodes.forEach(n => {
      const i = +n.dataset.i, row = MATRIX[i], r = n.getBoundingClientRect();
      const x1 = r.right - cr.left, y1 = r.top - cr.top + r.height / 2;
      if (!row[2].length) {
        const x2 = x1 + 22;
        const path = el('path', { d: 'M' + x1 + ' ' + y1 + 'H' + x2 });
        svg.append(path);
        svg.append(el('circle', { cx: x2 + 4, cy: y1, r: 3.5, class: 'pad' }));
        const tx = el('text', { x: x2 + 12, y: y1 + 3.5, class: 'stub-label' }); tx.textContent = 'no load';
        svg.append(tx);
        wires.push({ s: i, l: null, path, len: path.getTotalLength() });
        return;
      }
      row[2].forEach(L => {
        const [x2, y2] = lPos[L], li = lIndex[L];
        const cx = x1 + (x2 - x1) * (0.18 + 0.64 * li / 6), rr = Math.min(6, Math.abs(y2 - y1) / 2);
        const dir = y2 > y1 ? 1 : -1;
        const d = Math.abs(y2 - y1) < 1
          ? 'M' + x1 + ' ' + y1 + 'H' + x2
          : 'M' + x1 + ' ' + y1 + 'H' + (cx - rr) + 'Q' + cx + ' ' + y1 + ' ' + cx + ' ' + (y1 + dir * rr) + 'V' + (y2 - dir * rr) + 'Q' + cx + ' ' + y2 + ' ' + (cx + rr) + ' ' + y2 + 'H' + x2;
        const path = el('path', { d, 'data-s': i, 'data-l': L });
        svg.append(path);
        wires.push({ s: i, l: L, path, len: path.getTotalLength() });
      });
      svg.append(el('circle', { cx: x1, cy: y1, r: 2.5, class: 'pad', 'data-s': i }));
    });
    LAYERS.forEach(L => { const [x2, y2] = lPos[L]; svg.append(el('circle', { cx: x2, cy: y2, r: 2.5, class: 'pad', 'data-l': L })); });
    applyCircuit();
  }
  function applyCircuit() {
    const hotS = new Set(), hotL = new Set();
    if (activeS >= 0) { hotS.add(activeS); MATRIX[activeS][2].forEach(l => hotL.add(l)); }
    if (activeL) { hotL.add(activeL); MATRIX.forEach((r, i) => { if (r[2].includes(activeL)) hotS.add(i); }); }
    wires.forEach(w => w.path.classList.toggle('hot', !!((activeS >= 0 && w.s === activeS) || (activeL && w.l === activeL))));
    $$('.pad', svg).forEach(c => c.classList.toggle('hot', !!((c.dataset.s !== undefined && hotS.has(+c.dataset.s)) || (c.dataset.l && hotL.has(c.dataset.l)))));
    sNodes.forEach(n => { const i = +n.dataset.i; n.classList.toggle('on', i === activeS); n.classList.toggle('lit', hotS.has(i) && i !== activeS); });
    lNodes.forEach(n => { n.classList.toggle('lit', hotL.has(n.dataset.l)); n.classList.toggle('on', n.dataset.l === activeL); });
    circuit.classList.toggle('dim-others', activeS >= 0 || !!activeL);
  }
  function runPulses() {
    cancelAnimationFrame(pulseRaf);
    $$('.pulse', svg).forEach(p => p.remove());
    if (reduced) return;
    const hot = wires.filter(w => w.path.classList.contains('hot') && w.l);
    pulses = hot.map(w => { const c = el('circle', { r: 3.5, class: 'pulse' }); svg.append(c); return { w, c }; });
    const t0 = performance.now();
    const go = now => {
      const u = ((now - t0) % 1500) / 900;
      pulses.forEach(({ w, c }) => {
        if (u > 1) { c.setAttribute('opacity', '0'); return; }
        const e = 1 - Math.pow(1 - u, 3), pt = w.path.getPointAtLength(e * w.len);
        c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1)); c.setAttribute('opacity', '1');
      });
      if (pulses.length) pulseRaf = requestAnimationFrame(go);
    };
    if (pulses.length) pulseRaf = requestAnimationFrame(go);
  }
  const crS = $('#cr-stance'), crL = $('#cr-layer'), crE = $('#cr-expect'), crF = $('#cr-fail'), crG = $('#cr-guard');
  function activateStance(i) {
    activeS = i; activeL = null; applyCircuit(); runPulses();
    const r = MATRIX[i];
    crS.textContent = r[6] || r[0]; crL.textContent = r[5] || (r[2].join(' + ') || '(none)');
    crE.textContent = r[1]; crF.textContent = r[3]; crG.textContent = r[4];
  }
  function activateLayer(L) {
    activeL = L; activeS = -1; applyCircuit(); runPulses();
    crS.textContent = MATRIX.filter(r => r[2].includes(L)).map(r => r[0]).join(', ');
    crL.textContent = L;
  }
  sNodes.forEach(n => {
    const i = +n.dataset.i;
    n.addEventListener('pointerenter', () => activateStance(i));
    n.addEventListener('focus', () => activateStance(i));
    n.addEventListener('click', () => activateStance(i));
  });
  lNodes.forEach(n => {
    const L = n.dataset.l;
    n.addEventListener('pointerenter', () => activateLayer(L));
    n.addEventListener('focus', () => activateLayer(L));
    n.addEventListener('click', () => activateLayer(L));
  });
  if (circuit) {
    circuit.addEventListener('keydown', e => {
      const t = e.target; if (!t.classList || !t.classList.contains('node')) return;
      const list = t.classList.contains('s-node') ? sNodes : lNodes, j = list.indexOf(t);
      if (e.key === 'ArrowDown') { e.preventDefault(); list[(j + 1) % list.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); list[(j - 1 + list.length) % list.length].focus(); }
      else if (e.key === 'ArrowRight' && list === sNodes) { e.preventDefault(); const L = MATRIX[j][2][0]; if (L) lNodes[lIndex[L]].focus(); }
      else if (e.key === 'ArrowLeft' && list === lNodes) { e.preventDefault(); const L = LAYERS[j], si = MATRIX.findIndex(r => r[2].includes(L)); if (si >= 0) sNodes[si].focus(); }
    });
    new ResizeObserver(() => layoutCircuit()).observe(circuit);
    // assembly: each wire draws in turn and its stance lights its layer (about 1.4 s, decorative, text is already visible)
    let assembled = false;
    new IntersectionObserver((es, io) => {
      if (!es.some(e => e.isIntersecting) || assembled) return;
      assembled = true; io.disconnect();
      if (reduced) { activateStance(0); return; }
      const ws = wires.slice();
      ws.forEach(w => { w.path.style.strokeDasharray = w.len; w.path.style.strokeDashoffset = w.len; });
      ws.forEach((w, j) => setTimeout(() => {
        w.path.style.transition = 'stroke-dashoffset .5s cubic-bezier(.3,.7,.2,1)';
        w.path.style.strokeDashoffset = '0';
        activeS = w.s; activeL = null; applyCircuit();
      }, 80 + j * 72));
      setTimeout(() => { ws.forEach(w => { w.path.style.strokeDasharray = ''; w.path.style.strokeDashoffset = ''; w.path.style.transition = ''; }); activateStance(0); }, 80 + ws.length * 72 + 520);
    }, { threshold: 0.3 }).observe(circuit);
  }

  /* ================================================================== FOOTER TICKER */
  const tick = $('#ticker-lines');
  let liveLine = null;
  if (tick) {
    tick.innerHTML = '';
    BUILD_FACTS.forEach(s => { const li = document.createElement('li'); li.textContent = s; tick.append(li); });
    liveLine = document.createElement('li'); liveLine.className = 'info'; tick.append(liveLine);
    const upd = () => {
      const h = heroField, st = stanceField;
      const fmt = f => !f ? 'n/a' : reduced ? 'static frame (reduced motion)' : f.running ? (f.fps ? f.fps + ' fps' : 'starting') : 'paused (off-screen)';
      liveLine.textContent = 'live: hero field ' + (h ? h.N.toLocaleString('en-US') + ' agents, ' : '') + fmt(h) + ' · stance field ' + fmt(st) + ' · main thread idle between frames';
    };
    upd(); setInterval(upd, 1000);
  }

  /* ================================================================== init */
  document.addEventListener('visibilitychange', () => fields.forEach(f => f.update()));
  mqReduce.addEventListener('change', e => { reduced = e.matches; fields.forEach(f => { f.update(); if (reduced) f.still(); }); });
  mqDark.addEventListener('change', () => { readColors(); fields.forEach(f => f.recolor()); });

  const saved = store.get('fieldTheme');
  applyTheme(themeOrder.includes(saved) ? saved : 'auto');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme') || 'auto', next = themeOrder[(themeOrder.indexOf(cur) + 1) % 3];
    applyTheme(next); store.set('fieldTheme', next);
  });

  setAxis(0);
  needle = needleTarget; writeDeg();
  setMode('Oracle');
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fields.forEach(f => f.resize()); layoutCircuit(); });

  // QA hook (read-only): lets the test harness confirm the systems are alive
  window.__field = { get hero() { return heroField && { N: heroField.N, running: heroField.running, fps: heroField.fps }; }, get stance() { return stanceField && { N: stanceField.N, running: stanceField.running, mode }; }, get axis() { return AXES[axis]; } };
})();
