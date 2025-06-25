import { useSlideControl } from "./util/useSlideControl";
import logo from "./assets/logo_infi.svg";
import { Progress } from "./components/Progress";
import { cn } from "./util/cn";
import { Slide } from "./components/Slide";

type Slide = {
  id: string;
  content: React.ComponentType;
};

type Props = {
  slides: Slide[];
};

export const Carousel = ({ slides }: Props) => {
  const { currentSlide, direction } = useSlideControl(slides);

  return (
    <div className="bg-background relative flex h-screen min-w-screen flex-col items-center justify-center overflow-hidden">
      <div className="fixed top-4 left-4">
        <Progress total={slides.length} current={currentSlide} />
      </div>
      {slides.map((slide, index) => {
        const Content = slide.content;
        return (
          <div
            className={cn(
              "absolute transition-all transition-discrete duration-300 ease-in-out starting:opacity-0",
              currentSlide === index
                ? "block translate-x-0 opacity-100"
                : "hidden opacity-0",
              currentSlide === index && direction === "next"
                ? "starting:translate-x-1/2"
                : "starting:-translate-x-1/2",
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
          <span className="font-bold">Tailwind 4.0</span>
        </div>
      </div>
    </div>
  );
};
