import { useState } from 'react'
import { ZoomIn } from 'lucide-react'
import { Modal } from '../components/Modal'
import { Picture } from '../components/ui/Picture'
import { Reveal } from '../components/Reveal'
import { site } from '../data/site'
// The same source at two sizes. The card slot is 96 CSS px wide, so it was
// spending 2MB on roughly 8KB worth of pixels; the modal is the only place the
// plaque is read, and 1600px covers a 2× full-screen view of it.
import awardThumb from '../assets/award.png?w=192;384&format=avif;webp&as=picture'
import awardPhoto from '../assets/award.png?w=1024;1600&format=avif;webp&as=picture'

const AWARD_ALT = 'Full Stack Developer award plaque'

export function Awards() {
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  return (
    <>
      {/* No `$ ls awards/` line: one prompt per view, and the tab bar above
          already names this section. */}
      <Reveal>
        <button
          type="button"
          onClick={() => setIsDetailOpen(true)}
          aria-label={`Enlarge ${AWARD_ALT}`}
          className="group flex w-full max-w-lg items-center gap-4 rounded-panel border border-line bg-panel p-2.5 text-left transition-colors duration-200 hover:border-line-strong"
        >
          <span className="relative w-24 shrink-0 overflow-hidden rounded-[3px]">
            <Picture
              source={awardThumb}
              alt={AWARD_ALT}
              sizes="96px"
              className="aspect-video w-full bg-surface object-cover"
            />
            <span className="absolute inset-0 grid place-items-center bg-canvas/0 transition-colors duration-200 group-hover:bg-canvas/40">
              <ZoomIn size={15} className="text-text opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </span>
          </span>

          <span className="min-w-0">
            <span className="label">{site.award.label}</span>
            <span className="mt-0.5 block text-sm text-text">{site.award.title}</span>
            <span className="mt-0.5 block text-[13px] text-text-3">{site.award.caption}</span>
          </span>
        </button>
      </Reveal>

      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={site.award.title}
        footer={<p className="text-xs text-text-3">{site.award.caption}</p>}
      >
        <Picture
          source={awardPhoto}
          alt={AWARD_ALT}
          sizes="(max-width: 640px) 100vw, 900px"
          className="max-h-[70vh] w-full bg-surface object-contain"
        />
      </Modal>
    </>
  )
}
