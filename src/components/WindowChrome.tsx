import { Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { NikoSlot } from './NikoPet/NikoSlot'
import { site } from '../data/site'

type WindowChromeProps = {
  onOpenNav?: () => void
  onThemeChange?: () => void
  /**
   * Intro chrome: identical geometry, no live controls. The intro window FLIPs
   * onto the app window, so both bars have to reserve the same space on both
   * sides — otherwise the centred title slides sideways at the handover, which
   * is exactly the jump the morph exists to avoid.
   */
  inert?: boolean
  /** Fades the controls in after the morph rather than popping them. */
  revealControls?: boolean
  /**
   * Reserve Niko's below-`lg` home here. Only the app's chrome does — the
   * intro's inert copy would register the same slot name and the two would
   * fight over which element the stage measures.
   */
  nikoSlot?: boolean
}

// One theme toggle wide. The intro reserves it as an empty box.
const CONTROL_SLOT = 'size-8'

export function WindowChrome({
  onOpenNav,
  onThemeChange,
  inert = false,
  revealControls = false,
  nikoSlot = false,
}: WindowChromeProps) {
  return (
    <div className="relative flex h-11 shrink-0 items-center justify-between border-b border-line bg-panel px-4">
      <div aria-hidden="true" className="flex gap-2">
        <span className="size-3 rounded-full bg-dot-close" />
        <span className="size-3 rounded-full bg-dot-minimize" />
        <span className="size-3 rounded-full bg-dot-zoom" />
      </div>

      <p className="hidden text-xs text-text-3 sm:block">{site.shellTitle}</p>

      {/* Niko's below-lg band. Absolutely positioned rather than a flex child:
          as a child it would absorb the free space and shove the centred title
          off centre. This is the strip he walks up and down, so it spans the
          whole gap between the dots and the controls — and from `sm`, where the
          title becomes visible, it starts clear of the title's right edge
          instead of letting him wander across it. */}
      {nikoSlot && (
        <NikoSlot
          name="navbar"
          className="pointer-events-none absolute inset-y-1 left-[56px] right-[76px] sm:left-[calc(50%+64px)] lg:hidden"
        />
      )}

      <div
        className="flex items-center gap-2"
        style={
          // ~500ms after the swap, per the spec: the window should read as
          // settled before it grows a control.
          revealControls
            ? { opacity: 0, animation: 'reveal-char 300ms ease-out 500ms forwards' }
            : undefined
        }
      >
        {inert ? (
          <span aria-hidden="true" className={CONTROL_SLOT} />
        ) : (
          <>
            <ThemeToggle onToggled={onThemeChange ?? (() => {})} />
            <button
              type="button"
              onClick={onOpenNav}
              aria-label="Open navigation"
              className="grid size-8 place-items-center rounded-panel border border-control text-text-2 transition-colors duration-200 hover:border-line-strong hover:text-text lg:hidden"
            >
              <Menu size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
