import { Link } from 'react-router'
import Seal from '../components/Seal.jsx'
import { sections } from '../data/site.js'

export default function NotFound() {
  return (
    <section className="relative overflow-clip py-24 md:py-32">
      <title>Page not found · Endloops</title>
      <Seal className="pointer-events-none absolute -right-40 top-1/2 w-[40rem] -translate-y-1/2 text-rule-2" count={20} strokeWidth={0.6} />
      <div className="shell relative">
        <p className="ref text-ink-3">404</p>
        <h1 className="display mt-4 max-w-[14ch] text-[2.5rem] sm:text-[4rem]">This page isn’t in the file.</h1>
        <p className="mt-6 max-w-[48ch] text-lg text-ink-2">
          The link may be old, or the page may have moved. Here’s the index.
        </p>
        <ul className="mt-10 max-w-md divide-y divide-rule border-y border-rule">
          {sections.map((s) => (
            <li key={s.to}>
              <Link to={s.to} className="group flex items-center gap-4 py-3.5">
                <span className={`ref grid size-7 place-items-center rounded-md text-xs text-white ${s.ink}`}>{s.letter}</span>
                <span className="font-medium">{s.label}</span>
                <span className="ml-auto text-sm text-ink-3">{s.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
