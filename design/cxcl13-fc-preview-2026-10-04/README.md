# CXCL13–Fc background preview

Local preview: http://localhost:3000/research/cxcl13-fc/

The page uses the existing iGEM/FJ full-width image, bottom gradient, responsive title and content-width styles. Existing confirmed project information comes from `data/researchData.ts`; the unrelated Time Machine sample article is no longer displayed on this route.

Source: `/Users/jie/Downloads/ice.png` (unchanged). The full 3761 × 2115 composition is preserved in `public/static/images/research/cxcl13-fc/ice.webp` (quality 90, 944212 bytes). No retouching or cropping.

Browser verification: 15 checks passed, no page errors. Tested 1280, 768, 640, 390 and 320 CSS pixels, with no horizontal overflow. Research list navigation, return navigation, loaded image, metadata, PI popover and Esc verified. Existing iGEM/FJ pages checked for visual consistency.

Screenshots: `desktop.png` (1280px), `mobile.png` (390px). Reference screenshots: `trogen-reference.png`, `fj-gliding-reference.png`.

Yarn 3.6.1 production build passed. The repository `yarn lint` script fails with `unknown option --fix` under Next.js 16; equivalent direct ESLint passed for app, components, layouts, scripts and researchData. Logs and browser measurements are saved beside this file.

Local changes only; no commit, push or deployment.
