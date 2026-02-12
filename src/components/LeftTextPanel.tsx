import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/**
 * LeftTextPanel - Italian poetic text overlay
 *
 * Features:
 * - Elegant italic typography with Georgia font
 * - Staggered fade-in animations
 * - Semi-transparent text for visual depth
 * - Responsive: top position on mobile, left side on desktop
 */
function LeftTextPanel() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const containerStyle: React.CSSProperties = isMobile
    ? {
        position: 'absolute',
        left: '50%',
        top: '5%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        maxWidth: '300px',
        fontFamily: 'Georgia, serif',
        fontStyle: 'italic',
        zIndex: 10,
        pointerEvents: 'none',
        textAlign: 'center',
      }
    : {
        position: 'absolute',
        left: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px',
        maxWidth: '250px',
        fontFamily: 'Georgia, serif',
        fontStyle: 'italic',
        zIndex: 10,
        pointerEvents: 'none',
      }

  const textItems = [
    { text: '"Le parole son vento..."', opacity: 0.6, fontSize: isMobile ? '0.9rem' : '1.1rem', delay: 0.5 },
    { text: '"Parole, parole..."', opacity: 0.5, fontSize: isMobile ? '0.85rem' : '1rem', delay: 0.8 },
    { text: '"Nel mezzo del cammin..."', opacity: 0.4, fontSize: isMobile ? '0.8rem' : '0.95rem', delay: 1.1 },
    { text: '"Lingua, voce, silenzio"', opacity: 0.5, fontSize: isMobile ? '0.85rem' : '1rem', delay: 1.4 },
  ] as const

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      {textItems.map((item, index) => (
        <motion.div
          key={index}
          style={{ color: `rgba(255, 255, 255, ${item.opacity})`, fontSize: item.fontSize }}
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
