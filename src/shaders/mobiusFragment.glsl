varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;

uniform float uTime;
uniform vec2 uResolution;

// Convert HSV to RGB
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  // Calculate view direction
  vec3 viewDir = normalize(-vWorldPosition);

  // Calculate approximate normal
  vec3 normal = normalize(cross(
    dFdx(vWorldPosition),
    dFdy(vWorldPosition)
  ));

  // Fresnel effect
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

  // Iridescence
  float viewAngle = dot(normal, viewDir);
  float iridescence = sin(viewAngle * 10.0 + uTime * 0.5) * 0.5 + 0.5;

  // Create iridescent colors
  vec3 baseColor = vec3(0.1, 0.15, 0.2);
  vec3 iridescentColor1 = hsv2rgb(vec3(0.6 + iridescence * 0.3, 0.8, 0.9));
  vec3 iridescentColor2 = hsv2rgb(vec3(0.8 + iridescence * 0.2, 0.7, 0.8));

  // Mix colors
  float colorMix = sin(vUv.x * 3.14159) * iridescence;
  vec3 iridescent = mix(iridescentColor1, iridescentColor2, colorMix);

  // Combine colors
  vec3 finalColor = mix(baseColor, iridescent, 0.4 + iridescence * 0.3);
  finalColor += fresnel * vec3(0.6, 0.7, 1.0);

  float alpha = 0.7 + fresnel * 0.3;

  gl_FragColor = vec4(finalColor, alpha);
}
