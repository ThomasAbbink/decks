import { useCallback, useEffect, useState } from "react";

export const useSlideControl = (
  slides: { id: string; content: React.ComponentType }[]
) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");

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
      if (event.key === "ArrowRight" || event.key === " ") {
        handleNext();
      }
      if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides, handleNext, handlePrevious]);

  return { currentSlide, direction };
};
