import { Fragment } from 'react'
import Link from '@/components/Link'
import ScholarPopover from '@/components/ScholarPopover'
import scholarsData from '@/data/scholarsData'
import { researchSections } from '@/data/researchData'
import type { ResearchEntry } from '@/data/researchData'

function ResearchItem({ entry }: { entry: ResearchEntry }) {
  const title = entry.listTitle?.trim() || entry.researchTitle?.trim() || entry.name.trim()
  const italicTitleText = entry.italicTitleText?.trim()
  const italicStart = italicTitleText ? title.indexOf(italicTitleText) : -1
  const titleContent =
    italicTitleText && italicStart >= 0 ? (
      <>
        {title.slice(0, italicStart)}
        <i>{italicTitleText}</i>
        {title.slice(italicStart + italicTitleText.length)}
      </>
    ) : (
      title
    )
  const summary = entry.summary?.trim()
  const role = entry.role?.trim()
  const contribution = entry.contribution?.trim()
  const relatedResearch = entry.relatedResearch
  const pis = (Array.isArray(entry.pi) ? entry.pi : entry.pi ? [entry.pi] : []).filter((pi) =>
    pi.name.trim()
  )
  const affiliations = (entry.affiliations ?? [])
    .map((line) =>
      (Array.isArray(line) ? line : [line]).filter((affiliation) => affiliation.name?.trim())
    )
    .filter((line) => line.length > 0)
  const participationPeriod = entry.participationPeriod?.trim()
  const background = entry.background?.trim()
  const status =
    entry.status?.trim() === 'Ongoing' && participationPeriod?.endsWith('Present')
      ? undefined
      : entry.status?.trim()
  const milestones = entry.milestones?.map((value) => value.trim()).filter(Boolean) ?? []
  const publicLinks =
    entry.publicLinks?.filter((link) => link.label.trim() && link.url.trim()) ?? []
  const hasBackground = Boolean(
    pis.length || affiliations.length || participationPeriod || background
  )

  return (
    <article aria-labelledby={`${entry.id}-title`} className="min-w-0 space-y-3 break-words">
      <div>
        <h3
          id={`${entry.id}-title`}
          className="text-xl leading-7 font-bold text-gray-900 sm:text-2xl sm:leading-8 dark:text-gray-100"
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
        </h3>
        {summary && (
          <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{summary}</p>
        )}
      </div>

      {(role || status) && (
        <div className="space-y-1 text-sm leading-6 text-gray-700 dark:text-gray-300">
          {role && <p>Role: {role}</p>}
          {status && <p>Status: {status}</p>}
        </div>
      )}

      {contribution &&
        (entry.section === 'research-software' ? (
          <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            Contribution: {contribution}
          </p>
        ) : (
          <p className="text-base leading-7 text-gray-800 dark:text-gray-200">{contribution}</p>
        ))}

      {hasBackground && (
        <div className="space-y-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {pis.length > 0 && (
            <p>
              {pis.length === 1 ? 'PI:' : 'PIs:'}{' '}
              {pis.map((pi, index) => {
                const label = [pi.name.trim(), pi.degree?.trim()].filter(Boolean).join(', ')
                return (
                  <Fragment key={`${pi.name}-${index}`}>
                    {index > 0 && ' and '}
                    {pi.scholarId ? (
                      <ScholarPopover scholar={scholarsData[pi.scholarId]} />
                    ) : pi.url?.trim() ? (
                      <Link
                        href={pi.url.trim()}
                        className="underline decoration-gray-400 underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        {label}
                      </Link>
                    ) : (
                      label
                    )}
                  </Fragment>
                )
              })}
            </p>
          )}
          {affiliations.map((line, index) => (
            <p key={`affiliation-${index}`}>
              {line.map((affiliation, partIndex) => (
                <Fragment key={`${affiliation.name}-${partIndex}`}>
                  {partIndex > 0 && ' · '}
                  {affiliation.url?.trim() ? (
                    <Link
                      href={affiliation.url.trim()}
                      className="underline decoration-gray-400 underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      {affiliation.name?.trim()}
                    </Link>
                  ) : (
                    affiliation.name?.trim()
                  )}
                </Fragment>
              ))}
            </p>
          ))}
          {background && <p>{background}</p>}
          {participationPeriod && <p>{participationPeriod}</p>}
        </div>
      )}

      {milestones.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {milestones.map((milestone) => (
            <li key={milestone}>{milestone}</li>
          ))}
        </ul>
      )}

      {publicLinks.length > 0 && (
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
          {publicLinks.map((link) => (
            <li key={link.url} className="max-w-full min-w-0">
              <Link
                href={link.url.trim()}
                className="underline decoration-gray-400 underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {link.label.trim()}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {relatedResearch?.label.trim() && relatedResearch.url.trim() && (
        <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
          Related research:{' '}
          <Link
            href={relatedResearch.url.trim()}
            className="underline decoration-gray-400 underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {relatedResearch.label.trim()}
          </Link>
        </p>
      )}
    </article>
  )
}

export default function ResearchList({ entries }: { entries: readonly ResearchEntry[] }) {
  return (
    <div className="space-y-12 py-10 sm:space-y-16 sm:py-12">
      {researchSections.map((section) => (
        <section key={section.id} aria-labelledby={`${section.id}-heading`}>
          <h2
            id={`${section.id}-heading`}
            className="mb-2 text-2xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100"
          >
            {section.title}
          </h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {entries
              .filter((entry) => entry.section === section.id)
              .map((entry) => (
                <li key={entry.id} className="py-6 sm:py-7">
                  <ResearchItem entry={entry} />
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
