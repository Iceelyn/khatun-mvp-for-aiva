// Language-aware recommendation helpers. All display text comes from the i18n
// dictionary via the passed-in `t`; only product detection (keyword based) and
// keys live here. Khatun never invents product rates, prices or minimums.
import { format } from '../i18n/index.jsx'

export const PRODUCT_KEYS = ['deposit', 'bond', 'ett', 'mse']

// Detect the recommended product from the reply, in either language.
export function detectProduct(reply = '') {
  const r = reply.toLowerCase()
  if (reply.includes('1072')) return 'ett'
  if (/бонд|bond/.test(r)) return 'bond'
  if (/хадгаламж|deposit/.test(r)) return 'deposit'
  if (/хувьцаа|сан|мхб|брокер|broker|fund|share|mse/.test(r)) return 'mse'
  return 'deposit'
}

export function productName(key, t) {
  return t(`products.${key}.name`)
}
export function productSteps(key, t) {
  return t(`products.${key}.steps`)
}
export function getSuggestions(reply, t) {
  return t(`products.${detectProduct(reply)}.suggestions`)
}

// Comfortable starting amount expressed relative to her own leftover.
export function getAmountRange(leftoverKey, t) {
  return leftoverKey === 'barely'
    ? t('actionCard.amount.barely')
    : t('actionCard.amount.normal')
}

// One-line "Why this?" tying the recommendation to her three answers.
export function getWhy(answers = {}, t) {
  const leftover = answers.leftover ? t(`q.leftover.opt.${answers.leftover}`) : '—'
  const goal = answers.goal ? t(`q.goal.opt.${answers.goal}`) : '—'
  const risk = t(`actionCard.riskWords.${answers.risk || 'open'}`)
  return format(t('actionCard.whyTpl'), { leftover, goal, risk })
}

// ~30-day roadmap. First step is product-specific; the rest reinforce
// "your next step, wherever you are".
export function buildRoadmap(productKey, t) {
  const items = t('roadmap.items')
  const vars = {
    product: productName(productKey, t),
    firstStep: productSteps(productKey, t)[0],
  }
  return items.map((it, i) => ({
    day: [1, 3, 7, 14, 21, 30][i] ?? (i + 1),
    title: format(it.title, vars),
    hint: format(it.hint, vars),
  }))
}
