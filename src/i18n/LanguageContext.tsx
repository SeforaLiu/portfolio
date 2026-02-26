import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { type Language, translations, languageNames } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations[Language]
  languageName: string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = 'portfolio-language'

/**
 * Get the initial language from localStorage or browser preference
 */
function getInitialLanguage(): Language {
  // Check localStorage first
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored && (stored === 'en' || stored === 'it' || stored === 'cn')) {
      return stored
    }

    // Check browser language
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('zh') || browserLang.startsWith('cn')) {
      return 'cn'
    }
    if (browserLang.startsWith('it')) {
      return 'it'
    }
  }

  return 'en' // Default
}

interface LanguageProviderProps {
  children: ReactNode
}

/**
 * Language Provider component
 * Provides language context to all child components
 */
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en')

  // Initialize language on mount
  useEffect(() => {
    const initialLang = getInitialLanguage()
    setLanguageState(initialLang)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    }
  }, [])

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    languageName: languageNames[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/**
 * Hook to access language context
 * @returns Language context with current language, setter, and translations
 */
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
