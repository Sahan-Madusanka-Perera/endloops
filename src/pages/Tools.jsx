import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { AnimatePresence, motion, useInView } from 'motion/react'
import PageHero from '../components/PageHero.jsx'
import CtaPanel from '../components/CtaPanel.jsx'
import Button from '../components/Button.jsx'
import Reveal, { SectionHead } from '../components/Reveal.jsx'
import { Arrow, Tick } from '../components/Marks.jsx'
import { tools, solutions, capabilities } from '../data/products.js'

const ease = [0.22, 1, 0.36, 1]

export default function Tools() {
  return (
    <>
      <title>Standalone tools · Endloops</title>
      <meta name="description" content="Focused automation tools for one specific financial task: extraction, vouching, reconciliation and more." />
      <PageHero
        letter="C"
        tone="blue"
        title="Standalone tools"
        aside={
          <div className="flex flex-wrap gap-3">
            <Button to="/contact?type=demo" variant="light" size="lg" arrow>
              Request a demo
            </Button>
            <Button href="#extraction" variant="outlineDark" size="lg">
              See a tool at work
            </Button>
          </div>
        }
      >
        Focused tools that solve one specific need. Use one on its own, or several side by side, inside the way your team
        already works.
      </PageHero>
      <ToolIndex />
      <Extraction />
      <Matrix />
      <CtaPanel title="Start with the task that hurts most." text="Most teams begin with one tool on one bottleneck. Tell us yours and we’ll show you what it hands back." />
    </>
  )
}

function CapMarks({ uses, dark = false }) {
  return (
    <ul className="flex gap-1" aria-label="Capabilities used">
      {capabilities.map((c) => {
        const on = uses.includes(c.id)
        return (
          <li
            key={c.id}
            title={`${c.name}${on ? '' : ' (not used)'}`}
            className={`ref grid size-6 place-items-center rounded-full text-[0.6875rem] ${
              on ? (dark ? 'bg-white text-ink' : 'bg-ink text-white') : 'text-ink-3/60 ring-1 ring-inset ring-rule'
            }`}
          >
            <span aria-hidden="true">{c.mark}</span>
            <span className="sr-only">{on ? c.name : `${c.name}, not used`}</span>
          </li>
        )
      })}
    </ul>
  )
}

function ToolIndex() {
  const [filter, setFilter] = useState('all')
  const { hash } = useLocation()
  const shown = filter === 'all' ? tools : tools.filter((t) => t.uses.includes(filter))

  useEffect(() => {
    // A linked tool must be visible, so clear any filter; the layout scrolls to it.
    if (tools.some((t) => `#${t.slug}` === hash)) setFilter('all')
  }, [hash])

  return (
    <section className="py-20 md:py-28" aria-labelledby="index-title">
      <div className="shell">
        <SectionHead
          id="index-title"
          refCode="C1–C6"
          tone="text-blue-ink"
          title="Six tools, one job each."
          intro="Each tool takes one kind of input and hands back one finished output. Some are in use today and others are in development."
        />

        <div className="mt-12 md:ml-28">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter tools by capability">
            {[{ id: 'all', name: 'All tools' }, ...capabilities].map((c) => {
              const on = filter === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(c.id)}
                  className={`relative h-10 rounded-full px-4 text-sm font-medium transition-colors duration-200 ${
                    on ? 'text-white' : 'text-ink-2 ring-1 ring-inset ring-rule-2 hover:text-ink hover:ring-ink'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="tool-filter"
                      className="absolute inset-0 rounded-full bg-blue"
                      transition={{ type: 'spring', bounce: 0, visualDuration: 0.3 }}
                    />
                  )}
                  <span className="relative">{c.name}</span>
                </button>
              )
            })}
            <p className="ml-auto text-sm text-ink-3" aria-live="polite">
              Showing {shown.length} of {tools.length}
            </p>
          </div>

          <div className="mt-8 border-t-2 border-ink">
            <div className="hidden grid-cols-[4.5rem_1.3fr_1fr_9.5rem] gap-6 border-b border-rule py-3 text-xs font-medium uppercase tracking-wide text-ink-3 lg:grid">
              <span>Ref</span>
              <span>Tool</span>
              <span className="inline-flex items-center gap-1.5">
                Takes in <Arrow size={13} /> Hands back
              </span>
              <span>Capabilities</span>
            </div>
            <ul className="relative">
              <AnimatePresence initial={false} mode="popLayout">
                {shown.map((t) => (
                  <motion.li
                    layout
                    key={t.slug}
                    id={t.slug}
                    className="grid scroll-mt-28 gap-4 border-b border-rule py-7 lg:grid-cols-[4.5rem_1.3fr_1fr_9.5rem] lg:gap-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <span className="ref inline-grid h-7 w-11 place-items-center self-start rounded-[5px] bg-blue text-white">{t.ref}</span>
                    <div>
                      <h3 className="heading text-2xl">{t.name}</h3>
                      <p className="mt-2 max-w-[52ch] text-ink-2">{t.summary}</p>
                    </div>
                    <dl className="grid content-start gap-3 text-[0.9375rem]">
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wide text-ink-3">Takes in</dt>
                        <dd className="mt-0.5 text-ink">{t.input}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wide text-ink-3">Hands back</dt>
                        <dd className="mt-0.5 text-ink">{t.output}</dd>
                      </div>
                    </dl>
                    <div className="self-start">
                      <CapMarks uses={t.uses} />
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

const fields = [
  { key: 'supplier', label: 'Supplier', value: 'Gulf Coast Facilities LLC' },
  { key: 'number', label: 'PO number', value: 'PO-26-0318' },
  { key: 'date', label: 'Order date', value: '2026-10-02' },
  { key: 'items', label: 'Line items', value: '3 lines · qty 6' },
  { key: 'subtotal', label: 'Subtotal', value: 'AED 13,450.00' },
  { key: 'vat', label: 'VAT 5%', value: 'AED 672.50' },
  { key: 'total', label: 'Total', value: 'AED 14,122.50' },
]

const lines = [
  ['Quarterly HVAC maintenance, Tower A', 1, '9,800.00', '9,800.00'],
  ['Filter replacement, set of 24', 2, '1,150.00', '2,300.00'],
  ['Emergency call-out', 3, '450.00', '1,350.00'],
]

function Extraction() {
  const [active, setActive] = useState('supplier')
  const [touched, setTouched] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })

  useEffect(() => {
    if (touched || !inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setActive((a) => fields[(fields.findIndex((f) => f.key === a) + 1) % fields.length].key)
    }, 1600)
    return () => window.clearInterval(id)
  }, [touched, inView])

  const pick = (k) => {
    setTouched(true)
    setActive(k)
  }

  const zone = (k) =>
    `rounded-md transition-[background-color,box-shadow] duration-300 ${
      active === k ? 'bg-blue-wash shadow-[0_0_0_2px_var(--color-blue)]' : 'shadow-[0_0_0_0px_transparent]'
    }`

  return (
    <section id="extraction" ref={ref} className="scroll-mt-20 relative overflow-clip bg-navy py-20 md:py-28" aria-labelledby="extraction-title">
      <div className="shell relative">
        <SectionHead
          id="extraction-title"
          dark
          refCode="C1 at work"
          title="How purchase-order extraction reads a document."
          intro="Point at any extracted field to see where it came from on the page. Every value keeps a link to its source, which is what makes the output reviewable."
        />

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 md:ml-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {/* the document */}
          <Reveal className="rounded-xl bg-white p-6 text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-ink pb-5">
              <div className={`-m-2 p-2 ${zone('supplier')}`} onMouseEnter={() => pick('supplier')}>
                <p className="font-semibold">Gulf Coast Facilities LLC</p>
                <p className="text-sm text-ink-3">Al Quoz Industrial Area 3, Dubai</p>
              </div>
              <div className="text-right">
                <p className="heading text-xl tracking-wide">PURCHASE ORDER</p>
                <div className={`-mx-2 mt-1 px-2 py-0.5 ${zone('number')}`} onMouseEnter={() => pick('number')}>
                  <span className="text-sm text-ink-3">No. </span>
                  <span className="ref text-sm">PO-26-0318</span>
                </div>
                <div className={`-mx-2 px-2 py-0.5 ${zone('date')}`} onMouseEnter={() => pick('date')}>
                  <span className="text-sm text-ink-3">Date </span>
                  <span className="text-sm">02 October 2026</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink-3">Bill to: Marina Heights Owners Association</p>

            <div className={`mt-5 -mx-2 overflow-x-auto px-2 py-1 ${zone('items')}`} onMouseEnter={() => pick('items')}>
              <table className="w-full text-sm sm:min-w-[26rem]">
                <caption className="sr-only">Sample purchase order line items</caption>
                <thead>
                  <tr className="border-b border-rule text-left text-xs uppercase tracking-wide text-ink-3">
                    <th scope="col" className="py-2 font-medium">Description</th>
                    <th scope="col" className="hidden py-2 text-right font-medium sm:table-cell">Qty</th>
                    <th scope="col" className="hidden py-2 text-right font-medium sm:table-cell">Unit</th>
                    <th scope="col" className="py-2 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l) => (
                    <tr key={l[0]} className="border-b border-rule">
                      <td className="py-2 pr-3">{l[0]}</td>
                      <td className="hidden py-2 text-right sm:table-cell">{l[1]}</td>
                      <td className="hidden py-2 text-right sm:table-cell">{l[2]}</td>
                      <td className="py-2 text-right">{l[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="figures ml-auto mt-4 w-full max-w-[15rem] space-y-1 text-sm">
              <div className={`-mx-2 flex justify-between px-2 py-1 ${zone('subtotal')}`} onMouseEnter={() => pick('subtotal')}>
                <span className="text-ink-3">Subtotal</span>
                <span>13,450.00</span>
              </div>
              <div className={`-mx-2 flex justify-between px-2 py-1 ${zone('vat')}`} onMouseEnter={() => pick('vat')}>
                <span className="text-ink-3">VAT 5%</span>
                <span>672.50</span>
              </div>
              <div
                className={`-mx-2 flex justify-between border-t-2 border-ink px-2 py-1.5 font-semibold ${zone('total')}`}
                onMouseEnter={() => pick('total')}
              >
                <span>Total AED</span>
                <span>14,122.50</span>
              </div>
            </div>
            <p className="mt-6 text-xs text-ink-3">Sample document. Names and amounts are invented.</p>
          </Reveal>

          {/* the extraction */}
          <Reveal delay={0.1} className="rounded-xl bg-navy-2 p-6 ring-1 ring-navy-rule sm:p-8">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-white">Extracted record</p>
              <span className="inline-flex items-center gap-1.5 text-sm text-[#7fe0b4]">
                <Tick size={15} strokeWidth={2.4} /> 7 of 7 fields
              </span>
            </div>
            <ul className="mt-5 space-y-1.5" aria-label="Extracted fields. Select one to highlight its source.">
              {fields.map((f) => {
                const on = active === f.key
                return (
                  <li key={f.key}>
                    <button
                      type="button"
                      onMouseEnter={() => pick(f.key)}
                      onFocus={() => pick(f.key)}
                      onClick={() => pick(f.key)}
                      aria-pressed={on}
                      className={`grid w-full grid-cols-[7rem_1fr] items-center gap-3 rounded-lg px-3.5 py-2.5 text-left transition-colors duration-200 ${
                        on ? 'bg-blue text-white' : 'text-navy-text hover:bg-white/5'
                      }`}
                    >
                      <span className={`text-xs font-medium uppercase tracking-wide ${on ? 'text-white/80' : 'text-navy-text/80'}`}>
                        {f.label}
                      </span>
                      <span className={`ref truncate text-[0.8125rem] ${on ? 'text-white' : 'text-white/90'}`}>{f.value}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <p className="mt-6 border-t border-navy-rule pt-5 text-sm text-navy-text">
              Checked on the way out: line amounts multiply out, the subtotal casts, and VAT is 5% of the subtotal.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Matrix() {
  const rows = [...solutions.map((s) => ({ ...s, type: 'Solution' })), ...tools.map((t) => ({ ...t, type: 'Tool' }))]
  return (
    <section id="matrix" className="scroll-mt-20 py-20 md:py-28" aria-labelledby="matrix-title">
      <div className="shell">
        <SectionHead
          id="matrix-title"
          refCode="Matrix"
          tone="text-blue-ink"
          title="One engine, combined differently."
          intro="Solutions use the whole engine to run a process end to end. Tools use the part their task needs."
        />
        <p className="mt-10 text-sm text-ink-3 md:hidden">Swipe the table sideways to see every capability.</p>
        <Reveal className="mt-4 -mx-5 overflow-x-auto px-5 md:mx-0 md:mt-12 md:ml-28 md:px-0">
          <table className="w-full min-w-[40rem] border-collapse text-[0.9375rem]">
            <caption className="sr-only">Which capabilities each solution and tool uses</caption>
            <thead>
              <tr className="border-b-2 border-ink text-left">
                <th scope="col" className="py-3 pr-4 font-semibold">Product</th>
                {capabilities.map((c) => (
                  <th key={c.id} scope="col" className="w-20 py-3 text-center font-semibold">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.slug}
                  className={`border-b border-rule ${i === solutions.length ? 'border-t-2 border-t-ink' : ''}`}
                >
                  <th scope="row" className="py-3 pr-4 text-left font-normal">
                    <span
                      className={`ref mr-3 inline-grid h-6 w-9 place-items-center rounded-[4px] text-[0.6875rem] ${
                        r.type === 'Solution' ? 'bg-green text-ink' : 'bg-blue text-white'
                      }`}
                    >
                      {r.ref}
                    </span>
                    {r.name}
                  </th>
                  {capabilities.map((c) => (
                    <td key={c.id} className="py-3 text-center">
                      {r.uses.includes(c.id) ? (
                        <Tick size={18} strokeWidth={2.1} className={`inline ${r.type === 'Solution' ? 'text-green-ink' : 'text-blue'}`} title={`Uses ${c.name}`} />
                      ) : (
                        <span className="text-rule-2" aria-label={`Does not use ${c.name}`}>
                          –
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-6 flex items-center gap-2 text-sm text-ink-3 md:ml-28">
          <Arrow size={15} /> Green rows are end-to-end solutions; blue rows are standalone tools.
        </p>
      </div>
    </section>
  )
}
