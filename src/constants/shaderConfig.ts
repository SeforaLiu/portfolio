// shaderConfig.ts
import * as THREE from 'three'

export const MOBIUS_GEOMETRY = {
  width: 1,
  height: 1,
  widthSegments: 128,
  heightSegments: 32,
} as const

export const createInitialUniforms = () => ({
  uTime: { value: 0 },
  uTwist: { value: 0 },
  uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  uHoverScale: { value: 0 },
  uFlowIntensity: { value: 0 },
  uRailOffset: { value: 0 },
})

export const SHADER_MATERIAL_CONFIG = {
  transparent: false,
  side: THREE.DoubleSide,
  depthWrite: true,
  depthTest: true
} as const