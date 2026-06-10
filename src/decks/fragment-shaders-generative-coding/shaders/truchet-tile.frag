precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_orientation;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  float aspect = u_resolution.x / u_resolution.y;
  float scale = 1.0;
  vec2 grid = st * scale;
  vec2 cell = floor(grid);
  vec2 f = fract(grid);

  // Same wave flip animation as truchet.frag, one tile only.
  float epochDuration = 5.0;
  float sweepFraction = 0.55;
  float epoch = floor(u_time / epochDuration);
  float epochT = fract(u_time / epochDuration);
  float waveProgress = clamp(epochT / sweepFraction, 0.0, 1.0);

  float maxX = scale * aspect;
  float maxY = scale;
  float pat = mod(epoch, 6.0);

  float wavePos;
  if (pat < 1.0) {
    wavePos = cell.x / maxX;
  } else if (pat < 2.0) {
    wavePos = cell.y / maxY;
  } else if (pat < 3.0) {
    wavePos = (cell.x + cell.y) / (maxX + maxY);
  } else if (pat < 4.0) {
    wavePos = (maxX - cell.x) / maxX;
  } else if (pat < 5.0) {
    wavePos = (maxY - cell.y) / maxY;
  } else {
    wavePos = (maxX - cell.x + maxY - cell.y) / (maxX + maxY);
  }

  float baseOrient = u_orientation;
  float flipped = step(wavePos, waveProgress);
  float orientation = mod(baseOrient + mod(epoch, 2.0) + flipped, 2.0);

  vec2 fp = f;
  if (orientation > 0.5) fp.x = 1.0 - fp.x;

  float breathe = sin(u_time * 0.6) * 0.5 + 0.5;
  float spread = mix(0.01, 0.2, breathe);

  float r1 = 0.5 - spread * 2.0;
  float r2 = 0.5 - spread;
  float r3 = 0.5 + spread;
  float r4 = 0.5 + spread * 2.0;

  float d1 = distance(fp, vec2(0.0));
  float d2 = distance(fp, vec2(1.0));

  float lw = 0.018;
  float mask = 0.0;
  mask = max(mask, smoothstep(lw, 0.0, abs(d1 - r1)));
  mask = max(mask, smoothstep(lw, 0.0, abs(d1 - r2)));
  mask = max(mask, smoothstep(lw, 0.0, abs(d1 - r3)));
  mask = max(mask, smoothstep(lw, 0.0, abs(d1 - r4)));
  mask = max(mask, smoothstep(lw, 0.0, abs(d2 - r1)));
  mask = max(mask, smoothstep(lw, 0.0, abs(d2 - r2)));
  mask = max(mask, smoothstep(lw, 0.0, abs(d2 - r3)));
  mask = max(mask, smoothstep(lw, 0.0, abs(d2 - r4)));

  vec3 bg = vec3(0.129, 0.129, 0.157);
  vec3 fg = vec3(0.510, 0.588, 0.784);
  vec3 color = mix(bg, fg, mask);

  gl_FragColor = vec4(color, 1.0);
}
