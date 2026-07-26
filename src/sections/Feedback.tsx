import { Prompt } from '../components/ui/Prompt'
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
      <Prompt command="cat feedback/*" />

      <Reveal>
        <h2 className="max-w-[42ch] text-base font-semibold leading-snug text-text">
          {site.feedback.heading}
        </h2>
      </Reveal>

      {/* Column count follows the quote count, so removing one does not leave a
          hole in the row. */}
      <div className={`mt-6 grid gap-4 ${testimonials.length > 2 ? 'lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.04} className="h-full" dissolve>
            <figure className="flex h-full flex-col rounded-panel border border-line bg-panel p-4">
              <blockquote className="prose-body text-[13px] leading-relaxed">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-3">
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-panel border border-line text-[11px] text-text-3"
                >
                  {initialsOf(testimonial.name)}
                </span>
                <span>
                  <span className="block text-[13px] text-text">{testimonial.name}</span>
                  <span className="label">{testimonial.position}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </>
  )
}
