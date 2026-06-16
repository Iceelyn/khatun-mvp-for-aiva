// Netlify serverless function — the production equivalent of the Express
// /api/chat route. The Anthropic key lives only in Netlify env vars, never in
// the browser. Local dev still uses server/index.js via the Vite proxy.
import { buildSystemPrompt } from '../../server/prompt.js'

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-6'

function json(statusCode, obj) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(obj),
  }
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return json(500, { error: 'ANTHROPIC_API_KEY тохируулагдаагүй байна.' })
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Буруу хүсэлт.' })
  }

  const { messages, lang } = body
  if (!Array.isArray(messages) || messages.length === 0) {
    return json(400, { error: 'messages шаардлагатай.' })
  }

  const clean = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content)
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }))

  try {
    const upstream = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        system: buildSystemPrompt(lang === 'en' ? 'en' : 'mn'),
        messages: clean,
        max_tokens: 1000,
        temperature: 0.3,
      }),
    })

    if (!upstream.ok) {
      const detail = await upstream.text()
      console.error('Anthropic error:', upstream.status, detail)
      return json(502, {
        error: 'Хатунтай холбогдоход алдаа гарлаа. Дахин оролдоно уу.',
      })
    }

    const data = await upstream.json()
    const reply = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()

    return json(200, {
      reply: reply || 'Уучлаарай, хариу олдсонгүй. Дахин оролдоорой.',
    })
  } catch (err) {
    console.error('Function error:', err)
    return json(500, {
      error: 'Дотоод алдаа гарлаа. Хэсэг хүлээгээд дахин оролдоорой.',
    })
  }
}
