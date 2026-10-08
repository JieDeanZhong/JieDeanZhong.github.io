import { Fragment } from 'react'
import Link from '@/components/Link'
import ScholarPopover from '@/components/ScholarPopover'
import scholarsData from '@/data/scholarsData'
import type { ResearchExperienceDetails } from '@/data/researchData'

const linkStyle =
  'underline decoration-gray-400 underline-offset-4 hover:decoration-current focus-visible:outline-offset-4'

export default function ResearchExperienceMetadata({
  experience,
  role = experience.role,
  className = 'mt-4 space-y-1 text-sm leading-6 text-gray-600 dark:text-gray-300',
  children,
}: {
  experience: ResearchExperienceDetails
  role?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={className}>
      <p>Role: {role}</p>
      <p>
        {experience.supervisors.length > 1 ? 'Supervisors: ' : 'Supervisor: '}
        {experience.supervisors.map((supervisor, index) => {
          const label = [supervisor.name, supervisor.degree].filter(Boolean).join(', ')
          return (
            <Fragment key={supervisor.scholarId || supervisor.name}>
              {index > 0 && ' and '}
              {supervisor.scholarId ? (
                <ScholarPopover scholar={scholarsData[supervisor.scholarId]} />
              ) : supervisor.url ? (
                <Link href={supervisor.url} className={linkStyle}>
                  {label}
                </Link>
              ) : (
                label
              )}
            </Fragment>
          )
        })}
      </p>
      {experience.affiliations.map((affiliation) => (
        <p key={affiliation.name || affiliation.url}>
          {affiliation.url ? (
            <Link href={affiliation.url} className={linkStyle}>
              {affiliation.name}
            </Link>
          ) : (
            affiliation.name
          )}
        </p>
      ))}
      {children}
    </div>
  )
}
