import { useSlideControl } from "./util/useSlideControl";
import logo from "./assets/logo_infi.svg";
import { Progress } from "./components/Progress";
import { cn } from "./util/cn";
import { Slide } from "./components/Slide";
import type { Deck } from "./model/types";

type Props = {
  deck: Deck;
};

export const Carousel = ({ deck }: Props) => {
  const { slides, breakoutSlide } = deck;
  const { currentSlide, direction, showBreakout } = useSlideControl(slides);
  const BreakoutSlide = breakoutSlide;
  return (
    <div className="bg-background relative flex h-screen min-w-screen flex-col items-center justify-center overflow-hidden">
      <div className="fixed top-4 left-4">
        <Progress total={slides.length} current={currentSlide} />
      </div>
      <div
        className={cn(
          "bg-background/5 absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-all transition-discrete duration-300 ease-in-out starting:translate-y-full",
          showBreakout && "flex translate-y-0",
          !showBreakout && "hidden translate-y-full",
        )}
      >
        {BreakoutSlide && <BreakoutSlide />}
      </div>
      {slides.map((slide, index) => {
        const Content = slide;
        return (
          <div
            className={cn(
              "border-foreground absolute flex w-full items-center justify-center p-16 transition-all transition-discrete duration-300 ease-in-out starting:opacity-0",
              currentSlide === index
                ? "flex translate-x-0 opacity-100"
                : "hidden opacity-0",
              currentSlide != index &&
                direction === "next" &&
                "-translate-x-full",
              currentSlide != index &&
                direction === "previous" &&
                "translate-x-full",
              currentSlide === index && direction === "next"
                ? "starting:translate-x-full"
                : "starting:-translate-x-full",
            )}
          >
            <Slide>
              <Content />
            </Slide>
          </div>
        );
      })}
      <div className="text-foreground/50 absolute bottom-4 left-4 flex gap-2">
        <img src={logo} alt="Infi" className="w-12" />
        <div className="self-end p-0 align-text-bottom leading-none">
          <span className="">Thomas Abbink</span> -{" "}
          <span className="font-bold">{deck.title}</span>
        </div>
      </div>
    </div>
  );
};
