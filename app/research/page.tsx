import researchData from '@/data/researchData'
import Image from '@/components/Image'
import ResearchList from '@/components/ResearchList'
import { ScholarPopoverGroup } from '@/components/ScholarPopover'
import styles from '@/components/TrogenProject.module.css'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Research' })

const contentWidth = 'mx-auto max-w-4xl px-4 sm:px-6'

export default function Research() {
  return (
    <>
      <div className={`${styles.page} bg-black text-gray-300`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src="/static/images/research/inspecting.jpg"
            alt="A researcher examining microscopy images on a computer monitor."
            fill
            sizes="100vw"
            priority
            className="object-cover object-[50%_30%]"
          />
          <div
            aria-hidden="true"
            className={`${styles.gradient} pointer-events-none absolute inset-0`}
          />
          <div className="absolute inset-x-0 bottom-0 pb-6 sm:pb-10 lg:pb-14">
            <div className={contentWidth}>
              <h1 className={`${styles.title} font-bold tracking-tight text-white`}>Research</h1>
            </div>
          </div>
        </div>

        <div className={`${contentWidth} pt-6 pb-8 sm:pt-8 sm:pb-10`}>
          <p className="text-base leading-8 sm:text-lg">
            Research across synthetic biology, cancer immunology, and bacterial motility.
          </p>
        </div>
      </div>

      <ScholarPopoverGroup>
        <ResearchList entries={researchData} />
      </ScholarPopoverGroup>
    </>
  )
}
