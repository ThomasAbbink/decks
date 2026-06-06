import { CodeBlock } from "../../components/Codeblock";

export const ProceduralCanvas = () => {
  const code = `// p5: objects, mutable state, a draw loop
const lines = [];
for (let y = 0; y < height; y += 32) {
  lines.push(makeLine({ y }));
}

function draw() {
  background(20);
  for (const line of lines) {
    line.angle += 0.05;       // mutate every frame
    line.render();            // draw this object
  }
}`;
  return (
    <>
      <h1>The CPU / p5 mindset</h1>
      <CodeBlock>{code}</CodeBlock>
      <p className="text-foreground-secondary">
        Things you own and mutate: objects, arrays, state, a frame-by-frame
        loop.
      </p>
    </>
  );
};
