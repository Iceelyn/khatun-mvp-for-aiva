import { useState } from 'react'
import { useKhatunStore, updateStore } from '../lib/store'
import { buildICS, downloadICS } from '../lib/ics'
import { useT, format } from '../i18n/index.jsx'

// Lightweight reminders: browser Notification + "add to calendar" (.ics).
// No backend. SMS/email noted as a future option for saved profiles.
export default function Reminders() {
  const store = useKhatunStore()
  const { t } = useT()
  const [status, setStatus] = useState('')

  const enableNotification = async () => {
    if (!('Notification' in window)) {
      setStatus(t('reminders.notSupported'))
      return
    }
    try {
      const perm = await Notification.requestPermission()
      if (perm === 'granted') {
        new Notification(t('reminders.notifTitle'), { body: t('reminders.notifBody') })
        updateStore({ reminderSet: true })
        setStatus(t('reminders.statusOn'))
      } else {
        setStatus(t('reminders.statusOff'))
      }
    } catch {
      setStatus(t('reminders.statusFail'))
    }
  }

  const addToCalendar = () => {
    const start = new Date()
    start.setDate(start.getDate() + 1)
    start.setHours(10, 0, 0, 0)
    const ics = buildICS({
      title: t('reminders.calTitle'),
      description: t('reminders.calDesc'),
      start,
    })
    downloadICS('khatun-reminder.ics', ics)
    setStatus(t('reminders.statusCal'))
  }

  return (
    <div className="reminders">
      <h3 className="journey__sub-title">{t('reminders.title')}</h3>
      <div className="reminders__btns">
        <button className="btn btn--gold" onClick={enableNotification}>
          {store.reminderSet ? t('reminders.notifActive') : t('reminders.notifBtn')}
        </button>
        <button className="btn btn--ghost result__btn-ghost" onClick={addToCalendar}>
          {t('reminders.calBtn')}
        </button>
      </div>
      {status && <p className="reminders__status">{status}</p>}
      {store.profile?.contact && (
        <p className="reminders__future">
          {format(t('reminders.future'), { contact: store.profile.contact })}
        </p>
      )}
    </div>
  )
}
