import { useId, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import PageHero from '../components/PageHero.jsx'
import Seal from '../components/Seal.jsx'
import { buttonClass } from '../components/Button.jsx'
import { Arrow, Pin, Tick } from '../components/Marks.jsx'

const ease = [0.22, 1, 0.36, 1]

const roles = ['Accountant', 'Auditor', 'In-house finance team', 'Property management company', 'Something else']
const reasons = [
  { id: 'demo', label: 'Request a demo', hint: 'A walkthrough on documents like yours' },
  { id: 'question', label: 'Ask a question', hint: 'About a product, fit or pricing' },
  { id: 'careers', label: 'Join the team', hint: 'Engineering, design or quality' },
]
const interestOptions = ['End-to-end solutions', 'Standalone tools', 'Not sure yet']
const MAX = 800

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!v.email.trim()) e.email = 'Enter your work email address.'
  else if (!emailOk(v.email)) e.email = 'Enter an email address like name@company.com.'
  if (!v.company.trim()) e.company = 'Enter the name of your company or firm.'
  if (!v.role) e.role = 'Choose the option closest to your role.'
  if (!v.reason) e.reason = 'Choose what you’d like to do.'
  if (v.reason === 'question' && v.message.trim().length < 10) e.message = 'Write a sentence or two so we can answer properly.'
  if (v.message.length > MAX) e.message = `Keep your message under ${MAX} characters.`
  return e
}

const labels = { name: 'Full name', email: 'Work email', company: 'Company', role: 'Role', reason: 'What you’d like', message: 'Message' }

export default function Contact() {
  const [params] = useSearchParams()
  const initialReason = reasons.some((r) => r.id === params.get('type')) ? params.get('type') : 'demo'
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    reason: initialReason,
    interests: [],
    message: '',
  })
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const summaryRef = useRef(null)
  const uid = useId()

  const errors = validate(values)
  const show = (k) => (touched[k] || submitted) && errors[k]

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }))
  const toggleInterest = (opt) =>
    setValues((v) => ({
      ...v,
      interests: v.interests.includes(opt) ? v.interests.filter((x) => x !== opt) : [...v.interests, opt],
    }))

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    // Front-end only for this build: no message is sent anywhere.
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      setDone(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 900)
  }

  const id = (k) => `${uid}-${k}`
  const describedBy = (k, extra) => [show(k) ? `${id(k)}-err` : null, extra].filter(Boolean).join(' ') || undefined
  const fieldCls = (k) =>
    `mt-2 block h-12 w-full rounded-lg bg-white px-4 text-ink ring-1 ring-inset transition-shadow duration-200 placeholder:text-ink-3 focus:outline-none focus:ring-2 ${
      show(k) ? 'ring-purple focus:ring-purple' : 'ring-rule-2 hover:ring-ink-3 focus:ring-blue'
    }`

  return (
    <>
      <title>Talk to us · Endloops</title>
      <meta name="description" content="Request a demo or ask a question. Tell us which process takes your team the most time." />
      <PageHero letter="E" tone="teal" title="Talk to us">
        Tell us about the work that takes your team the most time. We’ll arrange a walkthrough on documents like yours.
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_22rem] lg:gap-20">
          <div className="min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              {done ? (
                <Success key="done" name={values.name} email={values.email} reason={values.reason} />
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease }}
                  className="max-w-2xl"
                  aria-describedby={`${uid}-req`}
                >
                  <p id={`${uid}-req`} className="text-sm text-ink-3">
                    Fields marked <span className="text-purple-ink">*</span> are required.
                  </p>

                  {submitted && Object.keys(errors).length > 0 && (
                    <div
                      ref={summaryRef}
                      tabIndex={-1}
                      role="alert"
                      className="mt-6 rounded-xl bg-purple-wash p-5 ring-1 ring-inset ring-purple/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
                    >
                      <p className="font-semibold text-purple-ink">
                        {Object.keys(errors).length === 1 ? 'One thing needs fixing' : `${Object.keys(errors).length} things need fixing`} before we
                        can send this.
                      </p>
                      <ul className="mt-2 space-y-1 text-sm">
                        {Object.entries(errors).map(([k, msg]) => (
                          <li key={k}>
                            <a href={`#${id(k)}`} className="text-ink underline decoration-purple/50 underline-offset-2 hover:decoration-purple">
                              {labels[k]}: {msg}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <fieldset className="mt-8">
                    <legend className="font-semibold text-ink">
                      What would you like to do? <span className="text-purple-ink">*</span>
                    </legend>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3" id={id('reason')}>
                      {reasons.map((r) => {
                        const on = values.reason === r.id
                        return (
                          <label
                            key={r.id}
                            className={`relative flex cursor-pointer flex-col rounded-xl p-4 ring-1 ring-inset transition-[box-shadow,background-color] duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue ${
                              on ? 'bg-teal-wash ring-teal' : 'bg-white ring-rule-2 hover:ring-ink-3'
                            }`}
                          >
                            <input
                              type="radio"
                              name="reason"
                              value={r.id}
                              checked={on}
                              onChange={set('reason')}
                              className="sr-only"
                            />
                            <span className="flex items-center justify-between gap-2 font-medium">
                              {r.label}
                              <span
                                className={`grid size-5 place-items-center rounded-full transition-colors ${on ? 'bg-teal text-white' : 'ring-1 ring-inset ring-rule-2'}`}
                                aria-hidden="true"
                              >
                                {on && <Tick size={12} strokeWidth={2.8} />}
                              </span>
                            </span>
                            <span className="mt-1 text-sm text-ink-3">{r.hint}</span>
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <Field id={id('name')} label="Full name" required error={show('name')}>
                      <input
                        id={id('name')}
                        name="name"
                        autoComplete="name"
                        value={values.name}
                        onChange={set('name')}
                        onBlur={blur('name')}
                        aria-invalid={!!show('name')}
                        aria-describedby={describedBy('name')}
                        className={fieldCls('name')}
                      />
                    </Field>
                    <Field id={id('email')} label="Work email" required error={show('email')}>
                      <input
                        id={id('email')}
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="name@company.com"
                        value={values.email}
                        onChange={set('email')}
                        onBlur={blur('email')}
                        aria-invalid={!!show('email')}
                        aria-describedby={describedBy('email')}
                        className={fieldCls('email')}
                      />
                    </Field>
                    <Field id={id('company')} label="Company or firm" required error={show('company')}>
                      <input
                        id={id('company')}
                        name="company"
                        autoComplete="organization"
                        value={values.company}
                        onChange={set('company')}
                        onBlur={blur('company')}
                        aria-invalid={!!show('company')}
                        aria-describedby={describedBy('company')}
                        className={fieldCls('company')}
                      />
                    </Field>
                    <Field id={id('role')} label="Your role" required error={show('role')}>
                      <div className="relative">
                        <select
                          id={id('role')}
                          name="role"
                          value={values.role}
                          onChange={(e) => {
                            set('role')(e)
                            setTouched((t) => ({ ...t, role: true }))
                          }}
                          onBlur={blur('role')}
                          aria-invalid={!!show('role')}
                          aria-describedby={describedBy('role')}
                          className={`${fieldCls('role')} appearance-none pr-10 ${values.role ? '' : 'text-ink-3'}`}
                        >
                          <option value="" disabled>
                            Choose one
                          </option>
                          {roles.map((r) => (
                            <option key={r} value={r} className="text-ink">
                              {r}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="pointer-events-none absolute right-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-ink-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </Field>
                  </div>

                  <fieldset className="mt-8">
                    <legend className="font-semibold text-ink">
                      Which products interest you? <span className="font-normal text-ink-3">(optional)</span>
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {interestOptions.map((opt) => {
                        const on = values.interests.includes(opt)
                        return (
                          <label
                            key={opt}
                            className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium ring-1 ring-inset transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue ${
                              on ? 'bg-ink text-white ring-ink' : 'text-ink-2 ring-rule-2 hover:text-ink hover:ring-ink-3'
                            }`}
                          >
                            <input type="checkbox" checked={on} onChange={() => toggleInterest(opt)} className="sr-only" />
                            {on && <Tick size={14} strokeWidth={2.6} />}
                            {opt}
                          </label>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-8">
                    <Field
                      id={id('message')}
                      label={values.reason === 'question' ? 'Your question' : 'Which process takes your team the most time?'}
                      required={values.reason === 'question'}
                      optional={values.reason !== 'question'}
                      error={show('message')}
                    >
                      <textarea
                        id={id('message')}
                        name="message"
                        rows={5}
                        value={values.message}
                        onChange={set('message')}
                        onBlur={blur('message')}
                        aria-invalid={!!show('message')}
                        aria-describedby={describedBy('message', `${id('message')}-count`)}
                        placeholder="For example: vouching supplier invoices for 40 property accounts every quarter."
                        className={`${fieldCls('message')} h-auto resize-y py-3 leading-relaxed`}
                      />
                    </Field>
                    <p
                      id={`${id('message')}-count`}
                      className={`mt-1.5 text-right text-xs ${values.message.length > MAX ? 'text-purple-ink' : 'text-ink-3'}`}
                    >
                      {values.message.length} / {MAX}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <button type="submit" disabled={sending} className={buttonClass({ size: 'lg' })}>
                      {sending ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <span>{values.reason === 'demo' ? 'Request my demo' : values.reason === 'careers' ? 'Send my note' : 'Send my question'}</span>
                          <Arrow size={18} />
                        </>
                      )}
                    </button>
                    <p className="text-sm text-ink-3">We only use these details to reply to you.</p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <aside className="lg:pt-2" aria-label="What happens next">
            <h2 className="heading text-2xl">What happens next</h2>
            <ol className="mt-6 ml-3 space-y-6 border-l border-rule-2 pl-6">
              {[
                ['We read your note', 'Someone who knows the work reads it, not a bot.'],
                ['A short call', 'We learn how the process runs today and where the time goes.'],
                ['A walkthrough', 'We show you the prepared output on sample documents like yours.'],
              ].map(([t, d], i) => (
                <li key={t} className="relative">
                  <span className="ref absolute -left-[2.3rem] grid size-6 place-items-center rounded-full bg-teal text-[0.6875rem] text-white">
                    {i + 1}
                  </span>
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-[0.9375rem] text-ink-2">{d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-xl bg-mist p-6">
              <p className="font-semibold">Prefer to start small?</p>
              <p className="mt-1.5 text-[0.9375rem] text-ink-2">
                Ask about a single <Link to="/tools" className="link-quiet text-blue-ink">standalone tool</Link> on one
                bottleneck before handing over a whole process.
              </p>
            </div>
            <p className="mt-8 flex items-center gap-2 text-ink-2">
              <Pin size={18} className="text-ink-3" /> Dubai, United Arab Emirates
            </p>
          </aside>
        </div>
      </section>
    </>
  )
}

function Field({ id, label, required, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="font-medium text-ink">
        {label} {required && <span className="text-purple-ink">*</span>}
        {optional && <span className="font-normal text-ink-3">(optional)</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-err`}
            className="mt-2 flex items-start gap-1.5 text-sm text-purple-ink"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Success({ name, email, reason }) {
  const first = name.trim().split(/\s+/)[0]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="relative max-w-2xl overflow-clip rounded-[1.1rem] bg-mist p-8 sm:p-12"
      role="status"
    >
      <motion.div
        className="pointer-events-none absolute -right-10 -top-10 size-56 text-teal"
        initial={{ scale: 1.5, rotate: -24, opacity: 0 }}
        animate={{ scale: 1, rotate: -10, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.3, 0.64, 1] }}
        aria-hidden="true"
      >
        <Seal count={16} strokeWidth={0.7} />
        <span className="ref absolute inset-0 grid place-items-center text-[0.6875rem] uppercase tracking-[0.2em] text-teal-ink">
          <span className="rounded bg-mist/90 px-2 py-1">Received</span>
        </span>
      </motion.div>
      <h2 className="heading relative max-w-[18ch] text-[2rem] sm:text-[2.5rem]">Thank you, {first}. It’s on our desk.</h2>
      <p className="relative mt-4 max-w-[48ch] text-lg text-ink-2">
        {reason === 'demo'
          ? 'We’ll reply to arrange a walkthrough on documents like yours.'
          : reason === 'careers'
            ? 'We’ll read your note and get back to you.'
            : 'We’ll reply with an answer, or with a few questions of our own.'}{' '}
        Look out for an email at <strong className="font-semibold text-ink">{email}</strong>.
      </p>
      <div className="relative mt-8 flex flex-wrap gap-3">
        <Link to="/" className={buttonClass({ variant: 'primary' })}>
          Back to home
        </Link>
        <Link to="/#demo" className={buttonClass({ variant: 'outline' })}>
          Watch the sample run
        </Link>
      </div>
    </motion.div>
  )
}
