import { motion, useScroll, useTransform } from 'framer-motion'
import SkillMap from './SkillMap'

/**
 * SecondScreen component - Full-width Skill Map visualization
 * Features an optical refraction visualization of skills
 */
export default function SecondScreen() {
  const { scrollYProgress } = useScroll()

  // Animation values based on scroll
  const opacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1])
  const scale = useTransform(scrollYProgress, [0.5, 0.65], [0.95, 1])

  return (
    <section className="min-h-screen w-full flex items-center justify-center relative z-10 px-4 md:px-8">
      <motion.div
        className="w-full max-w-7xl mx-auto h-[70vh] md:h-[75vh]"
        style={{ opacity, scale }}
      >
        <SkillMap />
      </motion.div>
    </section>
  )
}
