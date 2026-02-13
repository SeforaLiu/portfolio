// MobiusRibbon.tsx
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { mobiusShaders } from '@/shaders'
import {
  MOBIUS_GEOMETRY,
  createInitialUniforms,
  SHADER_MATERIAL_CONFIG,
} from '@/constants/shaderConfig'
import type { MousePosition } from '@/hooks/useMousePosition'
import { useRibbonHover } from '@/hooks/useRibbonHover'

interface MobiusRibbonProps {
  mousePosition: MousePosition
}

function MobiusRibbon({ mousePosition }: MobiusRibbonProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniformsRef = useRef(createInitialUniforms())

  // 1. Get the raw boolean state (True/False)
  const isHovering = useRibbonHover(mousePosition)

  // 2. Refs to store the *current* smoothed values
  const currentHoverIntensity = useRef(0)
  const currentTwist = useRef(0)

  // 3. 新增：手动维护一个时间累加器，解决 Tab 切换导致的时间跳跃问题
  const timeRef = useRef(0)

  // 注意：useFrame 接收第二个参数 delta (距离上一帧的时间间隔，单位秒)
  useFrame((_, delta) => {
    const uniforms = uniformsRef.current

    // 1. 限制最大 Delta (Time Clamping)
    // 如果 delta 大于 0.1秒（通常意味着切换了 Tab 或发生了严重卡顿），
    // 我们强制将其视为 0.016秒 (约60FPS的一帧)。
    // 这样动画会从暂停处平滑继续，而不是瞬间跳跃。
    const clampedDelta = Math.min(delta, 0.1)

    // 2. 手动累加时间
    timeRef.current += clampedDelta

    // 3. 使用帧率无关的平滑算法 (Damping)
    // 公式：lerp(current, target, 1 - exp(-lambda * dt))
    // 这种写法保证了无论帧率是 30fps 还是 120fps，动画速度看起来是一样的。

    // A. Smooth Hover Transition
    const targetHover = isHovering ? 1.0 : 0.0
    // 这里的 3.0 是速度系数 (lambda)，值越大变化越快
    const hoverSmoothing = 1.0 - Math.exp(-3.0 * clampedDelta)

    currentHoverIntensity.current = THREE.MathUtils.lerp(
      currentHoverIntensity.current,
      targetHover,
      hoverSmoothing
    )

    // B. Smooth Twist Transition
    const targetTwist = mousePosition.x
    // Twist 稍微快一点，系数设为 4.0
    const twistSmoothing = 1.0 - Math.exp(-6.0 * clampedDelta)

    currentTwist.current = THREE.MathUtils.lerp(
      currentTwist.current,
      targetTwist,
      twistSmoothing
    )


    // --- UPDATE UNIFORMS ---

    // 使用我们手动累加的时间，而不是 state.clock.getElapsedTime()
    uniforms.uTime.value = timeRef.current
    uniforms.uTwist.value = currentTwist.current

    uniforms.uHoverScale.value = currentHoverIntensity.current * 0.2
    uniforms.uFlowIntensity.value = currentHoverIntensity.current * 0.5

    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms = uniforms
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