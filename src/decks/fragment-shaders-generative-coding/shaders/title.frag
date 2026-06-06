precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = st * 3.0;
  float t = u_time * 0.3;

  float v = sin(p.x + t) + sin(p.y + t) + sin(p.x + p.y + t);
  v += sin(length(p - 1.5) * 3.0 - t * 2.0);
  float n = 0.5 + 0.5 * sin(v * 1.5);

  vec3 a = vec3(0.07, 0.06, 0.12);
  vec3 b = vec3(0.45, 0.28, 0.78);
  vec3 c = vec3(0.96, 0.62, 0.30);

  vec3 color = mix(a, b, n);
  color = mix(color, c, pow(n, 3.0) * 0.6);

  gl_FragColor = vec4(color, 1.0);
}
