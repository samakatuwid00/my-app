import type { Project } from '../types/portfolio'

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

      <p className="prose-body mt-3 line-clamp-3 text-[13px]">{project.description}</p>

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
