import { useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectDetail } from '../components/ProjectDetail'
import { Reveal } from '../components/Reveal'
import { projects } from '../data/projects'
import type { Project } from '../types/portfolio'

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <>
      {/* The section's own `$ ls projects` line moved up to ProjectsView as one
          prompt for the whole view — the tab bar names this panel now. */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.04} className="h-full" dissolve>
            <ProjectCard project={project} index={index} onOpen={() => setSelected(project)} />
          </Reveal>
        ))}
      </div>

      <ProjectDetail project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
