import { person } from "@/lib/content";
import { breadcrumbs, graph, ids, meta } from "@/lib/seo";
import Page from "@/components/ui/Page";
import JsonLd from "@/components/ui/JsonLd";

const summary = `Contact Tarang Sachaniya, full-stack developer in Ahmedabad: email ${person.email} or WhatsApp ${person.whatsappLabel}. He replies within a day; WhatsApp is fastest.`;
export const metadata = meta({ title: "Contact", description: summary, path: "/contact/" });

export default function Contact() {
  return (
    <Page eyebrow="Replies within a day" title="Let's build something." summary={summary}>
      <div className="wrap section grid gap-5 md:grid-cols-3">
        <a href={`https://wa.me/${person.whatsapp}`} target="_blank" rel="noreferrer" className="card p-6">
          <p className="t-meta text-fg-3">WhatsApp · fastest</p>
          <p className="mt-3 t-h3">{person.whatsappLabel}</p>
        </a>
        <a href={`mailto:${person.email}`} className="card p-6">
          <p className="t-meta text-fg-3">Email</p>
          <p className="mt-3 break-all text-xl font-semibold">{person.email}</p>
        </a>
        <div className="card p-6">
          <p className="t-meta text-fg-3">Elsewhere</p>
          <ul className="mt-3 space-y-1.5">{person.socials.map((s) => <li key={s.label}><a href={s.href} rel="me noreferrer" target="_blank" className="ulink text-lg font-medium">{s.label} ↗</a></li>)}</ul>
        </div>
      </div>
      <JsonLd data={graph({ "@type": "ContactPage", url: "https://tarangsachaniya.com/contact/", mainEntity: { "@id": ids.person } }, breadcrumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }]))} />
    </Page>
  );
}
