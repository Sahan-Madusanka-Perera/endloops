// Guilloche geometry shared by the WebGL hero and the static SVG seals.
// A rosette is a family of closed polar curves:
//   r_i(θ) = R + A·sin(k1·θ + φ_i) + B·sin(k2·θ − φ_i / 2)
// with integer k1/k2 so every curve closes on itself: an endless loop.

const TAU = Math.PI * 2

const cache = new Map()

export function rosettePaths({
  size = 200,
  radius = 0.62,
  ampA = 0.11,
  ampB = 0.05,
  k1 = 9,
  k2 = 14,
  count = 18,
  steps = 540,
} = {}) {
  const key = [size, radius, ampA, ampB, k1, k2, count, steps].join('|')
  if (cache.has(key)) return cache.get(key)

  const c = size / 2
  const paths = []
  for (let i = 0; i < count; i++) {
    const phase = (i / count) * TAU
    let d = ''
    for (let s = 0; s <= steps; s++) {
      const t = (s / steps) * TAU
      const r = (radius + ampA * Math.sin(k1 * t + phase) + ampB * Math.sin(k2 * t - phase / 2)) * c
      const x = c + r * Math.cos(t)
      const y = c + r * Math.sin(t)
      d += (s === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2)
    }
    paths.push(d + 'Z')
  }
  cache.set(key, paths)
  return paths
}

export function bandPaths({ width = 1200, height = 40, count = 7, waves = 18, steps = 600 } = {}) {
  const key = ['band', width, height, count, waves, steps].join('|')
  if (cache.has(key)) return cache.get(key)

  const mid = height / 2
  const paths = []
  for (let i = 0; i < count; i++) {
    const phase = (i / count) * TAU
    let d = ''
    for (let s = 0; s <= steps; s++) {
      const x = (s / steps) * width
      const t = (s / steps) * TAU * waves
      const y = mid + Math.sin(t + phase) * height * 0.32 + Math.sin(t * 0.5 - phase) * height * 0.12
      d += (s === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(2)
    }
    paths.push(d)
  }
  cache.set(key, paths)
  return paths
}
