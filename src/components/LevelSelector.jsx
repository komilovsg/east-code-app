import React from 'react'

export default function LevelSelector({ levels, selected, onSelect, progress }) {
  return (
    <div className="level-list">
      <h2>Уровни</h2>
      <ul>
        {levels.map(level => {
          const isDone = !!progress[level.id]
          const isActive = selected === level.id
          const cls = [
            'level-item',
            isActive ? 'active' : '',
            isDone ? 'done-item' : '',
          ].filter(Boolean).join(' ')
          return (
            <li key={level.id} className={cls} onClick={() => onSelect(level.id)}>
              <div className="level-meta">
                <span className="status">
                  {isDone ? '✓' : isActive ? '▶' : '○'}
                </span>
                <strong title={level.title}>{level.title}</strong>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
