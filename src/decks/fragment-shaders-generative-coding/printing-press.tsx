export const PrintingPress = () => {
  return (
    <div className="max-w-[80ch]">
      <h1>Like a printing press</h1>
      <p>
        Set the type until the page is ready (compile your shader), then print
        the whole page at once. Some setup, some restrictions — but far faster
        than writing out every book by hand.
      </p>
      <p>
        The GPU pulls this off with a <em>lot</em> of tiny microprocessors. Each
        one is slower than a CPU core, but they come with fun tricks: hardware
        acceleration for common operations, built into GLSL like{" "}
        <code>sin()</code>, <code>sqrt()</code> and <code>floor()</code>.
      </p>
    </div>
  );
};
