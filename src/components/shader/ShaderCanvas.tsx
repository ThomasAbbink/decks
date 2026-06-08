import { useEffect, useRef } from "react";
import { cn } from "../../util/cn";
import { createProgram } from "./shaderUtils";
import { defaultVertexShader } from "./defaultVertexShader";

export type ShaderUniform = number | number[];

type Props = {
  fragmentShader: string;
  /**
   * Extra uniforms forwarded to the shader. A `number` becomes a `float`,
   * a `number[]` of length 2/3/4 becomes a `vec2`/`vec3`/`vec4`.
   */
  uniforms?: Record<string, ShaderUniform>;
  className?: string;
  /** Pause the render loop (e.g. for static demos). */
  paused?: boolean;
  /**
   * Cap canvas backing-store scale. Retina MacBooks use DPR 2, which quadruples
   * fragment work vs an external 1× monitor at the same logical size.
   */
  maxDpr?: number;
  /**
   * Target frame rate. ProMotion displays run rAF at 120 Hz; heavy shaders that
   * can't keep up stutter more at 120 than at a steady 60.
   */
  targetFps?: number;
};

export const ShaderCanvas = ({
  fragmentShader,
  uniforms,
  className,
  paused = false,
  maxDpr = 1.5,
  targetFps = 60,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uniformsRef = useRef(uniforms);
  uniformsRef.current = uniforms;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: true,
      powerPreference: "high-performance",
    });
    if (!gl) {
      console.error("WebGL is not available in this browser.");
      return;
    }

    let program: WebGLProgram;
    try {
      program = createProgram(gl, defaultVertexShader, fragmentShader);
    } catch (error) {
      console.error(error);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // Fullscreen triangle in clip space.
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const customLocations = new Map<string, WebGLUniformLocation | null>();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const setCustomUniform = (name: string, value: number | number[]) => {
      if (!customLocations.has(name)) {
        customLocations.set(name, gl.getUniformLocation(program, name));
      }
      const location = customLocations.get(name);
      if (!location) return;
      if (typeof value === "number") {
        gl.uniform1f(location, value);
      } else if (value.length === 2) {
        gl.uniform2fv(location, value);
      } else if (value.length === 3) {
        gl.uniform3fv(location, value);
      } else if (value.length === 4) {
        gl.uniform4fv(location, value);
      }
    };

    const start = performance.now();
    let frame = 0;
    let lastDrawTime = 0;
    const frameInterval = targetFps > 0 ? 1000 / targetFps : 0;

    const render = (now: number) => {
      if (frameInterval > 0) {
        const elapsed = now - lastDrawTime;
        if (elapsed < frameInterval) {
          if (!paused) frame = requestAnimationFrame(render);
          return;
        }
        lastDrawTime = now - (elapsed % frameInterval);
      }

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (now - start) / 1000);

      const current = uniformsRef.current;
      if (current) {
        for (const [name, value] of Object.entries(current)) {
          setCustomUniform(name, value);
        }
      }

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!paused) {
        frame = requestAnimationFrame(render);
      }
    };

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [fragmentShader, paused, maxDpr, targetFps]);

  return (
    <canvas ref={canvasRef} className={cn("block h-full w-full", className)} />
  );
};
