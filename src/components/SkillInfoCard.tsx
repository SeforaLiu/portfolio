import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SkillInfoCardProps {
  children: ReactNode
  position: { x: number; y: number }
  delay?: number
}

/**
 * SkillInfoCard - A glassmorphism card for displaying skill information
 * Features transparent glass effect with cyan accent colors
 */
export default function SkillInfoCard({
  children,
  position,
  delay = 0,
}: SkillInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="px-4 py-3 rounded-lg backdrop-blur-md border"
        style={{
          background: 'rgba(0, 212, 212, 0.08)',
          borderColor: 'rgba(0, 255, 255, 0.2)',
          boxShadow: `
            0 4px 24px rgba(0, 212, 212, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        <p
          className="text-sm whitespace-nowrap"
          style={{
            color: 'rgba(0, 255, 255, 0.9)',
            textShadow: '0 0 8px rgba(0, 255, 255, 0.3)',
          }}
        >
          {children}
        </p>
      </div>
    </motion.div>
  )
}
