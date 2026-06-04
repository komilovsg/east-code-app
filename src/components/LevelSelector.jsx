import React from 'react'
import { useLang } from '../i18n/index.jsx'

export default function LevelSelector({ levels, selected, onSelect, progress }) {
  const { t, lang } = useLang()
  return (
    <div className="level-list">
      <h2>{t.sidebar_title}</h2>
      <ul>
        {levels.map((level, i) => {
          const isDone = !!progress[level.id]
          const isActive = selected === level.id
          const cls = ['level-item', isActive ? 'active' : '', isDone ? 'done-item' : ''].filter(Boolean).join(' ')
          const title = lang === 'tj' ? level.title_tj : level.title_ru
          return (
            <li key={level.id} className={cls} onClick={() => onSelect(level.id)}>
              <div className="level-meta">
                <span className="level-num">{i + 1}</span>
                <span className="status">
                  {isDone ? '✓' : isActive ? '▶' : '○'}
                </span>
                <strong title={title}>{title}</strong>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
