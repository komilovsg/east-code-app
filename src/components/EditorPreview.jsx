import React, { useRef, useState, useEffect } from 'react'

export default function EditorPreview({ level, onComplete, completed, onUseHint }) {
  const [css, setCss] = useState(level.template)
  const previewRef = useRef(null)
  const styleRef = useRef(null)
  const [message, setMessage] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [hintUsed, setHintUsed] = useState(false)

  useEffect(() => {
    setCss(level.template)
    setMessage('')
  }, [level.id])

  useEffect(() => {
    // ensure a style tag exists inside preview root
    const root = previewRef.current
    if (!root) return
    let st = root.querySelector('#injected-style')
    if (!st) {
      st = document.createElement('style')
      st.id = 'injected-style'
      root.appendChild(st)
    }
    styleRef.current = st
    st.textContent = css
  }, [css, level.id])

  function runPreview() {
    if (styleRef.current) styleRef.current.textContent = css
    setMessage('Стиль применён')
  }

  function checkLevel() {
    if (styleRef.current) styleRef.current.textContent = css
    const root = previewRef.current
    const ok = level.validator(root)
    if (ok) {
      setMessage('Уровень пройден!')
      onComplete()
    } else {
      setMessage('Пока не верно — попробуй ещё')
    }
  }

  function handleShowHint() {
    setShowHint(true)
    if (!hintUsed && typeof onUseHint === 'function') {
      onUseHint(level.id)
      setHintUsed(true)
    }
  }

  return (
    <div className="editor-preview">
      <div className="editor-pane">
        <h3>{level.title} {completed ? <span className="badge">Готово</span> : null}</h3>
        <p className="hint">{level.hint}</p>
        <textarea value={css} onChange={e => setCss(e.target.value)} />
        <div className="controls">
          <button onClick={runPreview}>Run</button>
          <button onClick={checkLevel}>Check</button>
          <button onClick={handleShowHint} className="hint-btn">Подсказка (-10)</button>
        </div>
        <div className="message">{message}</div>
        {showHint ? <div className="hint-box">{level.hint}</div> : null}
      </div>
      <div className="preview-pane">
        <div className="preview-root" ref={previewRef}>
          <div dangerouslySetInnerHTML={{ __html: level.html }} />
        </div>
      </div>
    </div>
  )
}
