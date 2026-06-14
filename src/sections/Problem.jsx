import useGsapReveal from '../hooks/useGsapReveal'

export default function Problem() {
  const scope = useGsapReveal()

  return (
    <section className="section problem" ref={scope}>
      <div className="container problem__inner">
        <p className="eyebrow" data-reveal>
          Танил түүх
        </p>
        <h2 className="problem__head" data-reveal data-reveal-delay="0.05">
          Тэр Google дээр{' '}
          <em className="wine-text">«how to start investing»</em> гэж бичнэ.
          Англиар. Гадны бүтээгдэхүүн. Ойлгомжгүй.
        </h2>
        <p className="problem__body" data-reveal data-reveal-delay="0.1">
          Тэгээд цонхоо хаана. Анхны цалин нь дансандаа хэвээрээ үлдэж,
          инфляци чимээгүйхэн идэж эхэлнэ. Буруу нь түүнийх биш —{' '}
          <span className="wine-text">түүнд зориулсан зам байхгүй байсан нь</span>{' '}
          асуудал.
        </p>
      </div>
    </section>
  )
}
