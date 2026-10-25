// QA for Direction A. Usage: node qa.js
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const SITE = 'file:///home/user/meta-strategy/design-directions/A-instrument/index.html';
const OUT = '/home/user/meta-strategy/design-qa-screenshots/A';
const results = { runs: [], contrast: {}, interaction: {}, nojs: {} };

const contrastFn = () => {
  function parse(c) {
    if (!c || c === 'none' || c === 'transparent') return null;
    const cm = c.match(/color\(srgb ([^)]+)\)/);
    if (cm) { const q = cm[1].split(/[ /]+/).filter(Boolean).map(Number); return [q[0] * 255, q[1] * 255, q[2] * 255, q.length > 3 ? q[3] : 1]; }
    const m = c.match(/rgba?\(([^)]+)\)/); if (!m) {
      if (parse._d) return null; parse._d = 1;
      const cv = document.createElement('canvas').getContext('2d'); cv.fillStyle = c; const h = cv.fillStyle;
      if (h[0] === '#') { parse._d = 0; return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16), 1]; }
      const res = parse(h); parse._d = 0; return res;
    }
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
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
  const bodyBg = parse(getComputedStyle(document.body).backgroundColor);
  const els = new Set();
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) { const t = tw.currentNode; if (t.nodeValue.trim() && t.parentElement && !t.parentElement.closest('script,style,noscript,title,desc')) els.add(t.parentElement); }
  const out = [];
  for (const el of els) {
    if (!visible(el)) continue;
    if (el.closest('.vh')) continue;
    if (el.closest('details:not([open])') && !el.closest('summary')) continue;
    if (el.classList.contains('skip-link')) { window.scrollTo(0, 0); el.focus(); } else el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
    const r = el.getBoundingClientRect();
    const isSvg = el instanceof SVGElement;
    const cs = getComputedStyle(el);
    let fg = parse(isSvg ? cs.fill : cs.color);
    if (!fg) continue;
    const ownerSvg = isSvg ? el.ownerSVGElement || el.closest('svg') : null;
    const pts = [[r.left + r.width / 2, r.top + r.height / 2]];
    let stack = [];
    for (const [x, y] of pts) {
      const list = document.elementsFromPoint(Math.min(innerWidth - 1, Math.max(0, x)), Math.min(innerHeight - 1, Math.max(0, y)));
      for (const c of list) {
        const rel = c === el || c.contains(el) || (ownerSvg && ownerSvg.contains(c) && c !== el && !(c instanceof SVGTextElement) && !(c instanceof SVGTSpanElement));
        if (!rel) continue;
        const ccs = getComputedStyle(c);
        let col = null;
        if (c instanceof SVGGeometryElement && !(c instanceof SVGTextContentElement)) {
          if (c.tagName === 'line' || c.tagName === 'path' && ccs.fill === 'none') continue;
          col = parse(ccs.fill); if (col) col[3] *= parseFloat(ccs.fillOpacity || 1) * parseFloat(ccs.opacity || 1);
        } else if (!(c instanceof SVGElement)) { col = parse(ccs.backgroundColor); }
        if (col && col[3] > 0) { stack.push(col); if (col[3] >= 1) break; }
      }
    }
    let bg = bodyBg;
    for (let i = stack.length - 1; i >= 0; i--) bg = stack[i][3] >= 1 ? stack[i] : over(stack[i], bg);
    if (fg[3] < 1) fg = over(fg, bg);
    const L1 = lum(fg), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    if (el.classList.contains('skip-link')) el.blur();
    out.push({ ratio: Math.round(ratio * 100) / 100, text: (el.textContent || '').trim().slice(0, 50), tag: el.tagName, cls: (el.getAttribute('class') || '').slice(0, 30), fg: fg.slice(0, 3).map(Math.round).join(','), bg: bg.slice(0, 3).map(Math.round).join(',') });
  }
  window.scrollTo(0, 0);
  out.sort((a, b) => a.ratio - b.ratio);
  return { count: out.length, lowest: out.slice(0, 8), fails: out.filter(o => o.ratio < 4.5) };
};

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
  for (const vw of [390, 1280]) for (const scheme of ['light', 'dark']) for (const rm of ['no-preference', 'reduce']) {
    const ctx = await browser.newContext({ viewport: { width: vw, height: vw === 390 ? 844 : 800 }, colorScheme: scheme, reducedMotion: rm, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [], failed = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push('pageerror: ' + e.message));
    page.on('requestfailed', r => failed.push(r.url() + ' ' + (r.failure() && r.failure().errorText)));
    page.on('response', r => { if (r.status() >= 400) failed.push(r.url() + ' HTTP ' + r.status()); });
    await page.goto(SITE, { waitUntil: 'load' });
    await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 4000))]));
    await page.waitForTimeout(900);
    const fontsOk = await page.evaluate(() => ({ b612: document.fonts.check('700 12px B612'), serif: document.fonts.check('400 20px "Source Serif 4"'), mono: document.fonts.check('400 12px "B612 Mono"') }));
    const tag = `${vw}-${scheme}-${rm === 'reduce' ? 'rm' : 'motion'}`;
    const overflow = [];
    const sh = await page.evaluate(() => document.documentElement.scrollHeight);
    for (const [name, frac] of [['top', 0], ['mid', 0.5], ['bottom', 1]]) {
      await page.evaluate(f => window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f), frac);
      await page.waitForTimeout(rm === 'reduce' ? 200 : 700);
      overflow.push(await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, bw: document.body.scrollWidth, iw: innerWidth })));
      await page.screenshot({ path: path.join(OUT, `${tag}-${name}.png`) });
    }
    const run = { tag, errors, failed, fontsOk, overflowOk: overflow.every(o => o.sw <= o.iw && o.bw <= o.iw), overflow: overflow[0], scrollHeight: sh };
    if (rm === 'no-preference' && (vw === 1280 || vw === 390)) {
      const c = await page.evaluate(contrastFn);
      results.contrast[`${vw}-${scheme}`] = c;
    }
    results.runs.push(run);
    await ctx.close();
  }

  // Interaction at 1280 (dark + light): drag the needle, set autonomy, flip switches, toggle mode-confusion switch.
  for (const scheme of ['dark', 'light']) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: scheme });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(SITE); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(600);
    const box = await page.locator('#dial').boundingBox();
    const toScreen = (r, a) => { const t = a * Math.PI / 180; const sx = 300 + r * Math.sin(t), sy = 300 - r * Math.cos(t); return [box.x + (sx + 20) / 640 * box.width, box.y + (sy + 20) / 640 * box.height]; };
    const seg = 270 / 14;
    const [x0, y0] = toScreen(266, -135 + seg * 0.5);
    const [x1, y1] = toScreen(266, -135 + seg * 2.5); // Tutor
    await page.mouse.move(x0, y0); await page.mouse.down();
    for (let i = 1; i <= 12; i++) { const a = -135 + seg * (0.5 + 2 * i / 12); const [x, y] = toScreen(266, a); await page.mouse.move(x, y); }
    await page.mouse.up(); await page.waitForTimeout(1400);
    const afterDrag = await page.evaluate(() => ({ now: document.getElementById('dial').getAttribute('aria-valuenow'), text: document.getElementById('dial').getAttribute('aria-valuetext'), caution: document.getElementById('fma-caution').dataset.on, live: document.getElementById('live-fail').textContent }));
    await page.screenshot({ path: path.join(OUT, `1280-${scheme}-interact-hero-drag.png`) });
    // keyboard
    await page.locator('#dial').focus(); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight');
    const afterKeys = await page.evaluate(() => document.getElementById('dial').getAttribute('aria-valuenow'));
    await page.screenshot({ path: path.join(OUT, `1280-${scheme}-interact-hero-keys-focus.png`) });
    // switch panel
    await page.locator('#matrix').scrollIntoViewIfNeeded();
    const sws = page.locator('#switches .tsw');
    await sws.nth(9).click(); await sws.nth(5).click(); await sws.nth(6).click(); await page.waitForTimeout(2600);
    const panel = await page.evaluate(() => ({ count: document.getElementById('sp-count').textContent, typed: document.getElementById('typeout').textContent, lit: [...document.querySelectorAll('.led.on')].map(l => l.dataset.led + ':' + l.querySelector('.ct').textContent) }));
    await page.locator('#switch-panel').screenshot({ path: path.join(OUT, `1280-${scheme}-interact-switch-panel.png`) });
    // mode confusion demo
    await page.locator('#confusion').scrollIntoViewIfNeeded();
    await page.click('#mc-switch'); await page.waitForTimeout(900);
    const mcState = await page.evaluate(() => ({ checked: document.getElementById('mc-switch').getAttribute('aria-checked'), layer: document.getElementById('mc-layer').textContent }));
    await page.locator('#confusion .mc').screenshot({ path: path.join(OUT, `1280-${scheme}-interact-mode-confusion.png`) });
    // ladder mid-scroll
    await page.evaluate(() => { const r = document.querySelector('.rung[data-level="401"]').getBoundingClientRect(); window.scrollBy(0, r.top - innerHeight * 0.5 + 40); });
    await page.waitForTimeout(500);
    const alt = await page.evaluate(() => document.getElementById('tape-box').textContent);
    await page.screenshot({ path: path.join(OUT, `1280-${scheme}-interact-altitude-ladder.png`) });
    // hero scroll sweep: scroll 60% through the pinned hero
    await page.evaluate(() => { const t = document.getElementById('hero-track'); window.scrollTo(0, (t.offsetHeight - innerHeight) * 0.6); });
    await page.waitForTimeout(1200);
    const sweep = await page.evaluate(() => document.getElementById('dial').getAttribute('aria-valuetext'));
    await page.screenshot({ path: path.join(OUT, `1280-${scheme}-interact-hero-scroll-sweep.png`) });
    // theme toggle
    await page.evaluate(() => window.scrollTo(0, 0)); await page.click('#theme-toggle'); await page.waitForTimeout(600);
    const themeAfter = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    results.interaction[scheme] = { afterDrag, afterKeys, panel, mcState, alt, sweep, themeAfter, errors };
    await ctx.close();
  }
  // No-JS
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, javaScriptEnabled: false, colorScheme: 'dark' });
    const page = await ctx.newPage(); await page.goto(SITE); await page.waitForTimeout(800);
    results.nojs = await page.evaluate(() => ({ h1: document.querySelector('h1').innerText, fail: document.getElementById('live-fail').innerText, wordmark: getComputedStyle(document.querySelector('.brand-name'), '::before').content, textLen: document.body.innerText.length, sw: document.documentElement.scrollWidth }));
    await page.screenshot({ path: path.join(OUT, `1280-dark-nojs-top.png`) });
    await ctx.close();
  }
  // Mobile interaction: tap a stance on the dial and open nav
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'dark', hasTouch: true, isMobile: true });
    const page = await ctx.newPage(); await page.goto(SITE); await page.waitForTimeout(800);
    await page.click('#next-stance'); await page.click('#next-stance');
    await page.locator('.instrument').screenshot({ path: path.join(OUT, `390-dark-interact-instrument.png`) });
    await page.click('.nav-toggle'); await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(OUT, `390-dark-nav-open.png`) });
    results.mobile = await page.evaluate(() => ({ now: document.getElementById('dial').getAttribute('aria-valuenow'), sw: document.documentElement.scrollWidth, iw: innerWidth }));
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(__dirname, 'qa-results.json'), JSON.stringify(results, null, 1));
  console.log(JSON.stringify(results, null, 1).slice(0, 12000));
})();
