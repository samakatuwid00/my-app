import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../data/navigation'
import { site, systemFacts } from '../data/site'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { StatusDot } from './ui/StatusDot'

type SideRailProps = {
  isOpen: boolean
  onClose: () => void
}

const ROW_BASE =
  'flex items-center gap-3 rounded-panel border-l-2 py-1.5 pl-2.5 pr-2 text-[13px] tracking-[0.02em] transition-colors duration-150'
const TILE_BASE = 'grid size-[26px] shrink-0 place-items-center rounded-[7px] border transition-colors duration-150'

export function SideRail({ isOpen, onClose }: SideRailProps) {
  const railRef = useFocusTrap<HTMLElement>(isOpen, onClose)
  useLockBodyScroll(isOpen)

  const offCanvas = isOpen ? 'translate-x-0' : '-translate-x-full invisible'

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
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-y-auto border-r border-line bg-panel p-5 transition-transform duration-200 ${offCanvas} lg:visible lg:static lg:z-auto lg:h-full lg:w-60 lg:shrink-0 lg:translate-x-0`}
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs text-accent">{site.shellTitle}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="grid size-7 place-items-center rounded-panel border border-control text-text-2 lg:hidden"
          >
            <X size={14} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ id, label, to, icon: Icon }) => (
            <NavLink
              key={id}
              to={to}
              onClick={onClose}
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
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-7 border-t border-line pt-5">
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

        <div className="mt-auto shrink-0 border-t border-line pt-5">
          <StatusDot label="Open to work" />
        </div>
      </aside>
    </>
  )
}
