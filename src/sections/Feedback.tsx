import { Reveal } from '../components/Reveal'
import { site } from '../data/site'
import { testimonials } from '../data/testimonials'

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
}

export function Feedback() {
  return (
    <>
      {/* `$ cat feedback/*` is the view's one prompt now, rendered above the tab
          bar in FeedbackView — the bar names this panel. */}
      <Reveal>
        {/* 64ch, not 42: the heading is 43 characters, so the tighter measure
            wrapped it to two lines and cost 22px on a view that needed 11. It is
            still a bounded measure, not a full-width line. */}
        <h2 className="max-w-[64ch] text-base font-semibold leading-snug text-text">
          {site.feedback.heading}
        </h2>
      </Reveal>

      {/* Column count follows the quote count, so removing one does not leave a
          hole in the row. */}
      <div className={`mt-3 grid gap-3 ${testimonials.length > 2 ? 'lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.04} className="h-full" dissolve>
            <figure className="flex h-full flex-col rounded-panel border border-line bg-panel p-2">
              {/* The quote takes the slack so every card's attribution sits on
                  the floor of its cell. Quotes run two to four lines, and with
                  the caption following the text directly the three names landed
                  at three different heights across the row. */}
              <div className="flex-1">
                <blockquote className="prose-body leading-relaxed">“{testimonial.quote}”</blockquote>

                {/* Provenance belongs to the quote, not to the person: it says
                    which document these words come from, so the quotation marks
                    above are not read as speech. Keeping it here also leaves
                    every attribution exactly two lines tall, which is what lets
                    the names line up. */}
                {testimonial.source && (
                  <cite className="label mt-1.5 block not-italic text-text-3">{testimonial.source}</cite>
                )}
              </div>

              {/* Fixed height and top-aligned, so the rule and the name sit at the
                  same y in every card of the row. Bottom-anchoring alone was not
                  enough: a position that wraps to two lines — "Regional Director,
                  DepEd Region V" at this column width — makes its caption taller
                  and lifts its rule 17px above the others, measured. 64px covers
                  a two-line position; a three-line one would lift the rule again
                  without anything failing, so check the row if a longer title
                  lands here. */}
              <figcaption className="mt-3 flex min-h-16 items-start gap-3 border-t border-line pt-2">
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-panel border border-line text-[11px] text-text-3"
                >
                  {initialsOf(testimonial.name)}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] text-text">{testimonial.name}</span>
                  <span className="label block">{testimonial.position}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </>
  )
}
