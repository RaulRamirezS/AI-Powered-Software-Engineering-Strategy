/**
 * Finances & Banking hero shader: "ledger".
 * A faint ledger grid with a few glowing intersections, and two thin market-style
 * lines that slowly draw across the screen like a live chart.
 * Kept deliberately subtle (low intensity, slow) so it never competes with the copy.
 * Same brand palette and calm-centre / vignette rules as the default aurora shader.
 */
export const FINANCE_LEDGER_FRAGMENT = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise1(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash(vec2(i, 0.0)), hash(vec2(i + 1.0, 0.0)), u);
}

// Smooth "market" curve
float curve(float x, float seed) {
  return noise1(x * 1.2 + seed) * 0.55 + noise1(x * 3.1 + seed * 2.0) * 0.3 + noise1(x * 7.0 + seed * 3.0) * 0.15;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float aspect = u_resolution.x / u_resolution.y;
  float t = u_time;

  vec3 indigo = vec3(0.369, 0.388, 0.988);
  vec3 gold   = vec3(0.992, 0.745, 0.0);
  vec3 col = vec3(0.0);

  // Ledger grid, drifting slowly to the left
  vec2 g = p * 9.0 + vec2(t * 0.06, 0.0);
  vec2 gf = abs(fract(g) - 0.5);
  float grid = smoothstep(0.485, 0.5, max(gf.x, gf.y));
  col += indigo * grid * 0.11;

  // A few glowing intersections that fade in and out
  vec2 cellId = floor(g + 0.5);
  float pick = step(0.93, hash(cellId));
  float blink = 0.5 + 0.5 * sin(t * 0.7 + hash(cellId + 3.0) * 6.28);
  float node = smoothstep(0.14, 0.0, length(fract(g + 0.5) - 0.5));
  col += gold * node * pick * blink * 0.30;

  // Two thin chart lines drawn left to right, then fading out and redrawing
  for (int i = 0; i < 2; i++) {
    float fi = float(i);
    float x = p.x + t * 0.05 * (1.0 + fi * 0.4);
    float y = -0.05 - fi * 0.2 + (curve(x, 4.0 + fi * 9.0) - 0.5) * 0.35;
    float d = abs(p.y - y);
    float line = smoothstep(0.004, 0.0, d) + smoothstep(0.025, 0.0, d) * 0.3;
    float reveal = fract(t * 0.04 + fi * 0.5);
    float head = (reveal * 1.4 - 0.2) * aspect - aspect * 0.5;
    float drawn = smoothstep(head, head - 0.4, p.x) * smoothstep(head - 1.6, head - 0.6, p.x);
    vec3 tint = i == 0 ? gold : indigo;
    col += tint * line * drawn * (i == 0 ? 0.20 : 0.26);
  }

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
