import { Outlet } from 'react-router-dom'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { ScrollToHash } from './components/layout/ScrollToHash'

export default function App() {
  return (
    <>
      <SiteHeader />
      <ScrollToHash />
      <Outlet />
      <SiteFooter />
    </>
  )
}
