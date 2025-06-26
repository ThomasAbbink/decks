import { CodeBlock } from "../components/Codeblock";

export const ContainerQueries = () => {
  const code = `
  @container (min-width: 1000px) {
    .container {
      background-color: red;
    }
  }
  `;
  return (
    <>
      <h2>Container Queries</h2>
      <p></p>
      <CodeBlock>{code}</CodeBlock>
    </>
  );
};
