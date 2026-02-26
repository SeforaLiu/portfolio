import { motion, useScroll, useTransform } from 'framer-motion'
import useIsMobile from '@/hooks/useIsMobile'
import { useLanguage } from '@/i18n'

/**
 * SecondScreen component - Displays the intersection of humanities and technical paths
 * Features a three-column layout with smooth animations triggered by scroll
 * Multilingual support (EN/IT/CN)
 */
export default function SecondScreen() {
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll()
  const { t } = useLanguage()

  // Animation values based on scroll - synchronized with Mobius movement (starts at 0.66)
  const opacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1])
  const yOffset = useTransform(scrollYProgress, [0.6, 0.75], [50, 0])

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-20 px-4 md:px-8 lg:px-16 relative z-10">
      <motion.div
        className="w-full max-w-7xl mx-auto"
        style={{ opacity, y: yOffset }}
      >
        {/* Grid Layout */}
        <div className={`grid gap-6 md:gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {/* Left Column - Humanities Path */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`
              p-6 md:p-8 rounded-lg border-2
              bg-gradient-to-br from-indigo-950/30 to-purple-950/20
              border-indigo-500/30
              backdrop-blur-sm
              ${isMobile ? 'mb-4' : ''}
            `}
          >
            {/* Da Vinci style header */}
            <div className="flex items-center gap-3 mb-6">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-indigo-400"
              >
                <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
                <path d="M8 16 L12 16 L16 12 L20 16 L24 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 20 L10 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M22 20 L22 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <h3 className="text-xl md:text-2xl font-serif text-indigo-300">{t.humanities.title}</h3>
            </div>

            {/* Italian background placeholder */}
            <div className="space-y-4 text-indigo-200/80 font-serif leading-relaxed">
              <p className="text-sm md:text-base italic opacity-80">
                {t.humanities.quote}
              </p>
              <div className="h-px w-full bg-gradient-to-r from-indigo-500/50 to-transparent my-4"></div>
              <p className="text-sm md:text-base">
                {t.humanities.description}
              </p>
            </div>

            {/* Decorative Da Vinci-style lines */}
            <div className="mt-6 space-y-2 opacity-40">
              <div className="h-px bg-indigo-400/50 w-3/4"></div>
              <div className="h-px bg-indigo-400/30 w-1/2"></div>
              <div className="h-px bg-indigo-400/20 w-1/3"></div>
            </div>
          </motion.div>

          {/* Center Column - The Intersection */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`
              p-6 md:p-8 rounded-xl border
              bg-gradient-to-br from-cyan-950/40 to-indigo-950/30
              border-cyan-400/50 shadow-lg shadow-cyan-500/10
              backdrop-blur-md
              ${isMobile ? 'mb-4' : ''}
              flex flex-col items-center justify-center text-center
            `}
          >
            {/* Icon */}
            <div className="mb-4">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="text-cyan-400"
              >
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 24 L20 28 L24 24 L28 20 L32 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.5"/>
              </svg>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-cyan-300 mb-4">{t.intersection.title}</h3>

            <p className="text-base md:text-lg text-white/90 font-medium leading-relaxed">
              {t.intersection.quote}
            </p>

            {/* Decorative elements */}
            <div className="mt-6 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-400/50 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-cyan-400/30 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </motion.div>

          {/* Right Column - Technical Path */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`
              p-6 md:p-8 rounded-lg border-2
              bg-gradient-to-br from-pink-950/30 to-purple-950/20
              border-pink-500/30
              backdrop-blur-sm font-mono
              ${isMobile ? '' : ''}
            `}
          >
            {/* Code editor header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                <div className="w-3 h-3 rounded-full bg-pink-400/50"></div>
                <div className="w-3 h-3 rounded-full bg-pink-400/30"></div>
              </div>
              <span className="text-pink-400 text-sm ml-4">career.tsx</span>
            </div>

            {/* Code snippet style content */}
            <div className="space-y-3 text-sm md:text-base">
              <div className="text-pink-200/80">
                <span className="text-pink-400">const</span> <span className="text-cyan-300">journey</span> = {'{'}
              </div>
              <div className="pl-4 text-pink-200/80">
                <span className="text-pink-400">years</span>: <span className="text-yellow-300">{t.technical.years}</span>,
              </div>
              <div className="pl-4 text-pink-200/80">
                <span className="text-pink-400">focus</span>: <span className="text-green-300">'{t.technical.focus}'</span>,
              </div>
              <div className="pl-4 text-pink-200/80">
                <span className="text-pink-400">stack</span>: [{t.technical.stack}],
              </div>
              <div className="text-pink-200/80">
                {'}'};
              </div>
              <div className="h-px w-full bg-pink-500/30 my-3"></div>
              <p className="text-pink-200/80">
                {t.technical.description}
              </p>
            </div>

            {/* Progress bar indicator */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-pink-300/60 mb-2">
                <span>{t.technical.progress}</span>
                <span>{t.technical.ongoing}</span>
              </div>
              <div className="h-1 bg-pink-900/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '75%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
