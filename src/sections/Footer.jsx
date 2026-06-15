import Emblem from '../components/Emblem'
import Wordmark from '../components/Wordmark'
import { useT, format } from '../i18n/index.jsx'

export default function Footer() {
  const { t } = useT()
  const values = t('footer.values')

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Emblem size={56} />
          <Wordmark className="footer__wordmark" />
          <p className="footer__tagline">{t('footer.tagline')}</p>
        </div>

        <hr className="rule" />

        <div className="footer__row">
          <p className="footer__mission">{t('footer.mission')}</p>
          <ul className="footer__values">
            {values.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>

        <p className="footer__legal">
          {format(t('footer.legal'), { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  )
}
