import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-svh flex-col justify-center gap-6">
      <p className="text-meta text-ink-3">
        <span className="text-signal-ink">$</span> cd ./this-page
      </p>
      <h1 className="text-display">404</h1>
      <p className="text-lead text-ink-2">No such file or directory. Probably still on the bench.</p>
      <Link href="/" className="ulink w-fit font-semibold">
        ← Back to tarang.dev
      </Link>
    </main>
  );
}
