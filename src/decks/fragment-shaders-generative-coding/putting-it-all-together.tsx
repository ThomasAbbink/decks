import { CodeBlock } from "../../components/Codeblock";
import { ShaderCanvas } from "../../components/shader/ShaderCanvas";
import sinelinesShader from "./shaders/sinelines.frag?raw";

export const PuttingItAllTogether = () => {
  const code = `
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
  gl_FragColor = inside ? vec4(foregroundColor, 1.0) : vec4(backgroundColor, 1.0);`;
  return (
    <div className="not-prose flex w-[82vw] max-w-6xl items-center gap-8">
      <div className="flex-1">
        <h1 className="text-foreground mb-4 text-4xl font-bold">
          Putting it all together
        </h1>
        <CodeBlock size="sm">{code}</CodeBlock>
        <p className="text-foreground-secondary mt-4 text-lg">
          Repeating is surprisingly easy: divide the height, take the{" "}
          <code>fract</code>, and every row is "the rectangle" again.
        </p>
      </div>
      <ShaderCanvas
        fragmentShader={sinelinesShader}
        className="aspect-square w-[40vh] rounded-xl shadow-2xl"
      />
    </div>
  );
};
