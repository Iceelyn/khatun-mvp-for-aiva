// Full bilingual dictionary (MN + EN). Values may be strings or arrays/objects;
// the resolver returns whatever sits at the dotted path. {tokens} are filled by
// the format() helper.
export const dict = {
  mn: {
    lang: { mn: 'МН', en: 'EN', switchTo: 'Англиар', aria: 'Хэл сонгох' },
    nav: { start: 'Эхлэх', home: 'Хатун — нүүр хуудас' },
    hero: {
      eyebrow: 'Санхүүгийн дараагийн алхам',
      line1: 'Чи хаана ч байсан,',
      line2: 'дараагийн алхамаа хийе.',
      sub: 'Мөнгөнийхөө аялалд хаана ч байсан — Хатун дараагийн алхмыг чамтай хамт хийнэ. Хувийн, Монгол хэлээр.',
      cta: 'Туршиж үзэх',
      scroll: 'доош гүйлгэ',
    },
    problem: {
      eyebrow: 'Танил түүх',
      head: 'Тэр Google дээр «{q}» гэж бичнэ. Англиар. Гадны бүтээгдэхүүн. Ойлгомжгүй.',
      query: 'how to start investing',
      body: 'Тэгээд цонхоо хаана. Анхны цалин нь дансандаа хэвээрээ үлдэж, инфляци чимээгүйхэн идэж эхэлнэ. Буруу нь түүнийх биш — түүнд зориулсан зам байхгүй байсан нь асуудал.',
    },
    stat: {
      cap71: 'Эмэгтэйчүүдийн 71% нь хөрөнгө оруулалт нь үе дамжсан баялгийг бий болгох арга зам гэдэгтэй санал нийлдэг.',
      cap14: 'Гэтэл ердөө 14% нь хөрөнгө оруулалтын мэдлэгтээ өндөр итгэлтэй байдаг.',
      source: 'Fidelity Investments, 2024.',
    },
    promises: {
      eyebrow: 'Хатуны амлалт',
      title: 'Гурван амлалт',
      items: [
        {
          title: 'Чиний хэлээр, шүүлтгүй',
          body: 'Хувийн, Монгол хэлээр, шүүн тунгаалтгүй. Хэн ч чамайг хожимдсон, эсвэл тэнэг гэж бодохгүй.',
        },
        {
          title: 'Эхний бодит алхам — хэдхэн минутад',
          body: 'Дансандаа зүгээр хэвтэж буй мөнгийг нэг тодорхой үйлдэл болгон хувиргана. Богино, ойлгомжтой.',
        },
        {
          title: 'Хатун — чиний хажууд алхах AI хамтрагч',
          body: 'Чамайг хаана байгаагаар чинь угтан авч, дараагийн алхамыг хамт хийнэ.',
          subtext: 'Чи хаана ч байсан, нэг алхам урагшил.',
        },
      ],
    },
    closing: {
      head: 'Дараагийн алхамаа өнөөдөр хийе.',
      sub: 'Хэдхэн асуултад хариулаад, чамд тохирох нэг бодит сонголтыг хүлээж ав.',
      cta: 'Туршиж үзэх',
    },
    footer: {
      tagline: 'Санхүүгийн дараагийн алхам',
      mission: 'Эмэгтэйчүүдийг чадавхжуулъя • Баялаг бүтээе',
      values: ['Хүч', 'Гоо сайхан', 'Өсөлт', 'Мэдлэг'],
      legal:
        'Хатун нь найрсаг чиглүүлэг өгдөг — лицензтэй санхүүгийн зөвлөгөө биш. Эцсийн шийдвэр чинийх. © {year} Khatun.',
    },
    demo: {
      close: 'Хаах',
      ariaDialog: 'Хатуны асуулга',
      back: 'Буцах',
      returningEyebrow: 'Дахин тавтай морил',
      welcomeNamed: 'Тавтай морил, {name}!',
      welcomeAnon: 'Чи буцаж ирлээ!',
      resumeSubProduct:
        'Сүүлд бид «{product}»-аар эхэлсэн. Дараагийн алхам руугаа үргэлжлүүлэх үү?',
      resumeSubAnon: 'Үлдсэн алхамаа үргэлжлүүлэх үү?',
      resume: 'Дараагийн алхам үзэх',
      restart: 'Шинээр эхлэх',
      stepLabel: 'Алхам {n} / {total} · {label}',
      loading: 'Хатун чамд тохирох алхамыг бодож байна…',
      errorTitle: 'Өө, түр холболтын алдаа гарлаа.',
      errorSub: 'Дахин оролдоод үзье — Хатун чамайг хүлээж байна. 💛',
      retry: 'Дахин оролдох',
    },
    q: {
      cta: { continue: 'Үргэлжлүүлэх', ask: 'Хатунд асуух' },
      label: { leftover: 'Үлдэгдэл', goal: 'Зорилго', risk: 'Эрсдэл' },
      leftover: {
        title: 'Сард зарлагынхаа дараа хэр их үлддэг вэ? 💸',
        opt: {
          barely: 'Бараг үлддэггүй',
          upTo100: '100,000₮ хүртэл',
          between: '100,000–300,000₮',
          above300: '300,000₮-с дээш',
        },
      },
      goal: {
        title: 'Таны зорилго юу вэ? 🎯',
        opt: {
          grow: 'Хадгаламжаа өсгөх',
          inflation: 'Инфляциас хамгаалах',
          target: 'Тодорхой зорилгод хуримтлуулах',
          juststart: 'Зүгээр л эхлэх',
        },
      },
      risk: {
        title: 'Эрсдэлд хэр тэвчээртэй вэ? ⚖️',
        opt: {
          cautious: 'Болгоомжтой',
          open: 'Жаахан нээлттэй',
          ready: 'Туршихад бэлэн',
        },
      },
    },
    intake: { leftover: 'Үлдэгдэл', goal: 'Зорилго', risk: 'Эрсдэл' },
    result: {
      eyebrow: 'Хатуны зөвлөмж',
      askPlaceholder: 'Нэмж асуух зүйл байна уу?',
      send: 'Илгээх',
      typing: 'Хатун бичиж байна…',
      suggestionsAria: 'Санал болгож буй асуултууд',
      askAria: 'Хатунаас нэмж асуух',
      restart: 'Дахин эхлэх',
      finish: 'Дуусгах',
      disclaimerBar:
        '🔒 Хувийн · 🤖 AI чиглүүлэг, лицензтэй санхүүгийн зөвлөгөө биш · тодорхой хүү, үнэ, доод хязгаарыг хэзээ ч зохиодоггүй — банк/брокерээсээ шалга.',
      followError: 'Уучлаарай, түр алдаа гарлаа. Дахин оролдоод үзээрэй. 🙏',
      explainToggle: 'Хатуны тайлбар',
      followToggle: 'Асуух зүйл байна уу?',
      journeyCta: 'Миний 30 хоногийн замыг харах',
      saveNamePh: 'Нэр (заавал биш)',
      saveHint: 'Хадгалах шаардлагагүй — хүссэн үедээ буцаж болно.',
    },
    howItWorks: {
      title: 'Khatun AI хэрхэн ажилладаг',
      items: [
        'Энэ бол AI туслах — найрсаг чиглүүлэг өгдөг.',
        'Зөвхөн Монголд бодитоор байдаг, баталгаатай бүтээгдэхүүнийг л санал болгоно.',
        'Тодорхой хүү, үнэ, тоог хэзээ ч зохиодоггүй — банк/брокерээсээ шалгахыг хэлдэг.',
        'Лицензтэй санхүүгийн зөвлөгөө биш. Эцсийн шийдвэр чинийх.',
        'Нэвтрэх шаардлагагүй. Таны хуваалцсан зүйлийг хэн нэгэнд зардаггүй, дамжуулдаггүй.',
      ],
    },
    safety: {
      title: 'Чи ганцаараа биш 💛',
      body: 'Хэрэв чамд хэцүү байгаа бол — мөнгө хүлээж чадна. Итгэдэг хүндээ, эсвэл ойр дотныхондоо хандаарай. Khatun бол хямралын тусламжийн үйлчилгээ биш.',
    },
    journeyScreen: {
      header: 'Таны аялал',
      eyebrow: 'Чиний хамтрагч',
      roadmapSection: '30 хоногийн зам',
      challengesSection: 'Сорилтууд',
      remindersSection: 'Сануулга',
      back: 'Буцах',
      done: 'Дуусгах',
    },
    welcome: {
      hi: 'Тавтай морил, {name}',
      hiAnon: 'Тавтай морил!',
      next: 'Дараагийн алхам',
      cta: 'Үргэлжлүүлэх',
      dismiss: 'Хаах',
    },
    actionCard: {
      eyebrow: 'Чиний эхний алхам',
      amountLabel: 'Тав тухтай эхлэх хэмжээ',
      done: 'Хийсэн',
      doneState: '✓ Хийсэн',
      why: 'Яагаад энэ гэж?',
      amountNote: 'Тодорхой хүү, үнэ, доод хязгаарыг банк/брокерээсээ шалгаарай.',
      amount: {
        barely:
          'Маш жижиг дүн — нэг аяга кофены үнэ ч болов. Гол нь зуршил болгох.',
        normal:
          'Сарын үлдэгдлийнхээ багахан хэсэг (~10–20%) — өөрт тав тухтай хэмжээ.',
      },
      whyTpl:
        'Чиний үлдэгдэл ({leftover}), зорилго ({goal}) болон {risk} хандлагад хамгийн ойр, дарамтгүй эхлэл учраас.',
      riskWords: { cautious: 'болгоомжтой', open: 'нээлттэй', ready: 'туршихад бэлэн' },
    },
    products: {
      deposit: {
        name: 'Банкны хадгаламж',
        steps: [
          'Банкныхаа аппликейшнийг нээ',
          '«Хадгаламж нээх» хэсгийг сонго',
          'Тав тухтай жижиг дүнгээр хадгаламжаа нээ',
        ],
        suggestions: [
          'Аль банкаар эхлэх нь дээр вэ?',
          'Хэр хугацаагаар тавих вэ?',
          'Хүү яаж тооцогддог вэ?',
        ],
      },
      bond: {
        name: 'Засгийн газрын бонд',
        steps: [
          'Банк эсвэл брокерээсээ Засгийн газрын бондын талаар асуу',
          'Одоо санал болгож буй хувилбарыг шалга',
          'Жижиг дүнгээр эхэлж худалдан ав',
        ],
        suggestions: [
          'Бондыг хаанаас худалдаж авах вэ?',
          'Хугацаа нь хэр удаан вэ?',
          'Хэр найдвартай вэ?',
        ],
      },
      ett: {
        name: '1072 хувьцаа',
        steps: [
          'Лицензтэй брокерээр 1072 хувьцаатай эсэхээ шалга',
          'Брокерийн данстай эсэхээ нягтал',
          'Ногдол ашиг, мэдээллээ тогтмол хяна',
        ],
        suggestions: [
          '1072 хувьцаатай эсэхээ яаж шалгах вэ?',
          'Брокер яаж сонгох вэ?',
          'Ногдол ашгаа яаж авах вэ?',
        ],
      },
      mse: {
        name: 'МХБ-д бүртгэлтэй сан/хувьцаа',
        steps: [
          'Лицензтэй брокер сонгож данс нээ',
          'МХБ-д бүртгэлтэй сан/хувьцааг судал',
          'Маш жижиг дүнгээр туршиж эхэл',
        ],
        suggestions: [
          'Брокерийн данс яаж нээх вэ?',
          'Хэр бага дүнгээр эхэлж болох вэ?',
          'Эрсдэлээ яаж бууруулах вэ?',
        ],
      },
    },
    ichart: {
      title: 'Хэрэв чи 1 жил юу ч хийхгүй бол?',
      sub: 'Жишээ тооцоо · инфляци ~10%/жил · зөвхөн ойлголтын зориулалттай',
      legendInvest: 'Хөрөнгө оруулсан зам — инфляциас хамгаалдаг',
      legendIdle: 'Чөлөөтэй хэвтэх мөнгө — худалдан авах чадвар буурдаг',
      axisStart: 'Өнөөдөр',
      axisEnd: '12 сар',
      aria: 'Чөлөөтэй хэвтэх мөнгө vs хөрөнгө оруулсан замын жишээ харьцуулалт',
    },
    journey: {
      introTitle: 'Аяллаа хадгалах уу?',
      introSub:
        'Заавал биш. Хадгалбал 30 хоногийн зам, сорилт, сануулга чинь нээгдэж, дараа орж ирэхэд дараагийн алхамаас чинь үргэлжилнэ.',
      namePh: 'Нэр (заавал биш)',
      contactPh: 'Утас эсвэл и-мэйл (заавал биш)',
      save: 'Аяллаа хадгалах',
      skip: 'Бүртгэлгүй үргэлжлүүлэх',
      welcomeNamed: '{name}, аялал чинь эхэллээ ✨',
      welcomeAnon: 'Аялал чинь эхэллээ ✨',
      future:
        'SMS/и-мэйл сануулга — удахгүй нэмэгдэх боломж. Одоохондоо доорх хэрэгслүүдээр сануулгаа тохируул.',
    },
    roadmap: {
      title: 'Таны 30 хоногийн зам',
      next: 'Дараагийн алхам',
      day: '{day} дэх өдөр',
      doneMsg:
        '🎉 Бүх алхмаа дуусгалаа! Чи хаана ч байсан — дараагийн зорилго тавих цаг.',
      checkAria: 'Дуусгасан гэж тэмдэглэх',
      items: [
        { title: 'Эхний алхам — {product}', hint: '{firstStep}' },
        { title: 'Нэг ойлголт сурах: «хүү» гэж юу вэ', hint: 'Богино видео эсвэл нийтлэл уншаад ойлго.' },
        { title: '7 хоногийн анхны алхамаа дуусга', hint: 'Тууштай байдлаа бэхжүүл.' },
        { title: '1072 хувьцаатай эсэхээ шалга', hint: 'Олон эмэгтэй аль хэдийн эзэмшдэг.' },
        { title: 'Тогтмол хуримтлалын дүнгээ тогтоо', hint: 'Жижиг ч гэсэн тогтмол байх нь чухал.' },
        { title: 'Сарын ахицаа хараад дараагийн зорилго тавь', hint: 'Чи хаана ч байсан — дараагийн алхам.' },
      ],
    },
    challenges: {
      title: 'Сорилтууд',
      streakName: '7 хоногийн анхны алхам',
      streakBtn: 'Өнөөдрийн алхмаа тэмдэглэх',
      streakTagged: '✓ Өнөөдөр тэмдэглэгдсэн',
      streakWin: '🎉 Бүтэн 7 хоног! Тууштай байдал чинь гайхалтай.',
      monthlyName: 'Энэ сард хуримтлуул',
      monthlyTargetPh: 'Зорилго (₮)',
      monthlySet: 'Зорилго тавих',
      monthlyAddPh: 'Хуримтлуулсан дүн (₮)',
      monthlyAdd: 'Нэмэх',
      monthlyWin: '🎉 Зорилгодоо хүрлээ! Дараагийн сард ахиулъя.',
    },
    reminders: {
      title: 'Сануулга тохируулах',
      notifBtn: 'Хөтчийн мэдэгдэл асаах',
      notifActive: '🔔 Мэдэгдэл идэвхтэй',
      calBtn: 'Календарьт нэмэх (.ics)',
      statusOn: 'Мэдэгдэл идэвхжлээ ✓',
      statusOff: 'Мэдэгдэл идэвхжсэнгүй — хүссэн үедээ дахин оролдоорой.',
      statusFail: 'Мэдэгдэл тохируулж чадсангүй.',
      notSupported: 'Энэ хөтөч мэдэгдэл дэмждэггүй.',
      statusCal: 'Календарийн файл татагдлаа ✓',
      future: 'SMS/и-мэйл сануулга удахгүй — {contact} хаягт.',
      notifTitle: 'Хатун 💛',
      notifBody: 'Дараагийн санхүүгийн алхамаа битгий март. Чи чадна!',
      calTitle: 'Хатун: дараагийн санхүүгийн алхам',
      calDesc:
        'Өнөөдөр жижигхэн алхам хий — хадгаламж/хөрөнгө оруулалтаа нэг алхмаар урагшлуул. — Хатун',
    },
  },

  en: {
    lang: { mn: 'МН', en: 'EN', switchTo: 'Mongolian', aria: 'Choose language' },
    nav: { start: 'Start', home: 'Khatun — home' },
    hero: {
      eyebrow: 'Your next financial step',
      line1: 'Wherever you are,',
      line2: "let's take your next step.",
      sub: 'Wherever you are in your money journey, Khatun walks the next step with you — privately, in your language.',
      cta: 'Try it',
      scroll: 'scroll down',
    },
    problem: {
      eyebrow: 'A familiar story',
      head: 'She types «{q}» into Google. In English. Foreign products. Confusing.',
      query: 'how to start investing',
      body: 'So she closes the tab. Her first salary sits idle in her account while inflation quietly eats it. It was never her fault — there simply was no path made for her.',
    },
    stat: {
      cap71: '71% of women agree that investing is a way to build generational wealth.',
      cap14: 'Yet only 14% feel highly confident in their investing knowledge.',
      source: 'Fidelity Investments, 2024.',
    },
    promises: {
      eyebrow: "Khatun's promise",
      title: 'Three promises',
      items: [
        {
          title: 'Your language, no judgment',
          body: 'Private, in your language, judgment-free. No one will think you are behind or foolish.',
        },
        {
          title: 'A real first step — in minutes',
          body: 'Turn money sitting idle into one concrete action. Short and clear.',
        },
        {
          title: 'Khatun — the AI companion who walks beside you',
          body: 'She meets you wherever you are and takes the next step with you.',
          subtext: 'Wherever you are, one step forward.',
        },
      ],
    },
    closing: {
      head: "Let's take your next step today.",
      sub: 'Answer a few questions and receive one real option that fits you.',
      cta: 'Try it',
    },
    footer: {
      tagline: 'Your next financial step',
      mission: 'Empower women • Build wealth',
      values: ['Power', 'Elegance', 'Growth', 'Knowledge'],
      legal:
        'Khatun offers friendly guidance — not licensed financial advice. The final choice is yours. © {year} Khatun.',
    },
    demo: {
      close: 'Close',
      ariaDialog: "Khatun's questionnaire",
      back: 'Back',
      returningEyebrow: 'Welcome back',
      welcomeNamed: 'Welcome back, {name}!',
      welcomeAnon: "You're back!",
      resumeSubProduct:
        'Last time we started with «{product}». Continue to your next step?',
      resumeSubAnon: 'Continue where you left off?',
      resume: 'See my next step',
      restart: 'Start fresh',
      stepLabel: 'Step {n} / {total} · {label}',
      loading: 'Khatun is thinking about the step that fits you…',
      errorTitle: 'Oh, a brief connection error.',
      errorSub: "Let's try again — Khatun is waiting for you. 💛",
      retry: 'Try again',
    },
    q: {
      cta: { continue: 'Continue', ask: 'Ask Khatun' },
      label: { leftover: 'Leftover', goal: 'Goal', risk: 'Risk' },
      leftover: {
        title: 'How much is left after your monthly spending? 💸',
        opt: {
          barely: 'Almost nothing',
          upTo100: 'Up to 100,000₮',
          between: '100,000–300,000₮',
          above300: 'Over 300,000₮',
        },
      },
      goal: {
        title: 'What is your goal? 🎯',
        opt: {
          grow: 'Grow my savings',
          inflation: 'Protect against inflation',
          target: 'Save for a specific goal',
          juststart: 'Just get started',
        },
      },
      risk: {
        title: 'How comfortable are you with risk? ⚖️',
        opt: {
          cautious: 'Cautious',
          open: 'A little open',
          ready: 'Ready to try',
        },
      },
    },
    intake: { leftover: 'Leftover', goal: 'Goal', risk: 'Risk' },
    result: {
      eyebrow: "Khatun's recommendation",
      askPlaceholder: 'Have another question?',
      send: 'Send',
      typing: 'Khatun is typing…',
      suggestionsAria: 'Suggested questions',
      askAria: 'Ask Khatun a follow-up',
      restart: 'Start over',
      finish: 'Finish',
      disclaimerBar:
        '🔒 Private · 🤖 AI guidance, not licensed financial advice · never invents rates, prices or minimums — check with your bank/broker.',
      followError: 'Sorry, a brief error. Please try again. 🙏',
      explainToggle: "Khatun's explanation",
      followToggle: 'Have a question?',
      journeyCta: 'See my 30-day path',
      saveNamePh: 'Name (optional)',
      saveHint: 'No need to save — come back anytime.',
    },
    howItWorks: {
      title: 'How Khatun AI works',
      items: [
        "It's an AI guide — it offers friendly guidance.",
        'It only recommends verified products that actually exist in Mongolia.',
        'It never invents rates, prices or figures — it tells you to check with your bank/broker.',
        'It is not licensed financial advice. The final choice is yours.',
        'No login required. Nothing you share is sold or shared with anyone.',
      ],
    },
    safety: {
      title: 'You are not alone 💛',
      body: "If things feel hard right now — money can wait. Please reach out to someone you trust or people close to you. Khatun is not a crisis support service.",
    },
    journeyScreen: {
      header: 'Your journey',
      eyebrow: 'Your companion',
      roadmapSection: '30-day path',
      challengesSection: 'Challenges',
      remindersSection: 'Reminders',
      back: 'Back',
      done: 'Finish',
    },
    welcome: {
      hi: 'Welcome back, {name}',
      hiAnon: 'Welcome back!',
      next: 'Next step',
      cta: 'Continue',
      dismiss: 'Dismiss',
    },
    actionCard: {
      eyebrow: 'Your first step',
      amountLabel: 'A comfortable starting amount',
      done: 'Done',
      doneState: '✓ Done',
      why: 'Why this?',
      amountNote: 'Check the exact rate, price or minimum with your bank/broker.',
      amount: {
        barely:
          'A very small amount — even the price of one coffee. The point is to build the habit.',
        normal:
          'A small slice of your monthly leftover (~10–20%) — an amount that feels comfortable.',
      },
      whyTpl:
        'Because it is the closest, pressure-free start for your leftover ({leftover}), goal ({goal}) and {risk} approach.',
      riskWords: { cautious: 'cautious', open: 'open', ready: 'ready-to-try' },
    },
    products: {
      deposit: {
        name: 'Bank term deposit',
        steps: [
          "Open your bank's app",
          'Find the "open a deposit" section',
          'Open a deposit with a small, comfortable amount',
        ],
        suggestions: [
          'Which bank should I start with?',
          'For how long should I deposit?',
          'How is interest calculated?',
        ],
      },
      bond: {
        name: 'Government bond',
        steps: [
          'Ask your bank or a broker about government bonds',
          'Check the current offering',
          'Buy a small amount to start',
        ],
        suggestions: [
          'Where do I buy a bond?',
          'How long is the term?',
          'How safe is it?',
        ],
      },
      ett: {
        name: '"1072" shares',
        steps: [
          'Check via a licensed broker whether you hold 1072 shares',
          'Confirm you have a broker account',
          'Track your dividends and updates regularly',
        ],
        suggestions: [
          'How do I check if I own 1072 shares?',
          'How do I choose a broker?',
          'How do I receive dividends?',
        ],
      },
      mse: {
        name: 'MSE-listed fund/share',
        steps: [
          'Choose a licensed broker and open an account',
          'Research MSE-listed funds/shares',
          'Start small to test the waters',
        ],
        suggestions: [
          'How do I open a broker account?',
          'How small can I start?',
          'How do I reduce risk?',
        ],
      },
    },
    ichart: {
      title: 'What if you do nothing for 1 year?',
      sub: 'Example only · inflation ~10%/yr · for illustration purposes',
      legendInvest: 'Invested path — protects against inflation',
      legendIdle: 'Idle money — purchasing power declines',
      axisStart: 'Today',
      axisEnd: '12 months',
      aria: 'Example comparison of idle money vs an invested path',
    },
    journey: {
      introTitle: 'Save your journey?',
      introSub:
        'Optional. Saving unlocks your 30-day roadmap, challenges and reminders — and picks up at your next step when you return.',
      namePh: 'Name (optional)',
      contactPh: 'Phone or email (optional)',
      save: 'Save my journey',
      skip: 'Continue without saving',
      welcomeNamed: '{name}, your journey has begun ✨',
      welcomeAnon: 'Your journey has begun ✨',
      future:
        'SMS/email reminders — coming soon. For now, set a reminder with the tools below.',
    },
    roadmap: {
      title: 'Your 30-day path',
      next: 'Next step',
      day: 'Day {day}',
      doneMsg:
        '🎉 You finished every step! Wherever you are — time to set the next goal.',
      checkAria: 'Mark as done',
      items: [
        { title: 'First step — {product}', hint: '{firstStep}' },
        { title: 'Learn one concept: what is "interest"', hint: 'Watch a short video or read an article.' },
        { title: 'Finish your 7-day first-step streak', hint: 'Build consistency.' },
        { title: 'Check whether you own 1072 shares', hint: 'Many women already do.' },
        { title: 'Set a regular savings amount', hint: 'Small but consistent is what matters.' },
        { title: "Review the month's progress and set the next goal", hint: 'Wherever you are — your next step.' },
      ],
    },
    challenges: {
      title: 'Challenges',
      streakName: '7-day first-step streak',
      streakBtn: "Mark today's step",
      streakTagged: '✓ Marked today',
      streakWin: '🎉 A full 7 days! Your consistency is amazing.',
      monthlyName: 'Save this month',
      monthlyTargetPh: 'Goal (₮)',
      monthlySet: 'Set goal',
      monthlyAddPh: 'Amount saved (₮)',
      monthlyAdd: 'Add',
      monthlyWin: '🎉 You hit your goal! Let’s aim higher next month.',
    },
    reminders: {
      title: 'Set a reminder',
      notifBtn: 'Enable browser notification',
      notifActive: '🔔 Notification on',
      calBtn: 'Add to calendar (.ics)',
      statusOn: 'Notification enabled ✓',
      statusOff: "Notification wasn't enabled — try again anytime.",
      statusFail: "Couldn't set the notification.",
      notSupported: "This browser doesn't support notifications.",
      statusCal: 'Calendar file downloaded ✓',
      future: 'SMS/email reminders coming soon — to {contact}.',
      notifTitle: 'Khatun 💛',
      notifBody: "Don't forget your next financial step. You've got this!",
      calTitle: 'Khatun: next financial step',
      calDesc:
        'Take one small step today — move your savings/investing forward by one step. — Khatun',
    },
  },
}
