# Quickstart for New Machine

One-sentence project description: a Next.js App Router personal academic site for Jie Dean Zhong,
customized from `tailwind-nextjs-starter-blog`, with MDX blog content, research/news pages, and
GitHub Pages static export.

## Minimum Setup Steps

1. Use Node 20.
2. Run `corepack enable`.
3. Run `corepack prepare yarn@3.6.1 --activate`.
4. Run `yarn install --immutable`.
5. Recreate any needed `.env.local` values manually from `.env.example`; do not copy secrets blindly.

## Minimum Command to Run

Local preview:

```bash
yarn dev
```

GitHub Pages parity build:

```bash
EXPORT=true UNOPTIMIZED=true yarn build
```

## Required Files/Data to Copy

- All tracked source files from git.
- `.yarn/releases/yarn-3.6.1.cjs`, `.yarnrc.yml`, `package.json`, `yarn.lock`.
- `app/`, `components/`, `layouts/`, `css/`, `data/`, `scripts/`.
- `public/static/images/` and `public/static/favicons/`.
- `.github/workflows/pages.yml` if deployment should remain GitHub Pages.
- `.env.example` as a template only.

## Files/Data Not Worth Copying

- `node_modules/`
- `.yarn/cache/`
- `.yarn/install-state.gz`
- `.next/`
- `.contentlayer/`
- `out/`
- `public/feed.xml`
- `public/search.json`
- `public/tags/`
- `.husky/_/`
- logs, coverage, `.vercel/`

## 15 Most Important Files

- `AGENTS.md`: repository-specific work rules.
- `package.json`: commands and dependency declarations.
- `yarn.lock`: dependency reproduction; currently resolves Next 16.1.6.
- `next.config.js`: static export, images, Contentlayer, headers.
- `contentlayer.config.ts`: MDX schema and generated tag/search logic.
- `data/siteMetadata.js`: SEO, URL, comments, analytics, newsletter, search.
- `data/headerNavLinks.ts`: top navigation.
- `data/projectsData.ts`: research/project cards.
- `app/layout.tsx`: global layout and metadata.
- `app/page.tsx`: current homepage/profile page.
- `app/blog/[...slug]/page.tsx`: individual post rendering.
- `layouts/ListLayoutWithTags.tsx`: blog/tag list UI and pagination.
- `scripts/rss.mjs`: RSS/tag feed output logic.
- `.github/workflows/pages.yml`: GitHub Pages deployment.
- `.env.example`: integration env var names.

## Important Parameters/Results

- Node: 20 in CI and devcontainer.
- Yarn: 3.6.1.
- Package manager mode: `nodeLinker: node-modules`.
- Current branch/commit at scan: `main`, `82528d8`.
- Dirty pre-existing file: `next-env.d.ts`.
- Posts per page: 5.
- Content counts: 12 blog MDX files, 2 author MDX files, 20 static images, 9 favicons.
- Draft count: 1 draft post, `data/blog/my-fancy-title.mdx`.
- Tag keys: 19 in `app/tag-data.json`; includes draft-derived `hello`.
- CI export flags: `EXPORT=true`, `UNOPTIMIZED=true`.
- Build output for Pages: `out/`.
- Normal RSS output folder without `EXPORT`: `public/`.
- Starter metadata risk: `siteUrl` and `siteRepo` still point to upstream starter.
- Large ignored local dirs: `node_modules` about 726 MB, `.yarn/cache` about 171 MB.

## Smoke Test

1. `yarn dev`
2. Open `http://localhost:3000`.
3. Verify the custom profile homepage loads with `/static/images/upper-body-trans.png` and
   `/static/images/spikes.png`.
4. Visit `/research`, `/blog`, `/blog/placeholder-blog-preview`, `/tags`, `/news`, and `/about`.
5. Confirm the search icon opens. If it has no results, run a build/dev process that regenerates
   `public/search.json`.
6. For deployment parity, run `EXPORT=true UNOPTIMIZED=true yarn build` and confirm `out/` exists.

## Top 5 Likely Migration Failures

1. Wrong package manager/version: use Yarn 3.6.1 with Corepack and the lockfile.
2. Stale or wrong metadata: `siteUrl`, `siteRepo`, social links, and email still contain starter values.
3. Generated files treated as source: RSS/search/tag feeds should be regenerated, not copied as truth.
4. Draft/sample content ships unintentionally: dev shows drafts; production filters drafts differently.
5. Integrations fail silently: comments, analytics, and newsletter need manually recreated env vars.
