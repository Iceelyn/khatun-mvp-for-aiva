import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function CountFigure({ value, suffix = '%', className }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      el.textContent = `${value}${suffix}`
      return
    }
    const obj = { n: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          n: value,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(obj.n)}${suffix}`
          },
        })
      },
    })
    el.textContent = `0${suffix}`
    return () => st.kill()
  }, [value, suffix, reduced])

  return (
    <span className={className} ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

export default function Stat() {
  return (
    <section className="section stat">
      <div className="container stat__grid">
        <div className="stat__item">
          <CountFigure value={71} className="stat__figure stat__figure--wine" />
          <p className="stat__caption">
            Эмэгтэйчүүдийн <strong>71%</strong> нь хөрөнгө оруулалт нь үе
            дамжсан баялгийг бий болгох арга зам гэдэгтэй санал нийлдэг.
          </p>
        </div>

        <span className="stat__divider" aria-hidden="true" />

        <div className="stat__item">
          <CountFigure value={14} className="stat__figure stat__figure--gold" />
          <p className="stat__caption">
            Гэтэл ердөө <strong>14%</strong> нь хөрөнгө оруулалтын мэдлэгтээ
            өндөр итгэлтэй байдаг.
          </p>
        </div>
      </div>
      <p className="stat__source container">Fidelity Investments, 2024.</p>
    </section>
  )
}
