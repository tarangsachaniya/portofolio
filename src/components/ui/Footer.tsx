import Link from "next/link";
import { nav, person, work } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="wrap grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-semibold tracking-tight">{person.name}</p>
          <p className="mt-2 max-w-[42ch] text-fg-2">{person.oneLiner}</p>
          <p className="mt-4"><a className="ulink font-medium" href={`mailto:${person.email}`}>{person.email}</a></p>
        </div>
        <nav aria-label="Footer">
          <p className="t-meta text-fg-3">Pages</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {nav.map((n) => <li key={n.href}><Link className="ulink text-fg-2 hover:text-fg" href={n.href}>{n.label}</Link></li>)}
          </ul>
        </nav>
        <div>
          <p className="t-meta text-fg-3">Products</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {work.filter((w) => w.kind === "Product").map((w) => <li key={w.slug}><Link className="ulink text-fg-2 hover:text-fg" href={`/work/${w.slug}/`}>{w.name}</Link></li>)}
          </ul>
          <p className="mt-6 t-meta text-fg-3">Elsewhere</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
            {person.socials.map((s) => <li key={s.label}><a className="ulink text-fg-2 hover:text-fg" href={s.href} rel="me noreferrer" target="_blank">{s.label} ↗</a></li>)}
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-3 border-t border-line py-5 t-meta text-fg-3">
        <span>© {new Date().getFullYear()} {person.name}</span>
        <span>Hand-built in Ahmedabad · five worlds, one story</span>
        <span><a className="ulink" href="/resume.txt">resume.txt</a> · <a className="ulink" href="/llms.txt">llms.txt</a></span>
      </div>
    </footer>
  );
}
