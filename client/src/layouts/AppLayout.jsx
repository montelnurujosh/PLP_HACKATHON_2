import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useState } from 'react'
import AuthModal from '../ui/AuthModal.jsx'

function AppLayout() {
  const { theme, setTheme, increaseFont, decreaseFont } = useApp()
  const { user, login, signup, logout } = useAuth()
  const [authMode, setAuthMode] = useState(null)
  const navigate = useNavigate()

  // allow global trigger to open login modal (used by RequireAuth)
  if (typeof window !== 'undefined') {
    window.addEventListener('open-login-modal', () => setAuthMode('login'))
  }
  return (
    <div className="app-container">
      <header className="header">
        <nav className="nav">
          <NavLink to="/" className="nav-link">EduConnect</NavLink>
          <div className="nav-right">
            <NavLink to="/courses" className="nav-link">Courses</NavLink>
            <NavLink to="/community" className="nav-link">Community</NavLink>
            {user ? <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink> : null}
            {user ? (
              <>
                <span className="tag" aria-label="Current user">{user.name}</span>
                <button className="tag" onClick={() => { logout(); navigate('/') }}>Logout</button>
              </>
            ) : (
              <>
                <button className="tag" onClick={() => setAuthMode('login')}>Log in</button>
                <button className="tag" onClick={() => setAuthMode('signup')}>Sign up</button>
              </>
            )}
            <div className="nav-controls" aria-label="Accessibility controls">
              <button className="tag" onClick={decreaseFont} aria-label="Decrease font size">A-</button>
              <button className="tag" onClick={increaseFont} aria-label="Increase font size">A+</button>
              <select
                aria-label="Theme selector"
                className="tag"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">© {new Date().getFullYear()} EduConnect • SDG 4</footer>
      {authMode ? (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onLogin={login}
          onSignup={signup}
        />
      ) : null}
    </div>
  )
}

export default AppLayout


