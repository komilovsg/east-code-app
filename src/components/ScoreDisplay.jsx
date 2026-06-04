import React from 'react'
import { useLang } from '../i18n/index.jsx'

export default function ScoreDisplay({ score, recent }) {
  const { t } = useLang()
  return (
    <div className="score-display" title="XP Score">
      <span className="score-label">{t.score}</span>
      <span className="score-value">{score}</span>
      {recent ? <span className="score-bonus">+100</span> : null}
    </div>
  )
}
