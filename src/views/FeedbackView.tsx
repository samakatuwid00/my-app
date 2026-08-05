import { Link } from 'react-router-dom'
import { ViewShell } from '../components/ViewShell'
import { ActionLink } from '../components/ui/ActionLink'
import { BackButton } from '../components/ui/BackButton'
import { Prompt } from '../components/ui/Prompt'
import { Awards } from '../sections/Awards'
import { Feedback } from '../sections/Feedback'

// One column, three sections, no tab bar. /about and /projects split because
// their content does not fit a pane; this one does, so the sections are just
// ruled off from each other and read top to bottom in the sales order — what
// other people say, what you can buy, the award behind it.
//
// The exit is the part worth keeping from the pager: without it /feedback is a
// dead end, and the path about → projects → feedback → contact stops one step
// short of the only page that asks for the enquiry.
export function FeedbackView() {
  return (
    <ViewShell>
      <BackButton to="/projects" label="back to projects" className="mb-2" />
      <Prompt command="cat feedback/*" className="mb-2" />

      <Feedback />

      <div className="mt-3 border-t border-line pt-2">
        <Awards />
      </div>

      {/* No dot row and no "section n of 3": there is nothing to page through
          here, and a counter that counts sections a visitor is already scrolling
          past would be theater. A real Link, so it middle-clicks and lands in
          history like the pagers do. */}
      <nav
        aria-label="Next step"
        className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-1"
      >
        <span className="label">Ready to start?</span>
        <ActionLink as={Link} to="/contact" className="ml-auto">
          get in touch
        </ActionLink>
      </nav>
    </ViewShell>
  )
}
