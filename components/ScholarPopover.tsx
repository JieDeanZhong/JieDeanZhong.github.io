'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { Popover } from '@base-ui/react/popover'
import Image from 'next/image'
import Link from '@/components/Link'
import type { ScholarProfile } from '@/data/scholarsData'
import styles from './ScholarPopover.module.css'

// One popup for the group avoids overlapping cards when switching names.
// Server-rendered page content passes through as children.
export function ScholarPopoverGroup({ children }: { children: ReactNode }) {
  const popupRef = useRef<HTMLDivElement>(null)
  const pressedTriggerRef = useRef<Element | null>(null)

  function handleOpenChange(open: boolean, details: Popover.Root.ChangeEventDetails) {
    if (details.reason === 'trigger-press') {
      // Hover can change the active trigger just before a click. The first click
      // on that new name should keep its card open, rather than toggle it closed.
      const isNewTrigger = pressedTriggerRef.current !== details.trigger
      pressedTriggerRef.current = details.trigger ?? null
      if (!open && isNewTrigger) {
        details.cancel()
        return
      }
    }
    if (
      !open &&
      details.reason === 'trigger-hover' &&
      popupRef.current?.contains(document.activeElement)
    ) {
      details.cancel()
      return
    }
    if (!open) pressedTriggerRef.current = null
  }

  return (
    <Popover.Root<ScholarProfile> modal={false} onOpenChange={handleOpenChange}>
      {({ payload: scholar }) => (
        <>
          {children}
          <Popover.Portal>
            <Popover.Positioner
              side="bottom"
              align="start"
              sideOffset={10}
              collisionPadding={16}
              positionMethod="fixed"
              className={styles.positioner}
            >
              {scholar && (
                <Popover.Popup
                  ref={popupRef}
                  className={styles.card}
                  data-scholar={scholar.id}
                  style={
                    {
                      '--card-background': scholar.card.background,
                      '--card-foreground': scholar.card.foreground,
                    } as CSSProperties
                  }
                >
                  <div className={styles.copy}>
                    <Popover.Title className={styles.name}>
                      {scholar.name}, <span className={styles.degree}>{scholar.degree}</span>
                    </Popover.Title>
                    <Popover.Description className={styles.details}>
                      <span className={styles.role}>{scholar.title}</span>
                      <span className={styles.institution}>{scholar.card.institution}</span>
                    </Popover.Description>
                    <div className={styles.links}>
                      <Link href={scholar.googleScholarUrl}>Google Scholar</Link>
                      <Link href={scholar.institutionalProfileUrl}>Profile</Link>
                    </div>
                  </div>
                  {scholar.photo && (
                    <div className={styles.portrait}>
                      <Image
                        src={scholar.photo.src}
                        alt={scholar.photo.alt}
                        width={scholar.photo.width}
                        height={scholar.photo.height}
                        sizes="(max-width: 599px) 160px, 310px"
                        unoptimized
                        className={styles.photo}
                      />
                    </div>
                  )}
                </Popover.Popup>
              )}
            </Popover.Positioner>
          </Popover.Portal>
        </>
      )}
    </Popover.Root>
  )
}

export default function ScholarPopover({ scholar }: { scholar: ScholarProfile }) {
  return (
    <Popover.Trigger
      payload={scholar}
      openOnHover
      delay={180}
      closeDelay={220}
      className="max-w-full cursor-pointer rounded-sm p-0 text-left text-inherit underline decoration-gray-400 decoration-dotted underline-offset-4 hover:decoration-solid focus-visible:outline-offset-4"
    >
      {scholar.name}, {scholar.degree}
    </Popover.Trigger>
  )
}
