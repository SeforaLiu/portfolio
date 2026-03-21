import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import SkillMap from './SkillMap'

interface SecondScreenProps {
  isActive?: boolean
}

/**
 * SecondScreen component - Full-width Skill Map visualization
 * Features an optical refraction visualization of skills
 * Only renders when active for performance and animation triggering
 */
export default function SecondScreen({ isActive = false }: SecondScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Reset animation state when screen becomes active
  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isActive, hasAnimated])

  return (
    <section
      ref={containerRef}
      className="h-full w-full flex items-center justify-center relative z-10 px-4 md:px-8"
    >
      <motion.div
        className="w-full max-w-7xl mx-auto h-[70vh] md:h-[75vh]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.95
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Only render SkillMap when active */}
        {isActive && hasAnimated && <SkillMap key={isActive ? 'active' : 'inactive'} />}
      </motion.div>
    </section>
  )
}
