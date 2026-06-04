import React, { useState, useEffect } from 'react'
import { useLang } from '../i18n/index.jsx'

const DIFF_CONFIG = [
  { id: 'beginner', icon: '🟢', color: '#3BC4A5', label_ru: 'Новичок', label_tj: 'Тоза' },
  { id: 'medium',   icon: '🟡', color: '#ffd93d', label_ru: 'Средний', label_tj: 'Миёна' },
  { id: 'advanced', icon: '🔴', color: '#f093fb', label_ru: 'Опытный', label_tj: 'Тажрибадор' },
  { id: 'super',    icon: '💀', color: '#ff6b6b', label_ru: 'Супер тяжёлый', label_tj: 'Хеле душвор' },
]

export default function DifficultySelector({ levels, selected, onSelect, progress }) {
  const { lang, t } = useLang()

  const activeDiff = levels.find(l => l.id === selected)?.difficulty || 'beginner'
  const [open, setOpen] = useState(() => {
    const o = {}
    DIFF_CONFIG.forEach(d => { o[d.id] = d.id === activeDiff })
    return o
  })

  useEffect(() => {
    setOpen(prev => ({ ...prev, [activeDiff]: true }))
  }, [activeDiff])

  function toggle(id) {
    setOpen(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="diff-selector">
      <div className="diff-header">
        <span>{t.sidebar_title}</span>
        <span className="diff-total-prog">
          {levels.filter(l => progress[l.id]).length}/{levels.length}
        </span>
      </div>

      {DIFF_CONFIG.map(diff => {
        const group = levels.filter(l => l.difficulty === diff.id)
        if (group.length === 0) return null
        const done = group.filter(l => progress[l.id]).length
        const allDone = done === group.length
        const isOpen = open[diff.id]
        const label = lang === 'tj' ? diff.label_tj : diff.label_ru

        return (
          <div key={diff.id} className={`diff-group ${isOpen ? 'open' : ''}`}>
            <button
              className="diff-group-header"
              style={{ '--diff-color': diff.color }}
              onClick={() => toggle(diff.id)}
            >
              <span className="diff-icon">{diff.icon}</span>
              <span className="diff-label">{label}</span>
              <span className="diff-prog" style={{ color: allDone ? '#3BC4A5' : diff.color }}>
                {done}/{group.length}
              </span>
              <span className="diff-arrow">{isOpen ? '▾' : '▸'}</span>
            </button>

            {isOpen && (
              <ul className="diff-level-list">
                {group.map((level, idx) => {
                  const globalIdx = levels.indexOf(level)
                  const isDone = !!progress[level.id]
                  const isActive = selected === level.id
                  const title = lang === 'tj' ? level.title_tj : level.title_ru
                  const cls = [
                    'diff-level-item',
                    isActive ? 'active' : '',
                    isDone ? 'done' : '',
                  ].filter(Boolean).join(' ')
                  return (
                    <li
                      key={level.id}
                      className={cls}
                      style={isActive ? { '--diff-color': diff.color } : {}}
                      onClick={() => onSelect(level.id)}
                      title={title}
                    >
                      <span className="diff-level-status">
                        {isDone ? '✓' : isActive ? '▶' : `${globalIdx + 1}`}
                      </span>
                      <span className="diff-level-title">{title}</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
