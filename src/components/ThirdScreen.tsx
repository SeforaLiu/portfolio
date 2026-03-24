import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/i18n'
import ProjectCard from './ProjectCard'
import MarbleIllustration from './MarbleIllustration'

interface ThirdScreenProps {
  isActive?: boolean
}

/**
 * ThirdScreen component - Projects section
 * Displays personal projects in a scrollable section
 * Only renders when active for performance and animation triggering
 */
export default function ThirdScreen({ isActive = false }: ThirdScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const { t } = useLanguage()

  // Reset animation state when screen becomes active
  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isActive, hasAnimated])

  // Get project data from translations
  const projects = t.projectCards

  return (
    <section
      ref={containerRef}
      className="h-full w-full flex flex-col items-center justify-center relative z-10 px-4 md:px-8"
    >
      <motion.div
        className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 50
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Section title */}
        <div className="text-center space-y-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: `
                0 0 10px rgba(34, 211, 238, 0.5),
                0 0 20px rgba(34, 211, 238, 0.3),
                0 0 40px rgba(34, 211, 238, 0.2)
              `,
            }}
            animate={{
              textShadow: [
                '0 0 10px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3), 0 0 40px rgba(34, 211, 238, 0.2)',
                '0 0 15px rgba(34, 211, 238, 0.7), 0 0 30px rgba(34, 211, 238, 0.5), 0 0 60px rgba(34, 211, 238, 0.3)',
                '0 0 10px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3), 0 0 40px rgba(34, 211, 238, 0.2)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {t.projectsTitle}
          </motion.h2>
          <p
            className="text-base md:text-lg"
            style={{ color: 'rgba(255, 255, 255, 0.5)' }}
          >
            {t.projectsSubtitle}
          </p>
        </div>

        {/* Project cards container - side by side on larger screens */}
        {isActive && hasAnimated && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full">
            {/* First project - 3D Travel Earth */}
            <ProjectCard
              title={projects[0].title}
              description={projects[0].description}
              projectUrl={projects[0].url}
              buttonText={t.viewProjectButton}
              githubUrl={projects[0].githubUrl}
            />

            {/* Second project - Marble Race */}
            {projects[1] && (
              <ProjectCard
                title={projects[1].title}
                description={projects[1].description}
                projectUrl={projects[1].url}
                buttonText={t.viewProjectButton}
                githubUrl={projects[1].githubUrl}
                illustration={<MarbleIllustration />}
                glowColor="rgba(168, 85, 247, 0.1)"
              />
            )}
          </div>
        )}
      </motion.div>
    </section>
  )
}
