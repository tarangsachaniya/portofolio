"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Lightformer, Environment, Sparkles, PerformanceMonitor, ContactShadows, RoundedBox } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { easing } from "maath";
import { Color, Vector3, type DirectionalLight, type HemisphereLight, type MeshStandardMaterial, type PointLight, type ShaderMaterial } from "three";
import type { MotionValue } from "framer-motion";
import { STEPS, hourAt } from "../timeline";

const SHIP_AT = STEPS.find((s) => s.id === "ship")!.at;
import { daylight } from "./daylight";
import { makeSkyMaterial } from "./SkyMaterial";
import { Books, Clock3D, Desk, Keyboard3D, Lamp3D, Monitor, Mug3D, Notebook, Phone3D, Plant3D, SCREEN, ShelfProps } from "./props";
import { planks, plaster } from "./textures";

export const SCREEN_PX = { w: 1120, h: 700 };
// one glow per stop: boot, plan, commit, build, learn, review, debug, deploy, ship
const GLOWS = ["#5ee0c1", "#9b8cff", "#ffb547", "#3b8eea", "#f6cf9a", "#ff8a5c", "#ff5f57", "#5ee0c1", "#ffb547"].map((c) => new Color(c));

export interface DeskWorldProps {
  mode: "pinned" | "mini";
  progress?: MotionValue<number>;
  /** mini mode: hour of day chosen with the slider */
  hour?: number;
  step: number;
  lampOn: boolean;
  onLamp?: () => void;
  screen?: ReactNode;
  listenKeys?: boolean;
  active?: boolean;
}

/* ───────────── camera ───────────── */
const v = (x: number, y: number, z: number) => new Vector3(x, y, z);
const WIDE = { pos: v(1.62, 1.02, 1.78), tgt: v(-0.52, 0.56, -0.35) };
const SHIP = { pos: v(0.0, 1.42, 2.02), tgt: v(0, 0.4, -0.12) };
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const seg = (p: number, a: number, b: number) => ease(Math.min(1, Math.max(0, (p - a) / (b - a))));

function CameraRig({ mode, progress }: Pick<DeskWorldProps, "mode" | "progress">) {
  const { camera, size } = useThree();
  const look = useRef(WIDE.tgt.clone());
  const tmpP = useMemo(() => new Vector3(), []);
  const tmpT = useMemo(() => new Vector3(), []);
  const screen = useMemo(() => ({ pos: new Vector3(), tgt: new Vector3() }), []);
  const first = useRef(true);

  useFrame((s, dt) => {
    if (mode === "mini") {
      // gentle front-facing sway; portrait screens pull back and aim low so the desk sits above the intro text
      const portrait = size.width < size.height;
      const a = 0.35 + Math.sin(s.clock.elapsedTime * 0.16) * 0.45;
      const r = portrait ? 4.9 : 2.3;
      tmpP.set(Math.sin(a) * r, portrait ? 1.75 : 1.05, Math.cos(a) * r);
      tmpT.set(0, portrait ? -0.46 : 0.3, -0.2);
    } else {
      const p = progress?.get() ?? 0;
      // fit the monitor between the rail and the right edge, under the nav
      const t = Math.tan((30 * Math.PI) / 360);
      const rail = size.width >= 900 ? 168 : 24;
      const dW = (SCREEN.w * 1.08 * size.height) / (2 * t * Math.max(200, size.width - 2 * rail));
      const dH = (SCREEN.h * 1.06 * size.height) / (2 * t * Math.max(200, size.height - 130));
      const d = Math.max(dW, dH);
      const ty = SCREEN.y + (28 / size.height) * 2 * d * t;
      const sway = Math.sin(p * 18) * 0.012;
      screen.pos.set(sway, ty, SCREEN.z + d);
      screen.tgt.set(sway * 0.4, ty, SCREEN.z);
      const a = seg(p, 0.012, 0.075);
      const b = seg(p, SHIP_AT - 0.04, SHIP_AT + 0.05);
      tmpP.copy(WIDE.pos).lerp(screen.pos, a).lerp(SHIP.pos, b);
      tmpT.copy(WIDE.tgt).lerp(screen.tgt, a).lerp(SHIP.tgt, b);
      if (p > SHIP_AT + 0.05) { const k = (p - SHIP_AT - 0.05) / (0.95 - SHIP_AT); tmpP.add(v(0.06 * k, 0.03 * k, 0.05 * k)); }
    }
    if (first.current) { camera.position.copy(tmpP); look.current.copy(tmpT); first.current = false; }
    easing.damp3(camera.position, tmpP, mode === "mini" ? 0.6 : 0.22, dt);
    easing.damp3(look.current, tmpT, mode === "mini" ? 0.6 : 0.22, dt);
    camera.lookAt(look.current);
  });
  return null;
}

/* ───────────── room + daylight ───────────── */
function Room({ hourRef, mode, progress, hour }: { hourRef: { current: number } } & Pick<DeskWorldProps, "mode" | "progress" | "hour">) {
  const sky = useMemo(makeSkyMaterial, []);
  const wall = useRef<MeshStandardMaterial>(null);
  const side = useRef<MeshStandardMaterial>(null);
  const sun = useRef<DirectionalLight>(null);
  const hemi = useRef<HemisphereLight>(null);
  const tmp = useMemo(() => new Color(), []);
  const floorTex = useMemo(() => planks(), []);
  const wallBump = useMemo(() => plaster(), []);

  useFrame((s, dt) => {
    const target = mode === "mini" ? hour ?? 12 : hourAt(progress?.get() ?? 0);
    hourRef.current += (target - hourRef.current) * Math.min(1, dt * 4);
    const h = hourRef.current;
    const u = (sky as ShaderMaterial).uniforms;
    daylight.skyTop(h, u.uTop.value);
    daylight.skyBot(h, u.uBot.value);
    u.uSun.value.set(...daylight.sunUv(h));
    u.uMoon.value.set(...daylight.moonUv(h));
    u.uStars.value = daylight.stars(h);
    u.uLights.value = daylight.cityLights(h);
    u.uTime.value = s.clock.elapsedTime;
    if (wall.current) daylight.wall(h, wall.current.color);
    if (side.current) daylight.wall(h, side.current.color).multiplyScalar(0.8);
    if (sun.current) { daylight.sun(h, sun.current.color); sun.current.intensity = daylight.sunI(h); }
    if (hemi.current) { daylight.hemi(h, hemi.current.color); hemi.current.intensity = daylight.ambient(h); }
    s.scene.fog?.color.copy(daylight.wall(h, tmp).multiplyScalar(0.5));
  });

  return (
    <>
      <hemisphereLight ref={hemi} groundColor="#1a1410" intensity={0.5} />
      <directionalLight ref={sun} position={[-2.2, 2.6, -2.4]} intensity={2.6} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0003} shadow-normalBias={0.02} shadow-radius={4}
        shadow-camera-left={-2} shadow-camera-right={2} shadow-camera-top={2} shadow-camera-bottom={-2} shadow-camera-far={10} />
      <directionalLight position={[2.2, 1.6, 1.8]} intensity={0.25} color="#9fb4ff" />
      {/* rim light from behind-right so silhouettes read against the wall */}
      <directionalLight position={[1.6, 1.4, -2.2]} intensity={0.55} color="#b7c4ff" />

      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.79, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial map={floorTex} roughness={0.62} />
      </mesh>
      {/* back wall with a window */}
      <mesh position={[0, 1.2, -1.1]} receiveShadow>
        <planeGeometry args={[9, 4.2]} />
        <meshStandardMaterial ref={wall} color="#3b3a40" roughness={0.95} bumpMap={wallBump} bumpScale={0.6} />
      </mesh>
      <mesh position={[-2.6, 1.2, 0.8]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[5, 4.2]} />
        <meshStandardMaterial ref={side} color="#333239" roughness={0.95} bumpMap={wallBump} bumpScale={0.6} />
      </mesh>
      <mesh position={[0, -0.73, -1.09]} castShadow receiveShadow><boxGeometry args={[9, 0.12, 0.02]} /><meshStandardMaterial color="#1b1b20" roughness={0.6} /></mesh>
      <RoundedBox args={[2.6, 0.01, 1.7]} radius={0.004} position={[0, -0.785, 0.55]} receiveShadow><meshPhysicalMaterial color="#3a2a2a" roughness={1} sheen={1} sheenColor="#6b4a4a" /></RoundedBox>
      <RoundedBox args={[2.4, 0.011, 1.5]} radius={0.004} position={[0, -0.784, 0.55]} receiveShadow><meshPhysicalMaterial color="#5a3c36" roughness={1} sheen={1} sheenColor="#a07060" /></RoundedBox>
      <group position={[-0.72, 1.18, -1.09]}>
        <mesh material={sky}><planeGeometry args={[1.5, 1.04]} /></mesh>
        {/* frame + mullions */}
        {[[0, 0.535, 1.6, 0.04], [0, -0.535, 1.6, 0.04], [-0.77, 0, 0.04, 1.1], [0.77, 0, 0.04, 1.1], [0, 0, 0.025, 1.04], [0, 0.08, 1.5, 0.025]].map(([x, y, w, h], i) => (
          <mesh key={i} position={[x, y, 0.03]} castShadow><boxGeometry args={[w, h, i > 3 ? 0.03 : 0.07]} /><meshPhysicalMaterial color="#14151a" roughness={0.4} metalness={0.4} clearcoat={0.5} /></mesh>
        ))}
        <RoundedBox args={[1.72, 0.035, 0.16]} radius={0.006} position={[0, -0.575, 0.07]} castShadow receiveShadow><meshStandardMaterial color="#d9d3c6" roughness={0.7} /></RoundedBox>
        {/* a small succulent on the sill */}
        <group position={[0.5, -0.555, 0.08]}>
          <mesh castShadow><cylinderGeometry args={[0.035, 0.028, 0.05, 32]} /><meshPhysicalMaterial color="#e9e1d3" roughness={0.3} clearcoat={0.8} /></mesh>
          {Array.from({ length: 9 }, (_, i) => (
            <mesh key={i} position={[Math.cos(i * 2.4) * 0.012 * (i % 3), 0.035, Math.sin(i * 2.4) * 0.012 * (i % 3)]} rotation={[Math.cos(i * 2.4) * 0.6, 0, Math.sin(i * 2.4) * 0.6]} castShadow>
              <coneGeometry args={[0.009, 0.04 - (i % 3) * 0.006, 8]} /><meshStandardMaterial color={i % 2 ? "#7fae8a" : "#5e9a72"} roughness={0.5} />
            </mesh>
          ))}
        </group>
      </group>
      <Clock3D hour={hourRef} />
      {/* shelf */}
      <group position={[0.85, 0.82, -1.0]}>
        <RoundedBox args={[0.8, 0.028, 0.2]} radius={0.005} castShadow receiveShadow><meshStandardMaterial color="#4c2f1d" roughness={0.55} /></RoundedBox>
        <group position={[0.02, 0.014, 0]}><ShelfProps /></group>
        {[["#ffb547", 0.2], ["#5ee0c1", 0.17], ["#9b8cff", 0.22], ["#ff8a5c", 0.15], ["#e9e4d8", 0.19]].map(([c, h], i) => (
          <mesh key={i} position={[-0.25 + i * 0.045, 0.0125 + Number(h) / 2, 0]} rotation={[0, 0, i === 4 ? -0.18 : 0]} castShadow><boxGeometry args={[0.035, Number(h), 0.13]} /><meshStandardMaterial color={String(c)} roughness={0.8} /></mesh>
        ))}
      </group>
    </>
  );
}

function ScreenGlow({ step }: { step: number }) {
  const l = useRef<PointLight>(null);
  useFrame(() => l.current?.color.lerp(GLOWS[step] ?? GLOWS[0], 0.06));
  return <pointLight ref={l} position={[0, SCREEN.y, SCREEN.z + 0.25]} intensity={0.9} distance={1.8} decay={1.5} />;
}

function World(p: DeskWorldProps & { layer: RefObject<HTMLDivElement | null>; low: boolean }) {
  const hourRef = useRef(p.mode === "mini" ? p.hour ?? 12 : 9);
  const glow = useMemo(() => new Color(), []);
  useFrame(() => glow.lerp(GLOWS[p.step] ?? GLOWS[0], 0.06));
  const df = (400 * SCREEN.w) / SCREEN_PX.w;
  return (
    <>
      <fog attach="fog" args={["#141318", 3.5, 9]} />
      <CameraRig mode={p.mode} progress={p.progress} />
      <Room hourRef={hourRef} mode={p.mode} progress={p.progress} hour={p.hour} />
      <ScreenGlow step={p.step} />
      <Desk />
      <Monitor glow={glow}>
        {p.screen && (
          <Html transform portal={p.layer as RefObject<HTMLElement>} distanceFactor={df} position={[0, SCREEN.y, 0.002]} zIndexRange={[20, 0]} className="desk-screen" style={{ width: SCREEN_PX.w, height: SCREEN_PX.h }}>
            <div className="relative h-full w-full overflow-hidden rounded-[6px] bg-[#0e1116]">{p.screen}</div>
          </Html>
        )}
      </Monitor>
      <Keyboard3D listen={p.listenKeys} glow={glow} legends={!p.low} />
      {!p.low && <ContactShadows position={[0, 0.0035, 0]} scale={[2.6, 1.1]} resolution={512} blur={2.4} opacity={0.55} far={0.6} frames={1} color="#0a0603" />}
      <Lamp3D on={p.lampOn} onToggle={p.onLamp} />
      <Plant3D />
      <Mug3D />
      <Phone3D ping={p.step} />
      <Books />
      <Notebook />
      <Sparkles count={45} scale={[1.3, 0.9, 0.4]} position={[-0.72, 1.15, -0.85]} size={1.1} speed={0.2} opacity={0.4} color="#ffe2b0" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2} position={[-2, 2, -2]} scale={[3, 2, 1]} color="#ffe6c7" />
        <Lightformer form="rect" intensity={1} position={[2, 1, 2]} scale={[2, 2, 1]} color="#9fb4ff" />
      </Environment>
    </>
  );
}

/** The desk, in WebGL. All geometry is procedural: no model files to download. */
export default function DeskWorld(props: DeskWorldProps) {
  // Quality tiers: "high" by default, "low" when the GPU struggles (or ?gl=low for testing).
  const [low, setLow] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(location.search).get("gl") === "low" || (navigator.hardwareConcurrency ?? 8) <= 4) setLow(true);
    const id = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(id);
  }, []);
  const layer = useRef<HTMLDivElement>(null);
  return (
    <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
    <Canvas
      shadows={!low}
      dpr={low ? 1 : [1, 1.75]}
      frameloop={props.active === false ? "never" : "always"}
      camera={{ fov: 30, near: 0.05, far: 30, position: WIDE.pos.toArray() }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <PerformanceMonitor onDecline={() => setLow(true)} />
      <World {...props} layer={layer} low={low} />
      <EffectComposer multisampling={low ? 0 : 4} enableNormalPass={false}>
        <Bloom mipmapBlur luminanceThreshold={0.95} intensity={0.75} radius={0.7} />
        <ToneMapping mode={ToneMappingMode.AGX} />
        <Vignette offset={0.22} darkness={0.72} />
        <Noise opacity={0.03} premultiply />
      </EffectComposer>
    </Canvas>
    {/* the monitor's live HTML is portalled here, above the canvas */}
    <div ref={layer} className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  );
}

