// mobiusVertex.glsl
// ==============================
// VARYING VARIABLES
// ==============================
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

// ==============================
// UNIFORM VARIABLES
// ==============================
uniform float uTime;
uniform float uTwist;
uniform float uHoverScale;
uniform float uFlowIntensity;

const float PI = 3.14159265359;

// ==============================
// ROTATION MATRIX HELPER
// ==============================
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                0.0,                                0.0,                                1.0);
}

// ==============================
// MÖBIUS RIBBON TRANSFORMATION
// ==============================
// 修改：增加 out vec3 outNormal 参数，以便传出计算好的法线
void mobiusTransform(vec3 pos, vec2 uv, float t, out vec3 outPos, out vec3 outNormal) {
    float u = uv.x * 2.0 * PI;
    float v = pos.y; // Plane geometry width is usually along X or Y, assuming Y here based on original code

    float flowMultiplier = 1.0 + uFlowIntensity * 2.0;
    float timeOffset = uTime * 0.2 * flowMultiplier;
    float currentU = u + timeOffset;

    // --- LEMNISCATE CURVE ---
    float scale = 3.5 * (1.0 + uHoverScale * 0.2);
    float denom = 1.0 + sin(currentU) * sin(currentU);

    float x = scale * cos(currentU) / denom;
    float y = scale * sin(currentU) * cos(currentU) / denom;
    float z = 0.0;

    vec3 centerPos = vec3(x, y, z);

    // --- TANGENT & FRAME ---
    float delta = 0.01;
    float nextU = currentU + delta;
    float nextDenom = 1.0 + sin(nextU) * sin(nextU);
    float nextX = scale * cos(nextU) / nextDenom;
    float nextY = scale * sin(nextU) * cos(nextU) / nextDenom;

    vec3 tangent = normalize(vec3(nextX - x, nextY - y, 0.0));
    vec3 binormal = vec3(0.0, 0.0, 1.0);
    vec3 normalRef = cross(tangent, binormal); // Reference normal

    // --- TWIST ---
    float twistAngle = (u * 0.5) + (t * sin(u + uTime));
    twistAngle += sin(u * 3.0 + uTime) * 0.2 * flowMultiplier;

    mat4 rotMat = rotationMatrix(tangent, twistAngle);

    // 关键修复：计算扭曲后的法线
    vec3 twistedNormal = (rotMat * vec4(normalRef, 0.0)).xyz;

    // --- FINAL POSITION & FIXES ---
    float verticalSeparation = sin(currentU) * 0.8;
    float zWobble = sin(u * 2.0 + uTime) * 0.2;

    // 输出位置
    outPos = centerPos + (twistedNormal * v) + vec3(0.0, 0.0, verticalSeparation + zWobble);

    // 输出法线
    outNormal = twistedNormal;
}

void main() {
    vUv = uv;

    vec3 transformedPos;
    vec3 transformedNormal;

    // 调用修改后的函数，获取位置和法线
    mobiusTransform(position, uv, uTwist, transformedPos, transformedNormal);

    // 将法线变换到视图空间 (View Space) 或世界空间 (World Space)
    // 这里我们使用 normalMatrix 将法线变换到视图空间，这是 Three.js 的标准做法
    // 但由于我们在 Fragment Shader 中使用了 vWorldPosition，我们可能需要世界空间法线
    // 为了简单起见，我们假设模型没有旋转，直接使用 transformedNormal
    // 如果模型有旋转，需要乘以 modelMatrix 的逆转置矩阵

    // 简单方案：直接传递计算出的法线（假设模型本身不旋转，只在 Shader 里变形）
    vNormal = normalize(transformedNormal);

    // 传递世界坐标
    vWorldPosition = (modelMatrix * vec4(transformedPos, 1.0)).xyz;

    gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPosition, 1.0);
}