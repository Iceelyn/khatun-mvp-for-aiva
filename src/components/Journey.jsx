import { useState } from 'react'
import { useKhatunStore, updateStore } from '../lib/store'
import Roadmap from './Roadmap'
import Challenges from './Challenges'
import Reminders from './Reminders'

// "Аяллаа хадгалах" — optional, local-only profile that unlocks the roadmap,
// challenges and reminders. Never blocks the core flow (skip is always offered).
export default function Journey({ reply }) {
  const store = useKhatunStore()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  const save = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    const c = contact.trim()
    updateStore({
      journeyStarted: true,
      profile: {
        name: trimmed,
        contact: c,
        contactType: c.includes('@') ? 'email' : c ? 'phone' : null,
      },
    })
  }

  const skip = () => updateStore({ journeyStarted: true })

  if (!store.journeyStarted) {
    return (
      <section className="journey journey--intro">
        <h2 className="journey__title">Аяллаа хадгалах уу?</h2>
        <p className="journey__sub">
          Заавал биш. Хадгалбал 30 хоногийн зам, сорилт, сануулга чинь нээгдэж,
          дараа орж ирэхэд дараагийн алхамаас чинь үргэлжилнэ.
        </p>
        <form className="journey__form" onSubmit={save}>
          <label className="sr-only" htmlFor="j-name">
            Нэр
          </label>
          <input
            id="j-name"
            className="result__input"
            placeholder="Нэр (заавал биш)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            autoComplete="off"
          />
          <label className="sr-only" htmlFor="j-contact">
            Утас эсвэл и-мэйл
          </label>
          <input
            id="j-contact"
            className="result__input"
            placeholder="Утас эсвэл и-мэйл (заавал биш)"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            maxLength={60}
            autoComplete="off"
          />
          <div className="journey__actions">
            <button className="btn btn--gold" type="submit">
              Аяллаа хадгалах
            </button>
            <button className="btn btn--ghost result__btn-ghost" type="button" onClick={skip}>
              Бүртгэлгүй үргэлжлүүлэх
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
            ? `${store.profile.name}, аялал чинь эхэллээ ✨`
            : 'Аялал чинь эхэллээ ✨'}
        </h2>
        {store.profile?.contact && (
          <p className="journey__future">
            SMS/и-мэйл сануулга — удахгүй нэмэгдэх боломж. Одоохондоо доорх
            хэрэгслүүдээр сануулгаа тохируул.
          </p>
        )}
      </div>

      <Roadmap reply={reply} />
      <Challenges />
      <Reminders />
    </section>
  )
}
