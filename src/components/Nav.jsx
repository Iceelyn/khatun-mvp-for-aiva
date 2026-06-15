import { useEffect, useState } from 'react'
import Emblem from './Emblem'
import Wordmark from './Wordmark'
import LanguageToggle from './LanguageToggle'
import { useT } from '../i18n/index.jsx'

export default function Nav({ onStart }) {
  const [scrolled, setScrolled] = useState(false)
  const { t } = useT()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a className="nav__brand" href="#top" aria-label={t('nav.home')}>
          <Emblem size={38} />
          <Wordmark className="nav__wordmark" />
        </a>
        <div className="nav__right">
          <LanguageToggle />
          <button className="btn btn--primary nav__cta" onClick={onStart}>
            {t('nav.start')}
          </button>
        </div>
      </div>
    </header>
  )
}
