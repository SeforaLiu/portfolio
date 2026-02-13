varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform float uTime;
uniform float uTwist;
uniform float uHoverScale;
uniform float uFlowIntensity;
uniform float uRailOffset;

const float PI = 3.14159265359;

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

void mobiusTransform(vec3 pos, vec2 uv, float t, out vec3 outPos, out vec3 outNormal) {
    float u = uv.x * 2.0 * PI;
    float v = pos.y;

    // 直接使用 JS 计算好的累加偏移量
    // uRailOffset 已经在 JS 里包含了速度变化的积分
    float currentU = u + uRailOffset;

    // flowMultiplier 仅用于形状变形的强度，不用于位置计算
    float flowMultiplier = 1.0 + uFlowIntensity * 2.0;

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
    vec3 normalRef = cross(tangent, binormal);

    // 这里依然可以使用 uTime，因为它是正弦波的相位，不会造成无限累积的位移
    float twistAngle = (u * 0.5) + (t * sin(u + uTime));
    twistAngle += sin(u * 3.0 + uTime) * 0.2 * flowMultiplier;

    mat4 rotMat = rotationMatrix(tangent, twistAngle);
    vec3 twistedNormal = (rotMat * vec4(normalRef, 0.0)).xyz;

    // --- FINAL POSITION ---
    float verticalSeparation = sin(currentU) * 0.8;
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