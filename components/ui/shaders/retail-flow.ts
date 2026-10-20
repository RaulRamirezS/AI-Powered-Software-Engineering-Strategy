/**
 * Retail & Distribution hero shader: "order flow".
 * Diagonal light trails move like orders and shipments along lanes (gold heads,
 * indigo tails), with soft store-light bokeh drifting behind them.
 * Same brand palette and calm-centre / vignette rules as the default aurora shader.
 */
export const RETAIL_FLOW_FRAGMENT = `
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

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + 17.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float aspect = u_resolution.x / u_resolution.y;
  float t = u_time;

  vec3 indigo = vec3(0.369, 0.388, 0.988);
  vec3 gold   = vec3(0.992, 0.745, 0.0);
  vec3 col = vec3(0.0);

  // Soft indigo haze so the black is never flat
  float haze = fbm(p * 1.3 + vec2(t * 0.025, -t * 0.018));
  col += indigo * 0.16 * smoothstep(0.35, 0.9, haze);

  // Diagonal lanes of light trails (three depths: far = thin and slow, near = wide and fast)
  float ang = -0.42;
  mat2 R = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
  vec2 d = R * p;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float lane = d.y * (16.0 - fi * 4.5) + fi * 3.7;
    float id = floor(lane);
    float fr = fract(lane) - 0.5;
    float h = hash(vec2(id, fi + 1.0));
    float active = step(0.5, h);
    float speed = (0.12 + 0.28 * hash(vec2(id + 4.0, fi))) * (1.0 + fi * 0.6);
    float x = d.x * (1.2 + fi * 0.4) - t * speed + h * 13.0;
    float s = fract(x * 0.45);
    // Long fading tail, bright head, short gap
    float trail = pow(smoothstep(0.35, 0.97, s), 2.0) * smoothstep(1.0, 0.975, s);
    float width = 0.05 + 0.06 * hash(vec2(id, fi + 9.0));
    float line = smoothstep(width, 0.0, abs(fr));
    float glow = smoothstep(0.5, 0.0, abs(fr)) * 0.25;
    vec3 tint = mix(indigo, gold, smoothstep(0.75, 0.98, s));
    col += tint * (line + glow) * trail * active * (0.42 + fi * 0.12);
  }

  // Store-light bokeh drifting slowly to the right
  for (int i = 0; i < 10; i++) {
    float fi = float(i);
    vec2 seed = vec2(fi * 1.37, fi * 2.91);
    float drift = t * 0.012 * (0.5 + hash(seed + 7.0));
    vec2 c = vec2(mod(hash(seed) * aspect + drift, aspect) - aspect * 0.5,
                  hash(seed + 3.1) - 0.5 + 0.04 * sin(t * 0.3 + fi));
    float r = 0.035 + 0.075 * hash(seed + 5.0);
    float dist = length(p - c);
    float orb = smoothstep(r, r * 0.55, dist) * 0.55 + smoothstep(r * 2.6, 0.0, dist) * 0.18;
    float pulse = 0.75 + 0.25 * sin(t * 0.8 + fi * 1.7);
    col += mix(gold, indigo, step(0.55, hash(seed + 9.0))) * orb * 0.3 * pulse;
  }

  // Keep the centre (where text sits) calmer and darker
  float centre = 1.0 - smoothstep(0.0, 0.75, length(p * vec2(0.8, 1.25)));
  col *= mix(1.0, 0.45, centre);

  // Vignette + fade to black at the bottom edge so sections blend
  float vig = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(1.1, 1.0)));
  col *= vig;
  col *= smoothstep(0.0, 0.18, uv.y);

  col += (hash(gl_FragCoord.xy + u_time) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;
