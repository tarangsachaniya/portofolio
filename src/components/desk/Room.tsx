"use client";
import { motion, useMotionTemplate, useTransform, type MotionValue } from "framer-motion";

const H = [9, 12, 15, 17.5, 19, 21, 24];
const SKY_TOP = ["#6ea6dc", "#3f86d6", "#4f86cf", "#d9784f", "#3d2f6b", "#10163a", "#04060e"];
const SKY_BOT = ["#f3d2a6", "#a9d4f2", "#cfe2f1", "#ffc27a", "#d86f55", "#271f4c", "#0a0e20"];
const WALL = ["#1b2130", "#202839", "#212839", "#2a2230", "#161a26", "#0e1119", "#0a0c12"];

const STARS = Array.from({ length: 34 }, (_, i) => ({ x: (i * 37) % 100, y: (i * 53) % 70, s: i % 5 === 0 ? 2 : 1, d: (i % 7) * 0.4 }));
const CITY = [8, 14, 10, 20, 12, 26, 9, 17, 22, 11, 15, 28, 13, 19, 10, 24, 16, 12, 21, 9];

/** The wall behind the desk: a window onto Ahmedabad, a wall clock, and the light it lets in. */
export function Room({ hour, zoom }: { hour: MotionValue<number>; zoom: MotionValue<number> }) {
  const top = useTransform(hour, H, SKY_TOP);
  const bot = useTransform(hour, H, SKY_BOT);
  const sky = useMotionTemplate`linear-gradient(180deg, ${top}, ${bot})`;
  const wall = useTransform(hour, H, WALL);
  const sunX = useTransform(hour, [6, 19.5], ["0%", "100%"]);
  const sunY = useTransform(hour, (h) => `${78 - Math.sin((Math.PI * Math.min(Math.max(h - 6, 0), 13.5)) / 13.5) * 62}%`);
  const sunO = useTransform(hour, [17.8, 19.2], [1, 0]);
  const moonX = useTransform(hour, [18.5, 24], ["10%", "70%"]);
  const moonY = useTransform(hour, [18.5, 22, 24], ["80%", "18%", "12%"]);
  const moonO = useTransform(hour, [18.8, 20], [0, 1]);
  const stars = useTransform(hour, [19.5, 21.5], [0, 1]);
  const lit = useTransform(hour, [18.2, 20], [0, 1]);
  const shaft = useTransform(hour, [9, 13, 17.5, 19], [0.55, 0.35, 0.45, 0]);
  const shaftColor = useTransform(hour, [9, 15, 17.5], ["rgba(255,226,170,0.16)", "rgba(220,235,255,0.12)", "rgba(255,170,100,0.2)"]);
  const shaftBg = useMotionTemplate`linear-gradient(245deg, ${shaftColor}, transparent 60%)`;
  const dark = useTransform(hour, [17, 21, 24], [0, 0.35, 0.5]);
  const minRot = useTransform(hour, (h) => `${(h % 1) * 360}deg`);
  const hrRot = useTransform(hour, (h) => `${((h % 12) / 12) * 360}deg`);
  const scale = useTransform(zoom, [0.5, 1], [1, 1.12]);

  return (
    <motion.div aria-hidden className="absolute inset-0 overflow-hidden" style={{ backgroundColor: wall }}>
      <motion.div className="absolute inset-0" style={{ scale }}>
        {/* window */}
        <div className="absolute right-[4vw] top-[11svh] h-[46svh] w-[min(32vw,32rem)] rounded-[10px] border-[10px] border-[#0c0e13] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8),inset_0_0_0_1px_rgb(255_255_255/0.05)]">
          <motion.div className="absolute inset-0 overflow-hidden" style={{ background: sky }}>
            <motion.div className="absolute inset-0" style={{ opacity: stars }}>
              {STARS.map((s, i) => <i key={i} className="absolute rounded-full bg-white animate-[twinkle_3s_ease-in-out_infinite]" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />)}
            </motion.div>
            <motion.div className="absolute size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff1c9] shadow-[0_0_60px_20px_rgb(255_210_120/0.55)]" style={{ left: sunX, top: sunY, opacity: sunO }} />
            <motion.div className="absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e9ecf5] shadow-[0_0_40px_8px_rgb(200_210_255/0.35),inset_-6px_-3px_0_#c3c9d9]" style={{ left: moonX, top: moonY, opacity: moonO }} />
            {/* skyline */}
            <div className="absolute inset-x-0 bottom-0 flex h-[38%] items-end gap-[2px]">
              {CITY.map((h, i) => (
                <div key={i} className="relative flex-1 bg-[#0d1018]" style={{ height: `${h * 3}%` }}>
                  <motion.div className="absolute inset-1 bg-[radial-gradient(#ffcf7a_1px,transparent_1.5px)] [background-size:6px_7px]" style={{ opacity: lit }} />
                </div>
              ))}
            </div>
          </motion.div>
          {/* mullions + glass glare */}
          <div className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-[#0c0e13]" />
          <div className="absolute inset-x-0 top-[45%] h-2 bg-[#0c0e13]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgb(255_255_255/0.12),transparent_40%)]" />
          <div className="absolute -bottom-5 -left-4 -right-4 h-3 rounded-sm bg-[#0c0e13]" />
        </div>
        {/* light shaft across the wall */}
        <motion.div className="absolute right-[6vw] top-[11svh] h-[90svh] w-[60vw] [clip-path:polygon(60%_0,100%_0,70%_100%,0_100%)]" style={{ opacity: shaft, background: shaftBg }} />
        {/* wall clock */}
        <div className="absolute left-[7vw] top-[11svh] grid size-[clamp(4.5rem,7vw,6.5rem)] place-items-center rounded-full border-4 border-[#0c0e13] bg-[#e9e4d8] shadow-[0_20px_40px_-15px_rgb(0_0_0/0.7)]">
          {Array.from({ length: 12 }, (_, i) => <i key={i} className="absolute h-[44%] w-px origin-bottom" style={{ transform: `rotate(${i * 30}deg)`, bottom: "50%" }}><b className="block h-1.5 w-[2px] bg-[#23211d]" /></i>)}
          <motion.i className="absolute bottom-1/2 left-1/2 h-[26%] w-[3px] -translate-x-1/2 origin-bottom rounded bg-[#23211d]" style={{ rotate: hrRot }} />
          <motion.i className="absolute bottom-1/2 left-1/2 h-[38%] w-[2px] -translate-x-1/2 origin-bottom rounded bg-[#23211d]" style={{ rotate: minRot }} />
          <i className="absolute size-2 rounded-full bg-[#ff7a3d]" />
        </div>
        {/* shelf */}
        <div className="absolute left-[22vw] top-[30svh] hidden h-2 w-[16vw] rounded-sm bg-[#0c0e13] shadow-[0_10px_20px_-6px_rgb(0_0_0/0.6)] lg:block">
          <div className="absolute bottom-2 left-3 flex items-end gap-1">
            {[["#ffb547", 46], ["#5ee0c1", 38], ["#9b8cff", 52], ["#ff8a5c", 34], ["#e9e4d8", 44]].map(([c, h], i) => <i key={i} className="block w-3 rounded-t-[2px]" style={{ height: Number(h), background: String(c), opacity: 0.75 }} />)}
          </div>
          <div className="absolute bottom-2 right-4 grid size-9 place-items-center rounded-md bg-[#e9e4d8] font-mono text-[0.5rem] font-bold text-[#23211d]">npm</div>
        </div>
      </motion.div>
      <motion.div className="absolute inset-0 bg-[#03040a]" style={{ opacity: dark }} />
    </motion.div>
  );
}

/** Desk lamp. Switches itself on at 18:00, or whenever you click it. */
export function Lamp({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={on} aria-label={on ? "Turn the desk lamp off" : "Turn the desk lamp on"} className="group absolute bottom-0 left-0 h-[34svh] w-[22svh] cursor-pointer">
      {/* light cone */}
      <span className={`pointer-events-none absolute left-[-120%] top-[18%] h-[260%] w-[260%] origin-top transition-opacity duration-700 ${on ? "opacity-100 animate-[ignite_.9s_steps(1)_1]" : "opacity-0"}`}
        style={{ background: "radial-gradient(ellipse 45% 55% at 50% 0%, rgb(255 190 100 / 0.38), rgb(255 170 80 / 0.08) 55%, transparent 70%)", mixBlendMode: "screen" }} />
      {/* base */}
      <span className="absolute bottom-0 left-[10%] h-[5%] w-[60%] rounded-[50%] bg-[#15181e] shadow-[0_6px_14px_rgb(0_0_0/0.6)]" />
      {/* arm */}
      <span className="absolute bottom-[4%] left-[38%] h-[55%] w-[5%] origin-bottom rotate-[18deg] rounded-full bg-[#2a2f39]" />
      <span className="absolute bottom-[52%] left-[54%] h-[42%] w-[5%] origin-bottom -rotate-[62deg] rounded-full bg-[#2a2f39]" />
      {/* head */}
      <span className="absolute left-[2%] top-[14%] h-[16%] w-[46%] -rotate-[22deg] rounded-t-[60%] rounded-b-md bg-[#2a2f39] shadow-[inset_0_2px_0_rgb(255_255_255/0.08)]">
        <span className={`absolute -bottom-1 left-[12%] h-2 w-[76%] rounded-full transition-all duration-500 ${on ? "bg-[#fff1c9] shadow-[0_0_30px_10px_rgb(255_190_100/0.7)]" : "bg-[#3a3f4a]"}`} />
      </span>
      <span className="absolute -top-6 left-0 whitespace-nowrap font-mono text-[0.6rem] text-white/0 transition-colors group-hover:text-white/50">click me</span>
    </button>
  );
}

export function Plant() {
  return (
    <div aria-hidden className="absolute bottom-0 left-0 h-[30svh] w-[16svh]">
      {[[-28, 70], [-8, 85], [14, 78], [32, 62], [-45, 55], [48, 48]].map(([r, h], i) => (
        <i key={i} className="absolute bottom-[30%] left-1/2 block w-[22%] origin-bottom rounded-[50%_50%_50%_50%/80%_80%_20%_20%] animate-[sway_6s_ease-in-out_infinite_alternate]" style={{ height: `${h}%`, transform: `translateX(-50%) rotate(${r}deg)`, background: i % 2 ? "#2f6b4f" : "#3d8a63", animationDelay: `${i * -0.7}s` }} />
      ))}
      <span className="absolute bottom-0 left-[15%] h-[32%] w-[70%] rounded-b-[30%] rounded-t-md bg-[#c86b3c] shadow-[inset_-8px_0_0_rgb(0_0_0/0.15)]" />
    </div>
  );
}

export function Mug() {
  return (
    <div aria-hidden className="absolute bottom-0 left-0 h-[11svh] w-[9svh]">
      {[0, 1, 2].map((i) => <i key={i} className="absolute bottom-[100%] block h-[60%] w-1 rounded-full bg-white/20 blur-[2px] animate-[steam_3.2s_ease-out_infinite]" style={{ left: `${25 + i * 20}%`, animationDelay: `${i * 0.9}s` }} />)}
      <span className="absolute bottom-0 left-0 h-full w-[78%] rounded-b-[30%] rounded-t-sm bg-[#e9e4d8] shadow-[inset_-6px_0_0_rgb(0_0_0/0.08)]"><span className="absolute left-1/2 top-[38%] -translate-x-1/2 font-mono text-[0.55rem] font-bold text-[#23211d]">{"{ }"}</span></span>
      <span className="absolute right-0 top-[22%] h-[45%] w-[34%] rounded-r-full border-[5px] border-l-0 border-[#e9e4d8]" />
    </div>
  );
}

/** Phone lying on the desk. It buzzes with real-ish notifications as the day goes on. */
export function Phone({ step }: { step: number }) {
  const notes = [
    ["priinteve", "Good morning. 3 print orders overnight"],
    ["github", "otp-forge: new star ★"],
    ["vercel", "Build ready · tarang.dev"],
    ["review", "Requested changes: none"],
    ["menu.priinteve", "Order #1425 ready for pickup"],
    ["you?", "New message from a future client"],
  ];
  const [app, msg] = notes[step] ?? notes[0];
  return (
    <div aria-hidden className="relative h-[24svh] w-[12svh] rotate-[-14deg] rounded-[2.2svh] bg-[#0a0b0e] p-[0.6svh] shadow-[0_20px_40px_-10px_rgb(0_0_0/0.9),inset_0_0_0_1px_rgb(255_255_255/0.08)]">
      <div className="relative h-full overflow-hidden rounded-[1.7svh] bg-gradient-to-b from-[#1c2140] to-[#0e1018]">
        <p className="mt-[3svh] text-center font-display text-[3.2svh] font-semibold leading-none text-white/90">{["09:00", "10:30", "12:30", "15:00", "18:00", "21:30"][step]}</p>
        <div key={step} className="absolute inset-x-[0.8svh] top-[9svh] animate-[fadeUp_.5s_ease_both] rounded-[1svh] bg-white/10 p-[0.8svh] backdrop-blur">
          <p className="font-mono text-[0.9svh] uppercase text-white/50">{app}</p>
          <p className="mt-[0.3svh] text-[1.2svh] leading-tight text-white/90">{msg}</p>
        </div>
      </div>
    </div>
  );
}
