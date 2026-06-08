import { ShaderCycle } from "../../components/shader/ShaderCycle";
import fbmGridShader from "./shaders/fbm-grid.frag?raw";
import flowFieldShader from "./shaders/flow-field.frag?raw";
import fbmBlobShader from "./shaders/fbm-blob.frag?raw";
import voronoiShader from "./shaders/voronoi.frag?raw";
import truchetShader from "./shaders/truchet.frag?raw";

export const Questions = () => {
  return (
    <>
      <ShaderCycle
        fragmentShaders={[
          truchetShader,
          voronoiShader,
          fbmGridShader,
          flowFieldShader,
          fbmBlobShader,
        ]}
        intervalMs={30000}
        dim={0}
      />
      <div className="relative z-10 max-w-[80ch]">
        <h1>Questions?</h1>
      </div>
    </>
  );
};
