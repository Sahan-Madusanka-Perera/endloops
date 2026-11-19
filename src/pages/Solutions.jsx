import { useEffect, useRef, useState } from 'react'
import { useLocation, Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import PageHero from '../components/PageHero.jsx'
import CtaPanel from '../components/CtaPanel.jsx'
import Button from '../components/Button.jsx'
import Reveal, { SectionHead } from '../components/Reveal.jsx'
import { Arrow, Sign, Tick } from '../components/Marks.jsx'
import { solutions, capabilities } from '../data/products.js'

const ease = [0.22, 1, 0.36, 1]

const receives = {
  'budget-review': 'A review memo with each variance explained or flagged, and the working behind it.',
  'escrow-audit': 'Audit working papers with every movement matched to its support.',
  'financial-audit': 'A prepared audit file: lead schedules, working papers and draft findings.',
  'interim-audit': 'Interim findings now, and a year-end file that starts half prepared.',
  'budget-preparation': 'A draft budget for each property, ready to adjust and approve.',
}

const flow = ['Collect', 'Read', 'Match', 'Check', 'Draft']

export default function Solutions() {
  return (
    <>
      <title>End-to-end solutions · Endloops</title>
      <meta name="description" content="Complete software that runs a whole financial process, from the first document to a file ready for sign-off." />
      <PageHero
        letter="B"
        tone="green"
        title="End-to-end solutions"
        aside={
          <div className="flex flex-wrap gap-3">
            <Button to="/contact?type=demo" size="lg" arrow>
              Request a demo
            </Button>
            <Button to="/tools" variant="outline" size="lg" className="!ring-ink/30 hover:!bg-white/20 hover:!ring-ink">
              Compare with tools
            </Button>
          </div>
        }
      >
        Complete software that runs a whole process or financial service, from the first document to a file ready for
        your sign-off.
      </PageHero>
      <WholeFile />
      <Explorer />
      <Bridge />
      <CtaPanel title="Pick the engagement that eats your month." text="Tell us which process you’d hand over first. We’ll show you the prepared file it produces." />
    </>
  )
}

function WholeFile() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="whole-title">
      <div className="shell">
        <SectionHead
          id="whole-title"
          refCode="B0"
          tone="text-green-ink"
          title="You hand over the documents. You get back the file."
          intro="An end-to-end solution covers every stage of an engagement or cycle. Endloops works through each one and returns the whole file, every figure referenced to its source, ready for you to review."
        />
        <ol className="mt-14 grid grid-cols-2 gap-px overflow-clip rounded-xl bg-rule ring-1 ring-rule sm:grid-cols-3 lg:grid-cols-6 md:ml-28">
          {flow.map((f, i) => (
            <Reveal as="li" key={f} delay={i * 0.07} className="relative bg-white p-5">
              <span className="ref text-ink-3">{String(i + 1).padStart(2, '0')}</span>
              <p className="heading mt-6 text-lg">{f}</p>
              <p className="mt-1 text-sm text-ink-3">Endloops</p>
              <motion.span
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-green"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease }}
              />
            </Reveal>
          ))}
          <Reveal as="li" delay={flow.length * 0.07} className="relative bg-teal p-5 text-white">
            <span className="ref text-white/75">06</span>
            <p className="heading mt-6 flex items-center gap-2 text-lg">
              Review <Sign size={18} />
            </p>
            <p className="mt-1 text-sm text-white/80">You</p>
          </Reveal>
        </ol>
      </div>
    </section>
  )
}

function Explorer() {
  const { hash } = useLocation()
  const [active, setActive] = useState(0)
  const tabsRef = useRef([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const i = solutions.findIndex((s) => `#${s.slug}` === hash)
    if (i >= 0) {
      setActive(i)
      sectionRef.current?.scrollIntoView({ block: 'start' })
    }
  }, [hash])

  const onKey = (e) => {
    const n = solutions.length
    let next = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (active + 1) % n
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (active - 1 + n) % n
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = n - 1
    if (next !== null) {
      e.preventDefault()
      setActive(next)
      tabsRef.current[next]?.focus()
    }
  }

  const s = solutions[active]

  return (
    <section ref={sectionRef} id="explorer" className="scroll-mt-24 border-t border-rule bg-mist py-20 md:py-28" aria-labelledby="explorer-title">
      {solutions.map((x) => (
        <span key={x.slug} id={x.slug} className="block scroll-mt-24" aria-hidden="true" />
      ))}
      <div className="shell">
        <SectionHead
          id="explorer-title"
          refCode="B1–B5"
          tone="text-green-ink"
          title="Five solutions, each a complete file."
          intro="Some are in use today and others are in development. The range keeps growing with the work our clients bring."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[19rem_1fr] md:ml-28">
          <div
            role="tablist"
            aria-label="Solutions"
            aria-orientation="vertical"
            onKeyDown={onKey}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
          >
            {solutions.map((x, i) => {
              const on = i === active
              return (
                <button
                  key={x.slug}
                  ref={(el) => (tabsRef.current[i] = el)}
                  role="tab"
                  type="button"
                  id={`tab-${x.slug}`}
                  aria-selected={on}
                  aria-controls={`panel-${x.slug}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`relative flex shrink-0 items-center gap-3 rounded-lg px-4 py-3.5 text-left transition-colors duration-200 ${
                    on ? 'text-ink' : 'text-ink-2 hover:bg-white/70 hover:text-ink'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="solution-tab"
                      className="absolute inset-0 rounded-lg bg-white shadow-[0_8px_20px_-14px_rgba(13,20,36,0.35)] ring-1 ring-rule"
                      transition={{ type: 'spring', bounce: 0, visualDuration: 0.35 }}
                    />
                  )}
                  <span
                    className={`ref relative grid h-6 w-9 shrink-0 place-items-center rounded-[4px] text-[0.6875rem] transition-colors ${
                      on ? 'bg-green text-ink' : 'bg-white text-ink-3 ring-1 ring-inset ring-rule'
                    }`}
                  >
                    {x.ref}
                  </span>
                  <span className="relative whitespace-nowrap font-medium lg:whitespace-normal">{x.name}</span>
                </button>
              )
            })}
          </div>

          <div className="relative min-h-[30rem] overflow-clip rounded-xl bg-white ring-1 ring-rule">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={s.slug}
                role="tabpanel"
                id={`panel-${s.slug}`}
                aria-labelledby={`tab-${s.slug}`}
                tabIndex={0}
                className="p-6 sm:p-10"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="heading text-[1.75rem] sm:text-[2rem]">{s.name}</h3>
                    {s.audience && <p className="mt-1 font-medium text-green-ink">{s.audience}</p>}
                  </div>
                  <span className="ref rounded-md bg-green-wash px-2.5 py-1.5 text-green-ink">{s.ref}</span>
                </div>
                <p className="mt-5 max-w-[60ch] text-lg text-ink-2">{s.summary}</p>

                <div className="mt-10">
                  <p className="text-sm font-medium text-ink-3">How the file comes together</p>
                  <ol className="mt-4 grid gap-3 sm:grid-cols-5">
                    {[...s.stages, 'Your review and sign-off'].map((st, i, arr) => {
                      const you = i === arr.length - 1
                      return (
                        <motion.li
                          key={st}
                          className={`relative rounded-lg p-3.5 text-sm ${you ? 'bg-teal text-white' : 'bg-mist text-ink'}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + i * 0.07, duration: 0.3, ease }}
                        >
                          <span className={`ref block ${you ? 'text-white/75' : 'text-ink-3'}`}>
                            {s.ref}.{i + 1}
                          </span>
                          <span className="mt-2 block font-medium leading-snug">{st}</span>
                        </motion.li>
                      )
                    })}
                  </ol>
                </div>

                <div className="mt-10 grid gap-8 border-t border-rule pt-8 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-ink-3">What you receive</p>
                    <p className="mt-2 text-ink">{receives[s.slug]}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-3">Capabilities used</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {capabilities.map((c) => {
                        const used = s.uses.includes(c.id)
                        return (
                          <li
                            key={c.id}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm ${
                              used ? 'bg-ink text-white' : 'text-ink-3 line-through decoration-ink-3/50 ring-1 ring-inset ring-rule'
                            }`}
                          >
                            {used && <Tick size={13} strokeWidth={2.4} />}
                            {c.name}
                            <span className="sr-only">{used ? ' (used)' : ' (not used)'}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Bridge() {
  return (
    <section className="py-20 md:py-24" aria-labelledby="bridge-title">
      <div className="shell grid items-center gap-8 md:grid-cols-[7rem_1fr_auto]">
        <span className="ref inline-flex items-center gap-1.5 text-ink-3" aria-hidden="true">
          <Arrow size={15} /> C
        </span>
        <div className="max-w-2xl">
          <h2 id="bridge-title" className="heading text-[1.75rem] sm:text-[2rem]">
            Need one part of the process, not the whole file?
          </h2>
          <p className="mt-3 text-lg text-ink-2">
            Every solution is built from the same engine as our standalone tools. Start with one tool on the task that
            hurts most, and grow into a full solution when you’re ready.
          </p>
        </div>
        <Link to="/tools" className="group inline-flex items-center gap-2 font-semibold text-blue-ink">
          <span className="link-quiet">See standalone tools</span>
          <Arrow size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
