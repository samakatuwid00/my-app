import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fontsource-variable/antonio'
import '@fontsource/barlow-condensed/500.css'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App'
import { AskProvider } from './components/AskProvider'
import { appRoutes } from './routes/AppRoutes'

// A data router, not <BrowserRouter>: only RouterProvider honours <Link viewTransition>
// (wrapping the navigation in document.startViewTransition) and provides
// useViewTransitionState. App is the layout; the pages render into its <Outlet />.
const router = createBrowserRouter([
  {
    path: '/',
    children: appRoutes,
    element: (
      <AskProvider>
        <App />
      </AskProvider>
    ),
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
