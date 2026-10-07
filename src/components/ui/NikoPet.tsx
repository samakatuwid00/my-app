import { useEffect, useRef } from 'react'

// Niko, the pixel pet from docs/niko-frames.js: the same 13 x 12 grid, poses and
// movement table as the terminal pet, drawn as one SVG path per frame. He walks
// the bottom edge, takes the ink of the band under him, and reacts: hover is
// love, a click is a little dance, a fast scroll makes him trot, the contact
// section is a celebration, and a minute and a half of stillness puts him to sleep.
// Reduced motion hides him entirely.

const NW = 13, NH = 12
type Grid = number[][]
type Fx = { x: number; y: number; t: string; a?: boolean }
type Frame = { d: string; dx: number; dy: number; fx: Fx[]; fade: number }
type Anim = { fps: number; frames: Frame[]; once?: boolean; step?: boolean }
type PoseOpts = { squash?: boolean; tall?: boolean; ears?: string; eyes?: string; mouth?: string; legs?: string }

const EYES: Record<string, { r: number; h: number; l: [number, number]; rt: [number, number] } | null> = {
  open: { r: 6, h: 2, l: [2, 3], rt: [9, 10] },
  shut: { r: 7, h: 1, l: [2, 3], rt: [9, 10] },
  happy: { r: 6, h: 1, l: [2, 3], rt: [9, 10] },
  left: { r: 6, h: 2, l: [1, 2], rt: [8, 9] },
  right: { r: 6, h: 2, l: [3, 4], rt: [10, 11] },
  up: { r: 5, h: 2, l: [2, 3], rt: [9, 10] },
  down: { r: 7, h: 2, l: [2, 3], rt: [9, 10] },
  none: null,
}

function pose(o: PoseOpts = {}): Grid {
  const g: Grid = Array.from({ length: NH }, () => new Array(NW).fill(0))
  const fill = (r0: number, r1: number, c0: number, c1: number, v = 1) => {
    for (let r = r0; r <= r1; r++) if (r >= 0 && r < NH) for (let c = c0; c <= c1; c++) if (c >= 0 && c < NW) g[r][c] = v
  }
  const carve = (r0: number, r1: number, c0: number, c1: number) => fill(r0, r1, c0, c1, 0)
  const sq = !!o.squash
  const top = o.tall ? 3 : sq ? 5 : 4
  fill(top, sq ? 10 : 9, 0, 12)
  const er = top - 1
  const ears = o.ears ?? 'up'
  if (ears === 'up') { fill(er, er, 1, 2); fill(er, er, 10, 11) }
  if (ears === 'perk') { fill(er - 1, er, 1, 2); fill(er - 1, er, 10, 11) }
  if (ears === 'waveA') { fill(er - 1, er, 1, 2); fill(er, er, 10, 11) }
  if (ears === 'waveB') { fill(er, er, 0, 1); fill(er, er, 10, 11) }
  const e = EYES[o.eyes ?? 'open']
  if (e) {
    const r = e.r + (sq ? 2 : 0)
    carve(r, r + e.h - 1, e.l[0], e.l[1])
    carve(r, r + e.h - 1, e.rt[0], e.rt[1])
  }
  if (o.mouth === 'open') carve(sq ? 9 : 8, sq ? 9 : 8, 5, 7)
  const L = o.legs ?? (sq ? 'stub' : 'stand')
  if (L === 'stand') { fill(10, 10, 1, 2); fill(10, 10, 4, 5); fill(10, 10, 7, 8); fill(10, 10, 10, 11) }
  if (L === 'stub') { fill(11, 11, 1, 2); fill(11, 11, 4, 5); fill(11, 11, 7, 8); fill(11, 11, 10, 11) }
  if (L === 'a') { fill(10, 10, 1, 2); fill(10, 10, 7, 8); fill(11, 11, 4, 5); fill(11, 11, 10, 11) }
  if (L === 'b') { fill(10, 10, 4, 5); fill(10, 10, 10, 11); fill(11, 11, 1, 2); fill(11, 11, 7, 8) }
  if (L === 'tuck') { fill(10, 10, 4, 5); fill(10, 10, 7, 8) }
  return g
}

const toPath = (g: Grid) => {
  let d = ''
  for (let r = 0; r < NH; r++) for (let c = 0; c < NW; c++) if (g[r][c]) d += `M${c} ${r}h1v1h-1z`
  return d
}
const F = (p: PoseOpts = {}, x: Partial<Omit<Frame, 'd'>> = {}): Frame => ({ d: toPath(pose(p)), dx: x.dx ?? 0, dy: x.dy ?? 0, fx: x.fx ?? [], fade: x.fade ?? 1 })
const fx = (x: number, y: number, t: string, a = false): Fx => ({ x, y, t, a })

const ANIM: Record<string, Anim> = {
  idle: { fps: 1.6, frames: [F(), F({ squash: true })] },
  blink: { fps: 6, frames: [F(), F(), F(), F(), F({ eyes: 'shut' })] },
  look: { fps: 2, frames: [F(), F({ eyes: 'left' }), F({ eyes: 'left' }), F(), F({ eyes: 'right' }), F({ eyes: 'right' })] },
  walk: { fps: 4, step: true, frames: [F({ legs: 'a' }), F({ legs: 'b' })] },
  hop: { fps: 8, once: true, frames: [F({ squash: true }), F({ legs: 'tuck' }, { dy: -1 }), F({ legs: 'tuck', eyes: 'happy' }, { dy: -2 }), F({ legs: 'tuck' }, { dy: -1 }), F({ squash: true }), F()] },
  stretch: { fps: 2.5, once: true, frames: [F({ squash: true, eyes: 'shut' }), F(), F({ tall: true, ears: 'perk' }), F({ tall: true, ears: 'perk', eyes: 'shut' }), F()] },
  wave: { fps: 3, frames: [F({ ears: 'waveA', eyes: 'happy' }), F({ ears: 'waveB', eyes: 'happy' })] },
  turn: { fps: 2.5, once: true, frames: [F({ eyes: 'right' }), F({ eyes: 'none' }), F({ eyes: 'none' }), F({ eyes: 'left' }), F()] },
  dance: { fps: 4, frames: [F({ legs: 'a', ears: 'perk' }, { dx: -1, fx: [fx(14, 1, '♪')] }), F({ legs: 'b' }, { dx: 1, fx: [fx(15, 0, '♪')] }), F({ legs: 'a' }, { dx: 1, fx: [fx(-2, 1, '♪')] }), F({ legs: 'b', ears: 'perk' }, { dx: -1, fx: [fx(-3, 0, '♪')] })] },
  think: { fps: 2, frames: [F({ eyes: 'up' }, { fx: [fx(14, 0, '·')] }), F({ eyes: 'up' }, { fx: [fx(14, 0, '··')] }), F({ eyes: 'up' }, { fx: [fx(14, 0, '···')] })] },
  happy: { fps: 5, once: true, frames: [F({ squash: true, eyes: 'happy' }), F({ eyes: 'happy', legs: 'tuck' }, { dy: -1, fx: [fx(6, -1, '!', true)] }), F({ eyes: 'happy' }, { fx: [fx(6, -1, '!', true)] })] },
  love: { fps: 2.5, frames: [F({ eyes: 'happy' }, { fx: [fx(13, 1, '♥', true)] }), F({ eyes: 'happy' }, { fx: [fx(14, 0, '♥', true)] }), F({ eyes: 'happy' }, { fx: [fx(15, -1, '♥', true), fx(13, 1, '♥', true)] })] },
  celebrate: { fps: 5, frames: [F({ legs: 'tuck', eyes: 'happy' }, { dy: -1, fx: [fx(-2, 0, '✦', true), fx(14, 2, '✧', true)] }), F({ eyes: 'happy' }, { fx: [fx(-1, -1, '✧', true), fx(15, 0, '✦', true)] }), F({ legs: 'tuck', eyes: 'happy' }, { dy: -1, fx: [fx(-3, 2, '✧', true), fx(16, -1, '✦', true)] }), F({ eyes: 'happy' }, { fx: [fx(-1, 1, '✦', true), fx(14, 0, '✧', true)] })] },
  sleep: { fps: 1.2, frames: [F({ squash: true, eyes: 'shut' }, { fx: [fx(13, 1, 'z')] }), F({ squash: true, eyes: 'shut' }, { fx: [fx(14, 0, 'z')] }), F({ squash: true, eyes: 'shut' }, { fx: [fx(15, -1, 'Z'), fx(13, 1, 'z')] })] },
  poof: { fps: 5, once: true, frames: [F({}, { fade: 0.25 }), F({}, { fade: 0.5 }), F({}, { fade: 0.75 }), F({}, { fx: [fx(0, -1, '✦', true), fx(12, -1, '✦', true)] })] },
}
const AMBIENT = ['idle', 'idle', 'blink', 'idle', 'look', 'walk', 'idle', 'stretch', 'blink', 'turn', 'idle', 'dance', 'idle', 'think', 'blink', 'hop']

export function NikoPet() {
  const btn = useRef<HTMLButtonElement>(null)
  const path = useRef<SVGPathElement>(null)
  const fxg = useRef<SVGGElement>(null)
  const tag = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const pet = btn.current, px = path.current, fxEl = fxg.current, tagEl = tag.current
    if (!pet || !px || !fxEl || !tagEl || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const queue: string[] = ['poof', 'wave', 'wave']
    let cur: Anim = ANIM.idle, curName = 'idle', fi = 0, last = 0, cycles = 0
    let x = 18, dir = 1, idleSince = performance.now(), asleep = false, ai = 0, raf = 0
    let lastY = scrollY, trotAt = 0, celebrated = false

    const render = (f: Frame) => {
      px.setAttribute('d', f.d)
      px.setAttribute('transform', `translate(${f.dx} ${f.dy})`)
      px.style.opacity = String(f.fade)
      fxEl.replaceChildren(...f.fx.map((e) => {
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        t.setAttribute('class', e.a ? 'fx a' : 'fx')
        t.setAttribute('x', String(e.x + f.dx))
        t.setAttribute('y', String(e.y + f.dy + 1.6))
        t.textContent = e.t
        return t
      }))
    }
    // The far end of his walk stops short of the assistant button.
    const maxX = () => {
      const ask = document.querySelector('.ask')?.getBoundingClientRect()
      return Math.max(24, (ask ? ask.left : innerWidth) - pet.offsetWidth - 16)
    }
    const next = () => {
      curName = queue.length ? queue.shift()! : asleep ? 'sleep' : AMBIENT[ai++ % AMBIENT.length]
      cur = ANIM[curName]
      fi = 0
      cycles = cur.once ? 1 : 2
      tagEl.textContent = `niko · ${curName}`
      if (curName === 'walk') {
        if (x > maxX() - 40) dir = -1
        if (x < 18) dir = 1
        if (Math.random() < 0.3) dir = -dir
        pet.classList.toggle('flip', dir < 0)
        cycles = 4 + Math.floor(Math.random() * 4)
      }
    }
    const interrupt = (...names: string[]) => { queue.unshift(...names); cycles = 0; fi = cur.frames.length }
    const ink = () => {
      const el = document.elementFromPoint(x + 24, innerHeight - 30)
      const band = el?.closest<HTMLElement>('[data-band]')
      pet.classList.toggle('on-light', band?.dataset.band === 'light')
    }

    const loop = (now: number) => {
      if (now - last >= 1000 / cur.fps) {
        last = now
        if (fi >= cur.frames.length) { fi = 0; cycles--; if (cycles <= 0) next() }
        render(cur.frames[fi])
        if (curName === 'walk' && cur.step) {
          x = Math.max(12, Math.min(maxX(), x + dir * 3))
          pet.style.left = `${x}px`
        }
        fi++
      }
      if (!asleep && now - idleSince > 90000) { asleep = true; queue.push('sleep') }
      raf = requestAnimationFrame(loop)
    }

    const wake = () => {
      idleSince = performance.now()
      if (asleep) { asleep = false; interrupt('stretch') }
    }
    const onEnter = () => { if (curName !== 'love') interrupt('love') }
    const onClick = () => interrupt('happy', 'dance', 'dance')
    const onScroll = () => {
      wake()
      const dy = scrollY - lastY
      lastY = scrollY
      if (Math.abs(dy) > 40 && curName !== 'walk' && performance.now() - trotAt > 2500) { trotAt = performance.now(); interrupt('walk') }
      ink()
      const contact = document.getElementById('contact')?.getBoundingClientRect()
      if (!celebrated && contact && contact.top < innerHeight * 0.5) { celebrated = true; interrupt('celebrate', 'celebrate') }
    }

    next()
    ink()
    raf = requestAnimationFrame(loop)
    addEventListener('pointermove', wake, { passive: true })
    addEventListener('keydown', wake)
    addEventListener('scroll', onScroll, { passive: true })
    pet.addEventListener('pointerenter', onEnter)
    pet.addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', wake)
      removeEventListener('keydown', wake)
      removeEventListener('scroll', onScroll)
      pet.removeEventListener('pointerenter', onEnter)
      pet.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <button ref={btn} className="pet" type="button" aria-label="Niko, the pixel pet. Click to play.">
      <span className="tag"><span ref={tag}>niko · idle</span></span>
      <svg viewBox="-4 -3 22 16" aria-hidden="true">
        <path ref={path} className="px" d="" />
        <g ref={fxg} />
      </svg>
    </button>
  )
}
