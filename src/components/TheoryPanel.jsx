import React, { useState } from 'react'
import { useLang } from '../i18n/index.jsx'

function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) =>
      `<pre class="theory-code"><code>${escapeHtml(code.trim())}</code></pre>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="theory-inline-code">$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

export default function TheoryPanel({ level }) {
  const { lang, t } = useLang()
  const [open, setOpen] = useState(false)
  const theoryText = lang === 'tj' ? level.theory_tj : level.theory_ru
  if (!theoryText) return null

  return (
    <div className={`theory-panel ${open ? 'open' : ''}`}>
      <button className="theory-toggle" onClick={() => setOpen(o => !o)}>
        {open ? t.hide_theory : t.show_theory}
        <span className="theory-arrow">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div
          className="theory-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(theoryText) }}
        />
      )}
    </div>
  )
}
