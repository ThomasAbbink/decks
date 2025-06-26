import type { PropsWithChildren } from "react";

export const Slide = ({ children }: PropsWithChildren) => {
  return (
    <article className="prose-invert prose-lg prose max-w-screen">
      {children}
    </article>
  );
};
