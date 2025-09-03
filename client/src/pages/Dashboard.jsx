import { useEffect, useState } from 'react'
import { api } from '../state/api.js'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState([])
  const [progressMap, setProgressMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    Promise.all([
      api.getUser(),
      api.getCourses(),
      api.getProgressAll()
    ]).then(([u, d, p]) => {
      setUser(u)
      setCourses((d.items || []).slice(0, 2))
      setProgressMap(p || {})
    }).catch(() => setError('Failed to load dashboard')).finally(() => setLoading(false))
  }, [])
  return (
    <div className="page">
      {loading ? <div className="muted">Loading…</div> : null}
      {error ? <div className="error">{error}</div> : null}
      {!loading && !error ? (
        <>
          <h1>Welcome, {user ? user.name : 'Learner'}</h1>
          <h2>Your Learning</h2>
          <ul className="list">
            {courses.map((c) => (
              <li key={c.id}>
                {c.title} — {progressMap[c.id] ?? 0}% complete
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}

export default Dashboard


