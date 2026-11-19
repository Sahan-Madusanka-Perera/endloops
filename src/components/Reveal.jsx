import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

// Filed into place: a short rise with a clip reveal, from an already-legible start.
export default function Reveal({ as = 'div', delay = 0, className = '', children, y = 18, ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0.3, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

// Margin reference + heading, like a working paper's index in the left column.
// The reference lives only in the margin; on phones there is no margin, so it is not shown.
export function SectionHead({ refCode, title, intro, tone = 'text-ink-3', dark = false, id, className = '' }) {
  return (
    <div className={`grid md:grid-cols-[7rem_1fr] ${className}`}>
      <p className={`ref hidden pt-3 md:block ${dark ? 'text-navy-text' : tone}`} aria-hidden="true">
        {refCode}
      </p>
      <div className="max-w-3xl">
        <h2 id={id} className={`heading text-[2rem] sm:text-[2.5rem] lg:text-[3rem] ${dark ? 'text-white' : 'text-ink'}`}>
          {title}
        </h2>
        {intro && (
          <p className={`mt-5 max-w-[62ch] text-lg leading-relaxed ${dark ? 'text-navy-text' : 'text-ink-2'}`}>{intro}</p>
        )}
      </div>
    </div>
  )
}
