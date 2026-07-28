import { Reveal } from '../components/Reveal'
import { aboutBlocks } from '../data/site'

// The three blocks that carry points. Two columns across the full pane width
// (~435px each) rather than one column capped at 62ch (521px): the narrower
// measure costs a little extra wrapping, and halves the stack height.
const DETAILED = aboutBlocks.filter((block) => block.points?.length)

// An odd count leaves the last block alone on the second row at half width,
// where it wraps to the same height as the two above it. Spanning it across both
// columns costs nothing at 1200 and took ~80px off this panel at 1024, where the
// view was overflowing.
const SPANS_LAST_ROW = DETAILED.length % 2 === 1

export function WhatIDo() {
  return (
    <div className="grid gap-x-6 gap-y-4 lg:grid-cols-2">
      {DETAILED.map((block, index) => (
        <Reveal
          key={block.label}
          delay={index * 0.04}
          className={SPANS_LAST_ROW && index === DETAILED.length - 1 ? 'lg:col-span-2' : undefined}
        >
          <p className="label">{block.label}</p>
          <p className="prose-body mt-1">{block.body}</p>
          <ul className="mt-1 flex flex-col gap-0.5">
            {block.points?.map((point) => (
              <li key={point.term} className="flex gap-2 text-[13px] leading-snug">
                <span aria-hidden="true" className="shrink-0 text-accent">
                  +
                </span>
                <span>
                  <span className="text-text-2">{point.term}</span>
                  <span className="prose-body"> — {point.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}
