import { CodeBlock } from "../../components/Codeblock";
import { ShaderCanvas } from "../../components/shader/ShaderCanvas";
import sinelinesShader from "./shaders/sinelines.frag?raw";

export const PuttingItAllTogether = () => {
  const code = `
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  // Repeat: divide the height into rows. fract() gives every row the same
  // 0..1 range, floor() tells us which row this pixel is in.
  float rows = 16.0;
  float row = floor(st.y * rows);
  float withinRow = fract(st.y * rows);

  // Give every row its own offset so the bars don't all move in lockstep.
  float offset = row * 0.4;
  float width = 0.5 + 0.25 * sin(u_time + offset);

  // Alternate: even rows grow from the left, odd rows from the right.
  bool growFromLeft = mod(row, 2.0) == 0.0;
  float x = growFromLeft ? st.x : 1.0 - st.x;

  bool inside = x < width && withinRow > 0.15 && withinRow < 0.85;
  gl_FragColor = inside ? vec4(foregroundColor, 1.0)
                        : vec4(backgroundColor, 1.0);`;
  return (
    <div className="not-prose flex w-[82vw] max-w-6xl items-center gap-8">
      <div className="flex-1">
        <h1 className="text-foreground mb-4 text-4xl font-bold">
          Putting it all together
        </h1>
        <CodeBlock size="sm">{code}</CodeBlock>
        <p className="text-foreground-secondary mt-4 text-lg">
          Repeating is surprisingly easy: divide the height, take the{" "}
          <code>fract</code>, and every row is "the rectangle" again. We can use
          <code>mod</code> to alternate sides and a per-row <code>offset</code>{" "}
          — that's <code>sinelines</code>.
        </p>
      </div>
      <ShaderCanvas
        fragmentShader={sinelinesShader}
        className="aspect-square w-[40vh] rounded-xl shadow-2xl"
      />
    </div>
  );
};
