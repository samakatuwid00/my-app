import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { ScrollToHash } from './components/layout/ScrollToHash'
import { AppRoutes } from './routes/AppRoutes'

export default function App() {
  return (
    <>
      <SiteHeader />
      <ScrollToHash />
      <AppRoutes />
      <SiteFooter />
    </>
  )
}
