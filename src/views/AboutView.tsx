import { useSearchParams } from 'react-router-dom'
import type { ReactElement } from 'react'
import { ViewShell } from '../components/ViewShell'
import { Prompt } from '../components/ui/Prompt'
import { SectionPager } from '../components/ui/SectionPager'
import { ViewTabs } from '../components/ui/ViewTabs'
import { AboutHeader } from '../sections/AboutHeader'
import { History } from '../sections/History'
import { WhatIDo } from '../sections/WhatIDo'
import { Whoami } from '../sections/Whoami'

// The per-tab shell commands (`whoami --verbose`, `history --experience`) were
// dropped when the tabs left the prompt line: with a visible tab bar naming the
// section, a prompt that renames it too is the same label twice.
const TABS = [
  { id: 'profile', label: 'profile', Panel: Whoami },
  { id: 'work', label: 'what I do', Panel: WhatIDo },
  { id: 'experience', label: 'experience', Panel: History },
] as const

const DEFAULT_TAB = TABS[0]

export function AboutView() {
  // The section lives in the URL so /about?view=experience is linkable and Back
  // steps through the sections. An unknown or absent value falls back to the
  // first tab rather than rendering nothing, and the default tab carries no
  // query string at all so /about stays clean.
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('view')
  const current = TABS.find((tab) => tab.id === requested) ?? DEFAULT_TAB
  const Panel: () => ReactElement = current.Panel

  function hrefFor(id: string) {
    return id === DEFAULT_TAB.id ? '/about' : `/about?view=${id}`
  }

  function selectTab(id: string) {
    const next = new URLSearchParams(searchParams)
    if (id === DEFAULT_TAB.id) {
      next.delete('view')
    } else {
      next.set('view', id)
    }
    // Push, not replace: Back walking experience → what I do → profile → off the
    // page is what a visitor who clicked three times expects. The cost is that
    // leaving /about takes as many presses as sections visited.
    setSearchParams(next)
  }

  return (
    <ViewShell>
      {/* Static across the tabs: prompt, name, role. Only the panel below the bar
          swaps. The prompt no longer names the active section — the tab bar does
          that now, and in a shape a non-technical visitor already reads. */}
      <Prompt command="whoami" />
      <AboutHeader />

      <div className="mt-1.5">
        <ViewTabs tabs={TABS} active={current.id} onSelect={selectTab} label="About sections" />
      </div>

      {/* Keyed on the tab so each panel remounts and its Reveal runs — the same
          opacity move the router transitions already use, not a new vocabulary.
          `mt-2` rather than `mt-2.5` because `experience` lands at exactly 601 of
          the 601px budget at 1024×800 after the timeline compaction, and a view
          sitting on its ceiling breaks on the next line of copy. */}
      <div
        className="mt-2"
        key={current.id}
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        tabIndex={-1}
      >
        <Panel />
      </div>

      {/* Placed after the panel with a fixed margin rather than pinned to the
          floor of the pane. Pinning needs `<main>` to become a flex column, and
          because SiteFooter lives inside that scroll container the content ends
          up exactly one footer taller than the pane — every view gains a
          scrollbar. Not worth it for a control that reads fine here. */}
      <SectionPager
        sections={TABS}
        active={current.id}
        hrefFor={hrefFor}
        endHref="/projects"
        endLabel="see projects"
        label="About section progress"
      />
    </ViewShell>
  )
}
