import Link from "next/link";
import { notFound } from "next/navigation";
import { work, workBySlug } from "@/lib/content";
import { breadcrumbs, faqNode, graph, meta, workNode } from "@/lib/seo";
import Page, { Facts, Faq, SectionTitle } from "@/components/ui/Page";
import Device, { NoShot } from "@/components/ui/Device";
import JsonLd from "@/components/ui/JsonLd";

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
      cmd={`cat ./work/${w.slug}/README.md`}
      prompt={`Tell me about ${w.name}`}
      file={`work/${w.slug}.tsx`}
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

        <div className="mt-12 grid gap-5">
          {w.shots.length ? w.shots.map((s, k) => <Device key={s.src} shot={s} domain={w.domain} priority={k === 0} />) : <NoShot name={w.name} hue={w.hue} what={w.what} />}
        </div>

        <div className="section grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div>
                <h2 className="t-meta text-fg-3">Key facts</h2>
                <div className="mt-3"><Facts items={[{ k: "Role", v: w.role }, ...w.facts]} /></div>
              </div>
              {w.stack.length > 0 && (
                <div>
                  <h2 className="t-meta text-fg-3">Stack</h2>
                  <ul className="mt-3 flex flex-wrap gap-1.5">{w.stack.map((s) => <li key={s} className="tag">{s}</li>)}</ul>
                </div>
              )}
            </div>
          </aside>
          <div className="lg:col-span-8">
            {BEATS.map((b) => {
              const v = w[b.key];
              return (
                <section key={b.key} className="border-t border-line-2 py-8 first:border-t-0 first:pt-0" aria-labelledby={`b-${b.key}`}>
                  <p className="t-meta text-accent-ink">{b.cmd}</p>
                  <h2 id={`b-${b.key}`} className="mt-2 t-h3 h-pre">{b.label}</h2>
                  {typeof v === "string" ? (
                    <p className="mt-4 max-w-[62ch] t-body text-fg-2">{v}</p>
                  ) : (
                    <ul className="mt-4 max-w-[64ch] space-y-3">
                      {v.map((x) => <li key={x} className="flex gap-3 t-body text-fg-2"><span aria-hidden className="font-mono text-accent-ink">{b.key === "learned" ? "~" : "→"}</span>{x}</li>)}
                    </ul>
                  )}
                </section>
              );
            })}
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
