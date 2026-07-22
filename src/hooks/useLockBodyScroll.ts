import { useEffect } from 'react'

// The app window scrolls its pane, not the document, so locking <body> alone
// would leave the background scrollable behind modals and the mobile nav.
export function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return

    const pane = document.querySelector<HTMLElement>('[data-scroll-pane]')
    const previousBody = document.body.style.overflow
    const previousPane = pane?.style.overflow ?? ''

    document.body.style.overflow = 'hidden'
    if (pane) pane.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBody
      if (pane) pane.style.overflow = previousPane
    }
  }, [isLocked])
}
