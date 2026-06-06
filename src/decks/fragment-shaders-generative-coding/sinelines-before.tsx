import { CodeBlock } from "../../components/Codeblock";

export const SinelinesBefore = () => {
  const code = `const lines = [];
for (let i = 0; i < height; i += LINE_HEIGHT * 2) {
  lines.push(line(p5)({ y: i, isLeft: true }));
  lines.push(line(p5)({ y: i, isLeft: false }));
}

// each frame, mutate every line's angle
draw = () => {
  background(bg);
  lines.forEach((l) => l.draw({ angleIncrement, maxGrowth }));
};

// per line
angle += ownAngle + angleIncrement;
let width = abs(sin(angle)) * maxGrowth + minWidth;`;
  return (
    <>
      <h1>
        <code>sinelines</code> — before (p5)
      </h1>
      <CodeBlock size="sm">{code}</CodeBlock>
      <p className="text-foreground-secondary">
        An array of line objects. Each one stores an <code>angle</code> that we
        nudge every frame.
      </p>
    </>
  );
};
