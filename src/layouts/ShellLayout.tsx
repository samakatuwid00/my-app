import { useEffect, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'
import { PixelCurtain } from '../components/PixelCurtain'
import { SideRail } from '../components/SideRail'
import { SiteFooter } from '../components/SiteFooter'
import { WindowChrome } from '../components/WindowChrome'

export function ShellLayout({ children }: PropsWithChildren) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [themeWipeCount, setThemeWipeCount] = useState(0)
  const { pathname } = useLocation()
  const paneRef = useRef<HTMLElement>(null)

  useEffect(() => {
    paneRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  // The window is a fixed-height frame; only the pane scrolls. Sticky positioning
  // cannot be used here — the frame's overflow-hidden (which rounds the corners)
  // makes it a scroll container, and that disables sticky on every descendant.
  return (
    <div className="h-dvh bg-canvas lg:p-6">
      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col overflow-hidden border-line bg-surface lg:rounded-window lg:border lg:shadow-window">
        <WindowChrome
          onOpenNav={() => setIsNavOpen(true)}
          onThemeChange={() => setThemeWipeCount((count) => count + 1)}
        />

        <div className="flex min-h-0 flex-1">
          <SideRail isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

          <div className="relative flex min-w-0 flex-1">
            <main ref={paneRef} data-scroll-pane className="w-full overflow-y-auto overscroll-contain">
              {children}
              <SiteFooter />
            </main>

            <PixelCurtain trigger={pathname} />
          </div>
        </div>

        {/* Theme wipe covers chrome + rail + pane, clipped to the window's rounded frame */}
        <PixelCurtain trigger={themeWipeCount} scope="window" />
      </div>
    </div>
  )
}
