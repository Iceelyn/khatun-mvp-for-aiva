// Khatun design tokens — single source of truth (mirrored as CSS vars in tokens.css).
export const colors = {
  cream: '#F5EFE8', // background
  white: '#FFFFFF', // surface
  blush: '#E9DDD5', // surface soft
  wine: '#7A0F1C', // primary
  burgundy: '#4B0A19', // primary deep
  gold: '#C7A35A', // secondary
  rose: '#D96C7A', // accent
  mauve: '#BFA6A0',
  ink: '#1F1F1F', // text
  // support — data / illustration only
  green: '#2F7D5C',
  blue: '#4C6F91',
}

export const fonts = {
  display: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
  serif: "'Cormorant Garamond', Georgia, serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
}

// Fluid type scale (clamp-based, mobile-first).
export const type = {
  hero: 'clamp(2.75rem, 8vw, 6.5rem)',
  h1: 'clamp(2.25rem, 5.5vw, 4.25rem)',
  h2: 'clamp(1.75rem, 3.5vw, 3rem)',
  h3: 'clamp(1.35rem, 2.2vw, 2rem)',
  display: 'clamp(3.5rem, 12vw, 9rem)', // big stat figures
  lead: 'clamp(1.1rem, 1.6vw, 1.45rem)',
  body: 'clamp(1rem, 1.1vw, 1.125rem)',
  small: '0.875rem',
  eyebrow: '0.8rem',
}

export const space = {
  xs: '0.5rem',
  sm: '1rem',
  md: '2rem',
  lg: '4rem',
  xl: '8rem',
  section: 'clamp(5rem, 12vh, 10rem)',
}

export const motion = {
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)', // deliberate, editorial
  slow: '1.1s',
  base: '0.6s',
  fast: '0.3s',
}
