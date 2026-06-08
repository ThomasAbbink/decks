import { ShaderBackground } from "../../components/shader/ShaderBackground";
import fbmBlobShader from "./shaders/fbm-blob.frag?raw";

export const FbmBlob = () => {
  return <ShaderBackground fragmentShader={fbmBlobShader} dim={0.35} />;
};
