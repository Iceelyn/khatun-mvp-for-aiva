What we're building

Khatun (Хатун — "queen") is a private, Mongolian-language AI financial companion for young Mongolian women taking their first step into saving and investing. Most financial guidance is in English and built on foreign products that don't exist in Mongolia, and money-talk carries social shame — so a woman with her first salary leaves it idle while inflation erodes it. Khatun removes the language barrier and the shame: a short, judgment-free guided flow learns a little about her and routes her to ONE real, locally available option with the exact first step she can take today. It is a non-custodial coaching layer that sits above banks and brokers — not a trading app.


Tagline: Санхүүгийн дараагийн алхам ("your next financial step")
Mission: Empower women • Build wealth
Core brand idea (say it out loud across the experience): meet her wherever she is in her journey and give her the next real step — not the first step, her next one. The hero headline and the third onboarding/promise section state this directly ("Чи хаана ч байсан, дараагийн алхамаа" / "Wherever you are, your next step").
The product is a website that doubles as the working MVP: an editorial-luxury landing experience + an interactive guided demo that returns an AI recommendation.


Brand

Logo: a deep-wine emblem of a Mongolian queen in profile in a traditional headdress, with a serif "KHATUN" wordmark. Values: Power · Elegance · Growth · Knowledge. Aesthetic: editorial luxury — cream negative space, large serifs, fine gold rules, the emblem as a motif, slow deliberate motion.

Color tokens (single source of truth in /src/theme):


Background cream #F5EFE8 · Surface white #FFFFFF · Surface soft blush #E9DDD5
Primary wine #7A0F1C · Primary deep #4B0A19
Secondary gold #C7A35A · Accent rose #D96C7A · Mauve #BFA6A0
Ink (text) #1F1F1F
Support (data/illustration only): green #2F7D5C, blue #4C6F91


Typography: display/headings/wordmark = elegant high-contrast serif (Playfair Display / Cormorant Garamond), wordmark in wide-tracked caps; body = clean refined typeface (Inter or EB Garamond). Keep as easy-swap tokens.

Logo assets live in /src/assets/brand (emblem.svg, logo-full.svg, favicon). Emblem in the nav, full lockup in hero + footer. Use a serif wordmark placeholder until the SVGs are added.

Tech stack & conventions


Frontend: React + Vite, mobile-first. Animation: GSAP + ScrollTrigger; optional tasteful Three.js hero. Respect prefers-reduced-motion.
Backend: Node.js + Express — the ONLY place that talks to the AI. The API key NEVER reaches the browser.
AI: the Anthropic API (Claude) — model claude-sonnet-4-6, header anthropic-version: 2023-06-01. Do NOT use Groq or any other provider.
Structure: /src/pages, /src/sections, /src/components, /src/assets/brand, /src/theme, /server. Vite dev proxy for /api/*.
Commit in small, reviewable steps with clear messages.


Hard rules


Spelling is Хатун everywhere (never "Хатан").
NO calculator / discreet-mode screen.
Intake is a guided U-Report-style questionnaire (3 questions, tappable options) — never a free-text chat for the three questions.
The Anthropic key lives ONLY in server/.env (gitignored) and in GitHub Codespaces Secrets as ANTHROPIC_API_KEY. Never commit it or expose it to the client.
The AI must NEVER invent specific rates, prices, or minimums — it tells the user to check the current figure at the bank/broker. It always notes once that this is guidance, not licensed financial advice.


The AI system prompt (kept as the Express system field)

"""
You are Khatun (Хатун), a warm, private, judgment-free financial coach for young Mongolian women taking their first step into saving and investing. Speak like a kind, knowledgeable older sister.
LANGUAGE: Always reply in natural, warm, simple Mongolian (Cyrillic). Short messages, 2-4 sentences, no jargon. Never make her feel behind or foolish.
INPUT: You receive her three answers (money left over, goal, risk comfort). Recommend ONE option from the four below, explain simply why it fits, and give the exact first step plus a small, comfortable starting amount. Then warmly invite any worry.
FOUR PRODUCTS (recommend only from these):


Bank term deposit (хадгаламж) — lowest risk; first step: open one in her bank's app.
Government bond (Засгийн газрын бонд) — low risk; first step: ask her bank or a broker about the current offering.
Erdenes Tavantolgoi "1072" shares (1072 хувьцаа) — many women already own these; first step: check whether she holds them via a licensed broker.
MSE-listed fund or share (МХБ-д бүртгэлтэй сан/хувьцаа) — higher risk; first step: open an account with a licensed broker and start small.
RULES:



Never state a specific interest rate, price, or minimum. If asked a number, kindly tell her to check the current figure at the bank or broker.
Say once that this is friendly guidance, not licensed financial advice, and the final choice is hers.
Only small, comfortable amounts; never suggest borrowing to invest.
If she shows distress or an unsafe situation, be gentle, never pressure her, and suggest a trusted person or local support.
Stay strictly on beginner saving and investing.
"""


Running locally


Frontend: npm install then npm run dev.
Backend: from /server, install deps and run the server; set ANTHROPIC_API_KEY in server/.env.
Keep server/.env gitignored. In Codespaces, the key comes from the repo secret instead.
