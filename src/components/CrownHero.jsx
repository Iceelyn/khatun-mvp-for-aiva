import { Suspense, lazy, useEffect, useRef } from 'react'
import CrownSVG from './CrownSVG'
import useReducedMotion from '../hooks/useReducedMotion'

// Optional assets — resolved at build time ONLY if the file exists, so a missing
// crown.png / crown.glb never breaks the build. Drop either file in
// src/assets/brand/ and it's picked up automatically.
const glbUrl = Object.values(
  import.meta.glob('../assets/brand/crown.glb', { eager: true, query: '?url', import: 'default' })
)[0]
const pngUrl = Object.values(
  import.meta.glob('../assets/brand/crown.png', { eager: true, query: '?url', import: 'default' })
)[0]

const Crown3D = lazy(() => import('./Crown3D'))

// The single royal focal object that crowns the KHATUN wordmark.
export default function CrownHero() {
  const reduced = useReducedMotion()
  const wrapRef = useRef(null)
  const isSmall =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches

  // Light scroll-parallax (skipped when reduced-motion).
  useEffect(() => {
    if (reduced) return
    const el = wrapRef.current
    if (!el) return
    let raf
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        // Drift gently UPWARD (away from the wordmark) so it never overlaps text.
        el.style.setProperty('--parY', `${-Math.min(window.scrollY * 0.1, 48)}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  // Use the 3D model only on capable, motion-OK, larger viewports.
  const use3D = Boolean(glbUrl) && !reduced && !isSmall

  return (
    <div className="crown" ref={wrapRef}>
      <div className="crown__glow" aria-hidden="true" />
      <div className={`crown__obj ${reduced ? 'is-static' : ''}`}>
        {use3D ? (
          <Suspense
            fallback={
              pngUrl ? (
                <img src={pngUrl} className="crown__img" alt="" aria-hidden="true" />
              ) : (
                <CrownSVG className="crown__img crown__placeholder" />
              )
            }
          >
            <Crown3D src={glbUrl} />
          </Suspense>
        ) : pngUrl ? (
          <img src={pngUrl} className="crown__img" alt="Хатун титэм" />
        ) : (
          <CrownSVG className="crown__img crown__placeholder" />
        )}
        <span className="crown__shimmer" aria-hidden="true" />
      </div>
    </div>
  )
}
