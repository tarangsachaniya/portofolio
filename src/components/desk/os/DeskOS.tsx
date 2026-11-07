"use client";

import type { ReactNode } from "react";
import { STEPS } from "../timeline";
import { APPS } from "./apps";

/* Geometry of the 1120×700 monitor canvas (see SCREEN_PX in three/Scene.tsx). */
const W = 1120, H = 700;
const BAR = 24;
const WIN = { x: 14, y: BAR + 10, w: W - 28, h: H - BAR - 10 - 90 };
const ICON = 44, GAP = 10, PAD = 10;
const DOCK_W = STEPS.length * ICON + (STEPS.length - 1) * GAP + PAD * 2;
const DOCK_X = (W - DOCK_W) / 2;
const DOCK_CY = H - 12 - (ICON + PAD * 2) / 2;
const iconCenter = (i: number) => ({ x: DOCK_X + PAD + ICON / 2 + i * (ICON + GAP), y: DOCK_CY });

const OPEN = 0.12, CLOSE = 0.88;
const clamp = (x: number) => Math.min(1, Math.max(0, x));
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const easeIn = (x: number) => x * x * x;

/** How open the current window is (0 = in the dock, 1 = full size), as a pure function of scroll. */
export function windowOpen(step: number, t: number) {
  const last = step === STEPS.length - 1;
  if (step > 0 && t < OPEN) return easeOut(t / OPEN);
  if (!last && t > CLOSE) return 1 - easeIn((t - CLOSE) / (1 - CLOSE));
  return 1;
}
/** Screens animate their content only while the window is fully open. */
export const contentT = (step: number, t: number) => (step === 0 ? clamp(t / CLOSE) : clamp((t - OPEN) / (CLOSE - OPEN)));

function Icon({ i, active, running, bounce, onClick }: { i: number; active: boolean; running: boolean; bounce: number; onClick: () => void }) {
  const a = APPS[STEPS[i].id];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${a.name} (${STEPS[i].time} ${STEPS[i].label})`}
      className="group/icon relative grid shrink-0 place-items-center transition-transform duration-200 ease-out hover:-translate-y-2 hover:scale-[1.22]"
      style={{ width: ICON, height: ICON, transform: bounce ? `translateY(${-bounce}px)` : undefined }}
    >
      <span
        className="grid size-full place-items-center rounded-[12px] font-mono text-[0.95rem] font-bold text-white shadow-[0_6px_14px_-6px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.25)]"
        style={{ background: `linear-gradient(160deg, ${a.from}, ${a.to})` }}
      >
        {a.glyph}
      </span>
      <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-black/75 px-2 py-0.5 text-[0.68rem] text-white opacity-0 transition-opacity group-hover/icon:opacity-100">{a.name}</span>
      <i className={`absolute -bottom-[7px] size-[4px] rounded-full transition-colors ${active ? "bg-white" : running ? "bg-white/45" : "bg-transparent"}`} />
    </button>
  );
}

/**
 * The monitor as a small desktop OS: menu bar, dock, and one app window per stop.
 * Scrolling into a stop opens its window out of its dock icon; scrolling on minimises it back.
 * Everything is driven by scroll position, so scrolling up plays it in reverse.
 */
export default function DeskOS({ step, t, time, hour, onJump, children }: { step: number; t: number; time: string; hour: number; onJump: (i: number) => void; children: ReactNode }) {
  const id = STEPS[step].id;
  const app = APPS[id];
  const o = windowOpen(step, t);
  const ic = iconCenter(step);
  const s = 0.04 + 0.96 * o;
  const sy = s * (0.82 + 0.18 * o); // a slight vertical squash: a cheap genie
  const opening = step > 0 && t < OPEN;
  const bounce = opening ? Math.sin(clamp(t / OPEN) * Math.PI * 2) * 7 * (1 - t / OPEN) : 0;
  const night = clamp((hour - 17) / 5);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0d14] font-body text-white" style={{ width: W, height: H }}>
      {/* wallpaper, dimming as the day goes */}
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 70% at 25% 30%, rgb(255 181 71 / 0.38), transparent 60%), radial-gradient(55% 65% at 78% 72%, rgb(155 140 255 / 0.42), transparent 60%), radial-gradient(40% 50% at 60% 15%, rgb(94 224 193 / 0.25), transparent 60%), #121524" }} />
      <div aria-hidden className="absolute inset-0 bg-[#05060c]" style={{ opacity: 0.15 + night * 0.45 }} />
      <p aria-hidden className="absolute bottom-[110px] right-8 text-right font-display text-[5.5rem] font-semibold leading-none tracking-[-0.04em] text-white/[0.07]">{time}</p>

      {/* menu bar */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-4 bg-black/35 px-3 text-[0.74rem] text-white/85 backdrop-blur-md" style={{ height: BAR }}>
        <span className="font-bold">◑</span>
        <span className="font-semibold">{app.name}</span>
        {["File", "Edit", "View", "Window", "Help"].map((m) => <span key={m} className="text-white/60">{m}</span>)}
        <span className="ml-auto flex items-center gap-3 font-mono text-[0.7rem] text-white/75">
          <span aria-hidden>⌁</span>
          <span aria-hidden className="relative inline-block h-[9px] w-[18px] rounded-[2px] border border-white/60"><i className="absolute inset-[1px] rounded-[1px] bg-white/70" style={{ width: `${Math.round(90 - step * 7)}%` }} /></span>
          <span>{time}</span>
        </span>
      </div>

      {/* the app window: grows out of its dock icon, shrinks back into it */}
      <div
        key={id}
        className="absolute overflow-hidden border border-white/12 bg-[#0e1116] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.95)] will-change-transform"
        style={{
          left: WIN.x, top: WIN.y, width: WIN.w, height: WIN.h,
          transformOrigin: `${ic.x - WIN.x}px ${ic.y - WIN.y}px`,
          transform: `scale(${s}, ${sy})`,
          opacity: clamp(o * 2.2),
          borderRadius: 10 + (1 - o) * 30,
          visibility: o < 0.01 ? "hidden" : "visible",
        }}
      >
        <div className="flex h-8 items-center gap-2 border-b border-white/10 bg-[#16191f] px-3">
          <span className="flex gap-1.5" aria-hidden><i className="size-3 rounded-full bg-[#ff5f57]" /><i className="size-3 rounded-full bg-[#febc2e]" /><i className="size-3 rounded-full bg-[#28c840]" /></span>
          <span className="mx-auto font-mono text-[0.72rem] text-white/55">{app.name} — {app.title}</span>
          <span className="w-12" />
        </div>
        <div className="relative" style={{ height: WIN.h - 32 }}>{children}</div>
      </div>

      {/* dock */}
      <nav aria-label="Apps" className="absolute flex items-end gap-[10px] rounded-[20px] border border-white/15 bg-white/[0.08] backdrop-blur-xl" style={{ left: DOCK_X, top: DOCK_CY - ICON / 2 - PAD, padding: PAD, width: DOCK_W }}>
        {STEPS.map((st, i) => (
          <Icon key={st.id} i={i} active={i === step} running={i < step} bounce={i === step ? bounce : 0} onClick={() => onJump(i)} />
        ))}
      </nav>
    </div>
  );
}
