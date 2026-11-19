import { Link } from 'react-router'
import PageHero from '../components/PageHero.jsx'
import CtaPanel from '../components/CtaPanel.jsx'
import Reveal, { SectionHead } from '../components/Reveal.jsx'
import Seal from '../components/Seal.jsx'
import { Arrow, Tick, Pin } from '../components/Marks.jsx'

const beliefs = [
  ['The professional decides.', 'Every product hands work to a person. Automation prepares; it never replaces judgement or signature.'],
  ['Traceable, not magic.', 'If a figure can’t be traced to a document, it doesn’t belong in the file. Every output keeps its source.'],
  ['Clarity over spectacle.', 'Finance teams read precisely. Our software shows what it did and why, in the language of the work.'],
  ['Two shapes, one engine.', 'Whole processes and single tools share the same core, so starting small never means starting over.'],
]

const audiences = [
  ['Accountants', 'Less retyping and ticking. More time for clients and the questions only you can answer.'],
  ['Auditors', 'Vouching, casting and working papers prepared, so fieldwork goes to judgement and findings.'],
  ['Finance teams', 'Reconciliations and reviews that keep up with the close instead of holding it up.'],
  ['Property management companies', 'Budgets, escrow and service providers handled across every property you run.'],
]

export default function About() {
  return (
    <>
      <title>About · Endloops</title>
      <meta name="description" content="Endloops began as the technology department of Alkazim, an accounting and audit firm in Dubai." />
      <PageHero letter="D" tone="purple" title="Built inside an audit firm.">
        Endloops began as the technology department of Alkazim, an accounting and audit firm in Dubai. The software we
        built for real engagements is now a company of its own.
      </PageHero>

      <section className="py-20 md:py-28" aria-labelledby="start-title">
        <div className="shell">
          <SectionHead id="start-title" refCode="D1" tone="text-purple-ink" title="Where we started" />
          <div className="mt-8 grid gap-10 md:ml-28 lg:grid-cols-[1.2fr_1fr]">
            <Reveal className="space-y-5 text-lg leading-relaxed text-ink-2">
              <p>
                For years, Alkazim’s technology team built software to take the repetitive work out of the firm’s own audits
                and reviews. It was designed next to the accountants and auditors using it, on live engagements, against real
                deadlines.
              </p>
              <p>
                That team is now <strong className="font-semibold text-ink">Endloops</strong>, a company that builds
                automation for financial professionals: accountants, auditors, finance teams and property management
                companies.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="relative overflow-clip rounded-xl bg-mist p-7">
              <Seal className="pointer-events-none absolute -right-16 -bottom-16 w-64 text-purple/25" count={14} strokeWidth={0.6} />
              <ol className="relative space-y-6">
                {[
                  ['Alkazim', 'An accounting and audit firm in Dubai'],
                  ['Technology department', 'Software for the firm’s own engagements'],
                  ['Endloops', 'Automation for financial professionals'],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span
                      className={`ref grid size-8 shrink-0 place-items-center rounded-full text-[0.6875rem] ${
                        i === 2 ? 'bg-purple text-white' : 'bg-white text-ink-3 ring-1 ring-inset ring-rule-2'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{t}</p>
                      <p className="text-sm text-ink-2">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-mist py-20 md:py-28" aria-labelledby="believe-title">
        <div className="shell">
          <SectionHead
            id="believe-title"
            refCode="D2"
            tone="text-purple-ink"
            title="What we believe"
            intro="The software prepares the work, and the professional reviews and decides. Everything else follows from that."
          />
          <ol className="mt-14 grid gap-px bg-rule-2 md:ml-28 md:grid-cols-2">
            {beliefs.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={(i % 2) * 0.08} className="bg-mist py-8 md:p-10 md:[&:nth-child(odd)]:pl-0">
                <Tick size={22} strokeWidth={2} className="text-purple-ink" />
                <h3 className="heading mt-4 text-2xl">{t}</h3>
                <p className="mt-2 max-w-[44ch] text-ink-2">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="who-title">
        <div className="shell">
          <SectionHead id="who-title" refCode="D3" tone="text-purple-ink" title="Who we build for" />
          <ul className="mt-12 border-t-2 border-ink md:ml-28">
            {audiences.map(([t, d], i) => (
              <Reveal
                as="li"
                key={t}
                delay={i * 0.05}
                className="grid gap-2 border-b border-rule py-6 md:grid-cols-[18rem_1fr] md:gap-10"
              >
                <h3 className="heading text-xl">{t}</h3>
                <p className="text-lg text-ink-2">{d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-clip bg-navy py-20 md:py-28" aria-labelledby="heading-title">
        <Seal className="pointer-events-none absolute -left-40 top-1/2 w-[36rem] -translate-y-1/2 text-purple/30" count={20} strokeWidth={0.6} />
        <div className="shell relative">
          <SectionHead
            id="heading-title"
            dark
            refCode="D4"
            title="Where we’re heading"
            intro="Our ambition is to become the trusted automation partner for accounting, audit and property finance teams across the GCC and beyond."
          />
          <div className="mt-12 grid gap-px overflow-clip rounded-xl bg-navy-rule md:ml-28 md:grid-cols-3">
            {[
              ['Engineering', 'More processes automated, end to end.'],
              ['Design', 'Software that reads as clearly as a good working paper.'],
              ['Quality', 'Every release held to the standard of an audit file.'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.07} className="bg-navy-2 p-7">
                <p className="heading text-xl text-white">{t}</p>
                <p className="mt-2 text-navy-text">{d}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 md:ml-28">
            <p className="flex items-center gap-2 text-navy-text">
              <Pin size={18} /> Based in Dubai, United Arab Emirates
            </p>
            <Link to="/contact" className="group inline-flex items-center gap-2 font-semibold text-white">
              <span className="link-quiet">We’re growing these teams. Say hello</span>
              <Arrow size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <CtaPanel
        title="See how an audit firm would automate your work."
        text="We built Endloops for our own engagements first. Let us show you what it prepares, and what it leaves for you."
      />
    </>
  )
}
