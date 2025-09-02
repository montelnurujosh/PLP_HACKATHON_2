import { mockUser, mockCourses, mockProgressByCourseId } from '../state/mockData.js'

function Dashboard() {
  const myCourses = mockCourses.slice(0, 2)
  return (
    <div className="page">
      <h1>Welcome, {mockUser.name}</h1>
      <h2>Your Learning</h2>
      <ul className="list">
        {myCourses.map((c) => (
          <li key={c.id}>
            {c.title} — {mockProgressByCourseId[c.id] || 0}% complete
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard


