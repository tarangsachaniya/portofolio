import { chapters, person } from "@/lib/content";
import { breadcrumbs, graph, ids, meta } from "@/lib/seo";
import Page from "@/components/ui/Page";
import JsonLd from "@/components/ui/JsonLd";

const summary =
  "Tarang Sachaniya learned to build software by shipping it: from first web pages at LJ University in 2021, to backend work at Prime Apps Infotech from 2023, to co-founding Priinteve Innovations and building its print network, NFC cards and restaurant ordering products.";

export const metadata = meta({ title: "Story", description: summary, path: "/about/", type: "profile" });

export default function About() {
  return (
    <Page eyebrow="git log --story --reverse" title="A developer who learns by making things." summary={summary}>
      <div className="wrap section grid gap-12 lg:grid-cols-12">
        <figure className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/hero-760.webp" alt="Tarang Sachaniya standing outdoors, arms crossed, smiling" width={760} height={950} className="w-full border border-line-2 [border-radius:var(--card-radius)]" />
            <figcaption className="mt-3 flex justify-between t-meta text-fg-3"><span>{person.name}</span><span>{person.city}, {person.country}</span></figcaption>
          </div>
        </figure>
        <ol className="lg:col-span-8">
          {chapters.map((c) => (
            <li key={c.n} id={`ch-${c.n}`} className="scroll-mt-28 border-t border-line-2 py-10 first:border-t-0 first:pt-0">
              <p className="flex flex-wrap gap-x-3 t-meta text-fg-3"><span className="text-accent-ink">CH {c.n}</span><span>{c.year}</span><span>{c.where}</span></p>
              <h2 className="mt-3 t-h3 h-pre">{c.title}</h2>
              <p className="mt-2 font-mono text-[0.78rem] text-fg-3">commit: <span className="text-accent-ink">{c.commit}</span></p>
              <p className="mt-5 max-w-[62ch] t-body text-fg-2">{c.story}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {([["Learned", c.learned, "~"], ["Made", c.made, "+"]] as const).map(([label, items, mark]) => (
                  <div key={label} className="border-t border-line pt-3">
                    <h3 className="t-meta text-fg-3">{label}</h3>
                    <ul className="mt-3 space-y-1.5 font-mono text-[0.82rem]">
                      {items.map((it) => <li key={it} className="flex gap-2.5"><span aria-hidden className="text-accent-ink">{mark}</span>{it}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <JsonLd data={graph({ "@type": "ProfilePage", "@id": "https://tarangsachaniya.com/about/#page", url: "https://tarangsachaniya.com/about/", name: `About ${person.name}`, mainEntity: { "@id": ids.person } }, breadcrumbs([{ name: "Home", path: "/" }, { name: "Story", path: "/about/" }]))} />
    </Page>
  );
}
