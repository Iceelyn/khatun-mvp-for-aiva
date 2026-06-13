import { useState } from 'react'
import Emblem from './Emblem'

// Renders Khatun's reply + one optional free-text follow-up.
export default function Result({ reply, onFollowUp, followUps, loadingFollowUp }) {
  const [text, setText] = useState('')
  const [asked, setAsked] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const q = text.trim()
    if (!q || loadingFollowUp) return
    setAsked(true)
    onFollowUp(q)
    setText('')
  }

  return (
    <div className="result">
      <div className="result__card">
        <div className="result__head">
          <Emblem size={56} />
          <p className="eyebrow">Хатуны зөвлөмж</p>
        </div>

        <div className="result__reply">
          {splitParagraphs(reply).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {followUps.map((f, i) => (
          <div className="result__followup" key={i}>
            <p className="result__question">{f.question}</p>
            <div className="result__answer">
              {splitParagraphs(f.answer).map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </div>
        ))}

        {loadingFollowUp && (
          <p className="result__typing">Хатун бичиж байна…</p>
        )}

        {!asked ? (
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
            />
            <button
              className="btn btn--primary"
              type="submit"
              disabled={!text.trim() || loadingFollowUp}
            >
              Илгээх
            </button>
          </form>
        ) : (
          <p className="result__note">
            Энэ бол найрсаг чиглүүлэг — лицензтэй санхүүгийн зөвлөгөө биш.
            Эцсийн шийдвэр чинийх. 💛
          </p>
        )}
      </div>
    </div>
  )
}

function splitParagraphs(text = '') {
  return text
    .split(/\n{2,}|\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}
