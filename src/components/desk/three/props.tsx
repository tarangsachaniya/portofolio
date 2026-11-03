"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Color, MathUtils, MeshStandardMaterial, type Group, type Mesh, type SpotLight } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { playKey } from "../../shell/sound";

const AMBER = new Color("#ffb547");

/* ───────────── desk ───────────── */
export function Desk() {
  return (
    <group>
      {/* top: warm walnut slab */}
      <RoundedBox args={[2.6, 0.05, 1.1]} radius={0.012} smoothness={3} position={[0, -0.025, 0]} receiveShadow castShadow>
        <meshStandardMaterial color="#5a3a26" roughness={0.55} metalness={0.05} />
      </RoundedBox>
      {/* legs */}
      {[[-1.2, -0.45], [1.2, -0.45], [-1.2, 0.45], [1.2, 0.45]].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, -0.42, z]} castShadow>
          <boxGeometry args={[0.05, 0.74, 0.05]} />
          <meshStandardMaterial color="#141519" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
      {/* felt desk mat */}
      <RoundedBox args={[1.05, 0.004, 0.42]} radius={0.002} position={[0, 0.002, 0.12]} receiveShadow>
        <meshStandardMaterial color="#1c1e24" roughness={0.95} />
      </RoundedBox>
    </group>
  );
}

/* ───────────── monitor ───────────── */
export const SCREEN = { w: 1.0, h: 0.625, y: 0.53, z: -0.22 };

export function Monitor({ glow, children }: { glow: Color; children?: React.ReactNode }) {
  const panel = useRef<MeshStandardMaterial>(null);
  useFrame(() => panel.current?.emissive.lerp(glow, 0.08));
  return (
    <group position={[0, 0, SCREEN.z]}>
      <RoundedBox args={[SCREEN.w + 0.035, SCREEN.h + 0.035, 0.03]} radius={0.012} smoothness={4} position={[0, SCREEN.y, -0.016]} castShadow>
        <meshStandardMaterial color="#0c0d10" metalness={0.7} roughness={0.28} />
      </RoundedBox>
      {/* glass behind the HTML screen: a faint glow that feeds the bloom at the edges */}
      <mesh position={[0, SCREEN.y, 0.0005]}>
        <planeGeometry args={[SCREEN.w, SCREEN.h]} />
        <meshStandardMaterial ref={panel} color="#05070a" emissive={glow} emissiveIntensity={0.06} roughness={0.15} metalness={0.2} />
      </mesh>
      {/* power LED */}
      <mesh position={[0, SCREEN.y - SCREEN.h / 2 - 0.009, 0.001]}>
        <circleGeometry args={[0.0025, 12]} />
        <meshBasicMaterial color="#5ee0c1" toneMapped={false} />
      </mesh>
      {/* stand */}
      <mesh position={[0, 0.17, -0.06]} rotation={[0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.07, 0.34, 0.025]} />
        <meshStandardMaterial color="#1a1c21" metalness={0.8} roughness={0.25} />
      </mesh>
      <RoundedBox args={[0.32, 0.012, 0.2]} radius={0.005} position={[0, 0.006, -0.04]} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1c21" metalness={0.8} roughness={0.25} />
      </RoundedBox>
      {/* sticky note on the bezel */}
      <mesh position={[SCREEN.w / 2 - 0.02, SCREEN.y + SCREEN.h / 2 - 0.05, 0.002]} rotation={[0, 0, 0.12]}>
        <planeGeometry args={[0.07, 0.07]} />
        <meshStandardMaterial color="#ffe27a" roughness={0.9} />
      </mesh>
      {children}
    </group>
  );
}

/* ───────────── keyboard ───────────── */
const ROWS = ["1234567890", "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const NAME = new Set("TARANG");
const U = 0.0285;

type Key = { id: string; x: number; z: number; w: number };
function layout(): Key[] {
  const keys: Key[] = [];
  ROWS.forEach((r, ri) => {
    const off = [0, 0.5, 0.75, 1.25][ri];
    r.split("").forEach((c, ci) => keys.push({ id: c, x: (ci + off - 5) * U, z: (ri - 2) * U, w: 1 }));
  });
  keys.push({ id: " ", x: -0.5 * U, z: 2 * U, w: 6 });
  keys.push({ id: "ENTER", x: 5.4 * U, z: 0, w: 1.8 });
  keys.push({ id: "BACK", x: 5.6 * U, z: -2 * U, w: 1.6 });
  return keys;
}

export function Keyboard3D({ listen = false }: { listen?: boolean }) {
  const keys = useMemo(layout, []);
  const geo = useMemo(() => new RoundedBoxGeometry(U * 0.86, 0.012, U * 0.86, 2, 0.003), []);
  const wide = useMemo(() => new Map([[" ", new RoundedBoxGeometry(U * 6 - U * 0.14, 0.012, U * 0.86, 2, 0.003)], ["ENTER", new RoundedBoxGeometry(U * 1.8 - U * 0.14, 0.012, U * 0.86, 2, 0.003)], ["BACK", new RoundedBoxGeometry(U * 1.6 - U * 0.14, 0.012, U * 0.86, 2, 0.003)]]), []);
  const mats = useMemo(() => keys.map((k) => new MeshStandardMaterial({ color: NAME.has(k.id) ? "#2b2f38" : "#1f2228", roughness: 0.55, metalness: 0.1, emissive: AMBER, emissiveIntensity: 0 })), [keys]);
  const meshes = useRef<(Mesh | null)[]>([]);
  const hot = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const press = (c: string) => hot.current.set(c === " " ? " " : c.toUpperCase(), performance.now());
    const bus = (e: Event) => { const d = (e as CustomEvent<string>).detail; press(d); playKey(d === " " ? "space" : "key"); };
    const kd = (e: KeyboardEvent) => { if (e.key.length === 1) press(e.key); if (e.key === "Enter") press("ENTER"); if (e.key === "Backspace") press("BACK"); };
    window.addEventListener("desk:key", bus);
    if (listen) window.addEventListener("keydown", kd);
    return () => { window.removeEventListener("desk:key", bus); window.removeEventListener("keydown", kd); };
  }, [listen]);

  useFrame(() => {
    const now = performance.now();
    keys.forEach((k, i) => {
      const t = hot.current.get(k.id);
      const a = t ? Math.max(0, 1 - (now - t) / 260) : 0;
      const m = meshes.current[i];
      if (m) m.position.y = 0.022 - a * 0.005;
      mats[i].emissiveIntensity = MathUtils.lerp(mats[i].emissiveIntensity, a * 2.4 + (NAME.has(k.id) ? 0.04 : 0), 0.35);
    });
  });

  return (
    <group position={[0, 0.004, 0.17]} rotation={[0.07, 0, 0]}>
      <RoundedBox args={[U * 12.6, 0.018, U * 5.6]} radius={0.006} smoothness={3} position={[0, 0.009, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#121317" metalness={0.5} roughness={0.35} />
      </RoundedBox>
      {keys.map((k, i) => (
        <mesh key={k.id} ref={(m) => { meshes.current[i] = m; }} geometry={wide.get(k.id) ?? geo} material={mats[i]} position={[k.x + (k.w - 1) * U * 0.5 * (k.id === " " ? 0 : 1), 0.022, k.z]} castShadow />
      ))}
    </group>
  );
}

/* ───────────── lamp ───────────── */
export function Lamp3D({ on, onToggle }: { on: boolean; onToggle?: () => void }) {
  const spot = useRef<SpotLight>(null);
  const bulb = useRef<MeshStandardMaterial>(null);
  const t0 = useRef(0);
  const wasOn = useRef(on);
  useFrame((s) => {
    if (on && !wasOn.current) t0.current = s.clock.elapsedTime;
    wasOn.current = on;
    const since = s.clock.elapsedTime - t0.current;
    const flicker = on && since < 0.7 ? (Math.sin(since * 60) > 0.2 ? 1 : 0.15) : 1;
    const target = on ? 9 * flicker : 0;
    if (spot.current) spot.current.intensity = MathUtils.lerp(spot.current.intensity, target, 0.25);
    if (bulb.current) bulb.current.emissiveIntensity = MathUtils.lerp(bulb.current.emissiveIntensity, on ? 6 * flicker : 0.05, 0.25);
  });
  const metal = <meshStandardMaterial color="#2a2e37" metalness={0.75} roughness={0.3} />;
  return (
    <group position={[1.05, 0, -0.1]} onClick={(e) => { e.stopPropagation(); onToggle?.(); }} onPointerOver={() => (document.body.style.cursor = "pointer")} onPointerOut={() => (document.body.style.cursor = "")}>
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow><cylinderGeometry args={[0.08, 0.09, 0.02, 32]} />{metal}</mesh>
      <group position={[0, 0.02, 0]} rotation={[0, 0, 0.32]}>
        <mesh position={[0, 0.2, 0]} castShadow><cylinderGeometry args={[0.009, 0.009, 0.4, 12]} />{metal}</mesh>
        <group position={[0, 0.4, 0]} rotation={[0, 0, 0.95]}>
          <mesh position={[0, 0.17, 0]} castShadow><cylinderGeometry args={[0.008, 0.008, 0.34, 12]} />{metal}</mesh>
          <group position={[0, 0.34, 0]} rotation={[0, 0, 0.9]}>
            <mesh position={[0, -0.03, 0]} castShadow><coneGeometry args={[0.07, 0.12, 32, 1, true]} /><meshStandardMaterial color="#2a2e37" metalness={0.6} roughness={0.35} side={2} /></mesh>
            <mesh position={[0, -0.06, 0]}><sphereGeometry args={[0.025, 20, 20]} /><meshStandardMaterial ref={bulb} color="#fff1c9" emissive="#ffc46b" emissiveIntensity={0.05} toneMapped={false} /></mesh>
            <spotLight ref={spot} position={[0, -0.07, 0]} angle={0.75} penumbra={0.75} distance={2.4} decay={1.4} color="#ffb766" intensity={0} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004}>
              <object3D attach="target" position={[0, -1, 0]} />
            </spotLight>
          </group>
        </group>
      </group>
    </group>
  );
}

/* ───────────── plant ───────────── */
export function Plant3D() {
  const g = useRef<Group>(null);
  const leaves = useMemo(() => Array.from({ length: 11 }, (_, i) => ({ a: (i / 11) * Math.PI * 2, tilt: 0.25 + (i % 3) * 0.18, len: 0.16 + ((i * 7) % 5) * 0.025, shade: i % 2 })), []);
  useFrame((s) => { if (g.current) g.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.6) * 0.025; });
  return (
    <group position={[-0.86, 0, -0.18]}>
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow><cylinderGeometry args={[0.085, 0.065, 0.16, 32]} /><meshStandardMaterial color="#c0673a" roughness={0.85} /></mesh>
      <mesh position={[0, 0.155, 0]}><cylinderGeometry args={[0.078, 0.078, 0.01, 32]} /><meshStandardMaterial color="#2a1d14" roughness={1} /></mesh>
      <group ref={g} position={[0, 0.16, 0]}>
        {leaves.map((l, i) => (
          <group key={i} rotation={[0, l.a, 0]}>
            <mesh position={[0, l.len * 0.5, 0.02]} rotation={[l.tilt, 0, 0]} scale={[0.028, l.len, 0.006]} castShadow>
              <sphereGeometry args={[1, 16, 12]} />
              <meshStandardMaterial color={l.shade ? "#2f7a55" : "#3f9466"} roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ───────────── mug with steam ───────────── */
export function Mug3D() {
  return (
    <group position={[0.5, 0, 0.2]}>
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow><cylinderGeometry args={[0.038, 0.034, 0.1, 32]} /><meshStandardMaterial color="#ece6d8" roughness={0.35} /></mesh>
      <mesh position={[0, 0.096, 0]}><cylinderGeometry args={[0.033, 0.033, 0.004, 32]} /><meshStandardMaterial color="#3b2416" roughness={0.2} /></mesh>
      <mesh position={[0.042, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} castShadow><torusGeometry args={[0.022, 0.006, 12, 24, Math.PI]} /><meshStandardMaterial color="#ece6d8" roughness={0.35} /></mesh>
    </group>
  );
}

/* ───────────── phone ───────────── */
export function Phone3D({ ping }: { ping: number }) {
  const scr = useRef<MeshStandardMaterial>(null);
  const t0 = useRef(0);
  const last = useRef(ping);
  useFrame((s) => {
    if (last.current !== ping) { last.current = ping; t0.current = s.clock.elapsedTime; }
    const a = Math.max(0, 1 - (s.clock.elapsedTime - t0.current) / 2.5);
    if (scr.current) scr.current.emissiveIntensity = 0.15 + a * 1.6;
  });
  return (
    <group position={[-0.5, 0.006, 0.2]} rotation={[0, 0.35, 0]}>
      <RoundedBox args={[0.075, 0.009, 0.155]} radius={0.004} castShadow><meshStandardMaterial color="#0b0c0f" metalness={0.6} roughness={0.25} /></RoundedBox>
      <mesh position={[0, 0.0047, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.066, 0.145]} />
        <meshStandardMaterial ref={scr} color="#0d1020" emissive="#6f7cff" emissiveIntensity={0.15} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* ───────────── books, notebook ───────────── */
export function Books() {
  const b = [["#ffb547", 0.04], ["#5ee0c1", 0.032], ["#9b8cff", 0.038], ["#e9e4d8", 0.03]] as const;
  let y = 0;
  return (
    <group position={[-0.55, 0, -0.38]} rotation={[0, 0.25, 0]}>
      {b.map(([c, h], i) => { const m = <mesh key={i} position={[0, y + h / 2, 0]} rotation={[0, (i % 2 ? -1 : 1) * 0.06, 0]} castShadow receiveShadow><boxGeometry args={[0.26 - i * 0.015, h, 0.19 - i * 0.01]} /><meshStandardMaterial color={c} roughness={0.8} /></mesh>; y += h; return m; })}
    </group>
  );
}

export function Notebook() {
  return (
    <group position={[0.36, 0.004, 0.36]} rotation={[0, -0.25, 0]}>
      <mesh castShadow receiveShadow><boxGeometry args={[0.17, 0.008, 0.22]} /><meshStandardMaterial color="#2b2f3a" roughness={0.9} /></mesh>
      <mesh position={[0.05, 0.008, 0]} rotation={[0, 0.5, Math.PI / 2]} castShadow><cylinderGeometry args={[0.004, 0.004, 0.15, 8]} /><meshStandardMaterial color="#ffb547" metalness={0.4} roughness={0.3} /></mesh>
    </group>
  );
}

/* ───────────── wall clock ───────────── */
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
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.16, 0.16, 0.03, 48]} /><meshStandardMaterial color="#0f1014" metalness={0.5} roughness={0.4} /></mesh>
      <mesh position={[0, 0, 0.016]}><circleGeometry args={[0.145, 48]} /><meshStandardMaterial color="#ece6d8" roughness={0.6} /></mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[Math.sin((i / 12) * Math.PI * 2) * 0.125, Math.cos((i / 12) * Math.PI * 2) * 0.125, 0.018]} rotation={[0, 0, -(i / 12) * Math.PI * 2]}>
          <planeGeometry args={[0.006, i % 3 ? 0.012 : 0.022]} /><meshBasicMaterial color="#23211d" />
        </mesh>
      ))}
      <group ref={hr} position={[0, 0, 0.02]}><mesh position={[0, 0.032, 0]}><planeGeometry args={[0.01, 0.075]} /><meshBasicMaterial color="#23211d" /></mesh></group>
      <group ref={mn} position={[0, 0, 0.021]}><mesh position={[0, 0.048, 0]}><planeGeometry args={[0.006, 0.11]} /><meshBasicMaterial color="#23211d" /></mesh></group>
      <mesh position={[0, 0, 0.022]}><circleGeometry args={[0.008, 16]} /><meshBasicMaterial color="#ff7a3d" /></mesh>
    </group>
  );
}
