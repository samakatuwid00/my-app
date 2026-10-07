import { Link } from 'react-router-dom'

// Opens a project's case study; the screenshot named by useCarriedShot travels with it.
export function CaseStudyLink({ slug, className = 'btn line' }: { slug: string; className?: string }) {
  return (
    <Link className={className} to={`/work/${slug}`} viewTransition data-shot={slug}>
      Case study
    </Link>
  )
}
