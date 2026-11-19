import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import Logo from './Logo.jsx'
import Button from './Button.jsx'
import { Menu, Close, Arrow } from './Marks.jsx'
import { sections } from '../data/site.js'

const nav = sections.slice(1)

function TabChip({ s, active }) {
  return (
    <span
      aria-hidden="true"
      className={`ref grid size-5 place-items-center rounded-[4px] text-[0.6875rem] text-white transition-transform duration-300 ease-file ${s.ink} ${
        active ? '-translate-y-0.5' : 'group-hover:-translate-y-0.5'
      }`}
    >
      {s.letter}
    </span>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled || open ? 'shadow-[0_1px_0_var(--color-rule),0_8px_24px_-20px_rgba(13,20,36,0.35)]' : ''
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Logo className="h-[1.85rem] md:h-8" />

        <nav aria-label="Main" className="hidden h-full lg:block">
          <ul className="flex h-full items-stretch gap-1">
            {nav.map((s) => (
              <li key={s.to} className="relative flex">
                <NavLink
                  to={s.to}
                  className={({ isActive }) =>
                    `group flex items-center gap-2 px-3.5 text-[0.9375rem] font-medium transition-colors duration-200 ${
                      isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <TabChip s={s} active={isActive} />
                      <span>{s.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-tab"
                          className={`absolute inset-x-3 bottom-0 h-[3px] rounded-t-full ${s.ink}`}
                          transition={{ type: 'spring', bounce: 0, visualDuration: 0.35 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button to="/contact?type=demo" arrow>
              Request a demo
            </Button>
          </div>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-ink ring-1 ring-inset ring-rule-2 transition-colors hover:ring-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-rule bg-white lg:hidden"
          >
            <nav aria-label="Main" className="shell py-6">
              <ul className="divide-y divide-rule border-y border-rule">
                {sections.map((s, i) => (
                  <motion.li
                    key={s.to}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink to={s.to} end className="group flex items-center gap-4 py-4">
                      {({ isActive }) => (
                        <>
                          <span
                            aria-hidden="true"
                            className={`ref grid size-9 shrink-0 place-items-center rounded-md text-sm text-white ${s.ink}`}
                          >
                            {s.letter}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className={`heading block text-xl ${isActive ? s.text : 'text-ink'}`}>{s.label}</span>
                            <span className="block text-sm text-ink-3">{s.line}</span>
                          </span>
                          <Arrow className="text-ink-3 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <Button to="/contact?type=demo" size="lg" className="mt-8 w-full" arrow>
                Request a demo
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
