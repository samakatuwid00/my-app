import { ViewShell } from '../components/ViewShell'
import { BackButton } from '../components/ui/BackButton'
import { Contact } from '../sections/Contact'

export function ContactView() {
  return (
    <ViewShell>
      <BackButton to="/about" label="back to about" className="mb-2" />
      <Contact />
    </ViewShell>
  )
}
