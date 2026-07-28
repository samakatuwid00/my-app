import { useRef } from 'react'
import type { KeyboardEvent } from 'react'

export type ViewTab = {
  id: string
  label: string
}

type ViewTabsProps = {
  tabs: readonly ViewTab[]
  active: string
  onSelect: (id: string) => void
  label: string
}

// Sub-views inside one pane. /about carries roughly 1340px of content against a
// 601px budget at the reference viewport, so it cannot be one scrollless column
// — the choice is between splitting it and cutting it, and splitting keeps
// every line. Tabs rather than an accordion because an accordion that expands
// past the pane just recreates the scroll it was meant to remove.
//
// Underlined bar directly beneath the headline. This replaced a boxed segmented
// switch parked at the far end of the prompt rule: the box was the more explicit
// control, but it sat outside the reading path, and position turns out to carry
// more discoverability than styling did. It is also the most universally
// recognised tab shape on the web, which is the whole point — the visitor this
// is for does not read DOM, they read pattern.
//
// The shared baseline rule is what makes three labels read as one control; the
// 2px accent underline is the selected state. No enclosure, so nothing clips the
// global :focus-visible outline.
// `pt-2 lg:pt-0` is the touch allowance: the segments are 25px tall, which is
// under any thumb-target guidance, and the extra 8px is spent only where there
// is a thumb. On lg the pane budget is measured to the pixel, so it goes back.
const SEGMENT =
  'relative -mb-px cursor-pointer border-b-2 pb-1.5 pt-2 text-[11px] uppercase tracking-[0.08em] transition-colors duration-200 lg:pt-0'

const ACTIVE = 'border-accent font-semibold text-text'
const INACTIVE = 'border-transparent text-text-2 hover:border-line-strong hover:text-text'

export function ViewTabs({ tabs, active, onSelect, label }: ViewTabsProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  // Selection follows focus, which is the automatic-activation half of the ARIA
  // tabs pattern — correct here because switching panels is cheap and has no
  // side effects.
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.id === active)
    const last = tabs.length - 1
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % tabs.length
        : event.key === 'ArrowLeft'
          ? (index + last) % tabs.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null

    if (next === null) return
    event.preventDefault()
    onSelect(tabs[next].id)
    buttons.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className="flex flex-wrap items-center gap-x-6 border-b border-line"
    >
      {tabs.map((tab, index) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            ref={(element) => {
              buttons.current[index] = element
            }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(tab.id)}
            className={`${SEGMENT} ${isActive ? ACTIVE : INACTIVE}`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
