import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseCard from '../ui/CourseCard.jsx'
import { api } from '../state/api.js'

function Home() {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    api.getCourses().then((d) => setCourses((d.items || []).slice(0, 3)))
  }, [])
  return (
    <div className="page">
      <h1>Accessible, Inclusive, Interactive Learning</h1>
      <p>Explore courses designed to support SDG 4: Quality Education for all.</p>
      <div className="grid">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} onTagClick={(t) => navigate('/courses', { state: { tag: t } })} />
        ))}
      </div>
    </div>
  )
}

export default Home


