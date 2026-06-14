import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Editorial scroll reveal. Animates elements matching `selector` inside the
 * returned ref. Respects prefers-reduced-motion (renders fully visible).
 */
export default function useGsapReveal(selector = '[data-reveal]', opts = {}) {
  const scope = useRef(null)

  useEffect(() => {
    const root = scope.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = root.querySelectorAll(selector)
    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' })
      return
    }

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay || 0)
        gsap.fromTo(
          el,
          { opacity: 0, y: opts.y ?? 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: opts.start ?? 'top 86%',
            },
          }
        )
      })
    }, root)

    return () => ctx.revert()
  }, [selector, opts.y, opts.start])

  return scope
}
