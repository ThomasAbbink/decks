import { ShaderCycle } from "../../components/shader/ShaderCycle";
import fbmGridShader from "./shaders/fbm-grid.frag?raw";
import flowFieldShader from "./shaders/flow-field.frag?raw";
import fbmBlobShader from "./shaders/fbm-blob.frag?raw";
import voronoiShader from "./shaders/voronoi.frag?raw";
import truchetShader from "./shaders/truchet.frag?raw";
import fireClouds from "./shaders/fire-clouds.frag?raw";

export const ShaderShowcase = () => {
  return (
    <ShaderCycle
      fragmentShaders={[
        fireClouds,
        fbmBlobShader,
        truchetShader,
        voronoiShader,
        flowFieldShader,
        fbmGridShader,
      ]}
      intervalMs={60000}
    />
  );
};
