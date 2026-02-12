varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;

uniform float uTime;
uniform float uTwist;
uniform vec2 uResolution;
uniform float uHoverScale;
uniform float uFlowIntensity;

// Möbius ribbon transformation with figure-8 (lemniscate) shape
vec3 mobiusTransform(vec3 pos, float t) {
  float u = pos.x * 6.28318530718;  // Scale to 0-2π
  float v = pos.y * 2.0 - 1.0;      // Scale to -1 to 1

  // Wind-like floating effect - gentle sine wave motion
  float windY = sin(u * 2.0 + uTime * 0.8) * 0.15;
  float windZ = cos(u * 1.5 + uTime * 0.6) * 0.12;

  // Flow intensity increases with hover state
  float flowMultiplier = 1.0 + uFlowIntensity * 2.0;

  // Add twist based on mouse position and time with flow intensity
  float twist = t * 0.5 * sin(u + uTime * 0.3 * flowMultiplier);

  // Figure-8 (lemniscate) parameterization - FIXED to ensure proper connection
  // Using a true lemniscate of Bernoulli parameterization that loops correctly
  float scale = 3.0 * (1.0 + uHoverScale * 0.3);  // Overall size with hover scale
  float width = 0.6;   // Width of the strip

  // Apply twist to the strip
  float angle = u + twist * v;

  // True lemniscate of Bernoulli parameterization for figure-8 shape
  // This ensures the curve closes properly at 2π
  float a = scale * 0.5;  // Lemniscate parameter
  float cos2t = cos(2.0 * angle);
  float denom = 1.0 + sin(angle) * sin(angle);

  // Lemniscate base position - properly loops at u = 0 and u = 2π
  float baseX = (a * 2.0 * cos(angle)) / denom;
  float baseY = (a * sin(2.0 * angle)) / denom;

  // Add width offset perpendicular to the curve
  // Calculate the tangent direction using derivative
  float sinU = sin(angle);
  float cosU = cos(angle);
  float sin2U = sin(2.0 * angle);

  // Tangent calculation for the lemniscate curve
  float denom2 = denom * denom;
  float tanDx = -2.0 * a * sinU * (1.0 + 2.0 * sinU * sinU) / denom2;
  float tanDy = 2.0 * a * (cosU * cosU - sinU * sinU) / denom;

  // Normalize the tangent
  float len = sqrt(tanDx * tanDx + tanDy * tanDy);
  float tangentX = tanDx / len;
  float tangentY = tanDy / len;

  // Perpendicular direction (rotate 90 degrees)
  float perpX = -tangentY;
  float perpY = tangentX;

  // Apply twist offset in perpendicular direction with Möbius half-twist
  // The cos(angle/2.0) creates the half-twist characteristic of Möbius strip
  float twistOffset = width * v * cos(angle / 2.0);

  float x = baseX + perpX * twistOffset;
  float y = baseY + perpY * twistOffset + windY * flowMultiplier;
  float z = width * v * sin(angle / 2.0) + windZ * flowMultiplier;

  return vec3(x, y, z);
}

void main() {
  vUv = uv;
  vNormal = normal;
  vPosition = position;

  // Apply Möbius transformation
  vec3 transformedPos = mobiusTransform(position, uTwist);
  vWorldPosition = transformedPos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPos, 1.0);
}
