export const CommonPitfalls = () => {
  return (
    <>
      <h2>Veelvoorkomende issues</h2>
      <ul>
        <li>Kapotte of nietsdoende classes</li>
        <li>
          Magic numbers. Kunnen deze niet expliciet gemaakt worden? Bijvoorbeeld
          <br />
          <code>px-[calc(--spacing(4)-1px)]</code> in plaats van{" "}
          <code>px-[15px]</code>
        </li>
        <li>
          Waardes in <code>px</code>. Bijna nooit goed.
        </li>
        <li>Margins op kinderen van een container.</li>
        <li>
          Varianten zonder <code>twMerge</code> en <code>clsx</code>
        </li>
      </ul>
    </>
  );
};
