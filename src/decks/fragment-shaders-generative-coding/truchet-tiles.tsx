import { ShaderCanvas } from "../../components/shader/ShaderCanvas";
import truchetShader from "./shaders/truchet.frag?raw";
import truchetTileShader from "./shaders/truchet-tile.frag?raw";

const tileVariants = [{ u_orientation: 0 }, { u_orientation: 1 }] as const;

export const TruchetTiles = () => {
  return (
    <div className="flex w-full max-w-6xl items-center justify-between gap-8">
      <div>
        <h1>Tiling</h1>
        <ul>
          <li>Shaders work well for tiling</li>
          <li>Truchet tiles</li>
        </ul>
      </div>
      <div className="space-y-8">
        <div className="flex justify-center gap-4">
          {tileVariants.map((uniforms) => (
            <ShaderCanvas
              key={uniforms.u_orientation}
              className="aspect-square w-[10vh] shadow-2xl"
              fragmentShader={truchetTileShader}
              uniforms={uniforms}
            />
          ))}
        </div>
        <ShaderCanvas
          className="aspect-square w-[70vh] rounded-xl shadow-2xl"
          fragmentShader={truchetShader}
          uniforms={{ u_showTileEdges: 1 }}
        />
      </div>
    </div>
  );
};
