import { ViewShell } from '../components/ViewShell'
import { Awards } from '../sections/Awards'
import { Feedback } from '../sections/Feedback'

export function FeedbackView() {
  return (
    <ViewShell>
      <Feedback />
      <div className="mt-8 border-t border-line pt-7">
        <Awards />
      </div>
    </ViewShell>
  )
}
