import useGsapReveal from '../hooks/useGsapReveal'
import Emblem from '../components/Emblem'
import { useT } from '../i18n/index.jsx'

export default function Promises() {
  const scope = useGsapReveal('[data-reveal]', { y: 44 })
  const { t } = useT()
  const items = t('promises.items')

  return (
    <section className="section promises" ref={scope}>
      <div className="container">
        <header className="promises__head">
          <p className="eyebrow" data-reveal>
            {t('promises.eyebrow')}
          </p>
          <h2 data-reveal data-reveal-delay="0.05">
            {t('promises.title')}
          </h2>
          <hr className="rule" data-reveal data-reveal-delay="0.1" />
        </header>

        <ol className="promises__list">
          {items.map((p, i) => {
            const climax = i === items.length - 1
            return (
              <li
                key={i}
                className={`promise ${climax ? 'promise--climax' : ''}`}
                data-reveal
              >
                <div className="promise__motif" aria-hidden="true">
                  <Emblem size={climax ? 64 : 40} />
                  <span className="promise__num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="promise__text">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  {p.subtext && (
                    <p className="promise__subtext serif">{p.subtext}</p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
