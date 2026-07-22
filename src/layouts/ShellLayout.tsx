import { useEffect, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { SideRail } from '../components/SideRail'
import { SiteFooter } from '../components/SiteFooter'
import { TransitionTickProvider } from '../components/TransitionTickProvider'
import { WindowChrome } from '../components/WindowChrome'

export function ShellLayout({ children }: PropsWithChildren) {
  const [isNavOpen, setIsNavOpen] = useState(false)
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
      <div className="h-dvh bg-canvas lg:p-6">
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col overflow-hidden border-line bg-surface lg:rounded-window lg:border lg:shadow-window">
          <WindowChrome
            onOpenNav={() => setIsNavOpen(true)}
            onThemeChange={() => setThemeChangeCount((count) => count + 1)}
          />

          <div className="flex min-h-0 flex-1">
            <SideRail isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

            <main ref={paneRef} data-scroll-pane className="min-w-0 flex-1 overflow-y-auto overscroll-contain">
              {children}
              <SiteFooter />
            </main>
          </div>
        </div>
      </div>
    </TransitionTickProvider>
  )
}
