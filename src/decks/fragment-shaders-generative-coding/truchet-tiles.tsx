import { ShaderCanvas } from "../../components/shader/ShaderCanvas";
import truchetShader from "./shaders/truchet.frag?raw";

export const TruchetTiles = () => {
  return (
    <div className="not-prose flex w-[80vw] max-w-5xl items-center gap-10">
      <div className="flex-1">
        <h1 className="text-foreground mb-4 text-4xl font-bold">
          Truchet tiles
        </h1>
        <p className="text-foreground-secondary text-xl">
          One rule per tile: flip it or don't. Random orientation across a grid,
          and a pattern emerges that nobody designed.
        </p>
      </div>
      <ShaderCanvas
        fragmentShader={truchetShader}
        className="aspect-square w-[40vh] rounded-xl shadow-2xl"
      />
    </div>
  );
};
