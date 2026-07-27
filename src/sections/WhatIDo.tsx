import { Reveal } from '../components/Reveal'
import { aboutBlocks } from '../data/site'

// The three blocks that carry points. Two columns across the full pane width
// (~435px each) rather than one column capped at 62ch (521px): the narrower
// measure costs a little extra wrapping, and halves the stack height.
const DETAILED = aboutBlocks.filter((block) => block.points?.length)

export function WhatIDo() {
  return (
    <div className="grid gap-x-6 gap-y-4 lg:grid-cols-2">
      {DETAILED.map((block, index) => (
        <Reveal key={block.label} delay={index * 0.04}>
          <p className="label">{block.label}</p>
          <p className="prose-body mt-1 text-[13px]">{block.body}</p>
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
