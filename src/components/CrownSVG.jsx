// Inline gold crown, styled after the poster: five tall sharp spires with gold
// ball tips, an ornate banded base with pearl row, and large wine-red gems.
// Visible by default on the dark hero; auto-replaced by crown.png / crown.glb.
export default function CrownSVG({ className = '' }) {
  const peaks = [
    [38, 56],
    [88, 40],
    [125, 20],
    [162, 40],
    [212, 56],
  ]
  return (
    <svg
      className={className}
      viewBox="0 0 250 210"
      role="img"
      aria-label="Хатун титэм"
      width="280"
      height="235"
    >
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0" stopColor="#FBEFC8" />
          <stop offset="0.4" stopColor="#D8B463" />
          <stop offset="0.7" stopColor="#9A7B38" />
          <stop offset="1" stopColor="#E2C788" />
        </linearGradient>
        <linearGradient id="cband" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3E3B6" />
          <stop offset="1" stopColor="#A6823C" />
        </linearGradient>
        <radialGradient id="cgem" cx="0.34" cy="0.28" r="0.85">
          <stop offset="0" stopColor="#E8808D" />
          <stop offset="0.45" stopColor="#9E1422" />
          <stop offset="1" stopColor="#4B0A19" />
        </radialGradient>
        <radialGradient id="cball" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FBEFC8" />
          <stop offset="1" stopColor="#B8923F" />
        </radialGradient>
      </defs>

      {/* tall sharp spires */}
      <path
        d="M22 158 L38 56 L62 132 L88 40 L106 130 L125 20 L144 130 L162 40 L188 132 L212 56 L228 158 Z"
        fill="url(#cg)"
        stroke="#8a6d2f"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* red gems set into the three central points */}
      <rect x={116} y={70} width="18" height="18" rx="3" transform="rotate(45 125 79)" fill="url(#cgem)" stroke="#E2C788" strokeWidth="1.4" />
      <rect x={80} y={86} width="14" height="14" rx="3" transform="rotate(45 87 93)" fill="url(#cgem)" stroke="#E2C788" strokeWidth="1.2" />
      <rect x={156} y={86} width="14" height="14" rx="3" transform="rotate(45 163 93)" fill="url(#cgem)" stroke="#E2C788" strokeWidth="1.2" />

      {/* gold ball tips */}
      {peaks.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="10" fill="url(#cball)" stroke="#8a6d2f" strokeWidth="1.3" />
      ))}

      {/* ornate band */}
      <rect x="18" y="156" width="214" height="40" rx="11" fill="url(#cband)" stroke="#8a6d2f" strokeWidth="1.6" />
      <line x1="26" y1="166" x2="224" y2="166" stroke="#8a6d2f" strokeWidth="1" opacity="0.5" />

      {/* pearl row on the band */}
      {Array.from({ length: 11 }).map((_, i) => (
        <circle key={i} cx={32 + i * 18.6} cy={161} r="2.4" fill="#FBEFC8" />
      ))}

      {/* large band gems */}
      {[68, 125, 182].map((cx) => (
        <rect
          key={cx}
          x={cx - 13}
          y={163}
          width="26"
          height="26"
          rx="4"
          transform={`rotate(45 ${cx} 176)`}
          fill="url(#cgem)"
          stroke="#E2C788"
          strokeWidth="1.8"
        />
      ))}

      {/* soft top highlight */}
      <path
        d="M38 56 L62 132 L88 40 L106 130 L125 20"
        fill="none"
        stroke="rgba(255,250,235,0.55)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}
