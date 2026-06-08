import { ShaderCycle } from "../../components/shader/ShaderCycle";
import fbmGridShader from "./shaders/fbm-grid.frag?raw";
import flowFieldShader from "./shaders/flow-field.frag?raw";
import fbmBlobShader from "./shaders/fbm-blob.frag?raw";

export const ShaderShowcase = () => {
  return (
    <ShaderCycle
      fragmentShaders={[fbmGridShader, flowFieldShader, fbmBlobShader]}
      intervalMs={30000}
    />
  );
};
