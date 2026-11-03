import { kinds, work } from "@/lib/content";
import { breadcrumbs, graph, meta } from "@/lib/seo";
import Page, { SectionTitle } from "@/components/ui/Page";
import WorkCard from "@/components/ui/WorkCard";
import JsonLd from "@/components/ui/JsonLd";

const summary = `Tarang Sachaniya's work: ${work.filter((w) => w.kind === "Product").length} Priinteve products (print network, NFC cards, QR restaurant ordering, a print-shop desktop app and a salon app), client websites, the otp-forge npm package, and the early projects where he learned the basics.`;

export const metadata = meta({ title: "Work", description: summary, path: "/work/" });

export default function WorkIndex() {
  return (
    <Page cmd="ls -la ./work" prompt="What has he built?" file="work/index.tsx" eyebrow={`${work.length} projects · 2023 to now`} title="Things I've built, and what they taught me." summary={summary}>
      <div className="wrap">
        <nav aria-label="Jump to" className="mt-10 flex flex-wrap gap-2">
          {kinds.map((k) => <a key={k} href={`#${k.toLowerCase().replace(/\s/g, "-")}`} className="tag hover:border-fg">{k}</a>)}
        </nav>
        {kinds.map((k) => {
          const list = work.filter((w) => w.kind === k);
          return (
            <section key={k} id={k.toLowerCase().replace(/\s/g, "-")} className="section scroll-mt-28" aria-label={k}>
              <SectionTitle kicker={`${list.length} ${list.length === 1 ? "project" : "projects"}`}>{k === "Product" ? "Products (Priinteve)" : k === "Client" ? "Client work" : k}</SectionTitle>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {list.map((w) => <WorkCard key={w.slug} w={w} />)}
              </div>
            </section>
          );
        })}
      </div>
      <JsonLd data={graph({ "@type": "CollectionPage", name: "Work", url: "https://tarangsachaniya.com/work/", hasPart: work.map((w) => ({ "@id": `https://tarangsachaniya.com/work/${w.slug}/#${w.schema === "CreativeWork" || w.schema === "SoftwareSourceCode" ? "work" : "app"}` })) }, breadcrumbs([{ name: "Home", path: "/" }, { name: "Work", path: "/work/" }]))} />
    </Page>
  );
}
