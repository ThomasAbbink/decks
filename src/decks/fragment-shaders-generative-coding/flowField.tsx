import { ShaderBackground } from "../../components/shader/ShaderBackground";
import flowFieldShader from "./shaders/flow-field.frag?raw";

export const FlowField = () => {
  return <ShaderBackground fragmentShader={flowFieldShader} dim={0.35} />;
};
