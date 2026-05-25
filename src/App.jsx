import React, { useState, useEffect } from 'react'
import LevelSelector from './components/LevelSelector'
import EditorPreview from './components/EditorPreview'
import ProgressBar from './components/ProgressBar'
import TrophyBar from './components/TrophyBar'
import ScoreDisplay from './components/ScoreDisplay'
import Toasts from './components/Toasts'
import levels from './data/levels'

export default function App() {
  const [selected, setSelected] = useState(levels[0].id)
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('css-quest-progress') || '{}')
    } catch (e) {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem('css-quest-progress', JSON.stringify(progress))
  }, [progress])

  function markCompleted(levelId) {
    setProgress(prev => {
      if (prev[levelId]) return prev
      // award points only once
      setScore(s => s + 100)
      setRecentlyEarned(levelId)
      // add toast
      setToasts(t => [...t, { id: Date.now(), text: `Уровень пройден: ${levels.find(l => l.id===levelId).title}` }])
      // schedule clear recent and toast removal
      setTimeout(() => setRecentlyEarned(null), 1500)
      setTimeout(() => setToasts(t => t.slice(1)), 2000)

      // auto-advance to next incomplete level (after small delay to let animation show)
      setTimeout(() => {
        const idx = levels.findIndex(l => l.id === levelId)
        let next = null
        for (let i = idx + 1; i < levels.length; i++) {
          if (!((progress && progress[levels[i].id]) || levels[i].id === levelId)) { next = levels[i].id; break }
        }
        if (!next) {
          // try from start
          for (let i = 0; i < levels.length; i++) {
            if (!((progress && progress[levels[i].id]) || levels[i].id === levelId)) { next = levels[i].id; break }
          }
        }
        if (next) setSelected(next)
      }, 700)

      return { ...prev, [levelId]: true }
    })
  }

  function onUseHint(levelId) {
    // deduct points for hint usage (min 0)
    setScore(s => Math.max(0, s - 10))
  }

  const [score, setScore] = useState(() => {
    try { return parseInt(localStorage.getItem('css-quest-score') || '0', 10) } catch { return 0 }
  })
  const [recentlyEarned, setRecentlyEarned] = useState(null)

  useEffect(() => { localStorage.setItem('css-quest-score', String(score)) }, [score])
  const [toasts, setToasts] = useState([])

  return (
    <div className="app">
      <header className="header">
        <div className="title-left">
          <h1>CSS Quest</h1>
          <p>Тренируй базовые навыки CSS — от селекторов до медиазапросов</p>
        </div>
        <div className="title-right">
          <ScoreDisplay score={score} recent={recentlyEarned} />
          <ProgressBar levels={levels} progress={progress} />
          <TrophyBar levels={levels} progress={progress} recent={recentlyEarned} />
        </div>
      </header>
      <Toasts items={toasts} />
      <div className="main">
        <aside className="sidebar">
          <LevelSelector
            levels={levels}
            selected={selected}
            onSelect={setSelected}
            progress={progress}
          />
        </aside>
        <section className="content">
          <EditorPreview
            level={levels.find(l => l.id === selected)}
            onComplete={() => markCompleted(selected)}
            onUseHint={onUseHint}
            completed={!!progress[selected]}
          />
        </section>
      </div>
    </div>
  )
}
