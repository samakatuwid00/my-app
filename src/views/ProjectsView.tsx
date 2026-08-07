import { useSearchParams } from 'react-router-dom'
import type { ReactElement } from 'react'
import { ViewShell } from '../components/ViewShell'
import { Prompt } from '../components/ui/Prompt'
import { BackButton } from '../components/ui/BackButton'
import { SectionPager } from '../components/ui/SectionPager'
import { ViewTabs } from '../components/ui/ViewTabs'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'

// Two sub-views, the same control /about uses. The services list that briefly
// made this a three-tab view lives on /feedback now, where the offer sits after
// the proof; what is left here is the work and what it is built with.
//
// Not a capability filter. Five projects filtered four ways hides work behind a
// guess and can render a near-empty panel; the split keeps every card one click
// from the landing tab.
//
// Ids are `projects` / `stack`, deliberately not `work` — /about already owns
// `?view=work`, and the same query value meaning two things on two routes is a
// trap for whoever reads a shared link next.
const TABS = [
  { id: 'projects', label: 'projects', Panel: Projects },
  { id: 'stack', label: 'stack', Panel: Skills },
] as const

const DEFAULT_TAB = TABS[0]

export function ProjectsView() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('view')
  const current = TABS.find((tab) => tab.id === requested) ?? DEFAULT_TAB
  const Panel: () => ReactElement = current.Panel

  function hrefFor(id: string) {
    return id === DEFAULT_TAB.id ? '/projects' : `/projects?view=${id}`
  }

  function selectTab(id: string) {
    const next = new URLSearchParams(searchParams)
    if (id === DEFAULT_TAB.id) {
      next.delete('view')
    } else {
      next.set('view', id)
    }
    // Push, matching /about: Back steps stack → projects → off the page.
    setSearchParams(next)
  }

  return (
    <ViewShell>
      {/* One prompt for the view, not one per panel. The old `ls projects` and
          `cat skills.txt` lines each named their own section, which is what the
          tab bar does now — keeping both would be the same label twice and cost
          a band of height on every tab. */}
      <BackButton to="/about" label="Back to About" className="mb-3" />
      <Prompt command="ls ~/work" />

      <div className="mt-1.5">
        <ViewTabs tabs={TABS} active={current.id} onSelect={selectTab} label="Projects sections" />
      </div>

      {/* Keyed on the tab so each panel remounts and its Reveal runs. */}
      <div
        className="mt-2.5"
        key={current.id}
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        tabIndex={-1}
      >
        <Panel />
      </div>

      {/* Not pinned to the floor of the pane — SiteFooter lives inside <main>'s
          scroll container, so making the shell a flex column adds one footer of
          height to every view. Same reasoning as AboutView. */}
      <SectionPager
        sections={TABS}
        active={current.id}
        hrefFor={hrefFor}
        endHref="/feedback"
        endLabel="read feedback"
        label="Projects section progress"
      />
    </ViewShell>
  )
}
