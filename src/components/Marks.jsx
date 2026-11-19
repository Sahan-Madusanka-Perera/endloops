// Authored icon set: auditor's tick marks and a few interface glyphs.
// One grammar: 24px grid, 1.75 stroke, round caps and joins.

function Icon({ children, className = '', title, size = 20, strokeWidth = 1.75 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  )
}

// Agreed / prepared: the auditor's tick, with its little tail.
export const Tick = (p) => (
  <Icon {...p}>
    <path d="M4 12.8l4.6 4.7L20.5 5.2" />
  </Icon>
)

// Matched / cast to the ledger.
export const Cast = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="7.5" />
    <path d="M12 7.5v9M7.5 12h9" />
  </Icon>
)

// Needs your judgement.
export const Flag = (p) => (
  <Icon {...p}>
    <path d="M12 3.5l8.5 8.5-8.5 8.5L3.5 12z" />
    <path d="M12 8.2v4.6" />
    <path d="M12 15.9v.1" />
  </Icon>
)

// Reviewed and signed.
export const Sign = (p) => (
  <Icon {...p}>
    <path d="M12 2.8l5.2 7.4L12 18.6l-5.2-8.4z" />
    <path d="M12 18.6v2.6" />
    <path d="M12 6.8v4.4" />
    <circle cx="12" cy="12.6" r="1.3" />
  </Icon>
)

export const Arrow = (p) => (
  <Icon {...p}>
    <path d="M5 12h14M13.5 6.5L19 12l-5.5 5.5" />
  </Icon>
)

export const ArrowDown = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M6.5 13.5L12 19l5.5-5.5" />
  </Icon>
)

export const Play = (p) => (
  <Icon {...p}>
    <path d="M8 5.5v13l10.5-6.5z" />
  </Icon>
)

export const Reset = (p) => (
  <Icon {...p}>
    <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
    <path d="M4.5 4.5v4h4" />
  </Icon>
)

export const Menu = (p) => (
  <Icon {...p}>
    <path d="M4 7.5h16M4 12h16M4 16.5h10" />
  </Icon>
)

export const Close = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
)

export const Document = (p) => (
  <Icon {...p}>
    <path d="M6.5 3.5h7.5l4 4v13h-11.5z" />
    <path d="M13.5 3.5v4.5h4.5M9.5 12.5h5M9.5 16h5" />
  </Icon>
)

export const Ledger = (p) => (
  <Icon {...p}>
    <rect x="4" y="4" width="16" height="16" rx="1.5" />
    <path d="M4 9h16M4 14h16M10 4v16" />
  </Icon>
)

export const Stack = (p) => (
  <Icon {...p}>
    <path d="M4 8.5L12 4l8 4.5-8 4.5z" />
    <path d="M4 12.5l8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" />
  </Icon>
)

export const Sheet = (p) => (
  <Icon {...p}>
    <rect x="5.5" y="3.5" width="13" height="17" rx="1.5" />
    <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" />
  </Icon>
)

export const Pin = (p) => (
  <Icon {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </Icon>
)

export const Check = Tick
