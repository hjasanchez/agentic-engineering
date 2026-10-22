/* Direction B: Kinetic Editorial. Progressive enhancement only: the page is complete without this file. */
(() => {
  'use strict';

  /* BRAND PLACEHOLDER: the name is undecided. Change BRAND here AND --brand in assets/css/style.css. */
  const BRAND = 'Mode Fluency';

  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  root.classList.add('js');

  document.title = `${BRAND}: know which mode you're in`;
  const wm = $('.wordmark');
  if (wm) wm.setAttribute('aria-label', `${BRAND}, back to top`);

  /* ---------- Motion preference ---------- */
  const mqRM = matchMedia('(prefers-reduced-motion: reduce)');
  let RM = mqRM.matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cssScrollTimeline = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()'));

  /* ---------- Theme (per-viewer convenience only) ---------- */
  const themeBtn = $('.theme-btn');
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };
  const mqDark = matchMedia('(prefers-color-scheme: dark)');
  const effectiveTheme = () => root.dataset.theme || (mqDark.matches ? 'dark' : 'light');
  function paintThemeBtn() {
    if (!themeBtn) return;
    const dark = effectiveTheme() === 'dark';
    $('.theme-label', themeBtn).innerHTML = dark ? 'Day<span class="theme-long"> edition</span>' : 'Night<span class="theme-long"> edition</span>';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to the day edition (light theme)' : 'Switch to the night edition (dark theme)');
  }
  const saved = store.get('mf-theme');
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  paintThemeBtn();
  themeBtn && themeBtn.addEventListener('click', () => {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    const swap = () => { root.dataset.theme = next; paintThemeBtn(); };
    if (document.startViewTransition && !RM) document.startViewTransition(swap); else swap();
    store.set('mf-theme', next);
  });
  mqDark.addEventListener && mqDark.addEventListener('change', paintThemeBtn);

  /* ---------- Menu ---------- */
  const menuBtn = $('.menu-btn'), nav = $('#site-nav');
  menuBtn && menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus();
    }
  });

  /* ---------- Running head + sticky contents ---------- */
  const secs = $$('main .sec');
  const tocLinks = $$('.toc a');
  const rhNum = $('.runhead-num'), rhTitle = $('.runhead-title');
  function setCurrent(sec) {
    if (!sec) return;
    rhNum.textContent = sec.dataset.num; rhTitle.textContent = sec.dataset.title;
    tocLinks.forEach(a => {
      const on = a.dataset.sec === sec.id;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) setCurrent(en.target); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    secs.forEach(s => io.observe(s));
  }

  /* ---------- Hero: split letters, ink-in entrance, pointer-aware weight ---------- */
  const hero = $('.hero');
  const chars = [];
  let ci = 0;
  $$('.ht .w').forEach(w => {
    const txt = w.textContent; w.textContent = '';
    for (const c of txt) {
      const s = document.createElement('span');
      s.className = 'ch'; s.textContent = c; s.style.setProperty('--ci', ci++);
      w.appendChild(s); chars.push(s);
    }
  });
  let ptr = null, heroRaf = 0;
  const compassEl = $('.hero-compass');
  function heroPointerFrame() {
    heroRaf = 0;
    if (!ptr) return;
    const rects = chars.map(c => c.getBoundingClientRect()); // read all, then write
    rects.forEach((r, i) => {
      const dx = ptr.x - (r.left + r.width / 2), dy = ptr.y - (r.top + r.height / 2);
      const n = clamp(1 - Math.hypot(dx, dy * 1.4) / 200, 0, 1);
      const v = Math.round(n * n * 100) / 100;
      if (chars[i]._n !== v) { chars[i]._n = v; chars[i].style.setProperty('--near', v); }
    });
    if (compassEl) {
      const cr = compassEl.getBoundingClientRect();
      const ang = Math.atan2(ptr.x - (cr.left + cr.width / 2), -(ptr.y - (cr.top + cr.height / 2))) * 180 / Math.PI;
      hero.style.setProperty('--pa', (clamp(ang, -120, 120) * 0.12).toFixed(1) + 'deg');
    }
  }
  if (finePointer && hero) {
    hero.addEventListener('pointermove', (e) => {
      if (RM) return;
      ptr = { x: e.clientX, y: e.clientY };
      if (!heroRaf) heroRaf = requestAnimationFrame(heroPointerFrame);
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      ptr = null;
      chars.forEach(c => { c._n = 0; c.style.setProperty('--near', 0); });
      hero.style.setProperty('--pa', '0deg');
    });
  }

  /* ---------- §1 Instrument: four axes ---------- */
  const AXES = {
    stance: { label: 'Stance', modes: [
      ['Oracle', 'Truth to a hard question.'], ['Genie', 'A discrete deliverable.'], ['Tutor', 'A path to the answer.'],
      ['Mirror', 'My own thinking, clarified.'], ['Adversary', 'Attack on my plan.'], ['Librarian', 'Synthesis of what is known.'],
      ['Interpreter', 'Decode material I supply.'], ['Simulator', 'A rehearsal of reality.'], ['Scribe', 'Craft applied to my substance.'],
      ['Executor', 'A delegated job, reviewed after.'], ['Muse', 'Provocation, not correctness.'], ['Miner', 'The shape of a space, not one answer.'],
      ['Therapist', 'A space to think aloud.'], ['Translator', 'A bridge between two worlds.']] },
    structure: { label: 'Structure', modes: [
      ['Prompt', 'What to do.'], ['Context', 'What to know.'], ['Intent', 'What to want.'], ['Judgment', 'What to doubt.'],
      ['Coherence', 'What to become.'], ['Evaluation', 'How to know. A meta-function across every layer.'],
      ['Harness', 'Where and how to do. A meta-function across every layer.']] },
    autonomy: { label: 'Autonomy', modes: [
      ['Assistive', 'You type, AI suggests.'], ['Directed', 'You describe, AI types, you review.'],
      ['Autonomous', 'You assign, AI executes, you review.'], ['Continuous', 'AI runs as a background service.']] },
    ambition: { label: 'Ambition', modes: [
      ['Speed', 'The same work in less time.'], ['Altitude', 'Up in abstraction: the outcome rather than the individual task.'],
      ['Depth', 'The task the way a field-leading expert would approach it.'],
      ['Range', 'Drawing on more fields than the task needs at the surface.']] }
  };
  const ORDER = ['stance', 'structure', 'autonomy', 'ambition'];
  const inst = { axis: 'stance', sel: { stance: 0, structure: 3, autonomy: 1, ambition: 2 }, cur: 0, target: 0, dragging: false };
  const dial = $('.dial'), dsvg = $('.dial-svg');
  const NS = 'http://www.w3.org/2000/svg';
  const R = 150;
  const mk = (tag, attrs, parent) => { const el = document.createElementNS(NS, tag); for (const k in attrs) el.setAttribute(k, attrs[k]); parent && parent.appendChild(el); return el; };
  let needleG = null, sweep = null, marks = [], labels = [];
  const angOf = (i, n) => i * 360 / n;

  function drawDial() {
    if (!dsvg) return;
    dsvg.setAttribute('viewBox', '-262 -262 524 524');
    dsvg.textContent = '';
    const n = AXES[inst.axis].modes.length;
    mk('circle', { r: R, class: 'd-ring' }, dsvg);
    mk('circle', { r: R - 34, class: 'd-ring2' }, dsvg);
    mk('circle', { r: 46, class: 'd-ring2' }, dsvg);
    const ticks = mk('g', {}, dsvg);
    for (let d = 0; d < 360; d += 6) {
      const a = d * Math.PI / 180, r2 = d % 30 === 0 ? R - 9 : R - 5;
      mk('line', { x1: R * Math.sin(a), y1: -R * Math.cos(a), x2: r2 * Math.sin(a), y2: -r2 * Math.cos(a), class: 'd-tick' }, ticks);
    }
    marks = []; labels = [];
    const radial = n > 7;
    AXES[inst.axis].modes.forEach((m, i) => {
      const deg = angOf(i, n), a = deg * Math.PI / 180, sx = Math.sin(a), cy = -Math.cos(a);
      marks.push(mk('line', { x1: (R - 14) * sx, y1: (R - 14) * cy, x2: (R + 8) * sx, y2: (R + 8) * cy, class: 'd-mark' }, dsvg));
      let t;
      if (radial) {
        const left = deg > 180;
        t = mk('text', { class: 'd-lab', 'dominant-baseline': 'central', 'text-anchor': left ? 'end' : 'start',
          transform: left ? `rotate(${deg + 90}) translate(${-(R + 16)} 0)` : `rotate(${deg - 90}) translate(${R + 16} 0)` }, dsvg);
      } else {
        const rr = R + 22;
        const anchor = sx > 0.3 ? 'start' : sx < -0.3 ? 'end' : 'middle';
        t = mk('text', { class: 'd-lab', x: rr * sx, y: rr * cy + (cy > 0.3 ? 12 : cy < -0.3 ? -2 : 5), 'text-anchor': anchor }, dsvg);
      }
      t.textContent = m[0];
      labels.push(t);
    });
    sweep = mk('circle', { r: R - 34, class: 'd-sweep', pathLength: 360, transform: 'rotate(-90)' }, dsvg);
    needleG = mk('g', {}, dsvg);
    mk('line', { x1: 0, y1: 26, x2: 0, y2: -(R - 22), class: 'd-needle' }, needleG);
    mk('path', { d: `M0 ${-(R - 8)} L6 ${-(R - 26)} L-6 ${-(R - 26)} Z`, class: 'd-needle-tip' }, needleG);
    mk('circle', { r: 5, class: 'd-hub' }, needleG);
  }
  function article(w) { return /^[AEIOU]/.test(w) ? 'an' : 'a'; }
  function renderInstrument(flashAxis) {
    const ax = AXES[inst.axis], i = inst.sel[inst.axis], n = ax.modes.length, m = ax.modes[i];
    marks.forEach((el, k) => el.classList.toggle('on', k === i));
    labels.forEach((el, k) => el.classList.toggle('on', k === i));
    if (dial) {
      dial.setAttribute('aria-valuemax', n); dial.setAttribute('aria-valuenow', i + 1);
      dial.setAttribute('aria-valuetext', `${m[0]}: ${m[1].replace(/\.$/, '')}`);
      dial.setAttribute('aria-label', `${ax.label}: choose a mode`);
    }
    $('.dr-axis').textContent = ax.label; $('.dr-mode').textContent = m[0];
    $('.md-name').textContent = m[0]; $('.md-text').textContent = m[1];
    const s = (k) => AXES[k].modes[inst.sel[k]][0];
    $('.reading-line').innerHTML = `You are asking ${article(s('stance'))} <b data-r="stance">${s('stance')}</b>, supplying <b data-r="structure">${s('structure')}</b>, working <b data-r="autonomy">${s('autonomy')}</b>, for <b data-r="ambition">${s('ambition')}</b>.`;
    if (flashAxis && !RM) { const b = $(`.reading-line b[data-r="${flashAxis}"]`); b && b.classList.add('flash'); }
  }
  function setMode(i, snap = true) {
    const n = AXES[inst.axis].modes.length;
    i = ((i % n) + n) % n;
    const changed = i !== inst.sel[inst.axis];
    inst.sel[inst.axis] = i;
    if (snap) aimNeedle(angOf(i, n));
    if (changed) renderInstrument(inst.axis);
  }
  function aimNeedle(deg) {
    let d = deg - (inst.target % 360);
    if (d > 180) d -= 360; if (d < -180) d += 360;
    inst.target += d;
    if (RM) { inst.cur = inst.target; paintNeedle(); } else startNeedle();
  }
  let needleRaf = 0;
  function paintNeedle() {
    if (!needleG) return;
    needleG.setAttribute('transform', `rotate(${inst.cur.toFixed(2)})`);
    const a = ((inst.cur % 360) + 360) % 360;
    sweep.setAttribute('stroke-dasharray', `${a.toFixed(2)} 360`);
  }
  function startNeedle() { if (!needleRaf) needleRaf = requestAnimationFrame(stepNeedle); }
  function stepNeedle() {
    needleRaf = 0;
    const d = inst.target - inst.cur;
    inst.cur += d * 0.2;
    if (Math.abs(d) < 0.05) inst.cur = inst.target; else startNeedle();
    paintNeedle();
  }
  function setAxis(axis, focus) {
    inst.axis = axis;
    $$('.axis-tabs [role="tab"]').forEach(t => {
      const on = t.dataset.axis === axis;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    $$('.axis-panel').forEach(p => { p.hidden = p.id !== 'panel-' + axis; });
    drawDial();
    const n = AXES[axis].modes.length;
    inst.cur = inst.target = angOf(inst.sel[axis], n) - (RM ? 0 : 40);
    paintNeedle();
    aimNeedle(angOf(inst.sel[axis], n));
    renderInstrument();
  }
  if (dial) {
    $$('.axis-tabs [role="tab"]').forEach((t, k, all) => {
      t.addEventListener('click', () => setAxis(t.dataset.axis));
      t.addEventListener('keydown', (e) => {
        let j = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (k + 1) % all.length;
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (k - 1 + all.length) % all.length;
        if (e.key === 'Home') j = 0; if (e.key === 'End') j = all.length - 1;
        if (j !== null) { e.preventDefault(); setAxis(all[j].dataset.axis, true); }
      });
    });
    const angleFromEvent = (e) => {
      const r = dial.getBoundingClientRect();
      const a = Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI;
      return (a + 360) % 360;
    };
    const nearest = (a) => { const n = AXES[inst.axis].modes.length; return Math.round(a / (360 / n)) % n; };
    dial.addEventListener('pointerdown', (e) => {
      inst.dragging = true; dial.setPointerCapture && dial.setPointerCapture(e.pointerId);
      const a = angleFromEvent(e); aimNeedle(a); setMode(nearest(a), false);
    });
    dial.addEventListener('pointermove', (e) => {
      if (!inst.dragging) return;
      const a = angleFromEvent(e); aimNeedle(a); setMode(nearest(a), false);
    });
    const end = () => { if (!inst.dragging) return; inst.dragging = false; setMode(inst.sel[inst.axis], true); };
    dial.addEventListener('pointerup', end); dial.addEventListener('pointercancel', end);
    dial.addEventListener('keydown', (e) => {
      const i = inst.sel[inst.axis], n = AXES[inst.axis].modes.length;
      const map = { ArrowRight: i + 1, ArrowUp: i + 1, ArrowLeft: i - 1, ArrowDown: i - 1, Home: 0, End: n - 1, PageUp: i + 3, PageDown: i - 3 };
      if (e.key in map) { e.preventDefault(); setMode(map[e.key]); }
    });
    setAxis('stance');
  }

  /* ---------- §2 Procession ---------- */
  const STANCE_RULES = [
    'Ask for the uncertainty before the answer. Treat the answer as a claim, not a verdict.',
    'Specify scope, boundaries and success criteria before you ask (an Intent Doc).',
    'State what you want to be able to do afterwards before the first question.',
    'Ask for the structure of your argument back, not for agreement.',
    'Name what you are defending and what would change your mind.',
    'Check the citation exists and says what is claimed.',
    '“Show me exactly which parts of the text support each conclusion.” Never accept an interpretation you cannot trace.',
    'Load the real constraints, the real counterpart, the real stakes.',
    'Provide the substance and the format; review for what was invented to fill gaps.',
    'Plan before action, checkpoints, a deviation report, nothing consequential ships uninspected. Delegation transfers labor, never responsibility.',
    'None. This is why the Muse stays hidden: it cannot be metric’d.',
    'Assay cold, later. Record every find when you find it: if you didn’t record it, you never had it.',
    'Decide in advance what you will not delegate.',
    'Supply both maps; name both audiences.'
  ];
  const stage = $('.proc-stage'), sticky = $('.proc-sticky'), track = $('.proc-track');
  const sts = $$('.st');
  const pm = { name: $('.pm-name'), fail: $('.pm-fail'), rule: $('.pm-rule'), count: $('.pm-count'), bar: $('.pm-bar'), box: $('.proc-margin') };
  const mqDesk = matchMedia('(min-width: 900px)');
  let mastH = 56, procH = false, centers = [], anchor = 0, stageTop = 0, stageRange = 1, procCur = -1;
  function setProcCurrent(i) {
    if (i === procCur) return;
    procCur = i;
    sts.forEach((el, k) => el.classList.toggle('is-current', k === i));
    if (!pm.name) return;
    const el = sts[i];
    pm.name.textContent = $('.st-name', el).textContent;
    pm.fail.textContent = $('.st-fail', el).textContent.replace(/^Fails as\s*/, '').replace(/^./, c => c.toUpperCase()) + '.';
    pm.rule.innerHTML = '<span class="pm-rl">Guardrail</span>';
    pm.rule.appendChild(document.createTextNode(STANCE_RULES[i]));
    pm.count.textContent = String(i + 1).padStart(2, '0') + ' / 14';
    if (!RM && pm.box) { pm.box.classList.remove('pm-swap'); void pm.box.offsetWidth; pm.box.classList.add('pm-swap'); }
  }
  function measureProc() {
    procH = mqDesk.matches && !RM && !!stage;
    root.classList.toggle('proc-h', procH);
    if (!procH) { track && track.style.removeProperty('--x'); sts.forEach(el => el.style.removeProperty('--d')); return; }
    const viewW = track.parentElement.getBoundingClientRect().width;
    const stw = Math.round(Math.min(viewW * 0.86, 600));
    sts.forEach(el => el.style.setProperty('--stw', stw + 'px'));
    centers = sts.map(el => el.offsetLeft + el.offsetWidth / 2);
    anchor = Math.min(viewW * 0.5, stw * 0.5);
    const mh = $('.masthead'); mastH = mh ? mh.offsetHeight : 56;
    stageTop = stage.getBoundingClientRect().top + window.scrollY;
    stageRange = Math.max(1, stage.offsetHeight - sticky.offsetHeight);
  }
  function updateProc() {
    if (!procH) return;
    const p = clamp((window.scrollY + mastH - stageTop) / stageRange, 0, 1);
    const raw = p * (sts.length - 1);
    const r0 = Math.floor(raw), rf = clamp((raw - r0 - 0.3) / 0.4, 0, 1);
    const pos = r0 + rf * rf * (3 - 2 * rf); // each stance dwells, then glides to the next
    const i0 = Math.floor(pos), f = pos - i0, i1 = Math.min(i0 + 1, sts.length - 1);
    const cx = centers[i0] + (centers[i1] - centers[i0]) * f;
    track.style.setProperty('--x', (anchor - cx).toFixed(1) + 'px');
    sts.forEach((el, k) => {
      const d = Math.round(Math.min(2, Math.abs(pos - k)) * 50) / 50;
      if (el._d !== d) { el._d = d; el.style.setProperty('--d', d); }
    });
    setProcCurrent(Math.round(pos));
    pm.bar && pm.bar.style.setProperty('--pp', p.toFixed(3));
  }
  if ('IntersectionObserver' in window) {
    const sio = new IntersectionObserver((entries) => {
      if (procH) return;
      entries.forEach(en => { if (en.isIntersecting) setProcCurrent(+en.target.dataset.i); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sts.forEach(s => sio.observe(s));
  }

  /* ---------- §3 Matrix: the load-bearing layer rises ---------- */
  const MX = {
    Oracle: ['Truth to a hard question', ['Judgment'], 'Judgment'],
    Genie: ['A discrete deliverable', ['Prompt'], 'Prompt'],
    Interpreter: ['Decode material I supply', ['Evaluation'], 'Evaluation'],
    Executor: ['A delegated job, reviewed after', ['Harness', 'Judgment'], 'Harness + Judgment'],
    Miner: ['The shape of a space, not one answer', ['Context'], 'Context (writing)'],
    Tutor: ['A path to the answer', ['Intent'], 'Intent'],
    Adversary: ['Attack on my plan', ['Intent'], 'Intent'],
    Scribe: ['Craft applied to my substance', ['Prompt'], 'Prompt'],
    Simulator: ['A rehearsal of reality', ['Context'], 'Context'],
    Librarian: ['Synthesis of what is known', ['Evaluation'], 'Evaluation'],
    Mirror: ['My own thinking, clarified', ['Coherence'], 'Coherence'],
    Translator: ['A bridge between two worlds', ['Context'], 'Context'],
    Therapist: ['A space to think aloud', ['Judgment'], 'Judgment'],
    Muse: ['Provocation, not correctness', [], 'None']
  };
  const RULE_BY = { Oracle: 0, Genie: 1, Tutor: 2, Mirror: 3, Adversary: 4, Librarian: 5, Interpreter: 6, Simulator: 7, Scribe: 8, Executor: 9, Muse: 10, Miner: 11, Therapist: 12, Translator: 13 };
  const CANON = ['Prompt', 'Context', 'Intent', 'Judgment', 'Coherence', 'Evaluation', 'Harness'];
  const layersEl = $('.mx-layers');
  const lis = layersEl ? $$('li', layersEl) : [];
  lis.forEach(li => { li.style.viewTransitionName = 'mxl-' + li.dataset.l.toLowerCase(); });
  const mxRead = $('.mx-read');
  if (mxRead) mxRead.style.viewTransitionName = 'mx-read';
  function applyMatrix(name) {
    const [exp, lb, label] = MX[name];
    const order = lb.concat(CANON.filter(l => !lb.includes(l)));
    order.forEach(l => layersEl.appendChild(lis.find(li => li.dataset.l === l)));
    lis.forEach(li => li.classList.toggle('lb', lb.includes(li.dataset.l)));
    layersEl.classList.toggle('none', lb.length === 0);
    $('.mx-stance').textContent = name === 'Therapist' ? 'Therapist / Confessor' : name;
    $('.mx-exp').textContent = exp;
    $('.mx-layer').textContent = label;
    $('.mx-rule').textContent = STANCE_RULES[RULE_BY[name]];
    $$('.mx-s').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.s === name)));
  }
  function flip(fn) {
    const first = new Map(lis.map(li => [li, li.getBoundingClientRect().top]));
    fn();
    lis.forEach(li => {
      const dy = first.get(li) - li.getBoundingClientRect().top;
      if (!dy) return;
      li.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 550, easing: 'cubic-bezier(.2,.7,.2,1)' });
    });
  }
  $$('.mx-s').forEach(b => b.addEventListener('click', () => {
    const name = b.dataset.s;
    if (b.getAttribute('aria-pressed') === 'true') return;
    if (RM) applyMatrix(name);
    else if (document.startViewTransition) document.startViewTransition(() => applyMatrix(name));
    else flip(() => applyMatrix(name));
  }));
  if (layersEl) applyMatrix('Oracle');

  /* ---------- §4 Mode shift: retype the request ---------- */
  const SHIFT = {
    oracle: { t: 'Before you answer: how certain can you be about why our customers cancel, and what is that certainty based on? Then give me your best claim, and I will check it.', layer: 'Judgment', why: 'Ask for the uncertainty before the answer. Treat the answer as a claim, not a verdict.' },
    interpreter: { t: 'Here are this quarter’s cancellation notes. Tell me what they say about why customers cancel, and quote the exact notes behind each reason you give.', layer: 'Evaluation', why: '“Show me exactly which parts of the text support each conclusion.” Never accept an interpretation you cannot trace.' },
    executor: { t: 'Read every cancellation from this quarter, tag each one by reason, and draft a one-page summary. Show me your plan first, stop at a checkpoint halfway, and list every place you departed from the brief.', layer: 'Harness + Judgment', why: 'Plan before action, checkpoints, a deviation report, nothing consequential ships uninspected.' }
  };
  const typed = $('.sh-typed'), shSr = $('.sh-sr'), shP = $('.sh-text p');
  let shown = SHIFT.oracle.t, typeRaf = 0, playTimer = 0, playing = false;
  function sizeShift() {
    if (!shP) return;
    shP.style.removeProperty('--sh-h');
    const keep = typed.textContent; let h = 0;
    Object.values(SHIFT).forEach(v => { typed.textContent = v.t; h = Math.max(h, shP.offsetHeight); });
    typed.textContent = keep;
    shP.style.setProperty('--sh-h', h + 'px');
  }
  function typeTo(key, done) {
    const target = SHIFT[key].t;
    $$('.sh-b').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.k === key)));
    $('.sh-layer').textContent = SHIFT[key].layer; $('.sh-why').textContent = SHIFT[key].why;
    shSr.textContent = target;
    cancelAnimationFrame(typeRaf);
    if (RM) { typed.textContent = shown = target; done && done(); return; }
    let pre = 0; while (pre < shown.length && pre < target.length && shown[pre] === target[pre]) pre++;
    let phase = 'del', last = performance.now(), acc = 0, len = shown.length;
    const DEL = 260, TYP = 85; // characters per second
    const step = (now) => {
      acc += (now - last) / 1000; last = now;
      if (phase === 'del') {
        const k = Math.floor(acc * DEL); if (k) { acc -= k / DEL; len = Math.max(pre, len - k); }
        if (len === pre) phase = 'typ';
      } else {
        const k = Math.floor(acc * TYP); if (k) { acc -= k / TYP; len = Math.min(target.length, len + k); }
      }
      shown = (phase === 'del' ? shown.slice(0, len) : target.slice(0, len));
      typed.textContent = shown;
      if (phase === 'typ' && len === target.length) { done && done(); return; }
      typeRaf = requestAnimationFrame(step);
    };
    typeRaf = requestAnimationFrame((t) => { last = t; step(t); });
  }
  function stopPlay() { playing = false; clearTimeout(playTimer); const pb = $('.sh-play'); if (pb) pb.textContent = 'Play all three'; }
  $$('.sh-b').forEach(b => b.addEventListener('click', () => { stopPlay(); typeTo(b.dataset.k); }));
  const playBtn = $('.sh-play');
  playBtn && playBtn.addEventListener('click', () => {
    if (playing) { stopPlay(); return; }
    playing = true; playBtn.textContent = 'Stop';
    const seq = ['oracle', 'interpreter', 'executor']; let k = 0;
    const next = () => { if (!playing) return; typeTo(seq[k], () => { k++; if (k < seq.length && playing) playTimer = setTimeout(next, 1400); else stopPlay(); }); };
    next();
  });

  /* ---------- §7 Pull-quote parallax ---------- */
  const pull = $('[data-parallax]');
  if (pull && finePointer) {
    let pr = 0, pe = null;
    pull.addEventListener('pointermove', (e) => {
      if (RM) return; pe = e;
      if (!pr) pr = requestAnimationFrame(() => {
        pr = 0; const r = pull.getBoundingClientRect();
        pull.style.setProperty('--px', ((pe.clientX - r.left) / r.width * 2 - 1).toFixed(3));
        pull.style.setProperty('--py', ((pe.clientY - r.top) / r.height * 2 - 1).toFixed(3));
      });
    }, { passive: true });
    pull.addEventListener('pointerleave', () => { pull.style.setProperty('--px', 0); pull.style.setProperty('--py', 0); });
  }

  /* ---------- One rAF-throttled scroll loop: hero fallback, procession, reading meter ---------- */
  const tocMeter = $('.toc-meter span');
  let heroH = 1, ticking = false;
  function onFrame() {
    ticking = false;
    const y = window.scrollY;
    if (!cssScrollTimeline && hero) {
      const hp = RM ? 0 : clamp(y / (heroH * 0.48), 0, 1);
      hero.style.setProperty('--hp', hp.toFixed(3));
    }
    updateProc();
    if (tocMeter) {
      const max = document.documentElement.scrollHeight - innerHeight;
      tocMeter.style.setProperty('--read', clamp(y / Math.max(1, max), 0, 1).toFixed(3));
    }
  }
  const requestFrame = () => { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } };
  window.addEventListener('scroll', requestFrame, { passive: true });
  function measureAll() { heroH = hero ? hero.offsetHeight : 1; measureProc(); sizeShift(); requestFrame(); }
  let rz = 0;
  window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(measureAll, 120); });
  mqRM.addEventListener && mqRM.addEventListener('change', (e) => { RM = e.matches; root.classList.toggle('rm', RM); measureAll(); });
  root.classList.toggle('rm', RM);
  measureAll();
  setProcCurrent(0);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureAll);
  window.addEventListener('load', measureAll);
})();
