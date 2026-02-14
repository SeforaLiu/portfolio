import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import MobiusRibbon from '@/components/MobiusRibbon'
import LeftTextPanel from '@/components/LeftTextPanel'
import RightTextPanel from '@/components/RightTextPanel'
import CenterTitle from '@/components/CenterTitle'
import { useMousePosition } from '@/hooks/useMousePosition'
import useIsMobile from "@/hooks/useIsMobile.ts";

function App() {
  const mousePosition = useMousePosition()
  const isMobile = useIsMobile()

  return (
    <div className="relative w-screen h-screen bg-custom-bg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        {!isMobile &&
        <EffectComposer>
          <Bloom luminanceThreshold={0.3} intensity={0.5} radius={0.5} />
        </EffectComposer>}
        <MobiusRibbon mousePosition={mousePosition} />
      </Canvas>

      <LeftTextPanel />
      <RightTextPanel />
      <CenterTitle />
    </div>
  )
}

export default App
