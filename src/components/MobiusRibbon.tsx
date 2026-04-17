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
  currentScreen: number
}

function MobiusRibbon({ mousePosition, scrollPosition, currentScreen }: MobiusRibbonProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

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
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
    }
  }, [size])

  useFrame((_, delta) => {
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
    const targetScale = isMobile ? 0.08 : 0.1
    const targetX = isMobile ? -1.3 : -4
    const targetY = isMobile ? 3.2 : 3

    // 平滑过渡到目标位置（基于滚动进度）
    // 计算从0.66到1的相对进度
    let adjustedScrollProgress = Math.min((scrollPosition.scrollProgress - 0.66) / 0.34, 1)
    // 当往上滚动时，adjustedScrollProgress可能为负，需要处理
    adjustedScrollProgress = Math.max(adjustedScrollProgress, 0)

    let finalTargetScale: number
    let finalTargetX: number
    let finalTargetY: number

    if (isMobile && currentScreen >= 1) {
      // 移动端第二屏和第三屏：隐藏ribbon
      finalTargetScale = 0
      finalTargetX = 0
      finalTargetY = 0
    } else {
      // 正常行为：基于滚动进度插值
      finalTargetScale = THREE.MathUtils.lerp(initialScale, targetScale, adjustedScrollProgress)
      finalTargetX = THREE.MathUtils.lerp(initialX, targetX, adjustedScrollProgress)
      finalTargetY = THREE.MathUtils.lerp(initialY, targetY, adjustedScrollProgress)
    }

    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      finalTargetScale,
      scrollSmoothing
    )
    currentX.current = THREE.MathUtils.lerp(
      currentX.current,
      finalTargetX,
      scrollSmoothing
    )
    currentY.current = THREE.MathUtils.lerp(
      currentY.current,
      finalTargetY,
      scrollSmoothing
    )

    // 防止scale恰好为0
    currentScale.current = Math.max(currentScale.current, 0.001)

    // --- UPDATE UNIFORMS ---
    const material = materialRef.current
    if (material) {
      material.uniforms.uTime.value = timeRef.current
      material.uniforms.uTwist.value = currentTwist.current
      material.uniforms.uHoverScale.value = currentHoverIntensity.current * 0.2
      material.uniforms.uFlowIntensity.value = currentHoverIntensity.current * 0.5
      material.uniforms.uRailOffset.value = railOffsetRef.current
      material.uniforms.uIsMobile.value = isMobile ? 1.0 : 0.0
    }

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
        ref={materialRef}
        uniforms={uniformsRef.current}
        vertexShader={mobiusShaders.vertex}
        fragmentShader={mobiusShaders.fragment}
        {...SHADER_MATERIAL_CONFIG}
      />
    </mesh>
  )
}

export default MobiusRibbon