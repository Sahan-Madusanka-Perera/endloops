import { Link } from 'react-router'

// The supplied logo, used as-is (no redraw, recolour or stretch). It is a JPEG
// with a white ground, so it only ever sits on white.
export default function Logo({ className = 'h-8', asLink = true }) {
  const img = (
    <img
      src="/endloops-logo.jpg"
      alt="Endloops"
      width="439"
      height="127"
      className={`block w-auto ${className}`}
      decoding="async"
    />
  )
  if (!asLink) return img
  return (
    <Link to="/" className="inline-block rounded-sm bg-white" aria-label="Endloops home">
      {img}
    </Link>
  )
}
