import { useState } from 'react'
import type { FormEvent } from 'react'
import { CornerDownLeft } from 'lucide-react'
import { useAsk } from '../hooks/useAsk'
import { useLocation } from 'react-router-dom'
import { BackButton } from './ui/BackButton'

export function CommandBar() {
  const { ask, state } = useAsk()
  const [history, setHistory] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [query, setQuery] = useState('')

  const location = useLocation()
  const isTyping = state === 'thinking'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim() || isTyping) return

    setHistory((prev) => [...prev, query])
    setHistoryIndex(history.length)
    await ask(query)
    setQuery('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex > 0) {
        setHistoryIndex((i) => i - 1)
        setQuery(history[historyIndex - 1])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        setHistoryIndex((i) => i + 1)
        setQuery(history[historyIndex + 1])
      } else {
        setHistoryIndex(history.length)
        setQuery('')
      }
    } else if (e.key === 'Escape') {
      setQuery('')
    }
  }

  const handleHistoryClick = (cmd: string) => {
    setQuery(cmd)
    setHistoryIndex(history.indexOf(cmd))
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-base-100/90 backdrop-blur-sm border-b border-base-300">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-base-content/60 font-mono text-sm">$</span>
              <span className="text-base-content font-mono text-sm">cd</span>
              <span className="text-accent-2 font-mono text-sm">{location.pathname || '/'}</span>
            </div>
            {location.pathname !== '/' && (
              <BackButton to="/" label="back" />
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="ask..."
                className="w-full h-8 bg-base-200 border border-base-300 rounded-lg px-3 py-1 text-sm font-mono text-base-content placeholder-base-content/40 focus:outline-none focus:ring-2 focus:ring-accent-2 focus:border-transparent"
                disabled={isTyping}
                autoComplete="off"
                spellCheck={false}
              />
              {isTyping && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-2 font-mono text-xs animate-pulse">▌</span>
              )}
            </div>
            {isFocused && history.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-base-100 border border-base-300 rounded-lg shadow-lg overflow-hidden z-30">
                {history
                  .slice()
                  .reverse()
                  .map((cmd, i) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => handleHistoryClick(cmd)}
                      className={`w-full px-3 py-2 text-left text-sm font-mono transition-colors ${
                        i === history.length - 1 - historyIndex
                          ? 'bg-accent-2 text-base-100'
                          : 'text-base-content/80 hover:bg-base-200'
                      }`}
                    >
                      {cmd}
                    </button>
                  ))}
              </div>
            )}
          </form>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <span className="text-base-content/40 font-mono text-xs">w</span>
              <CornerDownLeft className="w-3.5 h-3.5 text-base-content/40" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
