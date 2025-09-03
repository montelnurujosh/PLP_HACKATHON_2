function TagFilter({ allTags, selected, onChange }) {
  function toggle(tag) {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag))
    } else {
      onChange([...selected, tag])
    }
  }
  function selectAll() {
    onChange(allTags)
  }
  function clearAll() {
    onChange([])
  }

  return (
    <div>
      <div className="tag-actions">
        <button className="button" onClick={selectAll} aria-label="Select all tags">All</button>
        <button className="button" onClick={clearAll} aria-label="Clear selected tags">Clear</button>
      </div>
      <div className="tags" role="group" aria-label="Filter by tags">
        {allTags.map((t) => (
          <button
            key={t}
            className={`tag ${selected.includes(t) ? 'active' : ''}`}
            aria-pressed={selected.includes(t)}
            onClick={() => toggle(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TagFilter


