/**
 * Healthcare & Wellness hero shader: "pulse".
 * Slow, soft rings radiating from two off-centre points (like a calm heartbeat on a monitor)
 * plus a faint heartbeat trace that scrolls across the lower third.
 * Kept deliberately subtle (low intensity, slow) so it never competes with the copy.
 * Same brand palette and calm-centre / vignette rules as the default aurora shader.
 */
export const HEALTHCARE_PULSE_FRAGMENT = `
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

// Stylised ECG beat: flat, small bump, sharp spike, small dip, flat
float ecg(float x) {
  float s = fract(x);
  float p = 0.12 * exp(-pow((s - 0.30) / 0.035, 2.0));
  float q = -0.10 * exp(-pow((s - 0.46) / 0.012, 2.0));
  float r = 0.75 * exp(-pow((s - 0.50) / 0.012, 2.0));
  float sw = -0.18 * exp(-pow((s - 0.54) / 0.015, 2.0));
  float t = 0.18 * exp(-pow((s - 0.72) / 0.05, 2.0));
  return p + q + r + sw + t;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float aspect = u_resolution.x / u_resolution.y;
  float t = u_time;

  vec3 indigo = vec3(0.369, 0.388, 0.988);
  vec3 gold   = vec3(0.992, 0.745, 0.0);
  vec3 col = vec3(0.0);

  // Soft indigo haze
  float haze = fbm(p * 1.1 + vec2(t * 0.02, t * 0.015));
  col += indigo * 0.10 * smoothstep(0.35, 0.9, haze);

  // Slow radiating rings from two sources (one indigo, one gold)
  vec2 a = vec2(-0.42 * aspect, 0.22);
  vec2 b = vec2(0.40 * aspect, -0.18);
  float da = length(p - a);
  float db = length(p - b);
  float ringsA = pow(0.5 + 0.5 * sin(da * 22.0 - t * 1.1), 10.0) * smoothstep(1.1, 0.1, da);
  float ringsB = pow(0.5 + 0.5 * sin(db * 22.0 - t * 0.9 + 1.7), 10.0) * smoothstep(1.0, 0.1, db);
  col += indigo * ringsA * 0.13;
  col += gold * ringsB * 0.06;
  col += indigo * smoothstep(0.35, 0.0, da) * 0.08;
  col += gold * smoothstep(0.3, 0.0, db) * 0.05;

  // Faint heartbeat trace scrolling across the lower third, fading out at the sides
  float x = p.x * 1.5 + t * 0.18;
  float y = -0.30 + ecg(x) * 0.12;
  float line = smoothstep(0.006, 0.0, abs(p.y - y)) + smoothstep(0.03, 0.0, abs(p.y - y)) * 0.25;
  float edge = smoothstep(0.5 * aspect, 0.2 * aspect, abs(p.x));
  col += mix(indigo, gold, 0.55) * line * 0.22 * edge;

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
