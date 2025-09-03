import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../state/api.js'

function LessonPlayer() {
  const { courseId, lessonId } = useParams()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  useEffect(() => {
    setLoading(true)
    setError('')
    api.getLesson(courseId, lessonId)
      .then(setLesson)
      .catch(() => setError('Failed to load lesson'))
      .finally(() => setLoading(false))
  }, [courseId, lessonId])

  async function markComplete() {
    if (!lesson) return
    try {
      setSaving(true)
      setLesson({ ...lesson, completed: true })
      await api.completeLesson(courseId, lessonId)
    } catch (_) {
      setError('Failed to update progress')
    } finally {
      setSaving(false)
    }
  }

  if (!lesson && !loading) {
    return <div className="page"><h1>Lesson not found</h1></div>
  }

  return (
    <div className="page">
      {loading ? <div className="muted">Loading…</div> : null}
      {error ? <div className="error">{error}</div> : null}
      {lesson ? <h1>{lesson.title}</h1> : null}
      <div className="player">
        <div className="video" role="region" aria-label="Lesson content">
          {lesson ? <p>{lesson.content}</p> : null}
        </div>
        <div className="captions">
          <label>
            <input type="checkbox" defaultChecked /> Captions
          </label>
        </div>
      </div>
      {lesson ? (
        <div style={{ marginTop: '.75rem' }}>
          <button className="button" onClick={markComplete} disabled={saving || lesson.completed}>
            {lesson.completed ? 'Completed' : saving ? 'Saving…' : 'Mark complete'}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default LessonPlayer


