import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AboutView } from '../views/AboutView'
import { ContactView } from '../views/ContactView'
import { FeedbackView } from '../views/FeedbackView'
import { ProjectsView } from '../views/ProjectsView'

export function AppRoutes() {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route path="/" element={<Navigate to="/about" replace />} />
      <Route path="/about" element={<AboutView />} />
      <Route path="/projects" element={<ProjectsView />} />
      <Route path="/feedback" element={<FeedbackView />} />
      <Route path="/contact" element={<ContactView />} />

      {/* retired paths from the seven-view build — keep bookmarks working */}
      <Route path="/history" element={<Navigate to="/about" replace />} />
      <Route path="/stack" element={<Navigate to="/projects" replace />} />
      <Route path="/awards" element={<Navigate to="/feedback" replace />} />

      <Route path="*" element={<Navigate to="/about" replace />} />
    </Routes>
  )
}
