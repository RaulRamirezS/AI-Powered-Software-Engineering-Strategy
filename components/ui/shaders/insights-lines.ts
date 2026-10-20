/**
 * Insights hero shader: "reading lines".
 * Faint columns of text-like lines that slowly write in and fade out, like pages being
 * drafted, with a few gold highlighted lines. Kept deliberately subtle (low intensity, slow)
 * so it never competes with the copy. Same brand palette and calm-centre / vignette rules
 * as the default aurora shader.
 */
export const INSIGHTS_LINES_FRAGMENT = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time;

  vec3 indigo = vec3(0.369, 0.388, 0.988);
  vec3 gold   = vec3(0.992, 0.745, 0.0);
  vec3 col = vec3(0.0);

  // Page columns drifting up very slowly
  vec2 q = p + vec2(0.0, t * 0.01);
  float colW = 0.42;
  float cx = floor(q.x / colW);
  float lx = fract(q.x / colW);
  float lineH = 0.045;
  float ly = q.y / lineH;
  float row = floor(ly);
  float fy = fract(ly);

  vec2 id = vec2(cx, row);
  float len = 0.35 + 0.5 * hash(id);           // line length within the column
  float cycle = fract(t * 0.035 + hash(id + 5.0));
  float write = smoothstep(0.0, 0.3, cycle);   // line writes in from the left
  float fade = 1.0 - smoothstep(0.65, 1.0, cycle);
  float inCol = step(0.08, lx) * step(lx, 0.08 + len * 0.84 * write);
  float thick = smoothstep(0.38, 0.5, fy) - smoothstep(0.5, 0.62, fy);
  float para = step(0.18, hash(vec2(cx, floor(row / 6.0)) + 2.0)); // paragraph gaps
  float line = inCol * thick * fade * para * step(0.12, hash(id + 9.0));

  float hi = step(0.93, hash(id + 3.0));
  col += mix(indigo * 0.6, gold, hi) * line * mix(0.22, 0.32, hi);

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
