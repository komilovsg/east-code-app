import React, { useState, useEffect } from 'react'
import DifficultySelector from './components/DifficultySelector'
import EditorPreview from './components/EditorPreview'
import ProgressBar from './components/ProgressBar'
import TrophyBar from './components/TrophyBar'
import ScoreDisplay from './components/ScoreDisplay'
import Toasts from './components/Toasts'
import LandingPage from './components/LandingPage'
import RoadmapPage from './components/RoadmapPage'
import LanguageSwitcher from './components/LanguageSwitcher'
import cssLevels from './data/css-levels'
import htmlLevels from './data/html-levels'
import jsLevels from './data/js-levels'
import { LangProvider, useLang } from './i18n/index.jsx'

const MODULES = { css: cssLevels, html: htmlLevels, js: jsLevels }

const LOGO = (
  <svg width="26" height="26" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="lg-app" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6C63FF"/><stop offset="100%" stopColor="#3BC4A5"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="14" fill="url(#lg-app)"/>
    <text x="8" y="24" fontFamily="monospace" fontWeight="900" fontSize="15" fill="rgba(255,255,255,0.5)">&lt;/&gt;</text>
    <text x="8" y="47" fontFamily="monospace" fontWeight="900" fontSize="22" fill="white">EC</text>
  </svg>
)

const MODULE_LABELS = { html: 'HTML 🌐', css: 'CSS 🎨', js: 'JS ⚡' }
const MODULE_COLORS = { html: '#e34c26', css: '#519aba', js: '#f7df1e' }

function AppInner() {
  const { t, lang } = useLang()
  const [page, setPage] = useState('home')
  const [module, setModule] = useState('css')
  const levels = MODULES[module] || cssLevels
  const [selected, setSelected] = useState(levels[0].id)

  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('eastcode-progress') || '{}') } catch { return {} }
  })
  useEffect(() => { localStorage.setItem('eastcode-progress', JSON.stringify(progress)) }, [progress])

  const [score, setScore] = useState(() => {
    try { return parseInt(localStorage.getItem('eastcode-score') || '0', 10) } catch { return 0 }
  })
  useEffect(() => { localStorage.setItem('eastcode-score', String(score)) }, [score])

  const [recentlyEarned, setRecentlyEarned] = useState(null)
  const [toasts, setToasts] = useState([])

  function handleSelectModule(mod) {
    setModule(mod)
    const lvls = MODULES[mod] || cssLevels
    setSelected(lvls[0].id)
    setPage('module')
  }

  function markCompleted(levelId) {
    setProgress(prev => {
      if (prev[levelId]) return prev
      setScore(s => s + 100)
      setRecentlyEarned(levelId)
      const current = levels.find(l => l.id === levelId)
      const titleKey = lang === 'tj' ? 'title_tj' : 'title_ru'
      const title = current ? current[titleKey] : levelId
      setToasts(t2 => [...t2, { id: Date.now(), text: `🎉 ${t.mission}: ${title}` }])
      setTimeout(() => setRecentlyEarned(null), 1500)
      setTimeout(() => setToasts(t2 => t2.slice(1)), 2500)
      return { ...prev, [levelId]: true }
    })
  }

  function goNextLevel() {
    const idx = levels.findIndex(l => l.id === selected)
    for (let i = idx + 1; i < levels.length; i++) {
      setSelected(levels[i].id)
      return
    }
  }

  function getHasNext() {
    const idx = levels.findIndex(l => l.id === selected)
    return idx < levels.length - 1
  }

  function onUseHint() { setScore(s => Math.max(0, s - 10)) }

  function handleResetProgress() {
    if (!window.confirm(t.reset_confirm)) return
    localStorage.removeItem('eastcode-progress')
    localStorage.removeItem('eastcode-score')
    setProgress({})
    setScore(0)
    setToasts([{ id: Date.now(), text: '🔄 Прогресс сброшен' }])
    setTimeout(() => setToasts([]), 2000)
  }

  const moduleProgress = {}
  for (const [key, lvls] of Object.entries(MODULES)) {
    moduleProgress[key] = {
      done: lvls.filter(l => progress[l.id]).length,
      total: lvls.length,
    }
  }

  if (page === 'home') {
    return (
      <LandingPage
        onSelect={handleSelectModule}
        onRoadmap={() => setPage('roadmap')}
        progress={moduleProgress}
        onReset={handleResetProgress}
      />
    )
  }

  if (page === 'roadmap') {
    return <RoadmapPage onBack={() => setPage('home')} />
  }

  return (
    <div className="app">
      <header className="header">
        <div className="title-left">
          <button className="back-btn" onClick={() => setPage('home')}>{t.back}</button>
          <div className="header-logo">
            {LOGO}
            <div className="header-module-info">
              <span className="header-title" style={{ color: MODULE_COLORS[module] }}>
                {MODULE_LABELS[module]}
              </span>
              <span className="header-sub">EastCode</span>
            </div>
          </div>
        </div>
        <div className="title-right">
          <button className="reset-mini-btn" onClick={handleResetProgress} title={t.reset_btn}>
            🔄
          </button>
          <LanguageSwitcher />
          <ScoreDisplay score={score} recent={recentlyEarned} />
          <ProgressBar levels={levels} progress={progress} />
          <TrophyBar levels={levels} progress={progress} recent={recentlyEarned} />
        </div>
      </header>
      <Toasts items={toasts} />
      <div className="main">
        <aside className="sidebar">
          <DifficultySelector
            levels={levels}
            selected={selected}
            onSelect={setSelected}
            progress={progress}
          />
        </aside>
        <section className="content">
          <EditorPreview
            key={selected}
            level={levels.find(l => l.id === selected) || levels[0]}
            onComplete={() => markCompleted(selected)}
            onUseHint={onUseHint}
            completed={!!progress[selected]}
            onNextLevel={goNextLevel}
            hasNext={getHasNext()}
          />
        </section>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  )
}
