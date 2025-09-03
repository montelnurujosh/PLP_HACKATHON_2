import { Link } from 'react-router-dom'

function CourseCard({ course, onTagClick }) {
  return (
    <div className="card course-card" role="article" aria-label={course.title}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="tags">
        {course.tags.map((t) => (
          <button
            key={t}
            className="tag"
            onClick={onTagClick ? () => onTagClick(t) : undefined}
            aria-label={`Filter by ${t}`}
          >
            {t}
          </button>
        ))}
      </div>
      <Link to={`/courses/${course.id}`} className="button">View Course</Link>
    </div>
  )
}

export default CourseCard


