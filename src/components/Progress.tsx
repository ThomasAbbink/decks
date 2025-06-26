import { cn } from "../util/cn";

type Props = {
  total: number;
  current: number;
};

export const Progress = ({ total, current }: Props) => {
  return (
    <div className="relative items-center">
      <div
        className="bg-accent absolute top-1/2 z-1 h-2 w-2 translate-y-[-50%] rounded-full transition-all delay-150 duration-150 ease-in-out"
        style={{
          transform: `translateX(${current * 16}px)`,
        }}
      ></div>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          style={{
            transform: `translateX(${index * 16}px)`,
          }}
          className={cn(
            "absolute top-1/2 h-2 w-2 translate-y-[-50%] rounded-full transition-all duration-300",
            index === current
              ? "bg-accent h-4 w-4 translate-x-[-4px] delay-150"
              : "bg-foreground h-2 w-2 delay-0",
          )}
        />
      ))}
    </div>
  );
};
