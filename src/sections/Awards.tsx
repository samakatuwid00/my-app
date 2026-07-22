import { useState } from 'react'
import { ZoomIn } from 'lucide-react'
import { Prompt } from '../components/ui/Prompt'
import { Modal } from '../components/Modal'
import { Reveal } from '../components/Reveal'
import { site } from '../data/site'
import awardPhoto from '../assets/award.png'

const AWARD_ALT = 'Full Stack Developer award plaque'

export function Awards() {
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  return (
    <>
      <Prompt command="ls awards/" />

      <Reveal>
        <button
          type="button"
          onClick={() => setIsDetailOpen(true)}
          aria-label={`Enlarge ${AWARD_ALT}`}
          className="group flex w-full max-w-lg items-center gap-4 rounded-panel border border-line bg-panel p-3 text-left transition-colors duration-200 hover:border-line-strong"
        >
          <span className="relative w-32 shrink-0 overflow-hidden rounded-[3px]">
            <img src={awardPhoto} alt={AWARD_ALT} className="aspect-video w-full bg-surface object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-canvas/0 transition-colors duration-200 group-hover:bg-canvas/40">
              <ZoomIn size={15} className="text-text opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </span>
          </span>

          <span className="min-w-0">
            <span className="label">{site.award.label}</span>
            <span className="mt-0.5 block text-sm text-text">{site.award.title}</span>
            <span className="mt-0.5 block text-xs text-text-3">{site.award.caption}</span>
          </span>
        </button>
      </Reveal>

      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={site.award.title}
        footer={<p className="text-xs text-text-3">{site.award.caption}</p>}
      >
        <img src={awardPhoto} alt={AWARD_ALT} className="max-h-[70vh] w-full bg-surface object-contain" />
      </Modal>
    </>
  )
}
