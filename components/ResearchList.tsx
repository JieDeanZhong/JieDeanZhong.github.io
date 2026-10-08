import Link from '@/components/Link'
import ResearchExperienceMetadata from '@/components/ResearchExperienceMetadata'
import { researchExperiences, researchTypes } from '@/data/researchData'
import type { ResearchEntry } from '@/data/researchData'

function ResearchTitle({ title, italicText }: { title: string; italicText?: string }) {
  const italicTitleText = italicText?.trim()
  const italicStart = italicTitleText ? title.indexOf(italicTitleText) : -1
  if (!italicTitleText || italicStart < 0) return title

  return (
    <>
      {title.slice(0, italicStart)}
      <i>{italicTitleText}</i>
      {title.slice(italicStart + italicTitleText.length)}
    </>
  )
}

function ResearchItem({ entry }: { entry: ResearchEntry }) {
  const title = entry.listTitle?.trim() || entry.researchTitle?.trim() || entry.name.trim()
  const titleContent = <ResearchTitle title={title} italicText={entry.italicTitleText} />
  const period = entry.participationPeriod?.trim() || entry.eventPeriod?.trim() || 'Date TBC'
  const isSupporting = entry.level === 'supporting'
  const Heading = isSupporting ? 'h4' : 'h3'

  return (
    <article aria-labelledby={`${entry.id}-title`} className="min-w-0 break-words">
      <Heading
        id={`${entry.id}-title`}
        className={
          isSupporting
            ? 'text-base leading-6 font-medium text-gray-700 sm:text-lg sm:leading-7 dark:text-gray-200'
            : 'text-xl leading-7 font-bold text-gray-900 sm:text-2xl sm:leading-8 dark:text-gray-100'
        }
      >
        {entry.hasDetailPage ? (
          <Link
            href={`/research/${entry.id}`}
            className="decoration-gray-400 underline-offset-4 hover:underline focus-visible:underline"
          >
            {titleContent}
          </Link>
        ) : (
          titleContent
        )}
      </Heading>
      <p
        className={`flex flex-wrap items-baseline gap-x-2 text-sm leading-6 text-gray-500 dark:text-gray-400 ${isSupporting ? 'mt-1' : 'mt-2'}`}
      >
        <span>{researchTypes[entry.type]}</span>
        <span aria-hidden="true">·</span>
        <span>{period}</span>
      </p>
    </article>
  )
}

export default function ResearchList({ entries }: { entries: readonly ResearchEntry[] }) {
  return (
    <div className="space-y-12 pt-8 pb-10 sm:space-y-16 sm:pt-10 sm:pb-12">
      {researchExperiences.map((experience, index) => {
        const experienceEntries = entries.filter((entry) => entry.experience === experience.id)
        const primaryEntries = experienceEntries.filter((entry) => entry.level === 'primary')
        const supportingEntries = experienceEntries.filter((entry) => entry.level === 'supporting')

        return (
          <section
            key={experience.id}
            aria-labelledby={`${experience.id}-heading`}
            className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 border-t border-gray-200 pt-6 first:border-t-0 first:pt-0 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-x-4 sm:pt-8 dark:border-gray-700"
          >
            <span
              aria-hidden="true"
              className="pt-1 text-sm leading-6 text-gray-500 tabular-nums dark:text-gray-400"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <header className="min-w-0">
              <h2
                id={`${experience.id}-heading`}
                className="text-2xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100"
              >
                <ResearchTitle title={experience.title} italicText={experience.italicTitleText} />
              </h2>
              <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                {experience.description}
              </p>
              <ResearchExperienceMetadata experience={experience} />
            </header>
            <div className="col-start-2 min-w-0">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {primaryEntries.map((entry) => (
                  <li key={entry.id} className="py-6 sm:py-7">
                    <ResearchItem entry={entry} />
                  </li>
                ))}
              </ul>
              {supportingEntries.length > 0 && (
                <section
                  aria-labelledby={`${experience.id}-supporting-heading`}
                  className="mt-1 ml-2 border-l border-gray-200 pl-4 sm:ml-3 sm:pl-6 dark:border-gray-700"
                >
                  <h3 id={`${experience.id}-supporting-heading`} className="sr-only">
                    Supporting work
                  </h3>
                  <ul className="space-y-5 py-1">
                    {supportingEntries.map((entry) => (
                      <li key={entry.id}>
                        <ResearchItem entry={entry} />
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
