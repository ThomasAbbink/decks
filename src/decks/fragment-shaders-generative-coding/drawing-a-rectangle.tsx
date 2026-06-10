import { CodeBlock } from "../../components/Codeblock";
import { ShaderCanvas } from "../../components/shader/ShaderCanvas";
import rectangleShader from "./shaders/rectangle.frag?raw";

export const DrawingARectangle = () => {
  const code = `
  // normalize the pixel coordinates to be between 0 and 1, independent of the resolution.
  vec2 coordinates = gl_FragCoord.xy / u_resolution.xy;

  vec3 backgroundColor = vec3(0.10, 0.09, 0.15);
  vec3 foregroundColor = vec3(0.90, 0.86, 0.95);

  // I am one pixel at coordinates.xy. Am I inside the rectangle?
  bool inside = coordinates.x > 0.0 && coordinates.x < 0.5 &&
                coordinates.y > 0.45 && coordinates.y < 0.55;

  // instead of returning a value the output need to be set on the gl_FragColor variable.
  gl_FragColor = inside ? vec4(foregroundColor, 1.0) : vec4(backgroundColor, 1.0);`;
  return (
    <div className="not-prose flex w-[82vw] max-w-6xl items-center gap-8">
      <div className="flex-1">
        <h1 className="text-foreground mb-4 text-4xl font-bold">
          Drawing a rectangle
        </h1>
        <CodeBlock size="sm">{code}</CodeBlock>
        <p className="text-foreground-secondary mt-4 text-lg">
          Every pixel asks "am I inside?" and picks a color.
        </p>
      </div>
      <ShaderCanvas
        fragmentShader={rectangleShader}
        className="aspect-square w-[40vh] rounded-xl shadow-2xl"
      />
    </div>
  );
};
