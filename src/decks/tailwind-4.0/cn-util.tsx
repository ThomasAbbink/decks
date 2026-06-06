import { CodeBlock } from "../../components/Codeblock";

export const CnUtil = () => {
  const code = `
    import clsx, { type ClassValue } from "clsx";
    import { twMerge } from "tailwind-merge";

    export const cn = (...inputs: ClassValue[]) => {
      return twMerge(clsx(inputs));
    };
    `;
  return (
    <>
      <h2>CN utility</h2>
      <CodeBlock>{code}</CodeBlock>
    </>
  );
};
