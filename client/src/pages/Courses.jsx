import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CourseCard from '../ui/CourseCard.jsx'
import SearchBar from '../ui/SearchBar.jsx'
import TagFilter from '../ui/TagFilter.jsx'
import { api } from '../state/api.js'

function Courses() {
  const [query, setQuery] = useState('')
  const [tags, setTags] = useState([])
  const [courses, setCourses] = useState([])
  const [allTags, setAllTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    setError('')
    api.getCourses().then((data) => {
      setCourses(data.items || [])
      setAllTags(data.tags || [])
    }).catch(() => setError('Failed to load courses')).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const preselected = location.state && location.state.tag
    if (preselected && allTags.includes(preselected)) {
      setTags([preselected])
    }
  }, [location.state, allTags])

  const filtered = courses.filter((c) => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase())
    const matchesTags = tags.length === 0 || tags.every((t) => c.tags.includes(t))
    return matchesQuery && matchesTags
  })

  return (
    <div className="page">
      <h1>All Courses</h1>
      <SearchBar value={query} onChange={setQuery} placeholder="Search courses" />
      <TagFilter allTags={allTags} selected={tags} onChange={setTags} />
      {loading ? <div className="muted">Loading courses…</div> : null}
      {error ? <div className="error">{error}</div> : null}
      {!loading && !error ? (
        filtered.length === 0 ? (
          <div className="muted">No courses match your filters.</div>
        ) : (
          <div className="grid">
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} onTagClick={(t) => setTags((prev) => Array.from(new Set([...prev, t])))} />
            ))}
          </div>
        )
      ) : null}
    </div>
  )
}

export default Courses


