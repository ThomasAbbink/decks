export const WhatIsAShader = () => {
  return (
    <div className="max-w-[80ch]">
      <h1>What is a shader?</h1>
      <p>
        A shader is a program — a bit of code that runs once for every pixel on
        your screen. It gets the position it is in and produces a color.
      </p>
      <p>
        Your GPU runs it in parallel a <em>bunch</em> of times. My laptop has a
        resolution of 3024 × 1964 — almost 6 million pixels.
      </p>
      <div className="not-prose mt-8 space-x-2">
        <span className="text-accent text-2xl font-bold tabular-nums">
          350,000,000+
        </span>
        <span className="text-foreground-secondary text-xl">
          shader runs every second at 60 fps
        </span>
      </div>
    </div>
  );
};
