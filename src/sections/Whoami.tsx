import { Link } from 'react-router-dom'
import { ActionLink } from '../components/ui/ActionLink'
import { Picture } from '../components/ui/Picture'
import { Reveal } from '../components/Reveal'
import { Education } from './Education'
import { aboutBlocks, GITHUB_HANDLE, site } from '../data/site'
import { stats } from '../data/stats'
// 240px is the frame's widest rendered size, 480 covers 2×. The key frame is the
// LCP element on /about; the blink frame is decoration and is loaded lazily so
// it cannot compete for the first paint.
import profilePhoto from '../assets/pic.jpg?w=240;480&format=avif;webp&as=picture'
import profilePhotoBlink from '../assets/blink.jpg?w=240;480&format=avif;webp&as=picture'
import resumeUrl from '../assets/full.pdf'

const CAPTION_ROWS = [
  { label: 'GitHub', value: GITHUB_HANDLE },
  { label: 'Degree', value: 'BSIT, Cum Laude' },
  { label: 'Base', value: 'Camarines Sur, PH' },
]

// The blocks with no points — the standfirst. The rest carry the evidence and
// live on the `what I do` tab, routed by shape rather than by index so
// reordering aboutBlocks cannot silently move copy between tabs.
const LEAD_BLOCKS = aboutBlocks.filter((block) => !block.points?.length)

export function Whoami() {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[1fr_220px] lg:items-start">
        <Reveal>
          {/* The name and role moved to AboutHeader — they sit above the tab bar
              now and stay put while the panels swap, so repeating them here
              would print them twice on this tab and nowhere on the others. */}
          <div className="flex max-w-[62ch] flex-col gap-3.5">
            {LEAD_BLOCKS.map((block) => (
              <div key={block.label}>
                <p className="label">{block.label}</p>
                <p className="prose-body mt-1">{block.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
            <ActionLink as={Link} to="/projects">
              view projects
            </ActionLink>
            <ActionLink href={resumeUrl} download="Roger-Abay-Resume.pdf">
              download resume
            </ActionLink>
          </div>

          {/* Stacking these under the photo was tried and reverted: four rows of
              label-over-value ran 241px and made the photo column the tallest
              thing on the view. Four across the text column costs 75px. */}
          {/* One column on a phone. Two columns at 375px wrapped the longer
              labels onto a second line while their neighbours stayed on one, so
              the values below them never lined up — the ragged edge read as a
              typography problem when it was a wrapping one. */}
          <dl className="mt-5 grid grid-cols-1 gap-x-4 gap-y-3 border-t border-line pt-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="label">{stat.label}</dt>
                <dd className="mt-0.5 text-[13px] text-text">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Capped and centred below lg. The frame is a square, so in the stacked
            single-column layout it took the full 375px of a phone and pushed the
            education block a screen down; 240px is the desktop column width, so
            nothing new is introduced. */}
        <Reveal
          delay={0.04}
          className="mx-auto w-full max-w-60 rounded-panel border border-line bg-panel p-1 lg:mx-0 lg:max-w-none"
          dissolve
        >
          <div className="photo-frame relative aspect-square w-full overflow-hidden rounded-[3px]">
            <div className="photo-stack absolute inset-0">
              <Picture
                source={profilePhoto}
                alt={`${site.name}, full-stack developer`}
                sizes="240px"
                loading="eager"
                fetchPriority="high"
                className="photo-key absolute inset-0 h-full w-full object-cover object-center"
              />
              <Picture
                source={profilePhotoBlink}
                alt=""
                hidden
                sizes="240px"
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

      <Education />

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
