import { useParams } from 'react-router-dom'
import { mockLessonsByCourseId } from '../state/mockData.js'

function LessonPlayer() {
  const { courseId, lessonId } = useParams()
  const lesson = (mockLessonsByCourseId[courseId] || []).find((l) => l.id === lessonId)

  if (!lesson) {
    return <div className="page"><h1>Lesson not found</h1></div>
  }

  return (
    <div className="page">
      <h1>{lesson.title}</h1>
      <div className="player">
        <div className="video" role="region" aria-label="Lesson content">
          <p>{lesson.content}</p>
        </div>
        <div className="captions">
          <label>
            <input type="checkbox" defaultChecked /> Captions
          </label>
        </div>
      </div>
    </div>
  )
}

export default LessonPlayer


