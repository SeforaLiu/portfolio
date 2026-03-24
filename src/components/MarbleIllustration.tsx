import { motion } from 'framer-motion'

/**
 * MarbleIllustration - Animated glowing marble with grid lines
 * Features a circular marble with purple self-glow and internal grid pattern
 * Gentle floating animation
 */
export default function MarbleIllustration() {
  return (
    <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px]">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
          transform: 'scale(1.3)',
        }}
      />

      {/* Main marble sphere */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* SVG marble with grid lines */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{
            filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.5)) drop-shadow(0 0 30px rgba(168, 85, 247, 0.3))',
          }}
        >
          <defs>
            {/* Main marble gradient */}
            <radialGradient id="marbleGradient" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="30%" stopColor="#a855f7" />
              <stop offset="60%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#6b21a8" />
            </radialGradient>

            {/* Inner glow for self-illumination effect */}
            <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(216, 180, 254, 0.4)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.2)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
            </radialGradient>

            {/* Highlight gradient */}
            <radialGradient id="highlight" cx="35%" cy="30%" r="30%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.5)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>

            {/* Clip path for grid lines inside marble */}
            <clipPath id="marbleClip">
              <circle cx="50" cy="50" r="45" />
            </clipPath>
          </defs>

          {/* Main marble circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#marbleGradient)"
          />

          {/* Inner self-glow overlay */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#innerGlow)"
          />

          {/* Grid lines - latitude/horizontal lines */}
          <g clipPath="url(#marbleClip)" stroke="rgba(216, 180, 254, 0.3)" strokeWidth="0.5" fill="none">
            {/* Horizontal lines (latitude) */}
            <ellipse cx="50" cy="50" rx="45" ry="12" />
            <ellipse cx="50" cy="35" rx="40" ry="10" />
            <ellipse cx="50" cy="65" rx="40" ry="10" />
            <ellipse cx="50" cy="22" rx="30" ry="7" />
            <ellipse cx="50" cy="78" rx="30" ry="7" />

            {/* Vertical lines (longitude) */}
            <ellipse cx="50" cy="50" rx="15" ry="45" />
            <ellipse cx="50" cy="50" rx="28" ry="45" />
            <ellipse cx="50" cy="50" rx="38" ry="45" />
          </g>

          {/* Subtle rim glow */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(192, 132, 252, 0.4)"
            strokeWidth="1"
          />

          {/* Highlight reflection */}
          <ellipse
            cx="35"
            cy="32"
            rx="18"
            ry="12"
            fill="url(#highlight)"
            transform="rotate(-20 35 32)"
          />
        </svg>
      </motion.div>

      {/* Ambient particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: 'rgba(192, 132, 252, 0.7)',
            left: `${15 + i * 25}%`,
            top: `${25 + (i % 2) * 45}%`,
            boxShadow: '0 0 6px rgba(168, 85, 247, 0.6)',
          }}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  )
}
