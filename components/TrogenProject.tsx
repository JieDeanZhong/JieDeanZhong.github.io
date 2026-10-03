import { Fragment } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import trogen from '@/data/trogenData'
import styles from './TrogenProject.module.css'

const contentWidth = 'mx-auto max-w-4xl px-4 sm:px-6'
const headingStyle = 'text-2xl font-semibold tracking-tight sm:text-3xl'
const linkStyle =
  'underline underline-offset-4 decoration-gray-400 hover:decoration-current focus-visible:outline-offset-4'

export default function TrogenProject() {
  return (
    <article className={`${styles.page} break-words`} aria-labelledby="trogen-title">
      <div className="bg-black text-gray-300">
        <div className="relative">
          <div className="relative">
            <Image
              src={trogen.photo.src}
              alt={trogen.photo.alt}
              width={trogen.photo.width}
              height={trogen.photo.height}
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
                id="trogen-title"
                className={`${styles.title} font-bold tracking-tight text-white`}
              >
                {trogen.title}
              </h1>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="project-overview"
          className={`${contentWidth} pt-6 pb-12 sm:pt-8 sm:pb-16`}
        >
          <h2 id="project-overview" className={`${headingStyle} text-white`}>
            Project overview
          </h2>
          <p className="mt-5 text-base leading-8 sm:text-lg">{trogen.summary}</p>

          <div className="mt-7 space-y-2 text-sm leading-6 sm:text-base sm:leading-7">
            <p>Role: {trogen.role}</p>
            <p>
              PIs:{' '}
              {trogen.pis.map((pi, index) => (
                <Fragment key={pi.name}>
                  {index > 0 && ' and '}
                  {pi.url ? (
                    <Link href={pi.url} className={linkStyle}>
                      {pi.name}
                    </Link>
                  ) : (
                    pi.name
                  )}
                </Fragment>
              ))}
            </p>
            <p>
              {trogen.context.map((item, index) => (
                <Fragment key={item.name}>
                  {index > 0 && ' · '}
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
            <p>{trogen.participationPeriod}</p>
          </div>

          <p className="mt-7 text-base leading-7 text-white">
            <Link href={trogen.wiki} className={linkStyle}>
              Visit project wiki
            </Link>
          </p>
        </section>
      </div>

      <div className="bg-white text-gray-700">
        <div className={`${contentWidth} space-y-10 py-12 sm:space-y-12 sm:py-16`}>
          {trogen.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id} className={`${headingStyle} text-gray-900`}>
                {section.title}
              </h2>
              {section.subtitle && (
                <h3 className="mt-5 text-lg leading-7 font-semibold text-gray-900">
                  {section.subtitle}
                </h3>
              )}
              <p className="mt-4 text-base leading-8 sm:text-lg">{section.body}</p>
              {section.links && (
                <ul className="mt-4 space-y-2 text-base leading-7 text-gray-900">
                  {section.links.map((link) => (
                    <li key={link.url}>
                      <Link href={link.url} className={linkStyle}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <nav aria-label="Research navigation" className="text-base leading-7 text-gray-900">
            <Link href="/research" className={linkStyle}>
              Back to Research
            </Link>
          </nav>
        </div>
      </div>
    </article>
  )
}
