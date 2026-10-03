# Migration Checklist

## Files/Directories to Copy

- Entire git-tracked repository source.
- `app/`
- `components/`
- `layouts/`
- `css/`
- `data/`
- `scripts/`
- `public/static/images/`
- `public/static/favicons/`
- `package.json`
- `yarn.lock`
- `.yarnrc.yml`
- `.yarn/releases/yarn-3.6.1.cjs`
- `next.config.js`
- `contentlayer.config.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `prettier.config.js`
- `postcss.config.js`
- `.github/workflows/pages.yml`
- `.devcontainer/devcontainer.json` if using devcontainers/Codespaces.
- `.env.example` as a reference template only.

## Files/Directories Not to Copy

- `node_modules/`
- `.yarn/cache/`
- `.yarn/install-state.gz`
- `.next/`
- `.contentlayer/`
- `out/`
- `.vercel/`
- `coverage/`
- `.husky/_/`
- `*.log`
- `.DS_Store`
- `public/feed.xml`
- `public/search.json`
- `public/tags/`

## Files to Regenerate

- `node_modules/`: regenerate with `yarn install --immutable`.
- `.contentlayer/`: regenerate with `yarn dev` or `yarn build`.
- `.next/`: regenerate with `yarn dev` or `yarn build`.
- `out/`: regenerate with `EXPORT=true UNOPTIMIZED=true yarn build`.
- `public/feed.xml`: regenerate with `yarn build` without `EXPORT`, or `out/feed.xml` with `EXPORT`.
- `public/tags/*/feed.xml`: regenerate through `scripts/rss.mjs`.
- `public/search.json`: regenerate through Contentlayer KBar search index generation.
- `app/tag-data.json`: regenerate through Contentlayer in the intended environment if tag counts look
  stale or include draft tags.

## Secrets/Configs to Recreate Manually

Do not copy real `.env.local` or production secrets. Recreate only where needed:

- `NEXT_UMAMI_ID`
- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`
- `BUTTONDOWN_API_KEY`
- `MAILCHIMP_API_KEY`, `MAILCHIMP_API_SERVER`, `MAILCHIMP_AUDIENCE_ID`
- `CONVERTKIT_API_KEY`, `CONVERTKIT_FORM_ID`
- `KLAVIYO_API_KEY`, `KLAVIYO_LIST_ID`
- `REVUE_API_KEY`
- `EMAILOCTOPUS_API_KEY`, `EMAILOCTOPUS_LIST_ID`
- `BEEHIIV_API_KEY`, `BEEHIIV_PUBLICATION_ID`

Also manually confirm:

- Real `siteUrl` in `data/siteMetadata.js`.
- Real `siteRepo` in `data/siteMetadata.js`.
- Real social links and email.
- GitHub Pages settings and any custom domain.
- Optional `BASE_PATH` if the site is deployed under a subpath.

## Environment Checks

- Node major version is 20.
- Corepack is enabled.
- `yarn --version` reports `3.6.1`.
- `yarn install --immutable` succeeds without changing `yarn.lock`.
- `.yarnrc.yml` still says `nodeLinker: node-modules`.
- `git status` is understood before running format/lint/build. Note that `next-env.d.ts` was already
  modified before this transfer package.
- No real secrets are present in tracked files.

## Data Checks

- `data/blog/` contains 12 MDX files after migration.
- `data/authors/` contains 2 MDX files after migration.
- `public/static/images/` contains 20 tracked image files.
- `public/static/favicons/` contains 9 tracked favicon/manifest files.
- `data/blog/my-fancy-title.mdx` is the only known draft post.
- Decide whether starter/sample posts should remain.
- Decide whether `data/blog/placeholder-blog-preview.mdx` and its two placeholder images should remain.
- Check `data/authors/default.mdx`; body currently contains a test line.
- Check `data/siteMetadata.js`; `siteUrl` and `siteRepo` currently point to upstream starter values.
- Check `app/tag-data.json`; it currently includes `hello`, which is draft-derived.

## Smoke Test

Run:

```bash
yarn dev
```

Then verify:

- `/` renders custom profile homepage.
- Header signature image loads from `/static/images/signature-latest.png`.
- Homepage portrait loads from `/static/images/upper-body-trans.png`.
- Homepage background pattern loads from `/static/images/spikes.png`.
- `/research` renders project cards.
- `/blog` renders a post list.
- `/blog/placeholder-blog-preview` renders images and MDX content.
- `/tags` renders tag counts.
- `/news` renders placeholder page.
- `/about` renders, then decide whether its test content is acceptable.
- Search button opens; if results are empty, regenerate `public/search.json`.

## Full Validation Checklist

- `yarn install --immutable` passes.
- `yarn dev` starts on `http://localhost:3000`.
- Root, research, blog, tag, news, about, and individual post routes render.
- Images and favicons load.
- Contentlayer generates without errors.
- `app/tag-data.json` matches intended draft policy.
- `public/search.json` is generated and search works.
- `yarn lint` passes or required lint-script migration is documented.
- `yarn build` passes for normal build mode.
- `EXPORT=true UNOPTIMIZED=true yarn build` passes for GitHub Pages mode.
- `out/` contains route output, static assets, `feed.xml`, and `tags/*/feed.xml`.
- RSS links and structured metadata use the real domain, not starter domain.
- GitHub Actions Pages workflow succeeds on `main`.
- No secret values are committed.

## Definition of Successful Migration

- A fresh machine can install dependencies from the tracked lockfile using Yarn 3.6.1.
- `yarn dev` renders the site locally without manual code changes.
- `EXPORT=true UNOPTIMIZED=true yarn build` produces a complete `out/` suitable for GitHub Pages.
- The migrated site has correct production metadata, social links, repository links, and optional env
  integrations.
- The maintainer has intentionally accepted or removed all starter/sample/placeholder content.
- Generated artifacts are regenerated on the new machine and not treated as source of truth.
- GitHub Pages deployment succeeds from `main`.
