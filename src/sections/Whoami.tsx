import { Link } from 'react-router-dom'
import { Prompt } from '../components/ui/Prompt'
import { ActionLink } from '../components/ui/ActionLink'
import { Reveal } from '../components/Reveal'
import { GITHUB_HANDLE, site } from '../data/site'
import { stats } from '../data/stats'
import profilePhoto from '../assets/pic.jpg'
import profilePhotoBlink from '../assets/blink.jpg'
import resumeUrl from '../assets/Resume.pdf?url'

const CAPTION_ROWS = [
  { label: 'GitHub', value: GITHUB_HANDLE },
  { label: 'Degree', value: 'BSIT, Cum Laude' },
  { label: 'Base', value: 'Camarines Sur, PH' },
]

export function Whoami() {
  return (
    <>
      <Prompt command="whoami" />

      <div className="grid gap-6 lg:grid-cols-[1fr_220px] lg:items-start">
        <Reveal>
          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold uppercase leading-[1.1] tracking-[0.08em] text-text">
            {site.name}
          </h1>
          <p className="mt-1.5 text-base text-accent-2">{site.role}_</p>
          <p className="prose-body mt-4 max-w-[62ch] text-[13px]">{site.intro}</p>

          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
            <ActionLink as={Link} to="/projects">
              view projects
            </ActionLink>
            <ActionLink href={resumeUrl} download="Roger-Abay-Resume.pdf">
              download resume
            </ActionLink>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="label">{stat.label}</dt>
                <dd className="mt-0.5 text-[13px] text-text">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.04} className="rounded-panel border border-line bg-panel p-1" dissolve>
          <div className="photo-frame relative aspect-square w-full overflow-hidden rounded-[3px]">
            <div className="photo-stack absolute inset-0">
              <img
                src={profilePhoto}
                alt={`${site.name}, full-stack developer`}
                className="photo-key absolute inset-0 h-full w-full object-cover object-center"
              />
              <img
                src={profilePhotoBlink}
                alt=""
                aria-hidden="true"
                className="photo-key photo-blink absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <dl className="flex flex-col gap-1 px-2.5 py-2">
            {CAPTION_ROWS.map((row) => (
              <div key={row.label} className="flex gap-2 text-[11px]">
                <dt className="w-12 shrink-0 uppercase tracking-[0.08em] text-text-3">{row.label}</dt>
                <dd className="truncate text-text-2">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Keys the studio-white backdrop out of the portraits. Alpha is driven by
          mean channel value: everything above 0.94 (the sweep sits at 0.99+)
          goes transparent, everything below (the subject peaks at 0.83) stays
          fully opaque. sRGB interpolation keeps those numbers meaningful.

          The threshold sits well under the sweep and the slope is deliberately
          shallow: the boundary pixels are subject-and-sweep blends, so a tight
          cut leaves them opaque and they read as a bright rim around the
          silhouette. 0.94/14 pulls that rim into the ramp and fades it out over
          ~0.07 of tonal range instead of snapping, which is what turns the
          cut-out edge into a soft one. */}
      <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0">
        <filter id="photo-key-white" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -0.3333 -0.3333 -0.3333 0 0.94"
          />
          <feComponentTransfer>
            <feFuncA type="linear" slope="14" intercept="0" />
          </feComponentTransfer>
        </filter>
      </svg>
    </>
  )
}
