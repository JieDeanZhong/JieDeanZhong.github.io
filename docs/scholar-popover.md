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
`ResearchList` as children to the client group. The five name buttons come from
`data/researchData.ts`: TroGen (Yongtao and Kevin), FJ Gliding (Yongtao), CXCL13–Fc
and Spotlight (Lianjun).

## Content and appearance

`data/scholarsData.ts` holds names, degrees, academic titles, full institutions,
original email data and individually verified external links. `card` holds the
short display institution and colors sampled from the embedded Keynote photos.
The card intentionally hides degrees, emails and copy controls; the inline name
button retains its original degree label. External links retain the shared
`Link` component's `_blank` / `noopener noreferrer` behavior.

`ScholarPopover.module.css` defines the horizontal layout, restrained shadow and
thin edge. Each portrait is a transparent image, positioned separately from the
solid background and real HTML text. Narrow viewports move the name above the
text/portrait area. The original, uncropped Keynote photos and transparent PNG
masters live in `design/scholar-cards-2026-10-04/`; runtime images are full-resolution,
lossless transparent WebP files in `public/static/images/people/`.

## Interaction

Base UI provides mouse hover (180ms open / 220ms close delay), click, touch,
keyboard activation, focus management, Escape and outside dismissal. The hover
bridge keeps links reachable; pointer exit does not close a popup whose contents
still have keyboard focus. The first click on another name keeps that person's
card open, including when pointer hover changed the active name immediately
before the click. A repeated click closes it.

The popup is portalled to the document body, uses fixed positioning and 16px
collision padding, and can flip above or shift sideways near viewport edges.
It does not change the text layout. Entry combines a 4px offset, 3% horizontal
scale and fade over 160–200ms; exit lasts 110ms. Person switching skips transitions.
`prefers-reduced-motion` disables transitions and transforms. No new runtime
dependencies are required. `next/image` remains unoptimized for static exports.

## Validation

See `design/scholar-cards-2026-10-04/acceptance.md`, `browser-results.json`,
`asset-manifest.json` and the `screenshots/` folder for the 2026-10-04 acceptance.
The browser script covers actual mouse/keyboard/touch interactions and link
opening in Chromium, including narrow viewports and repeated name entries.

Official API: https://base-ui.com/react/components/popover
