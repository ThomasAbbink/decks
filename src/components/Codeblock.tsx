import { useEffect, type PropsWithChildren } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import { cn } from "../util/cn";

type Props = PropsWithChildren<{
  size?: "sm" | "md" | "lg";
  isGood?: boolean;
}>;

export const CodeBlock = ({ children, size = "md", isGood }: Props) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [children]);

  return (
    <div className="relative">
      <pre
        className={cn(
          "not-prose bg-background text-sm shadow-[0_0_100px_rgba(255,255,255,0.1),20px_20px_10px_rgba(0,0,0,0.4)]",
          size === "sm" && "text-sm",
          size === "md" && "text-md",
          size === "lg" && "text-lg",
          isGood && "border-good border",
          isGood === false && "border-bad border",
        )}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
};
