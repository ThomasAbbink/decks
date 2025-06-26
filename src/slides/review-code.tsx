import { CodeBlock } from "../components/Codeblock";
import code from "../components/ReviewCode?raw";
import ProductCard from "../components/ReviewCode";
export const ReviewCode = () => {
  return (
    <div className="flex w-full gap-4 overflow-hidden p-4">
      <div className="m-auto">
        <ProductCard />
      </div>
      <div className="overflow-auto">
        <CodeBlock size="sm">{code}</CodeBlock>
      </div>
    </div>
  );
};
