'use client'

import { useRef, useState } from 'react'
import { Popover } from '@base-ui/react/popover'
import Image from 'next/image'
import Link from '@/components/Link'
import type { ScholarProfile } from '@/data/scholarsData'

const linkStyle =
  'underline decoration-gray-400 underline-offset-4 hover:text-gray-900 focus-visible:outline-offset-4'

function ScholarEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
  }

  return (
    <li>
      <div className="flex items-start justify-between gap-3">
        <a href={`mailto:${email}`} className={`${linkStyle} min-w-0 [overflow-wrap:anywhere]`}>
          {email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          aria-label={`Copy ${email}`}
          className="shrink-0 rounded px-1 text-xs leading-6 text-gray-600 hover:text-gray-900 focus-visible:outline-offset-2"
        >
          {status === 'copied' ? 'Copied' : 'Copy'}
        </button>
      </div>
      <span
        role="status"
        className={status === 'error' ? 'block text-xs text-gray-600' : 'sr-only'}
      >
        {status === 'copied' && `Copied ${email}`}
        {status === 'error' && 'Could not copy. Select the email address to copy it manually.'}
      </span>
    </li>
  )
}

export default function ScholarPopover({ scholar }: { scholar: ScholarProfile }) {
  const popupRef = useRef<HTMLDivElement>(null)
  const label = `${scholar.name}, ${scholar.degree}`

  function handleOpenChange(open: boolean, details: Popover.Root.ChangeEventDetails) {
    // Leaving with the pointer must not dismiss a card still being used with the keyboard.
    if (
      !open &&
      details.reason === 'trigger-hover' &&
      popupRef.current?.contains(document.activeElement)
    ) {
      details.cancel()
    }
  }

  return (
    <Popover.Root modal={false} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        openOnHover
        delay={250}
        closeDelay={180}
        className="max-w-full cursor-pointer rounded-sm p-0 text-left text-inherit underline decoration-gray-400 decoration-dotted underline-offset-4 hover:decoration-solid focus-visible:outline-offset-4"
      >
        {label}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          side="bottom"
          align="start"
          sideOffset={8}
          collisionPadding={16}
          positionMethod="fixed"
          className="z-60"
        >
          <Popover.Popup
            ref={popupRef}
            className="w-[360px] max-w-[calc(100vw-2rem)] origin-[var(--transform-origin)] overflow-y-auto rounded-xl border border-gray-200 bg-white p-5 text-sm leading-6 text-gray-700 shadow-lg transition-[opacity,transform] duration-150 outline-none data-[ending-style]:opacity-0 data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0 motion-reduce:transition-none"
            style={{ maxHeight: 'var(--available-height)' }}
          >
            <div className="flex items-center gap-3">
              {scholar.photo && (
                <Image
                  src={scholar.photo.src}
                  alt={scholar.photo.alt}
                  width={56}
                  height={56}
                  sizes="56px"
                  unoptimized
                  className="h-14 w-14 shrink-0 rounded-md object-cover"
                  style={{ objectPosition: scholar.photo.objectPosition ?? 'center' }}
                />
              )}
              <Popover.Title className="min-w-0 text-base leading-6 font-semibold text-gray-900">
                {label}
              </Popover.Title>
            </div>

            <Popover.Description className="mt-4">
              <Link href={scholar.institutionalProfileUrl} className={linkStyle}>
                {scholar.institutions.map((institution) => (
                  <span key={institution} className="block">
                    {institution}
                  </span>
                ))}
              </Link>
            </Popover.Description>

            <ul aria-label="Email addresses" className="mt-4 space-y-2">
              {scholar.emails.map((email) => (
                <ScholarEmail key={email} email={email} />
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <Link href={scholar.googleScholarUrl} className={linkStyle}>
                Google Scholar
              </Link>
              <Link href={scholar.institutionalProfileUrl} className={linkStyle}>
                Institutional profile
              </Link>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
