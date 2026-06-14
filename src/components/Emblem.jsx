import emblemUrl from '../assets/brand/emblem.svg'

// The wine emblem used as a recurring brand motif (nav, sections, result).
export default function Emblem({ size = 40, className = '', alt = 'Хатун эмблем' }) {
  return (
    <img
      src={emblemUrl}
      width={size}
      height={size}
      alt={alt}
      className={`emblem ${className}`}
      draggable="false"
    />
  )
}
