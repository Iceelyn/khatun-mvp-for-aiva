import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { buildSystemPrompt } from './prompt.js'

const app = express()
const PORT = process.env.PORT || 8787

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-6'

app.use(cors())
app.use(express.json({ limit: '64kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, hasKey: Boolean(process.env.ANTHROPIC_API_KEY) })
})

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: 'ANTHROPIC_API_KEY тохируулагдаагүй байна.' })
  }

  const { messages, lang } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages шаардлагатай.' })
  }
  const systemPrompt = buildSystemPrompt(lang === 'en' ? 'en' : 'mn')

  // Sanitize to the shape the API expects.
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
        system: systemPrompt,
        messages: clean,
        max_tokens: 1000,
        temperature: 0.3,
      }),
    })

    if (!upstream.ok) {
      const detail = await upstream.text()
      console.error('Anthropic error:', upstream.status, detail)
      return res
        .status(502)
        .json({ error: 'Хатунтай холбогдоход алдаа гарлаа. Дахин оролдоно уу.' })
    }

    const data = await upstream.json()
    const reply = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()

    res.json({ reply: reply || 'Уучлаарай, хариу олдсонгүй. Дахин оролдоорой.' })
  } catch (err) {
    console.error('Server error:', err)
    res
      .status(500)
      .json({ error: 'Дотоод алдаа гарлаа. Хэсэг хүлээгээд дахин оролдоорой.' })
  }
})

app.listen(PORT, () => {
  console.log(`Khatun API listening on http://localhost:${PORT}`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠  ANTHROPIC_API_KEY not set — set it in server/.env')
  }
})
