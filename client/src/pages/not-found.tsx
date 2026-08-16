import { Link } from "wouter";
import { ArrowLeft, TerminalSquare } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8">
        <div className="flex items-center gap-2.5 text-accent">
          <TerminalSquare className="h-5 w-5" aria-hidden />
          <span className="font-mono text-xs uppercase tracking-[0.18em]">
            404
          </span>
        </div>

        <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          That route doesn&apos;t exist. Check the URL, or head back to the
          homepage.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-mono text-sm font-semibold text-accent-foreground transition-shadow hover:shadow-[0_0_30px_-6px_hsl(var(--accent)/0.7)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    </main>
  );
}
