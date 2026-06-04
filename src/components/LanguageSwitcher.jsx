import React from 'react'
import { useLang } from '../i18n/index.jsx'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switcher">
      <button
        className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
        onClick={() => setLang('ru')}
        title="Русский"
      >RU</button>
      <button
        className={`lang-btn ${lang === 'tj' ? 'active' : ''}`}
        onClick={() => setLang('tj')}
        title="Тоҷикӣ"
      >TJ</button>
    </div>
  )
}
