// ==============================
// VARYING VARIABLES
// These variables are passed from vertex shader to fragment shader
// They're interpolated across the triangle faces
// ==============================
varying vec2 vUv;           // UV texture coordinates (0-1 range), used for color variation across surface
varying vec3 vNormal;        // Surface normal vector at this vertex, used for lighting calculations
varying vec3 vPosition;      // Original position of the vertex before transformation
varying vec3 vWorldPosition; // Final transformed position in world space, passed to fragment shader

// ==============================
// UNIFORM VARIABLES
// These are constant values passed from JavaScript/CPU to the GPU
// They're the same for all vertices in a single draw call
// ==============================
uniform float uTime;          // Running time in seconds, drives all animations
uniform float uTwist;        // Twist amount controlled by mouse position (horizontal)
uniform vec2 uResolution;    // Canvas resolution (width, height) - available but not currently used
uniform float uHoverScale;   // Scale factor when mouse is hovering (0.0 to 1.0)
uniform float uFlowIntensity; // Flow animation intensity when hovering (0.0 to 1.0)

// ==============================
// MÖBIUS RIBBON TRANSFORMATION
// This function transforms a flat plane (2D grid) into a twisted Möbius strip
// shaped as a figure-8 (lemniscate) in 3D space
//
// Mathematical Background:
// - A Möbius strip is a non-orientable surface with only one side and one boundary
// - It's created by taking a strip, giving it a half-twist (180°), and connecting the ends
// - The "lemniscate" (figure-8) is the path that the strip follows through space
//
// Parameters:
// - pos: The original vertex position (x,y,z) on the flat plane
// - t: Twist amount (controlled by mouse position) affecting how much the ribbon twists
//
// Returns: The transformed 3D position (x,y,z) of the vertex
// ==============================
vec3 mobiusTransform(vec3 pos, float t) {
  // ==============================
  // PARAMETERIZATION (u, v)
  // The input position is mapped to two parameters:
  // - u: Traverses along the length of the strip (like "along the ribbon")
  // - v: Traverses across the width of the strip (like "across the ribbon")
  // ==============================
  float u = pos.x * 6.28318530718;  // Scale u from [0,1] to [0, 2π] (one full rotation around the figure-8)
  float v = pos.y * 2.0 - 1.0;      // Scale v from [0,1] to [-1,1] (width of the strip from edge to edge)

  // ==============================
  // WIND-LIKE FLOATING EFFECT
  // Adds a gentle, organic wave motion to make the ribbon feel alive
  // This creates a "floating in water" or "blowing in wind" effect
  // ==============================
  float windY = sin(u * 2.0 + uTime * 0.8) * 0.15;  // Sine wave in Y direction, moves with time
  float windZ = cos(u * 1.5 + uTime * 0.6) * 0.12;  // Cosine wave in Z direction, offset phase for 3D feel

  // Flow intensity multiplier - when hovering, the wind effect is stronger
  // Creates a more dynamic animation during interaction
  float flowMultiplier = 1.0 + uFlowIntensity * 2.0;

  // ==============================
  // TWIST ANIMATION
  // The ribbon slowly rotates/twists over time based on:
  // - t: mouse-controlled twist amount
  // - u: position along the ribbon (different points twist at different rates)
  // - uTime: continuous time-based rotation
  // - flowMultiplier: increases when hovering
  // ==============================
  float twist = t * 0.5 * sin(u + uTime * 0.3 * flowMultiplier);

  // ==============================
  // FIGURE-8 (LEMNISCATE) PARAMETERIZATION
  // The ribbon follows a figure-8 path (lemniscate of Bernoulli)
  // This is the "center line" of the ribbon through space
  //
  // Why Lemniscate of Bernoulli?
  // - It's a proper closed curve that loops seamlessly
  // - It has elegant mathematical properties (symmetry, smooth derivatives)
  // - At u=0 and u=2π, the position is the same (ensures the ribbon connects to itself)
  // ==============================

  // Scale: Controls the overall size of the figure-8
  // Increases when hovering to create an "expanding" effect
  float scale = 3.0 * (1.0 + uHoverScale * 0.3);

  // Width: How wide the strip is (distance between the two edges)
  float width = 0.6;

  // Apply the twist to the angle parameter
  // The twist varies across the width (v), which creates the Möbius effect
  float angle = u + twist * v;

  // ==============================
  // LEMNISCATE OF BERNOULLI EQUATIONS
  // The standard parametric equations for a lemniscate:
  // x = (2a cos(t)) / (1 + sin²(t))
  // y = (a sin(2t)) / (1 + sin²(t))
  //
  // where 'a' is the size parameter and t is the angle
  // ==============================
  float a = scale * 0.5;           // Lemniscate size parameter (half of overall scale)
  float cos2t = cos(2.0 * angle);  // cos(2θ) - used in y calculation
  float denom = 1.0 + sin(angle) * sin(angle);  // Denominator: 1 + sin²(θ)

  // Base position - this is the center line of the ribbon
  // At u=0 and u=2π, these values are identical, ensuring the ribbon connects seamlessly
  float baseX = (a * 2.0 * cos(angle)) / denom;    // X coordinate of the curve center
  float baseY = (a * sin(2.0 * angle)) / denom;    // Y coordinate of the curve center

  // ==============================
  // CALCULATING PERPENDULAR OFFSET
  // To create a ribbon with width, we need to extend outward perpendicular
  // to the curve at each point. This requires:
  // 1. Finding the tangent direction (which way the curve is going)
  // 2. Computing the perpendicular direction (90° rotation of tangent)
  // 3. Extending outward in the perpendicular direction by the strip width
  // ==============================

  // Pre-compute trigonometric values for efficiency
  float sinU = sin(angle);
  float cosU = cos(angle);
  float sin2U = sin(2.0 * angle);

  // ==============================
  // TANGENT CALCULATION
  // The tangent is the derivative of the position function
  // It tells us which direction the curve is moving at each point
  //
  // Derivative of lemniscate (simplified):
  // dx/dθ = -2a sin(θ)(1 + 2sin²(θ)) / (1 + sin²(θ))²
  // dy/dθ = 2a(cos²(θ) - sin²(θ)) / (1 + sin²(θ))
  // ==============================
  float denom2 = denom * denom;  // Denominator squared for dx derivative
  float tanDx = -2.0 * a * sinU * (1.0 + 2.0 * sinU * sinU) / denom2;  // X component of tangent
  float tanDy = 2.0 * a * (cosU * cosU - sinU * sinU) / denom;            // Y component of tangent

  // Normalize the tangent to make it a unit vector (length = 1)
  float len = sqrt(tanDx * tanDx + tanDy * tanDy);  // Length of the tangent vector
  float tangentX = tanDx / len;  // Normalized X component
  float tangentY = tanDy / len;  // Normalized Y component

  // ==============================
  // PERPENDULAR DIRECTION
  // To find the perpendicular direction, we rotate the tangent by 90°
  // For a 2D vector (x, y), rotating 90° counterclockwise gives (-y, x)
  // ==============================
  float perpX = -tangentY;  // Perpendicular X component
  float perpY = tangentX;   // Perpendicular Y component

  // ==============================
  // MÖBIUS HALF-TWIST
  // This is the key to the Möbius strip's unique property!
  //
  // Why cos(angle/2) and sin(angle/2)?
  // - As we go from angle=0 to angle=2π, the "width" direction rotates by 180°
  // - This half-twist means a point starting on the "top" of the ribbon
  //   will end up on the "bottom" after one full loop
  // - This creates a one-sided surface - you can trace continuously from any
  //   point to any other without crossing an edge
  //
  // The v parameter (-1 to 1) moves us from one edge to the other
  // The cos(angle/2) rotates this offset as we travel along the strip
  // ==============================
  float twistOffset = width * v * cos(angle / 2.0);  // Width offset in XY plane

  // ==============================
  // FINAL POSITION CALCULATION
  // Combine all components:
  // - baseX/baseY: Center line position (lemniscate curve)
  // - perpX/perpY * twistOffset: Width offset perpendicular to curve
  // - windY/windZ: Animated floating motion
  // - width * v * sin(angle/2): Z component for 3D depth (the actual 3D twist)
  // ==============================
  float x = baseX + perpX * twistOffset;                                    // Final X position
  float y = baseY + perpY * twistOffset + windY * flowMultiplier;          // Final Y position (with wind)
  float z = width * v * sin(angle / 2.0) + windZ * flowMultiplier;        // Final Z position (with wind)

  return vec3(x, y, z);  // Return the final 3D position
}

// ==============================
// MAIN FUNCTION
// This is the entry point for the vertex shader
// It's called once for every vertex (corner) of every triangle in the mesh
//
// The job of the vertex shader:
// 1. Receive the original vertex position
// 2. Apply transformations (Möbius twist, figure-8 shape)
// 3. Calculate final screen position (gl_Position)
// 4. Pass data to the fragment shader via varyings
// ==============================
void main() {
  // Pass original data to fragment shader (will be interpolated)
  vUv = uv;                    // Pass UV coordinates for texture mapping/color variation
  vNormal = normal;           // Pass original normal (though we recalculate in fragment shader)
  vPosition = position;        // Pass original position for reference

  // ==============================
  // APPLY MÖBIUS TRANSFORMATION
  // Transform the flat plane vertex into the twisted 3D Möbius ribbon
  // This is the core visual effect - from a simple rectangle to a complex 3D shape
  // ==============================
  vec3 transformedPos = mobiusTransform(position, uTwist);

  // Store the transformed position for the fragment shader
  // The fragment shader uses this to calculate normals and view angles
  vWorldPosition = transformedPos;

  // ==============================
  // FINAL SCREEN POSITION
  // gl_Position is a special GLSL variable - it's the final position of the vertex
  // in clip space (the coordinate system used by the GPU for rasterization)
  //
  // The transformation pipeline:
  // 1. transformedPos: Local space (our custom Möbius shape)
  // 2. modelViewMatrix: Transform to camera/eye space (relative to viewer)
  // 3. projectionMatrix: Apply perspective and map to normalized device coordinates [-1,1]
  //
  // vec4(transformedPos, 1.0) converts vec3(x,y,z) to vec4(x,y,z,w) where w=1.0
  // (w=1.0 indicates this is a position, not a direction)
  // ==============================
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos, 1.0);
}
