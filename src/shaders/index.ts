import vertexShader from './mobiusVertex.glsl?raw'
import fragmentShader from './mobiusFragment.glsl?raw'

export const mobiusShaders = {
  vertex: vertexShader,
  fragment: fragmentShader,
} as const
