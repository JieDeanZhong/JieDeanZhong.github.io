import Image from 'next/image'
import Link from '@/components/Link'
import { ScholarPopoverGroup } from '@/components/ScholarPopover'
import ResearchExperienceMetadata from '@/components/ResearchExperienceMetadata'
import { researchExperiences } from '@/data/researchData'
import type { ResearchEntry, ResearchPhoto } from '@/data/researchData'
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
  const experience = researchExperiences.find((item) => item.id === entry.experience)!

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
            <ResearchExperienceMetadata
              experience={experience}
              role={entry.role}
              className="mt-7 space-y-2 text-sm leading-6 sm:text-base sm:leading-7"
            >
              {entry.participationPeriod && <p>{entry.participationPeriod}</p>}
            </ResearchExperienceMetadata>
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
