import { Link } from 'react-router-dom'
import { ActionLink } from './ActionLink'
import { BackButton } from './BackButton'

export type PagerSection = {
  id: string
  label: string
}

type SectionPagerProps = {
  sections: readonly PagerSection[]
  active: string
  hrefFor: (id: string) => string
  endHref: string
  endLabel: string
  // Required, not defaulted: the nav landmark is the one thing here a screen
  // reader reads out of context, and a default would have every view that
  // reuses this announce whichever view happened to land first.
  label: string
}

// Fires after the read rather than before it: the tabs say a control exists, this
// says how much is left and where to go next. On the last section it stops being
// a pager and becomes the exit, so /about is not a dead end.
//
// Derived entirely from the sections array and the active id — no state of its
// own, and the next affordance is a real link so it deep-links, opens in a new
// tab, and lands in history like every other navigation on the page.
//
// Kept to one line on purpose. The `experience` tab has 19px of spare height at
// 1200×800, so a bordered button row would not fit; see the plan's trap section.
export function SectionPager({ sections, active, hrefFor, endHref, endLabel, label }: SectionPagerProps) {
  const index = sections.findIndex((section) => section.id === active)
  const prev = sections[index - 1]
  const next = sections[index + 1]

  return (
    <nav
      aria-label={label}
      className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-1"
    >
      {prev ? (
        <BackButton to={hrefFor(prev.id)} label={prev.label} />
      ) : (
        <span aria-hidden="true" />
      )}

      <span aria-hidden="true" className="flex items-center gap-1.5">
        {sections.map((section, position) => (
          <span
            key={section.id}
            className={`size-1.5 rounded-full ${position === index ? 'bg-accent' : 'bg-line-strong'}`}
          />
        ))}
      </span>

      {/* `hidden sm:inline` — the dots already convey position at a glance;
          the "Section X of N" text is useful on desktop width but eats space on
          the cramped mobile bar where the active tab is already underlined. */}
      <span className="label hidden sm:inline">
        Section {index + 1} of {sections.length}
      </span>

      {/* No size override — `text-sm` is ActionLink's own scale, and competing
          font-size utilities on one element resolve by stylesheet order, not by
          class order, so an override here would be a coin flip. */}
      <ActionLink as={Link} to={next ? hrefFor(next.id) : endHref} className="ml-auto">
        {next ? next.label : endLabel}
      </ActionLink>
    </nav>
  )
}
