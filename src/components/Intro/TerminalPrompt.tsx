// The interactive prompt row shown after the sequence completes.
// Mirrors the portfolio's Prompt component style.
import { useState } from 'react'

type TerminalPromptProps = {
  onEnter: (value: string) => void
  reduced?: boolean
}

export function TerminalPrompt({ onEnter, reduced = false }: TerminalPromptProps) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    const trimmed = value.trim().toLowerCase()
    if (
      trimmed === '' ||
      trimmed === 'enter portfolio' ||
      trimmed === 'enter' ||
      trimmed === 'yes' ||
      trimmed === 'y'
    ) {
      onEnter(trimmed)
    } else {
      // echo back; stay interactive
      onEnter('__echo__' + trimmed)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="prompt-row flex items-center gap-2 pt-2">
      <span className="shrink-0 text-text-2">roger@portfolio</span>
      <span className="text-accent">:~$</span>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Enter portfolio…"
        autoFocus
        className="flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-3"
      />
      <span
        className="block h-4 w-2.5 shrink-0 rounded-xs bg-accent"
        style={{
          animation: reduced ? 'none' : 'cursor-blink 1s step-end infinite',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
