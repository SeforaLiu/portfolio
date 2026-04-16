import SkillInfoCard from './SkillInfoCard'
import { useLanguage } from '../i18n/LanguageContext'

// 移动端「站立8字」形状参数（与 SkillMap 保持一致）
const MOBILE_SHAPE_CONFIG = {
  sizeRatio: 0.7,
  widthRatio: 0.6,
  padding: 40,
}

const LABEL_OFFSET = 40 // 标签距离8字曲线的偏移量（方便调试）

interface MobileSkillLabelsProps {
  containerWidth: number
  containerHeight: number
}

/**
 * MobileSkillLabels - 移动端站立8字的技能标签
 * 三个标签分别位于：上方、中间交汇处、下方
 */
export default function MobileSkillLabels({
  containerWidth,
  containerHeight,
}: MobileSkillLabelsProps) {
  const { t } = useLanguage()
  const centerX = containerWidth / 2
  const centerY = containerHeight / 2

  // 与 SkillMap 相同的 a 值计算（站立8字的纵向半径）
  const padding = MOBILE_SHAPE_CONFIG.padding
  const a = (containerHeight - padding * 2) / 2 * MOBILE_SHAPE_CONFIG.sizeRatio

  // skillCards 索引: 0=Digital Humanities, 1=Frontend Engineering, 3=Backend Systems
  const labels = [
    { text: t.skillCards[1], position: { x: centerX -20, y: centerY - a - LABEL_OFFSET } },
    { text: t.skillCards[0], position: { x: centerX , y: centerY } },
    { text: t.skillCards[3], position: { x: centerX -10, y: centerY + a + LABEL_OFFSET -10 } },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {labels.map((label, index) => (
        <SkillInfoCard
          key={index}
          position={label.position}
          delay={0.2 + index * 0.1}
        >
          {label.text}
        </SkillInfoCard>
      ))}
    </div>
  )
}
