import { useEffect, useRef, useState } from 'react'
import { QUESTIONS } from '../data/questions'
import Progress from '../components/Progress'
import Result from '../components/Result'
import JourneyScreen from '../components/JourneyScreen'
import Emblem from '../components/Emblem'
import { askKhatun, buildIntakeMessage } from '../lib/api'
import { loadStore, updateStore, hasJourney, useKhatunStore } from '../lib/store'
import { detectProduct } from '../lib/recommendation'
import { detectDistress } from '../lib/safety'
import { useT, format } from '../i18n/index.jsx'

const STAGE = {
  RETURNING: 'returning',
  QUIZ: 'quiz',
  LOADING: 'loading',
  RESULT: 'result',
  JOURNEY: 'journey',
  ERROR: 'error',
}

export default function Demo({ onClose, initialStage }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [stage, setStage] = useState(
    () => initialStage || (hasJourney() ? STAGE.RETURNING : STAGE.QUIZ)
  )
  const [journeyFrom, setJourneyFrom] = useState('landing')
  const [reply, setReply] = useState('')
  const [messages, setMessages] = useState([])
  const [followUps, setFollowUps] = useState([])
  const [loadingFollowUp, setLoadingFollowUp] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const dialogRef = useRef(null)
  const store = useKhatunStore()
  const { t, lang } = useT()

  const q = QUESTIONS[step]
  const selected = answers[q?.id]

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // Entering the Journey directly (landing strip) — hydrate from the store.
  useEffect(() => {
    if (initialStage === STAGE.JOURNEY) {
      const s = loadStore()
      setAnswers(s.answers || {})
      setReply(s.reply || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openJourney = (name) => {
    const n = (name || '').trim()
    updateStore({
      journeyStarted: true,
      profile: {
        ...(store.profile || {}),
        name: n || store.profile?.name || '',
      },
    })
    setJourneyFrom('result')
    setStage(STAGE.JOURNEY)
  }

  const select = (value) => setAnswers((a) => ({ ...a, [q.id]: value }))

  const next = async () => {
    if (!selected) return
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    await runRecommendation()
  }

  const runRecommendation = async () => {
    setStage(STAGE.LOADING)
    const intake = buildIntakeMessage(answers, t)
    const userMsg = { role: 'user', content: intake }
    try {
      const text = await askKhatun([userMsg], lang)
      setMessages([userMsg, { role: 'assistant', content: text }])
      setReply(text)
      updateStore({ answers, reply: text, productKey: detectProduct(text) })
      setStage(STAGE.RESULT)
    } catch (err) {
      setErrorMsg(err?.message || '')
      setStage(STAGE.ERROR)
    }
  }

  // Returning visitor — jump straight to her saved recommendation, no API call.
  const resume = () => {
    const s = loadStore()
    const a = s.answers || {}
    setAnswers(a)
    setReply(s.reply || '')
    setMessages(
      s.reply
        ? [
            { role: 'user', content: buildIntakeMessage(a, t) },
            { role: 'assistant', content: s.reply },
          ]
        : []
    )
    setStage(STAGE.RESULT)
  }

  const onFollowUp = async (question) => {
    setLoadingFollowUp(true)
    const distress = detectDistress(question)
    const userMsg = { role: 'user', content: question }
    const convo = [...messages, userMsg]
    try {
      const text = await askKhatun(convo, lang)
      setMessages([...convo, { role: 'assistant', content: text }])
      setFollowUps((f) => [...f, { question, answer: text, distress }])
    } catch (err) {
      setFollowUps((f) => [...f, { question, answer: t('result.followError'), distress }])
    } finally {
      setLoadingFollowUp(false)
    }
  }

  const restart = () => {
    setStep(0)
    setAnswers({})
    setStage(STAGE.QUIZ)
    setReply('')
    setMessages([])
    setFollowUps([])
  }

  return (
    <div
      className={`demo ${
        stage === STAGE.RESULT || stage === STAGE.JOURNEY ? 'demo--result' : ''
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={t('demo.ariaDialog')}
      ref={dialogRef}
      tabIndex={-1}
    >
      <button className="demo__close" onClick={onClose} aria-label={t('demo.close')}>
        ✕
      </button>

      {stage === STAGE.RETURNING && (
        <div className="demo__returning">
          <Emblem size={84} />
          <p className="eyebrow">{t('demo.returningEyebrow')}</p>
          <h2 className="demo__returning-head serif">
            {store.profile?.name
              ? format(t('demo.welcomeNamed'), { name: store.profile.name })
              : t('demo.welcomeAnon')}
          </h2>
          <p className="demo__returning-sub">
            {store.productKey
              ? format(t('demo.resumeSubProduct'), {
                  product: t(`products.${store.productKey}.name`),
                })
              : t('demo.resumeSubAnon')}
          </p>
          <div className="demo__actions">
            <button className="btn btn--primary" onClick={resume}>
              {t('demo.resume')}
            </button>
            <button className="btn btn--ghost" onClick={restart}>
              {t('demo.restart')}
            </button>
          </div>
        </div>
      )}

      {stage === STAGE.QUIZ && (
        <div className="demo__quiz">
          <Progress total={QUESTIONS.length} current={step} />

          <div className="demo__body" key={q.id}>
            <p className="eyebrow demo__step-label">
              {format(t('demo.stepLabel'), {
                n: step + 1,
                total: QUESTIONS.length,
                label: t(`q.label.${q.id}`),
              })}
            </p>
            <h2 className="demo__question">{t(`q.${q.id}.title`)}</h2>

            <div
              className={`options options--${q.layout}`}
              role="radiogroup"
              aria-label={t(`q.${q.id}.title`)}
            >
              {q.options.map((opt) => (
                <button
                  key={opt.key}
                  className={`option option--${q.layout} ${
                    selected === opt.key ? 'option--selected' : ''
                  }`}
                  role="radio"
                  aria-checked={selected === opt.key}
                  onClick={() => select(opt.key)}
                >
                  <span className="option__emoji" aria-hidden="true">
                    {opt.emoji}
                  </span>
                  <span className="option__label">
                    {t(`q.${q.id}.opt.${opt.key}`)}
                  </span>
                </button>
              ))}
            </div>

            <div className="demo__actions">
              {step > 0 && (
                <button className="btn btn--ghost" onClick={() => setStep((s) => s - 1)}>
                  {t('demo.back')}
                </button>
              )}
              <button className="btn btn--primary" onClick={next} disabled={!selected}>
                {t(`q.cta.${q.cta}`)}
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === STAGE.LOADING && (
        <div className="demo__loading">
          <Emblem size={72} className="demo__loading-emblem" />
          <p className="demo__loading-text serif">{t('demo.loading')}</p>
          <span className="demo__loading-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
      )}

      {stage === STAGE.RESULT && (
        <Result
          reply={reply}
          answers={answers}
          onFollowUp={onFollowUp}
          followUps={followUps}
          loadingFollowUp={loadingFollowUp}
          onRestart={restart}
          onOpenJourney={openJourney}
        />
      )}

      {stage === STAGE.JOURNEY && (
        <JourneyScreen
          reply={reply}
          onBack={journeyFrom === 'result' ? () => setStage(STAGE.RESULT) : null}
          onClose={onClose}
        />
      )}

      {stage === STAGE.ERROR && (
        <div className="demo__loading">
          <Emblem size={64} />
          <p className="demo__loading-text serif">{t('demo.errorTitle')}</p>
          <p className="demo__error-sub">{t('demo.errorSub')}</p>
          {errorMsg && <p className="demo__error-detail">{errorMsg}</p>}
          <div className="demo__actions">
            <button className="btn btn--primary" onClick={runRecommendation}>
              {t('demo.retry')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
