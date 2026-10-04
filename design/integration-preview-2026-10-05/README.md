# Pending site changes integrated on 2026-10-05

Based on deployed commit `a4e4df2`. The integration includes:

- Scholar popup degree suffixes and system fonts from the font worktree.
- The CXCL13–Fc photo page, reusable photo project component, and original-size
  WebP from the primary checkout.
- Pending logo exploration, refinement, preview, Illustrator, PDF, and ZIP
  deliverables, saved in `design/` and `output/`.
- Earlier header and favicon sources preserved in
  `../four-dot-header-preview-2026-10-04/superseded-source/`. The active site keeps
  the newer deployed header navigation and transparent black-block favicon.
- A working `yarn lint` command using ESLint directly with Next.js 16.

Validation completed before push:

- `yarn lint` and formatting checks passed.
- `EXPORT=true UNOPTIMIZED=true yarn build` passed, producing 73 static pages.
- Nine route and asset requests passed; results are in `routes.json`.
- Browser checks confirmed the CXCL13 image loads and replaces the unrelated
  placeholder article. Scholar popup titles include PhD and inherit the page's
  system font. Escape dismisses the popup and the back link returns to Research.
- Desktop Research navigation expands to Projects, Perspectives, Software, and
  Advisory. The current favicon version remains `four-blocks-black-v1`.
- Screenshots were reviewed at 1280px, 390px, and 320px widths. No horizontal
  overflow or browser errors were observed in the checked pages.

The other preview directories record their original creation-time state; their
references to local-only work describe the earlier previews, before integration.
