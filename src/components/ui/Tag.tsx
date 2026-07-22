import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-panel border border-line px-2 py-1 text-[11px] uppercase tracking-[0.06em] text-text-2">
      {children}
    </span>
  )
}
