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

  const isHovering = useRibbonHover(mousePosition)

  const currentHoverIntensity = useRef(0)
  const currentTwist = useRef(0)
  const timeRef = useRef(0)

  // 轨道偏移量累加器
  const railOffsetRef = useRef(0)

  useFrame((_, delta) => {
    const uniforms = uniformsRef.current

    // 1. 时间步长限制 (防止 Tab 切换后的巨大跳跃)
    const clampedDelta = Math.min(delta, 0.1)
    timeRef.current += clampedDelta

    // 2. 平滑过渡逻辑
    const targetHover = isHovering ? 1.0 : 0.0
    const hoverSmoothing = 1.0 - Math.exp(-3.0 * clampedDelta)
    currentHoverIntensity.current = THREE.MathUtils.lerp(
      currentHoverIntensity.current,
      targetHover,
      hoverSmoothing
    )

    const targetTwist = mousePosition.x
    const twistSmoothing = 1.0 - Math.exp(-6.0 * clampedDelta)
    currentTwist.current = THREE.MathUtils.lerp(
      currentTwist.current,
      targetTwist,
      twistSmoothing
    )

    // 3. 核心修复：在 JS 中计算运动积分
    // 基础速度 0.2，当 hover 时速度增加 (flowMultiplier 效果)
    // 对应 Shader 原逻辑: 0.2 * (1.0 + uFlowIntensity * 2.0)
    const speed = 0.2 * (1.0 + currentHoverIntensity.current * 2.0)

    // 累加偏移量 = 速度 * 时间间隔
    railOffsetRef.current += speed * clampedDelta

    // 防止数值过大导致精度丢失，对 2PI 取模 (因为 Mobius 是闭环)
    // 但为了保证连续性，只有当数值非常大时才需要考虑，这里简单处理即可
    if (railOffsetRef.current > 10000.0) {
      railOffsetRef.current -= 6283.1853; // 减去 1000 * 2PI
    }

    // --- UPDATE UNIFORMS ---
    uniforms.uTime.value = timeRef.current
    uniforms.uTwist.value = currentTwist.current
    uniforms.uHoverScale.value = currentHoverIntensity.current * 0.2
    uniforms.uFlowIntensity.value = currentHoverIntensity.current * 0.5

    // 传入计算好的偏移量
    uniforms.uRailOffset.value = railOffsetRef.current

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