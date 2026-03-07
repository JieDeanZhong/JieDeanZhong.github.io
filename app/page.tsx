import Image from 'next/image'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function AboutPage() {
  return (
    <div className="bg-white text-black dark:bg-white dark:text-black">
      <div className="mx-auto max-w-[1200px] px-6 pt-10 pb-20 md:px-10 lg:px-12">
        {/* Top label */}
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-[28px] font-semibold tracking-tight">About</h1>
        </div>

        {/* Hero */}
        <section className="grid grid-cols-1 items-end gap-8 bg-[#f5f5f7] px-8 py-10 md:grid-cols-2 md:px-12 md:py-14 lg:min-h-[430px]">
          <div className="self-center">
            <h2 className="text-[44px] leading-[1.05] font-semibold tracking-[-0.03em] text-black md:text-[58px]">
              Jie Dean Zhong
            </h2>
            <p className="mt-3 text-[24px] leading-[1.15] font-normal tracking-[-0.02em] text-gray-700 md:text-[34px]">
              Undergraduate Student in Biological Sciences
            </p>
          </div>

          <div className="relative flex min-h-[300px] items-end justify-center md:min-h-[360px] lg:min-h-[420px]">
            <Image
              src="/static/images/profile-placeholder.png"
              alt="Portrait of Jie Dean Zhong"
              width={620}
              height={760}
              className="h-auto max-h-[420px] w-auto object-contain"
              priority
            />
          </div>
        </section>

        {/* Bio */}
        <section className="bg-[#f5f5f7] px-8 py-12 md:px-12 md:py-14">
          <div className="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            <div className="space-y-8 text-[18px] leading-[1.65] tracking-[-0.01em] text-gray-800 md:text-[19px]">
              <p>
                Jie Dean Zhong is an undergraduate student in Biological Sciences at Xi’an
                Jiaotong-Liverpool University. His academic interests focus on synthetic biology,
                microbial engineering, and immunology.
              </p>

              <p>
                He has worked on project-based research involving engineered bacterial systems,
                translational control, and microbial motility. His current interests include the
                design of biological systems with controllable behavior and the study of microbial
                interactions in complex environments.
              </p>
            </div>

            <div className="space-y-8 text-[18px] leading-[1.65] tracking-[-0.01em] text-gray-800 md:text-[19px]">
              <p>
                Beyond laboratory research, Jie Dean is interested in scientific communication,
                interdisciplinary collaboration, and the long-term development of research-driven
                academic work. He is building a portfolio centered on experimental biology,
                problem-oriented design, and future research training.
              </p>

              <p>
                This page can later expand to include education, selected experience, technical
                skills, and a downloadable CV. For now, it serves as a clean profile page inspired
                by leadership-style editorial layouts.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
