function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      aria-label="Search"
      className="input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export default SearchBar


