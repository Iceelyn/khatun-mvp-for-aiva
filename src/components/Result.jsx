import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Emblem from './Emblem'
import ActionCard from './ActionCard'
import InflationChart from './InflationChart'
import HowItWorks from './HowItWorks'
import useReducedMotion from '../hooks/useReducedMotion'
import { parseReply, renderInline } from '../lib/parseReply'
import { getSuggestions } from '../lib/recommendation'
import { useT } from '../i18n/index.jsx'

const GoldDust = lazy(() => import('./GoldDust'))

// RESULT = the payoff only. Action card + inflation, with the long explanation
// and the follow-up chat collapsed by default. One primary CTA → Journey.
export default function Result({
  reply,
  answers = {},
  onFollowUp,
  followUps,
  loadingFollowUp,
  onRestart,
  onOpenJourney,
}) {
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [usedChips, setUsedChips] = useState([])
  const [showExplain, setShowExplain] = useState(false)
  const [showFollow, setShowFollow] = useState(followUps.length > 0)
  const scope = useRef(null)
  const reduced = useReducedMotion()
  const { t, lang } = useT()

  const nodes = useMemo(() => parseReply(reply), [reply])
  const suggestions = useMemo(() => getSuggestions(reply, t), [reply, lang, t])
  const chips = suggestions.filter((s) => !usedChips.includes(s))

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('[data-rv]', {
        opacity: 0,
        y: 26,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, scope)
    return () => ctx.revert()
  }, [reduced, reply])

  const ask = (q) => {
    const question = q.trim()
    if (!question || loadingFollowUp) return
    onFollowUp(question)
  }
  const onChip = (q) => {
    setUsedChips((u) => [...u, q])
    ask(q)
  }
  const submit = (e) => {
    e.preventDefault()
    ask(text)
    setText('')
  }

  return (
    <section className="result" ref={scope}>
      {!reduced && (
        <Suspense fallback={null}>
          <GoldDust />
        </Suspense>
      )}

      <div className="result__inner">
        <header className="result__top" data-rv>
          <Emblem size={96} className="result__logo" />
          <p className="eyebrow result__eyebrow">{t('result.eyebrow')}</p>
        </header>

        <div data-rv>
          <ActionCard reply={reply} answers={answers} />
        </div>

        {/* collapsed-by-default long explanation */}
        {nodes.length > 0 && (
          <div className="disclosure" data-rv>
            <button
              className="disclosure__toggle"
              onClick={() => setShowExplain((v) => !v)}
              aria-expanded={showExplain}
            >
              {t('result.explainToggle')} <span>{showExplain ? '▴' : '▾'}</span>
            </button>
            {showExplain && (
              <article className="result__body">
                {nodes.map((n, i) => {
                  if (n.type === 'divider')
                    return <span key={i} className="result__divider" aria-hidden="true" />
                  if (n.type === 'heading')
                    return n.level === 1 ? (
                      <h3 key={i} className="result__section">
                        {n.text}
                      </h3>
                    ) : (
                      <h3 key={i} className="result__section">
                        {n.text}
                      </h3>
                    )
                  if (n.type === 'note')
                    return (
                      <p key={i} className="result__disclaimer">
                        {renderInline(n.text)}
                      </p>
                    )
                  return (
                    <p key={i} className="result__p">
                      {renderInline(n.text)}
                    </p>
                  )
                })}
              </article>
            )}
          </div>
        )}

        <div data-rv>
          <InflationChart />
        </div>

        {/* collapsed-by-default follow-up */}
        <div className="disclosure" data-rv>
          <button
            className="disclosure__toggle"
            onClick={() => setShowFollow((v) => !v)}
            aria-expanded={showFollow}
          >
            {t('result.followToggle')} <span>{showFollow ? '▴' : '▾'}</span>
          </button>

          {showFollow && (
            <div className="result__ask">
              {followUps.length > 0 && (
                <div className="result__thread">
                  {followUps.map((f, i) => (
                    <div className="result__qa" key={i}>
                      <p className="result__question">{f.question}</p>
                      {f.distress && (
                        <div className="safety-note" role="note">
                          <strong>{t('safety.title')}</strong>
                          <p>{t('safety.body')}</p>
                        </div>
                      )}
                      <div className="result__answer">
                        {parseReply(f.answer).map((n, j) =>
                          n.type === 'divider' ? (
                            <span key={j} className="result__divider" aria-hidden="true" />
                          ) : (
                            <p key={j}>{renderInline(n.text)}</p>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {loadingFollowUp && <p className="result__typing">{t('result.typing')}</p>}

              {chips.length > 0 && (
                <div className="result__chips" role="list" aria-label={t('result.suggestionsAria')}>
                  {chips.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className="chip"
                      role="listitem"
                      onClick={() => onChip(c)}
                      disabled={loadingFollowUp}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              <form className="result__form" onSubmit={submit}>
                <label className="sr-only" htmlFor="followup">
                  {t('result.askAria')}
                </label>
                <input
                  id="followup"
                  type="text"
                  className="result__input"
                  placeholder={t('result.askPlaceholder')}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={300}
                  autoComplete="off"
                />
                <button
                  className="btn btn--gold"
                  type="submit"
                  disabled={!text.trim() || loadingFollowUp}
                >
                  {t('result.send')}
                </button>
              </form>
            </div>
          )}
        </div>

        <div data-rv>
          <HowItWorks />
        </div>

        <p className="result__disclaimer-bar">{t('result.disclaimerBar')}</p>

        {/* one primary CTA → Journey, with a quiet folded save */}
        <div className="result__cta-zone" data-rv>
          <input
            className="result__name-input"
            type="text"
            placeholder={t('result.saveNamePh')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            autoComplete="off"
            aria-label={t('result.saveNamePh')}
          />
          <button className="btn btn--primary result__journey-cta" onClick={() => onOpenJourney(name)}>
            {t('result.journeyCta')} →
          </button>
          <p className="result__save-hint">{t('result.saveHint')}</p>
          <button className="result__restart-link" onClick={onRestart}>
            {t('result.restart')}
          </button>
        </div>
      </div>
    </section>
  )
}
