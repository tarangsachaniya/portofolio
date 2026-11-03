import Link from "next/link";
import { notes } from "@/lib/content";
import { breadcrumbs, graph, meta } from "@/lib/seo";
import Page from "@/components/ui/Page";
import JsonLd from "@/components/ui/JsonLd";

const summary = "Notes and devlogs by Tarang Sachaniya on building real products: API architecture, Priinteve's systems, and how this portfolio was made.";
export const metadata = meta({ title: "Notes", description: summary, path: "/notes/" });

export default function Notes() {
  return (
    <Page cmd="ls -t ./notes" prompt="Has he written anything?" file="notes/index.md" eyebrow="Devlog" title="Notes from the workbench." summary={summary}>
      <ul className="wrap section space-y-4">
        {notes.map((n) => (
          <li key={n.slug}>
            <Link href={`/notes/${n.slug}/`} className="card block p-6">
              <time dateTime={n.date} className="t-meta text-fg-3">{n.date}</time>
              <h2 className="mt-2 t-h3">{n.title}</h2>
              <p className="mt-3 max-w-[64ch] text-fg-2">{n.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
      <JsonLd data={graph(breadcrumbs([{ name: "Home", path: "/" }, { name: "Notes", path: "/notes/" }]))} />
    </Page>
  );
}
