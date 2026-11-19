import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router'
import { entries, rules, aed, ledgerTotal } from '../data/demo.js'
import { Tick, Cast, Flag, Sign, Play, Reset, Document, Arrow } from './Marks.jsx'
import Seal from './Seal.jsx'
import { buttonClass } from './Button.jsx'

const ease = [0.22, 1, 0.36, 1]

const stations = [
  { id: 'read', name: 'Read', who: 'Endloops', hold: 3000 },
  { id: 'match', name: 'Match', who: 'Endloops', hold: 2700 },
  { id: 'check', name: 'Check', who: 'Endloops', hold: 3000 },
  { id: 'draft', name: 'Draft', who: 'Endloops', hold: 2600 },
  { id: 'review', name: 'Review', who: 'You' },
]

const flagged = entries.filter((e) => e.flag)
const docs = entries.filter((e) => e.doc)
const flagLetter = (line) => String.fromCharCode(97 + flagged.findIndex((f) => f.line === line))

const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

const status = [
  `Reading ${docs.length} documents and extracting ${docs.length * 4} fields.`,
  `${entries.length - 1} of ${entries.length} ledger entries matched to a document.`,
  `${rules.length} rules checked. ${flagged.length} items flagged for your judgement.`,
  'Vouching schedule drafted, cast and referenced.',
  'Your turn: decide each review point, then sign off.',
]

export default function VouchingDemo() {
  const [step, setStep] = useState(-1)
  const [reached, setReached] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [decisions, setDecisions] = useState({})
  const [signed, setSigned] = useState(false)
  const timer = useRef(0)

  useEffect(() => {
    if (!playing || step < 0 || step >= 4) return
    timer.current = window.setTimeout(() => {
      const next = step + 1
      setStep(next)
      setReached((r) => Math.max(r, next))
      if (next >= 4) setPlaying(false)
    }, stations[step].hold)
    return () => window.clearTimeout(timer.current)
  }, [playing, step])

  const run = () => {
    setDecisions({})
    setSigned(false)
    setStep(0)
    setReached(0)
    setPlaying(true)
  }

  const reset = () => {
    window.clearTimeout(timer.current)
    setPlaying(false)
    setStep(-1)
    setReached(-1)
    setDecisions({})
    setSigned(false)
  }

  const goTo = (i) => {
    if (i > reached) return
    setPlaying(false)
    setStep(i)
  }

  const decided = Object.keys(decisions).length

  return (
    <div className="overflow-clip rounded-[1.1rem] bg-white text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
      {/* file header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-4 sm:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <span className="ref grid size-8 shrink-0 place-items-center rounded-md bg-blue text-white">C2</span>
          <div className="min-w-0">
            <p className="font-semibold leading-tight">Vouching automation</p>
            <p className="text-sm text-ink-3">October payables · {entries.length} entries · Sample data</p>
          </div>
        </div>
        {step >= 0 && (
          <div className="flex items-center gap-2">
            <button type="button" onClick={reset} className={buttonClass({ variant: 'outline', className: '!h-10 !px-4 text-sm' })}>
              <Reset size={17} />
              <span>Reset</span>
            </button>
            <button
              type="button"
              onClick={run}
              disabled={playing}
              className={buttonClass({ variant: 'primary', className: '!h-10 !px-4 text-sm' })}
            >
              <Play size={16} />
              <span>{playing ? 'Running…' : 'Run again'}</span>
            </button>
          </div>
        )}
      </div>

      {/* stations */}
      <ol className="flex overflow-x-auto border-b border-rule [scrollbar-width:none]" aria-label="Stations">
        {stations.map((s, i) => {
          const isCurrent = step === i
          const done = i < step || (i === 4 && signed)
          const locked = i > reached
          return (
            <li key={s.id} className="relative min-w-0 flex-1 sm:min-w-[8.5rem]">
              <button
                type="button"
                onClick={() => goTo(i)}
                disabled={locked}
                aria-current={isCurrent ? 'step' : undefined}
                className="flex w-full flex-col items-center gap-1.5 px-1 py-3 text-center transition-colors enabled:hover:bg-mist disabled:cursor-default sm:flex-row sm:gap-3 sm:px-6 sm:py-3.5 sm:text-left"
              >
                <span
                  className={`ref grid size-7 shrink-0 place-items-center rounded-full text-[0.6875rem] transition-colors duration-300 ${
                    done
                      ? i === 4
                        ? 'bg-teal text-white'
                        : 'bg-green-ink text-white'
                      : isCurrent
                        ? i === 4
                          ? 'bg-teal text-white'
                          : 'bg-ink text-white'
                        : 'bg-mist text-ink-3 ring-1 ring-inset ring-rule'
                  }`}
                >
                  {done ? <Tick size={14} strokeWidth={2.4} /> : i + 1}
                </span>
                <span className="min-w-0">
                  <span className={`block text-[0.8125rem] font-semibold sm:text-[0.9375rem] ${locked ? 'text-ink-3' : 'text-ink'}`}>{s.name}</span>
                  <span className={`hidden text-xs sm:block ${i === 4 ? 'text-teal-ink' : 'text-ink-3'}`}>{s.who}</span>
                </span>
              </button>
              {isCurrent && (
                <motion.span
                  layoutId="station-bar"
                  className={`absolute inset-x-0 bottom-0 h-[3px] ${i === 4 ? 'bg-teal' : 'bg-ink'}`}
                  transition={{ type: 'spring', bounce: 0, visualDuration: 0.4 }}
                />
              )}
              {isCurrent && playing && i < 4 && (
                <motion.span
                  key={`progress-${i}`}
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-green"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: s.hold / 1000, ease: 'linear' }}
                />
              )}
            </li>
          )
        })}
      </ol>

      <p className="sr-only" aria-live="polite">
        {step >= 0 ? `Step ${step + 1} of 5, ${stations[step].name}. ${status[step]}` : ''}
        {signed ? ' Schedule signed off.' : ''}
      </p>

      {/* stage */}
      <div className="relative min-h-[30rem] px-5 py-6 sm:px-7 sm:py-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease }}
          >
            {step === -1 && <Idle onRun={run} />}
            {step === 0 && <ReadStage />}
            {step === 1 && <MatchStage />}
            {step === 2 && <CheckStage />}
            {step === 3 && <DraftStage />}
            {step === 4 && (
              <ReviewStage
                decisions={decisions}
                setDecisions={setDecisions}
                decided={decided}
                signed={signed}
                onSign={() => setSigned(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step >= 0 && (
        <div className="flex items-center gap-3 border-t border-rule bg-mist px-5 py-3 text-sm text-ink-2 sm:px-7">
          <span className={`size-2 shrink-0 rounded-full ${step === 4 ? (signed ? 'bg-teal' : 'bg-purple') : 'bg-green'} ${playing ? 'animate-pulse' : ''}`} />
          <span>{signed ? 'Signed off. Nothing left this file without a person.' : status[step]}</span>
        </div>
      )}
    </div>
  )
}

function Idle({ onRun }) {
  return (
    <div className="grid items-center gap-10 py-4 md:grid-cols-[1.1fr_1fr]">
      <div className="relative mx-auto h-64 w-full max-w-sm">
        {docs.slice(0, 5).map((e, i) => (
          <motion.div
            key={e.line}
            className="absolute left-1/2 top-1/2 w-52 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-rule bg-white p-4 shadow-[0_14px_30px_-18px_rgba(13,20,36,0.45)]"
            initial={{ rotate: 0, x: 0, y: 0, opacity: 0 }}
            animate={{ rotate: (i - 2) * 6, x: (i - 2) * 26, y: Math.abs(i - 2) * 8, opacity: 1 }}
            transition={{ delay: 0.05 * i, duration: 0.6, ease }}
          >
            <div className="flex items-center justify-between">
              <Document size={18} className="text-ink-3" />
              <span className="ref text-ink-3">{e.doc}</span>
            </div>
            <p className="mt-4 truncate text-sm font-semibold">{e.supplier}</p>
            <div className="mt-3 space-y-1.5">
              <div className="h-1.5 w-full rounded bg-mist-2" />
              <div className="h-1.5 w-3/4 rounded bg-mist-2" />
            </div>
            <p className="figures mt-4 text-right text-sm font-semibold">AED {aed(e.invoice)}</p>
          </motion.div>
        ))}
      </div>
      <div>
        <h3 className="heading text-2xl sm:text-[1.75rem]">Eight ledger entries. Seven invoices. One reviewer.</h3>
        <p className="mt-4 max-w-[46ch] text-ink-2">
          Run the batch to watch Endloops read the documents, match them to the ledger, check them against the rules
          and draft the vouching schedule. Then the review is yours.
        </p>
        <button type="button" onClick={onRun} className={buttonClass({ size: 'lg', className: 'mt-7' })}>
          <Play size={18} />
          <span>Run sample batch</span>
        </button>
        <p className="mt-4 text-sm text-ink-3">Takes about 12 seconds. All names and amounts are invented.</p>
      </div>
    </div>
  )
}

function ReadStage() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {docs.map((e, i) => (
          <div key={e.line} className="relative overflow-clip rounded-lg border border-rule bg-white p-3.5">
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-10 bg-linear-to-b from-green/0 via-green/20 to-green/0"
              initial={{ y: '-120%' }}
              animate={{ y: '420%' }}
              transition={{ delay: i * 0.26, duration: 0.9, ease: 'easeInOut' }}
            />
            <div className="flex items-center justify-between">
              <Document size={16} className="text-ink-3" />
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.26 + 0.75, duration: 0.3 }}
                className="text-green-ink"
              >
                <Tick size={16} strokeWidth={2.2} />
              </motion.span>
            </div>
            {[
              ['Supplier', e.supplier],
              ['Invoice', e.doc],
              ['Date', `${e.date} 2026`],
              ['Total', `AED ${aed(e.invoice)}`],
            ].map(([k, v], f) => (
              <motion.div
                key={k}
                className="mt-2 rounded px-1.5 py-1"
                initial={{ backgroundColor: 'rgba(8,171,102,0)' }}
                animate={{ backgroundColor: 'rgba(8,171,102,0.09)' }}
                transition={{ delay: i * 0.26 + 0.3 + f * 0.08, duration: 0.3 }}
              >
                <span className="block text-[0.6875rem] uppercase tracking-wide text-ink-3">{k}</span>
                <span className="figures block truncate text-[0.8125rem] font-medium">{v}</span>
              </motion.div>
            ))}
          </div>
        ))}
        <div className="grid place-items-center rounded-lg border border-dashed border-purple/50 bg-purple-wash/50 p-4 text-center">
          <div>
            <Flag size={20} className="mx-auto text-purple-ink" />
            <p className="mt-2 text-sm font-medium text-purple-ink">Line 7 has no document</p>
            <p className="text-xs text-ink-3">Creek Electrical Works</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MatchStage() {
  return (
    <div>
      <div className="mb-3 grid grid-cols-[1fr_4.5rem_1fr] gap-3 text-xs font-medium uppercase tracking-wide text-ink-3 sm:grid-cols-[1fr_8rem_1fr]">
        <span>General ledger</span>
        <span />
        <span>Supporting document</span>
      </div>
      <ul className="space-y-2">
        {entries.map((e, i) => (
          <motion.li
            key={e.line}
            className="grid grid-cols-[1fr_4.5rem_1fr] items-center gap-3 sm:grid-cols-[1fr_8rem_1fr]"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.35, ease }}
          >
            <div className="flex min-w-0 items-center justify-between gap-2 rounded-md border border-rule px-3 py-2">
              <span className="min-w-0 truncate text-sm">
                <span className="ref mr-2 text-ink-3">{String(e.line).padStart(2, '0')}</span>
                {e.supplier}
              </span>
              <span className="figures hidden shrink-0 text-sm font-medium sm:block">{aed(e.ledger)}</span>
            </div>
            <div className="relative flex h-full items-center">
              <motion.span
                className={`h-px w-full origin-left ${e.doc ? 'bg-blue' : 'border-t border-dashed border-purple bg-transparent'}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: e.doc ? 1 : 0.55 }}
                transition={{ delay: i * 0.12 + 0.25, duration: 0.45, ease }}
              />
              <motion.span
                className={`absolute ${e.doc ? 'right-0 text-blue' : 'left-[55%] text-purple-ink'} bg-white`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12 + 0.6, duration: 0.25 }}
              >
                {e.doc ? <Cast size={18} /> : <Flag size={18} />}
              </motion.span>
            </div>
            <div
              className={`flex min-w-0 items-center justify-between gap-2 rounded-md px-3 py-2 ${
                e.doc ? 'border border-blue/30 bg-blue-wash/60' : 'border border-dashed border-purple/40'
              }`}
            >
              <span className={`ref truncate ${e.doc ? 'text-ink' : 'text-purple-ink'}`}>{e.doc ?? 'Not found'}</span>
              <span className="figures hidden shrink-0 text-sm font-medium sm:block">{e.doc ? aed(e.invoice) : ''}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

const ruleHits = {
  agree: entries.filter((e) => e.line === 3),
  dup: entries.filter((e) => e.line === 6),
  support: entries.filter((e) => e.line === 7),
  limit: entries.filter((e) => e.line === 8),
}

function CheckStage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <ul className="space-y-3">
        {rules.map((r, i) => (
          <motion.li
            key={r.id}
            className="flex items-start gap-4 rounded-lg border border-rule p-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.5, duration: 0.35, ease }}
          >
            <motion.span
              className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-purple-wash text-purple-ink"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.5 + 0.35, duration: 0.3, ease: [0.34, 1.4, 0.64, 1] }}
            >
              <Flag size={17} />
            </motion.span>
            <div className="min-w-0">
              <p className="font-medium">{r.label}</p>
              <p className="text-sm text-ink-3">
                {entries.length - ruleHits[r.id].length} passed ·{' '}
                <span className="text-purple-ink">
                  1 exception on line {ruleHits[r.id][0].line}
                </span>
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
      <motion.div
        className="rounded-lg bg-mist p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.4 }}
      >
        <p className="text-sm font-medium text-ink-3">Flagged for your judgement</p>
        <ul className="mt-3 space-y-3">
          {flagged.map((e) => (
            <li key={e.line} className="flex gap-3 text-sm">
              <span className="ref mt-0.5 grid size-6 shrink-0 place-items-center rounded bg-purple text-white">{flagLetter(e.line)}</span>
              <span>
                <span className="font-semibold">{e.flag.kind}</span>
                <span className="text-ink-2"> · line {e.line}, {e.supplier}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-rule-2 pt-4 text-sm text-ink-2">
          The other {entries.length - flagged.length} entries pass every rule and are marked agreed.
        </p>
      </motion.div>
    </div>
  )
}

function Schedule({ compact = false }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[38rem] border-collapse text-sm">
        <caption className="sr-only">Vouching schedule, October payables (sample data)</caption>
        <thead>
          <tr className="border-b-2 border-ink text-left text-xs uppercase tracking-wide text-ink-3">
            <th scope="col" className="py-2 pr-3 font-medium">Ref</th>
            <th scope="col" className="py-2 pr-3 font-medium">Supplier</th>
            <th scope="col" className="py-2 pr-3 font-medium">Document</th>
            <th scope="col" className="py-2 pr-3 text-right font-medium">Ledger AED</th>
            <th scope="col" className="py-2 pr-3 text-right font-medium">Invoice AED</th>
            <th scope="col" className="py-2 text-center font-medium">Mark</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <motion.tr
              key={e.line}
              className={`border-b border-rule ${e.flag ? 'bg-purple-wash/45' : ''}`}
              initial={compact ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <td className="ref py-2.5 pr-3 text-ink-3">C2.{e.line}</td>
              <td className="py-2.5 pr-3">{e.supplier}</td>
              <td className={`ref py-2.5 pr-3 ${e.doc ? '' : 'text-purple-ink'}`}>{e.doc ?? 'None'}</td>
              <td className="py-2.5 pr-3 text-right">{aed(e.ledger)}</td>
              <td className={`py-2.5 pr-3 text-right ${e.flag && e.invoice !== e.ledger ? 'text-purple-ink' : ''}`}>{aed(e.invoice)}</td>
              <td className="py-2.5 text-center">
                {e.flag ? (
                  <span className="inline-flex items-center gap-1 text-purple-ink" title={e.flag.kind}>
                    <Flag size={17} />
                    <sup className="ref">{flagLetter(e.line)}</sup>
                  </span>
                ) : (
                  <Tick size={17} strokeWidth={2.1} className="inline text-green-ink" title="Agreed to invoice" />
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-b-[3px] border-double border-ink font-semibold">
            <td className="py-2.5 pr-3" colSpan={3}>
              Total, cast and agreed to ledger
            </td>
            <td className="py-2.5 pr-3 text-right">{aed(ledgerTotal)}</td>
            <td />
            <td className="py-2.5 text-center text-blue">
              <Cast size={17} className="inline" title="Cast" />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

function DraftStage() {
  return (
    <div>
      <Schedule />
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-2">
        <span className="inline-flex items-center gap-2">
          <Tick size={16} strokeWidth={2.1} className="text-green-ink" /> Agreed to invoice
        </span>
        <span className="inline-flex items-center gap-2">
          <Cast size={16} className="text-blue" /> Cast
        </span>
        <span className="inline-flex items-center gap-2">
          <Flag size={16} className="text-purple-ink" /> Needs your judgement
        </span>
        <span className="ml-auto inline-flex items-center gap-2 text-ink-3">
          Prepared by Endloops · {today}
        </span>
      </div>
    </div>
  )
}

function ReviewStage({ decisions, setDecisions, decided, signed, onSign }) {
  const remaining = flagged.length - decided
  const signRef = useRef(null)
  const tally = useMemo(() => {
    const v = Object.values(decisions)
    return { accept: v.filter((d) => d === 'accept').length, query: v.filter((d) => d === 'query').length }
  }, [decisions])

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
      <ul className="space-y-3" aria-label="Review points">
        {flagged.map((e) => {
          const d = decisions[e.line]
          return (
            <li key={e.line} className={`rounded-lg border p-4 transition-colors duration-300 ${d ? 'border-rule bg-mist' : 'border-purple/35 bg-white'}`}>
              <div className="flex items-start gap-3">
                <span className="ref mt-0.5 grid size-6 shrink-0 place-items-center rounded bg-purple text-white">{flagLetter(e.line)}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">
                    {e.flag.kind} <span className="font-normal text-ink-3">· line {e.line}, {e.supplier}</span>
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{e.flag.note}</p>
                  <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={`Decision for point ${flagLetter(e.line)}`}>
                    {[
                      ['accept', 'Accept explanation'],
                      ['query', 'Query with client'],
                    ].map(([val, label]) => {
                      const on = d === val
                      return (
                        <button
                          key={val}
                          type="button"
                          disabled={signed}
                          aria-pressed={on}
                          onClick={() => setDecisions((prev) => ({ ...prev, [e.line]: val }))}
                          className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors duration-200 disabled:cursor-default ${
                            on
                              ? val === 'accept'
                                ? 'bg-green-ink text-white'
                                : 'bg-purple text-white'
                              : 'text-ink ring-1 ring-inset ring-rule-2 enabled:hover:ring-ink'
                          }`}
                        >
                          {on && <Tick size={14} strokeWidth={2.4} />}
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="relative flex flex-col rounded-lg border border-rule p-5">
        <p className="text-sm font-medium text-ink-3">Sign-off</p>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-rule pb-3">
            <dt className="text-ink-2">Prepared by</dt>
            <dd className="flex items-center gap-1.5 font-medium">
              Endloops <Tick size={15} strokeWidth={2.2} className="text-green-ink" />
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-rule pb-3">
            <dt className="text-ink-2">Entries prepared</dt>
            <dd className="figures font-medium">{entries.length}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-rule pb-3">
            <dt className="text-ink-2">Your decisions</dt>
            <dd className="figures font-medium">
              {decided} of {flagged.length}
              {decided > 0 && (
                <span className="font-normal text-ink-3">
                  {' '}
                  ({tally.accept} accepted, {tally.query} queried)
                </span>
              )}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-2">Reviewed by</dt>
            <dd className={`font-medium ${signed ? 'text-teal-ink' : 'text-ink-3'}`}>{signed ? `You · ${today}` : 'Awaiting you'}</dd>
          </div>
        </dl>

        <div className="relative mt-6 flex flex-1 flex-col justify-end">
          <AnimatePresence mode="wait" initial={false}>
            {!signed ? (
              <motion.div key="sign" exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                <button
                  ref={signRef}
                  type="button"
                  onClick={onSign}
                  disabled={remaining > 0}
                  className={buttonClass({ variant: 'primary', size: 'lg', className: 'w-full !bg-teal hover:!bg-teal-ink' })}
                >
                  <Sign size={20} />
                  <span>Sign off schedule</span>
                </button>
                <p className="mt-2.5 text-center text-sm text-ink-3" aria-live="polite">
                  {remaining > 0 ? `Decide ${remaining} more review point${remaining === 1 ? '' : 's'} to sign off.` : 'Ready for your signature.'}
                </p>
              </motion.div>
            ) : (
              <motion.div key="signed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
                <motion.div
                  className="pointer-events-none absolute -right-4 -top-40 size-40 text-teal sm:-top-44 sm:size-44"
                  initial={{ scale: 1.6, rotate: -24, opacity: 0 }}
                  animate={{ scale: 1, rotate: -9, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Seal count={14} strokeWidth={0.7} />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="rounded-md bg-white/90 px-2.5 py-1.5 text-center">
                      <p className="ref text-[0.6875rem] uppercase tracking-widest text-teal-ink">Reviewed</p>
                      <p className="text-xs font-semibold text-ink">{today}</p>
                    </div>
                  </div>
                </motion.div>
                <p className="heading text-lg">That’s the job.</p>
                <p className="mt-1.5 text-sm text-ink-2">
                  Endloops prepared {entries.length} entries. You made {flagged.length} decisions. The rest of the file was
                  ready before you opened it.
                </p>
                <Link to="/contact?type=demo" className={buttonClass({ variant: 'primary', className: 'mt-4 w-full' })}>
                  <span>Try it on your documents</span>
                  <Arrow size={18} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
