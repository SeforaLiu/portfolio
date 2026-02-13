// mobiusFragment.glsl
// ==============================
// VARYING VARIABLES
// ==============================
varying vec2 vUv;
varying vec3 vNormal; // 接收来自 Vertex Shader 的平滑法线
varying vec3 vWorldPosition;

// ==============================
// UNIFORM VARIABLES
// ==============================
uniform float uTime;
uniform vec2 uResolution;

// ==============================
// UTILS: HSV TO RGB
// ==============================
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// ==============================
// UTILS: DITHERING
// ==============================
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // ==============================
    // NORMALS (FIXED)
    // ==============================
    // 修复：不再使用 dFdx/dFdy (这会导致平坦着色/螺纹感)
    // 而是使用插值后的平滑法线
    vec3 normal = normalize(vNormal);

    // 简单的视线方向 (假设物体在中心，或者你可以传入 cameraPosition)
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);

    // ==============================
    // FRESNEL & IRIDESCENCE
    // ==============================
    float viewDot = abs(dot(normal, viewDir));

    // Fresnel
    float fresnel = pow(1.0 - viewDot, 3.0);
    fresnel = smoothstep(0.0, 1.0, fresnel);

    // Iridescence
    // 降低频率，避免高频条纹
    float iridAngle = viewDot * 4.0 + uTime * 0.5;
    float iridescence = sin(iridAngle) * 0.5 + 0.5;
    iridescence = smoothstep(0.1, 0.9, iridescence);

    // ==============================
    // COLORS
    // ==============================
    vec3 baseColor = vec3(0.1, 0.15, 0.25);

    vec3 color1 = hsv2rgb(vec3(0.6 + iridescence * 0.15, 0.7, 0.9));
    vec3 color2 = hsv2rgb(vec3(0.85 + iridescence * 0.1, 0.6, 0.9));

    float colorMix = sin(vUv.x * 6.28 + uTime * 0.5) * 0.5 + 0.5;
    colorMix = smoothstep(0.2, 0.8, colorMix);

    vec3 iridescent = mix(color1, color2, colorMix);

    // ==============================
    // FINAL COMPOSITION
    // ==============================
    vec3 finalColor = mix(baseColor, iridescent, 0.5 + iridescence * 0.3);

    // Rim light
    finalColor += fresnel * vec3(0.7, 0.8, 1.0) * 0.6;

    // ==============================
    // DITHERING
    // ==============================
    float noise = random(gl_FragCoord.xy);
    finalColor += (noise - 0.5) / 128.0;

    float alpha = 0.6 + fresnel * 0.4;

    gl_FragColor = vec4(finalColor, alpha);
}