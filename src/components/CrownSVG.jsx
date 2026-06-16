// Inline gold crown used as the visible default until a real crown.png / crown.glb
// is dropped in. Gold gradient + wine-red gems (#7A0F1C / #C7A35A) so it reads
// clearly on the dark maroon hero.
export default function CrownSVG({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 175"
      role="img"
      aria-label="Хатун титэм"
      width="260"
      height="207"
    >
      <defs>
        <linearGradient id="crownGold" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#F3E3B6" />
          <stop offset="0.42" stopColor="#C7A35A" />
          <stop offset="0.7" stopColor="#9A7B38" />
          <stop offset="1" stopColor="#E2C788" />
        </linearGradient>
        <linearGradient id="crownBand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E2C788" />
          <stop offset="1" stopColor="#A6823C" />
        </linearGradient>
        <radialGradient id="crownGem" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#D96C7A" />
          <stop offset="0.5" stopColor="#7A0F1C" />
          <stop offset="1" stopColor="#4B0A19" />
        </radialGradient>
      </defs>

      {/* crown body (5 peaks) */}
      <path
        d="M30 120 L45 50 L64 92 L83 40 L100 88 L110 30 L120 88 L137 40 L156 92 L175 50 L190 120 Z"
        fill="url(#crownGold)"
        stroke="#8a6d2f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* band */}
      <rect x="28" y="118" width="164" height="34" rx="9" fill="url(#crownBand)" stroke="#8a6d2f" strokeWidth="1.5" />

      {/* peak jewels */}
      {[
        [45, 50],
        [83, 40],
        [110, 30],
        [137, 40],
        [175, 50],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="8" fill="url(#crownBand)" stroke="#8a6d2f" strokeWidth="1.2" />
      ))}

      {/* band gems */}
      {[70, 110, 150].map((cx) => (
        <g key={cx}>
          <rect
            x={cx - 9}
            y={126}
            width="18"
            height="18"
            rx="3"
            transform={`rotate(45 ${cx} 135)`}
            fill="url(#crownGem)"
            stroke="#C7A35A"
            strokeWidth="1.5"
          />
        </g>
      ))}

      {/* soft top highlight */}
      <path
        d="M45 50 L64 92 L83 40 L100 88 L110 30"
        fill="none"
        stroke="rgba(255,250,235,0.5)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
