import { Link } from 'react-router-dom'

// Mirrors ActionLink: same baseline rhythm, same accent-on-hover, same underline
// move. Leads with ‹ instead of › — the shell's convention for backward
// navigation, where › marks forward links.
const LINK_CLASS =
  'group inline-flex items-center gap-2 py-1 text-sm text-accent transition-colors duration-200 hover:text-text lg:py-0'

export type BackButtonProps = {
  to: string
  label?: string
  className?: string
}

export function BackButton({ to, label = 'back', className = '' }: BackButtonProps) {
  return (
    <Link to={to} className={`${LINK_CLASS} ${className}`}>
      <span aria-hidden="true">‹</span>
      <span className="underline-offset-4 group-hover:underline">{label}</span>
    </Link>
  )
}