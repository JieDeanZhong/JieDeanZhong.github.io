export interface HeaderNavLink {
  href: string
  title: string
  // Prefer short, single-word submenu labels; page headings can remain descriptive.
  children?: { href: string; title: string }[]
}

const headerNavLinks: HeaderNavLink[] = [
  { href: '/', title: 'Home' },
  {
    href: '/research',
    title: 'Research',
    children: [
      { href: '/research#research-projects-heading', title: 'Projects' },
      { href: '/research#perspectives-heading', title: 'Perspectives' },
      { href: '/research#research-software-heading', title: 'Software' },
      { href: '/research#advisory-heading', title: 'Advisory' },
    ],
  },
  {
    href: '/blog',
    title: 'Blog',
    children: [{ href: '/tags', title: 'Tags' }],
  },
  {
    href: '/news',
    title: 'News',
    children: [],
  },
  {
    href: '/about',
    title: 'About',
    children: [{ href: '/about#contact', title: 'Contact' }],
  },
]

export default headerNavLinks
