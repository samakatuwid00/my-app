import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ShellLayout } from './layouts/ShellLayout'
import { AskProvider } from './components/AskProvider'
import { AboutView } from './views/AboutView'
import { ContactView } from './views/ContactView'
import { FeedbackView } from './views/FeedbackView'
import { ProjectsView } from './views/ProjectsView'

export default function App() {
  return (
    <BrowserRouter>
      <AskProvider>
        <Routes>
          <Route element={<ShellLayout />}>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/projects" element={<ProjectsView />} />
            <Route path="/feedback" element={<FeedbackView />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/history" element={<Navigate to="/about" replace />} />
            <Route path="/stack" element={<Navigate to="/projects" replace />} />
            <Route path="/awards" element={<Navigate to="/feedback" replace />} />
            <Route path="*" element={<Navigate to="/about" replace />} />
          </Route>
        </Routes>
      </AskProvider>
    </BrowserRouter>
  )
}
