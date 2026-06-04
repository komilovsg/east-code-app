import React from 'react'
import { useLang } from '../i18n/index.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const LOGO = (
  <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="lg-land" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6C63FF"/><stop offset="100%" stopColor="#3BC4A5"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="14" fill="url(#lg-land)"/>
    <text x="8" y="24" fontFamily="monospace" fontWeight="900" fontSize="15" fill="rgba(255,255,255,0.5)">&lt;/&gt;</text>
    <text x="8" y="47" fontFamily="monospace" fontWeight="900" fontSize="22" fill="white">EC</text>
  </svg>
)

export default function LandingPage({ onSelect, onRoadmap, progress, onReset }) {
  const { t } = useLang()

  const TECHS = [
    {
      id: 'html', label: 'HTML', icon: '</>', color: '#e34c26',
      bgColor: 'rgba(227,76,38,0.08)', borderColor: 'rgba(227,76,38,0.25)',
      description: t.html_desc, totalLevels: 20, emoji: '🌐',
    },
    {
      id: 'css', label: 'CSS', icon: '{ }', color: '#519aba',
      bgColor: 'rgba(81,154,186,0.08)', borderColor: 'rgba(81,154,186,0.25)',
      description: t.css_desc, totalLevels: 20, emoji: '🎨',
    },
    {
      id: 'js', label: 'JavaScript', icon: 'JS', color: '#f7df1e',
      bgColor: 'rgba(247,223,30,0.06)', borderColor: 'rgba(247,223,30,0.2)',
      description: t.js_desc, totalLevels: 21, emoji: '⚡',
    },
  ]

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-logo-wrap">
          {LOGO}
          <span className="landing-logo-text">EastCode</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="roadmap-landing-btn" onClick={onRoadmap}>{t.roadmap_btn}</button>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="landing-main">
        <div className="landing-hero">
          <div className="hero-badge">🚀 Free · No login · RU + TJ</div>
          <h2 className="hero-title">{t.choose_tech}</h2>
          <p className="hero-sub">{t.subtitle}</p>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">61+</span><span className="stat-label">Missions</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">4</span><span className="stat-label">Levels</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">100%</span><span className="stat-label">Free</span></div>
          </div>
        </div>

        <div className="tech-cards">
          {TECHS.map(tech => {
            const prog = progress[tech.id] || { done: 0, total: tech.totalLevels }
            const pct = prog.total > 0 ? Math.round((prog.done / prog.total) * 100) : 0
            const hasProg = prog.done > 0
            return (
              <div
                key={tech.id}
                className="tech-card tc-available"
                style={{ '--tc': tech.color, '--tc-bg': tech.bgColor, '--tc-border': tech.borderColor }}
                onClick={() => onSelect(tech.id)}
              >
                <div className="tc-emoji">{tech.emoji}</div>
                <div className="tc-icon" style={{ color: tech.color }}>{tech.icon}</div>
                <div className="tc-label">{tech.label}</div>
                <div className="tc-desc">{tech.description}</div>
                <div className="tc-progress">
                  <div className="tc-progress-bar">
                    <div
                      className="tc-progress-fill"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg,${tech.color},${tech.color}88)` }}
                    />
                  </div>
                  <span className="tc-progress-text">
                    {prog.done}/{prog.total} {t.levels}
                    {pct > 0 && <span className="tc-pct"> · {pct}%</span>}
                  </span>
                </div>
                <div className="tc-footer">
                  <button className="tc-btn" style={{ background: tech.color }}>
                    {hasProg ? t.continue : t.start}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <button className="reset-progress-btn" onClick={onReset}>{t.reset_btn}</button>
      </main>

      <footer className="landing-footer">{t.footer}</footer>
    </div>
  )
}
