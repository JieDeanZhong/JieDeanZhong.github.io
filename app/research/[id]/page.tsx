import 'css/prism.css'
import 'katex/dist/katex.css'

import { notFound } from 'next/navigation'
import { allAuthors, allBlogs } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import Link from '@/components/Link'
import PostLayout from '@/layouts/PostLayout'
import { researchDetailEntries } from '@/data/researchData'
import trogenData from '@/data/trogenData'
import TrogenProject from '@/components/TrogenProject'
import fjData from '@/data/fjData'
import FjProject from '@/components/FjProject'
import PhotoResearchProject from '@/components/PhotoResearchProject'
import { genPageMetadata } from 'app/seo'

interface ResearchPageProps {
  params: Promise<{ id: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return researchDetailEntries.map((entry) => ({ id: entry.id }))
}

export async function generateMetadata({ params }: ResearchPageProps) {
  const { id } = await params
  const entry = researchDetailEntries.find((item) => item.id === id)
  if (!entry) notFound()

  if (id === 'trogen') {
    return genPageMetadata({
      title: trogenData.title,
      description: trogenData.summary,
      image: trogenData.photo.src,
      robots: { index: false, follow: false },
    })
  }

  if (id === 'fj-gliding') {
    return genPageMetadata({
      title: fjData.title,
      description: fjData.summary,
      image: fjData.photo.src,
      robots: { index: false, follow: false },
    })
  }

  if (entry.photo) {
    return genPageMetadata({
      title: entry.listTitle || entry.researchTitle || entry.name,
      description: entry.summary,
      image: entry.photo.src,
      robots: { index: false, follow: false },
    })
  }

  return genPageMetadata({
    title: entry.researchTitle?.trim() || entry.name,
    description: 'Temporary preview using The Time Machine as placeholder content.',
    robots: { index: false, follow: false },
  })
}

export default async function ResearchPage({ params }: ResearchPageProps) {
  const { id } = await params
  const entry = researchDetailEntries.find((item) => item.id === id)
  if (!entry) notFound()
  if (id === 'trogen') return <TrogenProject />
  if (id === 'fj-gliding') return <FjProject />
  if (entry.photo) return <PhotoResearchProject entry={entry} photo={entry.photo} />

  const placeholder = allBlogs.find((post) => post.slug === 'the-time-machine')
  if (!placeholder) notFound()

  const authorDetails = (placeholder.authors || ['default']).flatMap((slug) => {
    const author = allAuthors.find((item) => item.slug === slug)
    return author ? [coreContent(author)] : []
  })

  return (
    <>
      <div className="border-b border-gray-200 py-6 break-words dark:border-gray-700">
        <Link
          href="/research"
          className="text-sm text-gray-700 underline underline-offset-4 dark:text-gray-300"
        >
          &larr; Back to Research
        </Link>
        <p className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
          {entry.researchTitle?.trim() || entry.name}
        </p>
        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
          Placeholder page. The Time Machine below is sample content, not a description of this
          research entry.
        </p>
      </div>
      <PostLayout
        content={coreContent(placeholder)}
        authorDetails={authorDetails}
        backLink={{ href: '/research', label: 'Back to Research' }}
      >
        <MDXLayoutRenderer
          code={placeholder.body.code}
          components={components}
          toc={placeholder.toc}
        />
      </PostLayout>
    </>
  )
}
