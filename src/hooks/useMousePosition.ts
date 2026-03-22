import { useState, useEffect } from 'react'

export type MousePosition = {
  x: number
  y: number
}

/**
 * Custom hook to track mouse position normalized to [-1, 1] range
 * Only tracks mouse on desktop - mobile devices don't have hover effects
 * This allows normal scroll behavior on mobile devices
 */
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia('(hover: hover)').matches

    // Only track mouse position on desktop devices
    if (!hasHover) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return mousePosition
}
