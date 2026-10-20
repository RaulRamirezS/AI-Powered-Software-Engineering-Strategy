/**
 * Engineering Staffing hero shader: "blueprint".
 * A faint blueprint grid with slowly drafted construction lines (beams and braces)
 * that draw in, hold and fade, plus a soft scan line, like plans taking shape.
 * Kept deliberately subtle (low intensity, slow) so it never competes with the copy.
 * Same brand palette and calm-centre / vignette rules as the default aurora shader.
 */
export const ENGINEERING_BLUEPRINT_FRAGMENT = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
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

  // Blueprint grid: fine and major lines
  vec2 g = p * 18.0;
  vec2 gf = abs(fract(g) - 0.5);
  float fine = smoothstep(0.47, 0.5, max(gf.x, gf.y));
  vec2 G = p * 3.6;
  vec2 Gf = abs(fract(G) - 0.5);
  float major = smoothstep(0.488, 0.5, max(Gf.x, Gf.y));
  col += indigo * (fine * 0.035 + major * 0.08);

  // Drafted members on the major grid: each cell draws a beam or brace that
  // grows, holds and fades on its own cycle
  vec2 cell = floor(G);
  vec2 local = fract(G);
  float h = hash(cell);
  float cycle = fract(t * 0.05 + h);
  float grow = smoothstep(0.0, 0.35, cycle);
  float fade = 1.0 - smoothstep(0.7, 1.0, cycle);
  vec2 a = h < 0.33 ? vec2(0.0, 0.5) : (h < 0.66 ? vec2(0.5, 0.0) : vec2(0.0, 0.0));
  vec2 b = h < 0.33 ? vec2(1.0, 0.5) : (h < 0.66 ? vec2(0.5, 1.0) : vec2(1.0, 1.0));
  vec2 bb = mix(a, b, grow);
  float d = segment(local, a, bb);
  float member = smoothstep(0.012, 0.0, d) * step(0.45, hash(cell + 3.0));
  col += mix(indigo, gold, step(0.8, hash(cell + 9.0))) * member * fade * 0.32;
  // Joint markers at the member ends
  float joint = smoothstep(0.04, 0.0, length(local - a)) + smoothstep(0.04, 0.0, length(local - bb));
  col += gold * joint * fade * step(0.45, hash(cell + 3.0)) * 0.18;

  // Soft scan line moving down the plan
  float scan = fract(t * 0.03);
  float sy = 0.6 - scan * 1.2;
  col += indigo * smoothstep(0.05, 0.0, abs(p.y - sy)) * 0.03;

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
