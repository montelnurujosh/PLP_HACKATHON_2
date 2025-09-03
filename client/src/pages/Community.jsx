import { useEffect, useState } from 'react'
import { api } from '../state/api.js'

function Community() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    setLoading(true)
    setError('')
    api.getDiscussions().then(setPosts).catch(() => setError('Failed to load discussions')).finally(() => setLoading(false))
  }, [])
  return (
    <div className="page">
      <h1>Community</h1>
      {loading ? <div className="muted">Loading…</div> : null}
      {error ? <div className="error">{error}</div> : null}
      {!loading && !error ? (
        posts.length === 0 ? (
          <div className="muted">No community posts yet. Be the first to share!</div>
        ) : (
          <ul className="list">
            {posts.map((p) => (
              <li key={p.id}>
                <strong>{p.title}</strong>
                <div>{p.body}</div>
              </li>
            ))}
          </ul>
        )
      ) : null}
    </div>
  )
}

export default Community


