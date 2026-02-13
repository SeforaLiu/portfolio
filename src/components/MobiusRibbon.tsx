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
import { useRibbonHover } from '@/hooks/useRibbonHover'
import useIsMobile from '@/hooks/useIsMobile'

interface MobiusRibbonProps {
  mousePosition: MousePosition
}

function MobiusRibbon({ mousePosition }: MobiusRibbonProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniformsRef = useRef(createInitialUniforms())

  const { size } = useThree() // 获取画布尺寸
  const isMobile = useIsMobile()
  const isHovering = useRibbonHover(mousePosition)

  const currentHoverIntensity = useRef(0)
  const currentTwist = useRef(0)
  const timeRef = useRef(0)
  const railOffsetRef = useRef(0)

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
      railOffsetRef.current -= 628.3185;
    }

    // --- UPDATE UNIFORMS ---
    uniforms.uTime.value = timeRef.current
    uniforms.uTwist.value = currentTwist.current
    uniforms.uHoverScale.value = currentHoverIntensity.current * 0.2
    uniforms.uFlowIntensity.value = currentHoverIntensity.current * 0.5
    uniforms.uRailOffset.value = railOffsetRef.current
    uniforms.uIsMobile.value = isMobile ? 1.0 : 0.0

    // 确保材质更新
    if (meshRef.current) {
      // 某些 Three.js 版本需要手动标记 needsUpdate，但在 ShaderMaterial 中通常不需要
      // 除非替换了整个 uniforms 对象
    }
  })

  return (
    <mesh
      ref={meshRef}
      frustumCulled={false} // 关键：防止 Ribbon 移出视野时被裁剪
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