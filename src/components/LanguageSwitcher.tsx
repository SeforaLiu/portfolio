import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage, languageNames, languageShortNames, type Language } from '@/i18n'

/**
 * LanguageSwitcher - Simple language switcher in the top right corner
 *
 * Features:
 * - Compact button with short name (EN / IT / CN)
 * - Dropdown shows full language names (English, Italiano, 简体中文)
 * - Persists selection to localStorage
 * - Mobile responsive
 */
export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages: Language[] = ['en', 'it', 'cn']

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div
      ref={dropdownRef}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="
          px-3 py-1.5 md:px-4 md:py-2
          bg-white/5 hover:bg-white/10
          backdrop-blur-md
          border border-white/20
          rounded-full
          text-white/80 text-sm md:text-base
          font-medium tracking-wide
          transition-colors duration-200
          cursor-pointer
          select-none
        "
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.98 }}
      >
        {languageShortNames[language]}
        <span className="ml-1.5 inline-block transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
          ▾
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="
              absolute top-full right-0 mt-2
              bg-black/60 backdrop-blur-md
              border border-white/20
              rounded-lg overflow-hidden
              shadow-lg shadow-black/20
              min-w-[120px]
            "
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`
                  w-full px-4 py-2
                  text-sm text-left
                  transition-colors duration-150
                  cursor-pointer
                  ${lang === language
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {languageNames[lang]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
