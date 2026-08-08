import { useState } from 'react'
import { ANIMATION_NAMES, ANIMATIONS } from './engine'
import type { AnimationName } from './engine'
import { NikoSprite } from './NikoSprite'
import { useNiko } from '../../hooks/useNiko'

/**
 * `?niko-debug=1` — plays any of the 19 movements by name, held so it loops
 * until another is picked. Fixed to the viewport so it works over the intro and
 * over the app without either laying out around it.
 */
export function NikoDebugPanel() {
  const niko = useNiko()
  const [pinned, setPinned] = useState<AnimationName | null>(null)

  if (!niko) return null

  function select(name: AnimationName) {
    const next = pinned === name ? null : name
    setPinned(next)
    niko?.hold(next)
  }

  return (
    <div className="fixed bottom-3 right-3 z-[200] max-w-[280px] rounded-panel border border-line bg-panel p-3 shadow-window">
      <div className="mb-2 flex items-baseline gap-2">
        <p className="label">Niko debug</p>
        <p className="text-[10px] text-text-3">{niko.move}</p>
      </div>

      <div className="mb-2 flex justify-center border border-line bg-surface py-1">
        <NikoSprite frame={niko.frame} showTag fontSize={11.5} label="Niko debug preview" move={niko.move} />
      </div>

      <div className="flex flex-wrap gap-1">
        {ANIMATION_NAMES.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => select(name)}
            title={ANIMATIONS[name].desc}
            className={`rounded-[3px] border px-1.5 py-0.5 text-[10px] transition-colors duration-150 ${
              pinned === name
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-control text-text-2 hover:border-accent hover:text-accent'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <p className="mt-2 text-[10px] text-text-3">click again to release</p>
    </div>
  )
}
