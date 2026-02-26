import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import MobiusRibbon from '@/components/MobiusRibbon'
import LeftTextPanel from '@/components/LeftTextPanel'
import RightTextPanel from '@/components/RightTextPanel'
import CenterTitle from '@/components/CenterTitle'
import SecondScreen from '@/components/SecondScreen'
import { useMousePosition } from '@/hooks/useMousePosition'
import useScrollPosition from '@/hooks/useScrollPosition'
import useIsMobile from "@/hooks/useIsMobile.ts";

function App() {
  const mousePosition = useMousePosition()
  const scrollPosition = useScrollPosition()
  const isMobile = useIsMobile()

  return (
    <div className="relative w-full min-h-screen bg-custom-bg">
      {/* Fixed 3D Canvas - persists across scroll */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          className="w-full h-full"
          gl={{ antialias: true, alpha: true }}
        >
          {!isMobile &&
          <EffectComposer>
            <Bloom luminanceThreshold={0.3} intensity={0.5} radius={0.5} />
          </EffectComposer>}
          <MobiusRibbon mousePosition={mousePosition} scrollPosition={scrollPosition} />
        </Canvas>
      </div>

      {/* First Screen Content - fixed overlay, fades out and disappears on scroll */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <motion.div
          className="w-full h-full relative"
          style={{
            opacity: scrollPosition.scrollProgress < 0.66 ? 1 - scrollPosition.scrollProgress * 1.5 : 0,
            scale: 1 - scrollPosition.scrollProgress * 0.1,
            visibility: scrollPosition.scrollProgress >= 0.66 ? 'hidden' : 'visible',
          }}
          initial={{ opacity: 1 }}
        >
          <LeftTextPanel />
          <RightTextPanel />
          <CenterTitle />
        </motion.div>
      </div>

      {/* Scroll spacer - provides height for first screen */}
      <div className="h-screen relative z-10 pointer-events-none snap-start"></div>

      {/* Second Screen - scrolls into view */}
      <div className="relative z-10 min-h-screen snap-start">
        <SecondScreen />
      </div>
    </div>
  )
}

export default App
