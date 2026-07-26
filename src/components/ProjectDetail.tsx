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

  const caseStudy = [
    { term: 'Problem', body: project?.problem },
    { term: 'Approach', body: project?.approach },
    { term: 'Result', body: project?.outcome },
  ].filter((entry) => Boolean(entry.body))

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
            {(project.sector || !!project.capabilities?.length) && (
              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                {project.sector && <span className="label">{project.sector}</span>}
                {project.capabilities?.map((capability) => (
                  <Tag key={capability} variant="meta">
                    {capability}
                  </Tag>
                ))}
              </div>
            )}

            <p className="prose-body text-sm">{project.description}</p>

            {/* Problem → approach → result. Rendered per field, so a project with
                only some of the copy confirmed shows what exists and no empty
                headings. `metrics` is empty on every project today and renders
                nothing until real numbers are cleared for publication. */}
            {caseStudy.length > 0 && (
              <dl className="mt-6 flex flex-col gap-3 border-t border-line pt-4">
                {caseStudy.map((entry) => (
                  <div key={entry.term}>
                    <dt className="label">{entry.term}</dt>
                    <dd className="prose-body mt-1 text-sm">{entry.body}</dd>
                  </div>
                ))}
              </dl>
            )}

            {project.metrics && project.metrics.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.metrics.map((metric) => (
                  <li key={metric}>
                    <Tag>{metric}</Tag>
                  </li>
                ))}
              </ul>
            )}

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
