import { ShaderCanvas } from "../../components/shader/ShaderCanvas";
import fireClouds from "./shaders/fire-clouds.frag?raw";

export const Noise = () => {
  return (
    <div className="flex w-full max-w-6xl items-center justify-between gap-8">
      <div>
        <h1>Procedural noise</h1>
        <ul>
          <li>No real random numbers</li>
          <li>(Ken) Perlin</li>
          <li>Simplex</li>
          <li>Fractional brownian motion</li>
        </ul>
      </div>
      <ShaderCanvas
        className="aspect-square w-[70vh] rounded-xl shadow-2xl"
        fragmentShader={fireClouds}
      />
    </div>
  );
};
