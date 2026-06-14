// Serif "KHATUN" wordmark placeholder (wide-tracked caps) until logo-full.svg lands.
export default function Wordmark({ className = '', as: Tag = 'span' }) {
  return (
    <Tag className={`wordmark ${className}`} aria-label="KHATUN">
      KHATUN
    </Tag>
  )
}
