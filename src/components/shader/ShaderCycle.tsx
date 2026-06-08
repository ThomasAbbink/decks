import { useEffect, useState } from "react";
import { ShaderBackground } from "./ShaderBackground";
import { type ShaderUniform } from "./ShaderCanvas";
import { useSlideActive } from "../../util/slideActive";

type Props = {
  /** Shaders to cycle through, in order. */
  fragmentShaders: string[];
  uniforms?: Record<string, ShaderUniform>;
  /** Dim the shader so overlaid text stays readable. 0 = no dim, 1 = black. */
  dim?: number;
  /** How long each shader stays on screen, in ms. */
  intervalMs?: number;
  /** Pause cycling (the current shader keeps animating). */
  paused?: boolean;
};

/**
 * Rotates through a set of fullscreen shaders, swapping the active one on an
 * interval. Reuses `ShaderBackground` for the actual rendering.
 */
export const ShaderCycle = ({
  fragmentShaders,
  uniforms,
  dim = 0,
  intervalMs = 8000,
  paused = false,
}: Props) => {
  const count = fragmentShaders.length;
  const isActive = useSlideActive();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || !isActive || count <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => clearInterval(id);
  }, [paused, isActive, intervalMs, count]);

  if (count === 0) return null;

  return (
    <ShaderBackground
      key={index}
      fragmentShader={fragmentShaders[index]}
      uniforms={uniforms}
      dim={dim}
    />
  );
};
