/**
 * Math utilities for lemniscate (infinity shape) curve calculations
 * Used for detecting mouse position inside the skill map shape
 */

/**
 * Check if a point is inside the infinity (lemniscate) shape
 * Uses ellipse approximation for each lobe
 *
 * @param mouseX - Mouse X coordinate relative to container
 * @param mouseY - Mouse Y coordinate relative to container
 * @param centerX - Center X of the shape
 * @param centerY - Center Y of the shape
 * @param a - Half of shape width (x scale)
 * @param b - Height scale of the shape
 * @returns true if point is inside the shape
 */
export function isInsideInfinityShape(
  mouseX: number,
  mouseY: number,
  centerX: number,
  centerY: number,
  a: number,
  b: number
): boolean {
  const dx = mouseX - centerX
  const dy = mouseY - centerY

  // Quick bounding box check - reject points clearly outside
  if (Math.abs(dx) > a * 0.95 || Math.abs(dy) > b * 0.65) {
    return false
  }

  // Check center crossing region (the "X" intersection point)
  const centerRadius = Math.min(a, b) * 0.25
  if (dx * dx + dy * dy < centerRadius * centerRadius) {
    return true
  }

  // Check right lobe using ellipse approximation
  // Right lobe is centered at approximately (a * 0.5, 0)
  if (dx > 0) {
    const lobeCenterX = a * 0.5
    const lobeA = a * 0.55 // Horizontal radius
    const lobeB = b * 0.5 // Vertical radius

    // Normalized coordinates for ellipse equation
    const nx = (dx - lobeCenterX) / lobeA
    const ny = dy / lobeB

    // Inside ellipse if nx² + ny² < 1
    return nx * nx + ny * ny < 1
  }

  // Check left lobe using ellipse approximation
  // Left lobe is centered at approximately (-a * 0.5, 0)
  if (dx < 0) {
    const lobeCenterX = -a * 0.5
    const lobeA = a * 0.55 // Horizontal radius
    const lobeB = b * 0.5 // Vertical radius

    // Normalized coordinates for ellipse equation
    const nx = (dx - lobeCenterX) / lobeA
    const ny = dy / lobeB

    // Inside ellipse if nx² + ny² < 1
    return nx * nx + ny * ny < 1
  }

  return false
}

/**
 * Get lemniscate parameters from container dimensions
 *
 * @param width - Container width
 * @param height - Container height
 * @param padding - Padding around the shape (default: 60)
 * @param heightRatio - Vertical scale ratio (default: 0.35)
 * @returns Object with a, b, centerX, centerY parameters
 */
export function getLemniscateParams(
  width: number,
  height: number,
  padding: number = 60,
  heightRatio: number = 0.35
): { a: number; b: number; centerX: number; centerY: number } {
  return {
    a: (width - padding * 2) / 2,
    b: (height - padding * 2) * heightRatio,
    centerX: width / 2,
    centerY: height / 2,
  }
}
