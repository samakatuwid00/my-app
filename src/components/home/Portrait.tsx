import { useEffect, useRef, useState } from 'react'
import portrait from '../../assets/portrait/portrait.png'
import { thoughts } from '../../data/site'

// The portrait thinks out loud: a paper bubble rises from the head on hover,
// keyboard focus, or tap, and each visit shows the next line.
export function Portrait() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [line, setLine] = useState<string>(thoughts[0])

  const next = () => {
    setLine(thoughts[index % thoughts.length])
    setIndex((i) => i + 1)
  }

  useEffect(() => {
    const close = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  return (
    <figure
      ref={ref}
      id="me"
      className={`me${open ? ' open' : ''}`}
      tabIndex={0}
      aria-describedby="thought-text"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') next() }}
      onFocus={(e) => { if (e.currentTarget.matches(':focus-visible')) next() }}
      onPointerUp={(e) => {
        if (e.pointerType === 'mouse') return
        if (!open) next()
        setOpen((o) => !o)
      }}
    >
      <img className="portrait" src={portrait} width={300} height={300} alt="Portrait of Roger A. Abay Jr." fetchPriority="high" />
      <div className="thought">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <p id="thought-text">{line}</p>
      </div>
    </figure>
  )
}
