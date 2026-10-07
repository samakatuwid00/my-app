import { useEffect } from 'react'

type Piece = HTMLElement & { _fx: number; _fy: number; _fr: number; _r: number }

// Everything on the home page that moves with scroll, in one frame loop:
//  - [data-depth] rails drift at their own speed (parallax)
//  - [data-moire] dividers twist
//  - the suite cards stack: each shrinks and dims as the next slides over it,
//    and a card taller than the screen sticks by its bottom edge so all of it
//    is read before the next arrives
//  - the collage pieces fly in from scattered spots, then drift by depth
//  - on touch screens, where nothing follows a pointer, framed screens lean
//    with their place in the viewport
// With reduced motion none of it runs and every element stays where CSS put it.
export function useScrollScene() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const fine = matchMedia('(pointer: fine)').matches
    const q = <T extends Element = HTMLElement>(sel: string) => [...document.querySelectorAll<T & HTMLElement>(sel)]

    const rails = q('[data-depth]')
    const moires = q('[data-moire]')
    const cases = q('.cases .case')
    const leaners = fine ? [] : q('.shot .sf, .shot .phones-frame, .recog figure .ht, .cell .thumb')
    const collage = document.querySelector<HTMLElement>('[data-collage]')
    const pieces = (collage ? q('[data-collage] .piece') : []) as Piece[]
    for (const p of pieces) {
      const [fx, fy, fr] = (p.dataset.from ?? '0,0,0').split(',').map(Number)
      p._fx = fx * 3; p._fy = fy * 3; p._fr = fr; p._r = Number(p.dataset.rot ?? 0)
      p.style.transform = `rotate(${p._r}deg)`
    }

    // The header is 68px on wide screens and 60px on narrow ones; cards stick just under it.
    const header = () => document.querySelector('header.site')?.getBoundingClientRect().height ?? 64
    const pinCases = () => {
      const h = header()
      for (const c of cases) c.style.top = `${Math.min(h, innerHeight - c.offsetHeight)}px`
    }

    let vh = innerHeight
    let ticking = false
    const frame = () => {
      ticking = false
      for (const el of rails) {
        const d = Number(el.dataset.depth)
        const b = el.getBoundingClientRect()
        el.style.transform = `translate3d(0,${(-(b.top + b.height / 2 - vh / 2) * d).toFixed(1)}px,0)`
      }
      for (const m of moires) m.style.setProperty('--ang', `${((m.getBoundingClientRect().top / vh) * 6).toFixed(2)}deg`)
      const head = header()
      for (let i = 0; i < cases.length; i++) {
        const c = cases[i], next = cases[i + 1]
        if (!next) { c.style.transform = ''; c.style.filter = ''; continue }
        const p = Math.min(1, Math.max(0, 1 - (next.getBoundingClientRect().top - head) / Math.max(1, c.getBoundingClientRect().height)))
        c.style.transform = `scale(${(1 - p * 0.04).toFixed(4)}) translateY(${(-p * 18).toFixed(1)}px)`
        c.style.filter = p > 0 ? `brightness(${(1 - p * 0.18).toFixed(3)})` : ''
      }
      if (collage) {
        const cr = collage.getBoundingClientRect()
        const cp = Math.min(1, Math.max(0, (vh - cr.top) / (vh * 0.8)))
        const ease = 1 - Math.pow(1 - cp, 3)
        const unit = cr.width / 1000
        const mid = cr.top + cr.height / 2 - vh / 2
        for (const pc of pieces) {
          const depth = Number(pc.dataset.depthC ?? 0)
          pc.style.transform =
            `translate3d(${(pc._fx * (1 - ease) * unit).toFixed(1)}px,${(pc._fy * (1 - ease) * unit - mid * depth).toFixed(1)}px,0) ` +
            `rotate(${(pc._r + pc._fr * (1 - ease)).toFixed(2)}deg)`
        }
      }
      for (const el of leaners) {
        const b = el.getBoundingClientRect()
        if (b.bottom < 0 || b.top > vh) continue
        const rel = (b.top + b.height / 2 - vh / 2) / vh
        el.style.transform = `perspective(900px) rotateX(${(rel * 10).toFixed(2)}deg) rotateY(${(rel * -4).toFixed(2)}deg)`
      }
    }
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(frame) }
    }
    const onResize = () => { vh = innerHeight; pinCases(); onScroll() }

    pinCases()
    frame()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onResize)
    addEventListener('load', onResize)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onResize)
      removeEventListener('load', onResize)
      for (const el of [...rails, ...cases, ...pieces, ...leaners]) { el.style.transform = ''; el.style.filter = '' }
      for (const c of cases) c.style.top = ''
    }
  }, [])
}
