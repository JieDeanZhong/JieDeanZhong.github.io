import researchData from '@/data/researchData'
import Image from '@/components/Image'
import ResearchList from '@/components/ResearchList'
import { ScholarPopoverGroup } from '@/components/ScholarPopover'
import { sectionContainerClassName } from '@/components/SectionContainer'
import styles from '@/components/TrogenProject.module.css'
import overviewStyles from './ResearchOverview.module.css'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Research' })

export default function Research() {
  return (
    <>
      <div className={`${styles.page} ${overviewStyles.hero} bg-black text-gray-300`}>
        <div className={`${overviewStyles.visual} relative`}>
          <Image
            src="/static/images/research/inspecting-wide.jpeg"
            alt="A researcher examining microscopy images on a computer monitor."
            width={5712}
            height={2142}
            sizes="100vw"
            priority
            className="block h-auto w-full"
          />
          <div
            aria-hidden="true"
            className={`${overviewStyles.gradient} pointer-events-none absolute inset-0`}
          />
        </div>

        <div className={`${overviewStyles.intro} ${sectionContainerClassName}`}>
          {/* Match the text column after the experience list's square marker. */}
          <div className="pl-9 sm:pl-12">
            <h1 className={`${styles.title} font-bold tracking-tight text-white`}>Research</h1>
            <p className="mt-5 text-base leading-7 sm:mt-6 sm:text-lg sm:leading-8">
              Research across synthetic biology, cancer immunology, and bacterial motility.
            </p>
          </div>
        </div>
      </div>

      <ScholarPopoverGroup>
        <ResearchList entries={researchData} />
      </ScholarPopoverGroup>
    </>
  )
}
