import Emblem from '../components/Emblem'
import Wordmark from '../components/Wordmark'

const VALUES = ['Power', 'Elegance', 'Growth', 'Knowledge']

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Emblem size={56} />
          <Wordmark className="footer__wordmark" />
          <p className="footer__tagline">Санхүүгийн дараагийн алхам</p>
        </div>

        <hr className="rule" />

        <div className="footer__row">
          <p className="footer__mission">Empower women • Build wealth</p>
          <ul className="footer__values">
            {VALUES.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>

        <p className="footer__legal">
          Хатун нь найрсаг чиглүүлэг өгдөг — лицензтэй санхүүгийн зөвлөгөө биш.
          Эцсийн шийдвэр чинийх. © {new Date().getFullYear()} Khatun.
        </p>
      </div>
    </footer>
  )
}
