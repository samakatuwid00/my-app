import { useEffect, useRef } from 'react'

// The hero's ink field: a dot screen that breathes with time and scroll. Two
// slow sine fields interfere into a drifting moiré; the pointer clears a soft
// disc and rings it. On touch screens the clearing drifts on its own. It draws
// only while the hero is on screen and not at all with reduced motion.
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const fine = matchMedia('(pointer: fine)').matches
    const host = cv.parentElement!
    const cell = 14
    let W = 0, H = 0, cols = 0, rows = 0
    let px = -9999, py = -9999, tx = -9999, ty = -9999
    let live = true, frame = 0
    const t0 = performance.now()

    const size = () => {
      W = cv.width = cv.clientWidth
      H = cv.height = cv.clientHeight
      cols = Math.ceil(W / cell) + 1
      rows = Math.ceil(H / cell) + 1
    }
    const move = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
    }
    const leave = () => { tx = ty = -9999 }
    const up = () => { if (!fine) leave() }

    function draw(now: number) {
      frame = 0
      if (!live) return
      const t = (now - t0) / 1000
      if (!fine && tx === -9999) {
        const gx = W * (0.5 + 0.32 * Math.sin(t * 0.23))
        const gy = H * (0.55 + 0.3 * Math.sin(t * 0.17 + 1.3))
        px += (gx - px) * 0.04
        py += (gy - py) * 0.04
      } else {
        px += (tx - px) * 0.08
        py += (ty - py) * 0.08
      }
      ctx!.clearRect(0, 0, W, H)
      ctx!.fillStyle = '#f2f2f0'
      const sy = scrollY * 0.15
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cell + cell / 2
          const y = j * cell + cell / 2
          const a = Math.sin(x * 0.011 + t * 0.35) * Math.cos(y * 0.013 - t * 0.28 + sy * 0.01)
          const b = Math.sin((x + y) * 0.006 - t * 0.2)
          const v = (a + b) * 0.5
          const dx = x - px, dy = y - py
          const dist = Math.sqrt(dx * dx + dy * dy)
          const pull = Math.max(0, 1 - dist / 220)
          let r = Math.max(0, (v * 0.5 + 0.5) * 2.2 - pull * 2.4 + Math.sin(dist * 0.08 - t * 3) * pull * 1.6)
          // Fade toward the text so type stays readable: by column on wide
          // screens, by height on narrow ones where the text spans the width.
          const edge = W > 960
            ? Math.min(1, Math.max(0, (x / W - 0.42) * 2.6))
            : 0.35 + 0.65 * Math.min(1, Math.max(0, (y / H - 0.55) * 2.4))
          r *= 0.25 + 0.75 * edge
          if (r < 0.25) continue
          ctx!.beginPath()
          ctx!.arc(x, y, Math.min(r, cell * 0.45), 0, 6.283)
          ctx!.fill()
        }
      }
      frame = requestAnimationFrame(draw)
    }

    size()
    addEventListener('resize', size)
    host.addEventListener('pointermove', move)
    host.addEventListener('pointerleave', leave)
    host.addEventListener('pointerup', up)
    const io = new IntersectionObserver(([e]) => {
      live = e.isIntersecting
      if (live && !frame) frame = requestAnimationFrame(draw)
    })
    io.observe(cv)
    return () => {
      live = false
      cancelAnimationFrame(frame)
      io.disconnect()
      removeEventListener('resize', size)
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
      host.removeEventListener('pointerup', up)
    }
  }, [])

  return <canvas ref={ref} className="field" aria-hidden="true" />
}
