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
      <div className="max-w-[80ch]">
        <h1>Vertex and fragment shaders</h1>
        <p>
          What I've described so far is really only one part. A WebGL shader
          program consists of two parts: a <strong>vertex</strong> and a{" "}
          <strong>fragment</strong> shader.
        </p>
      </div>
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
      <ul className="max-w-[80ch]">
        <li>
          <strong>Vertex shader</strong> — transforms the position of each
          vertex.
        </li>
        <li>
          <strong>Fragment shader</strong> — produces the color for a position
          on screen.
        </li>
      </ul>
      <p className="max-w-[80ch]">
        For my examples I just pass one triangle big enough to cover the whole
        screen, and the vertex shader mostly passes the position straight
        through. All the work happens in the fragment shader.
      </p>
    </>
  );
};
