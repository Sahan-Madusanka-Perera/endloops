import { rosettePaths, bandPaths } from '../lib/guilloche.js'

const NS = 'non-scaling-stroke'

// Static engraved rosette in a single ink (currentColor). strokeWidth is in screen pixels.
export default function Seal({ className = '', count = 16, k1 = 9, k2 = 14, strokeWidth = 0.6, rings = true }) {
  const paths = rosettePaths({ size: 200, count, k1, k2 })
  const inner = rosettePaths({
    size: 200,
    count: Math.round(count * 0.75),
    radius: 0.36,
    ampA: 0.07,
    ampB: 0.03,
    k1: 7,
    k2: 11,
  })
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        {paths.map((d, i) => (
          <path key={'o' + i} d={d} vectorEffect={NS} />
        ))}
        {inner.map((d, i) => (
          <path key={'i' + i} d={d} vectorEffect={NS} />
        ))}
        {rings && (
          <>
            <circle cx="100" cy="100" r="96" vectorEffect={NS} />
            <circle cx="100" cy="100" r="98.5" vectorEffect={NS} />
          </>
        )}
      </g>
    </svg>
  )
}

// Horizontal guilloche band, like the border of a cheque or certificate.
export function Band({ className = '', count = 6, waves = 22, strokeWidth = 0.6 }) {
  const paths = bandPaths({ width: 1200, height: 28, count, waves })
  return (
    <svg viewBox="0 0 1200 28" preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        {paths.map((d, i) => (
          <path key={i} d={d} vectorEffect={NS} />
        ))}
      </g>
    </svg>
  )
}
