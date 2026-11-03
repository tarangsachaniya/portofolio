import Link from "next/link";
import type { Work } from "@/lib/content";
import Device, { NoShot } from "./Device";

export default function WorkCard({ w, big = false }: { w: Work; big?: boolean }) {
  return (
    <Link href={`/work/${w.slug}/`} className="card group block p-3 sm:p-4" data-kind={w.kind}>
      {w.shots[0] ? <Device shot={w.shots[0]} domain={w.domain} /> : <NoShot name={w.name} hue={w.hue} what={w.what} />}
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className={`${big ? "t-h3" : "text-xl font-semibold tracking-tight"} group-hover:text-accent-ink`}>{w.name}</h3>
          <p className="mt-1 text-[0.95rem] text-fg-2">{w.what}</p>
        </div>
        <span className="t-meta shrink-0 text-fg-3">{w.year}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5 px-1 pb-1">
        <span className="tag">{w.status}</span>
        {w.platforms.map((p) => <span key={p} className="tag">{p}</span>)}
      </div>
    </Link>
  );
}
