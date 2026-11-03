import { nav, work, notes } from "./content";

/** Human/file/command labels for any pathname, used by every chrome. */
export function routeInfo(pathname: string) {
  const p = pathname.endsWith("/") ? pathname : pathname + "/";
  const top = nav.find((n) => n.href === p);
  if (top) return { label: top.label, file: top.file === "work/" ? "index.tsx" : top.file === "notes/" ? "index.md" : top.file, dir: top.file.endsWith("/") ? top.file.slice(0, -1) : "", cmd: top.cmd, prompt: top.prompt };
  const m = p.match(/^\/work\/([^/]+)\/$/);
  if (m) {
    const w = work.find((x) => x.slug === m[1]);
    return { label: w?.name ?? m[1], file: `${m[1]}.tsx`, dir: "work", cmd: `cat ./work/${m[1]}/README.md`, prompt: `Tell me about ${w?.name ?? m[1]}` };
  }
  const n = p.match(/^\/notes\/([^/]+)\/$/);
  if (n) {
    const x = notes.find((y) => y.slug === n[1]);
    return { label: x?.title ?? n[1], file: `${n[1]}.md`, dir: "notes", cmd: `less ./notes/${n[1]}.md`, prompt: x?.title ?? n[1] };
  }
  return { label: "Not found", file: "404.md", dir: "", cmd: "cd ./nowhere", prompt: "Where am I?" };
}

/** Free-text → route. Used by the terminal and the chat composer. */
export function resolveIntent(input: string): { href?: string; theme?: string; reply?: string } {
  const s = input.trim().toLowerCase();
  if (!s) return {};
  const t = s.match(/^(?:theme|world|switch(?: to)?)\s+(\w+)/);
  if (t) return { theme: t[1] === "code" ? "vscode" : t[1] };
  for (const w of work) {
    if (s.includes(w.slug.replace(/-/g, " ")) || s.includes(w.name.toLowerCase()) || s.includes(w.slug)) return { href: `/work/${w.slug}/` };
  }
  const rules: [RegExp, string][] = [
    [/\b(hire|freelance|services?|price|pricing|cost|quote|available)\b/, "/services/"],
    [/\b(contact|email|mail|whatsapp|call|reach|\.\/contact)/, "/contact/"],
    [/\b(work|projects?|built|build|portfolio|ls)\b/, "/work/"],
    [/\b(story|about|who|background|history|experience|cat story)\b/, "/about/"],
    [/\b(uses|tools|setup|stack|editor|keyboard)\b/, "/uses/"],
    [/\b(now|currently|today|tail)\b/, "/now/"],
    [/\b(notes?|blog|writing|articles?|devlog)\b/, "/notes/"],
    [/^(cd ~|cd|home|~|readme)$/, "/"],
  ];
  for (const [re, href] of rules) if (re.test(s)) return { href };
  return { reply: "I only know about Tarang. Try: work, story, services, uses, now, notes or contact." };
}
