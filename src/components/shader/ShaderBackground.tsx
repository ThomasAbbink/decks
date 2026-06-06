import { ShaderCanvas, type ShaderUniform } from "./ShaderCanvas";

type Props = {
  fragmentShader: string;
  uniforms?: Record<string, ShaderUniform>;
  /** Dim the shader so overlaid text stays readable. 0 = no dim, 1 = black. */
  dim?: number;
};

/**
 * Escape hatch for full-bleed shader slides. The current `Slide` wrapper sizes
 * content as prose, so this renders the shader behind the slide content instead.
 * Place it as the first child of a slide and put text after it.
 *
 * The active slide container has a `transform`, which makes `position: fixed`
 * resolve against that (content-sized) element rather than the viewport. The
 * container is centered in the viewport, so we size to `h-screen w-screen` and
 * center on the container to cover the whole screen regardless of content size.
 */
export const ShaderBackground = ({
  fragmentShader,
  uniforms,
  dim = 0,
}: Props) => {
  return (
    <div className="fixed top-1/2 left-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2">
      <ShaderCanvas fragmentShader={fragmentShader} uniforms={uniforms} />
      {dim > 0 && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0, 0, 0, ${dim})` }}
        />
      )}
    </div>
  );
};
