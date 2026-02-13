// ==============================
// VARYING VARIABLES
// These come from the vertex shader and are interpolated across each pixel
// ==============================
varying vec2 vUv;           // UV coordinates for texture/color variation
varying vec3 vNormal;        // Original vertex normal (not used, recalculated here)
varying vec3 vPosition;      // Original vertex position (not used here)
varying vec3 vWorldPosition; // Transformed 3D position - used for lighting calculations

// ==============================
// UNIFORM VARIABLES
// ==============================
uniform float uTime;        // Running time in seconds for animation
uniform vec2 uResolution;   // Canvas resolution (available but not currently used)

// ==============================
// HSV TO RGB COLOR CONVERSION
// Converts a color from HSV (Hue, Saturation, Value) space to RGB space
//
// HSV is more intuitive for rainbow/iridescent effects:
// - Hue: The "color" (0=red, 0.33=green, 0.66=blue, 1.0=red again)
// - Saturation: How intense/pure the color is (0=gray, 1=fully saturated)
// - Value: How bright the color is (0=black, 1=full brightness)
//
// This is a compact, efficient implementation using fract() and modulo arithmetic
//
// Input: vec3(hue, saturation, value)
// Output: vec3(red, green, blue) - all values in [0,1] range
// ==============================
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);  // Magic constants for the conversion algorithm
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);  // Modulo-based calculation for color channels
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);  // Combine saturation and value
}

// ==============================
// MAIN FUNCTION (FRAGMENT SHADER)
// This is called once for every pixel of the rendered surface
// Its job: determine the color and transparency of each pixel
//
// Visual effects implemented:
// 1. Fresnel effect - edges are brighter than center (creates a glowing outline)
// 2. Iridescence - rainbow-like color shift based on viewing angle
// 3. Animated colors - colors shift over time
// ==============================
void main() {
  // ==============================
  // VIEW DIRECTION
  // The direction from the surface to the camera
  // Since our origin (0,0,0) is the camera position in view space,
  // and vWorldPosition is the position of the pixel,
  // the view direction is simply the negative of the position
  // ==============================
  vec3 viewDir = normalize(-vWorldPosition);  // Normalize to get a unit vector

  // ==============================
  // SURFACE NORMAL CALCULATION
  // We calculate the normal at each pixel using finite differences
  // dFdx() and dFdy() give us the rate of change across pixels
  //
  // This is better than using the vertex normals because:
  // - The Möbius surface is curved, so normals vary smoothly
  // - We get per-pixel normals for smooth shading (no flat polygon look)
  //
  // The cross product of two tangent directions gives us the perpendicular normal
  // ==============================
  vec3 normal = normalize(cross(
    dFdx(vWorldPosition),  // Rate of change in X direction (tangent 1)
    dFdy(vWorldPosition)   // Rate of change in Y direction (tangent 2)
  ));

  // ==============================
  // FRESNEL EFFECT
  // Fresnel is a physical light phenomenon: surfaces appear brighter/shinier
  // when viewed at glancing angles (edges) vs. directly (center)
  //
  // Formula: fresnel = (1 - dot(normal, viewDir))^power
  // - dot(normal, viewDir) = 1.0 when viewing directly (center)
  // - dot(normal, viewDir) = 0.0 when viewing at 90° (edge)
  // - We use power=3.0 to make the effect more pronounced
  //
  // Result: fresnel = 0.0 at center, up to 1.0 at edges
  // This creates a beautiful glowing rim around the ribbon
  // ==============================
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

  // ==============================
  // IRIDESCENCE EFFECT
  // Iridescence creates rainbow-like colors that shift with viewing angle
  // Similar to soap bubbles, oil on water, or pearlescent materials
  //
  // - viewAngle: Cosine of angle between normal and view direction
  // - We multiply by 10.0 to create multiple color cycles across the surface
  // - uTime * 0.5 makes the colors slowly animate over time
  // - Result is mapped to [0,1] range for color interpolation
  // ==============================
  float viewAngle = dot(normal, viewDir);
  float iridescence = sin(viewAngle * 10.0 + uTime * 0.5) * 0.5 + 0.5;

  // ==============================
  // COLOR PALETTE
  // We create a rich, multi-layered color scheme:
  //
  // baseColor: Deep blue-gray - provides a dark, elegant background
  // iridescentColor1: Cyan-blue range - shifts from blue to purple
  // iridescentColor2: Pink-purple range - shifts from magenta to violet
  //
  // Using HSV colors for easy hue shifting based on the iridescence value
  // ==============================
  vec3 baseColor = vec3(0.1, 0.15, 0.2);  // Dark blue-gray base
  vec3 iridescentColor1 = hsv2rgb(vec3(0.6 + iridescence * 0.3, 0.8, 0.9));  // Cyan-blue (hue 0.6-0.9)
  vec3 iridescentColor2 = hsv2rgb(vec3(0.8 + iridescence * 0.2, 0.7, 0.8));  // Pink-purple (hue 0.8-1.0)

  // ==============================
  // COLOR MIXING
  // We blend the two iridescent colors together based on:
  // 1. UV.x position (vUv.x) - varies across the length of the ribbon
  // 2. Iridescence value - varies with viewing angle
  //
  // sin(vUv.x * 3.14159) creates a wave pattern from 0 to π along the ribbon
  // This makes the colors vary along the length, not just by viewing angle
  // ==============================
  float colorMix = sin(vUv.x * 3.14159) * iridescence;
  vec3 iridescent = mix(iridescentColor1, iridescentColor2, colorMix);

  // ==============================
  // FINAL COLOR COMPOSITION
  // Layer 1: Mix baseColor and iridescent
  // - When iridescence = 0.0: 40% iridescent, 60% base (darker)
  // - When iridescence = 1.0: 70% iridescent, 30% base (brighter)
  //
  // Layer 2: Add Fresnel glow
  // - Adds a blue-white glow at the edges of the ribbon
  // - Creates the glowing rim effect
  // ==============================
  vec3 finalColor = mix(baseColor, iridescent, 0.4 + iridescence * 0.3);
  finalColor += fresnel * vec3(0.6, 0.7, 1.0);  // Add bluish-white fresnel glow

  // ==============================
  // ALPHA (TRANSPARENCY)
  // The ribbon is semi-transparent to let background show through
  // - Base opacity: 70%
  // - Edge opacity: Up to 100% (edges are more opaque due to fresnel)
  // This makes the edges stand out more while the center feels delicate
  // ==============================
  float alpha = 0.7 + fresnel * 0.3;

  // ==============================
  // OUTPUT
  // gl_FragColor is the special variable that determines the pixel's color
  // vec4(r, g, b, a) - RGB color + alpha (transparency)
  // ==============================
  gl_FragColor = vec4(finalColor, alpha);
}
