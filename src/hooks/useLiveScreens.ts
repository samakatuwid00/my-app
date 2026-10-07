import { useEffect } from 'react'

// Counts a number up from zero, easing out, keeping the thousands separators.
function countUp(el: Element) {
  const to = Number(el.getAttribute('data-to'))
  if (!to) return
  const start = performance.now(), dur = 1500
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / dur)
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString('en-US')
    if (p < 1) requestAnimationFrame(step)
  }
  el.textContent = '0'
  setTimeout(() => requestAnimationFrame(step), 250)
}

// The schematics over each screenshot play once when they arrive (.on) and
// idle only while on screen (.in-view). Framed screens tilt toward a mouse;
// on touch screens a tap shows the real screen, since there is no hover.
// Build-log cards get a soft spotlight that follows the pointer.
export function useLiveScreens() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = matchMedia('(pointer: fine)').matches
    const noHover = matchMedia('(hover: none)').matches
    const cleanups: (() => void)[] = []

    const figs = [...document.querySelectorAll<SVGElement>('.fig')]
    if (reduce) {
      for (const f of figs) f.classList.add('on', 'in-view')
    } else {
      document.documentElement.classList.add('figs-armed')
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            e.target.classList.toggle('in-view', e.isIntersecting)
            if (e.isIntersecting && !e.target.classList.contains('on')) {
              e.target.classList.add('on')
              e.target.querySelectorAll('.cnt').forEach(countUp)
            }
          }
        },
        { threshold: 0.25 },
      )
      figs.forEach((f) => io.observe(f))
      cleanups.push(() => { io.disconnect(); document.documentElement.classList.remove('figs-armed') })
    }

    if (fine && !reduce) {
      for (const el of document.querySelectorAll<HTMLElement>('[data-tilt]')) {
        const target = el.querySelector<HTMLElement>('.sf, .phones-frame') ?? el
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width - 0.5
          const y = (e.clientY - r.top) / r.height - 0.5
          target.style.transform = `perspective(1000px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateZ(6px)`
        }
        const leave = () => { target.style.transform = '' }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) })
      }
      for (const el of document.querySelectorAll<HTMLElement>('.cell')) {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          el.style.setProperty('--mx', `${e.clientX - r.left}px`)
          el.style.setProperty('--my', `${e.clientY - r.top}px`)
        }
        el.addEventListener('pointermove', move)
        cleanups.push(() => el.removeEventListener('pointermove', move))
      }
    }

    if (noHover) {
      document.querySelectorAll('.hint').forEach((h) => { h.textContent = 'tap' })
      for (const el of document.querySelectorAll<HTMLElement>('.sf, .cell')) {
        if (el.closest('a')) continue
        const tap = () => el.classList.toggle('show')
        el.addEventListener('click', tap)
        cleanups.push(() => el.removeEventListener('click', tap))
      }
    }

    return () => cleanups.forEach((c) => c())
  }, [])
}
