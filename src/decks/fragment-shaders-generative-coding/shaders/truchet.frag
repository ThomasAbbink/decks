precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

float random(vec2 c) {
  return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  float aspect = u_resolution.x / u_resolution.y;
  float scale = 8.0;
  vec2 grid = st * scale;
  vec2 cell = floor(grid);
  vec2 f = fract(grid);

  // --- Wave flip animation ---
  // Cycles through 6 sweep directions matching the original p5 sketch:
  // left→right, top→bottom, diagonal TL→BR, right→left, bottom→top, diagonal BR→TL
  float epochDuration = 5.0;
  float sweepFraction = 0.55;
  float epoch = floor(u_time / epochDuration);
  float epochT = fract(u_time / epochDuration);
  float waveProgress = clamp(epochT / sweepFraction, 0.0, 1.0);
  float waveStrip    = epochT / sweepFraction; // unclamped — drifts off-screen during pause

  float maxX = scale * aspect;
  float maxY = scale;
  float pat = mod(epoch, 6.0);

  // Per-cell position (discrete) drives the flip logic.
  // Continuous screen position (same formula, no floor) drives the wiper strip.
  float wavePos;
  float contWavePos;
  if (pat < 1.0) {
    wavePos     = cell.x / maxX;
    contWavePos = st.x / aspect;
  } else if (pat < 2.0) {
    wavePos     = cell.y / maxY;
    contWavePos = st.y;
  } else if (pat < 3.0) {
    wavePos     = (cell.x + cell.y) / (maxX + maxY);
    contWavePos = (st.x + st.y) / (aspect + 1.0);
  } else if (pat < 4.0) {
    wavePos     = (maxX - cell.x) / maxX;
    contWavePos = 1.0 - st.x / aspect;
  } else if (pat < 5.0) {
    wavePos     = (maxY - cell.y) / maxY;
    contWavePos = 1.0 - st.y;
  } else {
    wavePos     = (maxX - cell.x + maxY - cell.y) / (maxX + maxY);
    contWavePos = 1.0 - (st.x + st.y) / (aspect + 1.0);
  }

  // Each epoch sweeps all tiles once; alternating epochs flip and un-flip,
  // so the base state is preserved across full cycle pairs.
  float baseOrient = step(0.5, random(cell));
  float flipped = step(wavePos, waveProgress);
  float orientation = mod(baseOrient + mod(epoch, 2.0) + flipped, 2.0);

  vec2 fp = f;
  if (orientation > 0.5) fp.x = 1.0 - fp.x;

  // --- 4 concentric arcs, breathing ---
  // Original uses offsets [-40, -20, +20, +40] * sizeMultiplier (oscillates 0→2).
  // Normalised to tile coords: spread of 0 (all arcs at r=0.5) → 0.2 (arcs at 0.1, 0.3, 0.7, 0.9).
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

  // Original colours: bg rgb(33,33,40), lines rgb(130,150,200)
  vec3 bg = vec3(0.129, 0.129, 0.157);
  vec3 fg = vec3(0.510, 0.588, 0.784);
  vec3 color = mix(bg, fg, mask);

  // Wiper strip — a soft bright band that follows the wave front in continuous
  // screen space. Wide enough (~1.3 tiles) to fully cover each tile at the
  // moment it flips, hiding the instantaneous orientation change.
  float stripWidth = 0.33;
  float stripMask  = smoothstep(stripWidth, 0.0, abs(contWavePos - waveStrip));
  vec3  stripColor = vec3(0.0, 0.0, 0.0);
  color = mix(color, stripColor, stripMask);

  gl_FragColor = vec4(color, 1.0);
}
