import { Tag } from './ui/Tag'
import type { Project } from '../types/portfolio'

// The grid itself ships no image bytes — the previews live in the detail modal.
// Hover and keyboard focus are the earliest honest signals of intent, so the
// preview is warmed then and the modal opens against a filled cache.
//
// Module-level, so a visitor sweeping the mouse across five cards pays for each
// preview once per session rather than once per hover.
const warmed = new Set<string>()

function prefetchPreview(project: Project) {
  if (warmed.has(project.title)) return
  // Respects the OS/browser data saver: someone who has asked for fewer bytes
  // should not be spending them on a modal they have not opened.
  const connection = (navigator as { connection?: { saveData?: boolean } }).connection
  if (connection?.saveData) return

  warmed.add(project.title)
  const image = new Image()
  // The mid candidate, not the largest: enough to paint the modal immediately at
  // laptop width, and the browser upgrades from srcset if the screen wants more.
  image.sizes = '(max-width: 640px) 100vw, 900px'
  image.srcset = project.previewImage.sources.avif ?? project.previewImage.sources.webp ?? ''
  image.src = project.previewImage.img.src
}

type ProjectCardProps = {
  project: Project
  index: number
  onOpen: () => void
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const Icon = project.icon

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => prefetchPreview(project)}
      onFocus={() => prefetchPreview(project)}
      aria-label={`View ${project.title} details`}
      className="group flex h-full w-full flex-col rounded-panel border border-line bg-panel p-4 text-left transition-colors duration-200 hover:border-line-strong"
    >
      <div className="flex w-full items-center gap-3">
        <span className="text-xs text-text-3">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="text-lg font-semibold text-text">{project.title}</h3>
        <span className="ml-auto grid size-7 shrink-0 place-items-center rounded-panel border border-line text-text-3">
          <Icon size={14} />
        </span>
      </div>

      {/* The problem, not the feature list: a prospect recognises their own
          situation faster than they recognise a system category. Falls back to
          the description for any project without case-study copy. */}
      <p className="prose-body mt-3 line-clamp-3">{project.problem ?? project.description}</p>

      {/* Spans, not a ul — a button accepts phrasing content only, and this whole
          card is one. `!!…length` rather than a bare array: an empty array is
          truthy and would render an empty row of margin, and a bare `.length`
          would render the number 0. */}
      {!!project.capabilities?.length && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.capabilities.map((capability) => (
            <Tag key={capability} variant="meta">
              {capability}
            </Tag>
          ))}
        </div>
      )}

      <div className="mt-auto w-full pt-4">
        <span className="mb-3 block h-px w-full bg-line" />
        <span className="inline-flex items-center gap-2 text-sm text-accent">
          <span aria-hidden="true">&gt;</span>
          <span className="underline-offset-4 group-hover:underline">view</span>
        </span>
      </div>
    </button>
  )
}
