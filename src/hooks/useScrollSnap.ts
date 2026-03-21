import { useState, useEffect, useRef, useCallback } from 'react'

const TOTAL_SCREENS = 3
const TRANSITION_DURATION = 600 // ms

interface ScrollSnapState {
  currentScreen: number // 0, 1, or 2
  isTransitioning: boolean
}

/**
 * Custom hook for smooth screen-by-screen scroll snapping
 * Handles keyboard, wheel, and touch events for navigation
 */
export function useScrollSnap(): ScrollSnapState {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const isTransitioningRef = useRef(false)
  const currentScreenRef = useRef(0)

  // Keep refs in sync with state
  useEffect(() => {
    currentScreenRef.current = currentScreen
  }, [currentScreen])

  const scrollToScreen = useCallback((screenIndex: number) => {
    if (isTransitioningRef.current) return
    if (screenIndex < 0 || screenIndex >= TOTAL_SCREENS) return
    if (screenIndex === currentScreenRef.current) return

    const viewportHeight = window.innerHeight
    const targetY = screenIndex * viewportHeight

    isTransitioningRef.current = true
    setIsTransitioning(true)

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    })

    setCurrentScreen(screenIndex)

    // Reset transitioning state after animation
    setTimeout(() => {
      isTransitioningRef.current = false
      setIsTransitioning(false)
    }, TRANSITION_DURATION)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isTransitioningRef.current) return

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault()
      const nextScreen = currentScreenRef.current + 1
      if (nextScreen < TOTAL_SCREENS) {
        scrollToScreen(nextScreen)
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault()
      const prevScreen = currentScreenRef.current - 1
      if (prevScreen >= 0) {
        scrollToScreen(prevScreen)
      }
    }
  }, [scrollToScreen])

  // Handle wheel/trackpad scrolling
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wheelDeltaRef = useRef(0)

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isTransitioningRef.current) {
      e.preventDefault()
      return
    }

    // Accumulate wheel delta
    wheelDeltaRef.current += e.deltaY

    // Clear previous timeout
    if (wheelTimeoutRef.current) {
      clearTimeout(wheelTimeoutRef.current)
    }

    // Wait for wheel to settle, then decide direction
    wheelTimeoutRef.current = setTimeout(() => {
      const delta = wheelDeltaRef.current
      wheelDeltaRef.current = 0

      if (Math.abs(delta) > 30) { // Threshold to avoid accidental triggers
        if (delta > 0) {
          // Scrolling down
          const nextScreen = currentScreenRef.current + 1
          if (nextScreen < TOTAL_SCREENS) {
            scrollToScreen(nextScreen)
          }
        } else {
          // Scrolling up
          const prevScreen = currentScreenRef.current - 1
          if (prevScreen >= 0) {
            scrollToScreen(prevScreen)
          }
        }
      }
    }, 50)
  }, [scrollToScreen])

  // Handle touch events for mobile
  const touchStartYRef = useRef(0)
  const touchEndYRef = useRef(0)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (isTransitioningRef.current) return

    touchEndYRef.current = e.changedTouches[0].clientY
    const delta = touchStartYRef.current - touchEndYRef.current

    if (Math.abs(delta) > 50) { // Minimum swipe distance
      if (delta > 0) {
        // Swipe up - go to next screen
        const nextScreen = currentScreenRef.current + 1
        if (nextScreen < TOTAL_SCREENS) {
          scrollToScreen(nextScreen)
        }
      } else {
        // Swipe down - go to previous screen
        const prevScreen = currentScreenRef.current - 1
        if (prevScreen >= 0) {
          scrollToScreen(prevScreen)
        }
      }
    }
  }, [scrollToScreen])

  // Initialize - scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }
    }
  }, [handleKeyDown, handleWheel, handleTouchStart, handleTouchEnd])

  return { currentScreen, isTransitioning }
}

export default useScrollSnap
