import { useLanguage } from '../i18n/LanguageContext'
import ExpandableSkillCard from './ExpandableSkillCard'

interface ExpandableSkillCardsProps {
  containerWidth: number
  containerHeight: number
  isInsideShape: boolean
}

// Same constants as SkillInfoCards for consistent positioning
const PADDING = 60
const PC_HEIGHT_RATIO = 0.35

/**
 * Calculate positions for expandable cards
 * Positioned OUTWARD from the corresponding SkillInfoCards
 * to maintain readability and avoid overlap
 */
function getExpandCardPositions(width: number, height: number) {
  const centerX = width / 2
  const centerY = height / 2
  const a = (width - PADDING * 2) / 2
  const b = (height - PADDING * 2) * PC_HEIGHT_RATIO

  const sin45 = Math.sin(Math.PI / 4) // ~0.707

  // Offsets to position cards outward from base SkillInfoCards
  // Each position is calculated to move away from the infinity shape center
  return [
    // 0: Center - move up-left (toward top-left corner)
    {
      x: centerX -20,
      y: centerY -70,
    },
    // 1: Right upper loop - move up (toward top)
    {
      x: centerX + a * sin45 - 10,
      y: centerY - b / 2 - 85,
    },
    // 2: Rightmost point - move right and up (toward top-right)
    {
      x: centerX + a ,
      y: centerY - 50,
    },
    // 3: Right lower loop - move down (toward bottom)
    {
      x: centerX + a * sin45,
      y: centerY + b / 2 + 85,
    },
    // 4: Left upper loop - move up (toward top)
    {
      x: centerX - a * sin45,
      y: centerY - b / 2 - 85,
    },
    // 5: Leftmost point - move left and up (toward top-left)
    {
      x: centerX - a - 35,
      y: centerY - 50,
    },
    // 6: Left lower loop - move down (toward bottom)
    {
      x: centerX - a * sin45,
      y: centerY + b / 2 + 85,
    },
  ]
}

/**
 * ExpandableSkillCards - Container for all expandable skill cards
 * Appears when mouse enters the infinity shape interior
 */
export default function ExpandableSkillCards({
  containerWidth,
  containerHeight,
  isInsideShape,
}: ExpandableSkillCardsProps) {
  const { t } = useLanguage()
  const positions = getExpandCardPositions(containerWidth, containerHeight)

  // Get expanded skills from translations
  const expandedSkills = t.expandedSkills || []

  return (
    <div className="absolute inset-0 pointer-events-none">
      {positions.map((position, index) => (
        <ExpandableSkillCard
          key={index}
          skills={expandedSkills[index] || []}
          position={position}
          isVisible={isInsideShape}
          delay={index * 0.04} // Stagger animation
        />
      ))}
    </div>
  )
}
