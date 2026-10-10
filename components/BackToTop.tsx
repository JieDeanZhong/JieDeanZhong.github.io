'use client'

export default function BackToTop() {
  function scrollToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('site-home')?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="flex size-12 shrink-0 items-center justify-center text-neutral-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white"
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-6" fill="none">
        <path
          d="M10 16V4m-5 5 5-5 5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
