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
  },
}
