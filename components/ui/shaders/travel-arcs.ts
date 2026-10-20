/**
 * Travel & Hospitality hero shader: "flight arcs".
 * Faint arcs between destinations, each with a small light travelling along it like a
 * flight in progress, over a dotted, slowly drifting map field.
 * Kept deliberately subtle (low intensity, slow) so it never competes with the copy.
 * Same brand palette and calm-centre / vignette rules as the default aurora shader.
 */
export const TRAVEL_ARCS_FRAGMENT = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Quadratic Bezier point
vec2 bez(vec2 a, vec2 c, vec2 b, float t) {
  float u = 1.0 - t;
  return u * u * a + 2.0 * u * t * c + t * t * b;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float aspect = u_resolution.x / u_resolution.y;
  float t = u_time;

  vec3 indigo = vec3(0.369, 0.388, 0.988);
  vec3 gold   = vec3(0.992, 0.745, 0.0);
  vec3 col = vec3(0.0);

  // Dotted map field drifting slowly
  vec2 g = p * 26.0 + vec2(t * 0.15, 0.0);
  vec2 gid = floor(g);
  float land = step(0.55, hash(floor(gid / 6.0)) * 0.6 + hash(gid) * 0.4);
  float dotv = smoothstep(0.18, 0.0, length(fract(g) - 0.5)) * land;
  col += indigo * dotv * 0.09;

  // Flight arcs
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    vec2 a = vec2((hash(vec2(fi, 1.0)) - 0.5) * aspect, hash(vec2(fi, 2.0)) - 0.5) * 0.95;
    vec2 b = vec2((hash(vec2(fi, 3.0)) - 0.5) * aspect, hash(vec2(fi, 4.0)) - 0.5) * 0.95;
    vec2 mid = (a + b) * 0.5 + vec2(0.0, 0.18 + 0.15 * hash(vec2(fi, 5.0)));
    // Distance to the arc (polyline approximation of the curve)
    float d = 1.0;
    vec2 prev = a;
    for (int k = 1; k <= 32; k++) {
      vec2 cur = bez(a, mid, b, float(k) / 32.0);
      vec2 pa = p - prev;
      vec2 ba = cur - prev;
      float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
      d = min(d, length(pa - ba * h));
      prev = cur;
    }
    float arc = smoothstep(0.004, 0.0, d) * 0.5 + smoothstep(0.02, 0.0, d) * 0.12;
    col += indigo * arc * 0.35;
    // Endpoints
    col += gold * (smoothstep(0.012, 0.0, length(p - a)) + smoothstep(0.012, 0.0, length(p - b))) * 0.25;
    // Plane light
    float ph = fract(t * (0.035 + 0.02 * hash(vec2(fi, 6.0))) + hash(vec2(fi, 7.0)));
    vec2 lp = bez(a, mid, b, ph);
    col += gold * smoothstep(0.022, 0.0, length(p - lp)) * 0.55;
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
