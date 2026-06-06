import { ShaderCanvas, type ShaderUniform } from "./ShaderCanvas";

type Props = {
  fragmentShader: string;
  uniforms?: Record<string, ShaderUniform>;
  /** Dim the shader so overlaid text stays readable. 0 = no dim, 1 = black. */
  dim?: number;
};

/**
 * Escape hatch for full-bleed shader slides. The current `Slide` wrapper sizes
 * content as prose, so this renders the shader fixed behind the slide content
 * instead. Place it as the first child of a slide and put text after it.
 */
export const ShaderBackground = ({
  fragmentShader,
  uniforms,
  dim = 0,
}: Props) => {
  return (
    <div className="fixed inset-0">
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
