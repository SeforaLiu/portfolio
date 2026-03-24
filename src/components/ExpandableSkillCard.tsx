import { motion, AnimatePresence } from 'framer-motion'

interface ExpandableSkillCardProps {
  skills: string[]
  position: { x: number; y: number }
  isVisible: boolean
  delay?: number
}

/**
 * ExpandableSkillCard - Frosted glass card showing detailed skills
 * Black/white/gray styling, distinct from cyan SkillInfoCards
 * Appears when mouse enters the infinity shape
 */
export default function ExpandableSkillCard({
  skills,
  position,
  isVisible,
  delay = 0,
}: ExpandableSkillCardProps) {
  if (skills.length === 0) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{
            duration: 0.25,
            delay,
            ease: [0.4, 0, 0.2, 1], // ease-out-cubic
          }}
          className="absolute pointer-events-none"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="px-3 py-2 rounded-xl backdrop-blur-xl border"
            style={{
              // Frosted glass - black/white/gray theme
              background: 'rgba(25, 25, 25, 0.9)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.5),
                0 0 0 1px rgba(255, 255, 255, 0.05),
                inset 0 1px 0 rgba(255, 255, 255, 0.08)
              `,
            }}
          >
            <div className="flex flex-wrap gap-1.5 max-w-[180px] justify-center">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: delay + index * 0.03,
                    duration: 0.2,
                  }}
                  className="text-[11px] px-2 py-0.5 rounded-md whitespace-nowrap font-medium"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
