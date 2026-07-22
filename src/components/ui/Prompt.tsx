type PromptProps = {
  command: string
  className?: string
}

export function Prompt({ command, className = '' }: PromptProps) {
  return (
    <div className={`mb-4 flex items-center gap-3 ${className}`}>
      <p className="shrink-0 text-sm tracking-[0.02em]">
        <span className="text-accent">$</span> <span className="text-text">{command}</span>
      </p>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  )
}
