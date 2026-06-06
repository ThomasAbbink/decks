precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float y = 1.0 - st.y; // row 0 at the top

  // floor(pixelY / rowHeight) instead of an array of line objects.
  float rows = 26.0;
  float rowF = y * rows;
  float row = floor(rowF);
  float within = fract(rowF);
  float t = row / rows;

  // phase = initialPhaseFromY + time * rowSpeed, instead of mutable angle.
  float phase0 = mix(6.2831, 0.0, t);
  float ownAngle = mix(-0.6, 0.6, t);
  float phase = phase0 + u_time * (0.6 + ownAngle * 0.5);

  // width = abs(sin(phase)) * maxGrowth + minWidth
  float minWidth = 0.5;
  float maxGrowth = 0.22;
  float barWidth = abs(sin(phase)) * maxGrowth + minWidth;

  // Interval masks decide if this pixel is inside the left or right bar.
  float aa = 1.5 / u_resolution.y;
  float leftMask = smoothstep(barWidth + aa, barWidth - aa, st.x);
  float rightMask = smoothstep(1.0 - barWidth - aa, 1.0 - barWidth + aa, st.x);
  float mask = mix(leftMask, rightMask, step(0.5, within));

  vec3 bg = vec3(0.10, 0.09, 0.15);
  float b = mix(1.0, 0.78, t);
  vec3 bar = vec3(0.90, 0.86, b);
  gl_FragColor = vec4(mix(bg, bar, mask), 1.0);
}
