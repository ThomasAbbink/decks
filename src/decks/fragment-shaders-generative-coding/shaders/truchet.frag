precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

float random(vec2 c) {
  return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  float scale = 9.0;
  vec2 grid = st * scale;
  vec2 cell = floor(grid);
  vec2 f = fract(grid);

  // One rule, two orientations: flip half of the tiles.
  float r = random(cell);
  if (r < 0.5) f.x = 1.0 - f.x;

  // Two quarter arcs joining opposite corners of the tile.
  float d1 = distance(f, vec2(0.0, 0.0));
  float d2 = distance(f, vec2(1.0, 1.0));
  float line = min(abs(d1 - 0.5), abs(d2 - 0.5));

  float width = 0.09 + 0.04 * sin(u_time + r * 6.2831);
  float mask = smoothstep(width, width - 0.02, line);

  vec3 bg = vec3(0.10, 0.09, 0.15);
  vec3 fg = vec3(0.96, 0.78, 0.42);
  gl_FragColor = vec4(mix(bg, fg, mask), 1.0);
}
