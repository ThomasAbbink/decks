precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

// A hash: turn a 2D coordinate into a pseudo-random value in [0, 1).
// The big magic numbers just scramble the input so neighbouring cells
// get unrelated values.
float random(vec2 c) {
  return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453);
}

// Value noise: random values on an integer grid, smoothly interpolated.
// This is the smooth, organic alternative to raw random() (which is harsh).
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Random value at the four corners of the cell I am in.
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  // Smoothstep curve so the interpolation has no hard edges.
  vec2 u = f * f * (3.0 - 2.0 * f);

  // Bilinear blend between the four corners.
  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

// Fractal Brownian motion: stack several octaves of noise, each one
// twice as detailed and half as loud. The result is the cloudy, "living"
// texture that makes movement feel organic instead of mechanical.
#define OCTAVES 5
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// One blob: a wobbling, fbm-driven core plus a softer glow halo.
// Returns .x = core mask, .y = glow mask so the caller decides the colours.
// `wobble` and `coreSize` are the knobs that give each blob its character.
vec2 blob(vec2 st, vec2 center, float fbmValue, float coreSize, float glowSize, float wobble) {
  // Push the center around with the noise value for a wobbly, alive feel.
  vec2 waveOffset = vec2(sin(fbmValue), cos(fbmValue)) * wobble;

  float dist = length(st - center + waveOffset);
  float size = coreSize - 0.1 * abs(sin(fbmValue));

  // Soft-edged core and a wider glow falloff.
  float core = smoothstep(size, size - 0.01, dist);
  float glow = smoothstep(glowSize, size, dist);
  return vec2(core, glow);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.1294, 0.1294, 0.1569);

  // --- Blue blob: slow, smooth, drifting. The calm one. ---
  float blueFbm = fbm(st * 5.9 + u_time * 0.05);
  vec2 blueCenter = vec2(
    0.5 + 0.3 * cos(u_time * 0.2),
    0.5 + 0.3 * sin(u_time * 0.1)
  );
  float blueGlowSize = abs(sin(u_time * 0.02)) + 0.1;
  vec2 blue = blob(st, blueCenter, blueFbm, 0.09, blueGlowSize, 0.2);

  // --- Red blob: faster, higher-frequency noise, jumpier path. The restless one. ---
  // Sampling the noise field at a different scale/offset and scrolling it
  // quicker makes the wobble nervous instead of lazy.
  float redFbm = fbm(st * 11.0 + vec2(17.3, 4.1) - u_time * 0.14);
  vec2 redCenter = vec2(
    0.5 + 0.32 * sin(u_time * 0.41),
    0.5 + 0.26 * cos(u_time * 0.33 + 1.7)
  );
  float redGlowSize = 0.16 + 0.06 * sin(u_time * 0.9);
  vec2 red = blob(st, redCenter, redFbm, 0.07, redGlowSize, 0.33);

  vec3 blueCore = vec3(0.0, 1.0, 1.0);   // Cyan
  vec3 blueGlow = vec3(0.0, 0.5, 1.0);   // Light blue
  vec3 redCore  = vec3(1.0, 0.25, 0.18); // Warm red
  vec3 redGlow  = vec3(1.0, 0.12, 0.35); // Pink-red

  // Additive compositing: where the two blobs overlap their light sums,
  // pushing the shared region toward white — they "interact".
  color += blueGlow * blue.y * 0.6;
  color += redGlow * red.y * 0.6;
  color += blueCore * blue.x;
  color += redCore * red.x;

  gl_FragColor = vec4(color, 1.0);
}
