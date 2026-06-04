import React, { useRef, useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { css as cssLang } from '@codemirror/lang-css'
import { html as htmlLang } from '@codemirror/lang-html'
import { javascript as jsLang } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { useLang } from '../i18n/index.jsx'
import TheoryPanel from './TheoryPanel.jsx'
import ResultModal from './ResultModal.jsx'

function getLangExt(type) {
  if (type === 'html') return htmlLang()
  if (type === 'js') return jsLang()
  return cssLang()
}

function getFileName(type) {
  if (type === 'html') return 'index.html'
  if (type === 'js') return 'script.js'
  return 'styles.css'
}

function runJS(code, previewRoot) {
  const logs = []
  const fakeConsole = {
    log: (...args) => logs.push(args.map(a => {
      try { return typeof a === 'object' ? JSON.stringify(a) : String(a) } catch { return String(a) }
    }).join(' ')),
    warn: (...args) => logs.push('[warn] ' + args.join(' ')),
    error: (...args) => logs.push('[err] ' + args.join(' ')),
    info: (...args) => logs.push(args.join(' ')),
  }
  try {
    const fn = new Function('console', 'document', code)
    fn(fakeConsole, previewRoot.ownerDocument)
  } catch (e) {
    return { logs, error: e.message }
  }
  return { logs, error: null }
}

export default function EditorPreview({ level, onComplete, completed, onUseHint, onNextLevel, hasNext }) {
  const { t, lang } = useLang()
  const [code, setCode] = useState(level.template)
  const previewRef = useRef(null)
  const iframeRef = useRef(null)
  const [consoleLogs, setConsoleLogs] = useState([])
  const [runStatus, setRunStatus] = useState(null) // null | 'ok' | 'error'
  const [runMsg, setRunMsg] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [hintUsed, setHintUsed] = useState(false)

  // Modal state
  const [modal, setModal] = useState({ show: false, success: false, jsError: null })

  const title = lang === 'tj' ? level.title_tj : level.title_ru
  const desc = lang === 'tj' ? level.desc_tj : level.desc_ru
  const hint = lang === 'tj' ? level.hint_tj : level.hint_ru
  const isJS = level.type === 'js'
  const isHTML = level.type === 'html'

  useEffect(() => {
    setCode(level.template)
    setRunStatus(null)
    setRunMsg('')
    setShowHint(false)
    setHintUsed(false)
    setConsoleLogs([])
    setModal({ show: false, success: false, jsError: null })
  }, [level.id])

  useEffect(() => {
    if (level.type !== 'css') return
    const root = previewRef.current
    if (!root) return
    let st = root.querySelector('#injected-style')
    if (!st) { st = document.createElement('style'); st.id = 'injected-style'; root.appendChild(st) }
    st.textContent = code
  }, [code, level.id, level.type])

  useEffect(() => {
    if (level.type !== 'html') return
    const iframe = iframeRef.current
    if (iframe) iframe.srcdoc = code
  }, [code, level.id, level.type])

  function applyCSS() {
    const root = previewRef.current
    if (!root) return
    let st = root.querySelector('#injected-style')
    if (!st) { st = document.createElement('style'); st.id = 'injected-style'; root.appendChild(st) }
    st.textContent = code
    setRunStatus('ok')
    setRunMsg(t.style_applied)
  }

  function applyHTML() {
    const iframe = iframeRef.current
    if (iframe) iframe.srcdoc = code
    setRunStatus('ok')
    setRunMsg(t.style_applied)
  }

  function applyJS() {
    const root = previewRef.current
    if (!root) return
    root.innerHTML = level.html || '<div></div>'
    const { logs, error } = runJS(code, root)
    if (error) {
      setConsoleLogs([{ text: `❌ ${t.js_error}: ${error}`, type: 'err' }])
      setRunStatus('error')
      setRunMsg(`${t.js_error}: ${error}`)
    } else {
      const mapped = logs.map(l => ({
        text: l,
        type: l.startsWith('[err]') ? 'err' : l.startsWith('[warn]') ? 'warn' : 'log',
      }))
      setConsoleLogs(mapped)
      setRunStatus('ok')
      setRunMsg(t.style_applied)
    }
  }

  function applyCode() {
    if (level.type === 'css') applyCSS()
    else if (level.type === 'html') applyHTML()
    else applyJS()
  }

  function checkLevel() {
    if (level.type === 'css') {
      const root = previewRef.current
      let st = root.querySelector('#injected-style')
      if (!st) { st = document.createElement('style'); st.id = 'injected-style'; root.appendChild(st) }
      st.textContent = code
      try {
        if (level.validator(root)) handlePass(null)
        else handleFail('CSS условие не выполнено. Проверь что значения свойств точно совпадают с заданием.')
      } catch(e) { handleFail(e.message) }
    } else if (level.type === 'html') {
      const iframe = iframeRef.current
      if (!iframe) return handleFail('Ошибка iframe')
      iframe.srcdoc = code
      setTimeout(() => {
        try {
          if (level.validator(iframe)) handlePass(null)
          else handleFail('HTML структура не соответствует заданию. Проверь теги и атрибуты.')
        } catch(e) { handleFail(e.message) }
      }, 350)
    } else {
      const root = previewRef.current
      if (!root) return handleFail('Ошибка DOM')
      root.innerHTML = level.html || '<div></div>'
      const { logs, error } = runJS(code, root)
      const mapped = logs.map(l => ({
        text: l,
        type: l.startsWith('[err]') ? 'err' : l.startsWith('[warn]') ? 'warn' : 'log',
      }))
      if (error) {
        mapped.push({ text: `❌ ${t.js_error}: ${error}`, type: 'err' })
        setConsoleLogs(mapped)
        return handleFail(error)
      }
      setConsoleLogs(mapped)
      try {
        if (level.validator(root, logs)) handlePass(null)
        else handleFail('Результат не совпадает с ожидаемым. Проверь console.log вывод и логику кода.')
      } catch(e) { handleFail(e.message) }
    }
  }

  function handlePass(err) {
    setModal({ show: true, success: true, jsError: null })
    onComplete()
  }

  function handleFail(errMsg) {
    setModal({ show: true, success: false, jsError: errMsg })
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
      <ResultModal
        show={modal.show}
        success={modal.success}
        level={level}
        jsError={modal.jsError}
        hasNext={hasNext}
        onNext={() => { setModal({ show: false, success: false, jsError: null }); onNextLevel() }}
        onStay={() => setModal({ show: false, success: false, jsError: null })}
        onRetry={() => setModal({ show: false, success: false, jsError: null })}
      />

      <div className="level-header-bar">
        <span className="level-header-title">{title}</span>
        {completed && <span className="badge">{t.done_badge}</span>}
        <span className="level-header-desc">{desc}</span>
      </div>

      <TheoryPanel level={level} />

      <div className="ep-split">
        {/* ── Editor ── */}
        <div className="editor-pane">
          <div className="tab-bar">
            <div className="file-tab">
              <span className="file-tab-icon">◈</span>
              <span>{getFileName(level.type)}</span>
            </div>
            {completed && <span className="tab-done-mark">✓ done</span>}
          </div>

          <div className="editor-scroll">
            <CodeMirror
              value={code}
              height="100%"
              extensions={[getLangExt(level.type)]}
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
            <button className="btn btn-run" onClick={applyCode}>{t.run}</button>
            <button className="btn btn-check" onClick={checkLevel}>{t.check}</button>
            <button className="btn btn-hint" onClick={handleShowHint}>
              {t.hint} <span className="hint-cost">{t.hint_cost}</span>
            </button>
            {runStatus && (
              <span className={`run-status ${runStatus}`}>
                {runStatus === 'ok' ? '✓' : '✗'} {runStatus === 'ok' ? runMsg : t.js_error}
              </span>
            )}
          </div>

          {showHint && (
            <div className="hint-box">
              <div className="hint-box-label">💡 Подсказка</div>
              {hint}
            </div>
          )}

          {/* Console for JS */}
          {isJS && (
            <div className="console-panel">
              <div className="console-header">
                <span className="console-title">▸ {t.console_output}</span>
                <button className="console-clear" onClick={() => setConsoleLogs([])}>
                  {t.clear_console}
                </button>
              </div>
              <div className="console-output">
                {consoleLogs.length === 0 ? (
                  <span className="console-empty">// Нажми ▶ Запустить</span>
                ) : (
                  consoleLogs.map((entry, i) => (
                    <div key={i} className={`console-line ${entry.type || 'log'}`}>
                      <span className="console-arrow">›</span>
                      <span>{entry.text}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Preview ── */}
        <div className="preview-pane">
          <div className="preview-tab-bar">
            <div className="preview-tab">
              <span className="preview-tab-dot" />
              <span className="preview-tab-dot orange" />
              <span className="preview-tab-dot green" />
              <span className="preview-tab-label">Preview</span>
            </div>
          </div>

          <div className={`preview-scroll ${isHTML ? 'html-mode' : 'dark-mode'}`}>
            {isHTML ? (
              <iframe
                ref={iframeRef}
                className="html-preview-iframe"
                title="preview"
                sandbox="allow-scripts allow-same-origin"
                srcDoc={code}
              />
            ) : (
              <div className="preview-root dark" ref={previewRef}>
                <div dangerouslySetInnerHTML={{ __html: level.html }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
