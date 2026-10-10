# Photoshop portrait cutouts — 2026-10-10

## Source and editing

Originals came from `/Users/jie/Downloads/Website/original_portraits/`:

- `John Moroas.jpg` → `john-moraros.psd` / `john-moraros-ps-cutout.webp`
- `Kevin_portrait.png` → `kevin-chan.psd` / `kevin-chan-ps-cutout.webp`
- `Lianjun_portrait.png` → `lianjun-zhang.psd` / `lianjun-zhang-ps-cutout.webp`
- `Yongtao_portrait.png` → `yongtao-zhu.psd` / `yongtao-zhu-ps-cutout.webp`

Edited through Adobe Photoshop 2026: Select Subject, Select and Mask, Refine Hair
for the three portraits with hair, Smooth 1, Feather 0.3px, Shift Edge -5%.
Refined selections were applied as non-destructive layer masks. Originals were
not overwritten. PSDs retain the source pixels and editable masks in `photoshop/`.
The pre-existing unsaved John document in Photoshop was left untouched.

Photoshop exported full-resolution, lossless WebP copies without metadata to
`public/static/images/people/`. All four files have alpha values spanning 0–255.
Canvas dimensions match the originals, so the existing portrait crops and card
colors remain unchanged. John’s CSS gradient masks were removed; the card now
shows its solid background through his transparent portrait.

## Local verification

- Yarn 3.6.1 lint: passed.
- Production build and postbuild: passed; 73 pages generated.
- All four portraits inspected at 1440 × 1000 and 390 × 844.
- At 320 × 760, all four cards are 288 × 284, remain within the viewport, and
  show decoded transparent portraits without horizontal overflow.
- Switching among the four names displays the matching portrait and information.
- Keyboard Enter opens John’s card and focuses Google Scholar. Its focus outline
  is visible; Escape closes the card and returns focus to the name.
- Existing external link destination, `_blank`, and `noopener noreferrer` verified.
- Overview and sampled project routes return HTTP 200. The overview and CD8 detail
  HTML include the new image references.

This image-only pass did not repeat the previous full animation timing,
reduced-motion, hover-delay, or remote link destination tests. Interaction code
was not changed.

## Screenshots

For each of `john`, `kevin`, `lianjun`, and `yongtao`, compare
`screenshots/ps-before-NAME-desktop.jpg` with
`screenshots/ps-after-NAME-desktop.jpg`.

Mobile captures: `screenshots/ps-after-NAME-mobile.jpg`.
Additional checks: `ps-after-lianjun-mobile-320.jpg` and
`ps-after-john-keyboard.jpg`.

Local preview: http://localhost:3001/research/?preview=photoshop-cutouts#igem-2025-heading
No commit or deployment performed.
