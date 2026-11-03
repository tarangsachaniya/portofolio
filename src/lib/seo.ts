import type { Metadata } from "next";
import { org, person, site, type Work } from "./content";

export function meta({ title, description, path, type = "website" }: { title: string; description: string; path: string; type?: "website" | "article" | "profile" }): Metadata {
  const url = site.url + path;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, locale: site.locale, type },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const ids = {
  person: `${site.url}/#person`,
  org: `${site.url}/#org`,
  website: `${site.url}/#website`,
};

export function personNode() {
  return {
    "@type": "Person",
    "@id": ids.person,
    name: person.name,
    url: site.url + "/",
    image: site.url + "/img/hero-760.webp",
    jobTitle: person.jobTitle,
    description: person.summary,
    email: `mailto:${person.email}`,
    address: { "@type": "PostalAddress", addressLocality: person.city, addressRegion: person.region, addressCountry: "IN" },
    knowsAbout: person.knowsAbout,
    worksFor: { "@id": ids.org },
    alumniOf: { "@type": "CollegeOrUniversity", name: "LJ University" },
    sameAs: person.sameAs,
  };
}

export function orgNode() {
  return {
    "@type": "Organization",
    "@id": ids.org,
    name: org.name,
    url: org.url,
    description: org.description,
    founder: { "@id": ids.person },
    address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
  };
}

export function websiteNode() {
  return { "@type": "WebSite", "@id": ids.website, url: site.url + "/", name: site.name, author: { "@id": ids.person }, inLanguage: "en" };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: site.url + it.path })),
  };
}

export function faqNode(faq: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

const OS: Record<string, string> = { Web: "Web browser", Android: "Android", iOS: "iOS", Windows: "Windows" };

export function workNode(w: Work) {
  const url = `${site.url}/work/${w.slug}/`;
  if (w.schema === "CreativeWork") {
    return { "@type": "CreativeWork", "@id": url + "#work", name: w.name, url, description: w.summary, creator: { "@id": ids.person }, dateCreated: w.year, ...(w.href ? { sameAs: w.href } : {}) };
  }
  if (w.schema === "SoftwareSourceCode") {
    return { "@type": "SoftwareSourceCode", "@id": url + "#work", name: w.name, url, description: w.summary, author: { "@id": ids.person }, programmingLanguage: w.stack[0], ...(w.repo ? { codeRepository: w.repo } : {}), ...(w.href ? { sameAs: w.href } : {}) };
  }
  // Apps: no invented ratings; offers price 0 is only claimed where the app is free to try — leave out.
  return {
    "@type": w.schema,
    "@id": url + "#app",
    name: w.name,
    url: w.href ?? url,
    description: w.summary,
    applicationCategory: w.appCategory,
    operatingSystem: w.platforms.map((p) => OS[p]).filter(Boolean).join(", "),
    author: { "@id": ids.person },
    publisher: { "@id": ids.org },
    ...(w.shots[0] ? { screenshot: site.url + w.shots[0].src } : {}),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
