// Turn Khatun's markdown-ish reply into a structured node list so the result
// screen can render a real HTML hierarchy (h1 / h2 / <strong> / dividers)
// instead of raw "**" and "---" text.

// Render inline **bold** and *italic* as real <strong>/<em> React nodes.
export function renderInline(text = '') {
  const out = []
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0
  let m
  let key = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1] !== undefined) out.push(<strong key={key++}>{m[1]}</strong>)
    else out.push(<em key={key++}>{m[2]}</em>)
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

// Parse the full reply into ordered blocks.
// Node types: { type:'heading', level, text } | { type:'p', text }
//             | { type:'note', text } | { type:'divider' }
export function parseReply(text = '') {
  const raw = text.replace(/\r/g, '').trim()
  if (!raw) return []

  let blocks = raw.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean)
  if (blocks.length <= 1) {
    blocks = raw.split(/\n/).map((b) => b.trim()).filter(Boolean)
  }

  const nodes = []
  let headingCount = 0

  for (const b of blocks) {
    if (/^-{3,}$/.test(b)) {
      nodes.push({ type: 'divider' })
      continue
    }
    // A whole line wrapped in ** ** is a section heading.
    const heading = b.match(/^\*\*(.+?)\*\*\s*:?\s*$/s)
    if (heading) {
      const level = headingCount === 0 ? 1 : 2
      headingCount += 1
      nodes.push({ type: 'heading', level, text: heading[1].trim() })
      continue
    }
    // A whole line wrapped in a single * * is the soft disclaimer note.
    const note = b.match(/^\*(?!\*)(.+?)\*$/s)
    if (note) {
      nodes.push({ type: 'note', text: note[1].trim() })
      continue
    }
    nodes.push({ type: 'p', text: b })
  }

  return nodes
}

// Contextual follow-up suggestions (3) generated from the recommendation text.
const SUGGESTIONS = {
  ett: [
    '1072 хувьцаатай эсэхээ яаж шалгах вэ?',
    'Брокер яаж сонгох вэ?',
    'Ногдол ашгаа яаж авах вэ?',
  ],
  bond: [
    'Бондыг хаанаас худалдаж авах вэ?',
    'Хугацаа нь хэр удаан вэ?',
    'Хэр найдвартай вэ?',
  ],
  deposit: [
    'Аль банкаар эхлэх нь дээр вэ?',
    'Хэр хугацаагаар тавих вэ?',
    'Хүү яаж тооцогддог вэ?',
  ],
  mse: [
    'Брокерийн данс яаж нээх вэ?',
    'Хэр бага дүнгээр эхэлж болох вэ?',
    'Эрсдэлээ яаж бууруулах вэ?',
  ],
  generic: [
    'Хэр их мөнгөөр эхлэх вэ?',
    'Энэ хэр эрсдэлтэй вэ?',
    'Дараагийн алхам юу вэ?',
  ],
}

export function getSuggestions(reply = '') {
  const t = reply.toLowerCase()
  let key = 'generic'
  if (reply.includes('1072')) key = 'ett'
  else if (t.includes('бонд')) key = 'bond'
  else if (t.includes('хадгаламж')) key = 'deposit'
  else if (/хувьцаа|сан|мхб|брокер/.test(t)) key = 'mse'
  return SUGGESTIONS[key].slice(0, 3)
}
