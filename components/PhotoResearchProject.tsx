import { Fragment } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import ScholarPopover, { ScholarPopoverGroup } from '@/components/ScholarPopover'
import type { ResearchEntry, ResearchPhoto } from '@/data/researchData'
import scholarsData from '@/data/scholarsData'
import styles from './TrogenProject.module.css'

const contentWidth = 'mx-auto max-w-4xl px-4 sm:px-6'
const linkStyle =
  'underline underline-offset-4 decoration-gray-400 hover:decoration-current focus-visible:outline-offset-4'

export default function PhotoResearchProject({
  entry,
  photo,
}: {
  entry: ResearchEntry
  photo: ResearchPhoto
}) {
  const pis = entry.pi ? (Array.isArray(entry.pi) ? entry.pi : [entry.pi]) : []

  return (
    <article className={`${styles.page} break-words`} aria-labelledby="project-title">
      <div className="[&_a:focus-visible]:outline-primary-300 [&_button:focus-visible]:outline-primary-300 bg-black text-gray-300">
        <div className="relative">
          <div className="relative">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="100vw"
              priority
              className="block h-auto w-full"
            />
            <div
              aria-hidden="true"
              className={`${styles.gradient} pointer-events-none absolute inset-0`}
            />
          </div>
          <div className="relative -mt-6 pb-6 sm:absolute sm:inset-x-0 sm:bottom-0 sm:mt-0 sm:pb-10 lg:pb-14">
            <div className={contentWidth}>
              <h1
                id="project-title"
                className={`${styles.title} font-bold tracking-tight text-white`}
              >
                {entry.listTitle || entry.researchTitle || entry.name}
              </h1>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="project-overview"
          className={`${contentWidth} pt-6 pb-12 sm:pt-8 sm:pb-16`}
        >
          <h2
            id="project-overview"
            className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Project overview
          </h2>
          {entry.summary && <p className="mt-5 text-base leading-8 sm:text-lg">{entry.summary}</p>}

          <ScholarPopoverGroup>
            <div className="mt-7 space-y-2 text-sm leading-6 sm:text-base sm:leading-7">
              {entry.role && <p>Role: {entry.role}</p>}
              {pis.length > 0 && (
                <p>
                  {pis.length > 1 ? 'PIs: ' : 'PI: '}
                  {pis.map((pi, index) => (
                    <Fragment key={pi.name}>
                      {index > 0 && ' and '}
                      {pi.scholarId ? (
                        <ScholarPopover scholar={scholarsData[pi.scholarId]} />
                      ) : pi.url ? (
                        <Link href={pi.url} className={linkStyle}>
                          {pi.name}
                        </Link>
                      ) : (
                        pi.name
                      )}
                    </Fragment>
                  ))}
                </p>
              )}
              {entry.affiliations?.map((affiliation, index) => (
                <p key={index}>
                  {(Array.isArray(affiliation) ? affiliation : [affiliation]).map((item, i) => (
                    <Fragment key={item.name || item.url}>
                      {i > 0 && ' · '}
                      {item.url ? (
                        <Link href={item.url} className={linkStyle}>
                          {item.name}
                        </Link>
                      ) : (
                        item.name
                      )}
                    </Fragment>
                  ))}
                </p>
              ))}
              {entry.participationPeriod && <p>{entry.participationPeriod}</p>}
            </div>
          </ScholarPopoverGroup>
        </section>
      </div>

      <nav
        aria-label="Research navigation"
        className={`${contentWidth} bg-white py-10 text-base leading-7 text-gray-900`}
      >
        <Link href="/research" className={linkStyle}>
          Back to Research
        </Link>
      </nav>
    </article>
  )
}
