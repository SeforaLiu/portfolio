import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import MobiusRibbon from '@/components/MobiusRibbon'
import LeftTextPanel from '@/components/LeftTextPanel'
import RightTextPanel from '@/components/RightTextPanel'
import CenterTitle from '@/components/CenterTitle'
import SecondScreen from '@/components/SecondScreen'
import ThirdScreen from '@/components/ThirdScreen'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useMousePosition } from '@/hooks/useMousePosition'
import useScrollPosition from '@/hooks/useScrollPosition'
import useIsMobile from "@/hooks/useIsMobile.ts";
import useScrollSnap from '@/hooks/useScrollSnap'
import { LanguageProvider } from '@/i18n'

function App() {
  const mousePosition = useMousePosition()
  const scrollPosition = useScrollPosition()
  const isMobile = useIsMobile()
  const { currentScreen } = useScrollSnap()

  return (
    <LanguageProvider>
      <div className="relative w-full bg-custom-bg">
        {/* Language Switcher */}
        <LanguageSwitcher />

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
            <MobiusRibbon mousePosition={mousePosition} scrollPosition={scrollPosition} currentScreen={currentScreen} />
          </Canvas>
        </div>

        {/* First Screen - Hero */}
        <section className="relative z-10 h-screen">
          {currentScreen === 0 && (
            <div className="fixed inset-0 z-10 pointer-events-none">
              <motion.div
                className="w-full h-full relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <LeftTextPanel />
                <RightTextPanel />
                <CenterTitle />
              </motion.div>
            </div>
          )}
        </section>

        {/* Second Screen - Skills */}
        <section className="relative z-10 h-screen">
          <SecondScreen isActive={currentScreen === 1} />
        </section>

        {/* Third Screen - Projects */}
        <section className="relative z-10 h-screen">
          <ThirdScreen isActive={currentScreen === 2} />
        </section>
      </div>
    </LanguageProvider>
  )
}

export default App
