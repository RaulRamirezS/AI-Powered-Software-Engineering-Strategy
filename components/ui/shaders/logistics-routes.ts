/**
 * Logistics & Transportation hero shader: "route network".
 * A faint network of hubs and lanes drifts slowly; small gold lights travel along
 * the lanes like shipments moving between hubs.
 * Kept deliberately subtle (low intensity, slow) so it never competes with the copy.
 * Same brand palette and calm-centre / vignette rules as the default aurora shader.
 */
export const LOGISTICS_ROUTES_FRAGMENT = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec2 hub(vec2 cell) {
  return cell + 0.2 + 0.6 * vec2(hash(cell), hash(cell + 7.3));
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

  // Soft indigo haze
  float haze = noise(p * 2.0 + vec2(t * 0.03, -t * 0.02)) * 0.6 + noise(p * 4.0 - t * 0.02) * 0.4;
  col += indigo * 0.07 * smoothstep(0.4, 0.9, haze);

  // Slowly drifting network
  vec2 q = p * 3.2 + vec2(t * 0.025, t * 0.01);
  vec2 cell = floor(q);
  float lanes = 0.0;
  float lights = 0.0;
  float hubs = 0.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 c = cell + vec2(float(i), float(j));
      vec2 a = hub(c);
      hubs += smoothstep(0.045, 0.0, length(q - a)) * step(0.3, hash(c + 2.0));
      for (int k = 0; k < 3; k++) {
        vec2 o = k == 0 ? vec2(1.0, 0.0) : (k == 1 ? vec2(0.0, 1.0) : vec2(1.0, 1.0));
        float keep = step(k == 2 ? 0.7 : 0.4, hash(c * 1.7 + o * 3.1));
        vec2 b = hub(c + o);
        float d = segment(q, a, b);
        lanes += keep * (smoothstep(0.012, 0.0, d) * 0.6 + smoothstep(0.06, 0.0, d) * 0.15);
        // One shipment light per lane, moving at its own speed
        float s = hash(c + o * 5.3);
        float ph = fract(t * (0.04 + 0.06 * s) + s);
        vec2 lp = mix(a, b, ph);
        lights += keep * step(0.45, s) * smoothstep(0.06, 0.0, length(q - lp));
      }
    }
  }
  col += indigo * lanes * 0.10;
  col += mix(indigo, gold, 0.5) * hubs * 0.18;
  col += gold * lights * 0.28;

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
