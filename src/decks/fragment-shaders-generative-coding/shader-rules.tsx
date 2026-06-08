export const ShaderRules = () => {
  return (
    <div className="max-w-[80ch]">
      <h1>The rules of the game</h1>
      <p>Every run of your shader must be independent of all the others:</p>
      <ul>
        <li>You can't check the result of another pixel.</li>
        <li>You can't modify the input data.</li>
        <li>You can't pass an outcome to another run.</li>
      </ul>
      <p>
        You get a position and return a color. <strong>That's it.</strong>
      </p>
    </div>
  );
};
