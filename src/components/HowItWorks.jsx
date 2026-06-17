import { useState } from 'react'
import { useT } from '../i18n/index.jsx'

// Transparency-by-design panel (collapsed by default): how Khatun AI works,
// what it won't do, and that it's private with no login.
export default function HowItWorks() {
  const { t } = useT()
  const [open, setOpen] = useState(false)
  const items = t('howItWorks.items')

  return (
    <div className="disclosure">
      <button
        className="disclosure__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        🛡️ {t('howItWorks.title')} <span>{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <ul className="howitworks">
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
