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
    ],
  },

  it: {
    // CenterTitle
    title: 'Ciao, sono Shiyun',
    subtitle: 'Sviluppatore Software che parla lingua umana e informatica',

    // LeftTextPanel
    leftTextItems: [
      { text: '"Sono nata il ventuno a primavera..."', opacity: 0.6, fontSize: 'text-lg md:text-[1.1rem]', delay: 0.5 },
      { text: '"le mie poesie non cambieranno il mondo..."', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 0.8 },
      { text: '"Nel mezzo del cammin..."', opacity: 0.4, fontSize: 'text-sm md:text-[0.95rem]', delay: 1.1 },
      { text: '"Lingua, voce, silenzio"', opacity: 0.5, fontSize: 'text-base md:text-[1rem]', delay: 1.4 },
    ],

    // SkillMap
    skillMapTitle: 'Paesaggio Tecnologico',
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
    viewProjectButton: 'Progetti Live',
    projectCards: [
      {
        title: '3D Travel Earth',
        description: 'Un globo 3D interattivo che mostra ricordi di viaggio e destinazioni',
        url: 'https://travel.shiyun-liu.com/',
        githubUrl: 'https://github.com/SeforaLiu/travel-globe',
      },
    ],
  },

  cn: {
    // CenterTitle
    title: '你好，我是刘诗韵',
    subtitle: '精通人文与机器语言的软件开发者',

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
    ],
  },
}
