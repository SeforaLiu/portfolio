import { motion } from 'framer-motion'

/**
 * CenterTitle - Main title and subtitle in the center
 *
 * Features:
 * - Gradient text effect on the main title
 * - Fade-in animation with vertical offset
 * - Centered positioning with responsive spacing
 */
function CenterTitle() {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none max-w-[600px] p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      <motion.div
        className="text-[3.5rem] font-bold mb-4 leading-tight bg-gradient-to-r from-indigo-light via-pink-light to-cyan-light bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Hi, I'm Shiyun LIU.
      </motion.div>
      <motion.div
        className="text-xl text-white/80 font-light tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        A Frontend Developer who speaks human and computer language.
      </motion.div>
    </motion.div>
  )
}

export default CenterTitle
