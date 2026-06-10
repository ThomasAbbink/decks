export const WhatIsAShader = () => {
  return (
    <div className="max-w-[80ch]">
      <h1>What is a shader?</h1>
      <ul>
        <li>A bit of code</li>
        <li>Position in, color out</li>
        <li>Runs once for every pixel, every frame (!)</li>
        <li>
          I am using <em>WebGL</em> and <em>GLSL</em> so the shaders can run in
          a browser on a canvas
        </li>
      </ul>
    </div>
  );
};
