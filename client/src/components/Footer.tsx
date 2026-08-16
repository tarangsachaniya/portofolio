import { priinteve, profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-9 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-card font-display text-xs font-extrabold text-accent">
            TS
          </span>
          <div>
            <div className="font-display text-sm font-semibold text-foreground">
              {profile.name}
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              {profile.secondary}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end">
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-accent"
            >
              Email
            </a>
            <a
              href={priinteve.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-accent"
            >
              priinteve.com
            </a>
            <a
              href="https://github.com/tarangsachaniya"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">
            © {year} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
