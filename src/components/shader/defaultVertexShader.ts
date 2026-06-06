// Draws a single fullscreen triangle. The fragment shader does all the work.
export const defaultVertexShader = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;
