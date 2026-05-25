import React from 'react'

export default function ScoreDisplay({ score, recent }) {
  return (
    <div className="score-display" title="Score">
      <span className="score-label">Score</span>
      <span className="score-value">{score}</span>
      {recent ? <span className="score-bonus">+100</span> : null}
    </div>
  )
}
