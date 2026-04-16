import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const MOBILE_SHAPE_CONFIG = {
  sizeRatio: 0.7,
  widthRatio: 0.6,
  padding: 40,
}

const PC_HEIGHT_RATIO = 0.35
const TITLE_OFFSET_PC = 140
const TITLE_OFFSET_MOBILE = 110

interface SkillMapTitleProps {
  containerHeight: number
  isMobile?: boolean
}

/**
 * SkillMapTitle - Title displayed above the infinity shape
 * Features a "Breathing Neon" effect to match the cyberpunk theme of SkillMap
 */
export default function SkillMapTitle({ containerHeight, isMobile = false }: SkillMapTitleProps) {
  const { t } = useLanguage()

  let titleY: number
  if (isMobile) {
    const padding = MOBILE_SHAPE_CONFIG.padding
    const a = (containerHeight - padding * 2) / 2 * MOBILE_SHAPE_CONFIG.sizeRatio
    titleY = (containerHeight / 2) - a - TITLE_OFFSET_MOBILE
  } else {
    const b = containerHeight * PC_HEIGHT_RATIO
    titleY = (containerHeight / 2) - (b / 2) - TITLE_OFFSET_PC
  }

  // Neon Color Palette
  const neonColor = '#00ffff' // Cyan
  const glowColor = 'rgba(0, 255, 255, 0.8)'

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: 'easeOut',
      }}
      className="absolute left-1/2 pointer-events-none whitespace-nowrap z-10"
      style={{
        top: titleY,
        x: '-50%',
      }}
    >
      <motion.h2
        className={`font-extralight tracking-[0.3em] uppercase ${isMobile ? 'text-xl' : 'text-3xl md:text-4xl'}`}
        style={{
          color: '#fff',
          // Initial static glow (base layer)
          textShadow: `
            0 0 5px #fff,
            0 0 10px #fff,
            0 0 20px ${neonColor},
            0 0 40px ${neonColor},
            0 0 80px ${neonColor}
          `,
        }}
        // Breathing Animation for the Neon Glow
        animate={{
          textShadow: [
            // State 1: Bright
            `0 0 5px #fff, 0 0 10px #fff, 0 0 20px ${neonColor}, 0 0 40px ${neonColor}, 0 0 80px ${neonColor}`,
            // State 2: Dimmer (simulating voltage drop)
            `0 0 2px #fff, 0 0 5px #fff, 0 0 10px ${neonColor}, 0 0 20px ${neonColor}, 0 0 40px ${glowColor}`,
            // State 3: Back to Bright
            `0 0 5px #fff, 0 0 10px #fff, 0 0 20px ${neonColor}, 0 0 40px ${neonColor}, 0 0 80px ${neonColor}`,
          ],
        }}
        transition={{
          duration: 4, // Slow breathing cycle
          times: [0, 0.5, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {t.skillMapTitle}
      </motion.h2>
    </motion.div>
  )
}