import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import MobiusRibbon from '@/components/MobiusRibbon'
import LeftTextPanel from '@/components/LeftTextPanel'
import RightTextPanel from '@/components/RightTextPanel'
import CenterTitle from '@/components/CenterTitle'
import { useMousePosition } from '@/hooks/useMousePosition'

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

  return (
    <div className="relative w-screen h-screen bg-custom-bg overflow-hidden">
      {/* Canvas with 3D content */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
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

export default App
