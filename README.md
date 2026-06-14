# Хатун — Khatun

> Санхүүгийн дараагийн алхам · _your next financial step_

A private, Mongolian-language AI financial companion for young Mongolian women
taking their first step into saving and investing. An editorial-luxury landing
experience + an interactive guided demo that returns ONE real, locally
available next step — powered by Claude, with the API key kept strictly
server-side.

**Empower women • Build wealth** — Power · Elegance · Growth · Knowledge

---

## Stack

- **Frontend:** React + Vite, GSAP + ScrollTrigger, lazy Three.js gold-dust hero
- **Backend:** Node + Express — the _only_ place that talks to Anthropic
- **AI:** Anthropic `claude-sonnet-4-6` (`anthropic-version: 2023-06-01`)

```
src/
  pages/        Landing, Demo
  sections/     Hero, Problem, Stat, Promises, ClosingCTA, Footer
  components/   Nav, Emblem, Wordmark, GoldDust, Progress, Result
  theme/        tokens.js + tokens.css (single source of truth) + base.css
  styles/       app / landing / demo CSS
  data/         questions.js (U-Report intake)
  hooks/        useReducedMotion, useGsapReveal
  lib/          api.js (calls /api/*)
  assets/brand/ khatun-logo.png  (official logo — used in nav, hero, result, favicon)
server/         index.js, prompt.js, .env.example
qa/             smoke.mjs (Playwright QA)
```

## Run locally

```bash
# 1. install
npm install
(cd server && npm install)

# 2. set the key (NEVER committed — server/.env is gitignored)
cp server/.env.example server/.env
#   then edit server/.env and set ANTHROPIC_API_KEY=sk-ant-...

# 3. run both (frontend :5173 proxies /api → backend :8787)
npm run dev:all
```

Open http://localhost:5173 . Run the backend alone with `npm run server`, the
frontend alone with `npm run dev`.

### GitHub Codespaces

Don't create `server/.env`. Add the repo secret **`ANTHROPIC_API_KEY`** instead;
it is injected into the environment and read by `server/index.js`.

## Production build

```bash
npm run build      # → dist/  (three.js + gsap are split into lazy chunks)
npm run preview    # serve the build at :4173
```

**Deploy notes**

- Serve `dist/` as static files (Netlify/Vercel/S3/Nginx).
- Deploy `server/` as a Node service with `ANTHROPIC_API_KEY` in its env.
- Point the static host's `/api/*` to the Node service (proxy/redirect), the
  same routing the Vite dev proxy provides locally.
- The Anthropic key lives only in the server env — it is never in the bundle
  or git history.

## Browser QA (Milestone 5)

`qa/smoke.mjs` drives Chromium: zero console errors/warnings, no horizontal
overflow + tap targets ≥ 44px at 375 / 414 / 768 / 1280, single `<h1>`, and the
full quiz → recommendation flow (the AI call is stubbed, so no key needed).

```bash
npx playwright install chromium   # one-time
npm run build && npm run preview  # in one terminal
npm run qa                        # in another  (QA_URL overrides the target)
```

> Note: the managed cloud env blocks Playwright's browser CDN, so this is meant
> to run locally. There, also run a Lighthouse pass (Chrome DevTools →
> Lighthouse) for Performance/Accessibility. Static a11y fixes already applied:
> AA-contrast gold for small text on cream (`--c-gold-ink`), `lang` on the
> English subline, ≥44px tap targets, `prefers-reduced-motion` honoured
> everywhere, lazy Three.js.

## 5-step test checklist

1. **Landing** loads with zero console errors; hero emblem + "KHATUN" +
   gold eyebrow + serif headline animate in; scroll reveals problem → 71%/14%
   stats → 3 promises → closing CTA → footer.
2. **Open demo** via "Туршиж үзэх" (or nav "Эхлэх"): full-screen cream flow,
   gold 3-step progress (active = pill).
3. **Answer Q1–Q3** (cards highlight wine/gold on select); Q3 button reads
   "Хатунд асуух".
4. **Loading → recommendation**: warm loading state, then Khatun's reply in
   Mongolian with ONE product + concrete first step.
5. **Follow-up**: ask one free-text question → same route answers; "Дахин
   эхлэх" resets, "Дуусгах" closes. Re-check on mobile (375px) and with
   reduced-motion on.

---

_Хатун нь найрсаг чиглүүлэг өгдөг — лицензтэй санхүүгийн зөвлөгөө биш._
