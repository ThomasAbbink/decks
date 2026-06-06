import { ShaderBackground } from "../../components/shader/ShaderBackground";
import titleShader from "./shaders/title.frag?raw";

export const Title = () => {
  return (
    <>
      <ShaderBackground fragmentShader={titleShader} dim={0.35} />
      <div className="relative z-10 text-center [text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
        <h1 className="mb-2">Fragment Shaders & Generative Coding</h1>
        <p className="text-foreground-secondary text-2xl">
          What color is this pixel?
        </p>
      </div>
    </>
  );
};
