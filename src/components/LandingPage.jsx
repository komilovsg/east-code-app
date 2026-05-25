import React from 'react'

const TECHS = [
  {
    id: 'html',
    label: 'HTML',
    icon: '</>',
    color: '#e34c26',
    bgColor: 'rgba(227,76,38,0.08)',
    borderColor: 'rgba(227,76,38,0.2)',
    description: 'Структура страниц, семантика, формы, доступность',
    levels: 12,
    available: false,
  },
  {
    id: 'css',
    label: 'CSS',
    icon: '{ }',
    color: '#519aba',
    bgColor: 'rgba(81,154,186,0.08)',
    borderColor: 'rgba(81,154,186,0.25)',
    description: 'Стили, макеты, анимации, медиазапросы',
    levels: 11,
    available: true,
  },
  {
    id: 'js',
    label: 'JavaScript',
    icon: 'JS',
    color: '#f7df1e',
    bgColor: 'rgba(247,223,30,0.06)',
    borderColor: 'rgba(247,223,30,0.15)',
    description: 'Логика, DOM, события, асинхронность',
    levels: 15,
    available: false,
  },
]

export default function LandingPage({ onSelect, cssProgress }) {
  return (
    <div className="landing">
      <header className="landing-header">
        <span className="landing-logo">🎨 CSS Quest</span>
      </header>

      <main className="landing-main">
        <div className="landing-hero">
          <h2>Выбери технологию</h2>
          <p>Освой веб-разработку шаг за шагом — практика, задачи, прогресс</p>
        </div>

        <div className="tech-cards">
          {TECHS.map(tech => {
            const progress = tech.id === 'css' ? cssProgress : null
            const hasProg = progress && progress.done > 0
            return (
              <div
                key={tech.id}
                className={`tech-card ${tech.available ? 'tc-available' : 'tc-locked'}`}
                style={{
                  '--tc': tech.color,
                  '--tc-bg': tech.bgColor,
                  '--tc-border': tech.borderColor,
                }}
                onClick={() => tech.available && onSelect(tech.id)}
              >
                {!tech.available && <span className="tc-lock">🔒</span>}

                <div className="tc-icon" style={{ color: tech.color }}>
                  {tech.icon}
                </div>

                <div className="tc-label">{tech.label}</div>
                <div className="tc-desc">{tech.description}</div>

                {progress && (
                  <div className="tc-progress">
                    <div className="tc-progress-bar">
                      <div
                        className="tc-progress-fill"
                        style={{ width: `${Math.round((progress.done / progress.total) * 100)}%` }}
                      />
                    </div>
                    <span className="tc-progress-text">
                      {progress.done}/{progress.total} уровней
                    </span>
                  </div>
                )}

                <div className="tc-footer">
                  {tech.available
                    ? (
                      <button className="tc-btn">
                        {hasProg ? 'Продолжить →' : 'Начать →'}
                      </button>
                    )
                    : (
                      <span className="tc-soon">Скоро</span>
                    )
                  }
                  {!progress && (
                    <span className="tc-count">{tech.levels} уровней</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <footer className="landing-footer">
        Создано для студентов Alif Academy
      </footer>
    </div>
  )
}
