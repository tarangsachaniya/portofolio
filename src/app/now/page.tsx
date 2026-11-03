import { now } from "@/lib/content";
import { breadcrumbs, graph, meta } from "@/lib/seo";
import Page from "@/components/ui/Page";
import JsonLd from "@/components/ui/JsonLd";

const summary = `What Tarang Sachaniya is working on and learning right now (updated ${now.updated}): launching the Priinteve print network in Ahmedabad, order auto-assignment, an ESP32 NFC terminal and a few freelance builds.`;
export const metadata = meta({ title: "Now", description: summary, path: "/now/" });

export default function Now() {
  return (
    <Page cmd="tail -f now.log" prompt="What is he doing now?" file="now.log" eyebrow={`Updated ${now.updated}`} title="What I'm doing now." summary={summary}>
      <div className="wrap section grid gap-12 md:grid-cols-12">
        <ol className="md:col-span-7 space-y-4">
          {now.items.map((it, i) => (
            <li key={it} className="flex gap-4 border-b border-line pb-4 text-lg">
              <span className="font-mono text-sm text-fg-3">{String(i + 1).padStart(2, "0")}</span>{it}
            </li>
          ))}
        </ol>
        <div className="md:col-span-5">
          <h2 className="t-meta text-fg-3">Learning</h2>
          <ul className="mt-4 flex flex-wrap gap-2">{now.learning.map((l) => <li key={l} className="tag !border-dashed !text-accent-ink">{l}</li>)}</ul>
        </div>
      </div>
      <JsonLd data={graph(breadcrumbs([{ name: "Home", path: "/" }, { name: "Now", path: "/now/" }]))} />
    </Page>
  );
}
