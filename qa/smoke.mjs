/**
 * Khatun browser QA — Milestone 5.
 *
 * Run where a browser is installed (the cloud env blocks Playwright's CDN):
 *   npx playwright install chromium
 *   npm run build && npm run preview   # or npm run dev:all
 *   node qa/smoke.mjs
 *
 * Checks: zero console errors/warnings, responsive layouts (no horizontal
 * overflow, tap targets >= 44px), heading order, and the full quiz flow.
 * /api/chat is stubbed via route interception so no real key is needed.
 */
import { chromium, devices } from 'playwright'

const BASE = process.env.QA_URL || 'http://localhost:4173'
const VIEWPORTS = [
  { name: '375 (iPhone SE)', width: 375, height: 812 },
  { name: '414 (iPhone Plus)', width: 414, height: 896 },
  { name: '768 (iPad)', width: 768, height: 1024 },
  { name: '1280 (laptop)', width: 1280, height: 800 },
]

let failures = 0
const fail = (m) => {
  failures++
  console.error('  ✗', m)
}
const pass = (m) => console.log('  ✓', m)

const browser = await chromium.launch()

for (const vp of VIEWPORTS) {
  console.log(`\n▶ Viewport ${vp.name}`)
  const ctx = await browser.newContext({ viewport: vp })
  const page = await ctx.newPage()

  const problems = []
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      problems.push(`${msg.type()}: ${msg.text()}`)
    }
  })
  page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`))

  // Stub the AI endpoint.
  await page.route('**/api/chat', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        reply:
          'Чамд банкны хадгаламж тохирно. Эхний алхам: банкныхаа аппликейшнээс ' +
          'жижиг дүнтэй хадгаламж нээ. Энэ бол найрсаг чиглүүлэг — эцсийн шийдвэр чинийх. 💛',
      }),
    })
  )

  await page.goto(BASE, { waitUntil: 'networkidle' })

  // Horizontal overflow?
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  )
  overflow > 1
    ? fail(`horizontal overflow: ${overflow}px`)
    : pass('no horizontal overflow')

  // Exactly one h1.
  const h1s = await page.locator('h1').count()
  h1s === 1 ? pass('single <h1>') : fail(`expected 1 <h1>, found ${h1s}`)

  // Tap targets on interactive elements.
  const small = await page.evaluate(() => {
    const bad = []
    for (const el of document.querySelectorAll('button, a')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 && r.height === 0) continue
      if (r.height < 44 || r.width < 44) {
        bad.push(`${el.tagName}.${el.className} ${Math.round(r.width)}x${Math.round(r.height)}`)
      }
    }
    return bad
  })
  small.length ? fail(`small tap targets: ${small.join('; ')}`) : pass('tap targets >= 44px')

  // Open demo + walk the 3 questions.
  await page.getByRole('button', { name: 'Туршиж үзэх' }).first().click()
  await page.waitForSelector('.demo')
  for (let i = 0; i < 3; i++) {
    await page.locator('.option').first().click()
    await page.locator('.demo__actions .btn--primary').click()
  }
  await page.waitForSelector('.result__card', { timeout: 8000 })
  pass('quiz flow reached recommendation')

  if (problems.length) {
    for (const p of problems) fail(p)
  } else {
    pass('zero console errors/warnings')
  }

  await ctx.close()
}

await browser.close()

console.log(
  failures === 0
    ? '\n✅ QA passed — 0 failures'
    : `\n❌ QA finished with ${failures} failure(s)`
)
process.exit(failures === 0 ? 0 : 1)
