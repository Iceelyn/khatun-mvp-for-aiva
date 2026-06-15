import { useState } from 'react'
import { useKhatunStore, updateStore } from '../lib/store'
import { useT } from '../i18n/index.jsx'

const STREAK_GOAL = 7
const todayKey = () => new Date().toISOString().slice(0, 10)

// Joyful micro-challenges — progress only, no real money movement.
export default function Challenges() {
  const store = useKhatunStore()
  const { t } = useT()
  const ch = store.challenges || {}
  const days = ch.streakDays || []
  const monthly = ch.monthly || { target: 0, saved: 0 }
  const [target, setTarget] = useState(monthly.target || '')
  const [add, setAdd] = useState('')

  const taggedToday = days.includes(todayKey())
  const streak = Math.min(days.length, STREAK_GOAL)
  const streakDone = streak >= STREAK_GOAL

  const logDay = () => {
    if (taggedToday) return
    updateStore({
      challenges: { ...ch, streakDays: [...days, todayKey()] },
    })
  }

  const setMonthlyTarget = (e) => {
    e.preventDefault()
    const t = parseInt(target, 10) || 0
    updateStore({ challenges: { ...ch, monthly: { target: t, saved: monthly.saved || 0 } } })
  }

  const logSaved = (e) => {
    e.preventDefault()
    const amt = parseInt(add, 10) || 0
    if (!amt) return
    updateStore({
      challenges: {
        ...ch,
        monthly: { target: monthly.target || 0, saved: (monthly.saved || 0) + amt },
      },
    })
    setAdd('')
  }

  const savedPct = monthly.target
    ? Math.min(100, Math.round(((monthly.saved || 0) / monthly.target) * 100))
    : 0
  const monthlyDone = monthly.target > 0 && (monthly.saved || 0) >= monthly.target

  return (
    <div className="challenges">
      <h3 className="journey__sub-title">{t('challenges.title')}</h3>

      {/* 7-day streak */}
      <div className={`challenge ${streakDone ? 'is-done' : ''}`}>
        <div className="challenge__head">
          <span className="challenge__name">{t('challenges.streakName')}</span>
          <span className="challenge__count">
            {streak}/{STREAK_GOAL}
          </span>
        </div>
        <div className="challenge__dots" aria-hidden="true">
          {Array.from({ length: STREAK_GOAL }).map((_, i) => (
            <span key={i} className={`challenge__dot ${i < streak ? 'is-on' : ''}`} />
          ))}
        </div>
        {streakDone ? (
          <p className="challenge__win">{t('challenges.streakWin')}</p>
        ) : (
          <button className="btn btn--gold challenge__btn" onClick={logDay} disabled={taggedToday}>
            {taggedToday ? t('challenges.streakTagged') : t('challenges.streakBtn')}
          </button>
        )}
      </div>

      {/* monthly save challenge */}
      <div className={`challenge ${monthlyDone ? 'is-done' : ''}`}>
        <div className="challenge__head">
          <span className="challenge__name">{t('challenges.monthlyName')}</span>
          {monthly.target > 0 && (
            <span className="challenge__count">
              {(monthly.saved || 0).toLocaleString()} / {monthly.target.toLocaleString()}₮
            </span>
          )}
        </div>

        {monthly.target > 0 ? (
          <>
            <div className="challenge__bar">
              <span style={{ width: `${savedPct}%` }} />
            </div>
            {monthlyDone ? (
              <p className="challenge__win">{t('challenges.monthlyWin')}</p>
            ) : (
              <form className="challenge__form" onSubmit={logSaved}>
                <input
                  className="result__input"
                  type="number"
                  inputMode="numeric"
                  placeholder={t('challenges.monthlyAddPh')}
                  value={add}
                  onChange={(e) => setAdd(e.target.value)}
                />
                <button className="btn btn--gold" type="submit">
                  {t('challenges.monthlyAdd')}
                </button>
              </form>
            )}
          </>
        ) : (
          <form className="challenge__form" onSubmit={setMonthlyTarget}>
            <input
              className="result__input"
              type="number"
              inputMode="numeric"
              placeholder={t('challenges.monthlyTargetPh')}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
            <button className="btn btn--gold" type="submit">
              {t('challenges.monthlySet')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
