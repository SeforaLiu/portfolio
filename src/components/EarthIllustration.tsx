import { motion } from 'framer-motion'

/**
 * EarthIllustration - Animated CSS/SVG earth globe
 * Features a gradient sphere with simplified continent shapes
 * Slow rotation animation matching the portfolio's dark theme
 */
export default function EarthIllustration() {
  return (
    <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px]">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
          transform: 'scale(1.2)',
        }}
      />

      {/* Main earth sphere */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 25%, #0e7490 50%, #06b6d4 75%, #22d3ee 100%)',
          boxShadow: `
            inset -20px -20px 40px rgba(0, 0, 0, 0.5),
            inset 10px 10px 30px rgba(255, 255, 255, 0.1),
            0 0 40px rgba(34, 211, 238, 0.3)
          `,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* SVG continents overlay */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.7 }}
        >
          {/* Simplified continent shapes */}
          <g fill="rgba(16, 185, 129, 0.6)">
            {/* North America */}
            <path d="M15 25 Q20 20 25 22 L30 28 Q28 35 22 38 L18 35 Q14 30 15 25" />

            {/* South America */}
            <path d="M25 50 Q28 48 30 52 L32 65 Q30 72 25 75 L22 70 Q20 60 25 50" />

            {/* Europe */}
            <path d="M45 22 Q52 20 55 25 L52 30 Q48 32 45 28 L45 22" />

            {/* Africa */}
            <path d="M48 35 Q55 33 58 40 L60 55 Q55 62 48 60 L45 50 Q44 42 48 35" />

            {/* Asia */}
            <path d="M55 20 Q70 18 80 25 L85 35 Q80 45 70 42 L60 38 Q55 30 55 20" />

            {/* Australia */}
            <path d="M75 55 Q82 53 85 58 L83 65 Q78 68 73 65 L75 55" />
          </g>

          {/* Highlight reflection */}
          <ellipse
            cx="30"
            cy="30"
            rx="15"
            ry="10"
            fill="rgba(255, 255, 255, 0.15)"
            transform="rotate(-30 30 30)"
          />
        </svg>

        {/* Atmosphere rim */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(34, 211, 238, 0.3)',
            boxShadow: 'inset 0 0 20px rgba(34, 211, 238, 0.2)',
          }}
        />
      </motion.div>

      {/* Static highlight overlay */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}
