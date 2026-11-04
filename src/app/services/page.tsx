import Link from "next/link";
import { person, services } from "@/lib/content";
import { breadcrumbs, faqNode, graph, ids, meta } from "@/lib/seo";
import Page, { Faq, SectionTitle } from "@/components/ui/Page";
import JsonLd from "@/components/ui/JsonLd";

export const metadata = meta({ title: "Hire a full-stack developer in Ahmedabad", description: services.summary, path: "/services/" });

export default function Services() {
  return (
    <Page eyebrow="Freelance · remote or Ahmedabad" title="Hire a full-stack developer who ships." summary={services.summary}>
      <div className="wrap">
        <section className="section" aria-labelledby="offers">
          <SectionTitle kicker="what" id="offers">What I build</SectionTitle>
          <ul className="grid gap-4 md:grid-cols-2">
            {services.offers.map((o) => (
              <li key={o.title} className="card p-6">
                <h3 className="t-h3">{o.title}</h3>
                <p className="mt-3 text-fg-2">{o.body}</p>
                <p className="mt-4 flex flex-wrap gap-1.5">{o.tags.map((t) => <span key={t} className="tag">{t}</span>)}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="section" aria-labelledby="process">
          <SectionTitle kicker="how" id="process">How a project runs</SectionTitle>
          <ol className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
            {services.process.map((s) => (
              <li key={s.n} className="bg-bg p-6">
                <p className="font-mono text-xs text-accent-ink">{s.n}</p>
                <h3 className="mt-3 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-fg-2">{s.b}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`https://wa.me/${person.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-primary">WhatsApp me <span aria-hidden>↗</span></a>
            <Link href="/contact/" className="btn btn-ghost">Other ways to reach me</Link>
          </div>
        </section>
        <section className="section" aria-labelledby="sfaq">
          <SectionTitle kicker="faq" id="sfaq">Before you ask</SectionTitle>
          <Faq items={services.faq} />
        </section>
      </div>
      <JsonLd
        data={graph(
          { "@type": "Service", name: "Freelance full-stack web development", serviceType: "Web application development", provider: { "@id": ids.person }, areaServed: [{ "@type": "City", name: "Ahmedabad" }, { "@type": "Country", name: "India" }], description: services.summary },
          faqNode(services.faq),
          breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }]),
        )}
      />
    </Page>
  );
}
