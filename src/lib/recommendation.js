// Derive structured, demo-ready data from her three answers + the AI reply.
// Amounts are deliberately qualitative / relative (a share of HER own leftover)
// — Khatun never invents product rates, prices, or minimums.

export const PRODUCTS = {
  deposit: {
    key: 'deposit',
    name: 'Банкны хадгаламж',
    emoji: '🏦',
    steps: [
      'Банкныхаа аппликейшнийг нээ',
      '«Хадгаламж нээх» хэсгийг сонго',
      'Тав тухтай жижиг дүнгээр хадгаламжаа нээ',
    ],
  },
  bond: {
    key: 'bond',
    name: 'Засгийн газрын бонд',
    emoji: '📜',
    steps: [
      'Банк эсвэл брокерээсээ Засгийн газрын бондын талаар асуу',
      'Одоо санал болгож буй хувилбарыг шалга',
      'Жижиг дүнгээр эхэлж худалдан ав',
    ],
  },
  ett: {
    key: 'ett',
    name: '1072 хувьцаа',
    emoji: '💎',
    steps: [
      'Лицензтэй брокерээр 1072 хувьцаатай эсэхээ шалга',
      'Брокерийн данстай эсэхээ нягтал',
      'Ногдол ашиг, мэдээллээ тогтмол хяна',
    ],
  },
  mse: {
    key: 'mse',
    name: 'МХБ-д бүртгэлтэй сан/хувьцаа',
    emoji: '📈',
    steps: [
      'Лицензтэй брокер сонгож данс нээ',
      'МХБ-д бүртгэлтэй сан/хувьцааг судал',
      'Маш жижиг дүнгээр туршиж эхэл',
    ],
  },
}

export function detectProduct(reply = '') {
  const t = reply.toLowerCase()
  if (reply.includes('1072')) return 'ett'
  if (t.includes('бонд')) return 'bond'
  if (t.includes('хадгаламж')) return 'deposit'
  if (/хувьцаа|сан|мхб|брокер/.test(t)) return 'mse'
  return 'deposit'
}

// A comfortable starting amount expressed relative to her own leftover — never
// an invented product minimum.
export function getAmountRange(leftover = '') {
  if (leftover.includes('Бараг'))
    return 'Маш жижиг дүн — нэг аяга кофены үнэ ч болов. Гол нь зуршил болгох.'
  return 'Сарын үлдэгдлийнхээ багахан хэсэг (~10–20%) — өөрт тав тухтай хэмжээ.'
}

// One-line "Why this?" tying the recommendation to her three answers.
export function getWhy({ leftover, goal, risk } = {}) {
  const riskBit = risk?.includes('Болгоомжтой')
    ? 'болгоомжтой'
    : risk?.includes('Туршихад')
      ? 'туршихад бэлэн'
      : 'тэнцвэртэй'
  return `Чиний үлдэгдэл (${leftover || '—'}), зорилго (${goal || '—'}) болон ${riskBit} хандлагад хамгийн ойр, дарамтгүй эхлэл учраас.`
}

// ~30-day roadmap: small, ordered next steps. The first step is product-specific
// (her actual first action); the rest reinforce "your next step, wherever you are".
export function buildRoadmap(productKey) {
  const p = PRODUCTS[productKey] || PRODUCTS.deposit
  return [
    { day: 1, title: `Эхний алхам — ${p.name.toLowerCase()}`, hint: p.steps[0] },
    { day: 3, title: 'Нэг ойлголт сурах: «хүү» гэж юу вэ', hint: 'Богино видео эсвэл нийтлэл уншаад ойлго.' },
    { day: 7, title: '7 хоногийн анхны алхамаа дуусга', hint: 'Тууштай байдлаа бэхжүүл.' },
    { day: 14, title: '1072 хувьцаатай эсэхээ шалга', hint: 'Олон эмэгтэй аль хэдийн эзэмшдэг.' },
    { day: 21, title: 'Тогтмол хуримтлалын дүнгээ тогтоо', hint: 'Жижиг ч гэсэн тогтмол байх нь чухал.' },
    { day: 30, title: 'Сарын ахицаа хараад дараагийн зорилго тавь', hint: 'Чи хаана ч байсан — дараагийн алхам.' },
  ]
}
