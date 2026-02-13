varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform float uTime;
uniform vec2 uResolution;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec3 getPastelDreamColor(float t) {
    t = fract(t);

    // --- 1. 颜色定义 ---
    vec3 c_darkOrange  = vec3(0.83, 0.17, 0.0);
    vec3 c_orange      = vec3(0.93, 0.46, 0.15);
    vec3 c_lightOrange = vec3(0.99, 0.59, 0.33);

    vec3 c_white       = vec3(0.95, 0.95, 0.98);

    vec3 c_lightPink   = vec3(0.81, 0.38, 0.63);
    vec3 c_dustyPink   = vec3(0.70, 0.33, 0.55);
    vec3 c_darkPink    = vec3(0.63, 0.01, 0.38);

    // --- 2. 分段逻辑 ---
    float segment = t * 7.0;
    float index = floor(segment);
    float f = fract(segment);

    // --- 3. 过渡逻辑 ---
    float smoothF = smoothstep(0.0, 1.0, f);

    if(index == 0.0) return mix(c_darkOrange, c_orange, smoothF);
    if(index == 1.0) return mix(c_orange, c_lightOrange, smoothF);
    if(index == 2.0) return mix(c_lightOrange, c_white, pow(f, 3.0));
    if(index == 3.0) return mix(c_white, c_lightPink, pow(f, 0.3));
    if(index == 4.0) return mix(c_lightPink, c_dustyPink, smoothF);
    if(index == 5.0) return mix(c_dustyPink, c_darkPink, smoothF);

    return mix(c_darkPink, c_darkOrange, smoothF);
}

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);

    // 使用 abs 确保 Mobius 带的双面都能正确计算光照
    float viewDot = abs(dot(normal, viewDir));

    // 菲涅尔强度
    float fresnel = pow(1.0 - viewDot, 3.0);
    fresnel = smoothstep(0.0, 1.0, fresnel);

    // 虹彩
    float iridAngle = viewDot * 4.0 + uTime * 0.5;
    float iridescence = sin(iridAngle) * 0.5 + 0.5;

    // 计算颜色
    float t = vUv.x * 1.0 + uTime * 0.08 + iridescence * 0.02;
    vec3 baseColor = getPastelDreamColor(t);

    // 合成
    vec3 finalColor = baseColor;

    // 边缘光
    vec3 rimColor = vec3(1.0, 0.9, 0.8);
    finalColor += fresnel * rimColor * 0.4;

    // 抖动 (Dithering) - 防止色带
    float noise = random(gl_FragCoord.xy);
    finalColor += (noise - 0.5) / 128.0;

    // 只有完全不透明，深度缓冲(Depth Buffer)才能正确工作，
    // 确保前面的几何体完全遮挡后面的几何体，消除重叠处的白色混合瑕疵。
    float alpha = 1.0;

    gl_FragColor = vec4(finalColor, alpha);
}