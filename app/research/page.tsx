import researchData from '@/data/researchData'
import ResearchList from '@/components/ResearchList'
import { ScholarPopoverGroup } from '@/components/ScholarPopover'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Research' })

export default function Research() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Research
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Research across synthetic biology, cancer immunology, and bacterial motility.
        </p>
      </div>

      <ScholarPopoverGroup>
        <ResearchList entries={researchData} />
      </ScholarPopoverGroup>
    </div>
  )
}
