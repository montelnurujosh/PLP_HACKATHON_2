function ProgressBar({ value, showLabel = true }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0))
  return (
    <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
      {showLabel ? <span className="progress-label" aria-hidden>{pct}%</span> : null}
    </div>
  )
}

export default ProgressBar


