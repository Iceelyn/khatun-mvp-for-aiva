import { useState } from 'react'
import { useKhatunStore, updateStore } from '../lib/store'
import { buildICS, downloadICS } from '../lib/ics'

// Lightweight reminders: browser Notification + "add to calendar" (.ics).
// No backend. SMS/email noted as a future option for saved profiles.
export default function Reminders() {
  const store = useKhatunStore()
  const [status, setStatus] = useState('')

  const enableNotification = async () => {
    if (!('Notification' in window)) {
      setStatus('Энэ хөтөч мэдэгдэл дэмждэггүй.')
      return
    }
    try {
      const perm = await Notification.requestPermission()
      if (perm === 'granted') {
        new Notification('Хатун 💛', {
          body: 'Дараагийн санхүүгийн алхамаа битгий март. Чи чадна!',
        })
        updateStore({ reminderSet: true })
        setStatus('Мэдэгдэл идэвхжлээ ✓')
      } else {
        setStatus('Мэдэгдэл идэвхжсэнгүй — хүссэн үедээ дахин оролдоорой.')
      }
    } catch {
      setStatus('Мэдэгдэл тохируулж чадсангүй.')
    }
  }

  const addToCalendar = () => {
    const start = new Date()
    start.setDate(start.getDate() + 1)
    start.setHours(10, 0, 0, 0)
    const ics = buildICS({
      title: 'Хатун: дараагийн санхүүгийн алхам',
      description:
        'Өнөөдөр жижигхэн алхам хий — хадгаламж/хөрөнгө оруулалтаа нэг алхмаар урагшлуул. — Хатун',
      start,
    })
    downloadICS('khatun-sanuulga.ics', ics)
    setStatus('Календарийн файл татагдлаа ✓')
  }

  return (
    <div className="reminders">
      <h3 className="journey__sub-title">Сануулга тохируулах</h3>
      <div className="reminders__btns">
        <button className="btn btn--gold" onClick={enableNotification}>
          {store.reminderSet ? '🔔 Мэдэгдэл идэвхтэй' : 'Хөтчийн мэдэгдэл асаах'}
        </button>
        <button className="btn btn--ghost result__btn-ghost" onClick={addToCalendar}>
          Календарьт нэмэх (.ics)
        </button>
      </div>
      {status && <p className="reminders__status">{status}</p>}
      {store.profile?.contact && (
        <p className="reminders__future">
          SMS/и-мэйл сануулга удахгүй — {store.profile.contact} хаягт.
        </p>
      )}
    </div>
  )
}
