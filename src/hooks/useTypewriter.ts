import { useEffect, useState } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/** Reveals `text` one character at a time. Resolves instantly under reduced motion. */
export function useTypewriter(text: string, { speed = 55, delay = 700 } = {}) {
  const [count, setCount] = useState(() =>
    typeof matchMedia === 'function' && matchMedia(REDUCED_MOTION).matches ? text.length : 0,
  )

  useEffect(() => {
    if (count >= text.length) return
    const timer = setTimeout(() => setCount((current) => current + 1), count === 0 ? delay : speed)
    return () => clearTimeout(timer)
  }, [count, text.length, speed, delay])

  return { typed: text.slice(0, count), done: count >= text.length }
}
