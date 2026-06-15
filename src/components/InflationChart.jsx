// Small, animated, clearly-illustrative chart: idle savings (purchasing power
// eroded by ~10% inflation) vs. a simple invested path over 12 months.
// Pure SVG — no chart library. Labelled in Mongolian, marked as an example.

const MONTHS = 12
const INFLATION = 0.1 // ~10%/year — illustrative assumption, labelled as such
const W = 360
const H = 200
const padL = 10
const padR = 10
const padT = 26
const padB = 38
const plotW = W - padL - padR
const plotH = H - padT - padB
const vMin = 86
const vMax = 114

const x = (m) => padL + (m / MONTHS) * plotW
const y = (v) => padT + (1 - (v - vMin) / (vMax - vMin)) * plotH

const idle = []
const invest = []
for (let m = 0; m <= MONTHS; m++) {
  idle.push(100 * (1 - INFLATION * (m / MONTHS))) // 100 → 90
  invest.push(100 * (1 + INFLATION * (m / MONTHS))) // 100 → 110 (illustrative)
}
const toPoints = (arr) => arr.map((v, m) => `${x(m)},${y(v)}`).join(' ')

import { useT } from '../i18n/index.jsx'

export default function InflationChart() {
  const { t } = useT()
  return (
    <figure className="ichart">
      <figcaption className="ichart__cap">
        <h2 className="ichart__title">{t('ichart.title')}</h2>
        <p className="ichart__sub">{t('ichart.sub')}</p>
      </figcaption>

      <svg
        className="ichart__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t('ichart.aria')}
      >
        {/* baseline at value 100 */}
        <line
          className="ichart__base"
          x1={padL}
          y1={y(100)}
          x2={W - padR}
          y2={y(100)}
        />
        {/* invested */}
        <polyline
          className="ichart__line ichart__line--invest"
          points={toPoints(invest)}
          pathLength="1"
          fill="none"
        />
        {/* idle */}
        <polyline
          className="ichart__line ichart__line--idle"
          points={toPoints(idle)}
          pathLength="1"
          fill="none"
        />
        <circle className="ichart__dot ichart__dot--invest" cx={x(MONTHS)} cy={y(invest[MONTHS])} r="3.5" />
        <circle className="ichart__dot ichart__dot--idle" cx={x(MONTHS)} cy={y(idle[MONTHS])} r="3.5" />

        <text className="ichart__axis" x={padL} y={H - 14}>
          {t('ichart.axisStart')}
        </text>
        <text className="ichart__axis ichart__axis--end" x={W - padR} y={H - 14}>
          {t('ichart.axisEnd')}
        </text>
      </svg>

      <ul className="ichart__legend">
        <li>
          <span className="ichart__key ichart__key--invest" /> {t('ichart.legendInvest')}
        </li>
        <li>
          <span className="ichart__key ichart__key--idle" /> {t('ichart.legendIdle')}
        </li>
      </ul>
    </figure>
  )
}
