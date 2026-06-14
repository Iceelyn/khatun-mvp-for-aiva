import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Emblem from './Emblem'
import useReducedMotion from '../hooks/useReducedMotion'
import { parseReply, renderInline, getSuggestions } from '../lib/parseReply'

// Lazy gold-dust background so three.js never blocks the result render.
const GoldDust = lazy(() => import('./GoldDust'))

// Immersive, full-screen recommendation display (deep maroon + cream).
export default function Result({
  reply,
  onFollowUp,
  followUps,
  loadingFollowUp,
  onRestart,
  onClose,
}) {
  const [text, setText] = useState('')
  const [usedChips, setUsedChips] = useState([])
  const scope = useRef(null)
  const reduced = useReducedMotion()

  const nodes = useMemo(() => parseReply(reply), [reply])
  const suggestions = useMemo(() => getSuggestions(reply), [reply])
  const chips = suggestions.filter((s) => !usedChips.includes(s))

  // GSAP entrance choreography.
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.result__logo', { opacity: 0, scale: 0.82, duration: 0.9 })
        .from('.result__eyebrow', { opacity: 0, y: 14, duration: 0.6 }, '-=0.4')
        .from(
          '.result__body > :not(.result__divider)',
          { opacity: 0, y: 26, duration: 0.7, stagger: 0.1 },
          '-=0.3'
        )
        .from(
          '.result__divider',
          { scaleX: 0, opacity: 0, duration: 0.9, ease: 'power2.out', stagger: 0.12 },
          '<0.1'
        )
        .from('.result__ask', { opacity: 0, y: 22, duration: 0.7 }, '-=0.3')
        .from('.result__actions', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
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
        <header className="result__top">
          <Emblem size={112} className="result__logo" />
          <p className="eyebrow result__eyebrow">Хатуны зөвлөмж</p>
        </header>

        <article className="result__body">
          {nodes.map((n, i) => {
            if (n.type === 'divider')
              return <span key={i} className="result__divider" aria-hidden="true" />
            if (n.type === 'heading') {
              if (n.level === 1) {
                const [pre, ...rest] = n.text.split(':')
                const title = rest.length ? rest.join(':').trim() : n.text
                return (
                  <h1 key={i} className="result__title">
                    {rest.length > 0 && (
                      <span className="result__title-eyebrow">{pre.trim()}</span>
                    )}
                    {title}
                  </h1>
                )
              }
              return (
                <h2 key={i} className="result__section">
                  {n.text}
                </h2>
              )
            }
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

        {followUps.length > 0 && (
          <div className="result__thread">
            {followUps.map((f, i) => (
              <div className="result__qa" key={i}>
                <p className="result__question">{f.question}</p>
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

        {loadingFollowUp && (
          <p className="result__typing">Хатун бичиж байна…</p>
        )}

        <div className="result__ask">
          {chips.length > 0 && (
            <div className="result__chips" role="list" aria-label="Санал болгож буй асуултууд">
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
              Хатунаас нэмж асуух
            </label>
            <input
              id="followup"
              type="text"
              className="result__input"
              placeholder="Нэмж асуух зүйл байна уу?"
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
              Илгээх
            </button>
          </form>

          <p className="result__note">
            Энэ бол найрсаг чиглүүлэг — лицензтэй санхүүгийн зөвлөгөө биш.
            Эцсийн шийдвэр чинийх. 💛
          </p>
        </div>

        <div className="result__actions">
          <button className="btn btn--ghost result__btn-ghost" onClick={onRestart}>
            Дахин эхлэх
          </button>
          <button className="btn btn--gold" onClick={onClose}>
            Дуусгах
          </button>
        </div>
      </div>
    </section>
  )
}
