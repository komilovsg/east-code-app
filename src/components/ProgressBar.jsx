import React from 'react'

export default function ProgressBar({ levels, progress }) {
  const total = levels.length
  const done = levels.filter(l => progress[l.id]).length
  const pct = Math.round((done / total) * 100)
  return (
    <div className="progress-wrap" title={`${done}/${total}`}>
      <div className="progress-line"><div className="progress-fill" style={{ width: pct + '%' }} /></div>
      <div className="progress-text">{pct}%</div>
    </div>
  )
}
