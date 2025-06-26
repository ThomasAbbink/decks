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
      if (event.key === "ArrowUp") {
        return setShowBreakout(true);
      }

      if (showBreakout) {
        return setShowBreakout(false);
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        handleNext();
      }
      if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides, handleNext, handlePrevious, showBreakout]);

  return { currentSlide, direction, showBreakout };
};
