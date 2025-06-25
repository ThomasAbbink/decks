import { cn } from "../util/cn";

type Props = {
  total: number;
  current: number;
};

export const Progress = ({ total, current }: Props) => {
  return (
    <div className="items-center relative">
      <div
        className="w-2 h-2 z-1 absolute top-1/2 bg-accent rounded-full translate-y-[-50%] transition-all duration-150 ease-in-out delay-150"
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
            "w-2 h-2 rounded-full transition-all duration-300 absolute translate-y-[-50%] top-1/2",
            index === current
              ? "delay-150 w-4 h-4 bg-accent translate-x-[-4px]"
              : "w-2 h-2 bg-foreground delay-0 "
          )}
        />
      ))}
    </div>
  );
};
