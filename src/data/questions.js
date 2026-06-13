// U-Report-style intake — 3 questions, tappable options (never free-text).
export const QUESTIONS = [
  {
    id: 'leftover',
    label: 'Үлдэгдэл',
    title: 'Сард зарлагынхаа дараа хэр их үлддэг вэ? 💸',
    layout: 'grid', // 2x2
    cta: 'Үргэлжлүүлэх',
    options: [
      { value: 'Бараг үлддэггүй', emoji: '😅', label: 'Бараг үлддэггүй' },
      { value: '100,000₮ хүртэл', emoji: '🪙', label: '100,000₮ хүртэл' },
      { value: '100,000–300,000₮', emoji: '💵', label: '100,000–300,000₮' },
      { value: '300,000₮-с дээш', emoji: '💰', label: '300,000₮-с дээш' },
    ],
  },
  {
    id: 'goal',
    label: 'Зорилго',
    title: 'Таны зорилго юу вэ? 🎯',
    layout: 'grid', // 2x2
    cta: 'Үргэлжлүүлэх',
    options: [
      { value: 'Хадгаламжаа өсгөх', emoji: '📈', label: 'Хадгаламжаа өсгөх' },
      { value: 'Инфляциас хамгаалах', emoji: '🛡️', label: 'Инфляциас хамгаалах' },
      {
        value: 'Тодорхой зорилгод хуримтлуулах',
        emoji: '🏠',
        label: 'Тодорхой зорилгод хуримтлуулах',
      },
      { value: 'Зүгээр л эхлэх', emoji: '✨', label: 'Зүгээр л эхлэх' },
    ],
  },
  {
    id: 'risk',
    label: 'Эрсдэл',
    title: 'Эрсдэлд хэр тэвчээртэй вэ? ⚖️',
    layout: 'circles', // row of 3
    cta: 'Хатунд асуух',
    options: [
      { value: 'Болгоомжтой', emoji: '🐢', label: 'Болгоомжтой' },
      { value: 'Жаахан нээлттэй', emoji: '🙂', label: 'Жаахан нээлттэй' },
      { value: 'Туршихад бэлэн', emoji: '🚀', label: 'Туршихад бэлэн' },
    ],
  },
]
