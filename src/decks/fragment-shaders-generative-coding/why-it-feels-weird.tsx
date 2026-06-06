export const WhyItFeelsWeird = () => {
  return (
    <>
      <h1>Why it feels weird</h1>
      <ul>
        <li>
          <strong>No objects.</strong> You can't grab "line 7" and move it.
        </li>
        <li>
          <strong>No memory.</strong> A pixel doesn't know what it was last
          frame.
        </li>
        <li>
          <strong>Time is an input.</strong> Animation is a pure function of{" "}
          <code>u_time</code>.
        </li>
      </ul>
      <p className="text-foreground-secondary">
        Same picture, completely different mental model.
      </p>
    </>
  );
};
