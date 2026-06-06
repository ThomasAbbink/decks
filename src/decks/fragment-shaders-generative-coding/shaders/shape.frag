precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  // Normalized coordinates, aspect-corrected so the circle stays round.
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;
  vec2 center = vec2(0.5 * u_resolution.x / u_resolution.y, 0.5);

  // "I live at st.xy. How far am I from the center?"
  float d = distance(st, center);
  float radius = 0.25 + 0.02 * sin(u_time * 2.0);
  float mask = smoothstep(radius, radius - 0.01, d);

  vec3 bg = vec3(0.11, 0.10, 0.16);
  vec3 fg = vec3(0.96, 0.78, 0.42);
  gl_FragColor = vec4(mix(bg, fg, mask), 1.0);
}
