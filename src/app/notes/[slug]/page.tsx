import { notFound } from "next/navigation";
import { notes, site } from "@/lib/content";
import { breadcrumbs, graph, ids, meta } from "@/lib/seo";
import Page from "@/components/ui/Page";
import JsonLd from "@/components/ui/JsonLd";

export const dynamicParams = false;
export function generateStaticParams() { return notes.map((n) => ({ slug: n.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = notes.find((x) => x.slug === slug)!;
  return meta({ title: n.title, description: n.summary, path: `/notes/${n.slug}/`, type: "article" });
}

export default async function Note({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = notes.find((x) => x.slug === slug);
  if (!n) notFound();
  return (
    <Page cmd={`less ./notes/${n.slug}.md`} prompt={n.title} file={`notes/${n.slug}.md`} eyebrow={n.date} title={n.title} summary={n.summary}
      crumbs={[{ name: "Home", href: "/" }, { name: "Notes", href: "/notes/" }, { name: n.title, href: `/notes/${n.slug}/` }]}>
      <div className="wrap section">
        <div className="max-w-[66ch] space-y-6">
          {n.body.map((b, i) => (
            <section key={i}>
              {b.h && <h2 className="t-h3 h-pre mb-3">{b.h}</h2>}
              <p className="t-body text-fg-2">{b.p}</p>
            </section>
          ))}
        </div>
      </div>
      <JsonLd data={graph({ "@type": "BlogPosting", headline: n.title, description: n.summary, datePublished: n.date, author: { "@id": ids.person }, url: `${site.url}/notes/${n.slug}/` }, breadcrumbs([{ name: "Home", path: "/" }, { name: "Notes", path: "/notes/" }, { name: n.title, path: `/notes/${n.slug}/` }]))} />
    </Page>
  );
}
