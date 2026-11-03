import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap section">
      <p className="font-mono text-sm text-fg-3">$ cd ./this-page<br />bash: cd: ./this-page: No such file or directory</p>
      <h1 className="mt-6 t-display">404</h1>
      <p className="mt-6 t-lead text-fg-2">This page is probably still on the bench.</p>
      <Link href="/" className="btn btn-primary mt-8">Back home</Link>
    </section>
  );
}
