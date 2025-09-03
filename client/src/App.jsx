import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import Home from './pages/Home.jsx'
import Courses from './pages/Courses.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import LessonPlayer from './pages/LessonPlayer.jsx'
import Community from './pages/Community.jsx'
import Dashboard from './pages/Dashboard.jsx'
function RequireAuth({ children }) {
  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('edu_token') : null
  if (!raw) {
    // store intent
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('post_login_redirect', '/dashboard')
    // soft redirect by rendering Home; modal will be triggered by layout when state is set
    window.history.pushState({}, '', '/')
    const event = new Event('open-login-modal')
    window.dispatchEvent(event)
    return <Home />
  }
  return children
}
import NotFound from './pages/NotFound.jsx'
import { AppProvider } from './contexts/AppContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPlayer />} />
              <Route path="/community" element={<Community />} />
              <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  )
}

export default App
