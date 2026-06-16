import { Suspense, lazy, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import CrownHero from '../components/CrownHero'
import Wordmark from '../components/Wordmark'
import useReducedMotion from '../hooks/useReducedMotion'
import { useT } from '../i18n/index.jsx'

// Three.js gold-dust canvas is lazy-loaded so it never blocks first paint.
const GoldDust = lazy(() => import('../components/GoldDust'))

export default function Hero({ onStart }) {
  const root = useRef(null)
  const reduced = useReducedMotion()
  const { t } = useT()

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.crown', { opacity: 0, scale: 0.8, y: -10, duration: 1.2 })
        .from('.hero__wordmark', { opacity: 0, y: 24, duration: 0.9 }, '-=0.7')
        .from('.hero__eyebrow', { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
        .from(
          '.hero__line',
          { yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.12 },
          '-=0.4'
        )
        .from('.hero__sub', { opacity: 0, y: 18, duration: 0.8 }, '-=0.6')
        .from('.hero__cta', { opacity: 0, y: 18, duration: 0.7 }, '-=0.5')
        .from('.hero__scroll', { opacity: 0, duration: 0.8 }, '-=0.3')
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="hero" id="top" ref={root}>
      {!reduced && (
        <Suspense fallback={null}>
          <GoldDust />
        </Suspense>
      )}

      <div className="container hero__inner">
        <CrownHero />
        <Wordmark className="hero__wordmark" as="h1" />

        <p className="eyebrow hero__eyebrow">{t('hero.eyebrow')}</p>

        <h2 className="hero__headline">
          <span className="hero__line-wrap">
            <span className="hero__line">{t('hero.line1')}</span>
          </span>
          <span className="hero__line-wrap">
            <span className="hero__line hero__line--accent">
              {t('hero.line2')}
            </span>
          </span>
        </h2>

        <p className="hero__sub">{t('hero.sub')}</p>

        <div className="hero__cta">
          <button className="btn btn--primary" onClick={onStart}>
            {t('hero.cta')}
          </button>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>{t('hero.scroll')}</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
