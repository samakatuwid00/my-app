import { PanelLeftClose, PanelLeftOpen, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../data/navigation'
import { site, systemFacts } from '../data/site'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { StatusDot } from './ui/StatusDot'

type SideRailProps = {
  isOpen: boolean
  onClose: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

// Collapse is desktop-only — below lg the rail is an off-canvas drawer that
// always opens full width, so every collapsed rule carries an lg: prefix.
// The variants are written out in full: Tailwind scans source text, so a
// prefix built by string concatenation would never generate a class.
const ROW_BASE =
  'flex items-center gap-3 rounded-panel border-l-2 py-1.5 pl-2.5 pr-2 text-[13px] tracking-[0.02em] transition-colors duration-150 lg:group-data-[collapsed=true]/rail:justify-center lg:group-data-[collapsed=true]/rail:gap-0 lg:group-data-[collapsed=true]/rail:px-0'
const TILE_BASE = 'grid size-[26px] shrink-0 place-items-center rounded-[7px] border transition-colors duration-150'
// Labels stay mounted and fade to zero width so the tiles centre cleanly and
// links keep their accessible name.
const LABEL_BASE =
  'overflow-hidden whitespace-nowrap transition-opacity duration-150 lg:group-data-[collapsed=true]/rail:w-0 lg:group-data-[collapsed=true]/rail:opacity-0'
const COLLAPSED_HIDDEN = 'lg:group-data-[collapsed=true]/rail:hidden'

export function SideRail({ isOpen, onClose, isCollapsed, onToggleCollapse }: SideRailProps) {
  const railRef = useFocusTrap<HTMLElement>(isOpen, onClose)
  useLockBodyScroll(isOpen)

  const offCanvas = isOpen ? 'translate-x-0' : '-translate-x-full invisible'
  // The group-data variant only reaches descendants, so the rail's own width
  // and padding have to come off the state directly.
  // `lg:w-52` up to xl, `xl:w-60` above it. At 1024 the full 240px rail was
  // taking 23% of the viewport and the pane paid for it in wrapped lines — the
  // views that overflow at that width overflow by wrapping, not by content. The
  // labels still fit at 208px; nothing is clipped.
  const frameSize = isCollapsed ? 'lg:w-[68px] lg:px-3' : 'lg:w-52 xl:w-60'

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-canvas/80 lg:hidden"
        />
      )}

      {/* Static column on desktop so its border and background span the full
          window height; only its own contents scroll if the rail overflows. */}
      <aside
        ref={railRef}
        data-collapsed={isCollapsed}
        className={`group/rail fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-y-auto overflow-x-hidden border-r border-line bg-panel p-5 transition-transform duration-200 ${offCanvas} lg:visible lg:static lg:z-auto lg:h-full lg:shrink-0 lg:translate-x-0 lg:transition-[width,padding] lg:duration-200 lg:ease-[cubic-bezier(0.33,1,0.68,1)] ${frameSize}`}
      >
        <div className="mb-6 flex items-center justify-between gap-2 lg:group-data-[collapsed=true]/rail:justify-center">
          <p className={`text-xs text-accent ${LABEL_BASE}`}>{site.shellTitle}</p>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="grid size-7 place-items-center rounded-panel border border-control text-text-2 lg:hidden"
          >
            <X size={14} />
          </button>

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            aria-expanded={!isCollapsed}
            className="hidden size-7 shrink-0 place-items-center rounded-panel border border-control text-text-2 transition-colors duration-150 hover:border-line-strong hover:text-text lg:grid"
          >
            {isCollapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ id, label, to, icon: Icon }) => (
            <NavLink
              key={id}
              to={to}
              onClick={onClose}
              title={isCollapsed ? label : undefined}
              className={({ isActive }) =>
                `${ROW_BASE} ${
                  isActive ? 'border-accent bg-accent-soft text-accent' : 'border-transparent text-text-2 hover:text-text'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`${TILE_BASE} ${
                      isActive ? 'border-accent bg-accent-soft text-accent' : 'border-control text-text-3'
                    }`}
                  >
                    <Icon size={14} />
                  </span>
                  <span className={LABEL_BASE}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className={`mt-7 border-t border-line pt-5 ${COLLAPSED_HIDDEN}`}>
          <p className="label mb-3">System</p>
          <dl className="flex flex-col gap-2">
            {systemFacts.map((fact) => (
              <div key={fact.label} className="flex gap-3 text-[11px] leading-relaxed">
                <dt className="w-14 shrink-0 uppercase tracking-[0.08em] text-text-3">{fact.label}</dt>
                <dd className="text-text-2">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={`mt-auto shrink-0 border-t border-line pt-5 ${COLLAPSED_HIDDEN}`}>
          <StatusDot label="Open to work" />
        </div>
      </aside>
    </>
  )
}
