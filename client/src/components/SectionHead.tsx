import type { ReactNode } from "react";
import { Lines, Reveal } from "./Reveal";

/**
 * Every section opens the same way: a terminal-style path on the left,
 * an index number on the right, a hairline, then a big two-line title.
 */
export function SectionHead({
  index,
  path,
  title,
  aside,
  id,
}: {
  index: string;
  path: string;
  title: ReactNode[];
  aside?: ReactNode;
  id: string;
}) {
  return (
    <header className="mb-14 md:mb-20">
      <div className="flex items-baseline justify-between border-b border-line pb-3 text-meta text-ink-3">
        <span>
          <span className="text-signal-ink">$</span> {path}
        </span>
        <span aria-hidden>{index} / 05</span>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
        <Lines id={`${id}-title`} lines={title} className="text-h2 md:col-span-8" as="h2" />
        {aside && (
          <Reveal delay={0.2} className="text-body text-ink-2 md:col-span-4 md:pb-2">
            {aside}
          </Reveal>
        )}
      </div>
    </header>
  );
}
