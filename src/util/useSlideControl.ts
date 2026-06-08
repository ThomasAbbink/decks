import { useCallback, useEffect, useState } from "react";

export const useSlideControl = (slides: React.ComponentType[]) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [showBreakout, setShowBreakout] = useState(false);

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection("next");
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide, slides]);

  const handlePrevious = useCallback(() => {
    if (currentSlide > 0) {
      setDirection("previous");
      setCurrentSlide(currentSlide - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // R400 "black screen" button sends "." — reuse it for the breakout slide.
      if (event.key === "ArrowUp" || event.key === ".") {
        return setShowBreakout(true);
      }

      if (showBreakout) {
        return setShowBreakout(false);
      }

      // R400 "next" button sends PageDown, arrow/space for keyboard navigation.
      if (
        event.key === "ArrowRight" ||
        event.key === " " ||
        event.key === "PageDown"
      ) {
        handleNext();
      }
      // R400 "back" button sends PageUp.
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides, handleNext, handlePrevious, showBreakout]);

  return { currentSlide, direction, showBreakout };
};
