import Seal from './Seal.jsx'
import Button from './Button.jsx'
import Reveal from './Reveal.jsx'

export default function CtaPanel({
  title = 'Bring us one process. We’ll show you the prepared file.',
  text = 'Tell us which part of the month or the audit takes your team the longest. We’ll walk you through how Endloops would prepare it, on documents like yours.',
}) {
  return (
    <section className="py-20 md:py-28" aria-labelledby="cta-title">
      <div className="shell">
        <Reveal className="relative overflow-clip rounded-[1.25rem] bg-navy px-6 py-14 sm:px-12 md:py-20 lg:px-16">
          <Seal className="pointer-events-none absolute -bottom-[45%] -right-[18%] w-[min(44rem,110%)] text-teal/40" count={24} strokeWidth={0.7} />
          <Seal className="pointer-events-none absolute -top-[30%] -left-[22%] hidden w-[26rem] text-purple/25 md:block" count={14} strokeWidth={0.6} />
          <div className="relative max-w-2xl">
            <h2 id="cta-title" className="heading text-[2rem] text-white sm:text-[2.5rem] lg:text-[3rem]">
              {title}
            </h2>
            <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-navy-text">{text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/contact?type=demo" variant="light" size="lg" arrow>
                Request a demo
              </Button>
              <Button to="/contact" variant="outlineDark" size="lg">
                Talk to us
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
