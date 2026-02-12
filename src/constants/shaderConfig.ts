import * as THREE from 'three'

/**
 * Configuration for the Möbius ribbon geometry
 */
export const MOBIUS_GEOMETRY = {
  width: 1,
  height: 1,
  widthSegments: 128,
  heightSegments: 32,
} as const

/**
 * Initial uniform values for the Möbius ribbon shader
 */
export const createInitialUniforms = () => ({
  uTime: { value: 0 },
  uTwist: { value: 0 },
  uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  uHoverScale: { value: 0 },
  uFlowIntensity: { value: 0 },
})

/**
 * Shader material configuration
 */
export const SHADER_MATERIAL_CONFIG = {
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
} as const
