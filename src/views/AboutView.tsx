import { ViewShell } from '../components/ViewShell'
import { History } from '../sections/History'
import { Whoami } from '../sections/Whoami'

export function AboutView() {
  return (
    <ViewShell>
      <Whoami />
      <div className="mt-8 border-t border-line pt-7">
        <History />
      </div>
    </ViewShell>
  )
}
