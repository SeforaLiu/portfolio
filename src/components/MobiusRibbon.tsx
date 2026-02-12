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
import { useControls } from 'leva'

interface MobiusRibbonProps {
  mousePosition: MousePosition
}

/**
 * MobiusRibbon - 3D Möbius ribbon with custom shaders
 *
 * Features:
 * - Custom GLSL vertex shader for Möbius surface transformation
 * - Fragment shader with iridescent coloring and fresnel effect
 * - Mouse-controlled twist animation
 * - Hover detection with scale and flow intensity changes
 * - Wind-like floating effect
 */
function MobiusRibbon({ mousePosition }: MobiusRibbonProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniformsRef = useRef(createInitialUniforms())
  const { hoverIntensity } = useRibbonHover(mousePosition)

  useFrame((state) => {
    const uniforms = uniformsRef.current
    uniforms.uTime.value = state.clock.getElapsedTime()
    uniforms.uTwist.value = mousePosition.x * 2.0

    // Update hover uniforms with smooth transitions
    uniforms.uHoverScale.value = 0.15
    uniforms.uFlowIntensity.value = 0.05

    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms = uniforms
    }
  })

  return (
    <mesh ref={meshRef}>
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
