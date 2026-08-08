/**
 * Niko movement engine — a port of `docs/niko-frames.js`, the approved motion
 * spec. Pure data and pure functions: no React, no DOM, no timers. The provider
 * owns the clock; the sprite component owns the paint.
 *
 * Geometry is the spec's, unchanged: a 13 × 12 pixel grid drawn as 13 × 6
 * half-block cells, composited onto a 21 × 9 character canvas with the sprite's
 * feet on `ground` (h - 2) and the name tag one row below that.
 *
 * The only thing deliberately left behind is the spec's colour table. Terminal
 * truecolor values are hard-coded RGB; on the site every colour comes from a
 * token, so the compositor tags each cell with a *kind* (`b` body, `a` accent
 * fx, `d` dim fx / name tag) and the renderer resolves kinds to CSS vars.
 */

export const SPRITE_W = 13
export const SPRITE_H = 12
export const SPRITE_ROWS = 6

/** Default character canvas — 21 cells wide, 9 rows tall, feet on row 7. */
export const CANVAS_W = 21
export const CANVAS_H = 9

const W = SPRITE_W
const H = SPRITE_H
const ROWS = SPRITE_ROWS

/* ---------- sprite: 13 x 12 pixel grid, drawn as 13 x 6 half-block cells ---------- */

type Pixels = number[][]

function blank(): Pixels {
  return Array.from({ length: H }, () => new Array<number>(W).fill(0))
}

function fill(g: Pixels, r0: number, r1: number, c0: number, c1: number, v = 1) {
  for (let r = r0; r <= r1; r++) {
    if (r < 0 || r >= H) continue
    for (let c = c0; c <= c1; c++) if (c >= 0 && c < W) g[r][c] = v
  }
}

function carve(g: Pixels, r0: number, r1: number, c0: number, c1: number) {
  fill(g, r0, r1, c0, c1, 0)
}

export type EyeKey = 'open' | 'shut' | 'happy' | 'left' | 'right' | 'up' | 'down' | 'none'
export type EarKey = 'up' | 'perk' | 'droop' | 'waveA' | 'waveB'
export type LegKey = 'stand' | 'stub' | 'a' | 'b' | 'tuck'
export type MouthKey = 'open' | 'big'

type EyeSpec = { r: number; h: number; l: [number, number]; rt: [number, number] }

const EYES: Record<EyeKey, EyeSpec | null> = {
  open: { r: 6, h: 2, l: [2, 3], rt: [9, 10] },
  shut: { r: 7, h: 1, l: [2, 3], rt: [9, 10] },
  happy: { r: 6, h: 1, l: [2, 3], rt: [9, 10] },
  left: { r: 6, h: 2, l: [1, 2], rt: [8, 9] },
  right: { r: 6, h: 2, l: [3, 4], rt: [10, 11] },
  up: { r: 5, h: 2, l: [2, 3], rt: [9, 10] },
  down: { r: 7, h: 2, l: [2, 3], rt: [9, 10] },
  none: null,
}

export type PoseOptions = {
  squash?: boolean
  tall?: boolean
  ears?: EarKey
  eyes?: EyeKey
  mouth?: MouthKey
  legs?: LegKey
}

/** Builds the pixel grid for one pose. Direct port of the spec's `pose()`. */
export function pose(o: PoseOptions = {}): Pixels {
  const g = blank()
  const sq = Boolean(o.squash)
  const tall = Boolean(o.tall)
  const top = tall ? 3 : sq ? 5 : 4
  const bot = sq ? 10 : 9
  fill(g, top, bot, 0, 12)

  const er = top - 1
  const ears: EarKey = o.ears || 'up'
  if (ears === 'up') {
    fill(g, er, er, 1, 2)
    fill(g, er, er, 10, 11)
  }
  if (ears === 'perk') {
    fill(g, er - 1, er, 1, 2)
    fill(g, er - 1, er, 10, 11)
  }
  if (ears === 'droop') {
    fill(g, er, er, 0, 1)
    fill(g, er, er, 11, 12)
  }
  if (ears === 'waveA') {
    fill(g, er - 1, er, 1, 2)
    fill(g, er, er, 10, 11)
  }
  if (ears === 'waveB') {
    fill(g, er, er, 0, 1)
    fill(g, er, er, 10, 11)
  }

  const e = EYES[o.eyes || 'open']
  if (e) {
    const r = e.r + (sq ? 2 : 0)
    carve(g, r, r + e.h - 1, e.l[0], e.l[1])
    carve(g, r, r + e.h - 1, e.rt[0], e.rt[1])
  }

  const mr = sq ? 9 : 8
  if (o.mouth === 'open') carve(g, mr, mr, 5, 7)
  if (o.mouth === 'big') carve(g, mr, mr + 1, 5, 7)

  const L: LegKey = o.legs || (sq ? 'stub' : 'stand')
  if (L === 'stand') {
    fill(g, 10, 10, 1, 2)
    fill(g, 10, 10, 4, 5)
    fill(g, 10, 10, 7, 8)
    fill(g, 10, 10, 10, 11)
  }
  if (L === 'stub') {
    fill(g, 11, 11, 1, 2)
    fill(g, 11, 11, 4, 5)
    fill(g, 11, 11, 7, 8)
    fill(g, 11, 11, 10, 11)
  }
  if (L === 'a') {
    fill(g, 10, 10, 1, 2)
    fill(g, 10, 10, 7, 8)
    fill(g, 11, 11, 4, 5)
    fill(g, 11, 11, 10, 11)
  }
  if (L === 'b') {
    fill(g, 10, 10, 4, 5)
    fill(g, 10, 10, 10, 11)
    fill(g, 11, 11, 1, 2)
    fill(g, 11, 11, 7, 8)
  }
  if (L === 'tuck') {
    fill(g, 10, 10, 4, 5)
    fill(g, 10, 10, 7, 8)
  }

  return g
}

/** Collapses the 12-row pixel grid into 6 rows of half-block characters. */
function art(g: Pixels, tex?: string): string[] {
  const out: string[] = []
  for (let cr = 0; cr < ROWS; cr++) {
    let s = ''
    for (let c = 0; c < W; c++) {
      const t = g[cr * 2][c]
      const b = g[cr * 2 + 1][c]
      s += tex ? (t || b ? tex : ' ') : t && b ? '█' : t ? '▀' : b ? '▄' : ' '
    }
    out.push(s)
  }
  return out
}

/** `'a'` = accent fx (♥ ✦ ! ● ♪), `'d'` = dim fx (··· z ◦) and the name tag. */
export type FxKind = 'a' | 'd'

export type Fx = { x: number; y: number; t: string; c: FxKind }

export type Frame = {
  art: string[]
  dx: number
  dy: number
  fx: Fx[]
}

type FrameOptions = { dx?: number; dy?: number; fx?: Fx[]; tex?: string }

function F(p: PoseOptions, x: FrameOptions = {}): Frame {
  return { art: art(pose(p), x.tex), dx: x.dx || 0, dy: x.dy || 0, fx: x.fx || [] }
}

function fx(x: number, y: number, t: string, c: FxKind = 'd'): Fx {
  return { x, y, t, c }
}

const EMPTY: Frame = {
  art: Array.from({ length: ROWS }, () => ' '.repeat(W)),
  dx: 0,
  dy: 0,
  fx: [],
}

/* ---------- the movement set ---------- */

export type AnimationTag = 'core' | 'react' | 'system'

export type Animation = {
  fps: number
  tag: AnimationTag
  /** Plays a single cycle and holds its last frame instead of looping. */
  once?: boolean
  /** Movement carries the sprite sideways; the dock tween reads this. */
  step?: number
  desc: string
  frames: Frame[]
}

// Preserves the key literals (so `AnimationName` is the union of movement
// names) while widening each value to `Animation` — otherwise the optional
// `once`/`step` fields vanish from the inferred type of the ones that omit them.
const set = <K extends string>(a: Record<K, Animation>) => a

export const ANIMATIONS = set({
  idle: { fps: 1.6, tag: 'core', desc: 'slow breathing — the default', frames: [F({}), F({ squash: true })] },
  blink: {
    fps: 6,
    tag: 'core',
    desc: 'every few seconds',
    frames: [F({}), F({}), F({}), F({}), F({ eyes: 'shut' })],
  },
  look: {
    fps: 2,
    tag: 'core',
    desc: 'checks both sides',
    frames: [
      F({}),
      F({ eyes: 'left' }),
      F({ eyes: 'left' }),
      F({}),
      F({ eyes: 'right' }),
      F({ eyes: 'right' }),
    ],
  },
  walk: {
    fps: 4,
    tag: 'core',
    step: 1,
    desc: 'trot; player slides him sideways',
    frames: [F({ legs: 'a' }), F({ legs: 'b' })],
  },
  hop: {
    fps: 8,
    tag: 'core',
    once: true,
    desc: 'crouch, air, land',
    frames: [
      F({ squash: true }),
      F({ legs: 'tuck' }, { dy: -1 }),
      F({ legs: 'tuck', eyes: 'happy' }, { dy: -2 }),
      F({ legs: 'tuck' }, { dy: -1 }),
      F({ squash: true }),
      F({}),
    ],
  },
  stretch: {
    fps: 2.5,
    tag: 'core',
    once: true,
    desc: 'full-height morning stretch',
    frames: [
      F({ squash: true, eyes: 'shut' }),
      F({}),
      F({ tall: true, ears: 'perk' }),
      F({ tall: true, ears: 'perk', eyes: 'shut' }),
      F({}),
    ],
  },
  wave: {
    fps: 3,
    tag: 'core',
    desc: 'ear semaphore hello',
    frames: [F({ ears: 'waveA', eyes: 'happy' }), F({ ears: 'waveB', eyes: 'happy' })],
  },
  turn: {
    fps: 2.5,
    tag: 'core',
    once: true,
    desc: 'checks behind himself',
    frames: [F({ eyes: 'right' }), F({ eyes: 'none' }), F({ eyes: 'none' }), F({ eyes: 'left' }), F({})],
  },
  dance: {
    fps: 4,
    tag: 'core',
    desc: 'side-step with music',
    frames: [
      F({ legs: 'a', ears: 'perk' }, { dx: -1, fx: [fx(14, 1, '♪')] }),
      F({ legs: 'b' }, { dx: 1, fx: [fx(15, 0, '♪')] }),
      F({ legs: 'a' }, { dx: 1, fx: [fx(-2, 1, '♪')] }),
      F({ legs: 'b', ears: 'perk' }, { dx: -1, fx: [fx(-3, 0, '♪')] }),
    ],
  },
  think: {
    fps: 2,
    tag: 'react',
    desc: 'eyes up, dots build',
    frames: [
      F({ eyes: 'up' }, { fx: [fx(14, 0, '·')] }),
      F({ eyes: 'up' }, { fx: [fx(14, 0, '··')] }),
      F({ eyes: 'up' }, { fx: [fx(14, 0, '···')] }),
    ],
  },
  happy: {
    fps: 5,
    tag: 'react',
    once: true,
    desc: 'small pop + !',
    frames: [
      F({ squash: true, eyes: 'happy' }),
      F({ eyes: 'happy', legs: 'tuck' }, { dy: -1, fx: [fx(6, -1, '!', 'a')] }),
      F({ eyes: 'happy' }, { fx: [fx(6, -1, '!', 'a')] }),
    ],
  },
  love: {
    fps: 2.5,
    tag: 'react',
    desc: 'hearts drift up',
    frames: [
      F({ eyes: 'happy' }, { fx: [fx(13, 1, '♥', 'a')] }),
      F({ eyes: 'happy' }, { fx: [fx(14, 0, '♥', 'a')] }),
      F({ eyes: 'happy' }, { fx: [fx(15, -1, '♥', 'a'), fx(13, 1, '♥', 'a')] }),
    ],
  },
  celebrate: {
    fps: 5,
    tag: 'react',
    desc: 'sparkle jump',
    frames: [
      F({ legs: 'tuck', eyes: 'happy' }, { dy: -1, fx: [fx(-2, 0, '✦', 'a'), fx(14, 2, '✧', 'a')] }),
      F({ eyes: 'happy' }, { fx: [fx(-1, -1, '✧', 'a'), fx(15, 0, '✦', 'a')] }),
      F({ legs: 'tuck', eyes: 'happy' }, { dy: -1, fx: [fx(-3, 2, '✧', 'a'), fx(16, -1, '✦', 'a')] }),
      F({ eyes: 'happy' }, { fx: [fx(-1, 1, '✦', 'a'), fx(14, 0, '✧', 'a')] }),
    ],
  },
  eat: {
    fps: 3,
    tag: 'react',
    once: true,
    desc: 'snack in, chomp, done',
    frames: [
      F({ eyes: 'right' }, { fx: [fx(15, 3, '●', 'a')] }),
      F({ eyes: 'right', mouth: 'open' }, { fx: [fx(14, 3, '●', 'a')] }),
      F({ mouth: 'big' }, { fx: [fx(6, 4, '●', 'a')] }),
      F({ squash: true, eyes: 'shut' }),
      F({ eyes: 'happy' }, { fx: [fx(13, 1, '♪')] }),
    ],
  },
  sad: {
    fps: 1.5,
    tag: 'react',
    desc: 'ears drop, eyes down',
    frames: [
      F({ ears: 'droop', eyes: 'down' }),
      F({ ears: 'droop', eyes: 'down', squash: true }, { fx: [fx(11, 2, '◦')] }),
    ],
  },
  error: {
    fps: 8,
    tag: 'react',
    once: true,
    desc: 'shake + !',
    frames: [
      F({ eyes: 'shut' }, { dx: -1, fx: [fx(14, 0, '!', 'a')] }),
      F({ eyes: 'shut' }, { dx: 1, fx: [fx(14, 0, '!', 'a')] }),
      F({}, { dx: -1, fx: [fx(14, 0, '!', 'a')] }),
      F({}, { dx: 1, fx: [fx(14, 0, '!', 'a')] }),
      F({ eyes: 'down' }),
    ],
  },
  sleep: {
    fps: 1.2,
    tag: 'system',
    desc: 'squashed, z drift — night + idle',
    frames: [
      F({ squash: true, eyes: 'shut' }, { fx: [fx(13, 1, 'z')] }),
      F({ squash: true, eyes: 'shut' }, { fx: [fx(14, 0, 'z')] }),
      F({ squash: true, eyes: 'shut' }, { fx: [fx(15, -1, 'Z'), fx(13, 1, 'z')] }),
    ],
  },
  poof: {
    fps: 5,
    tag: 'system',
    once: true,
    desc: 'materialise on session start',
    frames: [
      F({}, { tex: '░' }),
      F({}, { tex: '▒' }),
      F({}, { tex: '▓' }),
      F({}, { fx: [fx(0, -1, '✦', 'a'), fx(12, -1, '✦', 'a')] }),
    ],
  },
  vanish: {
    fps: 5,
    tag: 'system',
    once: true,
    desc: 'dissolve on session end',
    frames: [F({}), F({}, { tex: '▓' }), F({}, { tex: '▒' }), F({}, { tex: '░' }), EMPTY],
  },
})

export type AnimationName = keyof typeof ANIMATIONS

export const ANIMATION_NAMES = Object.keys(ANIMATIONS) as AnimationName[]

export function isAnimationName(value: string): value is AnimationName {
  return Object.prototype.hasOwnProperty.call(ANIMATIONS, value)
}

/**
 * Event -> movement queue. The first ten keys are the spec's Claude Code events,
 * kept verbatim so `docs/niko-frames.js` stays the source of truth for them. The
 * rest are the site's own events, added rather than substituted so the two maps
 * can be diffed against each other.
 */
export const EVENTS = {
  // --- the spec's ten, unchanged ---
  start: ['poof', 'wave'],
  think: ['think'],
  tool: ['walk'],
  work: ['walk'],
  done: ['celebrate', 'happy'],
  error: ['error', 'sad'],
  pet: ['love'],
  snack: ['eat'],
  sleep: ['sleep'],
  bye: ['vanish'],

  // --- the site's ---
  /** Route change: he travels while the curtain sweeps. */
  route: ['walk'],
  /** Command bar answered. */
  answered: ['happy'],
  /** Theme flipped: a blink at the light change, then a look around. */
  theme: ['blink', 'look'],
  /** Résumé download, external link. */
  farewell: ['wave'],
  /** A dead end — a 404, an empty result. */
  deadEnd: ['sad'],
  /** Easter eggs from the command bar. */
  dance: ['dance'],
  hop: ['hop'],
} satisfies Record<string, AnimationName[]>

export type NikoEventName = keyof typeof EVENTS

export const AMBIENT: AnimationName[] = [
  'idle',
  'idle',
  'blink',
  'idle',
  'look',
  'walk',
  'idle',
  'stretch',
  'blink',
  'turn',
  'idle',
  'dance',
]

/* ---------- compositor: sprite + fx + name tag onto a w x h char canvas ---------- */

/** `b` body, `a` accent fx, `d` dim fx and name tag. */
export type CellKind = 'b' | 'a' | 'd'

export type Cell = { ch: string; k: CellKind } | null

export type Grid = Cell[][]

export type ComposeOptions = {
  w?: number
  h?: number
  /** Pass `''` to omit the ground+1 name tag. Defaults to `NIKO`. */
  name?: string
  ground?: number
  ox?: number
}

export function compose(frame: Frame, o: ComposeOptions = {}): Grid {
  const w = o.w || CANVAS_W
  const h = o.h || CANVAS_H
  const tag = o.name === undefined ? 'NIKO' : o.name
  const ground = o.ground === undefined ? h - 2 : o.ground
  const ox = (o.ox === undefined ? Math.floor((w - W) / 2) : o.ox) + frame.dx
  const oy = ground - (ROWS - 1) + frame.dy

  const grid: Grid = Array.from({ length: h }, () => new Array<Cell>(w).fill(null))

  const set = (r: number, c: number, ch: string, k: CellKind) => {
    if (r >= 0 && r < h && c >= 0 && c < w && ch !== ' ') grid[r][c] = { ch, k }
  }

  frame.art.forEach((line, ri) => {
    for (let ci = 0; ci < line.length; ci++) set(oy + ri, ox + ci, line[ci], 'b')
  })

  frame.fx.forEach((f) => {
    const s = String(f.t)
    for (let i = 0; i < s.length; i++) set(oy + f.y, ox + f.x + i, s[i], f.c === 'a' ? 'a' : 'd')
  })

  if (tag) {
    const lx = ox + Math.floor((W - tag.length) / 2)
    for (let i = 0; i < tag.length; i++) set(ground + 1, lx + i, tag[i], 'd')
  }

  return grid
}

/** Runs of same-kind cells, so one row paints as a handful of spans, not 21. */
export type Run = { text: string; kind: CellKind | null }

export function runs(row: Cell[]): Run[] {
  const out: Run[] = []
  let current: Run | null = null
  for (const cell of row) {
    const kind = cell ? cell.k : null
    const ch = cell ? cell.ch : ' '
    if (!current || current.kind !== kind) {
      current = { text: ch, kind }
      out.push(current)
    } else {
      current.text += ch
    }
  }
  return out
}

/** Plain-text render — used by tests and the debug panel. */
export function toText(grid: Grid, trim = false): string {
  return grid
    .map((row) => {
      const s = row.map((c) => (c ? c.ch : ' ')).join('')
      return trim ? s.replace(/\s+$/, '') : s
    })
    .join('\n')
}
