import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Emblem from './Emblem'
import Roadmap from './Roadmap'
import Challenges from './Challenges'
import Reminders from './Reminders'
import useReducedMotion from '../hooks/useReducedMotion'
import { useKhatunStore } from '../lib/store'
import { buildRoadmap, detectProduct } from '../lib/recommendation'
import { useT, format } from '../i18n/index.jsx'

// Her companion home — one calm section at a time. Entered from the result CTA
// and from the landing returning strip.
export default function JourneyScreen({ reply, onBack, onClose }) {
  const store = useKhatunStore()
  const { t } = useT()
  const reduced = useReducedMotion()
  const scope = useRef(null)

  const key = store.productKey || detectProduct(reply || '')
  const total = buildRoadmap(key, t).length
  const done = (store.roadmap?.done || []).filter((i) => i < total).length

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-jr]', {
        opacity: 0,
        y: 26,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, scope)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="jscreen" ref={scope}>
      <div className="jscreen__inner">
        <header className="jscreen__top" data-jr>
          <Emblem size={64} />
          <p className="eyebrow">{t('journeyScreen.eyebrow')}</p>
          <h1 className="jscreen__title">{t('journeyScreen.header')}</h1>
          <div className="jscreen__progress" aria-label={`${done}/${total}`}>
            <span className="jscreen__progress-count">
              {done}/{total}
            </span>
            <span className="jscreen__progress-track">
              <span style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
            </span>
          </div>
        </header>

        <section className="jscreen__section" data-jr>
          <Roadmap reply={reply} />
        </section>

        <section className="jscreen__section" data-jr>
          <Challenges />
        </section>

        <section className="jscreen__section" data-jr>
          <Reminders />
        </section>

        <div className="jscreen__actions" data-jr>
          {onBack && (
            <button className="btn btn--ghost result__btn-ghost" onClick={onBack}>
              ← {t('journeyScreen.back')}
            </button>
          )}
          <button className="btn btn--gold" onClick={onClose}>
            {t('journeyScreen.done')}
          </button>
        </div>
      </div>
    </section>
  )
}
