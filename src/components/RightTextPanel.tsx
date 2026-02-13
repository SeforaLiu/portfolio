import { motion } from 'framer-motion'

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
      className="absolute left-1/2 bottom-5 -translate-x-1/2 flex flex-col gap-10 max-w-[280px] font-mono z-10 pointer-events-none md:right-[5%] md:left-auto md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:gap-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 1 }}
    >
      {codeBlocks.map((block, index) => (
        <motion.div
          key={index}
          className="text-indigo-light text-[0.75rem] md:text-[0.85rem] px-3 py-2.5 md:px-4 md:py-3 bg-indigo-light/10 rounded-lg border border-indigo-light/20"
          initial={{ opacity: 0, x: 50 }}
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
