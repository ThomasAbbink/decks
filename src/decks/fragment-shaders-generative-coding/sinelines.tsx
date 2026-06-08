const SKETCH_URL = "https://pataphysical.tech/sketch/sinelines";

export const Sinelines = () => {
  return (
    <div className="flex h-[calc(100vh-16rem)] items-center gap-16">
      <div className="flex h-full max-w-[55ch] flex-col justify-center">
        <h1>
          <code>sinelines</code>
        </h1>
        <p>
          A sketch I made back in 2023 after seeing a similar concept somewhere.
          Drawn with p5.js straight to a canvas — no shaders. The concept:
        </p>
        <ul>
          <li>A white rectangle, half the screen wide and 16&nbsp;px high.</li>
          <li>Flip it to the other side, offset by one "height".</li>
          <li>Alternate until the screen is filled.</li>
          <li>Offset the width by a sine of the frame count.</li>
        </ul>
        <p className="text-foreground-secondary">
          A few more variables nudge the offset over time — but that's it.
        </p>
      </div>
      <iframe
        title="sinelines (p5.js)"
        className="not-prose bg-background-secondary h-full flex-1 rounded-xl shadow-[0_0_100px_rgba(255,255,255,0.1),20px_20px_10px_rgba(0,0,0,0.4)]"
        src={SKETCH_URL}
      />
    </div>
  );
};
