import { useState } from 'react'
import CourseCard from '../ui/CourseCard.jsx'
import SearchBar from '../ui/SearchBar.jsx'
import TagFilter from '../ui/TagFilter.jsx'
import { mockCourses, mockTags } from '../state/mockData.js'

function Courses() {
  const [query, setQuery] = useState('')
  const [tags, setTags] = useState([])

  const filtered = mockCourses.filter((c) => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase())
    const matchesTags = tags.length === 0 || tags.every((t) => c.tags.includes(t))
    return matchesQuery && matchesTags
  })

  return (
    <div className="page">
      <h1>All Courses</h1>
      <SearchBar value={query} onChange={setQuery} placeholder="Search courses" />
      <TagFilter allTags={mockTags} selected={tags} onChange={setTags} />
      <div className="grid">
        {filtered.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  )
}

export default Courses


