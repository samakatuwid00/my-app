import { useState } from 'react'
import type { FormEvent } from 'react'
import { CornerDownLeft, X } from 'lucide-react'
import { useAsk } from '../hooks/useAsk'
import { useTypewriter } from '../hooks/useTypewriter'

const PLACEHOLDER = 'ask me anything'

export function CommandBar() {
  const { ask, state, isOpen, close, inputRef, messages } = useAsk()
  const [draft, setDraft] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  const { typed } = useTypewriter(PLACEHOLDER)

  // The caret belongs to the ghost placeholder, so it yields to the real one.
  const showGhost = !draft && !isFocused
  const showHint = !touched && messages.length === 0

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const question = draft
    setDraft('')
    setTouched(true)
    void ask(question)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex h-11 shrink-0 items-center gap-2 border-t border-line bg-panel px-4 ${
        showHint ? 'command-hint' : ''
      }`}
    >
      <span aria-hidden="true" className="shrink-0 text-sm text-accent">
        $
      </span>

      <label htmlFor="ask-input" className="sr-only">
        Ask about Roger's work
      </label>
      <div className="relative min-w-0 flex-1">
        <input
          id="ask-input"
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onFocus={() => {
            setIsFocused(true)
            setTouched(true)
          }}
          onBlur={() => setIsFocused(false)}
          autoComplete="off"
          className="w-full bg-transparent text-[13px] tracking-[0.02em] text-text focus:outline-none"
        />

        {showGhost && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-[13px] tracking-[0.02em] text-text-3"
          >
            {typed}
            <span className="cursor-blink text-accent">▌</span>
          </span>
        )}
      </div>

      <kbd
        aria-hidden="true"
        className="hidden shrink-0 rounded-[3px] border border-line px-1.5 py-0.5 text-[10px] text-text-3 sm:block"
      >
        /
      </kbd>

      {isOpen && (
        <button
          type="button"
          onClick={close}
          aria-label="Close assistant"
          className="grid size-7 shrink-0 place-items-center rounded-panel border border-control text-text-2 transition-colors duration-200 hover:border-line-strong hover:text-text"
        >
          <X size={13} />
        </button>
      )}

      <button
        type="submit"
        disabled={!draft.trim() || state === 'thinking'}
        aria-label="Send question"
        className="grid size-7 shrink-0 place-items-center rounded-panel border border-control text-text-2 transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:border-line disabled:text-text-3"
      >
        <CornerDownLeft size={13} />
      </button>
    </form>
  )
}
