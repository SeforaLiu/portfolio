import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SkillMap from './SkillMap'

/**
 * SecondScreen component - Full-width Skill Map visualization
 * Features an optical refraction visualization of skills
 * Only renders when visible in viewport for performance and animation triggering
 */
export default function SecondScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  const { scrollYProgress } = useScroll()

  // Animation values based on scroll
  const opacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1])
  const scale = useTransform(scrollYProgress, [0.5, 0.65], [0.95, 1])

  // IntersectionObserver to detect visibility
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isNowVisible = entry.isIntersecting

          if (isNowVisible && !hasAnimated) {
            // First time becoming visible - render and animate
            setIsVisible(true)
            setHasAnimated(true)
            setAnimationKey((prev) => prev + 1)
          } else if (isNowVisible && !isVisible) {
            // Becoming visible again after leaving
            setIsVisible(true)
            setAnimationKey((prev) => prev + 1)
          } else if (!isNowVisible && isVisible) {
            // Left viewport - stop rendering
            setIsVisible(false)
          }
        })
      },
      {
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: '50px', // Start a bit earlier
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [isVisible, hasAnimated])

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center relative z-10 px-4 md:px-8"
    >
      <motion.div
        className="w-full max-w-7xl mx-auto h-[70vh] md:h-[75vh]"
        style={{ opacity, scale }}
      >
        {/* Only render SkillMap when visible, key change triggers re-animation */}
        {isVisible && <SkillMap key={animationKey} />}
      </motion.div>
    </section>
  )
}
