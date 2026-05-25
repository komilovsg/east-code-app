import React from 'react'

export default function Toasts({ items = [] }) {
  return (
    <div className="toasts-root">
      {items.map(t => (
        <div key={t.id} className="toast">{t.text}</div>
      ))}
    </div>
  )
}
