#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// A hash: turn a 2D coordinate into a pseudo-random value in [0, 1).
float random(vec2 c) {
  return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453);
}

// Value noise: random values on an integer grid, smoothly interpolated.
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

// Fractal Brownian motion: stack several octaves of noise, each one
// twice as detailed and half as loud, for a cloudy, organic field.
#define OCTAVES 5
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}


void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.1294, 0.1294, 0.1569);
    // Define the moving center area
    float centerRadius = 0.15;
    vec2 center = vec2(
        0.5 + sin(u_time * 0.25) * 0.2, // Bounce horizontally, slower and closer to center
        0.5 + cos(u_time * 0.35) * 0.2  // Bounce vertically, slower and closer to center
    );
    
    // Rotate the scene
    float rotationSpeed = 0.05; // Reduced rotation speed
    float rotationAngle = u_time * rotationSpeed;
    mat2 rotationMatrix = mat2(cos(rotationAngle), -sin(rotationAngle),
                               sin(rotationAngle), cos(rotationAngle));
    st = rotationMatrix * (st - vec2(0.5)) + vec2(0.5);
    
    float distFromCenter = distance(st, center);
    float distFromEdge = min(min(st.x, 1.0 - st.x), min(st.y, 1.0 - st.y));
    
    // Vary the line count over time (30 to 70 lines)
    float lineCountVariation = sin(u_time * 0.1) * 0.5 + 0.5; // Oscillates between 0 and 1
    float lineCount = 40.0 + lineCountVariation * 40.0;
    
    // Add moving vertical lines, 5 pixels wide, evenly spaced apart
    float lineWidth = 5.0 / u_resolution.x;
    float verticalOscillation = sin(u_time * 0.15) * 0.5 + 0.5; // Slower oscillation
    
    vec3 lineColor = vec3(0.8, 0.9, 1.0); // Very light blue color for all lines
    
    // Calculate brightness factor based on center's distance from screen center
    float centerDistFromScreenCenter = distance(center, vec2(0.5));
    float brightnessFactor = 1.0 - smoothstep(0.0, 1.0, centerDistFromScreenCenter);
    
    // Calculate darkness factor based on distance from screen center
    float darknessFactor = smoothstep(0.0, 1.0, centerDistFromScreenCenter);
    
    // Generate FBM twice for more complex skewing
    float fbmValue1 = fbm(st * sin(u_time * 0.01));
    float fbmValue2 = fbm(vec2(fbmValue1) * vec2(sin(u_time * 0.01)));
    float fbmCombined = (fbmValue1 + fbmValue2) * 0.1; // Combine the two FBM values
    
    float centerThreshold = 0.25; // Increased central area
    float edgeThreshold = 0.1; // Slightly larger edge area
    float fbmEffect = fbmCombined * pow(smoothstep(centerThreshold, 0.0, distFromCenter), 2.0) * smoothstep(0.0, edgeThreshold, distFromEdge);
    
    for (int i = 0; i < 50; i++) {
        float t = float(i) / lineCount;
        if (t > 1.0) break; // Stop when we reach the current line count
        float linePosition = (verticalOscillation + t) - floor(verticalOscillation + t);
        linePosition = linePosition * 2.0 - 0.5; // This makes lines start from 100% outside the screen
        // Apply skew using combined FBM, more prominent in the central area and much less prominent near the edges
        float skewFactor = 5.0; // Increased skew factor for more noticeable effect in the center
        float skew = skewFactor * fbmEffect;
        linePosition += skew;
        
        float line = smoothstep(linePosition - lineWidth/2.0, linePosition, st.x) - 
                     smoothstep(linePosition, linePosition + lineWidth/2.0, st.x);
        
        // Add neon glow
        float glow = smoothstep(linePosition - lineWidth*2.0, linePosition, st.x) - 
                     smoothstep(linePosition, linePosition + lineWidth*2.0, st.x);
        color += lineColor * line * (1.5 + brightnessFactor - darknessFactor); // Adjust line brightness
        color += lineColor * glow * (0.5 + brightnessFactor * 0.5 - darknessFactor * 0.5); // Adjust glow brightness
    }
    
    // Add moving horizontal lines, 5 pixels wide, evenly spaced apart
    float horizontalOscillation = cos(u_time * 0.125) * 0.5 + 0.5; // Slower speed for horizontal lines
    
    for (int i = 0; i < 40; i++) {
        float t = float(i) / lineCount;
        if (t > 1.0) break; // Stop when we reach the current line count
        float linePosition = (horizontalOscillation + t) - floor(horizontalOscillation + t);
        linePosition = linePosition * 2.0 - 0.5; // This makes lines start from 100% outside the screen
        // Apply skew using combined FBM, more prominent in the central area and much less prominent near the edges
        float skewFactor = 5.0; // Increased skew factor for more noticeable effect in the center
        float skew = skewFactor * fbmEffect;
        linePosition += skew;
        
        float line = smoothstep(linePosition - lineWidth/2.0, linePosition, st.y) - 
                     smoothstep(linePosition, linePosition + lineWidth/2.0, st.y);
        
        // Add neon glow
        float glow = smoothstep(linePosition - lineWidth*2.0, linePosition, st.y) - 
                     smoothstep(linePosition, linePosition + lineWidth*2.0, st.y);
        color += lineColor * line * (1.5 + brightnessFactor - darknessFactor); // Adjust line brightness
        color += lineColor * glow * (0.5 + brightnessFactor * 0.5 - darknessFactor * 0.5); // Adjust glow brightness
    }
    
    // Clamp color to avoid oversaturation
    color = clamp(color, 0.0, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
}