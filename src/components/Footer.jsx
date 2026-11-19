import { Link } from 'react-router'
import Logo from './Logo.jsx'
import { Band } from './Seal.jsx'
import { sections } from '../data/site.js'
import { solutions, tools } from '../data/products.js'

export default function Footer() {
  return (
    <footer className="relative bg-white">
      <Band className="block h-7 w-full text-teal/45" />
      <div className="shell grid gap-12 pt-14 pb-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo className="h-8" />
          <p className="mt-5 max-w-xs text-[0.9375rem] text-ink-2">
            Automation for financial professionals. The software prepares the work; your team reviews and signs off.
          </p>
          <p className="mt-5 text-sm text-ink-3">Dubai, United Arab Emirates</p>
        </div>

        <nav aria-label="File index" className="md:col-span-3">
          <h2 className="ref text-ink-3">Index</h2>
          <ul className="mt-4 space-y-2.5">
            {sections.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="group inline-flex items-center gap-3 text-[0.9375rem] text-ink hover:text-ink">
                  <span aria-hidden="true" className={`ref grid size-5 place-items-center rounded-[4px] text-[0.6875rem] text-white ${s.ink}`}>
                    {s.letter}
                  </span>
                  <span className="link-quiet">{s.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-5 grid grid-cols-2 gap-8">
          <div>
            <h2 className="ref text-ink-3">Solutions</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link to={`/solutions#${s.slug}`} className="link-quiet text-ink-2 hover:text-ink">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="ref text-ink-3">Tools</h2>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link to={`/tools#${t.slug}`} className="link-quiet text-ink-2 hover:text-ink">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="shell flex flex-col gap-3 border-t border-rule py-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Endloops. Built from the technology team of Alkazim.</p>
        <p className="ref">Prepared by software · Signed off by people</p>
      </div>
    </footer>
  )
}
