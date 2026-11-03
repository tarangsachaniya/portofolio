import type { Shot } from "@/lib/content";

/** Screenshot in a device frame: browser chrome, phone or desktop window. */
export default function Device({ shot, domain, priority = false, className = "" }: { shot: Shot; domain?: string; priority?: boolean; className?: string }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} loading={priority ? "eager" : "lazy"} decoding="async" className="block h-auto w-full" />
  );
  if (shot.frame === "phone")
    return (
      <figure className={`mx-auto w-[min(100%,18rem)] rounded-[2.4rem] border-[10px] border-[#111] bg-[#111] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.5)] ${className}`}>
        <div className="overflow-hidden rounded-[1.7rem]">{img}</div>
      </figure>
    );
  if (shot.frame === "window")
    return (
      <figure className={`overflow-hidden rounded-lg border border-line-2 bg-[#1f1f1f] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] ${className}`}>
        <div className="flex h-8 items-center justify-between px-3 text-[0.7rem] text-white/60"><span>{domain}</span><span aria-hidden>— ▢ ✕</span></div>
        {img}
      </figure>
    );
  if (shot.frame === "none") return <figure className={className}>{img}</figure>;
  return (
    <figure className={`overflow-hidden border border-line-2 bg-bg-2 [border-radius:var(--card-radius)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span aria-hidden className="flex gap-1.5"><i className="size-2 rounded-full bg-fg/20" /><i className="size-2 rounded-full bg-fg/20" /><i className="size-2 rounded-full bg-fg/20" /></span>
        {domain && <span className="ml-2 truncate font-mono text-[0.7rem] text-fg-3">{domain}</span>}
      </div>
      {img}
    </figure>
  );
}

/** Placeholder for projects without a screenshot yet — typographic, never fake UI. */
export function NoShot({ name, hue, what }: { name: string; hue: number; what: string }) {
  return (
    <div
      className="relative grid aspect-[16/9] place-items-center overflow-hidden border border-line-2 [border-radius:var(--card-radius)]"
      style={{ background: `linear-gradient(135deg, hsl(${hue} 45% 22%), hsl(${(hue + 40) % 360} 40% 12%))` }}
    >
      <span className="px-6 text-center font-display text-[clamp(1.6rem,4vw,3rem)] font-bold leading-none tracking-tight text-white/90">{name}</span>
      <span className="absolute bottom-3 left-4 font-mono text-[0.7rem] text-white/60">{what}</span>
    </div>
  );
}
