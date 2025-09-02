import { useState } from 'react'
import { mockDiscussions } from '../state/mockData.js'

function Community() {
  const [posts] = useState(mockDiscussions)
  return (
    <div className="page">
      <h1>Community</h1>
      <ul className="list">
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <div>{p.body}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Community


