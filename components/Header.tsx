'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const MobileNav = dynamic(() => import('./MobileNav'), { ssr: false })
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass = 'relative flex items-center w-full justify-between py-6'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      {/* Full-width background */}
      <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 border-b border-gray-800 bg-[#1d1d1f]" />

      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center">
          <div className="flex items-center">
            <Image
              src="/static/images/signature-latest.png"
              alt="Jie Dean Zhong signature"
              width={220}
              height={70}
              priority
              className="h-auto w-auto object-contain"
            />
          </div>
        </div>
      </Link>

      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
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
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
