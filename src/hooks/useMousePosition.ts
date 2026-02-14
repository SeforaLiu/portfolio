import { useState, useEffect } from 'react'

export type MousePosition = {
  x: number
  y: number
}

/**
 * Custom hook to track mouse/touch position normalized to [-1, 1] range
 * Supports both mouse (desktop) and touch (mobile) events
 */
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default scrolling when touching the Möbius ribbon area
      e.preventDefault()
      const touch = e.touches[0]
      if (touch) {
        const x = (touch.clientX / window.innerWidth) * 2 - 1
        const y = -(touch.clientY / window.innerHeight) * 2 + 1
        setMousePosition({ x, y })
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) {
        const x = (touch.clientX / window.innerWidth) * 2 - 1
        const y = -(touch.clientY / window.innerHeight) * 2 + 1
        setMousePosition({ x, y })
      }
    }

    // Mouse events
    window.addEventListener('mousemove', handleMouseMove)

    // Touch events
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  return mousePosition
}
