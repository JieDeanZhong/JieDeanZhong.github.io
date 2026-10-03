# Scholar popover integration

`ScholarPopover` is a client component; import it from an existing server component
without moving page metadata or the rest of the Research page into a client boundary.

```tsx
import ScholarPopover from '@/components/ScholarPopover'
import scholarsData from '@/data/scholarsData'

<ScholarPopover scholar={scholarsData['lianjun-zhang']} />
<ScholarPopover scholar={scholarsData['yongtao-zhu']} />
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

In this checkout, `app/research/page.tsx` still renders the template cards from
`data/projectsData.ts` (TroGen with sample copy, plus The Time Machine).
Neither professor nor either old institutional biography URL appears in the current
Research sources. There is consequently no existing name or personal-profile link
to replace. The component, both profiles, and photographs are ready for integration
when the intended Research content is brought into this checkout. No project–PI
relationship or research content has been added.

Official API: https://base-ui.com/react/components/popover
