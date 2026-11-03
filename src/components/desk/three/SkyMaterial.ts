import { Color, ShaderMaterial, Vector3 } from "three";

/** The view out of the window: gradient sky, sun, moon, twinkling stars and a city whose windows light up at night. */
export function makeSkyMaterial() {
  return new ShaderMaterial({
    toneMapped: false,
    uniforms: {
      uTop: { value: new Color() },
      uBot: { value: new Color() },
      uSun: { value: new Vector3() },
      uMoon: { value: new Vector3() },
      uStars: { value: 0 },
      uLights: { value: 0 },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform vec3 uTop, uBot, uSun, uMoon;
      uniform float uStars, uLights, uTime;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void main() {
        vec2 a = vec2(1.35, 1.0);
        vec3 col = mix(uBot, uTop, smoothstep(0.0, 1.0, vUv.y));
        float ds = distance(vUv * a, uSun.xy * a);
        col += uSun.z * (vec3(1.0, 0.95, 0.8) * smoothstep(0.075, 0.06, ds) * 1.6 + vec3(1.0, 0.72, 0.45) * 0.45 * exp(-ds * 6.0));
        float dm = distance(vUv * a, uMoon.xy * a);
        float crater = smoothstep(0.05, 0.04, distance(vUv * a, (uMoon.xy + vec2(0.012, 0.01)) * a));
        col += uMoon.z * (vec3(0.92, 0.94, 1.0) * smoothstep(0.05, 0.042, dm) * (1.0 - crater * 0.25) * 1.2 + vec3(0.5, 0.6, 1.0) * 0.12 * exp(-dm * 8.0));
        vec2 g = floor(vUv * vec2(110.0, 80.0));
        float s = hash(g);
        col += uStars * step(0.988, s) * (0.55 + 0.45 * sin(uTime * 1.7 + s * 50.0)) * step(0.32, vUv.y);
        float bx = floor(vUv.x * 26.0);
        float h = 0.1 + hash(vec2(bx, 3.0)) * 0.24 + step(0.86, hash(vec2(bx, 9.0))) * 0.12;
        float b = step(vUv.y, h);
        vec2 wg = floor(vec2(vUv.x * 150.0, vUv.y * 120.0));
        float win = step(0.58, hash(wg)) * step(mod(wg.x, 2.0), 0.5) * step(mod(wg.y, 2.0), 0.5);
        vec3 city = mix(vec3(0.05, 0.055, 0.075), vec3(0.025, 0.028, 0.045), uLights) + win * uLights * vec3(1.0, 0.75, 0.42) * 1.4;
        col = mix(col, city, b);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
}
