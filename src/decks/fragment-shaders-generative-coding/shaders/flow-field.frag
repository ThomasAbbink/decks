precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

// A hash: turn a 2D coordinate into a pseudo-random value in [0, 1).
float random(vec2 c) {
  return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453);
}

// Value noise: random values on an integer grid, smoothly interpolated.
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

// Fractal Brownian motion: stack several octaves of noise, each one
// twice as detailed and half as loud, for a cloudy, organic field.
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

// Jupiter palette: the banded storm tones of the gas giant — pale cream,
// tan, ochre, burnt orange and the deep rust of the Great Red Spot. Maps a
// scalar t to a colour by walking a ramp of stops and looping back around.
vec3 palette(float t) {
  t = fract(t);

  vec3 c0 = vec3(0.97, 0.91, 0.78); // pale cream band
  vec3 c1 = vec3(0.86, 0.71, 0.49); // sandy tan
  vec3 c2 = vec3(0.78, 0.46, 0.22); // ochre / burnt orange
  vec3 c3 = vec3(0.55, 0.22, 0.12); // deep rust
  vec3 c4 = vec3(0.90, 0.80, 0.68); // shadowed brown-red
  vec3 c5 = vec3(0.72, 0.34, 0.20); // Great Red Spot warm

  // Six evenly spaced stops, wrapping c5 -> c0 for a seamless loop.
  if (t < 0.2)      return mix(c0, c1, smoothstep(0.0, 0.2, t));
  else if (t < 0.4) return mix(c1, c2, smoothstep(0.2, 0.4, t));
  else if (t < 0.6) return mix(c2, c3, smoothstep(0.4, 0.6, t));
  else if (t < 0.8) return mix(c3, c4, smoothstep(0.6, 0.8, t));
  else              return mix(c4, c5, smoothstep(0.8, 1.0, t));
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  // Keep the field from stretching on non-square screens.
  st.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.02;

  // Domain warping: feed fbm into itself so the field swirls and folds
  // like a flowing current instead of drifting in a straight line.
  vec2 q = vec2(
    fbm(st * 3.0 + vec2(0.0, t)),
    fbm(st * 3.0 + vec2(5.2, 1.3) - t)
  );

  vec2 r = vec2(
    fbm(st * 3.0 + 4.0 * q + vec2(1.7, 9.2) + t * 0.5),
    fbm(st * 3.0 + 4.0 * q + vec2(8.3, 2.8) - t * 0.5)
  );

  float f = fbm(st * 3.0 + 4.0 * r);

  // One more fbm pass over the warped field: feeds the flow back through
  // noise so the ridges grow extra cloudy, fibrous detail.
  f = fbm(vec2(f * 2.0 + t, length(r) * 2.0));

  // And another pass, scrolling the other way for finer, layered texture.
  f = fbm(vec2(f * 2.0 - t, length(q) * 2.0));

  // Drive the palette with the warped field plus the warp vectors so the
  // colours surge and braid along the flow.
  float pal = f + length(r) * 0.5 + t * 0.08;

  // Posterize the palette coordinate into discrete steps so colours read as
  // distinct bands. Mixing mostly toward the stepped value (with a sliver of
  // the smooth one) keeps crisp edges without full-on hard aliasing.
  float bands = 6.0;
  float stepped = floor(pal * bands) / bands;
  pal = mix(pal, stepped, 0.85);

  vec3 color = palette(pal);

  // Sink the troughs into darkness so the vibrant colour lives on the
  // ridges of the flow instead of flooding the whole frame. `shade` is a
  // contrasty mask: ~0 in the valleys, ~1 on the crests.
  float shade = smoothstep(0.25, 0.75, f);
  color *= shade;
  // A faint cool tint keeps the dark areas from going pure black.
  color += vec3(0.02, 0.03, 0.06) * (1.0 - shade);

  // Brighten the ridges of the flow for extra punch.
  color = mix(color, vec3(1.0), pow(f, 3.0) * 0.4);

  gl_FragColor = vec4(color, 1.0);
}
