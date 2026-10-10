'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react'
import { preload } from 'react-dom'
import { Popover } from '@base-ui/react/popover'
import Image from 'next/image'
import Link from '@/components/Link'
import type { ScholarProfile } from '@/data/scholarsData'
import styles from './ScholarPopover.module.css'

// Warm and decode portraits without delaying the profile's text or links.
const portraitLoads = new Map<string, Promise<boolean>>()
const decodedPortraits = new Set<string>()

function preparePortrait(src: string) {
  let pending = portraitLoads.get(src)
  if (!pending) {
    const image = new window.Image()
    image.src = src
    pending = image
      .decode()
      .then(() => {
        decodedPortraits.add(src)
        return true
      })
      .catch(() => {
        // A failed image must not prevent access to the profile's text and links.
        portraitLoads.delete(src)
        return false
      })
    portraitLoads.set(src, pending)
  }
  return pending
}

function ScholarPortrait({ photo }: { photo: NonNullable<ScholarProfile['photo']> }) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(() =>
    decodedPortraits.has(photo.src) ? 'ready' : 'loading'
  )

  useEffect(() => {
    let current = true
    void preparePortrait(photo.src).then((ready) => {
      if (current) setStatus(ready ? 'ready' : 'error')
    })
    return () => {
      current = false
    }
  }, [photo.src])

  return (
    <div className={styles.portrait} data-state={status} aria-busy={status === 'loading'}>
      {status === 'ready' && (
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 671px) 180px, 280px"
          loading="eager"
          decoding="sync"
          unoptimized
          className={styles.photo}
        />
      )}
    </div>
  )
}

function ScholarCard({
  scholar: profile,
  popupRef,
}: {
  scholar: ScholarProfile
  popupRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <Popover.Popup
      ref={popupRef}
      className={styles.card}
      data-scholar={profile.id}
      style={
        {
          '--card-background': profile.card.background,
          '--card-foreground': profile.card.foreground,
        } as CSSProperties
      }
    >
      <div className={styles.copy}>
        <Popover.Title className={styles.name}>
          {profile.name}, <span className={styles.degree}>{profile.degree}</span>
        </Popover.Title>
        <Popover.Description className={styles.details}>
          <span className={styles.role}>{profile.title}</span>
          <span className={styles.institution}>{profile.card.institution}</span>
        </Popover.Description>
        <div className={styles.links}>
          <Link href={profile.googleScholarUrl}>Google Scholar</Link>
          {profile.institutionalProfileUrl ? (
            <Link href={profile.institutionalProfileUrl}>Profile</Link>
          ) : null}
        </div>
      </div>
      {profile.photo && <ScholarPortrait key={profile.photo.src} photo={profile.photo} />}
    </Popover.Popup>
  )
}

// One popup for the group avoids overlapping cards when switching names.
// Server-rendered page content passes through as children.
export function ScholarPopoverGroup({ children }: { children: ReactNode }) {
  const popupRef = useRef<HTMLDivElement>(null)
  const pressedTriggerRef = useRef<Element | null>(null)
  const [anchor, setAnchor] = useState<Element | null>(null)

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
    if (open && details.trigger) {
      // Related names share a stable position, including when the line wraps.
      setAnchor(details.trigger.closest('p') ?? details.trigger)
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
              anchor={anchor}
              side="bottom"
              align="start"
              sideOffset={10}
              collisionPadding={16}
              positionMethod="fixed"
              className={styles.positioner}
            >
              {scholar && <ScholarCard scholar={scholar} popupRef={popupRef} />}
            </Popover.Positioner>
          </Popover.Portal>
        </>
      )}
    </Popover.Root>
  )
}

export default function ScholarPopover({ scholar }: { scholar: ScholarProfile }) {
  if (scholar.photo) preload(scholar.photo.src, { as: 'image' })
  useEffect(() => {
    if (scholar.photo) void preparePortrait(scholar.photo.src)
  }, [scholar])

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
