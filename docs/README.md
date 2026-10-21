# Mode Fluency website (prototype)

Static prototype for Henrique Jr. Sanchez's Mode Fluency practice. Plain HTML, CSS and vanilla JavaScript:
no build step, no framework, no package.json, no external scripts. System fonts only.

## Files
- `index.html`, `calculator-problem.html`, `stances.html`, `stack.html`, `matrix.html`, `diagnose.html`,
  `learn.html`, `work.html`, `about.html`: the nine pages. Header and footer are duplicated in each file on purpose
  (no includes). If you change the navigation, change it in all nine.
- `assets/style.css`: all styles. Colours are CSS custom properties on `:root`, with a dark theme under
  `prefers-color-scheme: dark`. One accent colour (`--accent`).
- `assets/site.js`: stance filters, matrix highlighting, and the diagnostic. The stance and layer data used by the
  diagnostic is a JSON object at the top of the file; keep it in sync with the matrix text if you edit either.
- `assets/compass.svg`: favicon.
- `_qa/`: the QA report (`qa-report.md`), raw results (`qa-results.json`) and the blind review. Screenshots are kept
  outside this folder, in `site-qa-screenshots/` at the repository root, so the published site stays small.
- `.nojekyll`: tells GitHub Pages not to run Jekyll over this folder.

## Preview
Open `index.html` in a browser straight from disk; every link is relative. Or serve the folder:

    cd site && python3 -m http.server 8000   # then open http://localhost:8000

## Deploy to GitHub Pages
This folder will be committed to the repository as `docs/`. GitHub Pages publishes it directly, with no workflow:

1. Commit the folder as `docs/` on `main`, keeping `.nojekyll` inside it, so Pages serves the files as they are
   without running Jekyll.
2. In the repository, open Settings → Pages → Build and deployment. Set Source to *Deploy from a branch*, then choose
   Branch `main` and folder `/docs`, and save.
3. The site appears at `https://hjasanchez.github.io/agentic-engineering/` after a minute or two.

All links are relative, so nothing changes when the folder is renamed from `site/` to `docs/`. For a custom domain
(for example modefluency.com, once registered), add a `CNAME` file containing the domain to `docs/` and set the DNS
records that GitHub lists under Settings → Pages.

## Before launch (decisions for Henrique)
- `hello@modefluency.com` on work.html is a placeholder (see the HTML comment); the domain is not registered yet.
- Prices are "from $3,500" (assessment) and "from $1,200" (workshop), from benchmark ranges in the strategy brief.
- about.html has an HTML comment about the Hayen Mill co-author credit.
- AI 601 ("dark factories") has no written scope yet; learn.html says so.
