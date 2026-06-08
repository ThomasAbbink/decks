import { ShaderBackground } from "../../components/shader/ShaderBackground";
import titleShader from "./shaders/title.frag?raw";

export const Title = () => {
  return (
    <>
      <ShaderBackground fragmentShader={titleShader} dim={0} />
      <div className="relative z-10 text-center [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
        <h1 className="mb-2">Shadery business</h1>
        <p className="text-foreground-secondary text-2xl">
          Generative art using fragment shaders
        </p>
      </div>
    </>
  );
};

Title.hideChrome = true;
