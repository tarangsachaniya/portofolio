// Generates /public/llms.txt and /public/resume.txt from the content layer.
import { writeFileSync } from "node:fs";
import { chapters, notes, person, services, site, work } from "../src/lib/content.ts";

const llms = `# ${person.name}

> ${person.summary}

Theme note: the site renders in five interchangeable visual themes; all pages and URLs are identical across themes.

## Pages
- [Story](${site.url}/about/): career timeline, 2021 to now
- [Work](${site.url}/work/): all projects
- [Services](${site.url}/services/): freelance web, API and SaaS development
- [Uses](${site.url}/uses/): tools and stack
- [Now](${site.url}/now/): current focus
- [Contact](${site.url}/contact/): ${person.email}

## Projects
${work.map((w) => `- [${w.name}](${site.url}/work/${w.slug}/): ${w.what}. ${w.status}, ${w.year}.`).join("\n")}

## Notes
${notes.map((n) => `- [${n.title}](${site.url}/notes/${n.slug}/)`).join("\n")}
`;

const resume = `${person.name.toUpperCase()}
${person.jobTitle} · ${person.title}
${person.city}, ${person.country} · ${person.email} · ${site.url}

SUMMARY
${person.summary}

SERVICES
${services.offers.map((o) => `- ${o.title}: ${o.body}`).join("\n")}

TIMELINE
${chapters.map((c) => `${c.year}  ${c.title}  (${c.where})\n      ${c.story}`).join("\n\n")}

SELECTED WORK
${work.map((w) => `- ${w.name} (${w.year}, ${w.status}): ${w.what}${w.href ? ` · ${w.href}` : ""}`).join("\n")}

SKILLS
${person.knowsAbout.join(", ")}

LINKS
${person.sameAs.join("\n")}
`;

writeFileSync("public/llms.txt", llms);
writeFileSync("public/resume.txt", resume);
console.log("wrote public/llms.txt and public/resume.txt");
