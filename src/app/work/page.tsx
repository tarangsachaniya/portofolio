import { work } from "@/lib/content";
import { breadcrumbs, graph, meta } from "@/lib/seo";
import Page from "@/components/ui/Page";
import JsonLd from "@/components/ui/JsonLd";
import WorkExplorer from "@/components/work/WorkExplorer";

const summary = `Tarang Sachaniya's work: ${work.filter((w) => w.kind === "Product").length} Priinteve products (print network, NFC cards, QR restaurant ordering, a print-shop desktop app and a salon app), client websites, the otp-forge npm package, and the early projects where he learned the basics.`;

export const metadata = meta({ title: "Work", description: summary, path: "/work/" });

export default function WorkIndex() {
  return (
    <Page eyebrow={`${work.length} projects · 2023 to now`} title="Things I've built, and what they taught me." summary={summary}>
      <WorkExplorer />
      <JsonLd data={graph({ "@type": "CollectionPage", name: "Work", url: "https://tarangsachaniya.com/work/", hasPart: work.map((w) => ({ "@id": `https://tarangsachaniya.com/work/${w.slug}/#${w.schema === "CreativeWork" || w.schema === "SoftwareSourceCode" ? "work" : "app"}` })) }, breadcrumbs([{ name: "Home", path: "/" }, { name: "Work", path: "/work/" }]))} />
    </Page>
  );
}
