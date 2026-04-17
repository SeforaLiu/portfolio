import { motion } from 'framer-motion'
import { useLanguage } from '@/i18n'
import useIsMobile from '@/hooks/useIsMobile'

/**
 * LeftTextPanel - Poetic text overlay with i18n support
 *
 * Features:
 * - Elegant italic typography with Georgia font
 * - Staggered fade-in animations
 * - Semi-transparent text for visual depth
 * - Responsive: top position on mobile, left side on desktop
 * - Multilingual support (EN/IT/CN)
 */
function LeftTextPanel() {
  const { t } = useLanguage()
  const isMobile = useIsMobile()
  const textItems = isMobile ? t.leftTextItems.slice(0, 2) : t.leftTextItems

  return (
    <motion.div
      className="absolute left-1/2 top-5 -translate-x-1/2 flex flex-col gap-8 max-w-[300px] font-serif italic z-10 pointer-events-none text-center md:left-[5%] md:top-1/2 md:-translate-y-1/2 md:gap-16 md:max-w-[250px] md:text-left"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      {textItems.map((item, index) => (
        <motion.div
          key={index}
          className={`${item.fontSize}`}
          style={{ color: `rgba(255, 255, 255, ${item.opacity})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: item.delay, duration: 0.8 }}
        >
          {item.text}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default LeftTextPanel
