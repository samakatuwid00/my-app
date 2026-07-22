import { ViewShell } from '../components/ViewShell'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'

export function ProjectsView() {
  return (
    <ViewShell>
      <Projects />
      <div className="mt-8 border-t border-line pt-7">
        <Skills />
      </div>
    </ViewShell>
  )
}
