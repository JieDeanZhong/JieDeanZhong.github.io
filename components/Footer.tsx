import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import BackToTop from './BackToTop'
import { sectionContainerClassName } from './SectionContainer'

const contactLinkStyle =
  'decoration-neutral-500 underline-offset-4 hover:text-white hover:underline focus-visible:text-white focus-visible:outline-white'

const headingStyle = 'text-sm font-medium tracking-[0.18em] text-neutral-300 uppercase'

export default function Footer() {
  return (
    <footer id="site-footer" className="mt-20 bg-[#2d2d2d] text-neutral-300">
      <div className={sectionContainerClassName}>
        <div className="grid gap-8 py-10 sm:grid-cols-[1fr_2fr] sm:gap-10 sm:py-12">
          <nav aria-labelledby="footer-links-heading">
            <h2 id="footer-links-heading" className={headingStyle}>
              Links
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-6">
              {siteMetadata.instagram && (
                <li>
                  <Link href={siteMetadata.instagram} className={contactLinkStyle}>
                    Instagram
                  </Link>
                </li>
              )}
              {siteMetadata.github && (
                <li>
                  <Link href={siteMetadata.github} className={contactLinkStyle}>
                    GitHub
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <section
            aria-labelledby="footer-contact-heading"
            className="min-w-0 border-t border-neutral-600 pt-8 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-10"
          >
            <h2 id="footer-contact-heading" className={headingStyle}>
              Contact
            </h2>
            <address className="mt-6 space-y-3 text-sm leading-6 not-italic">
              <p>
                <a
                  href={`tel:${siteMetadata.phone.replace(/\s/g, '')}`}
                  className={contactLinkStyle}
                >
                  {siteMetadata.phone}
                </a>
              </p>
              <p className="break-words">
                <a href={`mailto:${siteMetadata.email}`} className={contactLinkStyle}>
                  {siteMetadata.email}
                </a>
              </p>
              <p className="flex flex-wrap gap-x-2">
                <span>WeChat:</span>
                <span className="select-all">{siteMetadata.wechat}</span>
              </p>
            </address>
          </section>
        </div>
      </div>
      <div className="bg-[#1b1b1b]">
        <div className={sectionContainerClassName}>
          <div className="flex items-center justify-between gap-4 py-5 text-xs leading-5 text-neutral-400">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                <span>{siteMetadata.author}</span>
                <span aria-hidden="true">•</span>
                <span>{`© ${new Date().getFullYear()}`}</span>
                <span aria-hidden="true">•</span>
                <Link href="/" className={contactLinkStyle}>
                  {siteMetadata.title}
                </Link>
              </div>
              <p className="mt-1">
                <Link
                  href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
                  className={contactLinkStyle}
                >
                  Tailwind Nextjs Theme
                </Link>
              </p>
            </div>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  )
}
