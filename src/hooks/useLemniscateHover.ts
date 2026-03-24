import { useState, useEffect, useCallback, useRef } from 'react'
import { isInsideInfinityShape, getLemniscateParams } from '../utils/lemniscateMath'

interface UseLemniscateHoverOptions {
  containerRef: React.RefObject<HTMLDivElement | null>
  width: number
  height: number
  padding?: number
  heightRatio?: number
  enabled?: boolean // Only active on PC (width > 768)
}

/**
 * Hook to detect if mouse is inside the lemniscate (infinity) shape
 * Used for showing/hiding expandable skill cards
 *
 * @returns boolean - true if mouse is inside the shape
 */
export function useLemniscateHover({
  containerRef,
  width,
  height,
  padding = 60,
  heightRatio = 0.35,
  enabled = true,
}: UseLemniscateHoverOptions): boolean {
  const [isInside, setIsInside] = useState(false)
  const paramsRef = useRef({ a: 0, b: 0, centerX: 0, centerY: 0 })

  // Update params when dimensions change
  useEffect(() => {
    paramsRef.current = getLemniscateParams(width, height, padding, heightRatio)
  }, [width, height, padding, heightRatio])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      const { a, b, centerX, centerY } = paramsRef.current

      const inside = isInsideInfinityShape(mouseX, mouseY, centerX, centerY, a, b)

      setIsInside(inside)
    },
    [enabled, containerRef]
  )

  const handleMouseLeave = useCallback(() => {
    setIsInside(false)
  }, [])

  useEffect(() => {
    if (!enabled) {
      setIsInside(false)
      return
    }

    const container = containerRef.current
    if (!container) return

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [enabled, containerRef, handleMouseMove, handleMouseLeave])

  return isInside
}
