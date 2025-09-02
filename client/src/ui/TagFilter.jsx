function TagFilter({ allTags, selected, onChange }) {
  function toggle(tag) {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag))
    } else {
      onChange([...selected, tag])
    }
  }

  return (
    <div className="tags">
      {allTags.map((t) => (
        <button key={t} className={`tag ${selected.includes(t) ? 'active' : ''}`} onClick={() => toggle(t)}>
          {t}
        </button>
      ))}
    </div>
  )
}

export default TagFilter


