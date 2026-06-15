// U-Report intake — stable option keys (language-neutral). Labels/titles come
// from the i18n dictionary; emojis live here since they're language-neutral.
export const QUESTIONS = [
  {
    id: 'leftover',
    layout: 'grid',
    cta: 'continue',
    options: [
      { key: 'barely', emoji: '😅' },
      { key: 'upTo100', emoji: '🪙' },
      { key: 'between', emoji: '💵' },
      { key: 'above300', emoji: '💰' },
    ],
  },
  {
    id: 'goal',
    layout: 'grid',
    cta: 'continue',
    options: [
      { key: 'grow', emoji: '📈' },
      { key: 'inflation', emoji: '🛡️' },
      { key: 'target', emoji: '🏠' },
      { key: 'juststart', emoji: '✨' },
    ],
  },
  {
    id: 'risk',
    layout: 'circles',
    cta: 'ask',
    options: [
      { key: 'cautious', emoji: '🐢' },
      { key: 'open', emoji: '🙂' },
      { key: 'ready', emoji: '🚀' },
    ],
  },
]
