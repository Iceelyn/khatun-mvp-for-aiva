import { useKhatunStore, updateStore } from '../lib/store'
import { buildRoadmap, detectProduct } from '../lib/recommendation'
import { useT, format } from '../i18n/index.jsx'

// Visual 30-day timeline. Always surfaces her NEXT step. Progress persists.
export default function Roadmap({ reply }) {
  const store = useKhatunStore()
  const { t } = useT()
  const key = store.productKey || detectProduct(reply || '')
  const steps = buildRoadmap(key, t)
  const done = store.roadmap?.done || []

  const toggle = (i) => {
    const set = new Set(done)
    set.has(i) ? set.delete(i) : set.add(i)
    updateStore({ roadmap: { ...(store.roadmap || {}), done: [...set] } })
  }

  const nextIndex = steps.findIndex((_, i) => !done.includes(i))
  const completed = done.filter((i) => i < steps.length).length

  return (
    <div className="roadmap">
      <div className="roadmap__head">
        <h3 className="roadmap__title">{t('roadmap.title')}</h3>
        <span className="roadmap__count">
          {completed}/{steps.length}
        </span>
      </div>

      <ol className="roadmap__list">
        {steps.map((s, i) => {
          const isDone = done.includes(i)
          const isNext = i === nextIndex
          return (
            <li
              key={i}
              className={`roadmap__item ${isDone ? 'is-done' : ''} ${
                isNext ? 'is-next' : ''
              }`}
            >
              <button
                className="roadmap__check"
                onClick={() => toggle(i)}
                aria-pressed={isDone}
                aria-label={t('roadmap.checkAria')}
              >
                {isDone ? '✓' : ''}
              </button>
              <div className="roadmap__body">
                <span className="roadmap__day">
                  {format(t('roadmap.day'), { day: s.day })}
                </span>
                {isNext && <span className="roadmap__badge">{t('roadmap.next')}</span>}
                <p className="roadmap__step-title">{s.title}</p>
                <p className="roadmap__hint">{s.hint}</p>
              </div>
            </li>
          )
        })}
      </ol>

      {nextIndex === -1 && <p className="roadmap__done-msg">{t('roadmap.doneMsg')}</p>}
    </div>
  )
}
