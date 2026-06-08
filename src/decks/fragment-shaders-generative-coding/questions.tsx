import { ShaderCycle } from "../../components/shader/ShaderCycle";
import fbmGridShader from "./shaders/fbm-grid.frag?raw";
import flowFieldShader from "./shaders/flow-field.frag?raw";
import fbmBlobShader from "./shaders/fbm-blob.frag?raw";

export const Questions = () => {
  return (
    <>
      <ShaderCycle
        fragmentShaders={[fbmGridShader, flowFieldShader, fbmBlobShader]}
        intervalMs={30000}
        dim={0.1}
      />
      <div className="relative z-10 max-w-[80ch]">
        <h1>Questions?</h1>
      </div>
    </>
  );
};
