import type { ReactNode } from 'react'

type PromptProps = {
  command: string
  className?: string
  // Rides the rule to the right of the command, so a view that needs controls
  // does not spend a second band of vertical space on them.
  trailing?: ReactNode
}

export function Prompt({ command, className = '', trailing }: PromptProps) {
  return (
    <div className={`mb-2 flex items-center gap-3 ${className}`}>
      <p className="shrink-0 text-sm tracking-[0.02em]">
        <span className="text-accent">$</span> <span className="text-text">{command}</span>
      </p>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
      {trailing}
    </div>
  )
}
