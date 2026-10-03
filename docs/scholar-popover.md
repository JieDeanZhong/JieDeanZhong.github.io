# Scholar popover integration

`ScholarPopover` is a client component; import it from an existing server component
without moving page metadata or the rest of the Research page into a client boundary.

```tsx
import ScholarPopover from '@/components/ScholarPopover'
import scholarsData from '@/data/scholarsData'

<ScholarPopover scholar={scholarsData['lianjun-zhang']} />
<ScholarPopover scholar={scholarsData['yongtao-zhu']} />
<ScholarPopover scholar={scholarsData['kevin-chan']} />
```

The trigger renders a button. Do not wrap it in a link. Profiles, institutions,
email addresses and optional portraits live in `data/scholarsData.ts`.
Use each profile's `institutionalProfileUrl` for existing links to that person's
institutional biography; retain project wiki and organization homepage links for
their original purposes. Missing photos render no image or placeholder.

The component uses Base UI's native hover support (`openOnHover`, `delay={250}`,
`closeDelay={180}`), Portal positioning and nonmodal focus management. It also
supports click/touch, keyboard activation, Escape, outside dismissal, and copying
individual email addresses. Portraits use local, unoptimized `next/image` sources
so the component works with the site's static export configuration.

## Current integration status

`app/research/page.tsx` renders `ResearchList`, which uses each PI's `scholarId`
from `data/researchData.ts` to display the shared popover. The five triggers cover
TroGen (Yongtao Zhu and Kevin Chun Chan), FJ Gliding (Yongtao Zhu), and both
CXCL13–Fc and Spotlight (Lianjun Zhang).

All three profiles include local portraits. The card places plain institution
text below the name beside the portrait; the separate Profile link opens the
institutional biography. Cards adapt to the institution text on desktop and wrap
within the viewport on small screens.

Official API: https://base-ui.com/react/components/popover
