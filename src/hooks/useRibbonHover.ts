import { useState, useEffect } from 'react'
import type { MousePosition } from './useMousePosition'

/**
 * Simplified hook: Just tells us IF we are hovering.
 * We leave the animation/smoothing to the useFrame loop in the component.
 */
export function useRibbonHover(mousePosition: MousePosition): boolean {
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Calculate distance from center
    const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2)

    // Threshold: 0.5 is roughly the visual radius of the ribbon
    const hoverThreshold = 0.6

    // Add a tiny bit of hysteresis (buffer) to prevent flickering at the edge
    if (isHovering) {
      if (distance > hoverThreshold + 0.05) setIsHovering(false)
    } else {
      if (distance < hoverThreshold) setIsHovering(true)
    }

  }, [mousePosition, isHovering])

  return isHovering
}