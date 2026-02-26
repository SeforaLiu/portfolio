import { useState, useEffect } from 'react'

export type ScrollPosition = {
  scrollY: number
  scrollProgress: number // 0 to 1 based on viewport height
  isScrolled: boolean
}

/**
 * Custom hook to track scroll position and progress
 * Returns normalized scroll values for smooth animations
 */
export function useScrollPosition(): ScrollPosition {
  const [scrollState, setScrollState] = useState<ScrollPosition>(() => ({
    scrollY: 0,
    scrollProgress: 0,
    isScrolled: false,
  }))

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const scrollProgress = Math.min(scrollY / viewportHeight, 1)

      setScrollState({
        scrollY,
        scrollProgress,
        isScrolled: scrollProgress > 0.05, // 5% threshold for "scrolled" state
      })
    }

    // Initial check
    handleScroll()

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollState
}

export default useScrollPosition
