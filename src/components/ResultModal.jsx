import React from 'react'
import { useLang } from '../i18n/index.jsx'

function getJsErrorTip(error, t) {
  if (!error) return null
  const e = error.toLowerCase()
  if (e.includes('is not defined') || e.includes('not defined')) return t.tip_notdefined
  if (e.includes('unexpected token') || e.includes('syntaxerror') || e.includes('unexpected end')) return t.tip_syntax
  if (e.includes('typeerror') || e.includes('cannot read') || e.includes('null')) return t.tip_typeerror
  return null
}

function getGenericTip(type, t) {
  if (type === 'css') return t.tip_css
  if (type === 'html') return t.tip_html
  return t.tip_js
}

export default function ResultModal({
  show,
  success,
  level,
  jsError,
  onNext,
  onStay,
  onRetry,
  hasNext,
}) {
  const { lang, t } = useLang()
  if (!show) return null

  const title = lang === 'tj' ? level.title_tj : level.title_ru
  const levelType = level.type || 'js'

  const smartTip = success
    ? null
    : getJsErrorTip(jsError, t) || getGenericTip(levelType, t)

  return (
    <div className="modal-overlay" onClick={success ? undefined : onStay}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        {success ? (
          <>
            <div className="modal-icon success-icon">🎉</div>
            <h2 className="modal-title success">{t.modal_success_title}</h2>
            <p className="modal-level-name">{title}</p>
            <div className="modal-xp-badge">{t.modal_xp}</div>
            <p className="modal-motivate">
              Отличная работа! Код написан верно. Продолжай в том же духе!
            </p>
            <div className="modal-actions">
              {hasNext && (
                <button className="modal-btn primary" onClick={onNext}>
                  {t.modal_next}
                </button>
              )}
              <button className="modal-btn secondary" onClick={onStay}>
                {t.modal_stay}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-icon fail-icon">💪</div>
            <h2 className="modal-title fail">{t.modal_fail_title}</h2>

            {jsError && (
              <div className="modal-error-block">
                <span className="modal-error-label">{t.modal_error_label}</span>
                <code className="modal-error-text">{jsError}</code>
              </div>
            )}

            {smartTip && (
              <div className="modal-tip-block">
                <span className="modal-tip-label">{t.modal_tip_label}</span>
                <p className="modal-tip-text">{smartTip}</p>
              </div>
            )}

            <div className="modal-actions">
              <button className="modal-btn primary" onClick={onRetry}>
                {t.modal_retry}
              </button>
              <button className="modal-btn secondary" onClick={onStay}>
                {t.modal_stay}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
