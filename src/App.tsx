import { BrowserRouter } from 'react-router-dom'
import { ShellLayout } from './layouts/ShellLayout'
import { AppRoutes } from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <ShellLayout>
        <AppRoutes />
      </ShellLayout>
    </BrowserRouter>
  )
}
