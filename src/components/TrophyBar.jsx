import React from 'react'

export default function TrophyBar({ levels, progress, recent }) {
  const done = levels.filter(l => progress[l.id])
  return (
    <div className="trophy-bar">
      {done.map(l => (
        <div key={l.id} className={"trophy " + (recent === l.id ? 'pop' : '')} title={l.title}>🏆</div>
      ))}
    </div>
  )
}
