import researchData from '@/data/researchData'
import ResearchList from '@/components/ResearchList'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Research' })

export default function Research() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="pt-6 pb-8">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Research
        </h1>
      </div>

      <ResearchList entries={researchData} />
    </div>
  )
}
