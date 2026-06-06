import { CodeBlock } from "../../components/Codeblock";
import code from "./ProductCard?raw";
import ProductCard from "./ProductCard";

export const ReviewCode = () => {
  return (
    <div className="flex w-full gap-4 overflow-visible p-4">
      <div className="m-auto">
        <ProductCard />
      </div>
      <div className="overflow-auto">
        <CodeBlock size="sm">{code}</CodeBlock>
      </div>
    </div>
  );
};
