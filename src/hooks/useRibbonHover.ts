import { useState, useEffect, useRef } from 'react'
import type { MousePosition } from './useMousePosition'

export type RibbonHoverState = {
  isHovering: boolean
  hoverIntensity: number
}

/**
 * Custom hook to detect when mouse is hovering over the 3D ribbon area
 * Uses smooth transitions for hover intensity
 */
export function useRibbonHover(
  mousePosition: MousePosition
): RibbonHoverState {
  const [isHovering, setIsHovering] = useState(false)
  const [hoverIntensity, setHoverIntensity] = useState(0)
  const previousIntensityRef = useRef(0)

  useEffect(() => {
    // Calculate distance from center (where ribbon is)
    const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2)

    // Ribbon is roughly in the center, so check if mouse is close to center
    const hoverThreshold = 0.7

    const shouldHover = distance < hoverThreshold

    // Smooth transition for hover state
    const targetIntensity = shouldHover ? 1.0 : 0.0
    const lerpFactor = 0.08

    const animateIntensity = () => {
      setHoverIntensity((prev) => {
        const next = prev + (targetIntensity - prev) * lerpFactor

        // Update isHovering based on intensity threshold
        if (next > 0.5 && !isHovering) {
          setIsHovering(true)
        } else if (next < 0.3 && isHovering) {
          setIsHovering(false)
        }

        previousIntensityRef.current = next

        // Stop animation loop if we've reached target
        if (Math.abs(next - targetIntensity) < 0.001) {
          return targetIntensity
        }

        return next
      })
    }

    const animationFrame = requestAnimationFrame(function loop() {
      animateIntensity()
      if (Math.abs(previousIntensityRef.current - targetIntensity) > 0.001) {
        requestAnimationFrame(loop)
      }
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [mousePosition, isHovering])

  return { isHovering, hoverIntensity }
}
