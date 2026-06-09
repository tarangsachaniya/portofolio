const links = [
  { label: "GitHub", href: "https://github.com/tarangsachaniya" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tarang-sachaniya/" },
  { label: "Instagram", href: "https://instagram.com/tarangsachaniya" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 md:flex-row">

        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/30 bg-gradient-to-br from-accent-indigo/10 to-accent-cyan/10 font-display text-xs font-extrabold text-gradient">
            TS
          </span>
          <span className="font-display text-base font-bold tracking-tight text-foreground">
            Tarang <span className="text-muted-foreground font-normal">Sachaniya</span>
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Tarang Sachaniya. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-accent-indigo"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
