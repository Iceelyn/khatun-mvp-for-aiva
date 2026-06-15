// Thin client for the Express /api/chat route. The browser NEVER sees the key.
export async function askKhatun(messages, lang = 'mn') {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, lang }),
  })

  if (!res.ok) {
    let detail = ''
    try {
      const data = await res.json()
      detail = data?.error || ''
    } catch {
      /* ignore */
    }
    const err = new Error(detail || `Request failed (${res.status})`)
    err.status = res.status
    throw err
  }

  const data = await res.json()
  return data.reply
}

// Build the single structured intake message after Q3, in the active language.
// `answers` holds option keys; `t` localizes them.
export function buildIntakeMessage(answers = {}, t) {
  const get = (q, k) => (k ? t(`q.${q}.opt.${k}`) : '—')
  return [
    `${t('intake.leftover')}: ${get('leftover', answers.leftover)}`,
    `${t('intake.goal')}: ${get('goal', answers.goal)}`,
    `${t('intake.risk')}: ${get('risk', answers.risk)}`,
  ].join('; ')
}
