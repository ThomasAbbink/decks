import { CodeBlock } from "../components/Codeblock";

export const HtmlStructuurEnSemantiek = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1>HTML structuur en semantiek</h1>

      <CodeBlock isGood={false}>{`
      <div>
        <div>Title</div>
        <div>Description</div>
      <div>
      `}</CodeBlock>

      <CodeBlock isGood>{`
      <hgroup>
        <h2>Title</h2>
        <p>Description</p>
      <div>
      `}</CodeBlock>
    </div>
  );
};
