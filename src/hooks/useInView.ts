import { useEffect, useState, type RefObject } from 'react'

// inView follows the element on and off screen (loops pause off it); seen
// latches the first time it arrives (entrances play once).
export function useInView(ref: RefObject<Element | null>, threshold = 0.35): { inView: boolean; seen: boolean } {
  const [inView, setInView] = useState(false)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setSeen(true)
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return { inView, seen }
}
