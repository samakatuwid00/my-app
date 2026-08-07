import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollUpButton({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>
}) {
  const [shown, setShown] = useState(false)
  const [hide, setHide] = useState(false)
  const [reduced, setReduced] = useState(false)
  const lastTop = useRef(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    setReduced(prefersReduced)

    function onScroll() {
      const top = el!.scrollTop
      setShown(top > 200)
      setHide(top - lastTop.current < 0) // hide when scrolling down
      lastTop.current = top
    }

    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [containerRef])

  function scrollToTop() {
    const el = containerRef.current
    if (!el) return
    el.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  if (!shown) return null

  return (
    // Centered horizontally at the bottom of the pane so it never floats over
    // corner controls on mobile, and stays clear of the GitHub / footer buttons.
    <div className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2">
      <button
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className="flex h-9 w-9 items-center justify-center rounded-panel border border-line bg-surface text-text-3 opacity-50 hover:text-text hover:opacity-100"
        style={{
          opacity: hide ? 0 : 0.5,
          pointerEvents: hide ? 'none' : 'auto',
          transform: hide ? 'translateY(8px)' : 'translateY(0)',
          transition: reduced ? 'none' : 'opacity 150ms, transform 150ms',
        }}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  )
}
