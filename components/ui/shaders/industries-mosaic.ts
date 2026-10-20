/**
 * Industries hub hero shader: "mosaic".
 * A faint hexagonal mosaic where single tiles slowly light up and fade, one industry at a time,
 * with a soft diagonal sweep. Kept deliberately subtle (low intensity, slow) so it never
 * competes with the copy. Same brand palette and calm-centre / vignette rules as the default aurora shader.
 */
export const INDUSTRIES_MOSAIC_FRAGMENT = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Hex grid: returns (local offset to cell centre .xy, cell id .zw)
vec4 hexCell(vec2 p) {
  vec2 r = vec2(1.0, 1.7320508);
  vec2 h = r * 0.5;
  vec2 a = mod(p, r) - h;
  vec2 b = mod(p - h, r) - h;
  vec2 g = dot(a, a) < dot(b, b) ? a : b;
  return vec4(g, p - g);
}

float hexDist(vec2 p) {
  p = abs(p);
  return max(dot(p, normalize(vec2(1.0, 1.7320508))), p.x);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time;

  vec3 indigo = vec3(0.369, 0.388, 0.988);
  vec3 gold   = vec3(0.992, 0.745, 0.0);
  vec3 col = vec3(0.0);

  vec4 hc = hexCell(p * 7.0 + vec2(t * 0.02, 0.0));
  vec2 id = floor(hc.zw * 10.0 + 0.5);
  float d = hexDist(hc.xy);

  // Tile outlines
  float edge = smoothstep(0.47, 0.5, d) - smoothstep(0.5, 0.52, d);
  col += indigo * edge * 0.07;

  // Tiles lighting up on their own slow cycle
  float h = hash(id);
  float cycle = fract(t * 0.04 + h);
  float glow = smoothstep(0.0, 0.25, cycle) * (1.0 - smoothstep(0.35, 0.7, cycle));
  float on = step(0.82, hash(id + 7.0));
  float fill = (1.0 - smoothstep(0.3, 0.48, d)) * glow * on;
  col += mix(indigo, gold, step(0.6, hash(id + 3.0))) * fill * 0.16;
  col += gold * edge * glow * on * 0.25;

  // Soft diagonal sweep
  float sweep = fract(t * 0.025);
  float s = smoothstep(0.12, 0.0, abs(dot(p, normalize(vec2(1.0, 0.6))) - (sweep * 3.0 - 1.5)));
  col += indigo * s * edge * 0.25;

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
