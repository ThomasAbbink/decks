#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define POINTS 50
#define SHINE_SIZE 0.5


vec2 random2(float n) {
  return fract(sin(vec2(n, n + 1.0) * vec2(12.9898, 78.233)) * 43758.5453);
}

float random(vec2 c) {
  return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  // float INNER_EYE_SIZE = smoothstep(0.2, .3,  distance(st, vec2(0.5)) * 2.0);
  float INNER_EYE_SIZE = noise(st* sin(u_time * 0.1)) * 0.2 + 0.1;

  // Find the closest seed.
  float minDist = .3;

  for (int i = 0; i < POINTS; i++) {
    float fi = float(i);

    // Fixed home position for this seed.
    vec2 home = random2(fi * 1.61 + 0.5);

    // The noise offset is bounded by 0.3, so the actual position can never
    // be more than 0.3 away from home. Skip the expensive noise calls if
    // this seed can't possibly beat the current best.
    if (distance(st, home) > minDist + 0.3) continue;

    // FBM-driven offset: sample at a slowly drifting coordinate unique to
    // each seed so every point wanders its own organic path.
    vec2 noisePos = home * 4.0 + vec2(fi * 0.37, fi * 0.19) + u_time * 0.08;
    vec2 offset = vec2(noise(noisePos), noise(noisePos + vec2(3.7, 1.9))) * 2.0 - 1.0;

    vec2 p = clamp(home + offset * 0.3, 0.02, 0.98);

    float dist = distance(st, p);
    if (dist < minDist) minDist = dist;
  }

  float d = minDist;

  float v         = smoothstep(SHINE_SIZE, 0.0, d);
  float innerMask = smoothstep(INNER_EYE_SIZE, 0.0, d);


  vec3 shineColor = vec3(0.96, 0.94, 0.92);
  // Dark blue hole, noticeably deeper/bluer than the black background
  vec3 holeColor  = vec3(0.02, 0.04, 0.18);

  vec3 color = vec3(0.0);                     // black background
  color = mix(color, shineColor, v);          // orange glow from each seed
  color = mix(color, holeColor, innerMask);   // dark blue hole overrides center

  gl_FragColor = vec4(color, 1.0);
}
