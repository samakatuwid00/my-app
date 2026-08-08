import { useEffect, useRef } from 'react'
import { useNiko } from '../../hooks/useNiko'
import type { NikoSlotName } from './NikoContext'

/**
 * Reserves the space Niko stands in and publishes its element to the provider.
 * Renders nothing visible — the sprite itself is fixed-position and lives in
 * `NikoStage`, so it can travel between slots without unmounting.
 */
export function NikoSlot({
  name,
  className = '',
}: {
  name: NikoSlotName
  className?: string
}) {
  const niko = useNiko()
  const ref = useRef<HTMLDivElement>(null)
  const register = niko?.registerSlot

  useEffect(() => {
    if (!register) return
    register(name, ref.current)
    return () => register(name, null)
  }, [register, name])

  return <div ref={ref} aria-hidden="true" className={className} data-niko-slot-name={name} />
}
