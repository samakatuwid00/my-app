import { useEffect, useRef, useState } from 'react'
import type { PropsWithChildren, RefObject } from 'react'
import { useLocation } from 'react-router-dom'
import { AskDrawer } from '../components/AskDrawer'
import { AskProvider } from '../components/AskProvider'
import { CommandBar } from '../components/CommandBar'
import { NikoRouteEvents } from '../components/NikoPet/NikoRouteEvents'
import { PixelOverlay } from '../components/PixelOverlay'
import { SideRail } from '../components/SideRail'
import { SiteFooter } from '../components/SiteFooter'
import { TransitionTickProvider } from '../components/TransitionTickProvider'
import { WindowChrome } from '../components/WindowChrome'
import { useRailCollapsed } from '../hooks/useRailCollapsed'
import { ScrollUpButton } from '../components/ui/ScrollUpButton'

type ShellLayoutProps = PropsWithChildren<{
  /** The window element the intro's FLIP measures and lands on. */
  windowRef?: RefObject<HTMLDivElement | null>
  /** True while the intro is morphing onto this window: hold the curtain up
   *  over the whole shell, then sweep it out once the intro has left. */
  morphing?: boolean
}>

export function ShellLayout({ children, windowRef, morphing = false }: ShellLayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { isCollapsed, toggleCollapsed } = useRailCollapsed()
  const [themeChangeCount, setThemeChangeCount] = useState(0)
  // Latched, not tracked: `morphing` goes false the moment the intro leaves,
  // and pulling the style off mid-fade would pop the controls in.
  const [arrivedByMorph] = useState(morphing)
  const { pathname } = useLocation()
  const paneRef = useRef<HTMLElement>(null)

  useEffect(() => {
    paneRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  // Arriving from the intro is a navigation, so the keyboard has to arrive too.
  // The heading is made programmatically focusable for the moment it is focused
  // and left out of the tab order.
  useEffect(() => {
    if (!arrivedByMorph) return
    const timer = setTimeout(() => {
      const heading = paneRef.current?.querySelector<HTMLElement>('h1, h2')
      if (!heading) return
      heading.tabIndex = -1
      heading.focus({ preventScroll: true })
    }, 700)
    return () => clearTimeout(timer)
  }, [arrivedByMorph])

  // The window is a fixed-height frame; only the pane scrolls. Sticky positioning
  // cannot be used here — the frame's overflow-hidden (which rounds the corners)
  // makes it a scroll container, and that disables sticky on every descendant.
  return (
    <TransitionTickProvider tick={`${pathname}:${themeChangeCount}`}>
      <AskProvider>
        <div className="h-dvh bg-canvas lg:p-6">
          <div
            ref={windowRef}
            className="relative mx-auto flex h-full max-w-[1600px] flex-col overflow-hidden border-line bg-surface lg:rounded-window lg:border lg:shadow-window"
          >
            <WindowChrome
              onOpenNav={() => setIsNavOpen(true)}
              onThemeChange={() => setThemeChangeCount((count) => count + 1)}
              revealControls={arrivedByMorph}
              nikoSlot
            />

            <div className="flex min-h-0 flex-1">
              <SideRail
                isOpen={isNavOpen}
                onClose={() => setIsNavOpen(false)}
                isCollapsed={isCollapsed}
                onToggleCollapse={toggleCollapsed}
              />

              {/* The drawer is positioned against this column rather than the row,
                  so it overlays the pane without resizing it and tracks the rail
                  as it collapses. */}
              <div className="relative flex min-w-0 flex-1 flex-col">
                <main ref={paneRef} data-scroll-pane className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                  {children}
                  <SiteFooter />
                </main>
                <ScrollUpButton containerRef={paneRef} />

                <AskDrawer />
              </div>
            </div>

            <CommandBar />

            <NikoRouteEvents />

            {/* The handover curtain. It is the same component every route
                transition uses, held opaque until the intro window has finished
                travelling and left the DOM. */}
            {morphing && <PixelOverlay runKey="morph-target" holdMs={620} />}
          </div>
        </div>
      </AskProvider>
    </TransitionTickProvider>
  )
}
