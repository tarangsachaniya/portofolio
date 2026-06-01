const links = [
  { label: "Instagram", href: "https://instagram.com/tarangsachaniya" },
  { label: "GitHub", href: "https://github.com/tarangsachaniya" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tarang-sachaniya/" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-accent-indigo/40 bg-surface font-display text-xs font-extrabold text-gradient">
            TS
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Tarang<span className="text-muted-foreground">Sachaniya.</span>
          </span>
        </div>

        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent-indigo"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
