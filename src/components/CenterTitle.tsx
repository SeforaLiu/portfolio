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
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 10,
    pointerEvents: 'none',
    maxWidth: '600px',
    padding: '20px',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '3.5rem',
    fontWeight: 700,
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #a5b4fc 0%, #f0abfc 50%, #67e8f9 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.2,
  }

  const subtitleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 300,
    letterSpacing: '0.5px',
  }

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
    >
      <motion.div
        style={titleStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Hi, I'm Shiyun LIU.
      </motion.div>
      <motion.div
        style={subtitleStyle}
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
