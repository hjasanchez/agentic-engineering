/* Mode Fluency, Direction C "The Field". Hand-written Canvas 2D particle systems, no libraries.
   Everything readable is in the HTML; this file only adds behaviour. If it fails, every page is still complete.
   One file for all nine pages: each section below runs only when its markup is on the page. */
(() => {
  'use strict';

  const root = document.documentElement;
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqDark = matchMedia('(prefers-color-scheme: dark)');
  let reduced = mqReduce.matches;

  /* WORDMARK: read from the CSS custom property --brand (assets/field.css), the one place to rename the practice. */
  const BRAND = (getComputedStyle(root).getPropertyValue('--brand').trim().replace(/^["']|["']$/g, '')) || 'Mode Fluency';
  window.MF_BRAND = BRAND;
  const pageTitle = document.body.dataset.title;
  document.title = pageTitle ? pageTitle.replace('{brand}', BRAND) + ' · ' + BRAND : BRAND + ' · Know which mode you’re in';

  /* ------------------------------------------------------------------ data (from MODE_FLUENCY_MATRIX.md, row order kept) */
  const LAYERS = ['Prompt', 'Context', 'Intent', 'Judgment', 'Coherence', 'Evaluation', 'Harness'];
  const LAYER_Q = { Prompt: 'what to do', Context: 'what to know', Intent: 'what to want', Judgment: 'what to doubt', Coherence: 'what to become', Evaluation: 'how to know', Harness: 'where and how' };
  // [name, expect, layers, failure, guardrail, layerLabel override, display name]
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
  const layerLabel = r => r[5] || (r[2].join(' + ') || '(none)');

  /* what each stance's field does: short, one idea each */
  const FIELD_NOTE = {
    Oracle: 'every token converges on one bright point',
    Genie: 'tokens fill exactly the shape that was asked for, and nothing else',
    Tutor: 'a path forms; it leads wherever the tutor thinks you are going',
    Executor: 'a stream leaves on its own; the checkpoint line catches it',
    Miner: 'tokens scatter; bright ore surfaces; pass over it to record it before the vein shifts',
    Mirror: 'the field returns your own position, reflected across the line',
    Muse: 'no target, no checkpoint: provocation only',
    Adversary: 'critique streams in; until you name what you defend, it lands on a decoy',
    Librarian: 'tokens leave the shelves for one synthesis; a few come from shelves that do not exist',
    Interpreter: 'material in, conclusions out; only the evidence trail shows which conclusions have a source',
    Simulator: 'two parties rehearse; without your real counterpart it is a generic scene',
    Scribe: 'rough material becomes clean lines; the gaps are filled with marks you never wrote',
    Translator: 'tokens cross a bridge; without the second map they land on a caricature',
    Therapist: 'a slow, breathing space; one ring stays clear: what you will not delegate',
  };
  const HINT = {
    Oracle: 'Pointer or touch: you are the warm point. Disturb the consensus.',
    Genie: 'The box is exactly what was asked for. Push it and it snaps back.',
    Tutor: 'The path ends at a goal you did not state.',
    Executor: 'Nothing passes the checkpoint uninspected.',
    Miner: 'Move over the bright ore to record it before the vein shifts.',
    Mirror: 'Move: the field shows you your own position, twice.',
    Muse: 'Dross and sparks. Nothing to measure.',
    Adversary: 'Point at the plan (left) to name what you are defending.',
    Librarian: 'Hover the synthesis (right) to check the citations.',
    Interpreter: 'Point anywhere to demand the evidence trail.',
    Simulator: 'Pointer: load your real counterpart and the real constraints.',
    Scribe: 'Hover the clean lines (right) to review what was invented.',
    Translator: 'Hover the right-hand world to supply its map.',
    Therapist: 'The ring is what you decided not to delegate. It moves with you.',
  };

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
      bg: hexToRgb(g('--bg')), bg2: hexToRgb(g('--bg-2')), surface: hexToRgb(g('--surface')), line: g('--line'), ink: g('--ink'), dim: g('--dim'),
      particle: g('--particle'), hi: g('--particle-hi'), human: g('--human-glow'), humanRgb: hexToRgb(g('--human-glow')), ok: g('--ok'),
    };
  }
  function flow(x, y, t) {
    return Math.sin(x * 0.0058 + t * 0.00029 + Math.cos(y * 0.0049 - t * 0.00021) * 1.7) * 1.9 + Math.cos(y * 0.0051 + x * 0.0013 + t * 0.00017) * 1.3;
  }
  const typeLater = new Set();

  /* ------------------------------------------------------------------ theme toggle */
  const themeBtn = $('.theme-toggle');
  const themeOrder = ['auto', 'light', 'dark'];
  const fields = [];
  function applyTheme(mode) {
    if (mode === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', mode);
    if (themeBtn) {
      $('.theme-label', themeBtn).textContent = mode;
      themeBtn.setAttribute('aria-label', 'Colour theme: ' + mode + '. Activate to change.');
    }
    readColors();
    fields.forEach(f => f.recolor());
  }
  readColors();

  /* ------------------------------------------------------------------ field base */
  function makeField(canvas, host, cfg) {
    const ctx = canvas.getContext('2d', { alpha: false });
    const f = {
      canvas, ctx, host, W: 1, H: 1, dpr: 1, N: 0, t: 0, frame: 0, fps: 0,
      x: null, y: null, vx: null, vy: null, s: null, k: null, r: null,
      pointer: { x: -1e4, y: -1e4, active: false, last: 0, trail: [] },
      visible: false, running: false, raf: 0, lastTs: 0, fpsAcc: 0, fpsN: 0, cfg,
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
      const want = cfg.count(W, H);
      if (want !== f.N) f.alloc(want);
      cfg.layout && cfg.layout(f);
      f.clear();
      if (reduced || !f.running) f.still();
    };
    f.clear = () => { ctx.fillStyle = 'rgb(' + (cfg.bgKey ? C[cfg.bgKey] : C.bg) + ')'; ctx.fillRect(0, 0, f.W, f.H); };
    f.recolor = () => { if (!f.x) return; f.clear(); if (reduced || !f.running) f.still(); };
    // a static, fully-formed frame (reduced motion, or before the loop starts)
    f.still = (steps = 140) => {
      if (!f.x) return;
      const saveP = f.pointer.active;
      if (reduced) f.pointer.active = false;
      for (let i = 0; i < steps; i++) { f.t += 16.7; cfg.step(f, 1); }
      f.pointer.active = saveP;
      f.clear();
      cfg.draw(f, true);
    };
    f.loop = ts => {
      if (!f.running) return;
      if (cfg.active && !cfg.active()) { f.running = false; f.fps = 0; return; }
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
      const should = f.visible && !document.hidden && !reduced && (!cfg.active || cfg.active());
      if (should && !f.running) { f.running = true; f.lastTs = 0; f.raf = requestAnimationFrame(f.loop); }
      else if (!should && f.running) { f.running = false; cancelAnimationFrame(f.raf); f.fps = 0; }
    };
    const toLocal = e => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    let stillQueued = false;
    const requestStill = () => { if (stillQueued) return; stillQueued = true; requestAnimationFrame(() => { stillQueued = false; f.clear(); cfg.draw(f, true); }); };
    f.requestStill = requestStill;
    const onMove = e => {
      const [px, py] = toLocal(e);
      const p = f.pointer;
      p.x = px; p.y = py; p.active = true; p.last = performance.now();
      p.trail.push([px, py, p.last]); if (p.trail.length > 26) p.trail.shift();
      cfg.pointer && cfg.pointer(f, e);
      if (reduced) { cfg.step(f, 1); requestStill(); }
    };
    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerdown', onMove, { passive: true });
    host.addEventListener('pointerleave', () => { f.pointer.active = false; f.pointer.trail.length = 0; cfg.leave && cfg.leave(f); if (reduced) requestStill(); });
    new IntersectionObserver(es => { es.forEach(e => { f.visible = e.isIntersecting; }); f.update(); }, { rootMargin: '60px' }).observe(host);
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

  let scrollV = 0, lastY = window.scrollY;
  window.addEventListener('scroll', () => { const y = window.scrollY; scrollV = clamp(scrollV * 0.6 + (y - lastY) * 0.4, -80, 80); lastY = y; }, { passive: true });

  /* ================================================================== THE FOURTEEN STANCE BEHAVIOURS
     Each behaviour: enter(f,S) resets its state; step(f,k,S,p,pa) moves the tokens; draw(f,ctx,S,pa) paints them;
     hud(f,S,pa) is the one-line readout. pa = the human (pointer) is present. */
  let RX = 0, RY = 0;
  function repel(f, i, p, R, s) {
    RX = 0; RY = 0;
    const dx = f.x[i] - p.x, dy = f.y[i] - p.y, d2 = dx * dx + dy * dy;
    if (d2 < R * R) { const d = Math.sqrt(d2) + 0.01, kk = 1 - d / R; RX = (dx / d) * s * kk; RY = (dy / d) * s * kk; }
  }
  function integ(f, i, fx, fy, damp, k) {
    const dk = Math.pow(damp, k);
    f.vx[i] = (f.vx[i] + fx * k) * dk; f.vy[i] = (f.vy[i] + fy * k) * dk;
    f.x[i] += f.vx[i] * k; f.y[i] += f.vy[i] * k;
  }
  function steer(f, i, tx, ty, sp, k, a = 0.06) {
    const dx = tx - f.x[i], dy = ty - f.y[i], d = Math.sqrt(dx * dx + dy * dy) + 0.001;
    const s = Math.min(sp, d * 0.12 + 0.4);
    f.vx[i] += ((dx / d) * s - f.vx[i]) * a * k; f.vy[i] += ((dy / d) * s - f.vy[i]) * a * k;
    f.x[i] += f.vx[i] * k; f.y[i] += f.vy[i] * k;
    return d;
  }
  function dots(f, ctx, alpha, test, size = 1.7, rgb = C.particle) {
    ctx.fillStyle = 'rgba(' + rgb + ',' + alpha + ')';
    ctx.beginPath();
    const { x, y, N } = f;
    for (let i = 0; i < N; i++) if (!test || test(i)) ctx.rect(x[i], y[i], size, size);
    ctx.fill();
  }
  function wrap(f, i) {
    if (f.x[i] < 0) f.x[i] += f.W; else if (f.x[i] > f.W) f.x[i] -= f.W;
    if (f.y[i] < 0) f.y[i] += f.H; else if (f.y[i] > f.H) f.y[i] -= f.H;
  }
  const PR = f => clamp(Math.min(f.W, f.H) * 0.2, 34, 70); // pointer reach scales with the stage

  function buildPath(f, S) {
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
    f.vx[i] = (1.8 + Math.random()) * f.sp; f.vy[i] = 0; f.k[i] = 0; f.s[i] = 0;
  }
  function shiftVein(f) {
    const N = f.N;
    for (let i = 0; i < N; i++) if (f.k[i] === 1) f.k[i] = 0;
    const want = Math.max(10, Math.round(N * 0.03));
    if (N) for (let n = 0; n < want; n++) { const i = (Math.random() * N) | 0; if (f.k[i] === 0) f.k[i] = 1; }
  }

  const B = {
    Oracle: {
      step(f, k, S, p, pa) {
        const { x, y, N, r } = f, cx = f.W / 2, cy = f.H / 2, R = PR(f);
        for (let i = 0; i < N; i++) {
          const dx = cx - x[i], dy = cy - y[i], d = Math.sqrt(dx * dx + dy * dy) + 0.01;
          let fx = dx * 0.0016 + (-dy / d) * 0.05 * (0.4 + r[i]), fy = dy * 0.0016 + (dx / d) * 0.05 * (0.4 + r[i]);
          if (pa) { repel(f, i, p, R, 1.1); fx += RX; fy += RY; }
          integ(f, i, fx, fy, 0.95, k);
        }
      },
      draw(f, ctx) {
        dots(f, ctx, 0.7);
        ctx.fillStyle = 'rgb(' + C.hi + ')';
        ctx.beginPath(); ctx.arc(f.W / 2, f.H / 2, 4, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(' + C.hi + ',0.5)'; ctx.beginPath(); ctx.arc(f.W / 2, f.H / 2, 10, 0, TAU); ctx.stroke();
      },
      hud: f => f.N.toLocaleString('en-US') + ' tokens → 1 answer',
    },
    Genie: {
      step(f, k, S, p, pa) {
        const { x, y, N } = f, W = f.W, H = f.H, cx = W / 2, cy = H / 2, R = PR(f);
        const bw = W * 0.46, bh = H * 0.5, per = 2 * (bw + bh);
        for (let i = 0; i < N; i++) {
          let s = (i / N) * per, tx, ty;
          if (s < bw) { tx = cx - bw / 2 + s; ty = cy - bh / 2; }
          else if ((s -= bw) < bh) { tx = cx + bw / 2; ty = cy - bh / 2 + s; }
          else if ((s -= bh) < bw) { tx = cx + bw / 2 - s; ty = cy + bh / 2; }
          else { s -= bw; tx = cx - bw / 2; ty = cy + bh / 2 - s; }
          let fx = (tx - x[i]) * 0.02, fy = (ty - y[i]) * 0.02;
          if (pa) { repel(f, i, p, R, 1.1); fx += RX; fy += RY; }
          integ(f, i, fx, fy, 0.84, k);
        }
      },
      draw(f, ctx) { dots(f, ctx, 0.7); },
      hud: () => 'literal: the exact shape asked for',
    },
    Tutor: {
      enter(f, S) { buildPath(f, S); },
      step(f, k, S, p, pa) {
        const { x, y, N, r } = f, t = f.t, P = S.path, n = P.length - 1, R = PR(f);
        for (let i = 0; i < N; i++) {
          const u = ((i / N) + t * 0.000045) % 1, idx = Math.floor(u * n), pt = P[idx];
          const spread = (1 - u) * 22 * f.sc + 2, off = (r[i] - 0.5) * spread;
          const nx = P[Math.min(n, idx + 1)][0] - pt[0], ny = P[Math.min(n, idx + 1)][1] - pt[1], nl = Math.hypot(nx, ny) || 1;
          const tx = pt[0] - (ny / nl) * off, ty = pt[1] + (nx / nl) * off;
          let fx = (tx - x[i]) * 0.03, fy = (ty - y[i]) * 0.03;
          if (pa) { repel(f, i, p, R, 1.1); fx += RX; fy += RY; }
          integ(f, i, fx, fy, 0.82, k);
        }
      },
      draw(f, ctx, S) {
        const g = S.path[S.path.length - 1];
        ctx.strokeStyle = C.dim; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(g[0], g[1], 12, 0, TAU); ctx.stroke();
        dots(f, ctx, 0.7);
      },
      hud: () => 'path → goal (unstated)',
    },
    Executor: {
      enter(f, S) { S.caught = 0; S.drift = 0; S.cpX = f.W * 0.84; for (let i = 0; i < f.N; i++) respawnExec(f, i, true); },
      step(f, k, S, p, pa) {
        const { x, y, vx, vy, N, r } = f, H = f.H, t = f.t, sp = f.sp;
        S.cpX = f.W * 0.84;
        for (let i = 0; i < N; i++) {
          if (f.k[i] === 1) { f.s[i] += k; vx[i] = 0; vy[i] = 0; if (f.s[i] > 110 + r[i] * 60) respawnExec(f, i, false); continue; }
          const a = flow(x[i] * 1.6, y[i] * 1.6, t);
          const ey = H / 2 - y[i];
          vx[i] += ((1.9 + r[i]) * sp - vx[i]) * 0.05 * k;
          vy[i] = (vy[i] + (Math.sin(a) * 0.022 + ey * 0.00006 * (r[i] > 0.06 ? 1 : -1)) * k) * Math.pow(0.975, k);
          if (pa) { const dx = x[i] - p.x, dy = y[i] - p.y, d2 = dx * dx + dy * dy; if (d2 < 4900) { const d = Math.sqrt(d2) + 0.01; vy[i] += (dy / d) * 0.5 * (1 - d / 70) * k; } }
          x[i] += vx[i] * k; y[i] += vy[i] * k;
          if (x[i] >= S.cpX) { x[i] = S.cpX - Math.random() * 5; f.k[i] = 1; f.s[i] = 0; S.caught++; }
          else if (y[i] < 0 || y[i] > H) { S.drift++; respawnExec(f, i, false); }
        }
      },
      draw(f, ctx, S) {
        ctx.strokeStyle = C.human; ctx.setLineDash([4, 5]); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(S.cpX + 3, 8); ctx.lineTo(S.cpX + 3, f.H - 8); ctx.stroke(); ctx.setLineDash([]);
        dots(f, ctx, 0.7);
      },
      hud: (f, S) => 'caught at checkpoint ' + S.caught.toLocaleString('en-US') + ' · drifted ' + S.drift,
    },
    Miner: {
      enter(f, S) {
        S.recorded = 0; S.tray = 0; S.nextShift = f.t + 4500;
        const cx = f.W / 2, cy = f.H / 2;
        for (let i = 0; i < f.N; i++) { f.k[i] = 0; const a = Math.random() * TAU, sp = (3 + Math.random() * Math.random() * 22) * f.sp; f.x[i] = cx + Math.cos(a) * 8; f.y[i] = cy + Math.sin(a) * 8; f.vx[i] = Math.cos(a) * sp; f.vy[i] = Math.sin(a) * sp; }
        shiftVein(f);
      },
      step(f, k, S, p, pa) {
        const { x, y, N } = f, W = f.W, H = f.H;
        for (let i = 0; i < N; i++) {
          if (f.k[i] === 2) {
            const sl = f.s[i], tx = W - 14 - (sl % 20) * 7, ty = H - 14 - Math.floor(sl / 20) * 7;
            x[i] += (tx - x[i]) * 0.12 * k; y[i] += (ty - y[i]) * 0.12 * k; continue;
          }
          integ(f, i, (Math.random() - 0.5) * 0.36, (Math.random() - 0.5) * 0.36, 0.95, k);
          if (pa && f.k[i] === 1) { const ex = x[i] - p.x, ey = y[i] - p.y; if (ex * ex + ey * ey < 900) { f.k[i] = 2; f.s[i] = S.tray++; S.recorded++; } }
          wrap(f, i);
        }
        if (f.t > S.nextShift) { shiftVein(f); S.nextShift = f.t + 4500; }
      },
      draw(f, ctx) {
        const { x, y, N } = f;
        dots(f, ctx, 0.7, i => f.k[i] === 0);
        ctx.fillStyle = 'rgb(' + C.hi + ')'; ctx.beginPath();
        for (let i = 0; i < N; i++) if (f.k[i] === 1) { ctx.moveTo(x[i] + 3, y[i]); ctx.arc(x[i], y[i], 3, 0, TAU); }
        ctx.fill();
        ctx.fillStyle = C.human; ctx.beginPath();
        for (let i = 0; i < N; i++) if (f.k[i] === 2) ctx.rect(x[i] - 2, y[i] - 2, 4, 4);
        ctx.fill();
      },
      hud: (f, S) => 'recorded ' + S.recorded + (reduced ? '' : ' · vein shifts in ' + Math.max(0, Math.ceil((S.nextShift - f.t) / 1000)) + 's'),
    },
    Mirror: {
      step(f, k, S, p, pa) {
        const { x, y, N } = f, W = f.W, H = f.H, t = f.t, cx = W / 2, cy = H / 2;
        const tx0 = pa ? p.x : cx + Math.sin(t * 0.0006) * W * 0.28, ty0 = pa ? p.y : cy + Math.sin(t * 0.0011) * H * 0.25;
        for (let i = 0; i < N; i++) {
          const tx = i & 1 ? W - tx0 : tx0, ty = ty0, sg = i & 1 ? -1 : 1;
          const dx = tx - x[i], dy = ty - y[i], d = Math.sqrt(dx * dx + dy * dy) + 0.01;
          integ(f, i, dx * 0.0022 + (-dy / d) * 0.12 * sg * f.sp, dy * 0.0022 + (dx / d) * 0.12 * sg * f.sp, 0.93, k);
        }
      },
      draw(f, ctx) {
        ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.setLineDash([2, 6]);
        ctx.beginPath(); ctx.moveTo(f.W / 2, 0); ctx.lineTo(f.W / 2, f.H); ctx.stroke(); ctx.setLineDash([]);
        dots(f, ctx, 0.7);
      },
      hud: () => 'reflecting, not agreeing',
    },
    Muse: {
      fade: 0.12,
      step(f, k, S, p, pa) {
        const { x, y, N, r } = f, t = f.t, R = PR(f);
        for (let i = 0; i < N; i++) {
          const a = flow(x[i] * 2.2, y[i] * 2.2, t * 2.5) + r[i] * 0.8;
          let fx = Math.cos(a) * 0.16, fy = Math.sin(a) * 0.16;
          if (pa) { repel(f, i, p, R, 1.1); fx += RX; fy += RY; }
          integ(f, i, fx, fy, 0.95, k); wrap(f, i);
        }
      },
      draw(f, ctx) { dots(f, ctx, 0.7); },
      hud: () => 'no target · no failure, only dross',
    },

    /* ---------- the seven new behaviours ---------- */
    Adversary: {
      // a plan sits on the left; critique streams in from the right. Unnamed, it lands on a wandering decoy.
      enter(f, S) {
        S.on = 0; S.off = 0; S.nPlan = Math.round(f.N * 0.28);
        for (let i = 0; i < f.N; i++) { if (i < S.nPlan) f.k[i] = 3; else { f.k[i] = 0; spawnAtk(f, i, true); } }
      },
      step(f, k, S, p, pa) {
        const { x, y, N, r } = f, W = f.W, H = f.H, t = f.t;
        const box = { x0: W * 0.07, x1: W * 0.43, y0: H * 0.42, y1: H * 0.58 };
        let Tx, Ty;
        if (pa) { Tx = p.x; Ty = p.y; } else { Tx = W * (0.68 + 0.16 * Math.sin(t * 0.0005)); Ty = H * (0.5 + 0.32 * Math.sin(t * 0.00071 + 1)); }
        S.dx = Tx; S.dy = Ty;
        const onPlan = pa && Tx > box.x0 - 12 && Tx < box.x1 + 12 && Ty > box.y0 - 16 && Ty < box.y1 + 16;
        S.onPlan = onPlan;
        for (let i = 0; i < N; i++) {
          if (i < S.nPlan) {
            const tx = W * (0.09 + 0.32 * (i / S.nPlan)), ty = H * 0.5 + (r[i] - 0.5) * H * 0.08;
            integ(f, i, (tx - x[i]) * 0.05, (ty - y[i]) * 0.05, 0.8, k); continue;
          }
          if (f.s[i] > 0) { f.s[i] -= k; continue; }
          const d = steer(f, i, Tx, Ty, (1.6 + r[i] * 1.2) * f.sp, k, 0.05);
          if (d < 8) { if (onPlan) S.on++; else S.off++; spawnAtk(f, i, false); }
        }
      },
      draw(f, ctx, S, pa) {
        const W = f.W, H = f.H;
        ctx.strokeStyle = C.line; ctx.lineWidth = 1;
        ctx.strokeRect(W * 0.07, H * 0.42, W * 0.36, H * 0.16);
        if (!pa) { ctx.strokeStyle = C.dim; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(S.dx, S.dy, 10, 0, TAU); ctx.stroke(); ctx.setLineDash([]); }
        dots(f, ctx, 0.95, i => i < S.nPlan, 2.2, C.hi);
        dots(f, ctx, 0.7, i => i >= S.nPlan && f.s[i] <= 0);
      },
      hud: (f, S) => 'critique on the plan ' + S.on + ' · on the wrong thing ' + S.off,
    },
    Librarian: {
      // shelves on the left feed one synthesis on the right; one token in ten comes from a shelf that does not exist.
      enter(f, S) {
        S.nC = Math.round(f.N * 0.45); S.got = 0; S.fab = 0; S.rej = 0;
        const per = Math.ceil(S.nC / 5);
        for (let i = 0; i < f.N; i++) {
          if (i < S.nC) { const j = i % 5, u = Math.floor(i / 5) / per; f.k[i] = 3; f.x[i] = f.W * (0.06 + 0.42 * u); f.y[i] = f.H * (0.2 + 0.15 * j) - f.r[i] * f.H * 0.05; }
          else spawnRet(f, i, S, true);
        }
      },
      step(f, k, S, p, pa) {
        const W = f.W, H = f.H, Tx = W * 0.82, Ty = H * 0.5;
        S.check = pa && p.x > W * 0.56;
        for (let i = S.nC; i < f.N; i++) {
          if (f.s[i] > 0) { f.s[i] -= k; continue; }
          if (f.k[i] === 1 && S.check && f.x[i] > W * 0.6) {
            f.vy[i] += 0.22 * k; f.vx[i] *= 0.94; f.x[i] += f.vx[i] * k; f.y[i] += f.vy[i] * k;
            if (f.y[i] > H + 4) { S.rej++; spawnRet(f, i, S, false); }
            continue;
          }
          const d = steer(f, i, Tx, Ty, (1.7 + f.r[i]) * f.sp, k, 0.05);
          if (d < 6) { S.got++; if (f.k[i] === 1) S.fab++; spawnRet(f, i, S, false); }
        }
      },
      draw(f, ctx, S) {
        const W = f.W, H = f.H;
        ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.beginPath();
        for (let j = 0; j < 5; j++) { const y = H * (0.2 + 0.15 * j) + 3; ctx.moveTo(W * 0.05, y); ctx.lineTo(W * 0.5, y); }
        ctx.stroke();
        dots(f, ctx, 0.8, i => i < S.nC, 1.6);
        dots(f, ctx, 0.7, i => i >= S.nC && f.s[i] <= 0 && (f.k[i] === 0 || !S.check));
        if (S.check) {
          ctx.fillStyle = C.human; ctx.beginPath();
          for (let i = S.nC; i < f.N; i++) if (f.k[i] === 1 && f.s[i] <= 0) ctx.rect(f.x[i] - 1.5, f.y[i] - 1.5, 3, 3);
          ctx.fill();
        }
        ctx.strokeStyle = 'rgb(' + C.hi + ')'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(W * 0.82, H * 0.5, 9, 0, TAU); ctx.stroke();
      },
      hud: (f, S) => S.check ? 'checking citations · never said, dropped ' + S.rej : 'retrieved ' + S.got + ' · never said ' + S.fab + ' (unchecked)',
    },
    Interpreter: {
      // your material on the left; conclusions orbit on the right. Point to demand the trail: untraced ones show.
      enter(f, S) {
        const N = f.N; S.nM = Math.round(N * 0.5); S.nK = Math.min(36, Math.round(N * 0.08)); S.src = new Int32Array(N).fill(-1);
        const per = Math.ceil(S.nM / 8);
        for (let i = 0; i < N; i++) {
          if (i < S.nM) { const j = i % 8, u = Math.floor(i / 8) / per; f.k[i] = 3; f.x[i] = f.W * (0.06 + 0.34 * u); f.y[i] = f.H * (0.16 + j * 0.096); }
          else if (i < S.nM + S.nK) { f.k[i] = 2; const c = i - S.nM; if (c < S.nK - Math.round(S.nK / 6)) S.src[i] = (Math.random() * S.nM) | 0; }
          else { f.k[i] = 0; const j = (Math.random() * S.nM) | 0; f.x[i] = f.x[j]; f.y[i] = f.y[j]; f.s[i] = Math.random() * 90; }
        }
      },
      step(f, k, S, p, pa) {
        const W = f.W, H = f.H, cx = W * 0.76, cy = H * 0.5, R = Math.min(W * 0.17, H * 0.32), t = f.t;
        for (let i = S.nM; i < f.N; i++) {
          if (f.k[i] === 2) {
            const c = i - S.nM, a = c / S.nK * TAU + t * 0.00025, rr = R * (0.45 + 0.55 * f.r[i]);
            integ(f, i, (cx + Math.cos(a) * rr - f.x[i]) * 0.04, (cy + Math.sin(a) * rr - f.y[i]) * 0.04, 0.82, k); continue;
          }
          if (f.s[i] > 0) { f.s[i] -= k; continue; }
          const d = steer(f, i, cx, cy, (1.4 + f.r[i]) * f.sp, k, 0.05);
          if (d < R * 0.3) { const j = (Math.random() * S.nM) | 0; f.x[i] = f.x[j]; f.y[i] = f.y[j]; f.vx[i] = 0; f.vy[i] = 0; f.s[i] = Math.random() * 40; }
        }
      },
      draw(f, ctx, S, pa) {
        const { x, y } = f;
        dots(f, ctx, 0.85, i => i < S.nM, 1.5);
        dots(f, ctx, 0.45, i => f.k[i] === 0 && f.s[i] <= 0, 1.4);
        if (pa) {
          ctx.strokeStyle = C.ok; ctx.globalAlpha = 0.35; ctx.lineWidth = 1; ctx.beginPath();
          for (let i = S.nM; i < S.nM + S.nK; i++) { const j = S.src[i]; if (j >= 0) { ctx.moveTo(x[i], y[i]); ctx.lineTo(x[j], y[j]); } }
          ctx.stroke(); ctx.globalAlpha = 1;
          ctx.strokeStyle = C.human; ctx.lineWidth = 1.5; ctx.beginPath();
          for (let i = S.nM; i < S.nM + S.nK; i++) if (S.src[i] < 0) { ctx.moveTo(x[i] + 6, y[i]); ctx.arc(x[i], y[i], 6, 0, TAU); }
          ctx.stroke();
        }
        dots(f, ctx, 1, i => f.k[i] === 2, 3, C.hi);
      },
      hud: (f, S, pa) => {
        const u = Math.round(S.nK / 6);
        return pa ? 'evidence trail: traced ' + (S.nK - u) + ' · untraced ' + u + ' (rumours)' : 'conclusions ' + S.nK + ' · evidence trail not requested';
      },
    },
    Simulator: {
      // two parties rehearse. Without your counterpart it is a generic scene; with it, the real constraints appear.
      step(f, k, S, p, pa) {
        const W = f.W, H = f.H, t = f.t, a = t * 0.0006, R = Math.min(W, H) * 0.17;
        S.real = pa;
        const ax = W * 0.5 + Math.cos(a) * W * 0.17, ay = H * 0.5 + Math.sin(a) * H * 0.16;
        const bx = pa ? clamp(p.x, W * 0.1, W * 0.9) : W * 0.5 - Math.cos(a) * W * 0.17, by = pa ? clamp(p.y, H * 0.12, H * 0.88) : H * 0.5 - Math.sin(a) * H * 0.16;
        for (let i = 0; i < f.N; i++) {
          const cx = i & 1 ? bx : ax, cy = i & 1 ? by : ay, ri = f.r[i];
          const ang = ri * TAU * 7 + t * 0.0011 * (0.6 + ri) * (i & 1 ? -1 : 1), rr = R * (0.2 + 0.8 * ri);
          integ(f, i, (cx + Math.cos(ang) * rr - f.x[i]) * 0.03, (cy + Math.sin(ang) * rr - f.y[i]) * 0.03, 0.86, k);
        }
      },
      draw(f, ctx, S) {
        if (S.real) { ctx.strokeStyle = C.human; ctx.lineWidth = 1.2; ctx.setLineDash([5, 4]); ctx.strokeRect(f.W * 0.06, f.H * 0.08, f.W * 0.88, f.H * 0.84); ctx.setLineDash([]); }
        dots(f, ctx, 0.75, i => !(i & 1));
        dots(f, ctx, S.real ? 0.95 : 0.35, i => i & 1, S.real ? 2 : 1.7, S.real ? C.humanRgb : C.particle);
      },
      hud: (f, S) => S.real ? 'rehearsing yours: real counterpart, real constraints' : 'rehearsing a generic scenario (not yours)',
    },
    Scribe: {
      // rough material on the left becomes seven clean lines on the right; about one mark in five was never yours.
      enter(f, S) {
        S.rows = 7; S.per = Math.ceil(f.N / S.rows); S.t0 = f.t - (reduced ? 1e6 : 0); S.dur = 3600;
        for (let i = 0; i < f.N; i++) {
          f.k[i] = f.r[i] < 0.2 ? 1 : 0; f.s[i] = 0;
          f.x[i] = f.W * (0.04 + 0.38 * Math.random()); f.y[i] = f.H * (0.12 + 0.76 * Math.random()); f.vx[i] = 0; f.vy[i] = 0;
        }
      },
      step(f, k, S, p, pa) {
        const W = f.W, H = f.H, el = f.t - S.t0, N = f.N, x0 = W * 0.52, x1 = W * 0.95;
        S.review = pa && p.x > W * 0.48;
        let inv = 0;
        for (let i = 0; i < N; i++) {
          const row = Math.floor(i / S.per), col = i % S.per;
          const sx = x0 + (x1 - x0) * col / S.per, sy = H * (0.2 + row * 0.1);
          const start = (i / N) * S.dur;
          if (el < start) { if (f.k[i] === 0) integ(f, i, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05, 0.9, k); continue; }
          if (f.k[i] === 1) { if (!f.s[i]) { f.s[i] = 1; f.x[i] = sx; f.y[i] = sy; } inv++; }
          integ(f, i, (sx - f.x[i]) * 0.08, (sy - f.y[i]) * 0.08, 0.76, k);
        }
        S.inv = inv;
        if (!reduced && el > S.dur + 3400) B.Scribe.enter(f, S);
      },
      draw(f, ctx, S) {
        dots(f, ctx, 0.75, i => f.k[i] === 0 || (f.s[i] && !S.review));
        if (S.review) {
          ctx.strokeStyle = C.human; ctx.lineWidth = 1; ctx.beginPath();
          for (let i = 0; i < f.N; i++) if (f.k[i] === 1 && f.s[i]) ctx.rect(f.x[i] - 1, f.y[i] - 1, 3.2, 3.2);
          ctx.stroke();
        }
      },
      hud: (f, S) => S.review ? 'review: ' + S.inv + ' marks invented to fill gaps' : 'formatted ' + S.rows + ' lines · looks complete',
    },
    Translator: {
      // a lattice world on the left, a world of rings on the right, one bridge. Without its map, arrivals collapse.
      enter(f, S) {
        S.nA = Math.round(f.N * 0.3); const cols = 8, rows = Math.ceil(S.nA / cols);
        for (let i = 0; i < f.N; i++) {
          if (i < S.nA) { f.k[i] = 3; f.x[i] = f.W * (0.05 + 0.28 * ((i % cols) / (cols - 1))); f.y[i] = f.H * (0.14 + 0.72 * (Math.floor(i / cols) / Math.max(1, rows - 1))); }
          else spawnTr(f, i, S, true);
        }
      },
      step(f, k, S, p, pa) {
        const W = f.W, H = f.H, cy = H * 0.5, cx = W * 0.8, R = Math.min(W * 0.15, H * 0.38);
        S.mapped = pa && p.x > W * 0.55;
        for (let i = S.nA; i < f.N; i++) {
          if (f.s[i] < 0) { f.s[i] += k; continue; }
          const ring = i % 3, a = f.r[i] * TAU;
          const tx = S.mapped ? cx + Math.cos(a) * R * (0.35 + 0.325 * ring) : cx + Math.cos(a) * R * 0.16;
          const ty = S.mapped ? cy + Math.sin(a) * R * (0.35 + 0.325 * ring) : cy + Math.sin(a) * R * 0.16;
          const lane = (f.r[i] - 0.5) * H * 0.07;
          if (f.k[i] === 0) {
            let gx, gy;
            if (f.x[i] < W * 0.37) { gx = W * 0.4; gy = cy + lane; } else if (f.x[i] < W * 0.61) { gx = W * 0.64; gy = cy + lane; } else { gx = tx; gy = ty; }
            const d = steer(f, i, gx, gy, (1.6 + f.r[i]) * f.sp, k, 0.07);
            if (f.x[i] >= W * 0.61 && d < 3) { f.k[i] = 1; f.s[i] = 0; }
          } else {
            integ(f, i, (tx - f.x[i]) * 0.05, (ty - f.y[i]) * 0.05, 0.82, k);
            f.s[i] += k; if (f.s[i] > 160 + f.r[i] * 90) spawnTr(f, i, S, false);
          }
        }
      },
      draw(f, ctx, S) {
        const W = f.W, H = f.H, cy = H * 0.5, cx = W * 0.8, R = Math.min(W * 0.15, H * 0.38);
        ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.beginPath();
        ctx.moveTo(W * 0.37, cy - H * 0.06); ctx.lineTo(W * 0.62, cy - H * 0.06); ctx.moveTo(W * 0.37, cy + H * 0.06); ctx.lineTo(W * 0.62, cy + H * 0.06);
        ctx.stroke();
        ctx.setLineDash([2, 5]); ctx.beginPath();
        for (let ring = 0; ring < 3; ring++) { const rr = R * (0.35 + 0.325 * ring); ctx.moveTo(cx + rr, cy); ctx.arc(cx, cy, rr, 0, TAU); }
        ctx.stroke(); ctx.setLineDash([]);
        dots(f, ctx, 0.85, i => i < S.nA, 1.8);
        dots(f, ctx, 0.75, i => i >= S.nA && f.s[i] >= 0);
      },
      hud: (f, S) => S.mapped ? 'arrivals land in the other world, mapped' : 'arrivals land on a caricature of the other world',
    },
    Therapist: {
      // a slow, breathing space. One ring stays clear: what you decided in advance not to delegate.
      fade: 0.16,
      step(f, k, S, p, pa) {
        const W = f.W, H = f.H, t = f.t, cx = W * 0.44, cy = H * 0.5;
        const R0 = Math.min(W, H) * 0.4 * (1 + 0.12 * Math.sin(t * 0.0011));
        const zx = pa ? p.x : W * 0.74, zy = pa ? p.y : H * 0.34, rz = Math.min(W, H) * 0.14;
        S.zx = zx; S.zy = zy; S.rz = rz;
        for (let i = 0; i < f.N; i++) {
          const ri = f.r[i], ang = ri * TAU * 11 + t * 0.00016 * (0.5 + ri), want = R0 * (0.15 + 0.85 * Math.sqrt(ri));
          integ(f, i, (cx + Math.cos(ang) * want * 1.25 - f.x[i]) * 0.012, (cy + Math.sin(ang) * want - f.y[i]) * 0.012, 0.9, k);
          const ex = f.x[i] - zx, ey = f.y[i] - zy, e2 = ex * ex + ey * ey;
          if (e2 < (rz + 3) * (rz + 3)) { const e = Math.sqrt(e2) + 0.01; f.x[i] = zx + ex / e * (rz + 3); f.y[i] = zy + ey / e * (rz + 3); f.vx[i] *= 0.5; f.vy[i] *= 0.5; }
        }
      },
      draw(f, ctx, S) {
        dots(f, ctx, 0.6);
        ctx.strokeStyle = C.human; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.arc(S.zx, S.zy, S.rz, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
      },
      hud: () => 'thinking aloud · the reserved ring stays yours',
    },
  };
  function spawnAtk(f, i, stagger) {
    f.x[i] = stagger ? f.W * (0.55 + Math.random() * 0.45) : f.W + Math.random() * 20;
    f.y[i] = Math.random() * f.H; f.vx[i] = -1 - Math.random(); f.vy[i] = 0; f.k[i] = 0;
    f.s[i] = stagger ? 0 : Math.random() * 30;
  }
  function spawnRet(f, i, S, stagger) {
    f.vx[i] = 0; f.vy[i] = 0; f.s[i] = stagger ? Math.random() * 160 : Math.random() * 20;
    if (Math.random() < 0.1) { f.k[i] = 1; f.x[i] = f.W * (0.06 + 0.42 * Math.random()); f.y[i] = f.H * (0.2 + 0.15 * Math.floor(Math.random() * 4) + 0.075); }
    else { f.k[i] = 0; const j = (Math.random() * S.nC) | 0; f.x[i] = f.x[j]; f.y[i] = f.y[j]; }
  }
  function spawnTr(f, i, S, stagger) {
    const j = (Math.random() * S.nA) | 0;
    f.k[i] = 0; f.x[i] = f.x[j]; f.y[i] = f.y[j]; f.vx[i] = 0; f.vy[i] = 0; f.s[i] = -(stagger ? Math.random() * 220 : Math.random() * 30);
  }

  /* a stance field: one canvas running one of the fourteen behaviours (switchable) */
  function makeStanceField(canvas, host, opts) {
    const st = { mode: opts.mode, S: {}, entered: false };
    const hudEl = opts.hud || null;
    let hudLast = '';
    const enter = f => { st.S = {}; for (let i = 0; i < f.N; i++) { f.k[i] = 0; f.s[i] = 0; } const b = B[st.mode]; b.enter && b.enter(f, st.S); st.entered = true; };
    const writeHud = f => {
      if (!hudEl) return;
      const s = 'mode=' + st.mode.toLowerCase() + ' · ' + B[st.mode].hud(f, st.S, isPA(f));
      if (s !== hudLast) { hudEl.textContent = s; hudLast = s; }
    };
    const isPA = f => f.pointer.active && performance.now() - f.pointer.last < 2500;
    const f = makeField(canvas, host, {
      bgKey: opts.bgKey || 'bg2',
      count: opts.count,
      layout(f) { f.sc = clamp(Math.min(f.W, f.H) / 420, 0.4, 1); f.sp = clamp(f.W / 900, 0.55, 1); enter(f); },
      step(f, k) { if (!f.N) return; if (!st.entered) enter(f); B[st.mode].step(f, k, st.S, f.pointer, isPA(f)); if (f.frame % 12 === 0 || !f.running) writeHud(f); },
      draw(f, still) {
        const ctx = f.ctx;
        if (!still) { ctx.fillStyle = 'rgba(' + C[opts.bgKey || 'bg2'] + ',' + (B[st.mode].fade || 0.24) + ')'; ctx.fillRect(0, 0, f.W, f.H); }
        ctx.lineWidth = 1;
        B[st.mode].draw(f, ctx, st.S, isPA(f));
        drawHuman(f, ctx);
        if (still) writeHud(f);
      },
    });
    f.setMode = m => { st.mode = m; enter(f); f.clear(); if (reduced || !f.running) f.still(m === 'Executor' ? 260 : 180); };
    f.mode = () => st.mode;
    return f;
  }

  /* ================================================================== HOME: hero field + compass instrument */
  const hero = $('.hero[data-field="hero"]');
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
  let heroField = null;

  const axisSay = document.createElement('p');
  axisSay.className = 'sr-only'; axisSay.setAttribute('aria-live', 'polite');
  if (slot) slot.after(axisSay);
  let axisSaid = -1;
  function setAxis(i, focus) {
    if (!axisBtns.length) return;
    i = ((i % 4) + 4) % 4;
    if (i !== axisSaid && axisSaid !== -1) axisSay.textContent = 'Axis: ' + AXES[i].toLowerCase() + '. ' + (axisRows[i] ? $('.axis-q', axisRows[i]).textContent : '');
    axisSaid = i;
    axis = i;
    axisBtns.forEach((b, j) => { b.setAttribute('aria-checked', String(j === i)); b.tabIndex = j === i ? 0 : -1; });
    if (focus) axisBtns[i].focus();
    axisRows.forEach((r, j) => r.classList.toggle('is-active', j === i));
    if (axEl) axEl.textContent = AXES[i];
    if (!heroField || !heroField.pointer.active) { needleTarget = -Math.PI / 2 + i * Math.PI / 2; }
    if (reduced) { needle = needleTarget; writeDeg(); heroField && heroField.still(30); }
  }
  function writeDeg() {
    if (!degEl) return;
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
            fx += (-dy / d) * 0.085 * kk; fy += (dx / d) * 0.085 * kk;
            const rr = (d - R) / R;
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
    ctx.fillStyle = 'rgba(' + C.bg + ',0.78)';
    ctx.beginPath(); ctx.arc(0, 0, R * 0.62, 0, TAU); ctx.fill();
    ctx.strokeStyle = C.line; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(0, 0, R * 0.62, 0, TAU); ctx.stroke();
    ctx.strokeStyle = C.dim;
    for (let d = 0; d < 360; d += 5) {
      const a = d * Math.PI / 180 - Math.PI / 2, major = d % 90 === 0, mid = d % 30 === 0;
      const r0 = R + 6, r1 = R + (major ? 20 : mid ? 14 : 10);
      ctx.lineWidth = major ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); ctx.stroke();
    }
    const sa = -Math.PI / 2 + axis * Math.PI / 2;
    ctx.strokeStyle = C.human; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, R + 26, sa - Math.PI / 4 + 0.04, sa + Math.PI / 4 - 0.04); ctx.stroke();
    ctx.strokeStyle = C.line; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-R * 0.5, 0); ctx.lineTo(R * 0.5, 0); ctx.moveTo(0, -R * 0.5); ctx.lineTo(0, R * 0.5); ctx.stroke();
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

  /* ------------------------------------------------------------------ typed system log (home §2, matrix page) */
  function makeLog(el) {
    if (!el) return null;
    const live = document.createElement('p');
    live.className = 'sr-only'; live.setAttribute('aria-live', 'polite');
    el.removeAttribute('aria-live'); el.removeAttribute('role'); el.after(live);
    let timer = 0;
    return function write(lines, said) {
      live.textContent = said;
      clearTimeout(timer);
      el.innerHTML = '';
      const els = lines.map(([lv, txt, cls]) => {
        const p = document.createElement('p'); p.className = 'log-line' + (cls ? ' ' + cls : '');
        const l = document.createElement('span'); l.className = 'lv'; l.textContent = lv;
        const v = document.createElement('span'); v.textContent = reduced ? txt : '';
        p.append(l, v); el.append(p); return [p, v, txt];
      });
      if (reduced) return;
      let li = 0, ci = 0;
      const total = lines.reduce((a, l) => a + l[1].length, 0), per = Math.max(2, Math.ceil(total / 60));
      const tick = () => {
        if (li >= els.length) return;
        const [p, v, txt] = els[li];
        p.classList.add('typing');
        ci = Math.min(txt.length, ci + per);
        v.textContent = txt.slice(0, ci);
        if (ci >= txt.length) { p.classList.remove('typing'); li++; ci = 0; }
        timer = setTimeout(tick, 16);
      };
      tick();
    };
  }
  const stanceLines = (name, withField) => {
    const r = byName[name];
    const out = [['stance', r[6] || r[0], ''], ['expects', r[1], ''], ['load', layerLabel(r).toUpperCase(), '']];
    if (withField) out.push(['field', FIELD_NOTE[name], '']);
    out.push(['fail', r[3], 'warn'], ['guard', r[4], 'ok']);
    return out;
  };
  const stanceSaid = name => { const r = byName[name]; return (r[6] || r[0]) + '. Load-bearing layer: ' + layerLabel(r) + '. Failure: ' + r[3] + '. Guardrail: ' + r[4]; };

  /* ================================================================== HOME §2: the stance selector (all fourteen) */
  const stage = $('.stance-stage');
  const stageCanvas = $('#stance-canvas');
  let stanceField = null;
  if (stage && stageCanvas) {
    const hint = $('#stage-hint'), writeLog = makeLog($('#syslog'));
    const stanceBtns = $$('.stance-btn', $('.stance-picker'));
    stanceField = makeStanceField(stageCanvas, stage, { mode: 'Oracle', hud: $('#stage-hud'), count: W => (W < 640 ? 480 : 950) });
    const setMode = (name, focus) => {
      if (!byName[name]) return;
      stanceBtns.forEach(b => { const on = b.dataset.stance === name; b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
      if (hint) hint.textContent = HINT[name];
      writeLog && writeLog(stanceLines(name, true), stanceSaid(name));
      if (stanceField.N) stanceField.setMode(name);
    };
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
    setMode('Oracle');
  }

  /* ================================================================== CIRCUIT: stance → layer wiring (home §3 and matrix page) */
  const NS = 'http://www.w3.org/2000/svg';
  const svgEl = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
  function initCircuit(circuit, opts = {}) {
    const svg = $('.wires', circuit);
    const sNodes = $$('.s-node', circuit), lNodes = $$('.l-node', circuit);
    const lIndex = Object.fromEntries(LAYERS.map((l, i) => [l, i]));
    let wires = [], pulses = [], pulseRaf = 0, activeS = -1, activeL = null;
    let userPicked = false, asmTimers = [], visible = false, pulseUntil = 0;
    function layout() {
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
          const path = svgEl('path', { d: 'M' + x1 + ' ' + y1 + 'H' + x2 });
          svg.append(path, svgEl('circle', { cx: x2 + 4, cy: y1, r: 3.5, class: 'pad' }));
          const tx = svgEl('text', { x: x2 + 12, y: y1 + 3.5, class: 'stub-label' }); tx.textContent = 'no load';
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
          const path = svgEl('path', { d });
          svg.append(path);
          wires.push({ s: i, l: L, path, len: path.getTotalLength() });
        });
        svg.append(svgEl('circle', { cx: x1, cy: y1, r: 2.5, class: 'pad', 'data-s': i }));
      });
      LAYERS.forEach(L => { if (!lPos[L]) return; const [x2, y2] = lPos[L]; svg.append(svgEl('circle', { cx: x2, cy: y2, r: 2.5, class: 'pad', 'data-l': L })); });
      apply();
    }
    function apply() {
      const hotS = new Set(), hotL = new Set();
      if (activeS >= 0) { hotS.add(activeS); MATRIX[activeS][2].forEach(l => hotL.add(l)); }
      if (activeL) { hotL.add(activeL); MATRIX.forEach((r, i) => { if (r[2].includes(activeL)) hotS.add(i); }); }
      wires.forEach(w => w.path.classList.toggle('hot', !!((activeS >= 0 && w.s === activeS) || (activeL && w.l === activeL))));
      $$('.pad', svg).forEach(c => c.classList.toggle('hot', !!((c.dataset.s !== undefined && hotS.has(+c.dataset.s)) || (c.dataset.l && hotL.has(c.dataset.l)))));
      sNodes.forEach(n => { const i = +n.dataset.i; n.classList.toggle('on', i === activeS); n.classList.toggle('lit', hotS.has(i) && i !== activeS); n.setAttribute('aria-pressed', String(i === activeS)); });
      lNodes.forEach(n => { n.classList.toggle('lit', hotL.has(n.dataset.l)); n.classList.toggle('on', n.dataset.l === activeL); n.setAttribute('aria-pressed', String(n.dataset.l === activeL)); });
      circuit.classList.toggle('dim-others', activeS >= 0 || !!activeL);
    }
    // pulses run only while the circuit is on screen, the tab is visible, and for three cycles after the last
    // interaction (or while it is hovered or focused); after that the hot wires stay lit and the loop stops.
    const engaged = () => circuit.matches(':hover') || circuit.contains(document.activeElement);
    function runPulses(touch) {
      if (touch) pulseUntil = performance.now() + 4500;
      cancelAnimationFrame(pulseRaf); pulseRaf = 0;
      $$('.pulse', svg).forEach(p => p.remove());
      if (reduced || !visible || document.hidden) return;
      const hot = wires.filter(w => w.path.classList.contains('hot') && w.l);
      pulses = hot.map(w => { const c = svgEl('circle', { r: 3.5, class: 'pulse' }); svg.append(c); return { w, c }; });
      const t0 = performance.now();
      const go = now => {
        const u = ((now - t0) % 1500) / 900;
        pulses.forEach(({ w, c }) => {
          if (u > 1) { c.setAttribute('opacity', '0'); return; }
          const e = 1 - Math.pow(1 - u, 3), pt = w.path.getPointAtLength(e * w.len);
          c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1)); c.setAttribute('opacity', '1');
        });
        if (!visible || document.hidden) { pulseRaf = 0; return; }
        if (now > pulseUntil && !engaged()) { pulses.forEach(({ c }) => c.remove()); pulses = []; pulseRaf = 0; return; }
        if (pulses.length) pulseRaf = requestAnimationFrame(go);
      };
      if (pulses.length) pulseRaf = requestAnimationFrame(go);
    }
    function endAssembly() {
      asmTimers.forEach(clearTimeout); asmTimers = [];
      wires.forEach(w => { w.path.style.strokeDasharray = ''; w.path.style.strokeDashoffset = ''; w.path.style.transition = ''; });
    }
    function rove(list, el) { list.forEach(n => { n.tabIndex = n === el ? 0 : -1; }); }
    function stance(i, how) {
      if (how !== 'init' && how !== 'asm') { if (!userPicked) { userPicked = true; endAssembly(); } }
      activeS = i; activeL = null; apply(); runPulses(true);
      const n = sNodes.find(s => +s.dataset.i === i); if (n) rove(sNodes, n);
      opts.onStance && opts.onStance(MATRIX[i], how);
    }
    function layer(L, how) {
      if (!userPicked) { userPicked = true; endAssembly(); }
      activeL = L; activeS = -1; apply(); runPulses(true);
      const n = lNodes.find(x => x.dataset.l === L); if (n) rove(lNodes, n);
      opts.onLayer && opts.onLayer(L, MATRIX.filter(r => r[2].includes(L)), how);
    }
    rove(sNodes, sNodes.find(s => s.dataset.i === '0') || sNodes[0]); rove(lNodes, lNodes[0]);
    document.addEventListener('visibilitychange', () => runPulses(false));
    sNodes.forEach(n => {
      const i = +n.dataset.i;
      n.addEventListener('pointerenter', () => stance(i, 'hover'));
      n.addEventListener('focus', () => stance(i, 'focus'));
      n.addEventListener('click', () => stance(i, 'click'));
    });
    lNodes.forEach(n => {
      const L = n.dataset.l;
      n.addEventListener('pointerenter', () => layer(L, 'hover'));
      n.addEventListener('focus', () => layer(L, 'focus'));
      n.addEventListener('click', () => layer(L, 'click'));
    });
    circuit.addEventListener('keydown', e => {
      const t = e.target; if (!t.classList || !t.classList.contains('node')) return;
      const list = t.classList.contains('s-node') ? sNodes : lNodes, j = list.indexOf(t);
      if (e.key === 'ArrowDown') { e.preventDefault(); list[(j + 1) % list.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); list[(j - 1 + list.length) % list.length].focus(); }
      else if (e.key === 'ArrowRight' && list === sNodes) { e.preventDefault(); const L = MATRIX[+t.dataset.i][2][0]; if (L) lNodes[lIndex[L]].focus(); }
      else if (e.key === 'ArrowLeft' && list === lNodes) { e.preventDefault(); const L = LAYERS[j], si = MATRIX.findIndex(r => r[2].includes(L)); const n = sNodes.find(s => +s.dataset.i === si); if (n) n.focus(); }
    });
    new ResizeObserver(() => layout()).observe(circuit);
    // assembly: each wire draws in turn (decorative, ~1.8 s). A user's pick at any moment ends it and is kept.
    let assembled = false;
    new IntersectionObserver(es => {
      visible = es.some(e => e.isIntersecting);
      if (visible && !assembled) {
        assembled = true;
        if (reduced || userPicked) { if (!userPicked) stance(0, 'init'); return; }
        const ws = wires.slice();
        ws.forEach(w => { w.path.style.strokeDasharray = w.len; w.path.style.strokeDashoffset = w.len; });
        ws.forEach((w, j) => asmTimers.push(setTimeout(() => {
          if (userPicked) return;
          w.path.style.transition = 'stroke-dashoffset .5s cubic-bezier(.3,.7,.2,1)';
          w.path.style.strokeDashoffset = '0';
          activeS = w.s; activeL = null; apply();
        }, 80 + j * 72)));
        asmTimers.push(setTimeout(() => { endAssembly(); if (!userPicked) stance(0, 'init'); }, 80 + ws.length * 72 + 520));
        return;
      }
      runPulses(false);
    }, { threshold: 0 }).observe(circuit);
    circuit.addEventListener('pointerenter', () => runPulses(true));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    return { layout };
  }
  const homeCircuit = $('#circuit');
  if (homeCircuit) {
    const crS = $('#cr-stance'), crL = $('#cr-layer'), crE = $('#cr-expect'), crF = $('#cr-fail'), crG = $('#cr-guard');
    initCircuit(homeCircuit, {
      onStance(r) { crS.textContent = r[6] || r[0]; crL.textContent = layerLabel(r); crE.textContent = r[1]; crF.textContent = r[3]; crG.textContent = r[4]; },
      onLayer(L, rows) { crS.textContent = rows.map(r => r[0]).join(', '); crL.textContent = L; },
    });
  }
  const mxCircuit = $('#mx-circuit');
  if (mxCircuit) {
    const writeLog = makeLog($('#mx-log'));
    const path = $('#mx-path');
    initCircuit(mxCircuit, {
      onStance(r, how) {
        if (path) path.textContent = (r[6] || r[0]) + ' —load→ ' + layerLabel(r);
        if (how === 'click' || how === 'init') writeLog(stanceLines(r[0], false), stanceSaid(r[0]));
      },
      onLayer(L, rows, how) {
        if (path) path.textContent = (rows.map(r => r[0]).join(', ') || 'none') + ' —load→ ' + L;
        if (how === 'click') writeLog([['layer', L + ' (' + LAYER_Q[L] + ')', ''], ['carries', rows.map(r => r[6] || r[0]).join(', '), ''], ['check', 'When one of these stances goes wrong, check ' + L + ' first.', 'ok']], L + ' carries ' + rows.map(r => r[0]).join(', '));
      },
    });
  }

  /* ================================================================== STANCES PAGE: fourteen live cards + filters */
  const cardStages = $$('.sc-stage[data-stance]');
  cardStages.forEach(st => {
    const cv = $('canvas', st);
    if (!cv || !B[st.dataset.stance]) return;
    makeStanceField(cv, st, { mode: st.dataset.stance, hud: $('.sc-hud', st), count: (W, H) => Math.round(clamp(W * H / 300, 140, 420)) });
  });
  const grid = $('#stance-grid');
  if (grid) {
    const cards = $$('.stance-card', grid), status = $('#stance-status'), empty = $('#stance-empty');
    const sel = { layer: 'all', meta: 'all' };
    const label = (g, v) => { const b = $('.chip[data-filter="' + g + '"][data-value="' + v + '"]'); return b ? b.textContent : v; };
    const apply = () => {
      let n = 0;
      cards.forEach(c => {
        const okL = sel.layer === 'all' || c.dataset.layers.split(' ').includes(sel.layer);
        const okM = sel.meta === 'all' || c.dataset.meta.split(' ').includes(sel.meta);
        c.hidden = !(okL && okM); if (!c.hidden) n++;
      });
      if (empty) empty.hidden = n !== 0;
      const parts = [];
      if (sel.layer !== 'all') parts.push('layer: ' + label('layer', sel.layer));
      if (sel.meta !== 'all') parts.push(label('meta', sel.meta));
      status.textContent = n === 14 && !parts.length ? 'Showing all 14 stances.' : 'Showing ' + n + ' of 14 stances' + (parts.length ? ' (' + parts.join('; ') + ')' : '') + '.';
    };
    $$('.chip[data-filter]').forEach(b => b.addEventListener('click', () => {
      const g = b.dataset.filter;
      sel[g] = b.dataset.value;
      $$('.chip[data-filter="' + g + '"]').forEach(o => o.setAttribute('aria-pressed', String(o === b)));
      apply();
    }));
  }

  /* ================================================================== STACK PAGE: system diagram, binding constraint, loop */
  const sd = $('#stackdiag');
  if (sd) {
    const order = ['prompt', 'context', 'intent', 'judgment', 'coherence'];
    const nodes = Object.fromEntries($$('.sd-node', sd).map(n => [n.dataset.l, n]));
    const out = $('#sd-readout');
    const weak = new Set();
    const wsvg = $('.sd-wires', sd);
    let spine = [], evalW = [], pulseRaf = 0;
    const NAME = { prompt: 'Prompt', context: 'Context', intent: 'Intent', judgment: 'Judgment', coherence: 'Coherence', evaluation: 'Evaluation', harness: 'Harness' };
    Object.entries(nodes).forEach(([l, n]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'sd-toggle sys'; b.setAttribute('aria-pressed', 'false');
      b.textContent = 'mark weak'; b.setAttribute('aria-label', 'Mark ' + NAME[l] + ' weak');
      b.addEventListener('click', () => { if (weak.has(l)) weak.delete(l); else weak.add(l); render(); });
      $('.sd-ctl', n).append(b);
    });
    const reset = $('#sd-reset');
    if (reset) { reset.hidden = false; reset.addEventListener('click', () => { weak.clear(); render(); }); }
    function layout() {
      const r0 = sd.getBoundingClientRect();
      wsvg.setAttribute('viewBox', '0 0 ' + r0.width + ' ' + r0.height); wsvg.innerHTML = '';
      const box = n => { const r = n.getBoundingClientRect(); return { l: r.left - r0.left, r: r.right - r0.left, t: r.top - r0.top, b: r.bottom - r0.top, cx: r.left - r0.left + r.width / 2, cy: r.top - r0.top + r.height / 2 }; };
      const h = box(nodes.harness), e = box($('.sd-evalbar', sd));
      spine = []; evalW = [];
      // dependency spine: harness → prompt → context → intent → judgment → coherence (each rests on the one below)
      let prev = { x: box(nodes.prompt).l + 22, y: h.t };
      order.forEach(l => {
        const b = box(nodes[l]);
        const p = svgEl('path', { d: 'M' + prev.x + ' ' + prev.y + 'V' + b.b, class: 'sp', 'data-l': l });
        wsvg.append(p); spine.push({ l, p, len: p.getTotalLength() });
        prev = { x: b.l + 22, y: b.t };
        const w = svgEl('path', { d: 'M' + b.r + ' ' + b.cy + 'H' + e.l, class: 'ev', 'data-l': l });
        wsvg.append(w); evalW.push({ l, p: w, len: w.getTotalLength() });
        wsvg.append(svgEl('circle', { cx: b.r, cy: b.cy, r: 2.5, class: 'pad' }), svgEl('circle', { cx: e.l, cy: b.cy, r: 2.5, class: 'pad' }));
      });
      render();
    }
    function render() {
      const lowest = order.find(l => weak.has(l));
      const li = lowest ? order.indexOf(lowest) : 99;
      order.forEach((l, i) => {
        const n = nodes[l];
        const state = weak.has(l) ? 'weak' : i > li ? 'starved' : 'ok';
        n.dataset.state = state;
        n.classList.toggle('is-binding', l === lowest);
        $('.sd-state', n).textContent = weak.has('evaluation') ? 'state: unobserved' : state === 'weak' ? 'state: weak' : state === 'starved' ? 'state: capped by ' + NAME[lowest] : 'state: ok';
        const b = $('.sd-toggle', n); if (b) { b.setAttribute('aria-pressed', String(weak.has(l))); b.textContent = weak.has(l) ? 'mark strong' : 'mark weak'; }
      });
      ['evaluation', 'harness'].forEach(l => {
        const n = nodes[l]; n.dataset.state = weak.has(l) ? 'weak' : 'ok';
        $('.sd-state', n).textContent = weak.has(l) ? 'state: weak' : 'state: ok';
        const b = $('.sd-toggle', n); if (b) { b.setAttribute('aria-pressed', String(weak.has(l))); b.textContent = weak.has(l) ? 'mark strong' : 'mark weak'; }
      });
      sd.classList.toggle('harness-weak', weak.has('harness'));
      sd.classList.toggle('eval-weak', weak.has('evaluation'));
      spine.forEach(s => s.p.classList.toggle('cut', order.indexOf(s.l) > li));
      const lines = [];
      if (lowest) {
        const above = order.slice(li + 1).map(l => NAME[l]);
        lines.push('binding constraint: ' + NAME[lowest] + ' (the lowest weak layer)');
        if (above.length) lines.push('above it, ' + above.join(', ') + ': improving these first produces diminishing returns');
        else lines.push('nothing sits above it: fix ' + NAME[lowest] + ' directly');
      } else lines.push('binding constraint: none marked. Mark a layer weak to find it.');
      if (weak.has('evaluation')) lines.push('evaluation weak: the layers still function; you just cannot see whether they are functioning well');
      if (weak.has('harness')) lines.push('harness weak: capability mismatch, the platform constrains what the cognitive layers could do');
      out.textContent = lines.join('\n');
      runPulses();
    }
    function runPulses() {
      cancelAnimationFrame(pulseRaf);
      $$('.pulse', wsvg).forEach(p => p.remove());
      if (reduced) return;
      const live = spine.filter(s => !s.p.classList.contains('cut'));
      const dots2 = live.map(() => { const c = svgEl('circle', { r: 3, class: 'pulse' }); wsvg.append(c); return c; });
      const evDots = weak.has('evaluation') ? [] : evalW.map(() => { const c = svgEl('circle', { r: 2.5, class: 'pulse ev-pulse' }); wsvg.append(c); return c; });
      const t0 = performance.now();
      const go = now => {
        const el = (now - t0) / 1000;
        // the pulse climbs the spine segment by segment, then stops where the dependency is cut
        const seg = (el * 2.2) % (live.length + 1.2);
        live.forEach((s, i) => {
          const u = seg - i, c = dots2[i];
          if (u < 0 || u > 1) { c.setAttribute('opacity', '0'); return; }
          const pt = s.p.getPointAtLength(u * s.len); c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1)); c.setAttribute('opacity', '1');
        });
        evalW.forEach((w, i) => {
          const c = evDots[i]; if (!c) return;
          const u = ((el * 0.6 + i * 0.17) % 1), pt = w.p.getPointAtLength((1 - u) * w.len);
          c.setAttribute('cx', pt.x.toFixed(1)); c.setAttribute('cy', pt.y.toFixed(1));
        });
        if (document.hidden || !sdVisible) { pulseRaf = 0; return; }
        pulseRaf = requestAnimationFrame(go);
      };
      if (sdVisible && !document.hidden) pulseRaf = requestAnimationFrame(go);
    }
    let sdVisible = false;
    new IntersectionObserver(es => { sdVisible = es[0].isIntersecting; runPulses(); }).observe(sd);
    document.addEventListener('visibilitychange', () => runPulses());
    new ResizeObserver(layout).observe(sd);
  }

  /* ================================================================== LEARN PAGE: the altimeter */
  const alt = $('#altimeter');
  if (alt) {
    const readout = $('#alt-readout'), levels = $$('.level[data-alt]');
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { const v = e.target.dataset.alt; readout.textContent = v; levels.forEach(l => l.classList.toggle('is-here', l === e.target)); alt.style.setProperty('--alt', String((+v - 101) / 500)); } });
    }, { rootMargin: '-45% 0px -45% 0px' });
    levels.forEach(l => io.observe(l));
  }

  /* ================================================================== ESSAY: the thin reading strip */
  const strip = $('#read-strip');
  if (strip) {
    const cv = $('canvas', strip);
    const article = $('#essay'), hdr = $('.site-header');
    const pin = () => { if (hdr) strip.style.top = hdr.offsetHeight + 'px'; };
    pin(); addEventListener('resize', pin); if (document.fonts && document.fonts.ready) document.fonts.ready.then(pin);
    let prog = 0;
    const measure = () => { const r = article.getBoundingClientRect(); prog = clamp((-r.top + innerHeight * 0.4) / Math.max(1, r.height), 0, 1); };
    let lastAct = performance.now();
    const sf = makeField(cv, strip, {
      bgKey: 'bg',
      active: () => performance.now() - lastAct < 1500,
      count: W => Math.round(clamp(W / 3, 120, 420)),
      step(f, k) {
        measure();
        const { x, y, N, r } = f, W = f.W, H = f.H, px = prog * W, t = f.t;
        for (let i = 0; i < N; i++) {
          if (x[i] < px) { // read: tokens settle into one calm line
            integ(f, i, (W * (i / N) * prog - x[i]) * 0.004, (H * 0.5 - y[i]) * 0.04, 0.86, k);
          } else { // unread: the field still drifts
            const a = flow(x[i] * 3, y[i] * 3, t);
            integ(f, i, Math.cos(a) * 0.05, Math.sin(a) * 0.05 + (H * 0.5 - y[i]) * 0.002, 0.95, k);
            if (x[i] > W) x[i] -= W - px; if (y[i] < 2) y[i] = 2; if (y[i] > H - 2) y[i] = H - 2;
          }
          if (x[i] < 0) x[i] = 0;
        }
        f.px = px;
      },
      draw(f, still) {
        const ctx = f.ctx;
        if (!still) { ctx.fillStyle = 'rgba(' + C.bg + ',0.3)'; ctx.fillRect(0, 0, f.W, f.H); }
        dots(f, ctx, 0.75);
        ctx.fillStyle = C.human; ctx.fillRect(Math.max(0, (f.px || 0) - 1), 4, 2, f.H - 8);
        drawHuman(f, ctx);
      },
    });
    const wake = () => { lastAct = performance.now(); sf.update(); };
    addEventListener('scroll', wake, { passive: true }); strip.addEventListener('pointermove', wake, { passive: true });
    if (reduced) { let q = false; addEventListener('scroll', () => { if (q) return; q = true; requestAnimationFrame(() => { q = false; sf.still(20); }); }, { passive: true }); }
  }

  /* ================================================================== NAV: keep the current page's link in view on phones */
  const nav = $('.site-nav'), cur = $('.site-nav a[aria-current="page"]');
  if (nav) {
    const edges = () => { const over = nav.scrollWidth > nav.clientWidth + 2; nav.classList.toggle('fade-r', over && nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 4); nav.classList.toggle('fade-l', over && nav.scrollLeft > 4); };
    if (cur && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = cur.offsetLeft - 16;
    nav.addEventListener('scroll', edges, { passive: true }); addEventListener('resize', edges); edges();
  }

  /* ================================================================== FOOTER: live line under the static build log */
  const tick = $('#ticker-lines');
  if (tick) {
    const liveLine = document.createElement('li'); liveLine.className = 'info'; liveLine.setAttribute('aria-hidden', 'true'); tick.append(liveLine);
    const upd = () => {
      const running = fields.filter(f => f.running);
      const fps = running.map(f => f.fps).filter(Boolean);
      liveLine.textContent = 'live: ' + fields.length + ' field' + (fields.length === 1 ? '' : 's') + ' on this page, ' + (reduced ? 'static frames (reduced motion)' : running.length + ' running' + (fps.length ? ' at ' + Math.min(...fps) + ' fps' : '') + ', the rest paused off-screen');
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
    const c = root.getAttribute('data-theme') || 'auto', next = themeOrder[(themeOrder.indexOf(c) + 1) % 3];
    applyTheme(next); store.set('fieldTheme', next);
  });

  setAxis(0);
  needle = needleTarget; writeDeg();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fields.forEach(f => f.resize()); });

  // QA hook (read-only): lets the test harness confirm the systems are alive
  window.__field = {
    get count() { return fields.length; },
    get running() { return fields.filter(f => f.running).length; },
    get hero() { return heroField && { N: heroField.N, running: heroField.running, fps: heroField.fps }; },
    get stance() { return stanceField && { N: stanceField.N, running: stanceField.running, mode: stanceField.mode() }; },
    get axis() { return AXES[axis]; },
    modes: Object.keys(B),
  };
})();
