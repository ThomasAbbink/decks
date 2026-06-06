import { CodeBlock } from "../../components/Codeblock";

export const ContainerQueries = () => {
  const code = `
    <div class="@container">
      <div class="grid grid-cols-1 @sm:grid-cols-3 @lg:grid-cols-4">
        <!-- ... -->
      </div>
    </div>
  `;
  return (
    <>
      <h2>Container Queries</h2>
      <CodeBlock>{code}</CodeBlock>
    </>
  );
};
