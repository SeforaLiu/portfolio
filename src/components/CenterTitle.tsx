import { motion } from 'framer-motion'

function CenterTitle() {
  // We define the gradient as a mask.
  // This is often more stable on iOS Safari than background-clip.
  const textStyle = {
    background: 'linear-gradient(to right, #818cf8, #f472b6, #22d3ee)', // Use hex/rgb instead of tailwind vars to be safe
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    // The "Magic" property for iOS:
    WebkitMaskImage: 'linear-gradient(to right, #818cf8, #f472b6, #22d3ee)',
  }

  const subTextStyle = {
    background: 'linear-gradient(to right, #ffffff, #70aed9, #70aed9 )',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitMaskImage: 'linear-gradient(to right,#ffffff, #70aed9, #70aed9)',
  }

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-50 pointer-events-none w-full max-w-[600px] p-5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-4"
      >
        <h1
          style={textStyle}
          className="text-[3.5rem] font-bold leading-tight"
        >
          Hi, I'm Shiyun
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <p
          style={subTextStyle}
          className="text-xl font-medium tracking-wide "
        >
          Software Developer who speaks human and computer language
        </p>
      </motion.div>
    </div>
  )
}

export default CenterTitle