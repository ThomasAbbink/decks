export const WhatIsAShader = () => {
  return (
    <>
      <h1>What is a shader?</h1>
      <p>A small program that runs on the GPU as part of drawing graphics.</p>
      <ul>
        <li>It runs in parallel for many points at once.</li>
        <li>The same code runs everywhere; only the position changes.</li>
        <li>No loops over objects — each invocation answers one question.</li>
      </ul>
      <p className="text-foreground-secondary">
        Two kinds matter today: <strong>vertex</strong> and{" "}
        <strong>fragment</strong> shaders.
      </p>
    </>
  );
};
