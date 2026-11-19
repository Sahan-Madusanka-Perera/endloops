import { motion } from 'motion/react'
import { Link } from 'react-router'
import GuillocheCanvas from '../components/GuillocheCanvas.jsx'
import VouchingDemo from '../components/VouchingDemo.jsx'
import CtaPanel from '../components/CtaPanel.jsx'
import Button from '../components/Button.jsx'
import Reveal, { SectionHead } from '../components/Reveal.jsx'
import Seal from '../components/Seal.jsx'
import { Tick, Cast, Flag, Sign, Arrow, ArrowDown } from '../components/Marks.jsx'
import { capabilities, solutions, tools } from '../data/products.js'

const ease = [0.22, 1, 0.36, 1]

// Rosette sits behind the prepared slip at every size. Below lg the slip is in
// flow at the foot of the hero (about 330px tall, 64px of padding under it), so
// the rosette centres on it with a fixed ring that frames it and clears the copy.
function heroLayout(w, h) {
  if (w < 1024) {
    const ring = w < 640 ? 222 : 240
    return { x: 0.5, y: Math.max(0.5, (h - 64 - 165) / h), scale: ring / Math.min(w, h * 1.6) }
  }
  // Desktop: centred on the slip. The seal's outer ring closes inside the hero with
  // 32px to spare top and bottom; below ~1400px wide it bleeds off the right edge only.
  const cx = w / 2 + Math.min(288, w * 0.25)
  const unit = Math.min(w, h * 1.6)
  const ring = Math.min(0.38 * 0.985 * unit, h / 2 - 32)
  const reach = 0.93 * ring
  return { x: cx / w, y: 0.5, scale: ring / (0.985 * unit), fade: [cx - reach, cx - reach * 0.35] }
}

export default function Home() {
  return (
    <>
      <title>Endloops · Financial work, prepared for your sign-off</title>
      <Hero />
      <AudienceLine />
      <Heritage />
      <DivisionOfLabour />
      <TwoShapes />
      <DemoSection />
      <Engine />
      <Principles />
      <CtaPanel />
    </>
  )
}

function DrawnTick({ delay = 0, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <motion.path
        d="M4 12.8l4.6 4.7L20.5 5.2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5, ease }}
      />
    </svg>
  )
}

function Hero() {
  return (
    <section className="relative overflow-clip pb-16 lg:pb-0" aria-labelledby="hero-title">
      <GuillocheCanvas className="absolute inset-0 h-full w-full" layout={heroLayout} />

      <div className="shell relative grid content-start pt-8 pb-6 sm:pt-14 sm:pb-12 md:pt-20 lg:min-h-[clamp(40rem,calc(100svh-4.5rem),54rem)] lg:content-center lg:grid-cols-2 lg:py-24">
        <div className="max-w-[40rem]">
          <h1
            id="hero-title"
            className="display rise text-[2.5rem] text-ink [--rise-y:26px] sm:text-[4rem] xl:text-[4.6rem]"
          >
            Financial work, prepared for{' '}
            <span className="relative inline-block whitespace-nowrap">
              your sign‑off.
              <svg
                viewBox="0 0 300 18"
                preserveAspectRatio="none"
                className="absolute -bottom-[0.14em] left-0 h-[0.2em] w-full text-green"
                aria-hidden="true"
              >
                <path
                  d="M3 12 C 70 4, 150 3, 210 7 S 280 12, 297 6"
                  pathLength="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="draw [--d:1.1s]"
                />
              </svg>
            </span>
          </h1>

          <p className="rise mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed text-ink-2 [--d:0.12s] [--rise-y:18px] sm:mt-7 sm:text-xl">
            Endloops reads the documents, matches them to the ledger, checks the rules and drafts the working papers.
            Your team reviews and decides. Sign-off always stays with people.
          </p>

          <div className="rise mt-7 flex flex-wrap items-center gap-3 [--d:0.22s] [--rise-y:14px] sm:mt-9">
            <Button to="/contact?type=demo" arrow className="sm:h-13 sm:px-7 sm:text-base">
              Request a demo
            </Button>
            <Button href="#demo" variant="outline" className="sm:h-13 sm:px-7 sm:text-base">
              <span className="sr-only">Scroll to </span>
              <span className="sm:hidden">Watch it run</span>
              <span className="hidden sm:inline">Watch a sample run</span>
            </Button>
          </div>

          <p className="fade-in mt-10 hidden max-w-[30rem] text-[0.9375rem] text-ink-3 [--d:0.4s] lg:block">{audience}</p>
        </div>
      </div>

      <PreparedSlip />
    </section>
  )
}

const audience = 'For accountants, auditors, finance teams and property management companies in the GCC and beyond.'

// Below lg the slip follows the actions, so the audience line moves under the hero.
function AudienceLine() {
  return <p className="shell pb-12 text-[0.9375rem] text-ink-3 lg:hidden">{audience}</p>
}

const slipRows = [
  { label: 'Entries read', value: '248', icon: null },
  { label: 'Agreed to invoice', value: '241', icon: 'tick' },
  { label: 'Cast to ledger', value: '248', icon: 'cast' },
  { label: 'Flagged for you', value: '7', icon: 'flag' },
]

function PreparedSlip() {
  return (
    <div className="slip-in relative mx-auto mt-8 w-[min(21rem,calc(100%-2.5rem))] sm:mt-12 lg:mt-0 [--d:0.55s] lg:absolute lg:left-[calc(50%+min(18rem,25vw))] lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
      <div className="rounded-xl bg-white p-5 shadow-[0_30px_60px_-28px_rgba(13,20,36,0.45),0_2px_6px_-2px_rgba(13,20,36,0.12)] ring-1 ring-rule">
        <div className="flex items-start justify-between gap-4 border-b-2 border-ink pb-3">
          <div>
            <p className="ref text-ink-3">C2 · Q3 payables</p>
            <p className="mt-1 font-semibold">Vouching schedule</p>
          </div>
          <span className="rounded-full bg-mist px-2.5 py-1 text-[0.6875rem] font-medium text-ink-3">Sample</span>
        </div>
        <ul className="figures divide-y divide-rule text-sm">
          {slipRows.map((r, i) => (
            <li
              key={r.label}
              className="fade-in flex items-center justify-between py-2.5"
              style={{ '--d': `${1 + i * 0.18}s` }}
            >
              <span className="flex items-center gap-2.5 text-ink-2">
                <span className="grid size-5 place-items-center">
                  {r.icon === 'tick' && <Tick size={17} strokeWidth={2.1} className="text-green-ink" />}
                  {r.icon === 'cast' && <Cast size={17} className="text-blue" />}
                  {r.icon === 'flag' && <Flag size={17} className="text-purple-ink" />}
                  {!r.icon && <span className="size-1.5 rounded-full bg-ink-3" />}
                </span>
                {r.label}
              </span>
              <span className="font-semibold text-ink">{r.value}</span>
            </li>
          ))}
        </ul>
        <div className="mt-1 grid grid-cols-2 gap-3 border-t-[3px] border-double border-ink pt-3 text-xs">
          <div>
            <p className="text-ink-3">Prepared by</p>
            <p className="mt-0.5 flex items-center gap-1 font-semibold">
              Endloops <Tick size={13} strokeWidth={2.4} className="text-green-ink" />
            </p>
          </div>
          <div>
            <p className="text-ink-3">Reviewed by</p>
            <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-purple-ink">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-purple/50" />
                <span className="relative inline-flex size-2 rounded-full bg-purple" />
              </span>
              Awaiting you
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Heritage() {
  return (
    <section className="relative border-y border-rule bg-mist">
      <div className="shell grid items-center gap-6 py-8 md:grid-cols-[7rem_1fr_auto]">
        <Seal className="hidden size-16 text-green-ink/70 md:block" count={12} strokeWidth={0.5} />
        <p className="max-w-[52ch] text-lg leading-snug text-ink">
          Born inside <strong className="font-semibold">Alkazim</strong>, an accounting and audit firm in Dubai. Built by
          people who do this work every day.
        </p>
        <Link to="/about" className="group inline-flex items-center gap-2 font-medium text-ink">
          <span className="link-quiet">Our story</span>
          <Arrow size={18} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}

const labour = [
  ['Reads every invoice, purchase order, contract and statement in the batch.', 'See only the items that need a professional eye.'],
  ['Matches documents to ledger lines, and quotes against each other.', 'Judge the exceptions, with the source document one click away.'],
  ['Checks totals, duplicates, missing items and agreed limits.', 'Decide what is material and what to raise with the client.'],
  ['Drafts the schedules, working papers and review report.', 'Review, edit and sign. Nothing leaves without a person.'],
]

function DivisionOfLabour() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="labour-title">
      <div className="shell">
        <SectionHead
          id="labour-title"
          refCode="A1"
          title="The software prepares. You decide."
          intro="Much of the day goes on work software can do: retyping figures, ticking documents against the ledger, chasing totals that don’t agree. Endloops takes that part and leaves the judgement with you."
        />

        <div className="mt-14 md:ml-28">
          <div className="flex flex-wrap gap-x-8 gap-y-2 border-b-2 border-ink pb-3 md:grid md:grid-cols-2">
            <p className="flex items-center gap-2.5 font-semibold">
              <Tick size={18} strokeWidth={2.2} className="text-green-ink" /> Endloops prepares
            </p>
            <p className="flex items-center gap-2.5 font-semibold md:pl-10">
              <Sign size={18} className="text-teal-ink" /> Your team decides
            </p>
          </div>
          <ol>
            {labour.map(([left, right], i) => (
              <Reveal as="li" key={i} delay={i * 0.06} className="grid border-b border-rule md:grid-cols-2">
                <div className="flex gap-4 py-6 md:pr-10">
                  <span className="mt-1 size-5 shrink-0 text-green-ink">
                    <DrawnTick delay={0.25 + i * 0.12} className="size-5" />
                  </span>
                  <p className="text-lg text-ink">
                    <span className="sr-only">Endloops prepares: </span>
                    {left}
                  </p>
                </div>
                <div className="flex gap-4 border-rule pb-6 md:border-l md:py-6 md:pl-10">
                  <Sign size={20} className="mt-1 shrink-0 text-teal-ink" />
                  <p className="text-lg text-ink-2">
                    <span className="sr-only">Your team decides: </span>
                    {right}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function StackVisual() {
  return (
    <div className="relative h-40 w-full max-w-[17rem]" aria-hidden="true">
      {solutions.map((s, i) => (
        <div
          key={s.ref}
          className="absolute inset-x-0 h-32 rounded-lg border border-ink/10 bg-white shadow-[0_8px_18px_-14px_rgba(13,20,36,0.5)] transition-transform duration-500 ease-file group-hover:translate-y-[calc(var(--i)*-4px)]"
          style={{ top: `${(solutions.length - 1 - i) * 9 + 12}px`, left: `${i * 4}px`, zIndex: 10 - i, '--i': 5 - i }}
        >
          <span
            className="ref absolute -top-3 grid h-6 w-10 place-items-center rounded-t-md bg-green text-[0.6875rem] text-ink"
            style={{ left: `${1 + i * 3.1}rem` }}
          >
            {s.ref}
          </span>
          {i === 0 && (
            <div className="space-y-2 p-4 pt-5">
              <div className="h-1.5 w-1/2 rounded bg-ink/80" />
              <div className="h-1.5 w-5/6 rounded bg-mist-2" />
              <div className="h-1.5 w-4/6 rounded bg-mist-2" />
              <div className="h-1.5 w-3/4 rounded bg-mist-2" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function SheetVisual() {
  return (
    <div className="relative h-40 w-full max-w-[17rem]" aria-hidden="true">
      <div className="absolute inset-x-6 top-2 h-36 rounded-lg border border-ink/10 bg-white shadow-[0_8px_18px_-14px_rgba(13,20,36,0.5)] transition-transform duration-500 ease-file group-hover:-translate-y-1 group-hover:-rotate-1">
        <span className="ref absolute -top-3 left-5 grid h-6 w-10 place-items-center rounded-t-md bg-blue text-[0.6875rem] text-white">C2</span>
        <div className="p-4 pt-5">
          <div className="h-1.5 w-1/2 rounded bg-ink/80" />
          <div className="mt-3 space-y-0">
            {[0, 1, 2, 3, 4].map((r) => (
              <div key={r} className="flex items-center justify-between border-b border-rule py-1.5">
                <div className="h-1.5 w-2/5 rounded bg-mist-2" />
                {r === 3 ? <Flag size={12} className="text-purple" /> : <Tick size={12} strokeWidth={2.4} className="text-green-ink" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const shapeRows = [
  ['Scope', 'An entire process or financial service, start to finish', 'One specific task, done thoroughly'],
  ['Best for', 'Recurring engagements: audits, reviews, budget cycles', 'Clearing one bottleneck in how you already work'],
  ['You receive', 'A prepared file, ready for review and sign-off', 'A finished schedule or dataset for that task'],
]

function TwoShapes() {
  return (
    <section className="border-t border-rule py-20 md:py-28" aria-labelledby="shapes-title">
      <div className="shell">
        <SectionHead
          id="shapes-title"
          refCode="A2"
          title="A whole process, or one task done well."
          intro="Endloops comes in two shapes. Both run on the same engine. They differ in how much of the work they take on."
        />

        <div className="relative mt-14 grid gap-px overflow-clip rounded-[1.1rem] bg-rule ring-1 ring-rule md:grid-cols-2">
          <Half
            to="/solutions"
            tone="green"
            title="End-to-end solutions"
            line="The whole file. Complete software that runs a process from the first document to a draft ready for sign-off."
            visual={<StackVisual />}
            col={1}
            items={solutions}
            cta="Explore solutions"
          />
          <Half
            to="/tools"
            tone="blue"
            title="Standalone tools"
            line="A single working paper. Focused tools that solve one need and work on their own, or side by side."
            visual={<SheetVisual />}
            col={2}
            items={tools}
            cta="Explore tools"
          />
          <span
            aria-hidden="true"
            className="heading absolute left-1/2 top-1/2 hidden size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-lg text-ink-3 ring-1 ring-rule md:grid"
          >
            or
          </span>
        </div>
      </div>
    </section>
  )
}

function Half({ to, tone, title, line, visual, col, items, cta }) {
  const toneText = tone === 'green' ? 'text-green-ink' : 'text-blue-ink'
  const toneDot = tone === 'green' ? 'bg-green' : 'bg-blue'
  return (
    <div className="group flex flex-col bg-white p-6 sm:p-10">
      <div className="flex min-h-40 items-end">{visual}</div>
      <h3 className="heading mt-10 text-[1.75rem] sm:text-[2rem]">{title}</h3>
      <p className="mt-3 max-w-[44ch] text-ink-2">{line}</p>

      <dl className="mt-8 border-t-2 border-ink">
        {shapeRows.map((row) => (
          <div key={row[0]} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-rule py-3.5 text-[0.9375rem]">
            <dt className="text-ink-3">{row[0]}</dt>
            <dd className="text-ink">{row[col]}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5 text-[0.9375rem] text-ink-2">
        {items.map((it) => (
          <li key={it.ref} className="flex items-center gap-2">
            <span className={`size-1.5 rounded-full ${toneDot}`} aria-hidden="true" />
            {it.name}
          </li>
        ))}
      </ul>

      <Link to={to} className={`mt-auto inline-flex items-center gap-2 pt-9 font-semibold ${toneText}`}>
        <span className="link-quiet">{cta}</span>
        <Arrow size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

function DemoSection() {
  return (
    <section id="demo" className="relative scroll-mt-[4.5rem] overflow-clip bg-navy py-20 md:py-28" aria-labelledby="demo-title">
      <Seal className="pointer-events-none absolute -top-64 -right-64 w-[44rem] text-teal/20" count={22} strokeWidth={0.6} />
      <div className="shell relative">
        <SectionHead
          id="demo-title"
          dark
          refCode="A3"
          title="Watch a vouching run, start to finish."
          intro="One of our standalone tools at work on sample data. Endloops handles the first four stations. The fifth is yours."
        />
        <Reveal className="mt-12">
          <VouchingDemo />
        </Reveal>
        <p className="mt-6 flex items-center gap-2 text-sm text-navy-text">
          <ArrowDown size={16} />
          The same engine powers every solution and tool.
        </p>
      </div>
    </section>
  )
}

const products = [...solutions, ...tools]

function Engine() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="engine-title">
      <div className="shell">
        <SectionHead
          id="engine-title"
          refCode="A4"
          title="One engine underneath every product."
          intro="Five capabilities, combined differently for each solution and tool."
        />
        <div className="mt-14 md:ml-28">
          <div className="hidden grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1.1fr)] gap-x-8 border-b-2 border-ink pb-3 text-sm font-semibold md:grid">
            <p>Ref</p>
            <p>Capability</p>
            <p>Used by</p>
          </div>
          <ol className="border-t-2 border-ink md:border-t-0">
            {capabilities.map((c, i) => {
              const users = products.filter((p) => p.uses.includes(c.id))
              return (
                <Reveal
                  as="li"
                  key={c.id}
                  delay={i * 0.05}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-4 border-b border-rule py-6 md:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-x-8"
                >
                  <span className="ref pt-1.5 text-ink-3" aria-hidden="true">
                    A4.{i + 1}
                  </span>
                  <div>
                    <h3 className="heading text-xl">{c.name}</h3>
                    <p className="mt-1.5 max-w-[46ch] text-[0.9375rem] text-ink-2">{c.line}</p>
                  </div>
                  <div className="col-start-2 md:col-start-auto md:pt-1">
                    <p className="sr-only">
                      Used by {users.length} of {products.length} products:
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {users.map((p) => (
                        <li key={p.ref}>
                          <span
                            aria-hidden="true"
                            title={p.name}
                            className={`ref inline-grid h-6 w-9 place-items-center rounded-[4px] text-[0.6875rem] ${
                              p.ref.startsWith('B') ? 'bg-green text-ink' : 'bg-blue text-white'
                            }`}
                          >
                            {p.ref}
                          </span>
                          <span className="sr-only">{p.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </ol>
          <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-3" aria-hidden="true">
            <span className="inline-flex items-center gap-2">
              <span className="ref inline-grid h-5 w-8 place-items-center rounded-[4px] bg-green text-[0.6875rem] text-ink">B</span>
              End-to-end solutions
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="ref inline-grid h-5 w-8 place-items-center rounded-[4px] bg-blue text-[0.6875rem] text-white">C</span>
              Standalone tools
            </span>
          </p>
        </div>
        <div className="mt-10 md:ml-28">
          <Link to="/tools#matrix" className="group inline-flex items-center gap-2 font-semibold text-ink">
            <span className="link-quiet">See which products use which capability</span>
            <Arrow size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

const principles = [
  ['Sign-off stays with people.', 'The software prepares. Nothing is filed, sent or signed without a professional’s review.'],
  ['Every figure has a source.', 'Each number and flag is referenced back to the document it came from, so review is a click, not a search.'],
  ['Made inside an audit firm.', 'Designed alongside the accountants and auditors of Alkazim, around how reviews actually run.'],
  ['Bulk without shortcuts.', 'Hundreds of documents in one run, each one held to the same rules.'],
]

function Principles() {
  return (
    <section className="border-t border-rule bg-mist py-20 md:py-28" aria-labelledby="principles-title">
      <div className="shell">
        <SectionHead id="principles-title" refCode="A5" title="Built to be trusted with the numbers." />
        <div className="mt-14 grid gap-px bg-rule-2 md:ml-28 md:grid-cols-2">
          {principles.map(([title, text], i) => (
            <Reveal key={title} delay={(i % 2) * 0.08} className="bg-mist py-8 md:p-10 md:first:pl-0 md:[&:nth-child(3)]:pl-0">
              <h3 className="heading text-2xl sm:text-[1.75rem]">{title}</h3>
              <p className="mt-3 max-w-[44ch] text-ink-2">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
