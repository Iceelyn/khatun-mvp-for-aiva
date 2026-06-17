import { useState } from 'react'
import { useKhatunStore, updateStore } from '../lib/store'
import {
  detectProduct,
  productName,
  productSteps,
  getAmountRange,
  getWhy,
} from '../lib/recommendation'
import { useT } from '../i18n/index.jsx'

const EMOJI = { deposit: '🏦', bond: '📜', ett: '💎', mse: '📈' }

// Polished, structured "first step" card: product, comfortable amount range,
// the exact 3 steps, a "Done" button, and a "Why this?" toggle.
export default function ActionCard({ reply, answers = {} }) {
  const store = useKhatunStore()
  const { t } = useT()
  const [showWhy, setShowWhy] = useState(false)

  const key = store.productKey || detectProduct(reply)
  const steps = productSteps(key, t)
  const amount = getAmountRange(answers.leftover, t)
  const why = getWhy(answers, t)

  const done = (store.roadmap?.done || []).includes(0)
  const markDone = () => {
    const prev = store.roadmap?.done || []
    updateStore({
      roadmap: { ...(store.roadmap || {}), done: [...new Set([...prev, 0])] },
    })
  }

  return (
    <div className={`action-card ${done ? 'action-card--done' : ''}`}>
      <div className="action-card__head">
        <span className="action-card__emoji" aria-hidden="true">
          {EMOJI[key]}
        </span>
        <div>
          <p className="action-card__eyebrow">{t('actionCard.eyebrow')}</p>
          <h2 className="action-card__product">{productName(key, t)}</h2>
        </div>
      </div>

      <div className="action-card__amount">
        <span className="action-card__amount-label">{t('actionCard.amountLabel')}</span>
        <p>{amount}</p>
        <p className="action-card__amount-note">⚠ {t('actionCard.amountNote')}</p>
      </div>

      <ol className="action-card__steps">
        {steps.map((s, i) => (
          <li key={i}>
            <span className="action-card__num">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      <div className="action-card__foot">
        <button
          className={`btn ${done ? 'btn--ghost' : 'btn--primary'} action-card__done`}
          onClick={markDone}
          disabled={done}
        >
          {done ? t('actionCard.doneState') : t('actionCard.done')}
        </button>
        <button
          className="action-card__why-toggle"
          onClick={() => setShowWhy((v) => !v)}
          aria-expanded={showWhy}
        >
          {t('actionCard.why')} {showWhy ? '▴' : '▾'}
        </button>
      </div>

      {showWhy && <p className="action-card__why">{why}</p>}
    </div>
  )
}
