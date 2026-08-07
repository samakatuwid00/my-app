// Chrome-only: title bar with macOS-style dots + scrollable body.
// Receives rendered children, manages its own scroll-to-bottom.
import { useEffect, useRef } from 'react'

type TerminalWindowProps = {
  children: React.ReactNode
  reduced?: boolean
}

export function TerminalWindow({ children, reduced = false }: TerminalWindowProps) {
  const bodyRef = useRef<HTMLDivElement>(null)

  // Keep the newest line visible as the sequence types out
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const scroll = () => {
      el.scrollTop = el.scrollHeight
    }
    scroll()
    if (!reduced) {
      const obs = new MutationObserver(scroll)
      obs.observe(el, { childList: true, subtree: true })
      return () => obs.disconnect()
    }
  }, [reduced])

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div
        className="flex items-center gap-2 px-3 py-2 text-xs text-text-3"
        aria-hidden="true"
      >
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-auto font-medium">roger@portfolio ~</span>
      </div>
      <div
        ref={bodyRef}
        className="overflow-y-hidden overscroll-contain rounded-b-window border-x border-b border-line bg-panel p-6 font-mono text-sm [line-height:1.7] no-scrollbar"
        style={{ maxHeight: 'min(60vh, 420px)' }}
      >
        {children}
      </div>
    </div>
  )
}
