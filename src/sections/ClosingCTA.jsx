import useGsapReveal from '../hooks/useGsapReveal'
import Emblem from '../components/Emblem'

export default function ClosingCTA({ onStart }) {
  const scope = useGsapReveal()

  return (
    <section className="section closing" ref={scope}>
      <div className="container closing__inner">
        <Emblem size={72} className="closing__emblem" data-reveal />
        <h2 className="closing__head" data-reveal data-reveal-delay="0.05">
          Дараагийн алхамаа өнөөдөр хийе.
        </h2>
        <p className="closing__sub" data-reveal data-reveal-delay="0.1">
          Хэдхэн асуултад хариулаад, чамд тохирох нэг бодит сонголтыг хүлээж ав.
        </p>
        <button
          className="btn btn--primary closing__cta"
          onClick={onStart}
          data-reveal
          data-reveal-delay="0.15"
        >
          Туршиж үзэх
        </button>
      </div>
    </section>
  )
}
