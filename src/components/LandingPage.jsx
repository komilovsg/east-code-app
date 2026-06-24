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

export default function LandingPage({ onSelect, onRoadmap, onDevQuest, onLesson, progress, onReset }) {
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

        {/* ── TECH CARDS ── */}
        <div className="tech-cards">
          {TECHS.map(tech => {
            const prog = progress[tech.id] || { done: 0, total: tech.totalLevels }
            const pct = prog.total > 0 ? Math.round((prog.done / prog.total) * 100) : 0
            const hasProgress = prog.done > 0
            return (
              <div
                key={tech.id}
                className="tech-card tc-available"
                style={{ '--tc': tech.color, '--tc-bg': tech.bgColor, '--tc-border': tech.borderColor }}
                onClick={() => onSelect(tech.id)}
              >
                <div className="tc-emoji">{tech.emoji}</div>
                <div className="tc-icon">{tech.icon}</div>
                <div className="tc-label">{tech.label}</div>
                <div className="tc-desc">{tech.description}</div>
                <div className="tc-progress">
                  <div className="tc-progress-bar">
                    <div className="tc-progress-fill" style={{ width: `${pct}%`, background: tech.color }} />
                  </div>
                  <div className="tc-progress-text">
                    <span className="tc-pct">{pct}%</span> · {prog.done}/{prog.total} {t.levels}
                  </div>
                </div>
                <div className="tc-footer">
                  <button className="tc-btn" style={{ background: tech.color }}>
                    {hasProgress ? t.continue : t.start}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── EXTRA TOOLS SECTION ── */}
        <div style={{ width: '100%', maxWidth: 960, marginTop: 32 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--muted)',
            textTransform: 'uppercase', marginBottom: 14, textAlign: 'center',
          }}>
            Интерактивные инструменты
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>

            {/* DEV QUEST card */}
            <div
              onClick={onDevQuest}
              style={{
                width: 280, background: 'linear-gradient(135deg,rgba(0,229,255,.08),rgba(123,47,242,.08))',
                border: '1.5px solid rgba(0,229,255,.25)',
                borderRadius: 16, padding: '22px 20px 18px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                transition: 'transform .25s cubic-bezier(.34,1.56,.64,1), border-color .2s, box-shadow .25s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)'
                e.currentTarget.style.borderColor = '#00E5FF'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px #00E5FF'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.borderColor = 'rgba(0,229,255,.25)'
                e.currentTarget.style.boxShadow = ''
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 2 }}>🎮</div>
              <div style={{
                fontSize: 13, fontWeight: 800, fontFamily: 'monospace',
                background: 'linear-gradient(135deg,#00E5FF,#7B2FF2)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{'</DEV QUEST>'}</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--bright)', letterSpacing: -0.5 }}>JS Игра</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.7 }}>
                Баги, типы, методы — прокачай JS через игру
              </div>
              <div style={{
                display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4,
              }}>
                {['🔍 Баги','💭 Вывод','🧩 Методы','🫁 Дыхание'].map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, padding: '2px 8px', borderRadius: 20,
                    background: 'rgba(0,229,255,.1)', color: '#00E5FF',
                    border: '1px solid rgba(0,229,255,.2)',
                  }}>{tag}</span>
                ))}
              </div>
              <div style={{ marginTop: 8, width: '100%' }}>
                <button style={{
                  width: '100%', padding: '9px', borderRadius: 8, border: 'none',
                  background: 'linear-gradient(135deg,#00E5FF22,#7B2FF222)',
                  color: '#00E5FF', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  fontFamily: 'inherit', border: '1px solid rgba(0,229,255,.3)',
                }}>Играть →</button>
              </div>
            </div>

            {/* JS Lesson card */}
            <div
              onClick={onLesson}
              style={{
                width: 280, background: 'linear-gradient(135deg,rgba(88,166,255,.08),rgba(63,185,80,.08))',
                border: '1.5px solid rgba(88,166,255,.25)',
                borderRadius: 16, padding: '22px 20px 18px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                transition: 'transform .25s cubic-bezier(.34,1.56,.64,1), border-color .2s, box-shadow .25s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)'
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.borderColor = 'rgba(88,166,255,.25)'
                e.currentTarget.style.boxShadow = ''
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 2 }}>📖</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace' }}>js-dom-lesson.js</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--bright)', letterSpacing: -0.5 }}>JS + DOM</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.7 }}>
                15 слайдов: теория, живые демо и практические задачи с редактором
              </div>
              <div style={{
                display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4,
              }}>
                {['🎯 getElementById','⚡ Events','✏️ textContent','🧩 Задачи'].map(tag => (
                  <span key={tag} style={{
                    fontSize: 10, padding: '2px 8px', borderRadius: 20,
                    background: 'rgba(88,166,255,.1)', color: 'var(--accent)',
                    border: '1px solid rgba(88,166,255,.2)',
                  }}>{tag}</span>
                ))}
              </div>
              <div style={{ marginTop: 8, width: '100%' }}>
                <button style={{
                  width: '100%', padding: '9px', borderRadius: 8,
                  background: 'linear-gradient(135deg,rgba(88,166,255,.15),rgba(63,185,80,.15))',
                  color: 'var(--accent)', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  fontFamily: 'inherit', border: '1px solid rgba(88,166,255,.3)',
                }}>Смотреть урок →</button>
              </div>
            </div>

          </div>
        </div>

        <button className="reset-progress-btn" onClick={onReset}>{t.reset_btn}</button>
      </main>

      <footer className="landing-footer">{t.footer}</footer>
    </div>
  )
}
