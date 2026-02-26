import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { mobiusShaders } from '@/shaders'
import {
  MOBIUS_GEOMETRY,
  createInitialUniforms,
  SHADER_MATERIAL_CONFIG,
} from '@/constants/shaderConfig'
import type { MousePosition } from '@/hooks/useMousePosition'
import type { ScrollPosition } from '@/hooks/useScrollPosition'
import { useRibbonHover } from '@/hooks/useRibbonHover'
import useIsMobile from '@/hooks/useIsMobile'

interface MobiusRibbonProps {
  mousePosition: MousePosition
  scrollPosition: ScrollPosition
}

function MobiusRibbon({ mousePosition, scrollPosition }: MobiusRibbonProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniformsRef = useRef(createInitialUniforms())

  const { size } = useThree() // 获取画布尺寸
  const isMobile = useIsMobile()
  const isHovering = useRibbonHover(mousePosition)

  const currentHoverIntensity = useRef(0)
  const currentTwist = useRef(0)
  const timeRef = useRef(0)
  const railOffsetRef = useRef(0)

  // Scroll animation refs
  const currentScale = useRef(isMobile ? 0.7 : 1.1)
  const currentX = useRef(0)
  const currentY = useRef(0)

  // 监听窗口大小变化，更新 Shader 中的分辨率 (虽然目前 Fragment Shader 没重度依赖，但这是最佳实践)
  useEffect(() => {
    uniformsRef.current.uResolution.value.set(size.width, size.height)
  }, [size])

  useFrame((_, delta) => {
    const uniforms = uniformsRef.current

    // 1. 时间步长限制
    const clampedDelta = Math.min(delta, 0.1)
    timeRef.current += clampedDelta

    // 2. 平滑过渡逻辑
    const targetHover = isHovering ? 1.0 : 0.0
    // 使用更平滑的阻尼系数
    const hoverSmoothing = 1.0 - Math.exp(-4.0 * clampedDelta)
    currentHoverIntensity.current = THREE.MathUtils.lerp(
      currentHoverIntensity.current,
      targetHover,
      hoverSmoothing
    )

    // Twist 跟随鼠标 X 轴
    const targetTwist = mousePosition.x
    const twistSmoothing = 1.0 - Math.exp(-6.0 * clampedDelta)
    currentTwist.current = THREE.MathUtils.lerp(
      currentTwist.current,
      targetTwist,
      twistSmoothing
    )

    // 3. 运动积分逻辑
    // 基础速度 0.2，Hover 时加速
    const speed = 0.2 * (1.0 + currentHoverIntensity.current * 2.0)
    railOffsetRef.current += speed * clampedDelta

    // 重置逻辑：保持数值在合理范围，避免浮点精度丢失
    // 200 * PI 约等于 628.3，足够大且不会溢出
    if (railOffsetRef.current > 628.3185) {
      railOffsetRef.current -= 628.3185
    }

    // 4. 滚动动画 - 移动到左上角并缩小
    // 平滑插值
    const scrollSmoothing = 1.0 - Math.exp(-3.0 * clampedDelta)

    // 初始位置和大小
    const initialScale = isMobile ? 0.7 : 1.1
    const initialX = 0
    const initialY = 0

    // 滚动后的目标位置和大小（左上角）
    const targetScale = isMobile ? 0.1 : 0.1
    const targetX = isMobile ? -2.5 : -4
    const targetY = isMobile ? 1.8 : 3

    // 平滑过渡到目标位置（基于滚动进度）
    // 计算从0.66到1的相对进度
    let adjustedScrollProgress = Math.min((scrollPosition.scrollProgress - 0.66) / 0.34, 1)
    // 当往上滚动时，adjustedScrollProgress可能为负，需要处理
    adjustedScrollProgress = Math.max(adjustedScrollProgress, 0)

    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      THREE.MathUtils.lerp(initialScale, targetScale, adjustedScrollProgress),
      scrollSmoothing
    )
    currentX.current = THREE.MathUtils.lerp(
      currentX.current,
      THREE.MathUtils.lerp(initialX, targetX, adjustedScrollProgress),
      scrollSmoothing
    )
    currentY.current = THREE.MathUtils.lerp(
      currentY.current,
      THREE.MathUtils.lerp(initialY, targetY, adjustedScrollProgress),
      scrollSmoothing
    )

    // --- UPDATE UNIFORMS ---
    uniforms.uTime.value = timeRef.current
    uniforms.uTwist.value = currentTwist.current
    uniforms.uHoverScale.value = currentHoverIntensity.current * 0.2
    uniforms.uFlowIntensity.value = currentHoverIntensity.current * 0.5
    uniforms.uRailOffset.value = railOffsetRef.current
    uniforms.uIsMobile.value = isMobile ? 1.0 : 0.0

    // 更新 mesh 位置和缩放
    if (meshRef.current) {
      meshRef.current.scale.setScalar(currentScale.current)
      meshRef.current.position.set(currentX.current, currentY.current, 0)
    }
  })

  return (
    <mesh
      ref={meshRef}
      frustumCulled={false}
    >
      <planeGeometry
        args={[
          MOBIUS_GEOMETRY.width,
          MOBIUS_GEOMETRY.height,
          MOBIUS_GEOMETRY.widthSegments,
          MOBIUS_GEOMETRY.heightSegments,
        ]}
      />
      <shaderMaterial
        uniforms={uniformsRef.current}
        vertexShader={mobiusShaders.vertex}
        fragmentShader={mobiusShaders.fragment}
        {...SHADER_MATERIAL_CONFIG}
      />
    </mesh>
  )
}

export default MobiusRibbon