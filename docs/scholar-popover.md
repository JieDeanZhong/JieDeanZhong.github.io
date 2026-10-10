# Scholar popover integration

`ScholarPopover` renders a name button. Put related names inside one
`ScholarPopoverGroup`; the group owns a single Base UI popover and renders the
active trigger's profile payload. This prevents overlapping cards when switching
people. Do not wrap the name button in a link.

```tsx
import ScholarPopover, { ScholarPopoverGroup } from '@/components/ScholarPopover'
import scholarsData from '@/data/scholarsData'

export default function People() {
  return (
    <ScholarPopoverGroup>
      <ScholarPopover scholar={scholarsData['lianjun-zhang']} />
      <ScholarPopover scholar={scholarsData['yongtao-zhu']} />
      <ScholarPopover scholar={scholarsData['kevin-chan']} />
    </ScholarPopoverGroup>
  )
}
```

The Research route stays a server component and passes its server-rendered
`ResearchList` as children to the client group. The overview's five name buttons come from `data/researchData.ts`: CD8 (Lianjun),
iGEM (Yongtao, Kevin and John), and FJ (Yongtao). Project detail pages reuse the group.

## Content and appearance

`data/scholarsData.ts` holds names, degrees, academic titles, full institutions,
original email data and individually verified external links. `card` holds the
short display institution and colors sampled from the embedded Keynote photos.
Both card headings and inline name buttons include the degree. Emails and copy
controls are not displayed. The institutional profile link is optional; unavailable profiles are omitted rather
than displayed as broken links. External links retain the shared
`Link` component's `_blank` / `noopener noreferrer` behavior.

`ScholarPopover.module.css` defines the horizontal layout, restrained shadow and
thin, 1.5px bottom edge with only 0.5px of right offset. Paper edge and floating
shadow use separate CSS variables. All desktop cards are 640px wide; narrow
viewports keep 16px of clearance on both sides. Each portrait is a transparent image, positioned separately from the
solid background and real HTML text. Narrow viewports move the name above the
text/portrait area. All four portraits now use Photoshop cutouts of the supplied
original photographs. Editable PSDs with layer masks live in
`design/scholar-cards-2026-10-10/photoshop/`; runtime images are full-resolution,
lossless transparent `*-ps-cutout.webp` files in `public/static/images/people/`.
The photographs retain their original canvas dimensions. CSS frames them as
head-and-shoulders portraits: John and Lianjun are enlarged, while Yongtao is
lowered slightly to show less shirt. The portrait viewport includes extra room
on the left for sloping shoulders, preventing an internal vertical cut without
adding scrollable overflow to the card.
John no longer needs CSS gradient masks to conceal the original background.
The original, uncropped Keynote photos and earlier transparent PNG masters
remain in `design/scholar-cards-2026-10-04/` for reference.

## Interaction

Base UI provides mouse hover (180ms open / 220ms close delay), click, touch,
keyboard activation, focus management, Escape and outside dismissal. The hover
bridge keeps links reachable; pointer exit does not close a popup whose contents
still have keyboard focus. The first click on another name keeps that person's
card open, including when pointer hover changed the active name immediately
before the click. A repeated click closes it.

The popup is portalled to the document body, uses fixed positioning and 16px
collision padding, and can flip above or shift sideways near viewport edges.
Related names in the same paragraph share a positioning anchor, so switching
between them does not move the card. Moving to another paragraph changes the
anchor. Entry uses opacity and a 4px translation over 170ms, toward the final
position from the trigger side. Text and photos are never scaled. Exit changes
only opacity over 110ms. `prefers-reduced-motion` disables all transitions,
including exit, and removes entry translations.

One unkeyed popup remains mounted when changing people. Names, colors and links
update immediately; only the portrait waits for its image to preload and decode.
The portrait region exposes `data-state="loading|ready|error"` and `aria-busy` for
a future loading indicator. It keeps its space while loading or after a failure,
without hiding the profile text or links. Each portrait is keyed by its source,
so a late image cannot replace the newly selected person. Switching has no extra
content animation. No new runtime dependencies are required. `next/image` remains
unoptimized for static exports.

## Validation

See `design/scholar-cards-2026-10-10/acceptance.md` for the current local checks,
before/after screenshots, switching samples, and explicitly unverified items.

See `design/scholar-cards-2026-10-04/acceptance.md`, `browser-results.json`,
`asset-manifest.json` and the `screenshots/` folder for the 2026-10-04 acceptance.
The browser script covers actual mouse/keyboard/touch interactions and link
opening in Chromium, including narrow viewports and repeated name entries.

Official API: https://base-ui.com/react/components/popover
