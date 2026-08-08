import { useEffect, useRef } from 'react'
import { useNiko } from '../../hooks/useNiko'
import { useTransitionTick } from '../../hooks/useTransitionTick'

/**
 * Turns the shell's own transition tick into Niko events. Mounted inside
 * `ShellLayout` so it sees the tick; renders nothing.
 *
 * The tick changes on a route change *and* on a theme flip, and the two want
 * different reactions, so its two halves are read apart. Neither fires on the
 * first tick: the shell's first render is the arrival from the intro, where
 * Niko is already mid-walk under the morph's own direction.
 */
export function NikoRouteEvents() {
  const tick = useTransitionTick()
  const niko = useNiko()
  const event = niko?.event

  const [pathname, themeCount] = tick.split(':')
  const seenPath = useRef<string | null>(null)
  const seenTheme = useRef<string | null>(null)

  useEffect(() => {
    if (!event || !pathname) return
    const first = seenPath.current === null
    seenPath.current = pathname
    if (!first) event('route')
  }, [event, pathname])

  useEffect(() => {
    if (!event || themeCount === undefined) return
    const first = seenTheme.current === null
    seenTheme.current = themeCount
    if (!first) event('theme')
  }, [event, themeCount])

  return null
}
