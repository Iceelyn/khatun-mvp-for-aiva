import { useState } from 'react'
import Emblem from './Emblem'
import { useKhatunStore, hasJourney } from '../lib/store'
import { buildRoadmap, detectProduct } from '../lib/recommendation'
import { useT, format } from '../i18n/index.jsx'

// Smart landing strip — a one-tap return into her Journey for returning visitors.
export default function ReturnStrip({ onContinue }) {
  const store = useKhatunStore()
  const { t } = useT()
  const [dismissed, setDismissed] = useState(false)

  if (dismissed || !hasJourney()) return null

  const key = store.productKey || detectProduct(store.reply || '')
  const steps = buildRoadmap(key, t)
  const done = store.roadmap?.done || []
  const nextStep = steps.find((_, i) => !done.includes(i)) || steps[steps.length - 1]

  return (
    <div className="return-strip">
      <div className="container return-strip__inner">
        <Emblem size={40} />
        <div className="return-strip__text">
          <p className="return-strip__hi">
            {store.profile?.name
              ? format(t('welcome.hi'), { name: store.profile.name })
              : t('welcome.hiAnon')}
          </p>
          {nextStep && (
            <p className="return-strip__next">
              <span className="return-strip__next-label">{t('welcome.next')}:</span>{' '}
              {nextStep.title}
            </p>
          )}
        </div>
        <button className="btn btn--primary return-strip__cta" onClick={onContinue}>
          {t('welcome.cta')}
        </button>
        <button
          className="return-strip__dismiss"
          onClick={() => setDismissed(true)}
          aria-label={t('welcome.dismiss')}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
