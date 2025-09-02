import CourseCard from '../ui/CourseCard.jsx'
import { mockCourses } from '../state/mockData.js'

function Home() {
  const featured = mockCourses.slice(0, 3)
  return (
    <div className="page">
      <h1>Accessible, Inclusive, Interactive Learning</h1>
      <p>Explore courses designed to support SDG 4: Quality Education for all.</p>
      <div className="grid">
        {featured.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  )
}

export default Home


