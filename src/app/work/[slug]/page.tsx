import Link from "next/link";
import { notFound } from "next/navigation";
import { work, workBySlug } from "@/lib/content";
import { breadcrumbs, faqNode, graph, meta, workNode } from "@/lib/seo";
import Page, { Faq, SectionTitle } from "@/components/ui/Page";
import Device, { NoShot } from "@/components/ui/Device";
import JsonLd from "@/components/ui/JsonLd";
import PipelineStages from "@/components/work/PipelineStages";
import { Tile } from "@/components/desk/Bento";
import { hash } from "@/components/desk/timeline";

export const dynamicParams = false;
export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const w = workBySlug((await params).slug)!;
  return meta({ title: `${w.name}: ${w.what}`, description: w.summary, path: `/work/${w.slug}/`, type: "article" });
}

const BEATS = [
  { key: "problem", label: "Problem", cmd: "01" },
  { key: "constraints", label: "Constraints", cmd: "02" },
  { key: "build", label: "Build", cmd: "03" },
  { key: "learned", label: "What I learned", cmd: "04" },
] as const;

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const w = workBySlug((await params).slug);
  if (!w) notFound();
  const i = work.indexOf(w);
  const prev = work[(i - 1 + work.length) % work.length];
  const next = work[(i + 1) % work.length];

  return (
    <Page
      eyebrow={`${w.kind} · ${w.year} · ${w.status}`}
      title={w.name}
      summary={w.summary}
      crumbs={[{ name: "Home", href: "/" }, { name: "Work", href: "/work/" }, { name: w.name, href: `/work/${w.slug}/` }]}
    >
      <div className="wrap">
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {w.href && <a href={w.href} target="_blank" rel="noreferrer" className="btn btn-primary">Visit {w.domain} <span aria-hidden>↗</span></a>}
          {w.repo && <a href={w.repo} target="_blank" rel="noreferrer" className="btn btn-ghost">Source on GitHub <span aria-hidden>↗</span></a>}
          <span className="flex flex-wrap gap-1.5">{w.platforms.map((p) => <span key={p} className="tag">{p}</span>)}</span>
        </div>

        {w.downloads && (
          <section aria-labelledby="apps" className="mt-10">
            <h2 id="apps" className="t-meta text-fg-3">Get the apps</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {w.downloads.map((d) => (
                <li key={d.label}>
                  <a href={d.href} target="_blank" rel="noreferrer" className="card flex items-center gap-3 p-4">
                    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-md bg-fg font-mono text-xs text-bg">{d.platform === "Windows" ? "⊞" : d.platform === "macOS" ? "⌘" : d.platform === "Android TV" ? "▭" : "▲"}</span>
                    <span><span className="block text-sm font-semibold">{d.label}</span><span className="block text-xs text-fg-3">Download ↗</span></span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* bento header + the case study as a CI pipeline */}
        <div>
          <div className="bento mt-10">
            <Tile size="4x2" tilt={false} className="p-3 sm:p-4">
              {w.shots[0] ? <Device shot={w.shots[0]} domain={w.domain} priority /> : <NoShot name={w.name} hue={w.hue} what={w.what} />}
            </Tile>
            <Tile size="3x1">
              <div className="flex h-full flex-col p-5">
                <p className="t-kicker">Role</p>
                <p className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight">{w.role}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {w.href && <a href={w.href} target="_blank" rel="noreferrer" className="btn btn-primary !px-4 !py-2 text-sm">Visit ↗</a>}
                  {w.repo && <a href={w.repo} target="_blank" rel="noreferrer" className="btn btn-ghost !px-4 !py-2 text-sm">Source ↗</a>}
                  <a href="/contact/" className="btn btn-ghost !px-4 !py-2 text-sm">Build one like it</a>
                </div>
              </div>
            </Tile>
            <Tile size="3x1">
              <div className="p-5">
                <p className="t-kicker">Stack · {w.stack.length || "tbd"}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">{(w.stack.length ? w.stack : w.platforms).map((x) => <li key={x} className="tag">{x}</li>)}</ul>
              </div>
            </Tile>
            {w.facts.map((f) => (
              <Tile key={f.k} size="1x1">
                <div className="flex h-full flex-col justify-between p-5"><p className="t-kicker">{f.k}</p><p className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight">{f.v}</p></div>
              </Tile>
            ))}
            {w.shots.slice(1).map((sh) => (
              <Tile key={sh.src} size="4x2" tilt={false} className="p-3 sm:p-4"><Device shot={sh} domain={w.domain} /></Tile>
            ))}
          </div>
          <div className="section">
            <PipelineStages run={hash(w.slug, 6)} stages={BEATS.map((b) => ({ key: b.key, label: b.label, body: w[b.key] }))} />
          </div>
        </div>

        {w.faq.length > 0 && (
          <section className="pb-8" aria-labelledby="faq">
            <SectionTitle kicker="faq" id="faq">Questions about {w.name}</SectionTitle>
            <Faq items={w.faq} />
          </section>
        )}

        <nav aria-label="More projects" className="grid gap-3 border-t border-line py-10 sm:grid-cols-2">
          <Link href={`/work/${prev.slug}/`} className="card p-5"><span className="t-meta text-fg-3">← Previous</span><span className="mt-2 block text-lg font-semibold">{prev.name}</span></Link>
          <Link href={`/work/${next.slug}/`} className="card p-5 text-right"><span className="t-meta text-fg-3">Next →</span><span className="mt-2 block text-lg font-semibold">{next.name}</span></Link>
        </nav>
      </div>
      <JsonLd data={graph(workNode(w), breadcrumbs([{ name: "Home", path: "/" }, { name: "Work", path: "/work/" }, { name: w.name, path: `/work/${w.slug}/` }]), ...(w.faq.length ? [faqNode(w.faq)] : []))} />
    </Page>
  );
}
