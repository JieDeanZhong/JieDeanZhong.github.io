'use client'

import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import FourDotMark from '../public/static/images/four-dot-mark.svg'
import Link from './Link'
import styles from './HeaderBrand.module.css'

export default function HeaderBrand() {
  const [preview, setPreview] = useState('b')

  useEffect(() => {
    // Local design comparisons only; the normal site uses the current letter-height version.
    if (process.env.NODE_ENV !== 'development') return
    const variant = new URLSearchParams(window.location.search).get('logoPreview')
    if (variant === 'a' || variant === 'b' || variant === 'c') setPreview(variant)
  }, [])

  return (
    <Link
      href="/"
      aria-label={`${siteMetadata.headerTitle} — Home`}
      className={styles.brand}
      data-logo-preview={preview}
    >
      <FourDotMark className={styles.mark} aria-hidden="true" focusable="false" />
      <span className={styles.name}>{siteMetadata.headerTitle}</span>
    </Link>
  )
}
