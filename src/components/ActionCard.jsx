import { useState } from 'react'
import { useKhatunStore, updateStore } from '../lib/store'
import {
  PRODUCTS,
  detectProduct,
  getAmountRange,
  getWhy,
} from '../lib/recommendation'

// Polished, structured "first step" card: product, comfortable amount range,
// the exact 3 steps, a "Хийсэн" button, and a "Яагаад энэ вэ?" toggle.
export default function ActionCard({ reply, answers = {} }) {
  const store = useKhatunStore()
  const [showWhy, setShowWhy] = useState(false)

  const key = store.productKey || detectProduct(reply)
  const product = PRODUCTS[key] || PRODUCTS.deposit
  const amount = getAmountRange(answers.leftover)
  const why = getWhy(answers)

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
          {product.emoji}
        </span>
        <div>
          <p className="action-card__eyebrow">Чиний эхний алхам</p>
          <h2 className="action-card__product">{product.name}</h2>
        </div>
      </div>

      <div className="action-card__amount">
        <span className="action-card__amount-label">Тав тухтай эхлэх хэмжээ</span>
        <p>{amount}</p>
      </div>

      <ol className="action-card__steps">
        {product.steps.map((s, i) => (
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
          {done ? '✓ Хийсэн' : 'Хийсэн'}
        </button>
        <button
          className="action-card__why-toggle"
          onClick={() => setShowWhy((v) => !v)}
          aria-expanded={showWhy}
        >
          Яагаад энэ вэ? {showWhy ? '▴' : '▾'}
        </button>
      </div>

      {showWhy && <p className="action-card__why">{why}</p>}
    </div>
  )
}
