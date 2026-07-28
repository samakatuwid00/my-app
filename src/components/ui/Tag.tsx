import type { ReactNode } from 'react'

// `meta` is the quieter tag: smaller, dimmer, tighter. Used where the tag is
// secondary to something else on the line — a capability beside a project title,
// a trust badge beside the contact heading — while `default` carries stack names,
// which are the primary content of their own row.
const VARIANTS = {
  default: 'px-2 py-1 text-[11px] text-text-2',
  meta: 'px-2 py-0.5 text-[10px] text-text-3',
} as const

type TagProps = {
  children: ReactNode
  variant?: keyof typeof VARIANTS
}

export function Tag({ children, variant = 'default' }: TagProps) {
  // `inline-block`, not the default inline: a bordered inline box that wraps
  // gets its border drawn once per line fragment, which on a phone turned the
  // longer trust badge into two half-open pills. An inline-block wraps its text
  // inside one rectangle.
  return (
    <span
      className={`inline-block max-w-full rounded-panel border border-line uppercase tracking-[0.06em] ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  )
}
