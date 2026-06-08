precision mediump float;

uniform vec2 u_resolution;

void main() {
  // normalize the pixel coordinates to be between 0 and 1, independent of the resolution.
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  vec3 backgroundColor = vec3(0.10, 0.09, 0.15);
  vec3 foregroundColor = vec3(0.90, 0.86, 0.95);

  // I am one pixel at st.xy. Am I inside the rectangle?
  bool inside = st.x > 0.0 && st.x < 0.5 &&
                st.y > 0.45 && st.y < 0.55;

  // instead of returning a value the output need to be set on the gl_FragColor variable.
  gl_FragColor = inside ? vec4(foregroundColor, 1.0) : vec4(backgroundColor, 1.0);
}
