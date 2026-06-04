import React from 'react'
import { useLang } from '../i18n/index.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const LOGO = (
  <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="lg-rm" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6C63FF"/><stop offset="100%" stopColor="#3BC4A5"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="14" fill="url(#lg-rm)"/>
    <text x="8" y="24" fontFamily="monospace" fontWeight="900" fontSize="15" fill="rgba(255,255,255,0.5)">&lt;/&gt;</text>
    <text x="8" y="47" fontFamily="monospace" fontWeight="900" fontSize="22" fill="white">EC</text>
  </svg>
)

const ROADMAP = [
  {
    phase: 1,
    icon: '🌐',
    title_ru: 'HTML — Основы',
    title_tj: 'HTML — Асосҳо',
    items_ru: ['Теги и структура', 'Формы и таблицы', 'Семантика'],
    items_tj: ['Тегҳо ва сохтор', 'Формаҳо ва ҷадвалҳо', 'Семантика'],
    time_ru: '1–2 недели',
    time_tj: '1–2 ҳафта',
    covers: true,
    color: '#e34c26',
  },
  {
    phase: 2,
    icon: '🎨',
    title_ru: 'CSS — Стили',
    title_tj: 'CSS — Услубҳо',
    items_ru: ['Селекторы, Box Model', 'Flexbox и Grid', 'Анимации, адаптивность'],
    items_tj: ['Селекторҳо, Box Model', 'Flexbox ва Grid', 'Аниматсия, мутобиқат'],
    time_ru: '2–3 недели',
    time_tj: '2–3 ҳафта',
    covers: true,
    color: '#519aba',
  },
  {
    phase: 3,
    icon: '⚡',
    title_ru: 'JavaScript — Логика',
    title_tj: 'JavaScript — Мантиқ',
    items_ru: ['Переменные, функции', 'DOM и события', 'Fetch, Promise, Async'],
    items_tj: ['Тағйирёбандаҳо, функсияҳо', 'DOM ва рӯйдодҳо', 'Fetch, Promise, Async'],
    time_ru: '3–4 недели',
    time_tj: '3–4 ҳафта',
    covers: true,
    color: '#f7df1e',
  },
  {
    phase: 4,
    icon: '🔀',
    title_ru: 'Git & GitHub',
    title_tj: 'Git & GitHub',
    items_ru: ['Коммиты и ветки', 'Pull Requests', 'Совместная работа'],
    items_tj: ['Коммитҳо ва шохаҳо', 'Pull Requestҳо', 'Кори якҷоя'],
    time_ru: '1 неделя',
    time_tj: '1 ҳафта',
    covers: false,
    color: '#f05033',
  },
  {
    phase: 5,
    icon: '⚛️',
    title_ru: 'React / Vue',
    title_tj: 'React / Vue',
    items_ru: ['Компоненты и State', 'Хуки (hooks)', 'Маршрутизация'],
    items_tj: ['Компонентҳо ва State', 'Хукҳо (hooks)', 'Масирёбӣ'],
    time_ru: '4–6 недель',
    time_tj: '4–6 ҳафта',
    covers: false,
    color: '#61dafb',
  },
  {
    phase: 6,
    icon: '🔷',
    title_ru: 'TypeScript',
    title_tj: 'TypeScript',
    items_ru: ['Типы и интерфейсы', 'Дженерики', 'TS в React'],
    items_tj: ['Намудҳо ва интерфейсҳо', 'Дженерикҳо', 'TS дар React'],
    time_ru: '2 недели',
    time_tj: '2 ҳафта',
    covers: false,
    color: '#3178c6',
  },
  {
    phase: 7,
    icon: '📦',
    title_ru: 'Сборка & Deploy',
    title_tj: 'Сборка & Deploy',
    items_ru: ['Vite, Webpack', 'Vercel, Netlify', 'CI/CD основы'],
    items_tj: ['Vite, Webpack', 'Vercel, Netlify', 'Асосҳои CI/CD'],
    time_ru: '1 неделя',
    time_tj: '1 ҳафта',
    covers: false,
    color: '#6C63FF',
  },
  {
    phase: 8,
    icon: '💼',
    title_ru: 'Первая работа!',
    title_tj: 'Кори аввал!',
    items_ru: ['Портфолио (3–5 проектов)', 'GitHub профиль', 'Первый оффер'],
    items_tj: ['Портфолио (3–5 лоиҳа)', 'Профили GitHub', 'Пешниҳоди аввал'],
    time_ru: '∞ готовься!',
    time_tj: '∞ омода шав!',
    covers: false,
    isFinal: true,
    color: '#ffd93d',
  },
]

export default function RoadmapPage({ onBack }) {
  const { lang, t } = useLang()

  return (
    <div className="roadmap-page">
      <header className="landing-header">
        <div className="landing-logo-wrap">
          {LOGO}
          <span className="landing-logo-text">EastCode</span>
        </div>
        <LanguageSwitcher />
      </header>

      <div className="roadmap-content">
        <div className="roadmap-hero">
          <button className="roadmap-back-btn" onClick={onBack}>{t.roadmap_back}</button>
          <div className="hero-badge">🗺️ Route Map</div>
          <h1 className="roadmap-title">{t.roadmap_title}</h1>
          <p className="roadmap-sub">{t.roadmap_sub}</p>
        </div>

        <div className="roadmap-legend">
          <div className="legend-item">
            <span className="legend-dot covered" />
            <span>{t.roadmap_covers}</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot soon" />
            <span>{t.roadmap_coming}</span>
          </div>
        </div>

        <div className="roadmap-timeline">
          {ROADMAP.map((step, i) => {
            const title = lang === 'tj' ? step.title_tj : step.title_ru
            const items = lang === 'tj' ? step.items_tj : step.items_ru
            const time = lang === 'tj' ? step.time_tj : step.time_ru
            const isLast = i === ROADMAP.length - 1

            return (
              <div key={step.phase} className={`roadmap-step ${step.covers ? 'covered' : ''} ${step.isFinal ? 'final' : ''}`}>
                <div className="roadmap-connector">
                  <div className="roadmap-node" style={{ '--step-color': step.color }}>
                    <span className="roadmap-node-icon">{step.icon}</span>
                  </div>
                  {!isLast && <div className="roadmap-line" />}
                </div>

                <div className="roadmap-card" style={{ '--step-color': step.color }}>
                  <div className="roadmap-card-header">
                    <div className="roadmap-phase">Phase {step.phase}</div>
                    {step.covers ? (
                      <div className="roadmap-badge covered-badge">✓ EastCode</div>
                    ) : step.isFinal ? (
                      <div className="roadmap-badge final-badge">🎯 Цель</div>
                    ) : (
                      <div className="roadmap-badge soon-badge">{t.roadmap_coming}</div>
                    )}
                  </div>

                  <h3 className="roadmap-card-title" style={{ color: step.color }}>{title}</h3>

                  <ul className="roadmap-items">
                    {items.map((item, j) => (
                      <li key={j} className="roadmap-item">
                        <span className="roadmap-item-dot" style={{ background: step.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="roadmap-time">⏱ {time}</div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="roadmap-footer-note">
          <div className="roadmap-footer-card">
            <div style={{ fontSize: 32, marginBottom: 8 }}>🚀</div>
            <p>{lang === 'tj'
              ? 'Ҳар рӯз 1-2 соат омӯзиш = дар 6-8 моҳ ба кор омода аст'
              : 'Занимаясь 1–2 часа в день — через 6–8 месяцев ты готов к работе'
            }</p>
          </div>
        </div>
      </div>
    </div>
  )
}
