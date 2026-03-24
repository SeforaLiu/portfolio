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

  // SkillMap
  skillMapTitle: string
  skillCards: string[]
  expandedSkills: string[][]

  // ThirdScreen - Projects
  projectsTitle: string
  projectsSubtitle: string
  viewProjectButton: string
  projectCards: Array<{
    title: string
    description: string
    url: string
    githubUrl?: string
  }>
}

export const translations: Record<Language, Translation> = {
  en: {
    // CenterTitle
    title: "Hi, I'm Shiyun",
    subtitle: 'Software Developer who speaks human and computer language',

    // LeftTextPanel
    leftTextItems: [
      { text: '"I was born on the twenty-first in spring..."', opacity: 0.6, fontSize: 'text-lg md:text-[1.1rem]', delay: 0.5 },
      { text: '"my poems won\'t change the world..."', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 0.8 },
      { text: '"In the middle of the journey..."', opacity: 0.4, fontSize: 'text-sm md:text-[0.95rem]', delay: 1.1 },
      { text: '"Language, voice, silence"', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 1.4 },
    ],

    // SkillMap
    skillMapTitle: 'Technical Landscape',
    skillCards: [
      'Digital Humanities',
      'Frontend Engineering',
      'Interactive Graphics',
      'Backend Systems',
      'AI Integration',
      'Data Layer',
      'Tooling',
      'System Architecture',
    ],

    // Expandable skill cards - detailed skills for each category
    expandedSkills: [
      ['Text Analysis'],
      ['React', 'Vue.js'],
      ['Three.js', 'GLSL'],
      ['Python', 'FastAPI'],
      ['LLM', 'Prompting'],
      ['PostgreSQL', 'GraphQL'],
      ['Git', 'Vite'],
    ],

    // ThirdScreen - Projects
    projectsTitle: 'Projects',
    projectsSubtitle: 'My Personal Works',
    viewProjectButton: 'View Project',
    projectCards: [
      {
        title: '3D Travel Earth',
        description: 'A 3D interactive globe showcasing travel memories and destinations',
        url: 'https://travel.shiyun-liu.com/',
        githubUrl: 'https://github.com/SeforaLiu/travel-globe',
      },
      {
        title: 'Marble Race',
        description: 'Interactive 3D marble race game (Three.js · WebGL · JavaScript)',
        url: 'https://marble-race-game-threejs.vercel.app/',
        githubUrl: 'https://github.com/SeforaLiu/game_marble_race',
      },
    ],
  },

  it: {
    // CenterTitle
    title: 'Ciao, sono Shiyun',
    subtitle: 'Sviluppatore Software che parla la lingua degli umani e dei computer', // 修正：更准确地对应 "human and computer language"

    // LeftTextPanel
    leftTextItems: [
      { text: '"Sono nata il ventuno a primavera..."', opacity: 0.6, fontSize: 'text-lg md:text-[1.1rem]', delay: 0.5 },
      { text: '"le mie poesie non cambieranno il mondo..."', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 0.8 },
      { text: '"Nel mezzo del cammin..."', opacity: 0.4, fontSize: 'text-sm md:text-[0.95rem]', delay: 1.1 },
      { text: '"Lingua, voce, silenzio"', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 1.4 },
    ],

    // SkillMap
    skillMapTitle: 'Panoramica Tecnica', // 微调：Paesaggio(景观)略显生硬，Panoramica(概览)更符合技术栈语境，或者保留Paesaggio也可以，此处建议Panoramica
    skillCards: [
      'Scienze Umane Digitali',
      'Ingegneria Frontend',
      'Grafica Interattiva',
      'Sistemi Backend',
      'Integrazione AI',
      'Livello Dati',
      'Strumenti',
      'Architettura di Sistema',
    ],

    // Expandable skill cards - detailed skills for each category
    expandedSkills: [
      ['Text Analysis'],
      ['React', 'Vue.js'],
      ['Three.js', 'GLSL'],
      ['Python', 'FastAPI'],
      ['LLM', 'Prompting'],
      ['PostgreSQL', 'GraphQL'],
      ['Git', 'Vite'],
    ],

    // ThirdScreen - Projects
    projectsTitle: 'Progetti',
    projectsSubtitle: 'I Miei Lavori Personali',
    viewProjectButton: 'Visualizza Progetto', // 修正：原文是动作 "View"，"Progetti Live" 意为 "在线项目"，不符合按钮语境
    projectCards: [
      {
        title: '3D Travel Earth',
        description: 'Un globo 3D interattivo che mostra ricordi di viaggio e destinazioni',
        url: 'https://travel.shiyun-liu.com/',
        githubUrl: 'https://github.com/SeforaLiu/travel-globe',
      },
      {
        title: 'Marble Race',
        description: 'Gioco interattivo di corse di biglie 3D (Three.js · WebGL · JavaScript)', // 修正：优化语序，更自然
        url: 'https://marble-race-game-threejs.vercel.app/',
        githubUrl: 'https://github.com/SeforaLiu/game_marble_race',
      },
    ],
  },

  cn: {
    // CenterTitle
    title: '你好，我是刘诗韵',
    subtitle: '精通人类语言与机器语言的软件开发者', // 修正：Human language -> 人类语言 (人文通常指 Humanities)

    // LeftTextPanel
    leftTextItems: [
      { text: '"我生于春天的二十一日..."', opacity: 0.6, fontSize: 'text-lg md:text-[1.1rem]', delay: 0.5 },
      { text: '"我的诗歌不会改变世界..."', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 0.8 },
      { text: '"人生旅程的中途..."', opacity: 0.4, fontSize: 'text-sm md:text-[0.95rem]', delay: 1.1 },
      { text: '"语言、声音、静默"', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 1.4 },
    ],

    // SkillMap
    skillMapTitle: '技术图谱',
    skillCards: [
      '数字人文',
      '前端工程',
      '交互图形',
      '后端系统',
      'AI集成',
      '数据层',
      '工具链',
      '系统架构',
    ],

    // Expandable skill cards - detailed skills for each category
    expandedSkills: [
      ['Text Analysis'],
      ['React', 'Vue.js'],
      ['Three.js', 'GLSL'],
      ['Python', 'FastAPI'],
      ['LLM', 'Prompting'],
      ['PostgreSQL', 'GraphQL'],
      ['Git', 'Vite'],
    ],

    // ThirdScreen - Projects
    projectsTitle: '项目展示',
    projectsSubtitle: '个人作品',
    viewProjectButton: '查看项目',
    projectCards: [
      {
        title: '3D旅行地球',
        description: '3D交互式地球，展示旅行记忆和目的地',
        url: 'https://travel.shiyun-liu.com/',
        githubUrl: 'https://github.com/SeforaLiu/travel-globe',
      },
      {
        title: 'Marble Race',
        description: '3D弹珠竞速游戏 (Three.js · WebGL · JavaScript)',
        url: 'https://marble-race-game-threejs.vercel.app/',
        githubUrl: 'https://github.com/SeforaLiu/game_marble_race',
      },
    ],
  },
}