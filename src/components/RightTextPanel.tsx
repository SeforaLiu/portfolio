import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/**
 * RightTextPanel - Code snippets overlay
 *
 * Features:
 * - Monospace typography with syntax highlighting colors
 * - Code block styling with subtle background
 * - Staggered slide-in animations
 * - Responsive: bottom position on mobile, right side on desktop
 */
function RightTextPanel() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const containerStyle: React.CSSProperties = isMobile
    ? {
        position: 'absolute',
        left: '50%',
        bottom: '5%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        maxWidth: '280px',
        fontFamily: '"Fira Code", "Courier New", monospace',
        zIndex: 10,
        pointerEvents: 'none',
      }
    : {
        position: 'absolute',
        right: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '80px',
        maxWidth: '280px',
        fontFamily: '"Fira Code", "Courier New", monospace',
        zIndex: 10,
        pointerEvents: 'none',
      }

  const codeBlockStyle: React.CSSProperties = {
    color: '#a5b4fc',
    fontSize: isMobile ? '0.75rem' : '0.85rem',
    padding: isMobile ? '10px 12px' : '12px 16px',
    backgroundColor: 'rgba(165, 180, 252, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(165, 180, 252, 0.2)',
  }

  const codeBlocks = [
    {
      content: (
        <>
          <span style={{ color: '#818cf8' }}>const</span> transform ={' '}
          <span style={{ color: '#f472b6' }}>(words)</span> =&gt;{' '}
          <span style={{ color: '#34d399' }}>logic</span>(words);
        </>
      ),
      delay: 0.6,
    },
    {
      content: (
        <>
          <span style={{ color: '#818cf8' }}>useEffect</span>(() =&gt;{' '}
          <span style={{ color: '#34d399' }}>evolve</span>(), []);
        </>
      ),
      delay: 0.9,
    },
    {
      content: (
        <>
          &lt;
          <span style={{ color: '#fb7185' }}>Language</span>{' '}
          <span style={{ color: '#fcd34d' }}>human</span>={<span style={{ color: '#34d399' }}>true</span>}{' '}
          <span style={{ color: '#fcd34d' }}>machine</span>={<span style={{ color: '#34d399' }}>true</span>} /&gt;
        </>
      ),
      delay: 1.2,
    },
  ] as const

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 1 }}
    >
      {codeBlocks.map((block, index) => (
        <motion.div
          key={index}
          style={codeBlockStyle}
          initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: block.delay, duration: 0.8 }}
        >
          {block.content}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default RightTextPanel
