/**
 * Translation definitions for all supported languages
 * English (default), Italian, Chinese
 */

export type Language = 'en' | 'it' | 'cn'

export const languageNames: Record<Language, string> = {
  en: 'English',
  it: 'Italiano',
  cn: '简体中文',
}

export const languageShortNames: Record<Language, string> = {
  en: 'EN',
  it: 'IT',
  cn: 'CN',
}

export interface Translation {
  // CenterTitle
  title: string
  subtitle: string

  // LeftTextPanel
  leftTextItems: Array<{
    text: string
    opacity: number
    fontSize: string
    delay: number
  }>

  // SecondScreen
  humanities: {
    title: string
    quote: string
    description: string
  }
  intersection: {
    title: string
    quote: string
  }
  technical: {
    title: string
    years: string
    focus: string
    stack: string
    description: string
    progress: string
    ongoing: string
  }
}

export const translations: Record<Language, Translation> = {
  en: {
    // CenterTitle
    title: "Hi, I'm Shiyun",
    subtitle: 'Software Developer who speaks human and computer language',

    // LeftTextPanel
    leftTextItems: [
      { text: '"Words are wind..."', opacity: 0.6, fontSize: 'text-lg md:text-[1.1rem]', delay: 0.5 },
      { text: '"Words, words..."', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 0.8 },
      { text: '"In the middle of the journey..."', opacity: 0.4, fontSize: 'text-sm md:text-[0.95rem]', delay: 1.1 },
      { text: '"Language, voice, silence"', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 1.4 },
    ],

    // SecondScreen
    humanities: {
      title: 'Humanities Path',
      quote: '"In the middle of the journey of our life..."',
      description:
        'From classical literature to modern communication, the humanities have shaped my understanding of human expression and storytelling. This foundation enables me to create software that resonates with users on a deeper level.',
    },
    intersection: {
      title: 'The Intersection',
      quote: '"From translating Dante\'s verses to architecting digital experiences."',
    },
    technical: {
      title: 'Technical Path',
      years: '5+',
      focus: 'frontend',
      stack: 'React, TypeScript, ...',
      description:
        'Building elegant solutions through clean code and thoughtful architecture. Every line of code is an opportunity to craft meaningful digital experiences.',
      progress: 'Progress',
      ongoing: 'Ongoing',
    },
  },

  it: {
    // CenterTitle
    title: 'Ciao, sono Shiyun',
    subtitle: 'Sviluppatore Software che parla lingua umana e informatica',

    // LeftTextPanel
    leftTextItems: [
      { text: '"Le parole son vento..."', opacity: 0.6, fontSize: 'text-lg md:text-[1.1rem]', delay: 0.5 },
      { text: '"Parole, parole..."', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 0.8 },
      { text: '"Nel mezzo del cammin..."', opacity: 0.4, fontSize: 'text-sm md:text-[0.95rem]', delay: 1.1 },
      { text: '"Lingua, voce, silenzio"', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 1.4 },
    ],

    // SecondScreen
    humanities: {
      title: 'Percorso Umanistico',
      quote: '"Nel mezzo del cammin di nostra vita..."',
      description:
        'Dalla letteratura classica alla comunicazione moderna, le discipline umanistiche hanno plasmato la mia comprensione dell\'espressione umana e della narrazione. Questa base mi permette di creare software che risuona con gli utenti a un livello più profondo.',
    },
    intersection: {
      title: "L'Intersezione",
      quote: '"Dalla traduzione dei versi di Dante alla progettazione di esperienze digitali."',
    },
    technical: {
      title: 'Percorso Tecnico',
      years: '5+',
      focus: 'frontend',
      stack: 'React, TypeScript, ...',
      description:
        'Costruire soluzioni eleganti attraverso codice pulito e architettura ponderata. Ogni riga di codice è un\'opportunità per creare esperienze digitali significative.',
      progress: 'Progresso',
      ongoing: 'In corso',
    },
  },

  cn: {
    // CenterTitle
    title: '你好，我是诗韵',
    subtitle: '精通人文与机器语言的软件开发者',

    // LeftTextPanel
    leftTextItems: [
      { text: '"言语如风..."', opacity: 0.6, fontSize: 'text-lg md:text-[1.1rem]', delay: 0.5 },
      { text: '"话语，话语..."', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 0.8 },
      { text: '"人生旅程的中途..."', opacity: 0.4, fontSize: 'text-sm md:text-[0.95rem]', delay: 1.1 },
      { text: '"语言、声音、静默"', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 1.4 },
    ],

    // SecondScreen
    humanities: {
      title: '人文之路',
      quote: '"人生旅程的中途..."',
      description:
        '从古典文学到现代传播，人文学科塑造了我对人类表达和叙事的理解。这一基础使我能够创造出能够在更深层次上与用户产生共鸣的软件。',
    },
    intersection: {
      title: '交汇之处',
      quote: '"从翻译但丁的诗句到构建数字体验"',
    },
    technical: {
      title: '技术之路',
      years: '5+',
      focus: '前端开发',
      stack: 'React, TypeScript, ...',
      description: '通过整洁的代码和深思熟虑的架构构建优雅的解决方案。每一行代码都是创造有意义的数字体验的机会。',
      progress: '进度',
      ongoing: '进行中',
    },
  },
}
