import logoUrl from '../assets/brand/khatun-logo.png'

// Official Khatun logo — used everywhere the brand mark appears.
// The source PNG is high-resolution, so rendering at a smaller CSS size keeps
// it crisp on retina (2x) screens.
export default function Emblem({ size = 40, className = '', alt = 'Хатун' }) {
  return (
    <img
      src={logoUrl}
      width={size}
      height={size}
      alt={alt}
      className={`emblem ${className}`}
      draggable="false"
      loading="eager"
      decoding="async"
    />
  )
}
