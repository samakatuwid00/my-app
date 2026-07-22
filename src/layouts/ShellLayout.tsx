import { useEffect, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { AskDrawer } from '../components/AskDrawer'
import { AskProvider } from '../components/AskProvider'
import { CommandBar } from '../components/CommandBar'
import { SideRail } from '../components/SideRail'
import { SiteFooter } from '../components/SiteFooter'
import { TransitionTickProvider } from '../components/TransitionTickProvider'
import { WindowChrome } from '../components/WindowChrome'
import { useRailCollapsed } from '../hooks/useRailCollapsed'

export function ShellLayout({ children }: PropsWithChildren) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { isCollapsed, toggleCollapsed } = useRailCollapsed()
  const [themeChangeCount, setThemeChangeCount] = useState(0)
  const { pathname } = useLocation()
  const paneRef = useRef<HTMLElement>(null)

  useEffect(() => {
    paneRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  // The window is a fixed-height frame; only the pane scrolls. Sticky positioning
  // cannot be used here — the frame's overflow-hidden (which rounds the corners)
  // makes it a scroll container, and that disables sticky on every descendant.
  return (
    <TransitionTickProvider tick={`${pathname}:${themeChangeCount}`}>
      <AskProvider>
        <div className="h-dvh bg-canvas lg:p-6">
          <div className="relative mx-auto flex h-full max-w-[1600px] flex-col overflow-hidden border-line bg-surface lg:rounded-window lg:border lg:shadow-window">
            <WindowChrome
              onOpenNav={() => setIsNavOpen(true)}
              onThemeChange={() => setThemeChangeCount((count) => count + 1)}
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

                <AskDrawer />
              </div>
            </div>

            <CommandBar />
          </div>
        </div>
      </AskProvider>
    </TransitionTickProvider>
  )
}
