import { site } from '../../data/site'
import { testimonials } from '../../data/testimonials'
import { Band } from '../layout/Band'
import { Halftone } from '../ui/Halftone'
import award from '../../assets/award.png?w=640;1280&format=avif;webp&as=picture'

export function Recognition() {
  return (
    <Band id="recognition" tone="light">
      <div className="wrap">
        <div className="head">
          <h2 className="h2">Recognition</h2>
          <p>From the people who use the systems every day.</p>
        </div>
        <div className="recog">
          <figure>
            <Halftone
              source={award}
              alt={`Certificate and plaque for the ${site.award.title}`}
              sizes="(max-width: 960px) 100vw, 560px"
            />
            <figcaption className="ui"><span>{site.award.title}</span><span className="soft">{site.org}</span></figcaption>
          </figure>
          <div>
            {testimonials.map((t) => (
              <blockquote key={t.name}>
                <p>“{t.quote}”</p>
                <span className="ui soft">{t.name}, {t.position}</span>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </Band>
  )
}
