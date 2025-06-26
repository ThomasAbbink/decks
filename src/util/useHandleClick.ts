import { useState } from "react";

export const useHandleClick = () => {
  const [isClicked, setIsClicked] = useState(false);

  const onClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };
  return { onClick, isClicked };
};
