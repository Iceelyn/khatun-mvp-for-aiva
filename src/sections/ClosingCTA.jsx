import useGsapReveal from '../hooks/useGsapReveal'
import Emblem from '../components/Emblem'
import { useT } from '../i18n/index.jsx'

export default function ClosingCTA({ onStart }) {
  const scope = useGsapReveal()
  const { t } = useT()

  return (
    <section className="section closing" ref={scope}>
      <div className="container closing__inner">
        <Emblem size={72} className="closing__emblem" data-reveal />
        <h2 className="closing__head" data-reveal data-reveal-delay="0.05">
          {t('closing.head')}
        </h2>
        <p className="closing__sub" data-reveal data-reveal-delay="0.1">
          {t('closing.sub')}
        </p>
        <button
          className="btn btn--primary closing__cta"
          onClick={onStart}
          data-reveal
          data-reveal-delay="0.15"
        >
          {t('closing.cta')}
        </button>
      </div>
    </section>
  )
}
