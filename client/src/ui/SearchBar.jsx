import { useEffect, useMemo, useState } from 'react'

function SearchBar({ value, onChange, placeholder, debounceMs = 200, onClear }) {
  const [inner, setInner] = useState(value || '')
  const debounced = useMemo(() => {
    let timer
    return (v) => {
      clearTimeout(timer)
      timer = setTimeout(() => onChange(v), debounceMs)
    }
  }, [onChange, debounceMs])

  useEffect(() => {
    setInner(value || '')
  }, [value])

  function handleChange(e) {
    const v = e.target.value
    setInner(v)
    debounced(v)
  }

  function handleClear() {
    setInner('')
    onChange('')
    if (onClear) onClear()
  }

  return (
    <div className="searchbar">
      <input
        aria-label="Search"
        className="input"
        type="text"
        value={inner}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {inner ? (
        <button className="button" aria-label="Clear search" onClick={handleClear}>×</button>
      ) : null}
    </div>
  )
}

export default SearchBar


