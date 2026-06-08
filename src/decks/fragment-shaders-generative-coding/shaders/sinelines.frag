precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  // normalize the pixel coordinates to be between 0 and 1, independent of the resolution.
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  vec3 backgroundColor = vec3(0.10, 0.09, 0.15);
  vec3 foregroundColor = vec3(0.90, 0.86, 0.95);

  // Repeat: divide the height into rows. fract() gives every row the same 0..1
  // range, floor() tells us which row this pixel is in.
  float rows = 16.0;
  float row = floor(st.y * rows);
  float withinRow = fract(st.y * rows);

  // Give every row its own offset so the bars don't all move in lockstep.
  float offset = row * 0.4;

  // sin() turns the ever-growing u_time into a width that swings between 0.25 and 0.75.
  float width = 0.5 + 0.25 * sin(u_time + offset);

  // Alternate: even rows grow from the left, odd rows from the right.
  bool growFromLeft = mod(row, 2.0) == 0.0;
  float x = growFromLeft ? st.x : 1.0 - st.x;

  // I am one pixel at st.xy. Am I inside this row's bar?
  bool inside = x < width && withinRow > 0.15 && withinRow < 0.85;

  // instead of returning a value the output need to be set on the gl_FragColor variable.
  gl_FragColor = inside ? vec4(foregroundColor, 1.0) : vec4(backgroundColor, 1.0);
}
