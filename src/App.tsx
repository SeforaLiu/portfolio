import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import MobiusRibbon from '@/components/MobiusRibbon'
import LeftTextPanel from '@/components/LeftTextPanel'
import RightTextPanel from '@/components/RightTextPanel'
import CenterTitle from '@/components/CenterTitle'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/**
 * App - Root component for the creative portfolio website
 *
 * Features:
 * - Full-screen 3D Canvas with Möbius ribbon visualization
 * - Post-processing bloom effect for glow
 * - Animated UI overlays on top of 3D scene
 * - Mouse position tracking for interactive animations
 * - Responsive camera for mobile/desktop
 */
function App() {
  const mousePosition = useMousePosition()
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Adjust camera for mobile to show full ribbon
  const cameraPosition = isMobile ? [0, 0, 12] : [0, 0, 8]
  const cameraFov = isMobile ? 60 : 50

  return (
    <div style={appStyles.container}>
      {/* Canvas with 3D content */}
      <Canvas camera={{ position: cameraPosition as [number, number, number], fov: cameraFov }} style={appStyles.canvas} gl={{ antialias: true, alpha: true }}>
        <EffectComposer>
          <Bloom luminanceThreshold={0.3} intensity={0.5} radius={0.5} />
        </EffectComposer>
        <MobiusRibbon mousePosition={mousePosition} />
      </Canvas>

      {/* Text overlays - outside Canvas */}
      <LeftTextPanel />
      <RightTextPanel />
      <CenterTitle />
    </div>
  )
}

// Styles
const appStyles = {
  container: {
    position: 'relative' as const,
    width: '100vw',
    height: '100vh',
    background: '#0a0a0a',
    overflow: 'hidden' as const,
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
} as const

export default App
