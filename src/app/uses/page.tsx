import { uses } from "@/lib/content";
import { breadcrumbs, graph, meta } from "@/lib/seo";
import Page from "@/components/ui/Page";
import JsonLd from "@/components/ui/JsonLd";

export const metadata = meta({ title: "Uses", description: uses.summary, path: "/uses/" });

export default function Uses() {
  return (
    <Page cmd="cat uses.json | jq" prompt="What does he use?" file="uses.json" eyebrow="/uses" title="My desk, my editor, my stack." summary={uses.summary}>
      <div className="wrap section grid gap-5 md:grid-cols-2">
        {uses.groups.map((g) => (
          <section key={g.label} className="card p-6" aria-label={g.label}>
            <h2 className="t-h3 h-pre">{g.label}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">{g.items.map((it) => <li key={it} className="tag !text-[0.8rem]">{it}</li>)}</ul>
          </section>
        ))}
      </div>
      <JsonLd data={graph(breadcrumbs([{ name: "Home", path: "/" }, { name: "Uses", path: "/uses/" }]))} />
    </Page>
  );
}
