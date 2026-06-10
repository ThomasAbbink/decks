// reference and inspiration: https://oneshader.net/shader/c355b33db7
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

#define numOctaves 5

float fbm(vec2 x, float H) {
  float G = exp2(-H);
  float f = 1.0;
  float a = 1.0;
  float t = 0.0;
  for (int i = 0; i < numOctaves; i++) {
    t += a * snoise(f * x);
    f *= 2.0;
    a *= G;
  }
  return t;
}

float cloudy(vec3 seed) {
  return dot(sin(seed), cos(seed.yzx));
}

float gyroidFbm(vec3 seed) {
  float result = 0.0;
  float amplitude = 0.5 + sin(u_time* 0.1) * 0.02;
  for (int i = 0; i < 8; i++) {
    // Each octave nudges the next — feedback warping, like clouds folding into themselves.
    seed.z += result * 0.5;
    result += abs(cloudy(seed / amplitude)) * amplitude;
    amplitude *= 0.5;
  }
  return result;
}

float cloudyGyroid(vec2 p) {
  vec3 seed = vec3(p, length(p) - u_time * 0.025);
  return sin(gyroidFbm(seed) * 7.0) * 0.5 + 0.5;
}



vec3 palette(float t) {
  t = clamp(t, 0.0, 1.0);

  vec3 c0 = vec3(0.10, 0.0, 0.10);
  vec3 c1 = vec3(0.26, 0.20, 0.26);
  vec3 c2 = vec3(0.54, 0.24, 0.24);
  vec3 c3 = vec3(0.74, 0.30, 0.22);
  vec3 c4 = vec3(0.83, 0.42, 0.30);
  vec3 c5 = vec3(0.991, 0.73, 0.97);

  float s = t * 5.0;
  if (s < 1.0) return mix(c0, c1, smoothstep(0.0, 1.0, s));
  if (s < 2.0) return mix(c1, c2, smoothstep(0.0, 1.0, s - 1.0));
  if (s < 3.0) return mix(c2, c3, smoothstep(0.0, 1.0, s - 2.0));
  if (s < 4.0) return mix(c3, c4, smoothstep(0.0, 1.0, s - 3.0));
  return mix(c4, c5, smoothstep(0.0, 1.0, s - 4.0));
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  vec2 p = st * 3.0;

  // Gyroid drives the main cloud shapes; domain warp adds fibrous swirl on top.
  float cloudy = cloudyGyroid(p);
  vec3 color = palette(cloudy);

  // Darken valleys so colour lives on the cloud crests, not the whole frame.
  float shade = smoothstep(0.0, 1.0, cloudy);
  color *= 0.65 + 0.35 * shade;

  gl_FragColor = vec4(color, 1.0);
}
