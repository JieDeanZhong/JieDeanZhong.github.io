# Portrait framing adjustment

- Lowered Yongtao slightly to show less shirt; widened the portrait clipping area
  so his sloping left shoulder does not hit a visible internal vertical edge.
- Enlarged John to 290px on desktop and 240px on mobile, cropping more torso at
  the card bottom and giving the head more prominence.
- Enlarged Lianjun slightly for a closer head-and-shoulders balance with the
  other portraits. Kevin retains his desktop scale.
- Preserved source images, text, colors, card sizes, links, and interaction code.
- Kept portrait overflow clipped within its own area to prevent horizontal or
  vertical scroll areas caused by the intentionally oversized images.

Verified all four portraits at 1440 × 1000 and 390 × 844 CSS viewport sizes.
Also checked John and Lianjun at 320 × 760: faces, institutions, and links remain
separate; shoulder edges are natural. Recorded cards have matching scroll/client
widths. The user's existing 130% browser zoom was preserved during testing;
viewport overrides were reset afterwards.

Yarn 3.6.1 lint and production build passed. Reopened the production preview at
http://localhost:3001/research/?preview=portrait-framing#igem-2025-heading and
confirmed the final crop and absence of horizontal overflow.

Screenshots: `screenshots/framing-*.png`; geometry: `framing-results.json`.
This pass did not repeat animation timing or external destination tests, since
it only changes portrait framing. No commit or deployment performed.
