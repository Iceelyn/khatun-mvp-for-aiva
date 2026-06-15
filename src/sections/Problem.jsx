import useGsapReveal from '../hooks/useGsapReveal'
import { useT } from '../i18n/index.jsx'

export default function Problem() {
  const scope = useGsapReveal()
  const { t } = useT()
  const [headA, headB = ''] = t('problem.head').split('{q}')

  return (
    <section className="section problem" ref={scope}>
      <div className="container problem__inner">
        <p className="eyebrow" data-reveal>
          {t('problem.eyebrow')}
        </p>
        <h2 className="problem__head" data-reveal data-reveal-delay="0.05">
          {headA}
          <em className="wine-text">{t('problem.query')}</em>
          {headB}
        </h2>
        <p className="problem__body" data-reveal data-reveal-delay="0.1">
          {t('problem.body')}
        </p>
      </div>
    </section>
  )
}
