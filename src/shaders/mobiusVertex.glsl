varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform float uTime;
uniform float uTwist;
uniform float uHoverScale;
uniform float uFlowIntensity;
uniform float uRailOffset;
uniform float uIsMobile;

const float PI = 3.14159265359;

// 旋转矩阵辅助函数
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return mat4(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s, 0.0,
    oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.0,
    oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c, 0.0,
    0.0, 0.0, 0.0, 1.0);
}

// --- 核心修复：提取曲线位置计算函数 ---
// 这样确保 currentPos 和 nextPos 都应用了相同的 Mobile 旋转逻辑
vec3 getLemniscatePoint(float angle) {
    // 基础缩放
    float scale = 3.5 * (1.0 + uHoverScale * 0.2);

    float denom = 1.0 + sin(angle) * sin(angle);
    float x = scale * cos(angle) / denom;
    float y = scale * sin(angle) * cos(angle) / denom;
    float z = 0.0;

    // Mobile 旋转逻辑 (在这里统一处理)
    // 旋转 90 度变成 "8" 字形
    if (uIsMobile > 0.5) {
        float temp = x;
        x = y;
        y = -temp;
    }

    return vec3(x, y, z);
}

void mobiusTransform(vec3 pos, vec2 uv, float t, out vec3 outPos, out vec3 outNormal) {
    float u = uv.x * 2.0 * PI;
    float v = pos.y; // Ribbon 的宽度方向 (-0.5 到 0.5)

    // 沿轨道的当前角度 (包含 JS 传入的积分偏移)
    float currentU = u + uRailOffset;
    float flowMultiplier = 1.0 + uFlowIntensity * 2.0;

    // 1. 计算中心路径点 (应用了 Mobile 旋转)
    vec3 centerPos = getLemniscatePoint(currentU);

    // 2. 计算下一个点用于切线 (同样应用 Mobile 旋转)
    float delta = 0.01;
    vec3 nextPos = getLemniscatePoint(currentU + delta);

    // 3. 计算正确的切线
    vec3 tangent = normalize(nextPos - centerPos);
    vec3 binormal = vec3(0.0, 0.0, 1.0);
    vec3 normalRef = cross(tangent, binormal);

    // 4. 计算扭曲 (Twist)
    // 确保首尾相接平滑: u=0 和 u=2PI 时，sin(u) 为 0，twistAngle 差值为 2PI (视觉上旋转一圈等于没转)
    float twistAngle = u + (t * sin(u + uTime));
    twistAngle += sin(u * 3.0 + uTime) * 0.2 * flowMultiplier;

    // 5. 应用扭曲旋转
    mat4 rotMat = rotationMatrix(tangent, twistAngle);
    vec3 twistedNormal = (rotMat * vec4(normalRef, 0.0)).xyz;

    // 6. 计算最终位置
    // 垂直分离 (Vertical Separation) 增加立体感
    float verticalSeparation = sin(currentU) * 0.8;

    // Z轴摆动 (Wobble) - 使用原始 u 保证首尾闭合
    float zWobble = sin(u * 2.0 + uTime) * 0.2;

    outPos = centerPos + (twistedNormal * v) + vec3(0.0, 0.0, verticalSeparation + zWobble);
    outNormal = twistedNormal;
}

void main() {
    vUv = uv;
    vec3 transformedPos;
    vec3 transformedNormal;

    mobiusTransform(position, uv, uTwist, transformedPos, transformedNormal);

    vNormal = normalize(transformedNormal);
    vWorldPosition = (modelMatrix * vec4(transformedPos, 1.0)).xyz;

    gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPosition, 1.0);
}