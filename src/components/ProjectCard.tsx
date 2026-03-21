import { motion } from 'framer-motion'
import EarthIllustration from './EarthIllustration'

interface ProjectCardProps {
  title: string
  description: string
  projectUrl: string
  buttonText: string
}

/**
 * ProjectCard - A glassmorphism card for displaying project information
 * Features animated earth illustration and external link button
 */
export default function ProjectCard({
  title,
  description,
  projectUrl,
  buttonText,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className="relative w-[90%] max-w-[400px] rounded-2xl backdrop-blur-md border"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          0 0 60px rgba(34, 211, 238, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
      }}
    >
      {/* Card content */}
      <div className="p-6 md:p-8 flex flex-col items-center gap-6">
        {/* Earth illustration */}
        <div className="relative">
          <EarthIllustration />
        </div>

        {/* Project info */}
        <div className="text-center space-y-3">
          <h3
            className="text-xl md:text-2xl font-semibold"
            style={{
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            {description}
          </p>
        </div>

        {/* CTA Button */}
        <motion.a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)',
            color: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 4px 20px rgba(34, 211, 238, 0.3)',
          }}
        >
          {buttonText}
        </motion.a>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
