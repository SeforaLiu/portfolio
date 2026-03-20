import { useEffect, useRef, useCallback } from 'react'
import useIsMobile from '../hooks/useIsMobile'

// Configuration constants
const DOT_COUNT = 60
const DOT_RADIUS = 3
const SNAKE_RADIUS = 8
const CYCLE_DURATION = 6000 // 6 seconds for one complete cycle
const PULSE_SPEED = 0.003 // Speed of dot pulsing animation

// Colors - Cyan/Teal theme
const DOT_COLOR = '#00d4d4'
const DOT_EATEN_COLOR = '#555555' // Gray color for eaten dots
const SNAKE_COLOR = '#00ffff'
const GLOW_COLOR = '#00ffff'

// Aspect ratio for the infinity shape
// On PC, this controls the "flatness" of the horizontal ∞
// Higher value = flatter shape
const PC_HEIGHT_RATIO = 0.5 // Y scale is 50% of container height

interface Dot {
  x: number
  y: number
  t: number // Parametric position on the curve (0 to 2π)
  eaten: boolean // true when snake has passed over this dot
}

/**
 * Get point on the infinity curve
 * @param t - Parameter (0 to 2π)
 * @param a - X axis scale
 * @param b - Y axis scale
 * @param isMobile - Whether to use vertical orientation
 */
function getInfinityPoint(
  t: number,
  a: number,
  b: number,
  isMobile: boolean
): { x: number; y: number } {
  // Lemniscate of Bernoulli parametric equations
  // Horizontal ∞ (PC): x = a*sin(t), y = b*sin(2t)/2
  // Vertical 8 (Mobile): swapped coordinates

  if (isMobile) {
    // Vertical 8 - rotated 90 degrees
    const x = (b * Math.sin(2 * t)) / 2
    const y = a * Math.sin(t)
    return { x, y }
  } else {
    // Horizontal ∞
    const x = a * Math.sin(t)
    const y = (b * Math.sin(2 * t)) / 2
    return { x, y }
  }
}

/**
 * SkillMap component - Displays a snake effect following an infinity-shaped path
 * PC: Horizontal ∞ shape
 * Mobile: Vertical 8 shape
 */
export default function SkillMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useIsMobile()
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>(0)
  const dotsRef = useRef<Dot[]>([])
  const lastPositionRef = useRef<number>(0)
  // Store logical dimensions (without DPR) for consistent snake path calculation
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 })

  // Initialize dots array
  const initDots = useCallback(
    (width: number, height: number) => {
      // Store dimensions for snake path calculation
      dimensionsRef.current = { width, height }

      const padding = 60
      const a = isMobile
        ? (height - padding * 2) / 2
        : (width - padding * 2) / 2
      // On PC, reduce b to make the ∞ shape flatter
      const b = isMobile
        ? (width - padding * 2)
        : (height - padding * 2) * PC_HEIGHT_RATIO

      const dots: Dot[] = []
      for (let i = 0; i < DOT_COUNT; i++) {
        const t = (i / DOT_COUNT) * 2 * Math.PI
        const point = getInfinityPoint(t, a, b, isMobile)
        dots.push({
          x: width / 2 + point.x,
          y: height / 2 + point.y,
          t: t, // Store parametric position
          eaten: false,
        })
      }
      return dots
    },
    [isMobile]
  )

  // Draw a single dot
  const drawDot = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, time: number, eaten: boolean) => {
      // Eaten dots are gray and don't pulse
      if (eaten) {
        ctx.beginPath()
        ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = DOT_EATEN_COLOR
        ctx.fill()
      } else {
        // Active dots have pulsing effect
        const pulse = Math.sin(time * PULSE_SPEED) * 0.3 + 1
        const radius = DOT_RADIUS * pulse

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = DOT_COLOR
        ctx.fill()
      }
    },
    []
  )

  // Draw the snake head with glow effect
  const drawSnake = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      // Glow effect
      ctx.save()
      ctx.shadowBlur = 25
      ctx.shadowColor = GLOW_COLOR

      // Outer glow ring
      ctx.beginPath()
      ctx.arc(x, y, SNAKE_RADIUS + 4, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 255, 255, 0.3)'
      ctx.fill()

      // Main snake body
      ctx.beginPath()
      ctx.arc(x, y, SNAKE_RADIUS, 0, Math.PI * 2)
      ctx.fillStyle = SNAKE_COLOR
      ctx.fill()

      // Inner bright core
      ctx.beginPath()
      ctx.arc(x, y, SNAKE_RADIUS * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()

      ctx.restore()
    },
    []
  )

  // Animation loop
  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Initialize start time
      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      // Use logical dimensions (same as dots) for snake path
      const { width, height } = dimensionsRef.current

      // Calculate snake position (0 to 2π)
      const position =
        ((elapsed % CYCLE_DURATION) / CYCLE_DURATION) * 2 * Math.PI

      // Store previous position BEFORE updating
      const prevPosition = lastPositionRef.current

      // Check if we've completed a cycle (reset dots to active state)
      if (position < prevPosition) {
        dotsRef.current.forEach((dot) => {
          dot.eaten = false
        })
      }

      // Update last position for next frame
      lastPositionRef.current = position

      // Calculate snake coordinates using same formula as dots
      const padding = 60
      const a = isMobile
        ? (height - padding * 2) / 2
        : (width - padding * 2) / 2
      // On PC, reduce b to make the ∞ shape flatter (same as initDots)
      const b = isMobile
        ? (width - padding * 2)
        : (height - padding * 2) * PC_HEIGHT_RATIO

      const snakePoint = getInfinityPoint(position, a, b, isMobile)
      const snakeX = width / 2 + snakePoint.x
      const snakeY = height / 2 + snakePoint.y

      // Check collisions using parametric position (more reliable than distance)
      // This ensures no dots are missed due to frame timing
      dotsRef.current.forEach((dot) => {
        if (!dot.eaten) {
          // Check if snake has passed this dot's position
          // Handle wrap-around case when snake completes a cycle
          if (prevPosition > position) {
            // Snake wrapped around: check if dot is in [prevPosition, 2π] OR [0, position]
            if (dot.t >= prevPosition || dot.t <= position) {
              dot.eaten = true
            }
          } else {
            // Normal case: check if dot is between prev and current position
            if (dot.t >= prevPosition && dot.t <= position) {
              dot.eaten = true
            }
          }
        }
      })

      // Clear canvas using actual canvas dimensions
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dots
      dotsRef.current.forEach((dot) => {
        drawDot(ctx, dot.x, dot.y, elapsed, dot.eaten)
      })

      // Draw snake
      drawSnake(ctx, snakeX, snakeY)

      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    },
    [isMobile, drawDot, drawSnake]
  )

  // Setup canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const container = canvas.parentElement
    if (!container) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      // Reinitialize dots with new dimensions
      dotsRef.current = initDots(rect.width, rect.height)

      // Reset animation state
      startTimeRef.current = 0
      lastPositionRef.current = 0
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, initDots])

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  )
}
