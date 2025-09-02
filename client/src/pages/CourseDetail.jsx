import { useParams } from 'react-router-dom'
import { mockCourses, mockLessonsByCourseId } from '../state/mockData.js'
import ProgressBar from '../ui/ProgressBar.jsx'
import LessonList from '../ui/LessonList.jsx'

function CourseDetail() {
  const { courseId } = useParams()
  const course = mockCourses.find((c) => c.id === courseId)
  const lessons = mockLessonsByCourseId[courseId] || []
  const completed = Math.floor((lessons.filter((l) => l.completed).length / Math.max(1, lessons.length)) * 100)

  if (!course) {
    return <div className="page"><h1>Course not found</h1></div>
  }

  return (
    <div className="page">
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <ProgressBar value={completed} />
      <LessonList courseId={courseId} lessons={lessons} />
    </div>
  )
}

export default CourseDetail


