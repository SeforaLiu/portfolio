import SkillInfoCard from './SkillInfoCard'
import { useLanguage } from '../i18n/LanguageContext'

interface SkillInfoCardsProps {
  containerWidth: number
  containerHeight: number
}

// Same constants as SkillMap for consistent positioning
const PADDING = 60
const PC_HEIGHT_RATIO = 0.35

/**
 * Calculate card positions around the infinity shape
 * Positions are: center-top, right-upper, right, right-lower, left-upper, left, left-lower
 */
function getCardPositions(width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2

  // Calculate shape parameters (same as SkillMap)
  const a = (width - PADDING * 2) / 2
  const b = (height - PADDING * 2) * PC_HEIGHT_RATIO

  // Card offset from the curve points
  const offset = 45

  // Key points on the infinity curve:
  // t = π/4:  right upper loop top    (a*0.707, b/2)
  // t = π/2:  rightmost point         (a, 0)
  // t = 3π/4: right lower loop bottom (a*0.707, -b/2)
  // t = 5π/4: left upper loop top     (-a*0.707, b/2)
  // t = 3π/2: leftmost point          (-a, 0)
  // t = 7π/4: left lower loop bottom  (-a*0.707, -b/2)

  const sin45 = Math.sin(Math.PI / 4) // ~0.707

  return [
    // 1. 交汇点上方 (above center crossing point)
    {
      x: centerX -40,
      y: centerY -20,
    },
    // 2. 右边的上顶点上方 (above upper right loop)
    {
      x: centerX + a * sin45 -30,
      y: centerY - b / 2 - offset + 10,
    },
    // 3. 最右顶点的右边 (right of rightmost point)
    {
      x: centerX + a - 30,
      y: centerY,
    },
    // 4. 右边的下顶点的下方 (below lower right loop)
    {
      x: centerX + a * sin45,
      y: centerY + b / 2 + offset - 10,
    },
    // 5. 左边的上顶点上方 (above upper left loop)
    {
      x: centerX - a * sin45,
      y: centerY - b / 2 - offset + 10,
    },
    // 6. 最左顶点的左边 (left of leftmost point)
    {
      x: centerX - a - offset,
      y: centerY,
    },
    // 7. 左边的下顶点的下方 (below lower left loop)
    {
      x: centerX - a * sin45,
      y: centerY + b / 2 + offset - 10,
    },
  ]
}

/**
 * SkillInfoCards - Container for all skill info cards
 * Positions 7 cards around the infinity shape on PC only
 */
export default function SkillInfoCards({
  containerWidth,
  containerHeight,
}: SkillInfoCardsProps) {
  const { t } = useLanguage()
  const positions = getCardPositions(containerWidth, containerHeight)

  return (
    <div className="absolute inset-0 pointer-events-none">
      {positions.map((position, index) => (
        <SkillInfoCard
          key={index}
          position={position}
          delay={0.1 + index * 0.08}
        >
          {t.skillCards[index]}
        </SkillInfoCard>
      ))}
    </div>
  )
}
