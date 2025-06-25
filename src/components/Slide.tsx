import type { PropsWithChildren } from "react";

export const Slide = ({ children }: PropsWithChildren) => {
  return <article className="prose-invert prose-2xl prose">{children}</article>;
};
