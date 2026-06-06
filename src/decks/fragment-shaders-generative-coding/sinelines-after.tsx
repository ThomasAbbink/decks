import { CodeBlock } from "../../components/Codeblock";
import { ShaderBackground } from "../../components/shader/ShaderBackground";
import sinelinesShader from "./shaders/sinelines.frag?raw";

export const SinelinesAfter = () => {
  const code = `float row   = floor(y * rows);     // no array
float phase = phase0 + u_time * speed; // no mutation
float w     = abs(sin(phase)) * growth + minWidth;
float mask  = step(st.x, w);        // inside the bar?
gl_FragColor = vec4(mix(bg, bar, mask), 1.0);`;
  return (
    <>
      <ShaderBackground fragmentShader={sinelinesShader} dim={0.45} />
      <div className="relative z-10 [text-shadow:0_2px_20px_rgba(0,0,0,0.7)]">
        <h1>
          <code>sinelines</code> — after (shader)
        </h1>
        <CodeBlock size="sm">{code}</CodeBlock>
        <p className="text-foreground-secondary">
          Same rows, same sine widths. No stored objects, no per-pixel memory —
          time is just an input.
        </p>
      </div>
    </>
  );
};
