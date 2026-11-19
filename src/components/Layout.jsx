import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { MotionConfig } from 'motion/react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  const { pathname, hash, key } = useLocation()
  const mainRef = useRef(null)
  const first = useRef(true)

  // Deep links such as /tools#matrix: once the page has rendered, jump to the target.
  // Runs after the router's own scroll restoration, so the anchor always wins.
  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let raf = 0
    const go = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' })
      else if (tries++ < 60) raf = requestAnimationFrame(go)
    }
    raf = requestAnimationFrame(() => requestAnimationFrame(go))
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash, key])

  // In-page links (Watch a sample run, the form's error summary) glide to their target
  // instead of jumping, without touching the URL. Form fields also take focus. The skip
  // link keeps the browser's native behaviour.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest?.('a[href^="#"]')
      const id = a && decodeURIComponent(a.getAttribute('href').slice(1))
      if (!id || id === 'main') return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      const field = el.matches('input, select, textarea, button')
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ block: field ? 'center' : 'start', behavior: reduce ? 'auto' : 'smooth' })
      if (field) el.focus({ preventScroll: true })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Move focus to the new page on client-side navigation so screen readers announce it.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      {/* Hard loads all share the key "default"; key those by path so one page never
          inherits another page's scroll position. */}
      <ScrollRestoration getKey={(loc) => (loc.key === 'default' ? loc.pathname : loc.key)} />
    </MotionConfig>
  )
}
