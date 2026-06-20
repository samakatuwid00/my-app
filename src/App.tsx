import { BrowserRouter } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <SiteLayout>
        <AppRoutes />
      </SiteLayout>
    </BrowserRouter>
  )
}

export default App
