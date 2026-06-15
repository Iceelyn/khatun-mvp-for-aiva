import { useEffect, useRef, useState } from 'react'
import { QUESTIONS } from '../data/questions'
import Progress from '../components/Progress'
import Result from '../components/Result'
import Emblem from '../components/Emblem'
import { askKhatun, buildIntakeMessage } from '../lib/api'
import { loadStore, updateStore, hasJourney, useKhatunStore } from '../lib/store'
import { detectProduct, PRODUCTS } from '../lib/recommendation'

const STAGE = {
  RETURNING: 'returning',
  QUIZ: 'quiz',
  LOADING: 'loading',
  RESULT: 'result',
  ERROR: 'error',
}

export default function Demo({ onClose }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [stage, setStage] = useState(() =>
    hasJourney() ? STAGE.RETURNING : STAGE.QUIZ
  )
  const [reply, setReply] = useState('')
  const [messages, setMessages] = useState([])
  const [followUps, setFollowUps] = useState([])
  const [loadingFollowUp, setLoadingFollowUp] = useState(false)
  const dialogRef = useRef(null)
  const store = useKhatunStore()

  const q = QUESTIONS[step]
  const selected = answers[q?.id]

  // Lock body scroll + close on Escape.
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

  const select = (value) =>
    setAnswers((a) => ({ ...a, [q.id]: value }))

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
    const intake = buildIntakeMessage({
      leftover: answers.leftover,
      goal: answers.goal,
      risk: answers.risk,
    })
    const userMsg = { role: 'user', content: intake }
    try {
      const text = await askKhatun([userMsg])
      const convo = [userMsg, { role: 'assistant', content: text }]
      setMessages(convo)
      setReply(text)
      // Persist the journey so a returning visitor lands on her next step.
      updateStore({ answers, reply: text, productKey: detectProduct(text) })
      setStage(STAGE.RESULT)
    } catch (err) {
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
            { role: 'user', content: buildIntakeMessage(a) },
            { role: 'assistant', content: s.reply },
          ]
        : []
    )
    setStage(STAGE.RESULT)
  }

  const onFollowUp = async (question) => {
    setLoadingFollowUp(true)
    const userMsg = { role: 'user', content: question }
    const convo = [...messages, userMsg]
    try {
      const text = await askKhatun(convo)
      setMessages([...convo, { role: 'assistant', content: text }])
      setFollowUps((f) => [...f, { question, answer: text }])
    } catch (err) {
      setFollowUps((f) => [
        ...f,
        {
          question,
          answer: 'Уучлаарай, түр алдаа гарлаа. Дахин оролдоод үзээрэй. 🙏',
        },
      ])
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
      className={`demo ${stage === STAGE.RESULT ? 'demo--result' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Хатуны асуулга"
      ref={dialogRef}
      tabIndex={-1}
    >
      <button className="demo__close" onClick={onClose} aria-label="Хаах">
        ✕
      </button>

      {stage === STAGE.RETURNING && (
        <div className="demo__returning">
          <Emblem size={84} />
          <p className="eyebrow">Дахин тавтай морил</p>
          <h2 className="demo__returning-head serif">
            {store.profile?.name
              ? `Тавтай морил, ${store.profile.name}!`
              : 'Чи буцаж ирлээ!'}
          </h2>
          <p className="demo__returning-sub">
            {store.productKey
              ? `Сүүлд бид «${PRODUCTS[store.productKey]?.name}»-аар эхэлсэн. Дараагийн алхам руугаа үргэлжлүүлэх үү?`
              : 'Үлдсэн алхамаа үргэлжлүүлэх үү?'}
          </p>
          <div className="demo__actions">
            <button className="btn btn--primary" onClick={resume}>
              Дараагийн алхам үзэх
            </button>
            <button className="btn btn--ghost" onClick={restart}>
              Шинээр эхлэх
            </button>
          </div>
        </div>
      )}

      {stage === STAGE.QUIZ && (
        <div className="demo__quiz">
          <Progress total={QUESTIONS.length} current={step} />

          <div className="demo__body" key={q.id}>
            <p className="eyebrow demo__step-label">
              Алхам {step + 1} / {QUESTIONS.length} · {q.label}
            </p>
            <h2 className="demo__question">{q.title}</h2>

            <div
              className={`options options--${q.layout}`}
              role="radiogroup"
              aria-label={q.title}
            >
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  className={`option option--${q.layout} ${
                    selected === opt.value ? 'option--selected' : ''
                  }`}
                  role="radio"
                  aria-checked={selected === opt.value}
                  onClick={() => select(opt.value)}
                >
                  <span className="option__emoji" aria-hidden="true">
                    {opt.emoji}
                  </span>
                  <span className="option__label">{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="demo__actions">
              {step > 0 && (
                <button
                  className="btn btn--ghost"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Буцах
                </button>
              )}
              <button
                className="btn btn--primary"
                onClick={next}
                disabled={!selected}
              >
                {q.cta}
              </button>
            </div>
          </div>
        </div>
      )}

      {stage === STAGE.LOADING && (
        <div className="demo__loading">
          <Emblem size={72} className="demo__loading-emblem" />
          <p className="demo__loading-text serif">
            Хатун чамд тохирох алхамыг бодож байна…
          </p>
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
          onClose={onClose}
        />
      )}

      {stage === STAGE.ERROR && (
        <div className="demo__loading">
          <Emblem size={64} />
          <p className="demo__loading-text serif">
            Өө, түр холболтын алдаа гарлаа.
          </p>
          <p className="demo__error-sub">
            Дахин оролдоод үзье — Хатун чамайг хүлээж байна. 💛
          </p>
          <div className="demo__actions">
            <button className="btn btn--primary" onClick={runRecommendation}>
              Дахин оролдох
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
