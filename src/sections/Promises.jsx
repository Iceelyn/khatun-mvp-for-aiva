import useGsapReveal from '../hooks/useGsapReveal'
import Emblem from '../components/Emblem'

const PROMISES = [
  {
    n: '01',
    title: 'Чиний хэлээр, шүүлтгүй',
    body: 'Хувийн, Монгол хэлээр, шүүн тунгаалтгүй. Хэн ч чамайг хожимдсон, эсвэл тэнэг гэж бодохгүй.',
  },
  {
    n: '02',
    title: 'Эхний бодит алхам — хэдхэн минутад',
    body: 'Дансандаа зүгээр хэвтэж буй мөнгийг нэг тодорхой үйлдэл болгон хувиргана. Богино, ойлгомжтой.',
  },
  {
    n: '03',
    title: 'Khatun — чиний хажууд алхах AI хамтрагч',
    body: 'Чамайг хаана байгаагаар чинь угтан авч, дараагийн алхамыг хамт хийнэ.',
    subtext: 'Чи хаана ч байсан, нэг алхам урагшил.',
    climax: true,
  },
]

export default function Promises() {
  const scope = useGsapReveal('[data-reveal]', { y: 44 })

  return (
    <section className="section promises" ref={scope}>
      <div className="container">
        <header className="promises__head">
          <p className="eyebrow" data-reveal>
            Khatun-ы амлалт
          </p>
          <h2 data-reveal data-reveal-delay="0.05">
            Гурван амлалт
          </h2>
          <hr className="rule" data-reveal data-reveal-delay="0.1" />
        </header>

        <ol className="promises__list">
          {PROMISES.map((p) => (
            <li
              key={p.n}
              className={`promise ${p.climax ? 'promise--climax' : ''}`}
              data-reveal
            >
              <div className="promise__motif" aria-hidden="true">
                <Emblem size={p.climax ? 64 : 40} />
                <span className="promise__num">{p.n}</span>
              </div>
              <div className="promise__text">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                {p.subtext && (
                  <p className="promise__subtext serif">{p.subtext}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
