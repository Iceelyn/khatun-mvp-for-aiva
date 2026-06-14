// Thin client for the Express /api/chat route. The browser NEVER sees the key.
export async function askKhatun(messages) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
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

// Build the single structured message sent after Q3.
export function buildIntakeMessage({ leftover, goal, risk }) {
  return `Үлдэгдэл: ${leftover}; Зорилго: ${goal}; Эрсдэл: ${risk}`
}
