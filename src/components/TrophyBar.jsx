import React from 'react'
import { useLang } from '../i18n/index.jsx'

export default function TrophyBar({ levels, progress, recent }) {
  const { lang } = useLang()
  const done = levels.filter(l => progress[l.id])
  return (
    <div className="trophy-bar">
      {done.map(l => {
        const title = lang === 'tj' ? l.title_tj : l.title_ru
        return (
          <div key={l.id} className={'trophy ' + (recent === l.id ? 'pop' : '')} title={title}>🏆</div>
        )
      })}
    </div>
  )
}
