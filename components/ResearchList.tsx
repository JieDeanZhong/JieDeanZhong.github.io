import Link from '@/components/Link'
import ResearchExperienceMetadata from '@/components/ResearchExperienceMetadata'
import { researchExperiences, researchTypes } from '@/data/researchData'
import type { ResearchEntry, ResearchType } from '@/data/researchData'
import styles from './ResearchList.module.css'

const projectGroupClassName = 'border-t border-gray-200 py-4 sm:py-5 dark:border-gray-700'

function ResearchTypeBadge({ type, label }: { type: ResearchType; label?: string }) {
  return (
    <span className="inline-block shrink-0 rounded-sm bg-gray-200/60 px-2 py-0.5 text-xs leading-5 font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
      {label || researchTypes[type]}
    </span>
  )
}

function ResearchText({ text, italicText }: { text: string; italicText?: string }) {
  const italicSegment = italicText?.trim()
  const italicStart = italicSegment ? text.indexOf(italicSegment) : -1
  if (!italicSegment || italicStart < 0) return text

  return (
    <>
      {text.slice(0, italicStart)}
      <i>{italicSegment}</i>
      {text.slice(italicStart + italicSegment.length)}
    </>
  )
}

function ResearchItem({ entry }: { entry: ResearchEntry }) {
  const title = entry.listTitle?.trim() || entry.researchTitle?.trim() || entry.name.trim()
  const titleContent = <ResearchText text={title} italicText={entry.italicTitleText} />
  const period = entry.participationPeriod?.trim() || entry.eventPeriod?.trim() || 'Date TBC'
  const role = entry.role?.trim()
  const publicLinks = entry.publicLinks ?? []
  const isSupporting = entry.level === 'supporting'
  const summary = !isSupporting && (entry.listSummary?.trim() || entry.summary?.trim())
  const hasSingleTarget = entry.hasDetailPage && publicLinks.length === 0
  const rowClassName = 'min-h-11 min-w-0'
  const content = (
    <>
      <h4
        id={`${entry.id}-title`}
        className={`max-w-full min-w-0 text-lg leading-7 text-gray-900 sm:text-xl sm:leading-8 dark:text-gray-100 ${
          isSupporting ? 'font-medium' : 'font-semibold'
        }`}
      >
        {entry.hasDetailPage && !hasSingleTarget ? (
          <Link
            href={`/research/${entry.id}`}
            className={`${styles.projectLink} inline-block min-h-11 focus-visible:outline-offset-4`}
          >
            <span className={styles.projectName}>{titleContent}</span>
          </Link>
        ) : (
          <span className={hasSingleTarget ? styles.projectName : undefined}>{titleContent}</span>
        )}
      </h4>
      {summary && (
        <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 dark:text-gray-300">
          <ResearchText text={summary} italicText={entry.journal} />
        </p>
      )}
      <div className="mt-2 space-y-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
        {role && <p>Role: {role}</p>}
        <p>{period}</p>
      </div>
      {publicLinks.length > 0 && (
        <ul className="mt-1 flex flex-wrap gap-x-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {publicLinks.map((link) => (
            <li key={link.url}>
              <Link
                href={link.url}
                className={`${styles.projectLink} inline-flex min-h-11 items-center`}
              >
                <span>
                  <span className={styles.projectName}>{link.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )

  return (
    <article
      aria-labelledby={`${entry.id}-title`}
      className={`min-w-0 break-words ${hasSingleTarget ? '' : rowClassName}`}
    >
      {hasSingleTarget ? (
        <Link
          href={`/research/${entry.id}`}
          aria-labelledby={`${entry.id}-title`}
          className={`${styles.projectLink} ${styles.expandedLink} block focus-visible:outline-offset-4 ${rowClassName}`}
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  )
}

function CompactResearchGroup({
  entries,
  type,
  headingId,
}: {
  entries: readonly ResearchEntry[]
  type: ResearchType
  headingId: string
}) {
  const periods = entries.map(
    (entry) => entry.participationPeriod?.trim() || entry.eventPeriod?.trim()
  )
  const eventPeriod = entries[0]?.eventPeriod?.trim()
  const label =
    type === 'advisory' &&
    eventPeriod &&
    entries.every((entry) => entry.eventPeriod?.trim() === eventPeriod)
      ? `${eventPeriod} ${researchTypes[type]}`
      : undefined
  return (
    <section aria-labelledby={headingId} className={projectGroupClassName}>
      <h3 id={headingId} className="text-xs leading-5">
        <ResearchTypeBadge type={type} label={label} />
      </h3>
      <ul className="mt-3">
        {entries.map((entry, index) => {
          const title = entry.listTitle?.trim() || entry.researchTitle?.trim() || entry.name.trim()
          const rowClassName =
            'flex min-h-11 min-w-0 flex-wrap items-baseline gap-x-3 gap-y-0.5 py-2 text-base leading-7'
          const content = (
            <>
              <h4
                id={`${entry.id}-title`}
                className="max-w-full min-w-0 font-medium text-gray-900 dark:text-gray-100"
              >
                <span className={entry.hasDetailPage ? styles.projectName : undefined}>
                  <ResearchText text={title} italicText={entry.italicTitleText} />
                </span>
              </h4>
              {type !== 'advisory' && periods[index] && (
                <span className="shrink-0 text-sm font-normal text-gray-600 dark:text-gray-300">
                  {periods[index]}
                </span>
              )}
            </>
          )

          return (
            <li key={entry.id}>
              <article aria-labelledby={`${entry.id}-title`} className="min-w-0 break-words">
                {entry.hasDetailPage ? (
                  <Link
                    href={`/research/${entry.id}`}
                    aria-labelledby={`${entry.id}-title`}
                    className={`${styles.projectLink} ${styles.expandedLink} ${styles.compactLink} focus-visible:outline-offset-4 ${rowClassName}`}
                  >
                    {content}
                  </Link>
                ) : (
                  <div className={rowClassName}>{content}</div>
                )}
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default function ResearchList({ entries }: { entries: readonly ResearchEntry[] }) {
  return (
    <div className="space-y-10 pt-10 pb-12 sm:space-y-12 sm:pt-12 sm:pb-16">
      {researchExperiences.map((experience) => {
        const experienceEntries = entries.filter((entry) => entry.experience === experience.id)
        const primaryEntries = experienceEntries.filter((entry) => entry.level === 'primary')
        const supportingEntries = experienceEntries.filter((entry) => entry.level === 'supporting')
        const compactType =
          experience.id === 'igem-2025'
            ? 'advisory'
            : experience.id === 'f-johnsoniae'
              ? 'software'
              : undefined
        const compactEntries = supportingEntries.filter((entry) => entry.type === compactType)
        const orderedEntries = [
          ...primaryEntries,
          ...supportingEntries.filter((entry) => entry.type !== compactType),
        ]

        return (
          <section
            key={experience.id}
            aria-labelledby={`${experience.id}-heading`}
            className={`${styles.experience} -mx-4 min-w-0 bg-gray-50 px-4 py-7 sm:-mx-6 sm:px-6 sm:py-9 dark:bg-gray-900`}
          >
            <header className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-x-4">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                className="mt-2 size-5 text-black sm:size-6 dark:text-white"
              >
                <path fill="currentColor" d="M0 0h24v24H0z" />
              </svg>
              <div className="min-w-0">
                <h2
                  id={`${experience.id}-heading`}
                  className="text-3xl leading-9 font-semibold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 dark:text-gray-100"
                >
                  <ResearchText text={experience.title} italicText={experience.italicTitleText} />
                </h2>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {experience.description}
                </p>
                <ResearchExperienceMetadata experience={experience} />
              </div>
            </header>
            <div className="mt-7 min-w-0 pl-9 sm:mt-8 sm:pl-12">
              <div className="ml-2.5 sm:ml-5">
                {orderedEntries.map((entry, index) => {
                  const headingId = `${experience.id}-${entry.type}-${index}-heading`
                  return (
                    <section
                      key={headingId}
                      aria-labelledby={headingId}
                      className={`${styles.mainProject} ${projectGroupClassName}`}
                    >
                      <h3 id={headingId} className="text-xs leading-5">
                        <ResearchTypeBadge type={entry.type} />
                      </h3>
                      <ul className="mt-3">
                        <li>
                          <ResearchItem entry={entry} />
                        </li>
                      </ul>
                    </section>
                  )
                })}
                {compactType && compactEntries.length > 0 && (
                  <CompactResearchGroup
                    entries={compactEntries}
                    type={compactType}
                    headingId={`${experience.id}-${compactType}-heading`}
                  />
                )}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
