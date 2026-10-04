'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import HeaderBrand from './HeaderBrand'
import dynamic from 'next/dynamic'
const MobileNav = dynamic(() => import('./MobileNav'), { ssr: false })
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass =
    'relative flex items-center w-full justify-between gap-4 py-2.5 sm:py-3.5 [&_a:focus-visible]:outline-primary-300 [&_button:focus-visible]:outline-primary-300'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      {/* Full-width background */}
      <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 border-b border-gray-800 bg-[#1d1d1f]" />

      <HeaderBrand />

      <div className="flex shrink-0 items-center space-x-4 leading-5 sm:space-x-6">
        <div className="hidden items-center gap-x-4 sm:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="m-1 font-medium text-gray-300 hover:text-white"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
