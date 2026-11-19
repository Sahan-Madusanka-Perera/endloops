import { Link } from 'react-router'
import { Arrow } from './Marks.jsx'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-file)] active:scale-[0.98] focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-45 whitespace-nowrap'

const variants = {
  primary:
    'bg-ink text-white hover:bg-[#1f2a44] shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_10px_24px_-12px_rgba(13,20,36,0.55)]',
  light: 'bg-white text-ink hover:bg-mist shadow-[0_10px_24px_-14px_rgba(0,0,0,0.6)]',
  outline: 'text-ink ring-1 ring-inset ring-rule-2 hover:ring-ink hover:bg-white',
  outlineDark: 'text-white ring-1 ring-inset ring-white/35 hover:ring-white hover:bg-white/5',
  green: 'bg-green-ink text-white hover:bg-[#056a40]',
}

const sizes = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
}

export function buttonClass({ variant = 'primary', size = 'md', className = '' } = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`
}

export default function Button({ to, href, variant, size, className, children, arrow = false, ...rest }) {
  const cls = buttonClass({ variant, size, className })
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <Arrow size={18} className="-mr-1 transition-transform duration-300 ease-[var(--ease-file)] group-hover:translate-x-0.5" />
      )}
    </>
  )
  if (to)
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  if (href)
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  )
}
