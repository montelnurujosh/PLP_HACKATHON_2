import { Outlet, NavLink } from 'react-router-dom'
import { useApp } from '../contexts/AppContext.jsx'

function AppLayout() {
  const { theme, setTheme, increaseFont, decreaseFont } = useApp()
  return (
    <div className="app-container">
      <header className="header">
        <nav className="nav">
          <NavLink to="/" className="nav-link">EduConnect</NavLink>
          <div className="nav-right">
            <NavLink to="/courses" className="nav-link">Courses</NavLink>
            <NavLink to="/community" className="nav-link">Community</NavLink>
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
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
    </div>
  )
}

export default AppLayout


