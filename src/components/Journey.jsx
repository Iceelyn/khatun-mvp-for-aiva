import { useState } from 'react'
import { useKhatunStore, updateStore } from '../lib/store'
import Roadmap from './Roadmap'
import Challenges from './Challenges'
import Reminders from './Reminders'
import { useT, format } from '../i18n/index.jsx'

// "Save your journey" — optional, local-only profile that unlocks the roadmap,
// challenges and reminders. Never blocks the core flow (skip is always offered).
export default function Journey({ reply }) {
  const store = useKhatunStore()
  const { t } = useT()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  const save = (e) => {
    e.preventDefault()
    const c = contact.trim()
    updateStore({
      journeyStarted: true,
      profile: {
        name: name.trim(),
        contact: c,
        contactType: c.includes('@') ? 'email' : c ? 'phone' : null,
      },
    })
  }

  const skip = () => updateStore({ journeyStarted: true })

  if (!store.journeyStarted) {
    return (
      <section className="journey journey--intro">
        <h2 className="journey__title">{t('journey.introTitle')}</h2>
        <p className="journey__sub">{t('journey.introSub')}</p>
        <form className="journey__form" onSubmit={save}>
          <label className="sr-only" htmlFor="j-name">
            {t('journey.namePh')}
          </label>
          <input
            id="j-name"
            className="result__input"
            placeholder={t('journey.namePh')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            autoComplete="off"
          />
          <label className="sr-only" htmlFor="j-contact">
            {t('journey.contactPh')}
          </label>
          <input
            id="j-contact"
            className="result__input"
            placeholder={t('journey.contactPh')}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            maxLength={60}
            autoComplete="off"
          />
          <div className="journey__actions">
            <button className="btn btn--gold" type="submit">
              {t('journey.save')}
            </button>
            <button
              className="btn btn--ghost result__btn-ghost"
              type="button"
              onClick={skip}
            >
              {t('journey.skip')}
            </button>
          </div>
        </form>
      </section>
    )
  }

  return (
    <section className="journey">
      <div className="journey__welcome">
        <h2 className="journey__title">
          {store.profile?.name
            ? format(t('journey.welcomeNamed'), { name: store.profile.name })
            : t('journey.welcomeAnon')}
        </h2>
        {store.profile?.contact && <p className="journey__future">{t('journey.future')}</p>}
      </div>

      <Roadmap reply={reply} />
      <Challenges />
      <Reminders />
    </section>
  )
}
