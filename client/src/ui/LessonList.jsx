import { Link } from 'react-router-dom'

function LessonList({ courseId, lessons }) {
  return (
    <ul className="list">
      {lessons.map((l) => (
        <li key={l.id}>
          <Link to={`/courses/${courseId}/lessons/${l.id}`}>{l.title}</Link>
          {l.completed ? ' ✅' : ''}
        </li>
      ))}
    </ul>
  )
}

export default LessonList


