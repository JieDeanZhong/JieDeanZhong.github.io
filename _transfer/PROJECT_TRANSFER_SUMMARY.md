# Project Transfer Summary

Scan date: 2026-06-26. Scope: read-only repository inspection plus creation of this
`_transfer/` directory. No build, lint, install, external service, or destructive command was run.

## 1. Executive Summary

- This is a Next.js App Router personal academic site for Jie Dean Zhong, customized from
  `tailwind-nextjs-starter-blog`; the strongest identity evidence is `data/siteMetadata.js`,
  `app/page.tsx`, `data/headerNavLinks.ts`, and recent commits.
- The live root route (`app/page.tsx`) is a profile/editorial homepage with a portrait,
  biology-research copy, and a patterned background. It still exports metadata title `About`.
- The project is only partially de-startered: README, package name, site URL, repo URL, social links,
  many blog posts, issue templates, funding metadata, and `/projects` copy still reference or resemble
  the upstream starter.
- GitHub Pages is the intended deployment target. CI uses Node 20, Yarn 3.6.1, `EXPORT=true`,
  `UNOPTIMIZED=true`, and uploads `./out`.
- Content is driven by Contentlayer/MDX from `data/blog` and `data/authors`. Current tracked content is
  12 blog MDX files, 2 author MDX files, 20 static images, and 9 favicons.
- Blog listing and tag pages paginate at 5 posts per page. Drafts are filtered only in production by
  `pliny`'s `allCoreContent`; in development, the draft post can appear.
- Generated artifacts exist locally but are ignored: `public/feed.xml`, `public/search.json`, and
  `public/tags/*/feed.xml`. Regenerate them instead of transferring them as source of truth.
- The working tree was dirty before this transfer package: `next-env.d.ts` had an uncommitted
  auto-generated type-reference change. This package does not modify it.
- Important migration risks are stale metadata, placeholder content, unverified build state,
  environment-dependent draft filtering, and dependency/version drift from `next: "latest"`.
- No real secret values were found in the inspected files. Only `.env.example` placeholders and
  environment-variable references were found for analytics, comments, and newsletters.

## 2. Project Identity

- Project name: Jie Dean Zhong personal site, although `package.json` still says
  `tailwind-nextjs-starter-blog`.
- Project type: Next.js App Router static/blog/personal portfolio site using TypeScript, React,
  Tailwind CSS v4, MDX, Contentlayer2, and Pliny.
- Current status: partially customized and likely intended for GitHub Pages; build status is unknown
  because build/lint were not run under the user's constraints.
- Main goal: present Jie Dean Zhong's academic profile, research/project information, blog posts, and
  updates.
- Most reliable project storyline: a Tailwind Next.js Starter Blog repository was initialized on
  2026-03-04 and progressively customized in March-April 2026 into a personal academic site with a
  custom homepage, header signature, profile images, research/news navigation, and GitHub Pages static
  export support. A placeholder blog preview was added on 2026-06-05.
- Most important outputs: local dev server at `http://localhost:3000`, production `.next/` build when
  built normally, static export in `out/` when `EXPORT=true`, RSS feeds, tag feeds, sitemap, robots,
  and `public/search.json`.

## 3. Actual Purpose and Inferred Intent

Confirmed facts:

- The site metadata title/author/header title are `Jie Dean Zhong`, and description is
  `Dean the Digital` (`data/siteMetadata.js`).
- The root page copy identifies Jie Dean Zhong as an undergraduate Biological Sciences student at
  XJTLU interested in synthetic biology, microbial engineering, immunology, microbial motility,
  and scientific communication (`app/page.tsx`).
- Navigation exposes `Home`, `Research`, `Blog`, `News`, and `About` (`data/headerNavLinks.ts`).
- The research page renders project cards from `data/projectsData.ts`; current projects include
  `TroGen` and `The Time Machine`.
- Deployment workflow is named `Deploy site to GitHub Pages` and uploads `./out`
  (`.github/workflows/pages.yml`).

Inferred goals:

- Inference: the intended public identity is an academic/research portfolio, not a generic blog.
  Evidence: root homepage copy in `app/page.tsx`, `Research` and `News` routes, biological-sciences
  author profile in `data/authors/default.mdx`, and March 2026 commits for navigation/profile updates.
  Confidence: high.
- Inference: the blog starter is still being actively stripped down and personalized. Evidence:
  `README.md`, `package.json`, `data/siteMetadata.js`, `/projects` copy, issue templates, and many MDX
  posts retain upstream starter wording, while root/header/research pages are customized.
  Confidence: high.
- Inference: GitHub Pages, not Vercel, is the current deployment target. Evidence: repository name
  `JieDeanZhong.github.io`, `.github/workflows/pages.yml`, and `next.config.js` export-mode handling.
  Confidence: high.
- Inference: dark mode was intentionally de-emphasized, but not fully removed. Evidence: commit
  `5d560d5 deleting dark mode`, `app/theme-providers.tsx` is a no-op, yet many components still
  contain `dark:` Tailwind classes and `ThemeSwitch.tsx` remains.
  Confidence: medium.

## 4. Current State

What works or is source-defined:

- Root route: `app/page.tsx` renders a custom profile homepage with signature/header around it from
  `app/layout.tsx` and `components/Header.tsx`.
- Blog route: `app/blog/page.tsx`, `app/blog/page/[page]/page.tsx`,
  `app/blog/[...slug]/page.tsx`, and layouts in `layouts/` render Contentlayer-generated MDX posts.
- Tag route: `app/tags/page.tsx`, `app/tags/[tag]/page.tsx`, and
  `app/tags/[tag]/page/[page]/page.tsx` use `app/tag-data.json`.
- Research/projects route: `app/research/page.tsx` and `app/projects/page.tsx` both render
  `data/projectsData.ts` through `components/Card.tsx`.
- Search: configured for Pliny KBar with generated `public/search.json` path
  (`data/siteMetadata.js`, `contentlayer.config.ts`).
- RSS: `scripts/postbuild.mjs` calls `scripts/rss.mjs` after `yarn build`.

Partial or stale:

- `/about` still uses the starter author layout and `data/authors/default.mdx`; the body contains
  `This is a TEST LINE. blah blah blah.`
- `/projects` still says `Showcase your projects with a hero image (16 x 9)`.
- `/news` is a placeholder page with one sentence.
- `README.md` is mostly the upstream Tailwind Next.js Starter Blog README.
- `data/siteMetadata.js` has starter URL/repo/social/email values, including
  `siteUrl: https://tailwind-nextjs-starter-blog.vercel.app` and
  `siteRepo: https://github.com/timlrx/tailwind-nextjs-starter-blog`.
- `.github/FUNDING.yml` and issue templates remain upstream-flavored.
- `app/Main.tsx` appears unused; `rg` only found `Main` in that file.

Deprecated or likely abandoned:

- `ThemeSwitch.tsx` and many `dark:` classes remain, but `app/theme-providers.tsx` now just returns
  children and the history includes `5d560d5 deleting dark mode`.
- `components/LayoutWrapper.tsx` appears unused in the App Router root layout.

Unknown:

- Whether `yarn build`, `yarn lint`, and GitHub Pages deployment currently pass. They were not run.
- Whether comments/newsletter integrations are intended to be live. Config references exist, but no
  real env file was present.

## 5. Historical Notes

- `85b1f75` on 2026-03-04, `Initial commit`: imported the starter project with Next App Router,
  Contentlayer, MDX posts, layouts, Yarn 3.6.1 release, GitHub Pages workflow, and static assets.
- `293b7dd` on 2026-03-05, `add lucide-react dependency`: added one dependency. It is not currently
  central to the inspected routes, but keep lockfile consistency.
- Multiple 2026-03-05 commits updated `.github/workflows/pages.yml` and `next.config.js`, indicating
  early deployment/export setup churn.
- `b8b8a7e` on 2026-03-05, `Update next.config.js`: major Next config revision. Current config has
  `output` gated by `EXPORT`, export-safe header omission, `trailingSlash: true`, SVG webpack loader,
  and optional unoptimized images.
- `6462843` on 2026-03-07, `fix dev setup and update about page`: touched `package.json`,
  `tsconfig.json`, `next-env.d.ts`, header/theme switch, and default author content.
- `31a79c2` on 2026-03-07, `restructure site navigation and add research and news pages`: added
  `/research` and `/news`, changed navigation, and updated tag data.
- `2f5bf78` on 2026-03-08, `header turn grey and wide also added signature-jdz`: customized header,
  homepage, research page, metadata, and signature asset direction.
- `0cbc533` on 2026-03-08, `apple style home page and font`: shifted homepage/layout style toward the
  current editorial/profile design.
- `5d560d5` on 2026-03-08, `deleting dark mode`: made theme provider a no-op and changed theme-related
  files, but dark-mode classes remain in many components.
- `710b524` on 2026-03-08, `new profile pic update`: introduced `upper-body-trans.png` and updated the
  root page image usage.
- `5dd49e9` on 2026-03-12, `background edit by colin`: added `spikes.png` and changed the root page
  background.
- `fce9224` on 2026-04-01, `update homepage text layout`: adjusted root homepage copy/layout and added
  `AGENTS.md`.
- `82528d8` on 2026-06-05, `responsive updates and preview blog`: current HEAD; modified root page,
  footer/mobile/search components, tag data, and added `placeholder-blog-preview.mdx` plus two large
  placeholder images.

## 6. Key Pipelines

### Setup and Install

- Purpose: reproduce dependencies for local development or CI.
- Entry points: `package.json`, `.yarnrc.yml`, `.yarn/releases/yarn-3.6.1.cjs`, `yarn.lock`.
- Inputs: tracked source files, Node runtime, Yarn 3.6.1.
- Outputs: `node_modules/` and `.yarn/install-state.gz` locally; both are ignored.
- Commands:
  - `corepack enable`
  - `corepack prepare yarn@3.6.1 --activate`
  - `yarn install --immutable`
- Key parameters: `nodeLinker: node-modules`; CI Node version is 20.
- Status: working in CI configuration by definition of workflow; not verified locally in this scan.
- Failure modes: wrong Yarn version, missing Corepack, stale lockfile, dependency drift if lockfile is
  not used, Node version mismatch.

### Local Development Server

- Purpose: interactive local preview.
- Entry script: `package.json` script `dev`.
- Command: `yarn dev`
- Implementation: `cross-env INIT_CWD=$PWD next dev --webpack`.
- Output: dev server on `http://localhost:3000`.
- Dependencies: Next, React, Contentlayer2, Pliny, Tailwind.
- Expected success indicators: server starts, root page renders, MDX routes compile, generated
  Contentlayer data exists.
- Status: unknown; not run.
- Failure modes: missing `node_modules`, Contentlayer generation errors, `next-env.d.ts` referencing
  `.next/types` before build, MDX frontmatter errors, draft content visible in dev.

### Contentlayer MDX Generation

- Purpose: turn `data/blog/**/*.mdx` and `data/authors/**/*.mdx` into typed content and derived
  metadata.
- Entry point: `contentlayer.config.ts`.
- Inputs: `data/blog/`, `data/authors/`, `data/references-data.bib`, MDX components.
- Outputs: `.contentlayer/generated` (ignored), `app/tag-data.json`, `public/search.json`.
- Commands: normally triggered by `next dev` or `next build`; no separate command found.
- Key parameters: blog fields include `title`, `date`, `tags`, `draft`, `summary`, `images`,
  `authors`, `layout`, `bibliography`, `canonicalUrl`; author fields include `name`, `avatar`,
  `occupation`, `company`, `email`, and social links.
- Status: source-defined, unverified in this scan.
- Failure modes: malformed frontmatter, missing image paths, unsupported MDX syntax, missing
  bibliography file, generated `app/tag-data.json` containing dev-only draft tags if created outside
  production.

### Blog Rendering

- Purpose: render post lists, post pages, tag pages, pagination, MDX layouts, comments, and search.
- Entry points: `app/blog/page.tsx`, `app/blog/page/[page]/page.tsx`,
  `app/blog/[...slug]/page.tsx`, `app/tags/*`, `layouts/*`, `components/MDXComponents.tsx`.
- Inputs: Contentlayer-generated `allBlogs`, `allAuthors`, `app/tag-data.json`.
- Outputs: rendered static/dynamic pages for `/blog`, `/blog/page/N`, `/blog/...`,
  `/tags`, `/tags/TAG`, and `/tags/TAG/page/N`.
- Commands: `yarn dev` or `yarn build`.
- Key parameters: `POSTS_PER_PAGE = 5`; default post layout is `PostLayout`; alternate layouts include
  `PostSimple` and `PostBanner`.
- Status: source-defined, unverified in this scan.
- Failure modes: stale `app/tag-data.json`, draft filtering differs between development and production,
  post links use `/${path}`, site metadata still points to starter domain.

### Production Build and RSS

- Purpose: build the site and generate RSS feeds.
- Entry scripts: `package.json` script `build`, `scripts/postbuild.mjs`, `scripts/rss.mjs`.
- Command: `yarn build`
- Static export command for GitHub Pages: `EXPORT=true UNOPTIMIZED=true yarn build`
- Inputs: all source files, content, assets, env vars.
- Outputs:
  - normal build: `.next/` plus generated feeds under `public/`
  - export build: `out/` plus feeds under `out/`
- Key parameters: `NODE_OPTIONS='--experimental-json-modules'` for postbuild; RSS output folder is
  `out` when `EXPORT` is set, otherwise `public`.
- Status: unknown; not run.
- Failure modes: Next/Contentlayer version incompatibility, stale `siteUrl`, missing generated
  `.contentlayer`, draft first post/date assumptions in RSS, env-dependent comments/newsletter.

### GitHub Pages Deployment

- Purpose: publish static export to GitHub Pages.
- Entry point: `.github/workflows/pages.yml`.
- Trigger: push to `main` and manual workflow dispatch.
- Commands: checkout, setup Node 20, enable Corepack, prepare Yarn 3.6.1, `yarn install --immutable`,
  `EXPORT=true UNOPTIMIZED=true yarn build`, upload `./out`, deploy.
- Inputs: GitHub repository, GitHub Pages permissions, source tree.
- Outputs: GitHub Pages deployment URL from `actions/deploy-pages`.
- Status: configured, not verified.
- Failure modes: Pages settings not enabled, wrong base path/domain metadata, build failure,
  dependency drift if lockfile changes, generated static export missing assets.

### Lint and Formatting

- Purpose: enforce ESLint/Prettier style.
- Entry points: `eslint.config.mjs`, `prettier.config.js`, `package.json`, `.husky/pre-commit`.
- Commands:
  - `yarn lint`
  - pre-commit: `npx --no-install lint-staged`
- Inputs: JS/TS/TSX/JSON/CSS/MD/MDX source files.
- Outputs: modified files because `--fix` and Prettier write in place.
- Status: unknown; not run because it can edit outside `_transfer/`.
- Failure modes: `next lint` compatibility with the installed Next version, missing `lib` or `pages`
  directories referenced in lint command, auto-formatting generated files.

## 7. Key Numbers and Results

- Tracked files: 125 (`git ls-files | wc -l`).
- Blog posts: 12 MDX files under `data/blog`; 11 are `draft: false`, 1 is `draft: true`
  (`data/blog/my-fancy-title.mdx`).
- Authors: 2 MDX files under `data/authors`.
- Static images: 20 tracked files under `public/static/images`.
- Favicons: 9 tracked files under `public/static/favicons`.
- Tag keys in `app/tag-data.json`: 19, including `hello`, which comes from the draft post and signals
  that tag data may have been generated in development.
- Top tag counts: `next-js: 6`, `guide: 5`, `tailwind: 3`, `images: 2`, `feature: 2`.
- Pagination size: 5 posts per page in blog and tag page implementations.
- Current branch/commit: `main` at `82528d8`, tracking `origin/main`.
- Remote: `git@github.com:JieDeanZhong/JieDeanZhong.github.io.git`.
- Dirty tracked file before transfer: `next-env.d.ts`.
- Ignored local heavy/generated directories: `.yarn/cache` about 171 MB, `node_modules` about 726 MB,
  `public/tags` about 76 KB, `public/static` about 12 MB.
- Package manager: Yarn 3.6.1 (`package.json` and `.yarn/releases/yarn-3.6.1.cjs`).
- Node version in CI/devcontainer: 20.
- Lockfile-resolved Next version: `next@npm:16.1.6`; `package.json` still declares
  `next: "latest"`.
- React versions: `react` and `react-dom` are 19.2.4.
- Key site metadata values: title `Jie Dean Zhong`, description `Dean the Digital`, locale `en-US`,
  theme `system`.
- Current production metadata risk: `siteUrl` and `siteRepo` still point to the upstream starter.

## 8. Critical Files and Directories

Must read:

- `AGENTS.md`: repository rules and commands.
- `package.json`: scripts, dependency versions, package manager.
- `next.config.js`: export mode, CSP headers, image behavior, Contentlayer plugin.
- `contentlayer.config.ts`: MDX schema, plugins, tag/search generation.
- `data/siteMetadata.js`: title, SEO, comments, analytics, newsletter, search.
- `.github/workflows/pages.yml`: actual CI/deploy path.

Main entry points:

- `app/layout.tsx`: root layout, metadata, header/footer/search providers.
- `app/page.tsx`: current homepage.
- `app/blog/[...slug]/page.tsx`: individual blog route.
- `app/blog/page.tsx` and `app/blog/page/[page]/page.tsx`: blog listing/pagination.
- `app/tags/*`: tag listing and tag pagination.
- `app/research/page.tsx`, `app/news/page.tsx`, `app/about/page.tsx`,
  `app/projects/page.tsx`: main top-level pages.

Core configs:

- `tsconfig.json`, `eslint.config.mjs`, `prettier.config.js`, `postcss.config.js`, `.yarnrc.yml`,
  `.devcontainer/devcontainer.json`.

Key data or data descriptions:

- `data/blog/`: MDX posts.
- `data/authors/`: author profiles.
- `data/projectsData.ts`: research/projects cards.
- `data/headerNavLinks.ts`: navigation.
- `data/references-data.bib`: citation data for MDX bibliography examples.
- `public/static/images/`: profile, signature, blog, and project images.
- `public/static/favicons/`: favicon/site manifest assets.

Key results:

- `app/tag-data.json`: generated/committed tag counts used by tag routes.
- `public/feed.xml`, `public/search.json`, `public/tags/*/feed.xml`: local generated artifacts; ignored.

Key logs:

- No log files were part of tracked source. Ignored `*.log` patterns are in `.gitignore`.

Useful historical files:

- `README.md`: upstream starter docs; useful for starter features, not reliable project identity.
- `faq/`: starter customization docs.
- `.github/ISSUE_TEMPLATE/*` and `.github/FUNDING.yml`: mostly upstream historical leftovers.
- `app/Main.tsx`: old starter home component, apparently unused.
- `components/LayoutWrapper.tsx`, `components/ThemeSwitch.tsx`: likely leftover/partial theme/layout code.

Safe to ignore:

- `node_modules/`, `.yarn/cache/`, `.yarn/install-state.gz`, `.husky/_/`, `.DS_Store`, logs,
  `.next/`, `.contentlayer/`, `out/`, `.vercel/`, `coverage/`.

Regenerate instead of transfer:

- `node_modules/`: run `yarn install --immutable`.
- `.next/`, `.contentlayer/`, `out/`: run dev/build.
- `public/feed.xml`, `public/search.json`, `public/tags/*/feed.xml`: generated by Contentlayer/postbuild.

Sensitive or requires manual reconfiguration:

- Real `.env.local` or production env vars should not be copied casually. Recreate values for
  `NEXT_UMAMI_ID`, `NEXT_PUBLIC_GISCUS_*`, newsletter provider keys, and any deployment secrets.
- No real secret values were found in tracked files; only `.env.example` placeholders were present.

## 9. Environment and Reproducibility

Dependencies and versions:

- Node 20 is used in GitHub Actions and devcontainer.
- Yarn 3.6.1 is declared in `package.json` and tracked under `.yarn/releases`.
- `.yarnrc.yml` uses `nodeLinker: node-modules`.
- Key packages: Next (lockfile currently 16.1.6), React 19.2.4, Tailwind CSS 4.1.x,
  Contentlayer2 0.5.8, Next Contentlayer2 0.5.8, Pliny 0.4.1, TypeScript 5.9.x,
  ESLint 9.x, Prettier 3.8.x.

External tools:

- Git, Corepack, Yarn, Node.
- GitHub Actions/Pages for deployment.

Hardware assumptions:

- `.devcontainer/devcontainer.json` requests 8 GB memory.
- No GPU or training hardware is relevant.

Environment variables:

- Optional/needed depending on enabled features: `NEXT_UMAMI_ID`, `NEXT_PUBLIC_GISCUS_REPO`,
  `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`,
  `NEXT_PUBLIC_GISCUS_CATEGORY_ID`, `BUTTONDOWN_API_KEY`, and other newsletter-provider variables in
  `.env.example`.
- Build flags: `EXPORT=true`, `UNOPTIMIZED=true`, optional `BASE_PATH`, optional `ANALYZE=true`.

Setup steps:

1. Install or select Node 20.
2. Run `corepack enable`.
3. Run `corepack prepare yarn@3.6.1 --activate`.
4. Run `yarn install --immutable`.
5. Recreate environment variables manually if comments, analytics, or newsletter are required.

Smoke test:

1. Run `yarn dev`.
2. Visit `http://localhost:3000`.
3. Check `/`, `/research`, `/blog`, `/blog/placeholder-blog-preview`, `/tags`, and `/news`.
4. Confirm images under `/static/images/...` load.
5. Confirm the search button opens and returns results after `public/search.json` exists.

Full reproduction:

1. Run setup steps.
2. For static export parity with CI, run `EXPORT=true UNOPTIMIZED=true yarn build`.
3. Verify `out/` exists and includes route HTML, static assets, `feed.xml`, and `tags/*/feed.xml`.
4. For normal server mode, run `yarn build` then `yarn start` or `yarn serve`.
5. Run `yarn lint` before PRs, expecting it to edit files because it uses `--fix`.

## 10. Known Pitfalls and Risks

- Metadata is stale: `siteUrl`, `siteRepo`, top-level email, social links, README badges, footer theme
  link, and issue/funding templates still reference starter/default values.
- `/about` content is not production-ready; it contains an explicit test line.
- Many blog posts are starter/sample content. The newest custom-looking post is
  `data/blog/placeholder-blog-preview.mdx`, itself labeled placeholder.
- `app/tag-data.json` includes `hello` from a draft post, suggesting it was generated in development.
- Draft filtering is environment-dependent. In development, `allCoreContent` does not filter drafts;
  in production it does.
- `package.json` declares `next: "latest"` even though the lockfile resolves Next 16.1.6. Always use
  the lockfile for reproducibility.
- `yarn lint` uses `next lint --fix`; compatibility should be verified with the lockfile-resolved Next
  version.
- `next-env.d.ts` is dirty and references `.next/types/routes.d.ts`; on a fresh machine `.next/` will
  not exist until a dev/build run.
- `ThemeProviders` is a no-op while many dark-mode classes and `ThemeSwitch.tsx` remain. Theme behavior
  may not match the presence of dark classes.
- `css/tailwind.css` sets `--font-sans` to `var(--font-space-grotesk)` but `app/layout.tsx` imports
  Inter as `--font-inter`, so typography intent should be verified.
- `next.config.js` omits headers entirely in export mode, so CSP/security headers are not part of the
  static GitHub Pages output.
- Generated feeds/search are ignored and can be stale locally; regenerate after content/metadata edits.
- The current site was not visually or build-verified in this transfer scan.

## 11. Open Questions

- What is the intended production `siteUrl`: GitHub Pages URL, custom domain, or Vercel?
- Should `siteRepo` point to `JieDeanZhong/JieDeanZhong.github.io` for edit links?
- Which starter posts should remain, and which should be deleted or replaced?
- Should `/about` be the old Contentlayer author page or should root profile content move there?
- Are comments, analytics, search, and newsletter intended to be active?
- Should dark mode be fully removed, restored, or left as partial dormant code?
- Should `next` be pinned instead of `latest`?
- Should generated `app/tag-data.json` be regenerated in production mode to exclude draft tags?
- Are the placeholder images/blog post meant to ship publicly?
- Does the current GitHub Pages workflow pass after the latest dependency lockfile update?

## 12. Recommended Next Actions

Immediate:

- Run `corepack enable && corepack prepare yarn@3.6.1 --activate && yarn install --immutable`.
- Run `yarn dev` and visually verify `/`, `/research`, `/blog`, `/tags`, `/news`, and `/about`.
- Update `data/siteMetadata.js` with the real site URL, repo URL, social links, email, and integration
  choices.
- Decide whether `data/authors/default.mdx` test content and starter blog posts should be public.
- Regenerate `app/tag-data.json` in the intended production environment if draft tags should disappear.

After migration:

- Run `EXPORT=true UNOPTIMIZED=true yarn build` to match GitHub Pages CI.
- Verify `out/` contents, root route, blog post routes, tag routes, static images, RSS, and search.
- Confirm GitHub Pages settings and custom domain/base path, if any.
- Recreate env vars manually from `.env.example`.

Later optimization:

- Replace README with project-specific documentation.
- Remove or rewire unused files: `app/Main.tsx`, `components/LayoutWrapper.tsx`, `ThemeSwitch.tsx`.
- Pin `next` to an explicit version once build is confirmed.
- Decide on a single About/profile content strategy.
- Clean starter issue templates and funding metadata.

Low priority:

- Audit CSS/font tokens and dark-mode classes.
- Customize favicon/social banner/logo assets.
- Add automated tests or at least a scripted smoke check.

## 13. Evidence Log

- Commands used: `git status --short --branch`, `git log --oneline --decorate --date=short`,
  `git show --stat`, `git branch -vv`, `git remote -v`, `git ls-files`, `git status --ignored`,
  `rg`, `find`, `sed`, `nl`, `du`, `wc`.
- Current git state before `_transfer/`: `## main...origin/main` with `M next-env.d.ts`.
- Key files read: `package.json`, `yarn.lock`, `.yarnrc.yml`, `next.config.js`,
  `contentlayer.config.ts`, `data/siteMetadata.js`, `data/headerNavLinks.ts`,
  `data/projectsData.ts`, `app/page.tsx`, `app/layout.tsx`, blog/tag/research/news/about routes,
  layouts, components, scripts, `.github/workflows/pages.yml`, `.env.example`, `.gitignore`,
  `.devcontainer/devcontainer.json`, `README.md`, `AGENTS.md`.
- Key generated/ignored artifacts observed: `public/feed.xml`, `public/search.json`,
  `public/tags/*/feed.xml`, `.yarn/cache`, `node_modules`.
- Important commits cited: `85b1f75`, `293b7dd`, `b8b8a7e`, `6462843`, `31a79c2`, `2f5bf78`,
  `0cbc533`, `5d560d5`, `710b524`, `5dd49e9`, `fce9224`, `82528d8`.
