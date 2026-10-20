/**
 * Business Services hero shader: "constellation".
 * Slowly orbiting points (clients, teams, products) that link up with faint lines
 * when they come close, like a working network forming and re-forming.
 * Kept deliberately subtle (low intensity, slow) so it never competes with the copy.
 * Same brand palette and calm-centre / vignette rules as the default aurora shader.
 */
export const BUSINESS_CONSTELLATION_FRAGMENT = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 point(vec2 cell, float t) {
  float h1 = hash(cell);
  float h2 = hash(cell + 11.7);
  vec2 base = cell + 0.5;
  float r = 0.32;
  return base + r * vec2(sin(t * (0.15 + 0.2 * h1) + h1 * 6.28), cos(t * (0.12 + 0.2 * h2) + h2 * 6.28));
}

float segment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time;

  vec3 indigo = vec3(0.369, 0.388, 0.988);
  vec3 gold   = vec3(0.992, 0.745, 0.0);
  vec3 col = vec3(0.0);

  vec2 q = p * 4.0;
  vec2 cell = floor(q);
  float dots = 0.0;
  float goldDots = 0.0;
  float links = 0.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 c = cell + vec2(float(i), float(j));
      vec2 a = point(c, t);
      float isGold = step(0.85, hash(c + 5.0));
      float d = smoothstep(0.05, 0.0, length(q - a));
      dots += d * (1.0 - isGold);
      goldDots += d * isGold;
      // Link to the right and upper neighbours when they come close
      for (int k = 0; k < 2; k++) {
        vec2 o = k == 0 ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec2 b = point(c + o, t);
        float len = length(b - a);
        float strength = smoothstep(1.05, 0.6, len);
        links += strength * smoothstep(0.012, 0.0, segment(q, a, b));
      }
    }
  }
  col += indigo * links * 0.16;
  col += indigo * dots * 0.35;
  col += gold * goldDots * 0.45;

  // Keep the centre (where text sits) calmer and darker
  float centre = 1.0 - smoothstep(0.0, 0.9, length(p * vec2(0.75, 1.2)));
  col *= mix(1.0, 0.3, centre);

  // Vignette + fade to black at the bottom edge so sections blend
  float vig = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(1.1, 1.0)));
  col *= vig;
  col *= smoothstep(0.0, 0.18, uv.y);

  col += (hash(gl_FragCoord.xy + u_time) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;
