import { Link } from 'react-router-dom'

function LessonList({ courseId, lessons, sort = 'status' }) {
  const sorted = [...lessons].sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title)
    // default: status (incomplete first)
    if (a.completed === b.completed) return a.title.localeCompare(b.title)
    return a.completed ? 1 : -1
  })

  const completedCount = lessons.filter((l) => l.completed).length

  return (
    <div>
      <div className="muted">{completedCount}/{lessons.length} completed</div>
      {lessons.length === 0 ? (
        <div className="muted">No lessons available yet.</div>
      ) : (
        <ul className="list">
          {sorted.map((l) => (
            <li key={l.id}>
              <Link to={`/courses/${courseId}/lessons/${l.id}`}>{l.title}</Link>
              {l.completed ? ' ✅' : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LessonList


