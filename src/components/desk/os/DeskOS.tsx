"use client";

import type { ReactNode } from "react";
import { STEPS } from "../timeline";
import { APPS } from "./apps";

type Variant = "desktop" | "phone";

/** All geometry comes from the canvas size, so the same OS runs on the 3D monitor (1120×700) and on a phone. */
function layout(w: number, h: number, v: Variant) {
  const phone = v === "phone";
  const bar = phone ? 28 : 24;
  const icon = phone ? Math.min(32, Math.floor((w - 16 - 2 * 8 - (STEPS.length - 1) * 5) / STEPS.length)) : 44;
  const gap = phone ? 5 : 10;
  const pad = phone ? 8 : 10;
  const dockW = STEPS.length * icon + (STEPS.length - 1) * gap + pad * 2;
  const dockH = icon + pad * 2;
  const dockX = (w - dockW) / 2;
  const dockBottom = phone ? 10 : 12;
  const dockCY = h - dockBottom - dockH / 2;
  const side = phone ? 8 : 14;
  const top = bar + (phone ? 6 : 10);
  const win = { x: side, y: top, w: w - side * 2, h: h - top - dockH - dockBottom - (phone ? 10 : 20) };
  return { phone, bar, icon, gap, pad, dockW, dockX, dockCY, win, titleH: phone ? 26 : 32, radius: phone ? 20 : 10 };
}

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

function Icon({ i, size, active, running, bounce, onClick, phone }: { i: number; size: number; active: boolean; running: boolean; bounce: number; onClick: () => void; phone: boolean }) {
  const a = APPS[STEPS[i].id];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${a.name} (${STEPS[i].time} ${STEPS[i].label})`}
      className={`group/icon relative grid shrink-0 place-items-center transition-transform duration-200 ease-out ${phone ? "active:scale-90" : "hover:-translate-y-2 hover:scale-[1.22]"}`}
      style={{ width: size, height: size, transform: bounce ? `translateY(${-bounce}px)` : undefined }}
    >
      <span
        className={`grid size-full place-items-center font-mono font-bold text-white shadow-[0_6px_14px_-6px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.25)] ${phone ? "rounded-[9px] text-[0.7rem]" : "rounded-[12px] text-[0.95rem]"}`}
        style={{ background: `linear-gradient(160deg, ${a.from}, ${a.to})` }}
      >
        {a.glyph}
      </span>
      {!phone && <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-black/75 px-2 py-0.5 text-[0.68rem] text-white opacity-0 transition-opacity group-hover/icon:opacity-100">{a.name}</span>}
      <i className={`absolute -bottom-[6px] size-[4px] rounded-full transition-colors ${active ? "bg-white" : running ? "bg-white/45" : "bg-transparent"}`} />
    </button>
  );
}

/**
 * The day as a small OS: a menu/status bar, a dock, and one app window per stop.
 * Scrolling into a stop opens its window out of its dock icon; scrolling on minimises it back.
 * Everything is driven by scroll position, so scrolling up plays it in reverse.
 */
export default function DeskOS({ step, t, time, hour, onJump, children, width = 1120, height = 700, variant = "desktop" }: {
  step: number; t: number; time: string; hour: number; onJump: (i: number) => void; children: ReactNode; width?: number; height?: number; variant?: Variant;
}) {
  const L = layout(width, height, variant);
  const id = STEPS[step].id;
  const app = APPS[id];
  const o = windowOpen(step, t);
  const icx = L.dockX + L.pad + L.icon / 2 + step * (L.icon + L.gap);
  const s = 0.04 + 0.96 * o;
  const sy = s * (0.82 + 0.18 * o); // a slight vertical squash: a cheap genie
  const opening = step > 0 && t < OPEN;
  const bounce = opening ? Math.sin(clamp(t / OPEN) * Math.PI * 2) * (L.phone ? 5 : 7) * (1 - t / OPEN) : 0;
  const night = clamp((hour - 17) / 5);
  const battery = `${Math.round(90 - step * 7)}%`;

  return (
    <div className="relative overflow-hidden bg-[#0b0d14] font-body text-white" style={{ width, height, borderRadius: L.phone ? 28 : 0 }}>
      {/* wallpaper, dimming as the day goes */}
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(60% 70% at 25% 30%, rgb(255 181 71 / 0.38), transparent 60%), radial-gradient(55% 65% at 78% 72%, rgb(155 140 255 / 0.42), transparent 60%), radial-gradient(40% 50% at 60% 15%, rgb(94 224 193 / 0.25), transparent 60%), #121524" }} />
      <div aria-hidden className="absolute inset-0 bg-[#05060c]" style={{ opacity: 0.15 + night * 0.45 }} />
      {!L.phone && <p aria-hidden className="absolute bottom-[110px] right-8 text-right font-display text-[5.5rem] font-semibold leading-none tracking-[-0.04em] text-white/[0.07]">{time}</p>}

      {/* menu bar (desktop) / status bar (phone) */}
      {L.phone ? (
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 font-mono text-[0.72rem] text-white/85" style={{ height: L.bar }}>
          <span className="font-semibold">{time}</span>
          <span className="font-body text-[0.74rem] font-semibold">{app.name}</span>
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="flex items-end gap-[2px]">{[4, 6, 8, 10].map((hh) => <i key={hh} className="w-[3px] rounded-sm bg-white/80" style={{ height: hh }} />)}</span>
            <span className="relative inline-block h-[9px] w-[18px] rounded-[2px] border border-white/60"><i className="absolute inset-[1px] rounded-[1px] bg-white/70" style={{ width: battery }} /></span>
          </span>
        </div>
      ) : (
        <div className="absolute inset-x-0 top-0 flex items-center gap-4 bg-black/35 px-3 text-[0.74rem] text-white/85 backdrop-blur-md" style={{ height: L.bar }}>
          <span className="font-bold">◑</span>
          <span className="font-semibold">{app.name}</span>
          {["File", "Edit", "View", "Window", "Help"].map((m) => <span key={m} className="text-white/60">{m}</span>)}
          <span className="ml-auto flex items-center gap-3 font-mono text-[0.7rem] text-white/75">
            <span aria-hidden>⌁</span>
            <span aria-hidden className="relative inline-block h-[9px] w-[18px] rounded-[2px] border border-white/60"><i className="absolute inset-[1px] rounded-[1px] bg-white/70" style={{ width: battery }} /></span>
            <span>{time}</span>
          </span>
        </div>
      )}

      {/* the app window: grows out of its dock icon, shrinks back into it */}
      <div
        key={id}
        className="absolute overflow-hidden border border-white/12 bg-[#0e1116] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.95)] will-change-transform"
        style={{
          left: L.win.x, top: L.win.y, width: L.win.w, height: L.win.h,
          transformOrigin: `${icx - L.win.x}px ${L.dockCY - L.win.y}px`,
          transform: `scale(${s}, ${sy})`,
          opacity: clamp(o * 2.2),
          borderRadius: L.radius + (1 - o) * 30,
          visibility: o < 0.01 ? "hidden" : "visible",
        }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#16191f] px-3" style={{ height: L.titleH }}>
          {!L.phone && <span className="flex gap-1.5" aria-hidden><i className="size-3 rounded-full bg-[#ff5f57]" /><i className="size-3 rounded-full bg-[#febc2e]" /><i className="size-3 rounded-full bg-[#28c840]" /></span>}
          <span className={`font-mono text-white/55 ${L.phone ? "text-[0.68rem]" : "mx-auto text-[0.72rem]"}`}>{app.name} — {app.title}</span>
          {L.phone ? <span className="ml-auto font-mono text-[0.66rem] text-white/35">{STEPS[step].time}</span> : <span className="w-12" />}
        </div>
        <div className="relative" style={{ height: L.win.h - L.titleH }}>{children}</div>
      </div>

      {/* dock */}
      <nav aria-label="Apps" className={`absolute flex items-end border border-white/15 bg-white/[0.08] backdrop-blur-xl ${L.phone ? "rounded-[18px]" : "rounded-[20px]"}`} style={{ left: L.dockX, top: L.dockCY - L.icon / 2 - L.pad, padding: L.pad, width: L.dockW, gap: L.gap }}>
        {STEPS.map((st, i) => (
          <Icon key={st.id} i={i} size={L.icon} phone={L.phone} active={i === step} running={i < step} bounce={i === step ? bounce : 0} onClick={() => onJump(i)} />
        ))}
      </nav>
    </div>
  );
}
