// The intro window. Chrome is the app's own `WindowChrome` in its inert mode,
// so the bar the visitor is looking at during the boot log is the same bar,
// with the same geometry, that the app window carries after the morph.
//
// The body is two columns: the log, and a ~180px rail Niko wakes up in. The
// rail is a `NikoSlot` — it only reserves the space; the sprite itself is
// fixed-position and owned by `NikoStage`, which is what lets it walk out of
// this window and into the SideRail without ever unmounting.
import { useEffect, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import { WindowChrome } from '../WindowChrome'
import { NikoSlot } from '../NikoPet/NikoSlot'

type TerminalWindowProps = {
  children: ReactNode
  reduced?: boolean
  /** The element the FLIP measures and moves. */
  frameRef?: RefObject<HTMLDivElement | null>
  /** Swapped for the app once the morph starts; the curtain hides the change. */
  body?: ReactNode
  /**
   * During the morph the window has to fill the rect its wrapper is animating,
   * so it drops the centred `max-w-3xl` box it wears while the log is typing.
   * Leaving the cap on pins the window at 768px and the FLIP goes nowhere.
   */
  morphing?: boolean
}

/** Matches the spec's ~180px column right of the log. */
const RAIL = 'w-[180px]'

export function TerminalWindow({
  children,
  reduced = false,
  frameRef,
  body,
  morphing = false,
}: TerminalWindowProps) {
  const logRef = useRef<HTMLDivElement>(null)

  // Keep the newest line visible as the sequence types out.
  useEffect(() => {
    const el = logRef.current
    if (!el) return
    const scroll = () => {
      el.scrollTop = el.scrollHeight
    }
    scroll()
    if (reduced) return
    const observer = new MutationObserver(scroll)
    observer.observe(el, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [reduced])

  return (
    <div
      ref={frameRef}
      className={`flex flex-col overflow-hidden border-line bg-surface lg:rounded-window lg:border lg:shadow-window ${
        morphing ? 'h-full w-full' : 'mx-auto w-full max-w-3xl'
      }`}
    >
      <WindowChrome inert />

      {body ?? (
        <div className="relative flex min-h-0 flex-1">
          {/* 13px, not the 14px body size: at 14px the `> ready …` line is one
              character wider than the 586px log column and wraps. */}
          <div
            ref={logRef}
            className="no-scrollbar min-w-0 flex-1 overflow-y-hidden overscroll-contain bg-panel p-6 pb-[124px] font-mono text-[13px] [line-height:1.7] sm:pb-6"
            style={{ height: 'min(60vh, 420px)' }}
          >
            {children}
          </div>

          <div className={`hidden shrink-0 border-l border-line bg-panel sm:block ${RAIL}`} />

          {/* One slot, two placements. Below sm there is no room for a rail, so
              he sits in the corner of the window the way the mobile pet does —
              which is why the log carries `pb-[124px]` there, so its last lines
              never run underneath him. At sm and up the same box centres inside
              the 180px rail ((180 - 150) / 2 = 15px from the right edge). */}
          <NikoSlot
            name="intro"
            className="absolute bottom-3 right-3 h-[110px] w-[130px] sm:bottom-6 sm:right-[15px] sm:h-32 sm:w-[150px]"
          />
        </div>
      )}
    </div>
  )
}
