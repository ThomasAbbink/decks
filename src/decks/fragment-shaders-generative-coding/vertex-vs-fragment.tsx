const Step = ({ label, highlight }: { label: string; highlight?: boolean }) => (
  <div
    className={
      "not-prose rounded-lg border px-4 py-3 text-center text-lg " +
      (highlight
        ? "border-accent text-accent font-bold"
        : "border-foreground/30 text-foreground-secondary")
    }
  >
    {label}
  </div>
);

const Arrow = () => <span className="text-foreground/40 text-2xl">→</span>;

export const VertexVsFragment = () => {
  return (
    <>
      <h1>Vertex vs fragment</h1>
      <div className="not-prose my-8 flex flex-wrap items-center gap-3">
        <Step label="Vertices" />
        <Arrow />
        <Step label="Vertex shader" />
        <Arrow />
        <Step label="Rasterizer" />
        <Arrow />
        <Step label="Fragments" />
        <Arrow />
        <Step label="Fragment shader" highlight />
        <Arrow />
        <Step label="Pixels" />
      </div>
      <ul>
        <li>
          <strong>Vertex shader</strong>: decides where geometry goes on screen.
        </li>
        <li>
          <strong>Fragment shader</strong>: decides the color for a position on
          screen.
        </li>
      </ul>
    </>
  );
};
