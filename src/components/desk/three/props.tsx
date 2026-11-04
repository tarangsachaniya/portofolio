"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import {
  AdditiveBlending, CatmullRomCurve3, Color, DoubleSide, Float32BufferAttribute, LatheGeometry, MathUtils, MeshBasicMaterial, MeshPhysicalMaterial,
  MeshStandardMaterial, PlaneGeometry, Vector2, Vector3, type Group, type SpotLight, type Sprite, type SpriteMaterial,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { playKey } from "../../shell/sound";
import { LEGEND_CELLS, brushed, label, legendAtlas, phoneScreen, puff, ready, ruled, spine, walnut } from "./textures";

const AMBER = new Color("#ffb547");

/* ═════════════ desk ═════════════ */
export function Desk() {
  const wood = useMemo(() => walnut(), []);
  return (
    <group>
      {/* top: walnut slab with a darker front lip */}
      <RoundedBox args={[2.6, 0.045, 1.1]} radius={0.01} smoothness={4} position={[0, -0.0225, 0]} receiveShadow castShadow>
        <meshPhysicalMaterial map={wood} roughness={0.42} clearcoat={0.35} clearcoatRoughness={0.4} />
      </RoundedBox>
      <mesh position={[0, -0.05, 0.545]} receiveShadow><boxGeometry args={[2.6, 0.012, 0.012]} /><meshStandardMaterial color="#2f1e13" roughness={0.6} /></mesh>
      {/* steel frame: legs, crossbar, cable tray */}
      {[[-1.2, -0.45], [1.2, -0.45], [-1.2, 0.45], [1.2, 0.45]].map(([x, z]) => (
        <RoundedBox key={`${x}${z}`} args={[0.05, 0.74, 0.05]} radius={0.008} position={[x, -0.42, z]} castShadow>
          <meshStandardMaterial color="#17181c" metalness={0.75} roughness={0.32} />
        </RoundedBox>
      ))}
      {[-1.2, 1.2].map((x) => <mesh key={x} position={[x, -0.66, 0]} castShadow><boxGeometry args={[0.035, 0.035, 0.9]} /><meshStandardMaterial color="#17181c" metalness={0.75} roughness={0.32} /></mesh>)}
      <mesh position={[0, -0.12, -0.38]} castShadow><boxGeometry args={[1.4, 0.06, 0.12]} /><meshStandardMaterial color="#121317" metalness={0.5} roughness={0.5} /></mesh>
      {/* felt mat with piping */}
      <RoundedBox args={[1.08, 0.004, 0.45]} radius={0.002} position={[0, 0.0015, 0.12]} receiveShadow>
        <meshStandardMaterial color="#2b2e36" roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[1.06, 0.005, 0.43]} radius={0.002} position={[0, 0.002, 0.12]} receiveShadow>
        <meshPhysicalMaterial color="#1a1c22" roughness={0.95} sheen={1} sheenColor="#3a3f4c" sheenRoughness={0.8} />
      </RoundedBox>
    </group>
  );
}

/* ═════════════ monitor ═════════════ */
export const SCREEN = { w: 1.0, h: 0.625, y: 0.53, z: -0.22 };

export function Monitor({ glow, children }: { glow: Color; children?: React.ReactNode }) {
  const panel = useRef<MeshPhysicalMaterial>(null);
  const rough = useMemo(() => brushed(), []);
  useFrame(() => panel.current?.emissive.lerp(glow, 0.08));
  const alu = <meshStandardMaterial color="#a7adb7" metalness={0.92} roughness={0.32} roughnessMap={rough} />;
  return (
    <group position={[0, 0, SCREEN.z]}>
      {/* front bezel + chin */}
      <RoundedBox args={[SCREEN.w + 0.024, SCREEN.h + 0.05, 0.012]} radius={0.008} smoothness={4} position={[0, SCREEN.y - 0.0125, -0.006]} castShadow>
        <meshPhysicalMaterial color="#0a0b0e" roughness={0.3} clearcoat={0.6} clearcoatRoughness={0.2} />
      </RoundedBox>
      <mesh position={[0, SCREEN.y - SCREEN.h / 2 - 0.02, 0.0005]}><circleGeometry args={[0.006, 24]} /><meshStandardMaterial color="#2a2d33" metalness={0.8} roughness={0.3} /></mesh>
      {/* rounded back shell */}
      <RoundedBox args={[SCREEN.w - 0.04, SCREEN.h - 0.05, 0.05]} radius={0.022} smoothness={5} position={[0, SCREEN.y, -0.035]} castShadow>
        <meshPhysicalMaterial color="#c5cad3" metalness={0.85} roughness={0.28} clearcoat={0.4} />
      </RoundedBox>
      {/* glass over the screen: reflections at the edges, the HTML sits on top */}
      <mesh position={[0, SCREEN.y, 0.0006]}>
        <planeGeometry args={[SCREEN.w, SCREEN.h]} />
        <meshPhysicalMaterial ref={panel} color="#04060a" emissive={glow} emissiveIntensity={0.06} roughness={0.06} metalness={0.1} clearcoat={1} clearcoatRoughness={0.04} />
      </mesh>
      <mesh position={[SCREEN.w / 2 - 0.03, SCREEN.y - SCREEN.h / 2 - 0.02, 0.001]}><circleGeometry args={[0.0022, 12]} /><meshBasicMaterial color="#5ee0c1" toneMapped={false} /></mesh>
      {/* brushed aluminium stand: hinge, neck, foot */}
      <mesh position={[0, SCREEN.y - 0.05, -0.065]} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.018, 0.018, 0.09, 24]} />{alu}</mesh>
      <RoundedBox args={[0.085, 0.42, 0.016]} radius={0.006} position={[0, 0.25, -0.1]} rotation={[0.16, 0, 0]} castShadow>{alu}</RoundedBox>
      <RoundedBox args={[0.26, 0.009, 0.2]} radius={0.004} smoothness={3} position={[0, 0.0045, -0.07]} castShadow receiveShadow>{alu}</RoundedBox>
      {/* sticky note */}
      <mesh position={[SCREEN.w / 2 - 0.03, SCREEN.y + SCREEN.h / 2 - 0.055, 0.0012]} rotation={[0, 0, 0.12]}>
        <planeGeometry args={[0.07, 0.07]} /><meshStandardMaterial color="#ffe27a" roughness={0.9} />
      </mesh>
      {children}
    </group>
  );
}

/* ═════════════ keyboard ═════════════ */
const U = 0.0285;
type KeyDef = { id: string; legend: string; w: number; accent?: boolean };
const R = (s: string): KeyDef[] => s.split("").map((c) => ({ id: c, legend: c, w: 1 }));
const ROWS: KeyDef[][] = [
  [{ id: "ESC", legend: "esc", w: 1, accent: true }, ...R("1234567890"), { id: "BACK", legend: "⌫", w: 1.5 }],
  [{ id: "TAB", legend: "tab", w: 1.5 }, ...R("QWERTYUIOP"), { id: "-", legend: "-", w: 1 }],
  [{ id: "CAPS", legend: "caps", w: 1.75 }, ...R("ASDFGHJKL"), { id: "ENTER", legend: "↵", w: 1.75, accent: true }],
  [{ id: "SHIFT", legend: "shift", w: 2.25 }, ...R("ZXCVBNM"), { id: ",", legend: ",", w: 1 }, { id: ".", legend: ".", w: 1 }, { id: "RSHIFT", legend: "shift", w: 1.25 }],
  [{ id: "CTRL", legend: "ctrl", w: 1.25 }, { id: "ALT", legend: "⌥", w: 1.25 }, { id: "CMD", legend: "⌘", w: 1.25 }, { id: " ", legend: "", w: 5.5 }, { id: "RCMD", legend: "⌘", w: 1.25 }, { id: "RALT", legend: "⌥", w: 1 }, { id: "FN", legend: "fn", w: 1 }],
];
const NAME = new Set("TARANG");
const WIDTH = 12.5;

type Key = KeyDef & { x: number; z: number; row: number };
const KEYS: Key[] = ROWS.flatMap((row, ri) => {
  let x = -WIDTH / 2;
  return row.map((k) => { const c = { ...k, x: (x + k.w / 2) * U, z: (ri - 2) * U, row: ri }; x += k.w; return c; });
});
const LEGENDS = [...new Set(KEYS.map((k) => k.legend).filter(Boolean))];
const PROFILE = [-0.09, -0.045, 0, 0.04, 0.07]; // sculpted rows

export function Keyboard3D({ listen = false, glow, legends = true }: { listen?: boolean; glow?: Color; legends?: boolean }) {
  const [fonts, setFonts] = useState(false);
  useEffect(() => { ready().then(() => setFonts(true)); }, []);
  const geos = useMemo(() => {
    const m = new Map<number, RoundedBoxGeometry>();
    KEYS.forEach((k) => { if (!m.has(k.w)) m.set(k.w, new RoundedBoxGeometry(U * k.w - U * 0.13, 0.013, U * 0.87, 3, 0.0042)); });
    return m;
  }, []);
  const mats = useMemo(() => KEYS.map((k) => new MeshPhysicalMaterial({
    color: k.accent ? "#ffb547" : NAME.has(k.id) ? "#3a3f4a" : "#2a2e36", roughness: 0.48, clearcoat: 0.25, clearcoatRoughness: 0.5,
    emissive: AMBER, emissiveIntensity: 0,
  })), []);
  const legendPlane = useMemo(() => new PlaneGeometry(U * 0.62, U * 0.62), []);
  const legendMats = useMemo(() => {
    if (!legends || !fonts) return null;
    const atlas = legendAtlas(LEGENDS);
    return KEYS.map((k) => {
      const i = LEGENDS.indexOf(k.legend);
      if (i < 0) return null;
      const t = atlas.clone();
      t.repeat.set(1 / LEGEND_CELLS, 1 / LEGEND_CELLS);
      t.offset.set((i % LEGEND_CELLS) / LEGEND_CELLS, 1 - (Math.floor(i / LEGEND_CELLS) + 1) / LEGEND_CELLS);
      return new MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, color: k.accent ? "#2a1a05" : "#ffffff", opacity: k.accent ? 0.85 : 0.9 });
    });
  }, [legends, fonts]);
  const meshes = useRef<(Group | null)[]>([]);
  const hot = useRef<Map<string, number>>(new Map());
  const under = useRef<MeshBasicMaterial>(null);

  useEffect(() => {
    const press = (c: string) => hot.current.set(c === " " ? " " : c.toUpperCase(), performance.now());
    const bus = (e: Event) => { const d = (e as CustomEvent<string>).detail; press(d); playKey(d === " " ? "space" : "key"); };
    const kd = (e: KeyboardEvent) => { if (e.key.length === 1) press(e.key); if (e.key === "Enter") press("ENTER"); if (e.key === "Backspace") press("BACK"); if (e.key === "Escape") press("ESC"); };
    window.addEventListener("desk:key", bus);
    if (listen) window.addEventListener("keydown", kd);
    return () => { window.removeEventListener("desk:key", bus); window.removeEventListener("keydown", kd); };
  }, [listen]);

  useFrame(() => {
    const now = performance.now();
    KEYS.forEach((k, i) => {
      const t = hot.current.get(k.id);
      const a = t ? Math.max(0, 1 - (now - t) / 260) : 0;
      const m = meshes.current[i];
      if (m) m.position.y = 0.023 - a * 0.005;
      mats[i].emissiveIntensity = MathUtils.lerp(mats[i].emissiveIntensity, a * 2.6, 0.35);
    });
    if (under.current && glow) under.current.color.lerp(glow, 0.06);
  });

  return (
    <group position={[0, 0.004, 0.17]} rotation={[0.07, 0, 0]}>
      {/* underglow, tinted by the current stop */}
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[U * (WIDTH + 1.6), U * 6.6]} />
        <meshBasicMaterial ref={under} color="#5ee0c1" transparent opacity={0.22} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      {/* anodised case + inset plate */}
      <RoundedBox args={[U * (WIDTH + 0.8), 0.02, U * 5.8]} radius={0.007} smoothness={4} position={[0, 0.01, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#30343c" metalness={0.82} roughness={0.34} clearcoat={0.6} clearcoatRoughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0.0202, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[U * (WIDTH + 0.2), U * 5.2]} /><meshStandardMaterial color="#0d0e11" roughness={0.8} /></mesh>
      {/* volume knob */}
      <mesh position={[U * (WIDTH / 2 + 0.05), 0.03, -U * 2.75]} castShadow><cylinderGeometry args={[0.009, 0.009, 0.016, 32]} /><meshStandardMaterial color="#ffb547" metalness={0.9} roughness={0.25} /></mesh>
      {KEYS.map((k, i) => (
        <group key={k.id} ref={(m) => { meshes.current[i] = m; }} position={[k.x, 0.023, k.z]} rotation={[PROFILE[k.row], 0, 0]}>
          <mesh geometry={geos.get(k.w)} material={mats[i]} castShadow />
          {legendMats?.[i] && <mesh geometry={legendPlane} material={legendMats[i]!} position={[k.w > 1 ? -U * (k.w - 1) * 0.3 : 0, 0.0067, 0]} rotation={[-Math.PI / 2, 0, 0]} />}
        </group>
      ))}
    </group>
  );
}

/* ═════════════ lamp ═════════════ */
function Spring({ len }: { len: number }) {
  const geo = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i <= 120; i++) { const t = i / 120; pts.push(new Vector3(Math.cos(t * 44) * 0.005, t * len, Math.sin(t * 44) * 0.005)); }
    return new CatmullRomCurve3(pts);
  }, [len]);
  return <mesh><tubeGeometry args={[geo, 160, 0.0011, 5, false]} /><meshStandardMaterial color="#c8ccd4" metalness={1} roughness={0.25} /></mesh>;
}

export function Lamp3D({ on, onToggle }: { on: boolean; onToggle?: () => void }) {
  const spot = useRef<SpotLight>(null);
  const bulb = useRef<MeshStandardMaterial>(null);
  const rim = useRef<MeshBasicMaterial>(null);
  const t0 = useRef(0);
  const wasOn = useRef(on);
  const shade = useMemo(() => new LatheGeometry([new Vector2(0.012, 0), new Vector2(0.03, 0.006), new Vector2(0.06, 0.04), new Vector2(0.075, 0.085), new Vector2(0.078, 0.095)], 48), []);
  const base = useMemo(() => new LatheGeometry([new Vector2(0, 0), new Vector2(0.085, 0), new Vector2(0.09, 0.006), new Vector2(0.08, 0.018), new Vector2(0.025, 0.026), new Vector2(0, 0.028)], 48), []);
  const cable = useMemo(() => new CatmullRomCurve3([new Vector3(0.02, 0.01, -0.02), new Vector3(0.1, 0.004, -0.12), new Vector3(0.18, 0.003, -0.3), new Vector3(0.22, -0.02, -0.5)]), []);
  useFrame((s) => {
    if (on && !wasOn.current) t0.current = s.clock.elapsedTime;
    wasOn.current = on;
    const since = s.clock.elapsedTime - t0.current;
    const flicker = on && since < 0.7 ? (Math.sin(since * 60) > 0.2 ? 1 : 0.15) : 1;
    if (spot.current) spot.current.intensity = MathUtils.lerp(spot.current.intensity, on ? 9 * flicker : 0, 0.25);
    if (bulb.current) bulb.current.emissiveIntensity = MathUtils.lerp(bulb.current.emissiveIntensity, on ? 7 * flicker : 0.05, 0.25);
    if (rim.current) rim.current.opacity = MathUtils.lerp(rim.current.opacity, on ? 0.9 * flicker : 0, 0.25);
  });
  const enamel = <meshPhysicalMaterial color="#1f232b" metalness={0.55} roughness={0.32} clearcoat={0.8} clearcoatRoughness={0.2} />;
  const chrome = <meshStandardMaterial color="#d6dae2" metalness={1} roughness={0.18} />;
  const Arm = ({ len }: { len: number }) => (
    <>
      {[-0.008, 0.008].map((z) => <mesh key={z} position={[0, len / 2, z]} castShadow><cylinderGeometry args={[0.0045, 0.0045, len, 12]} />{enamel}</mesh>)}
      <group position={[0.012, 0.02, 0]}><Spring len={len * 0.55} /></group>
    </>
  );
  return (
    <group position={[1.05, 0, -0.1]} onClick={(e) => { e.stopPropagation(); onToggle?.(); }} onPointerOver={() => (document.body.style.cursor = "pointer")} onPointerOut={() => (document.body.style.cursor = "")}>
      <mesh geometry={base} castShadow receiveShadow>{enamel}</mesh>
      <mesh><tubeGeometry args={[cable, 40, 0.003, 6, false]} /><meshStandardMaterial color="#111" roughness={0.7} /></mesh>
      <group position={[0, 0.028, 0]} rotation={[0, 0, 0.32]}>
        <mesh><sphereGeometry args={[0.014, 20, 16]} />{chrome}</mesh>
        <Arm len={0.4} />
        <group position={[0, 0.4, 0]} rotation={[0, 0, 0.95]}>
          <mesh><sphereGeometry args={[0.012, 20, 16]} />{chrome}</mesh>
          <Arm len={0.34} />
          <group position={[0, 0.34, 0]} rotation={[0, 0, 0.9]}>
            <mesh><sphereGeometry args={[0.011, 20, 16]} />{chrome}</mesh>
            <group rotation={[Math.PI, 0, 0]} position={[0, 0.01, 0]}>
              <mesh geometry={shade} castShadow><meshPhysicalMaterial color="#1f232b" metalness={0.5} roughness={0.3} clearcoat={0.9} side={DoubleSide} /></mesh>
              <mesh position={[0, 0.095, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.076, 0.003, 8, 48]} /><meshBasicMaterial ref={rim} color="#ffd38a" transparent opacity={0} toneMapped={false} /></mesh>
              <mesh position={[0, 0.05, 0]}><sphereGeometry args={[0.024, 24, 20]} /><meshStandardMaterial ref={bulb} color="#fff1c9" emissive="#ffc46b" emissiveIntensity={0.05} toneMapped={false} /></mesh>
            </group>
            <spotLight ref={spot} position={[0, -0.06, 0]} angle={0.72} penumbra={0.8} distance={2.4} decay={1.4} color="#ffb766" intensity={0} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} shadow-radius={3}>
              <object3D attach="target" position={[0, -1, 0]} />
            </spotLight>
          </group>
        </group>
      </group>
    </group>
  );
}

/* ═════════════ plant ═════════════ */
function leafGeometry(len: number, width: number, bend: number) {
  const g = new PlaneGeometry(width, len, 4, 14);
  const p = g.attributes.position;
  const colors: number[] = [];
  const dark = new Color("#1f5c3f"), light = new Color("#5fae78"), c = new Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i) + len / 2; // 0..len
    const t = y / len;
    const taper = Math.sin(Math.PI * Math.min(1, t * 1.05)) * (1 - t * 0.35);
    p.setX(i, x * taper);
    p.setY(i, y);
    p.setZ(i, bend * t * t * len + Math.abs(x) * 0.25); // arch + a shallow V along the midrib
    c.copy(dark).lerp(light, t * 0.8 + (Math.abs(x) < width * 0.08 ? 0.25 : 0));
    colors.push(c.r, c.g, c.b);
  }
  g.setAttribute("color", new Float32BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

export function Plant3D() {
  const leaves = useMemo(() => Array.from({ length: 13 }, (_, i) => ({ a: (i / 13) * Math.PI * 2 + (i % 2) * 0.2, tilt: 0.18 + (i % 4) * 0.12, geo: leafGeometry(0.17 + ((i * 7) % 5) * 0.03, 0.05, 0.35 + (i % 3) * 0.15), ph: i * 0.7 })), []);
  const pot = useMemo(() => new LatheGeometry([new Vector2(0, 0), new Vector2(0.062, 0), new Vector2(0.066, 0.006), new Vector2(0.082, 0.14), new Vector2(0.09, 0.15), new Vector2(0.09, 0.158), new Vector2(0.08, 0.158), new Vector2(0.074, 0.15)], 48), []);
  const refs = useRef<(Group | null)[]>([]);
  const leafMat = useMemo(() => new MeshStandardMaterial({ vertexColors: true, side: DoubleSide, roughness: 0.55 }), []);
  useFrame((s) => refs.current.forEach((g, i) => { if (g) g.rotation.x = leaves[i].tilt + Math.sin(s.clock.elapsedTime * 0.7 + leaves[i].ph) * 0.03; }));
  return (
    <group position={[-0.86, 0, -0.18]}>
      <mesh position={[0, 0.004, 0]} receiveShadow castShadow><cylinderGeometry args={[0.1, 0.095, 0.008, 48]} /><meshPhysicalMaterial color="#cfc6b5" roughness={0.35} clearcoat={0.6} /></mesh>
      <mesh geometry={pot} position={[0, 0.008, 0]} castShadow receiveShadow><meshPhysicalMaterial color="#1f4f4a" roughness={0.25} clearcoat={1} clearcoatRoughness={0.12} side={DoubleSide} /></mesh>
      <mesh position={[0, 0.15, 0]}><cylinderGeometry args={[0.076, 0.076, 0.006, 40]} /><meshStandardMaterial color="#2a1d14" roughness={1} /></mesh>
      {[[0.03, 0.02], [-0.035, 0.01], [0.01, -0.04], [-0.02, -0.03]].map(([x, z], i) => <mesh key={i} position={[x, 0.155, z]} scale={[1, 0.7, 1]}><sphereGeometry args={[0.008, 10, 8]} /><meshStandardMaterial color="#cfc9bd" roughness={0.6} /></mesh>)}
      <group position={[0, 0.152, 0]}>
        {leaves.map((l, i) => (
          <group key={i} rotation={[0, l.a, 0]}>
            <group ref={(g) => { refs.current[i] = g; }} rotation={[l.tilt, 0, 0]}>
              <mesh geometry={l.geo} material={leafMat} castShadow />
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ═════════════ mug ═════════════ */
export function Mug3D() {
  const body = useMemo(() => new LatheGeometry([new Vector2(0, 0), new Vector2(0.031, 0), new Vector2(0.034, 0.003), new Vector2(0.036, 0.008), new Vector2(0.038, 0.098), new Vector2(0.0385, 0.101), new Vector2(0.0355, 0.101), new Vector2(0.034, 0.012), new Vector2(0, 0.012)], 48), []);
  const tex = useMemo(() => puff(), []);
  const puffs = useRef<(Sprite | null)[]>([]);
  useFrame((s) => puffs.current.forEach((p, i) => {
    if (!p) return;
    const t = (s.clock.elapsedTime * 0.22 + i / 4) % 1;
    p.position.set(Math.sin(t * 5 + i * 2) * 0.012, 0.11 + t * 0.16, 0);
    p.scale.setScalar(0.03 + t * 0.06);
    (p.material as SpriteMaterial).opacity = Math.sin(t * Math.PI) * 0.22;
  }));
  return (
    <group position={[0.5, 0, 0.2]}>
      <mesh geometry={body} castShadow receiveShadow><meshPhysicalMaterial color="#ece6d8" roughness={0.28} clearcoat={0.9} clearcoatRoughness={0.15} side={DoubleSide} /></mesh>
      <mesh position={[0, 0.086, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.0345, 40]} /><meshPhysicalMaterial color="#2a170c" roughness={0.12} clearcoat={1} /></mesh>
      <mesh position={[0, 0.0862, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.022, 0.0345, 40]} /><meshStandardMaterial color="#9a6a3c" roughness={0.6} transparent opacity={0.65} /></mesh>
      <mesh position={[0.046, 0.052, 0]} castShadow><torusGeometry args={[0.022, 0.0055, 16, 32, Math.PI * 1.15]} /><meshPhysicalMaterial color="#ece6d8" roughness={0.28} clearcoat={0.9} /></mesh>
      {Array.from({ length: 4 }, (_, i) => (
        <sprite key={i} ref={(p) => { puffs.current[i] = p; }}><spriteMaterial map={tex} transparent opacity={0} depthWrite={false} /></sprite>
      ))}
    </group>
  );
}

/* ═════════════ phone ═════════════ */
const NOTES: [string, string, string][] = [
  ["09:00", "priinteve", "Good morning. New print orders came in overnight."],
  ["09:30", "calendar", "Standup in 5 minutes."],
  ["10:30", "github", "otp-forge: new star"],
  ["12:30", "build", "Compiled successfully."],
  ["13:30", "reading", "Lunch break: one chapter."],
  ["15:00", "review", "Questions answered: all."],
  ["16:30", "debugger", "Breakpoints cleared."],
  ["18:00", "deploy", "Production is live."],
  ["21:30", "you?", "New message from a future client"],
];

export function Phone3D({ ping }: { ping: number }) {
  const scr = useRef<MeshStandardMaterial>(null);
  const t0 = useRef(0);
  const last = useRef(-1);
  const [fonts, setFonts] = useState(false);
  useEffect(() => { ready().then(() => setFonts(true)); }, []);
  const tex = useMemo(() => (fonts ? phoneScreen(...(NOTES[ping] ?? NOTES[0])) : null), [ping, fonts]);
  useFrame((s) => {
    if (last.current !== ping) { last.current = ping; t0.current = s.clock.elapsedTime; }
    const a = Math.max(0, 1 - (s.clock.elapsedTime - t0.current) / 3);
    if (scr.current) scr.current.emissiveIntensity = 0.5 + a * 0.9;
  });
  return (
    <group position={[-0.5, 0.0055, 0.2]} rotation={[0, 0.35, 0]}>
      <RoundedBox args={[0.075, 0.009, 0.155]} radius={0.004} smoothness={4} castShadow><meshPhysicalMaterial color="#1a1c22" metalness={0.7} roughness={0.25} clearcoat={0.8} /></RoundedBox>
      {[[-0.0385, 0.02], [-0.0385, -0.005], [0.0385, 0.01]].map(([x, z], i) => <mesh key={i} position={[x, 0, -z]}><boxGeometry args={[0.002, 0.004, i === 2 ? 0.025 : 0.016]} /><meshStandardMaterial color="#2e323a" metalness={0.8} roughness={0.3} /></mesh>)}
      <mesh position={[0, 0.0047, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.068, 0.147]} />
        <meshStandardMaterial ref={scr} color="#0d1020" map={tex ?? undefined} emissive="#ffffff" emissiveMap={tex ?? undefined} emissiveIntensity={0.5} roughness={0.15} />
      </mesh>
    </group>
  );
}

/* ═════════════ books + notebook ═════════════ */
const BOOKS = [["PRD", "#ffb547", "#2a1a05", 0.04], ["ARCH", "#2f8f7c", "#e9fff9", 0.032], ["SKETCH", "#7a6ad8", "#f1eeff", 0.038], ["LOG", "#e9e4d8", "#23211d", 0.03]] as const;

export function Books() {
  const [fonts, setFonts] = useState(false);
  useEffect(() => { ready().then(() => setFonts(true)); }, []);
  let y = 0;
  return (
    <group position={[-0.55, 0, -0.38]} rotation={[0, 0.25, 0]}>
      {BOOKS.map(([t, bg, fg, h], i) => {
        const w = 0.26 - i * 0.015, d = 0.19 - i * 0.01, yy = y + h / 2;
        y += h;
        return (
          <group key={t} position={[0, yy, 0]} rotation={[0, (i % 2 ? -1 : 1) * 0.06, 0]}>
            <RoundedBox args={[w, h, d]} radius={0.003} castShadow receiveShadow><meshStandardMaterial color={bg} roughness={0.75} /></RoundedBox>
            <mesh position={[0.004, 0, 0.002]}><boxGeometry args={[w - 0.012, h - 0.008, d + 0.0005]} /><meshStandardMaterial color="#f1ead9" roughness={0.95} /></mesh>
            {fonts && <mesh position={[0, 0, d / 2 + 0.0012]}><planeGeometry args={[w, h]} /><meshStandardMaterial map={spine(t, bg, fg)} roughness={0.7} /></mesh>}
          </group>
        );
      })}
    </group>
  );
}

export function Notebook() {
  const [fonts, setFonts] = useState(false);
  useEffect(() => { ready().then(() => setFonts(true)); }, []);
  const page = fonts ? ruled() : null;
  return (
    <group position={[0.34, 0.004, 0.36]} rotation={[0, -0.25, 0]}>
      <RoundedBox args={[0.34, 0.006, 0.23]} radius={0.003} castShadow receiveShadow><meshStandardMaterial color="#232832" roughness={0.85} /></RoundedBox>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.083, 0.0045, 0]} rotation={[-Math.PI / 2, s * 0.03, 0]} receiveShadow>
          <planeGeometry args={[0.16, 0.22]} /><meshStandardMaterial color="#efe9dc" map={s < 0 && page ? page : undefined} roughness={0.95} />
        </mesh>
      ))}
      <group position={[0.07, 0.01, 0.02]} rotation={[0, 0.6, Math.PI / 2]}>
        <mesh castShadow><cylinderGeometry args={[0.0045, 0.0045, 0.14, 16]} /><meshPhysicalMaterial color="#ffb547" metalness={0.6} roughness={0.25} clearcoat={1} /></mesh>
        <mesh position={[0, -0.078, 0]}><coneGeometry args={[0.0045, 0.016, 16]} /><meshStandardMaterial color="#d6dae2" metalness={1} roughness={0.2} /></mesh>
      </group>
    </group>
  );
}

/* ═════════════ wall clock ═════════════ */
export function Clock3D({ hour }: { hour: { current: number } }) {
  const hr = useRef<Group>(null);
  const mn = useRef<Group>(null);
  useFrame(() => {
    const h = hour.current;
    if (hr.current) hr.current.rotation.z = -((h % 12) / 12) * Math.PI * 2;
    if (mn.current) mn.current.rotation.z = -(h % 1) * Math.PI * 2;
  });
  return (
    <group position={[1.15, 1.25, -1.08]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.16, 0.16, 0.03, 64]} /><meshPhysicalMaterial color="#0f1014" metalness={0.6} roughness={0.35} clearcoat={0.8} /></mesh>
      <mesh position={[0, 0, 0.016]}><circleGeometry args={[0.145, 64]} /><meshStandardMaterial color="#ece6d8" roughness={0.6} /></mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[Math.sin((i / 12) * Math.PI * 2) * 0.125, Math.cos((i / 12) * Math.PI * 2) * 0.125, 0.018]} rotation={[0, 0, -(i / 12) * Math.PI * 2]}>
          <planeGeometry args={[0.006, i % 3 ? 0.012 : 0.022]} /><meshBasicMaterial color="#23211d" />
        </mesh>
      ))}
      <group ref={hr} position={[0, 0, 0.02]}><mesh position={[0, 0.032, 0]}><planeGeometry args={[0.01, 0.075]} /><meshBasicMaterial color="#23211d" /></mesh></group>
      <group ref={mn} position={[0, 0, 0.021]}><mesh position={[0, 0.048, 0]}><planeGeometry args={[0.006, 0.11]} /><meshBasicMaterial color="#23211d" /></mesh></group>
      <mesh position={[0, 0, 0.022]}><circleGeometry args={[0.008, 16]} /><meshBasicMaterial color="#ff7a3d" /></mesh>
      {/* glass dome */}
      <mesh position={[0, 0, 0.026]}><circleGeometry args={[0.15, 64]} /><meshPhysicalMaterial color="#ffffff" transparent opacity={0.08} roughness={0.05} clearcoat={1} /></mesh>
    </group>
  );
}

/* ═════════════ shelf props ═════════════ */
export function ShelfProps() {
  const [fonts, setFonts] = useState(false);
  useEffect(() => { ready().then(() => setFonts(true)); }, []);
  return (
    <group>
      {/* film camera */}
      <group position={[0.12, 0.05, 0.01]} rotation={[0, -0.35, 0]}>
        <RoundedBox args={[0.12, 0.07, 0.045]} radius={0.008} castShadow><meshStandardMaterial color="#1c1d21" roughness={0.6} /></RoundedBox>
        <mesh position={[0, 0.03, 0]}><boxGeometry args={[0.125, 0.012, 0.047]} /><meshStandardMaterial color="#c9ccd2" metalness={0.95} roughness={0.25} /></mesh>
        <mesh position={[0, -0.003, 0.034]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.022, 0.024, 0.03, 32]} /><meshStandardMaterial color="#141518" metalness={0.6} roughness={0.35} /></mesh>
        <mesh position={[0, -0.003, 0.05]}><circleGeometry args={[0.016, 32]} /><meshPhysicalMaterial color="#0b1430" roughness={0.02} clearcoat={1} metalness={0.4} /></mesh>
      </group>
      {/* speaker */}
      <group position={[0.25, 0.06, 0]}>
        <RoundedBox args={[0.07, 0.11, 0.07]} radius={0.01} castShadow><meshPhysicalMaterial color="#e3ddd1" roughness={0.6} sheen={1} sheenColor="#ffffff" /></RoundedBox>
        <mesh position={[0, 0.005, 0.036]}><circleGeometry args={[0.022, 32]} /><meshStandardMaterial color="#2a2c31" roughness={0.9} /></mesh>
      </group>
      {/* npm cube */}
      <mesh position={[-0.05, 0.035, 0.02]} rotation={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshStandardMaterial color="#cb3837" map={fonts ? label("npm", "#cb3837", "#ffffff") : undefined} roughness={0.5} />
      </mesh>
    </group>
  );
}
