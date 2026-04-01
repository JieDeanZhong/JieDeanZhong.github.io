# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js App Router site customized from a blog starter. Route files live in `app/`, shared UI in `components/`, and page-level templates in `layouts/`. Content and site configuration live under `data/`, including blog posts in `data/blog/`, author profiles in `data/authors/`, and metadata files such as `data/siteMetadata.js`. Static assets belong in `public/static/`. Build helpers such as RSS generation live in `scripts/`.

## Build, Test, and Development Commands

Use Yarn 3.6.1 for local work.

- `yarn dev`: start the local dev server on `http://localhost:3000`.
- `yarn build`: create a production build and run post-build generation tasks.
- `yarn start` or `yarn serve`: serve the production build locally.
- `yarn analyze`: build with bundle analysis enabled.
- `yarn lint`: run Next.js ESLint rules with `--fix` across `app`, `components`, `layouts`, and related directories.

## Coding Style & Naming Conventions

TypeScript and React files use 2-space indentation, single quotes, no semicolons, trailing commas where valid, and a 100-character line width. Formatting is defined in `prettier.config.js`; Tailwind class sorting is handled by `prettier-plugin-tailwindcss`. ESLint uses the flat config in `eslint.config.mjs` with Next.js core-web-vitals and TypeScript rules.

Use `PascalCase` for React components (`ThemeSwitch.tsx`), `camelCase` for data/config modules (`projectsData.ts`), and lowercase nested paths for content slugs (`data/blog/nested-route/...`). Keep route files in the App Router convention: `page.tsx`, `layout.tsx`, `route.ts`.

## Testing Guidelines

There is no dedicated automated test suite in this repository yet. Treat `yarn lint` and a production build via `yarn build` as the minimum pre-PR checks. For content or UI changes, verify the affected routes locally and confirm MDX pages, tag pages, and static assets still render correctly.

## Commit & Pull Request Guidelines

Recent commits use short, lowercase, descriptive subjects such as `deleting dark mode` and `new profile pic update`. Follow that style: keep subjects brief, imperative or descriptive, and scoped to one change. Pull requests should include a clear summary, note any content or config changes, link the related issue if one exists, and attach screenshots for visible UI updates.

## Content & Configuration Notes

When editing blog content, keep frontmatter aligned with `contentlayer.config.ts`. If you add images, place them under `public/static/images/` and reference them with stable paths. Changes to metadata, navigation, or SEO behavior usually belong in `data/siteMetadata.js`, `data/headerNavLinks.ts`, or `app/seo.tsx`.
