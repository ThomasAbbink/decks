import { CodeBlock } from "../../components/Codeblock";

export const PixelQuestion = () => {
  const code = `// shader: no objects, no loop you write
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  // I am one pixel at st.xy.
  // What color am I?
  gl_FragColor = vec4(st.x, st.y, 0.5, 1.0);
}`;
  return (
    <>
      <h1>The pixel question</h1>
      <p>
        No array of lines. No draw loop you write. Just one function, answered
        in parallel for every pixel.
      </p>
      <CodeBlock>{code}</CodeBlock>
      <p className="text-foreground-secondary">
        <code>st.xy</code> → <code>color</code>. That's the whole job.
      </p>
    </>
  );
};
