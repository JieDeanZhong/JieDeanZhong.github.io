import Image from 'next/image'
import Link from '@/components/Link'
import fj from '@/data/fjData'
import styles from './TrogenProject.module.css'

const contentWidth = 'mx-auto max-w-4xl px-4 sm:px-6'
const headingStyle = 'text-2xl font-semibold tracking-tight sm:text-3xl'
const linkStyle =
  'underline underline-offset-4 decoration-gray-400 hover:decoration-current focus-visible:outline-offset-4'

export default function FjProject() {
  return (
    <article className={`${styles.page} break-words`} aria-labelledby="fj-title">
      <div className="[&_a:focus-visible]:outline-primary-300 bg-black text-gray-300">
        <div className="relative">
          <div className="relative">
            <Image
              src={fj.photo.src}
              alt={fj.photo.alt}
              width={fj.photo.width}
              height={fj.photo.height}
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
              <h1 id="fj-title" className={`${styles.title} font-bold tracking-tight text-white`}>
                {fj.titlePrefix} <i>{fj.species}</i>
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
          <p className="mt-5 text-base leading-8 sm:text-lg">{fj.summary}</p>

          <div className="mt-7 space-y-2 text-sm leading-6 sm:text-base sm:leading-7">
            <p>Role: {fj.role}</p>
            <p>
              Supervisor:{' '}
              <Link href={fj.pi.url} className={linkStyle}>
                {fj.pi.name}
              </Link>
            </p>
            <p>{fj.institution}</p>
            <p>{fj.participationPeriod}</p>
          </div>
        </section>
      </div>

      <div className="bg-white text-gray-700">
        <div className={`${contentWidth} space-y-10 py-12 sm:space-y-12 sm:py-16`}>
          {fj.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id} className={`${headingStyle} text-gray-900`}>
                {section.title}
              </h2>
              <p
                className={`mt-4 text-base leading-8 sm:text-lg ${section.body ? '' : 'text-gray-500'}`}
              >
                {section.body || section.placeholder}
              </p>
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
