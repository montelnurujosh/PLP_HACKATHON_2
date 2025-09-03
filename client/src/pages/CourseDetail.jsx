import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../state/api.js'
import ProgressBar from '../ui/ProgressBar.jsx'
import LessonList from '../ui/LessonList.jsx'

function CourseDetail() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    Promise.all([
      api.getCourse(courseId),
      api.getLessonsByCourse(courseId)
    ]).then(([c, ls]) => {
      setCourse(c)
      setLessons(ls)
    }).catch(() => setError('Failed to load course')).finally(() => setLoading(false))
  }, [courseId])
  const completed = Math.floor((lessons.filter((l) => l.completed).length / Math.max(1, lessons.length)) * 100)

  if (!course && !loading) {
    return <div className="page"><h1>Course not found</h1></div>
  }

  return (
    <div className="page">
      {loading ? <div className="muted">Loading…</div> : null}
      {error ? <div className="error">{error}</div> : null}
      {course ? (
        <>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <ProgressBar value={completed} />
          <LessonList courseId={courseId} lessons={lessons} />
        </>
      ) : null}
    </div>
  )
}

export default CourseDetail


