import { ExternalLink } from 'lucide-react'
import { Modal } from './Modal'
import { Tag } from './ui/Tag'
import type { Project } from '../types/portfolio'

type ProjectDetailProps = {
  project: Project | null
  onClose: () => void
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const isLive = project?.status === 'live' && Boolean(project.liveUrl)

  return (
    <Modal
      isOpen={project !== null}
      onClose={onClose}
      title={project?.title ?? ''}
      footer={
        isLive ? (
          <a
            href={project?.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-accent transition-colors duration-200 hover:text-text"
          >
            <span aria-hidden="true">&gt;</span>
            <span className="underline-offset-4 group-hover:underline">open {project?.title}</span>
            <ExternalLink size={13} />
          </a>
        ) : (
          <p className="label">Internal system — no public demo</p>
        )
      }
    >
      {project && (
        <>
          <img
            src={project.previewImage}
            alt={`${project.title} interface preview`}
            className="w-full border-b border-line bg-surface object-cover"
          />

          <div className="p-5">
            <p className="prose-body text-sm">{project.description}</p>

            <p className="label mt-6 mb-2">Features</p>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-xs text-text-2">
                  <span aria-hidden="true" className="text-accent">
                    ·
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <p className="label mt-6 mb-2">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <Tag key={technology}>{technology}</Tag>
              ))}
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}
