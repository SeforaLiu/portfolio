import { motion } from 'framer-motion'

interface SkillMapTitleProps {
  containerHeight: number
}

/**
 * SkillMapTitle - Title displayed above the infinity shape
 * Features entrance animation when the component becomes visible
 */
export default function SkillMapTitle({ containerHeight }: SkillMapTitleProps) {
  // Position title above the center of the infinity shape
  // The upper loop top is at centerY - b/2, so place title above that
  const b = containerHeight * 0.35 // PC_HEIGHT_RATIO
  const titleY = (containerHeight / 2) - (b / 2) - 60 // Above the upper part of the 8

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: 'easeOut',
      }}
      className="absolute left-1/2 pointer-events-none whitespace-nowrap"
      style={{
        top: titleY,
        x: '-50%',
      }}
    >
      <h2
        className="text-2xl md:text-3xl font-light tracking-widest"
        style={{
          color: 'rgba(0, 255, 255, 0.85)',
          textShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
        }}
      >
       skill map title placeholder
      </h2>
    </motion.div>
  )
}
