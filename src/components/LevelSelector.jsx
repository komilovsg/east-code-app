import React from 'react'

export default function LevelSelector({ levels, selected, onSelect, progress }) {
  return (
    <div className="level-list">
      <h2>Уровни</h2>
      <ul>
        {levels.map(level => (
          <li
            key={level.id}
            className={"level-item " + (selected === level.id ? 'active' : '')}
            onClick={() => onSelect(level.id)}
          >
            <div className="level-meta">
              <strong>{level.title}</strong>
              <span className="status">{progress[level.id] ? '✓' : '●'}</span>
            </div>
            <div className="level-desc">{level.description}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
