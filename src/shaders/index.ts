/**
 * Shader Module for Möbius Ribbon
 *
 * This module exports the GLSL shaders used to render the Möbius ribbon 3D visualization.
 *
 * File Structure:
 * - mobiusVertex.glsl: Vertex shader - handles position transformation and 3D shape generation
 * - mobiusFragment.glsl: Fragment shader - handles color, lighting, and transparency effects
 *
 * Import Syntax:
 * - The '?raw' suffix tells Vite to import the file as a raw string instead of compiling it
 * - This is necessary for GLSL files which are not valid JavaScript/TypeScript
 *
 * Usage in React Three Fiber:
 * ```tsx
 * import { mobiusShaders } from '@/shaders'
 *
 * <mesh>
 *   <shaderMaterial
 *     vertexShader={mobiusShaders.vertex}
 *     fragmentShader={mobiusShaders.fragment}
 *     uniforms={{ uTime: { value: 0 }, ... }}
 *   />
 * </mesh>
 * ```
 */

// Import GLSL source code as raw strings
import vertexShader from './mobiusVertex.glsl?raw'
import fragmentShader from './mobiusFragment.glsl?raw'

/**
 * Exported shader collection
 *
 * This object contains the vertex and fragment shaders used by the Möbius ribbon.
 * The 'as const' assertion ensures TypeScript knows these are readonly string literals.
 */
export const mobiusShaders = {
  vertex: vertexShader,
  fragment: fragmentShader,
} as const
