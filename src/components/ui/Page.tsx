import type { ReactNode } from "react";
import Link from "next/link";
import { Spark } from "../chrome/ChatChrome";

/**
 * Every page opens the same way in every world:
 *  - world-specific framing (terminal command, chat question, editor front-matter)
 *  - an h1 and an answer-first summary that crawlers and answer engines can lift.
 */
export default function Page({
  cmd,
  prompt,
  file,
  eyebrow,
  title,
  summary,
  crumbs,
  children,
}: {
  cmd: string;
  prompt: string;
  file: string;
  eyebrow?: string;
  title: ReactNode;
  summary: string;
  crumbs?: { name: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <article>
      <header className="wrap pt-10 md:pt-16">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 t-meta text-fg-3">
            <ol className="flex flex-wrap gap-2">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i < crumbs.length - 1 ? <Link className="ulink hover:text-fg" href={c.href}>{c.name}</Link> : <span aria-current="page" className="text-fg-2">{c.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <p className="only only-terminal mb-4 font-mono text-sm text-fg-2"><span className="text-fg">tarang@ahmedabad:~$</span> {cmd}</p>
        <div className="only only-vscode mb-5 font-mono text-[0.8rem] leading-relaxed text-fg-3">
          <span style={{ color: "var(--syn-com)" }}>{"// "}{file}</span>
        </div>
        <div className="only only-chat mb-6">
          <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-bg-3 px-4 py-2.5 text-[0.95rem]">{prompt}</p>
          <p className="mt-6 flex items-center gap-2 text-sm text-fg-3"><Spark className="size-4 text-accent" /> tarang-5</p>
        </div>

        {eyebrow && <p className="t-meta text-accent-ink">{eyebrow}</p>}
        <h1 className="mt-3 t-h2 h-pre max-w-[18ch]">{title}</h1>
        <p className="mt-6 max-w-[62ch] t-lead text-fg-2" data-answer>{summary}</p>
      </header>
      {children}
    </article>
  );
}

export function SectionTitle({ kicker, children, id }: { kicker?: string; children: ReactNode; id?: string }) {
  return (
    <div className="mb-8 border-b border-line pb-3 md:mb-10">
      {kicker && <p className="t-meta text-fg-3">{kicker}</p>}
      <h2 id={id} className="mt-2 t-h3 h-pre">{children}</h2>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <dl className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
            <dt>{f.q}</dt>
            <span aria-hidden className="font-mono text-fg-3 transition-transform group-open:rotate-45">+</span>
          </summary>
          <dd className="mt-3 max-w-[64ch] t-body text-fg-2">{f.a}</dd>
        </details>
      ))}
    </dl>
  );
}

export function Facts({ items }: { items: { k: string; v: string }[] }) {
  return (
    <dl className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
      {items.map((f) => (
        <div key={f.k} className="bg-bg p-4">
          <dt className="t-meta text-fg-3">{f.k}</dt>
          <dd className="mt-1.5 font-medium">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}
