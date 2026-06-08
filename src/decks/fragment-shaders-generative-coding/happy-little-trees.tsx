const TREE_SKETCH_URL = "https://pataphysical.tech/sketch/fractalTree";

export const HappyLittleTrees = () => {
  // Escape the prose/padding of the slide wrapper and fill the whole screen.
  // (The active slide container has a transform, so `fixed` resolves against
  // it; we size to the viewport and center on the container.)
  return (
    <div className="fixed top-1/2 left-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2">
      <iframe
        title="Generative fractal tree"
        className="not-prose h-full w-full border-0"
        src={TREE_SKETCH_URL}
      />
    </div>
  );
};
