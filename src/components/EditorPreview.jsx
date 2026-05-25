import React, { useRef, useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { css as cssLang } from '@codemirror/lang-css'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'

export default function EditorPreview({ level, onComplete, completed, onUseHint }) {
  const [code, setCode] = useState(level.template)
  const previewRef = useRef(null)
  const styleRef = useRef(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')
  const [showHint, setShowHint] = useState(false)
  const [hintUsed, setHintUsed] = useState(false)

  useEffect(() => {
    setCode(level.template)
    setMessage('')
    setShowHint(false)
    setHintUsed(false)
  }, [level.id])

  useEffect(() => {
    const root = previewRef.current
    if (!root) return
    let st = root.querySelector('#injected-style')
    if (!st) {
      st = document.createElement('style')
      st.id = 'injected-style'
      root.appendChild(st)
    }
    styleRef.current = st
    st.textContent = code
  }, [code, level.id])

  function runPreview() {
    if (styleRef.current) styleRef.current.textContent = code
    setMessage('Стиль применён')
    setMessageType('info')
  }

  function checkLevel() {
    if (styleRef.current) styleRef.current.textContent = code
    const root = previewRef.current
    const ok = level.validator(root)
    if (ok) {
      setMessage('✓ Уровень пройден!')
      setMessageType('ok')
      onComplete()
    } else {
      setMessage('✗ Пока не верно — попробуй ещё')
      setMessageType('error')
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
      <div className="level-header-bar">
        <span className="level-header-title">{level.title}</span>
        {completed && <span className="badge">✓ Готово</span>}
        <span className="level-header-desc">{level.description}</span>
      </div>

      <div className="ep-split">
        <div className="editor-pane">
          <div className="tab-bar">
            <div className="file-tab">
              <span className="file-tab-icon">◈</span>
              <span>styles.css</span>
            </div>
          </div>

          <div className="editor-scroll">
            <CodeMirror
              value={code}
              height="100%"
              extensions={[cssLang()]}
              theme={vscodeDark}
              onChange={(val) => setCode(val)}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLine: true,
                highlightActiveLineGutter: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                indentOnInput: true,
                foldGutter: false,
                tabSize: 2,
              }}
            />
          </div>

          <div className="editor-controls">
            <button className="btn btn-run" onClick={runPreview}>▶ Run</button>
            <button className="btn btn-check" onClick={checkLevel}>✓ Check</button>
            <button className="btn btn-hint" onClick={handleShowHint}>? Подсказка (-10)</button>
            {message && <span className={`ep-message ${messageType}`}>{message}</span>}
          </div>

          {showHint && <div className="hint-box">{level.hint}</div>}
        </div>

        <div className="preview-pane">
          <div className="preview-tab-bar">
            <div className="preview-tab">
              <span>⬡</span>
              <span>Preview</span>
            </div>
          </div>
          <div className="preview-scroll">
            <div className="preview-root" ref={previewRef}>
              <div dangerouslySetInnerHTML={{ __html: level.html }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
