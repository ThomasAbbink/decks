import { ShaderCanvas } from "../../components/shader/ShaderCanvas";
import voronoiShader from "./shaders/voronoi.frag?raw";

export const Voronoi = () => {
  return (
    <div className="flex w-full max-w-6xl items-center justify-between gap-8">
      <div>
        <h1>Voronoi diagrams</h1>
        <ul>
          <li>A number of points on the screen</li>
          <li>Each pixel calculates the distance to the closest point</li>
        </ul>
      </div>
      <ShaderCanvas
        className="aspect-square w-[70vh] rounded-xl shadow-2xl"
        fragmentShader={voronoiShader}
      />
    </div>
  );
};
