precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  // normalize the pixel coordinates to be between 0 and 1, independent of the resolution.
  vec2 coordinates = gl_FragCoord.xy / u_resolution.xy;

  vec3 backgroundColor = vec3(0.10, 0.09, 0.15);
  vec3 foregroundColor = vec3(0.90, 0.86, 0.95);

  // Repeat: divide the height into rows.
  // floor() tells us which row this pixel is in.
  float rows = 16.0;
  float row = floor(coordinates.y * rows);
  float heightWithinRow = fract(coordinates.y * rows);

  // Give every row its own offset so the bars don't all move in lockstep.
  float offset = row * 0.4;

  // sin() turns the ever-growing u_time into a width that swings between 0.25 and 0.75.
  float width = 0.5 + 0.25 * sin(u_time + offset);

  // Alternate: even rows grow from the left, odd rows from the right.
  bool growFromLeft = mod(row, 2.0) == 0.0;
  float x = growFromLeft ? coordinates.x : 1.0 - coordinates.x;

  float barPadding = 0.1;
  // Is the pixel inside the bar? 
  bool inside = x < width && heightWithinRow > barPadding && heightWithinRow < 1.0 - barPadding;

  // instead of returning a value the output need to be set on the gl_FragColor variable.
  gl_FragColor = inside ? vec4(foregroundColor, 1.0) : vec4(backgroundColor, 1.0);
}
