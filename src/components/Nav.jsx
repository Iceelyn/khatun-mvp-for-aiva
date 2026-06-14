import { useEffect, useState } from 'react'
import Emblem from './Emblem'
import Wordmark from './Wordmark'

export default function Nav({ onStart }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a className="nav__brand" href="#top" aria-label="Хатун — нүүр хуудас">
          <Emblem size={38} />
          <Wordmark className="nav__wordmark" />
        </a>
        <button className="btn btn--primary nav__cta" onClick={onStart}>
          Эхлэх
        </button>
      </div>
    </header>
  )
}
