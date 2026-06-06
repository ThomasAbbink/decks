import { CodeBlock } from "../../components/Codeblock";
import { ShaderCanvas } from "../../components/shader/ShaderCanvas";
import shapeShader from "./shaders/shape.frag?raw";

export const FirstShape = () => {
  const code = `vec2 st = gl_FragCoord.xy / u_resolution;
float d = distance(st, vec2(0.5));

float mask = smoothstep(
  radius, radius - 0.01, d
);

vec3 color = mix(bg, fg, mask);`;
  return (
    <div className="not-prose flex w-[82vw] max-w-6xl items-center gap-8">
      <div className="flex-1">
        <h1 className="text-foreground mb-4 text-4xl font-bold">
          A circle from st.xy
        </h1>
        <CodeBlock size="sm">{code}</CodeBlock>
        <p className="text-foreground-secondary mt-4 text-lg">
          A distance, a <code>smoothstep</code> mask, a <code>mix</code> between
          two colors.
        </p>
      </div>
      <ShaderCanvas
        fragmentShader={shapeShader}
        className="aspect-square w-[40vh] rounded-xl shadow-2xl"
      />
    </div>
  );
};
