import { motion } from 'motion/react'
import Seal from './Seal.jsx'

const ease = [0.22, 1, 0.36, 1]

const tones = {
  green: { bg: 'bg-green', text: 'text-ink', sub: 'text-ink', line: 'text-white/55', chip: 'text-green-ink md:text-ink' },
  blue: { bg: 'bg-blue', text: 'text-white', sub: 'text-white', line: 'text-white/30', chip: 'text-blue-ink md:text-white' },
  purple: { bg: 'bg-purple', text: 'text-white', sub: 'text-white', line: 'text-white/30', chip: 'text-purple-ink md:text-white' },
  teal: { bg: 'bg-teal', text: 'text-white', sub: 'text-white', line: 'text-white/28', chip: 'text-teal-ink md:text-white' },
}

// The divider sheet for each section of the file: a solid field of its ink,
// a tab with its letter, and an engraved rosette in the margin.
export default function PageHero({ letter, tone = 'green', title, children, aside }) {
  const t = tones[tone]
  return (
    <section className="relative pt-4">
      <div className="shell">
        <div className={`relative overflow-clip rounded-[1.25rem] ${t.bg}`}>
          <motion.div
            className={`pointer-events-none absolute -right-[12%] -top-[30%] w-[min(46rem,95%)] ${t.line}`}
            initial={{ opacity: 0, rotate: -8, scale: 0.96 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.4, ease }}
          >
            <Seal count={22} strokeWidth={0.7} />
          </motion.div>

          <div className="relative grid px-6 pt-20 pb-12 sm:px-10 md:grid-cols-[7rem_1fr] md:pt-16 md:pb-20 lg:px-14">
            {/* The divider's tab: pinned to the sheet's corner on phones, in the margin from md. */}
            <div aria-hidden="true" className="absolute top-6 right-6 sm:right-10 md:static">
              <span className={`ref inline-grid size-11 place-items-center rounded-lg bg-white text-xl shadow-[0_6px_16px_-8px_rgba(13,20,36,0.45)] ${t.chip} md:size-14 md:rounded-xl md:bg-white/15 md:text-2xl md:shadow-none md:ring-1 md:ring-inset md:ring-white/30`}>
                {letter}
              </span>
            </div>
            <div className="max-w-3xl">
              <h1 className={`display rise text-[2.5rem] [--rise-y:24px] sm:text-[3.5rem] lg:text-[4.6rem] ${t.text}`}>{title}</h1>
              <div className={`rise mt-6 max-w-[58ch] text-lg leading-relaxed [--d:0.1s] [--rise-y:16px] sm:text-xl ${t.sub}`}>
                {children}
              </div>
              {aside && <div className="rise mt-9 [--d:0.2s] [--rise-y:12px]">{aside}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
