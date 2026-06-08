import { createContext, useContext } from "react";

/**
 * Whether the slide currently being rendered is the active (visible) one.
 * Off-screen slides stay mounted in the carousel, so shaders read this to pause
 * their render loops instead of running a WebGL context for every slide at once.
 *
 * Defaults to `true` so shaders used outside a carousel still animate.
 */
export const SlideActiveContext = createContext(true);

export const useSlideActive = () => useContext(SlideActiveContext);
