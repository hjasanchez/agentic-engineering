# Mode Fluency website (Direction C, "The Field")

Static site for Henrique Jr. Sanchez's practice. Nine pages of plain HTML, one stylesheet, two scripts. No build step,
no framework, no package.json, no external scripts. Fonts come from Google Fonts (JetBrains Mono, Newsreader) with
system fallbacks.

## Files
- `index.html`, `calculator-problem.html`, `stances.html`, `stack.html`, `matrix.html`, `diagnose.html`, `learn.html`,
  `work.html`, `about.html`: the nine pages. Header and footer are repeated in each file on purpose (no includes), between
  `<!-- @header -->` / `<!-- @footer -->` markers. If you change the navigation, change it in all nine.
- `assets/field.css`: all styles. Colours are tokens on `:root`, with the dark theme under `prefers-color-scheme` and
  `[data-theme="dark"]`.
- `assets/field.js`: every animation and interaction (the particle fields, the fourteen stance behaviours, the circuit,
  the Stack diagram, the altimeter, the theme toggle). Each section runs only when its markup is on the page.
- `assets/diagnose.js`: the self-diagnostic (question logic unchanged from the reviewed prototype) and its console UI.
- `assets/favicon.svg`: the icon.
- `_qa/qa-report.md`: the final QA report (about.html links to it). `_qa/buildlog.json`: the numbers shown in the footer build log.
  `_qa/blind-review.md` is an internal review: delete it before copying the folder to `docs/` unless you want it public.
- `STATUS.md`: build status note; safe to delete before deploy.
- `.nojekyll`: tells GitHub Pages not to run Jekyll (so `_qa/` is served as is).

## Preview
Open `index.html` in a browser straight from disk: every link is relative and every page works from `file://`.
Or serve the folder:

    python3 -m http.server 8000   # from inside this folder, then open http://localhost:8000

## Rename the practice (the one-line wordmark swap)
The name is set once, in `assets/field.css`:

    --brand: "Mode Fluency";

The header, footer and every inline mention render it from CSS, and `assets/field.js` reads it to build each page's
`<title>`. Edit that line and the visible site is renamed. (The `<title>` and meta description in each HTML file are
only the no-JavaScript and search-engine fallback; update them too if the rename is permanent.)

## Deploy on GitHub Pages
1. Copy this folder into the repository as `docs/` on `main`, keeping `.nojekyll` inside it.
2. In the repository: Settings → Pages → Build and deployment. Source: *Deploy from a branch*. Branch: `main`,
   folder: `/docs`. Save.
3. The site appears at `https://hjasanchez.github.io/agentic-engineering/` after a minute or two.

## Deploy on Cloudflare Pages
1. Cloudflare dashboard → Workers & Pages → Create → Pages → *Connect to Git*, and pick
   `hjasanchez/agentic-engineering`.
2. Production branch: `main`. Framework preset: *None*. Build command: leave empty (none). Build output directory: `docs`.
3. Save and deploy. Cloudflare serves the folder as it is and redeploys on every push to `main`.

## Custom domain
- **GitHub Pages:** add a file named `CNAME` to `docs/` containing only the domain (for example `modefluency.com`),
  then set the DNS records GitHub lists under Settings → Pages (a `CNAME` record pointing `www` to
  `hjasanchez.github.io`, and the apex `A`/`AAAA` records GitHub documents). Tick *Enforce HTTPS* once the
  certificate is issued.
- **Cloudflare Pages:** in the Pages project → Custom domains → *Set up a domain*. If the domain's DNS is on Cloudflare
  the record is created for you; otherwise add a DNS `CNAME` record pointing the domain to `<project>.pages.dev`.
  No `CNAME` file is needed for Cloudflare.

## Before launch (decisions for Henrique)
- `hello@modefluency.com` on work.html is a placeholder (see the HTML comment); it is shown as plain text, not a link.
- Prices are "from $3,500" (assessment) and "from $1,200" (workshop).
- The content license CC BY-SA 4.0 is marked "proposed" on about.html and in the footer.
- about.html keeps an HTML comment about the Hayen Mill co-author credit.
- AI 601 ("dark factories") has no written scope yet; learn.html says so.
