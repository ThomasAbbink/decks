import { cn } from "../util/cn";

type Props = {
  total: number;
  current: number;
};

export const Progress = ({ total, current }: Props) => {
  return (
    <div className="relative items-center">
      <div
        className="bg-accent absolute top-1/2 z-1 h-2 w-2 translate-y-[-50%] rounded-full transition-all delay-150 duration-500 ease-in"
        style={{
          transform: `translateX(${current * 24}px)`,
        }}
      ></div>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          style={{
            transform: `translateX(${index * 24}px)`,
          }}
          className={cn(
            "absolute top-1/2 h-2 w-2 translate-y-[-50%] rounded-full transition-all duration-300 ease-in-out",
            index === current
              ? "bg-accent h-4 w-4 translate-x-[-4px] delay-500"
              : "bg-foreground h-2 w-2 delay-0",
          )}
        />
      ))}
    </div>
  );
};
